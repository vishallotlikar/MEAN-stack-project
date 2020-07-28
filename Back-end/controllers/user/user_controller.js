const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Import service files.
const session_service = require('../../service/session/session_service');
const user_service = require('../../service/user/user_session');
const image_service = require('../../service/image/image_service');

// Middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Routes goes here

// Default route
router.all('/', function (req, res) {
    return res.json({
        status: true,
        message: 'User controller...'
    })
});

// Create new user route controller.
router.post('/create', [
    // Check for non-empty fields
    check('username').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape()
], async function (req, res) {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: 'Form validation failed...',
            errors: errors.array()
        });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10); // hash password.

    // Create a new user object
    var userObj = {
        username: req.body.username,
        password: hashedPassword
    };
    const session = await mongoose.startSession(); // Start a session to rollback if any DB operations fails.
    session.startTransaction(); // Start a transaction.
    // Call user service to create a new user.
    const userResp = await user_service.createNewUser(userObj, session);
    // Check if any errors
    if (userResp.message == 'failed') {
        await session.abortTransaction(); // Abort the transaction if password is incorrect.
        session.endSession();  // Terminate the session.
        return res.status(500).json(userResp);
    } else {
        // If everything ok
        await session.commitTransaction(); // Commit the transactio if everything worked fine.
        session.endSession(); // Terminate the session.
        return res.status(201).json(userResp);
    }
});

// User login route and controller.
router.post('/login',
    [
        // Check for non-empty fields
        check('username').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
    ], async function (req, res) {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: 'Form validation failed...',
                errors: errors.array()
            });
        }
        const session = await mongoose.startSession(); // Start a session to rollback if any DB operations fails.
        session.startTransaction(); // Start a transaction.
        // Fetch a current user records.
        const user_resp = await user_service.findUser(req.body.username, session);
        if (user_resp.result) {
            // match password
            const isMatch = bcrypt.compareSync(req.body.password, user_resp.result.password);

            // Check password is matched
            if (isMatch) {
                // Create a new document in sessions collection.
                await session_service.createNewSession(user_resp.result.id, session);
                // Prepare an object for JWT token.
                let payload = {
                    id: user_resp.result.id,
                    username: user_resp.result.username
                }
                // Create a new JWT token.
                var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Tokens valid for 1 hour.
                user_resp.result.token = token;
                // Assign a newly created token to user.
                await user_service.updateUserToken(user_resp.result.id, token, session);
                await session.commitTransaction(); // Commit the transactio if everything worked fine.
                session.endSession(); // Terminate the session.
                return res.status(200).json({
                    status: true,
                    message: 'Login success..',
                    result: user_resp.result
                });
            } else {
                await session.abortTransaction(); // Abort the transaction if password is incorrect.
                session.endSession(); // Terminate the session.
                return res.status(400).json({
                    status: false,
                    message: 'Login failed..'
                });
            }
        } else {
            await session.abortTransaction(); // Abort the transaction if password is incorrect.
            session.endSession(); // Terminate the session.
            return res.status(404).json({
                status: false,
                message: 'User doesnot exist...'
            })
        }
    })

// Upload user image
router.post('/image', [
    // Check for non-empty fields
    check('user_id').not().isEmpty().trim().escape(),
    check('image').not().isEmpty()
], async function (req, res) {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: 'Form validation failed...',
            errors: errors.array()
        });
    }

    // Verify JWT token to check if incoming request is valid.
    jwt.verify(req.headers.authentication, process.env.JWT_SECRET, async function (err, decoded) {
        // Check if errors.
        if (err) {
            res.status(400).json({
                status: false,
                message: 'Authentication verification failed'
            });
        } else {
            // JWT token verification successful.

            // Fetch user details.
            const user_resp = await user_service.findUser(req.body, null);
            if (user_resp.error || user_resp.result.token != req.headers.authentication) {
                user_resp.error ? res.status(404).send('Please enter valid user_id') : res.status(400).send('Old verification token used');
            } else {

                // Check if incoming request is authorized to current user.
                if (decoded.id != req.body.user_id) {
                    res.status(401).send('You are not authorized to do this operation');
                } else {
                    // Add a new document in the images collection.
                    const image_resp = await image_service.addNewImage(req.body);
                    if (image_resp) { // If image document added successfully. 
                        res.status(201).json(image_resp);
                    } else { // If error
                        res.status(500).json({
                            status: failed,
                            message: 'Something went wrong'
                        });
                    }
                }
            }
        }
    });

})

// View all available images.
router.get('/images', async function (req, res) {
    const image_resp = await image_service.viewAllImages();
    if (image_resp) { // If image document added successfully. 
        res.status(200).json(image_resp);
    } else { // If error
        res.status(500).json({
            status: failed,
            message: 'Something went wrong'
        });
    }
})

// module exports
module.exports = router;
