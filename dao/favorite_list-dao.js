const MangaDao = require('./manga-dao');
class FavoriteListDao {
    constructor(db) {
        this._db = db;
    }

    addFavoriteList(manga_id, favorite_id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'INSERT INTO favorites_lists (manga_id, favorites_id) VALUES ($1, $2)',
                [manga_id, favorite_id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    let mangaDao = new MangaDao(this._db);
                    mangaDao.addFavoriteManga(manga_id).then(() => {
                        return resolve();
                    }).catch((err) => { console.log(err); });
                }
            );
        });
    }
    removeFavoriteList(manga_id, favorite_id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'DELETE FROM favorites_lists WHERE manga_id = $1 AND favorites_id = $2',
                [manga_id, favorite_id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    let mangaDao = new MangaDao(this._db);
                    mangaDao.removeFavoriteManga(manga_id).then(() => {
                        return resolve();
                    }).catch((err) => { console.log(err); });
                }
            );
        });
    }
    ExitsFavoriteList(manga_id, favorite_id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM favorites_lists WHERE manga_id = $1 AND favorites_id = $2',
                [manga_id, favorite_id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return resolve(false);
                    }
                    return resolve(true);
                }
            );
        });
    }

    getAllMangaFavorited(favorite_id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM favorites_lists WHERE favorites_id = $1',
                [favorite_id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return resolve([]);
                    }
                    let promises = [];
                    let mangaDao = new MangaDao(this._db);
                    results.rows.forEach(element => {
                        promises.push(mangaDao.getMangaById(element.manga_id));
                    });
                    Promise.all(promises).then((results) => {
                        return resolve(results);
                    }).catch(err => reject(err));
                }
            );
        });
    }
}
module.exports = FavoriteListDao;