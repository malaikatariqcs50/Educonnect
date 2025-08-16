const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            {folder},
            (error, result) => {
                if(result){
                    resolve(result)
                }
                else{
                    reject(error)
                }
            }
        )
        streamifier.createReadStream(buffer).pipe(stream)
    })
}

module.exports = {
    cloudinary,
    uploadToCloudinary
}