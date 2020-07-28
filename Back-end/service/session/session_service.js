const Session = require('../../models/session')

// Session service.
exports.createNewSession = (user_id, session) => {
    return Session.create([{
        user_id: user_id,
    }], { session: session }) // Session assignment.
        .then(result => {
            // If everything ok
            return {
                status: true,
                message: 'success',
                result: result
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