const templates = '../views/';
const multer = require('multer');
var path = require('path');
const cloudinary = require('cloudinary');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const util = require('util');

// // https://github.com/node-formidable/node-formidable
// const formidable = require('formidable');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

// var parser = multer({ storage: storage });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// console.log(cloudinary);
// const storage = CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         return {
//             folder: "avatars",
//             format: ["jpg", "png"]
//         }
//     }
// });
const parser = multer({ storage: storage });

module.exports = async (req, res, next) => {
    parser.single('avatar')(req, res, err => {
        let user = req.user;
        if (err) {
            res.status(500).json({ error: 1, payload: err });
        } else {
            const image = {};
            image.id = req.file.filename;
            if (process.env.NODE_ENV !== 'production') {
                image.url = `/home/joseh/Alyah/public/uploads/${image.id}`;//não funciona localmente ao menos que você coloque o caminho onde está localizado.
                // image.url = `/static/uploads/${image.id}`
                cloudinary.v2.uploader.upload(image.url, (error, result) => {
                    if (error) console.log(error);
                    if (result) {
                        // console.log(result);
                        return res.render(templates + 'editProfile.handlebars', { layout: false, user: user, profile: result.url });
                    }
                });
            } else {
                image.url = `https://alyah.herokuapp.com/static/uploads/${image.id}`;
                cloudinary.v2.uploader.upload(image.url, (error, result) => {
                    if (error) console.log(error);
                    if (result) {
                        // console.log(result);
                        return res.render(templates + 'editProfile.handlebars', { layout: false, user: user, profile: result.url });
                    }
                });
            }
            // (async () => {
            // })();
        }
    });
}