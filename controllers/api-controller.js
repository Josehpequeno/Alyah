const FavoriteListDao = require('../dao/favorite_list-dao');
const ImagesDao = require('../dao/images-dao');
const db = require('../config/db');

class ApiController {
    static routes() {
        return {
            addImage: '/AddImages',
            favorite: '/favorite'
        }
    }
    addImage() {
        return (req, res) => {
            let imagesDao = new ImagesDao(db);
            let manga = req.body.manga;
            let chapter = req.body.chapter;
            let urls = req.body.urls;
            async function f1(url) {
                await imagesDao.createImages(
                    url,
                    chapter, manga);
            }
            //adicionar de forma sequencial e assincrona.
            (async () => {
                for (let url of urls) {
                    await f1(url);
                }
            })();
            db.query(
                `SELECT * FROM images;`,
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    // console.log("Images: ");
                    // console.log(results.rows);
                    res.status(200).send("Dados registrados : " + JSON.stringify(results.rows));
                }
            );
        };
    }

    favorite() {
        return (req, res) => {
            let manga_id = req.body.data.manga_id;
            let favorites_id = req.body.data.favorites_id;
            let favorited = req.body.data.favorited;
            let favorite = new FavoriteListDao(db);
            if (favorited == 'true') {
                favorite.ExitsFavoriteList(manga_id, favorites_id).then(bool => {
                    if (bool) {
                        return bool;
                    }
                    favorite.addFavoriteList(manga_id, favorites_id).then(() => {
                        return !bool;
                    }).catch((err) => {
                        return err;
                    })
                }).catch(err => {
                    return err;
                })
            } else {
                favorite.ExitsFavoriteList(manga_id, favorites_id).then(bool => {
                    if (bool) {
                        favorite.removeFavoriteList(manga_id, favorites_id).then(() => {
                            return !bool;
                        }).catch((err) => {
                            return err;
                        })
                    }
                    return bool;
                }).catch(err => {
                    return err;
                })
            }
        };
    }
}
module.exports = ApiController;