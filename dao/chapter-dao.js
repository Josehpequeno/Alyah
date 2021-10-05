const MangaDao = require('./manga-dao');

class ChapterDao {
    constructor(db) {
        this._db = db;
    }

    createChapter(name_manga, name_chapter) {
        return new Promise((resolve, reject) => {
            let mangaDao = new MangaDao(this._db);
            mangaDao.getIdManga(name_manga).then(manga_id => {
                this._db.query(
                    'INSERT INTO chapters (name, manga_id) VALUES ($1, $2)',
                    [name_chapter, manga_id],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve();
                    }
                );
            }).catch(err => {
                return reject(err);
            });
        });
    }

    getChapters(manga) {
        return new Promise((resolve, reject) => {
            let mangaDao = new MangaDao(this._db);
            mangaDao.getIdManga(manga).then(manga_id => {
                this._db.query(
                    'SELECT * FROM chapters WHERE manga_id = $1',
                    [manga_id],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        // console.log("here: "+ JSON.stringify(results.rows[0]));
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