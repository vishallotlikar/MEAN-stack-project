const Image = require('../../models/image')

// Image service to add a new user.
exports.addNewImage = (imageObj) => {
    return Image.create({
        user_id: imageObj.user_id,
        image: imageObj.image
    })
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

// Image service to view all available images.
exports.viewAllImages = () => {
    return Image.find()
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