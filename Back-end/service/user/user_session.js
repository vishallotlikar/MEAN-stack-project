const User = require('../../models/user')

// User service.
exports.findUser = (req, session) => {
    // Create an object based on the request.
    if (req.username != null) {
        var user_data = {
            username: req.username
        }
    } else if (req.user_id != null) {
        var user_data = {
            _id: req.user_id
        }
    }
    return User.findOne(user_data/*, {
        password: 0
    }*/)
        .session(session) // Session assignment.
        .then(result => {
            // If everything ok
            if (result) {
                return {
                    status: true,
                    message: 'success',
                    result: result
                }
            } else {
                return {
                    status: false,
                    message: 'failed',
                    result: result
                }
            }
        }).catch(error => {
            // Check if any errors
            return {
                status: false,
                message: 'failed',
                error: error
            }
        })
}

// Create/Add a new user
exports.createNewUser = (userObj, session) => {
    return User.create([userObj], { session: session })
        .then(result => {
            // If everything ok
            return {
                status: true,
                message: 'success',
                result: result[0]
            }
        }).catch(error => {
            // Check if any errors
            return {
                status: false,
                message: 'failed',
                error: error
            }
        })
}

exports.updateUserToken = (_id, token, session) => {
    return User.findOneAndUpdate(
        { _id: _id },
        { token: token },
        { session: session },
        function (err, updatedUser) {
            if (err) {
                return {
                    message: 'failed'
                }
            } else {
                return {
                    message: 'success'
                }
            }
        })
}