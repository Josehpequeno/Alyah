const MangaDao = require('./manga-dao');

class ChapterDao {
    constructor(db) {
        this._db = db;
    }

    createChapter(name) {
        return new Promise((resolve, reject) => {
            let MangaDao = new MangaDao(this._db);
            MangaDao.getIdManga(name).then(manga_id => {
                this._db.query(
                    'INSERT INTO chapters (name, manga_id) VALUES ($1, $2)',
                    [name, manga_id],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        console.log(results.insertId);
                        return resolve(results.insertId);
                    }
                );
            }).catch(err => {
                return reject(err);
            });
        });
    }

    getChapters(manga) {
        return new Promise((resolve, reject) => {
            let MangaDao = new MangaDao(this._db);
            MangaDao.getIdManga(manga).then(manga_id => {
                this._db.query(
                    'SELECT * FROM chapters WHERE manga_id = $1',
                    [manga_id],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(results.rows);
                    }
                );
            }).catch(err => {
                return reject(err);
            });
        });
    }

}
module.exports = ChapterDao;