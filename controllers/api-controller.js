const FavoriteListDao = require('../dao/favorite_list-dao');
const ImagesDao = require('../dao/images-dao');
const MangaDao = require('../dao/manga-dao');
const ChapterDao = require('../dao/chapter-dao');
const db = require('../config/db');

class ApiController {
    static routes() {
        return {
            addManga: '/addManga',
            addChapter: '/addChapter',
            favorite: '/favorite'
        }
    }

    addManga() {
        return (req, res) => {
            let mangaDao = new MangaDao(db);
            let manga = req.body.name;
            let description = req.body.description;
            let author = req.body.author;
            let cover = req.body.cover;
            // console.log(req.body);
            mangaDao.createManga(manga, description, author, cover).then((results) => {
                res.status(200).send("Dados registrados : " + JSON.stringify(results));
            }).catch((err) => { res.status(500).send("Error : " + JSON.stringify(err)); });
        };
    }
    addChapter() {
        return (req, res) => {
            let chapterDao = new ChapterDao(db);
            let imagesDao = new ImagesDao(db);
            let manga = req.body.manga;
            let chapter = req.body.chapter;
            let urls = req.body.urls;
            chapterDao.createChapter(manga, chapter).then(() => {
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
            }).catch((err) => { res.status(500).send("Error : " + JSON.stringify(err)); });
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