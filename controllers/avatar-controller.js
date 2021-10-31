const templates = '../views/';
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

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
                return res.render(templates + 'editProfile.handlebars', { layout: false, user: user, profile: image.url });
            } else {
                image.url = `https://alyah.herokuapp.com/static/uploads/${image.id}`;
                return res.render(templates + 'editProfile.handlebars', { layout: false, user: user, profile: image.url });
            }
        }
    });
}