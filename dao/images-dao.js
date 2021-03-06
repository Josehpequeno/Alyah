const ChapterDao = require('./chapter-dao');

class ImagesDao {
    constructor(db) {
        this._db = db;
    }

    createImages(url, chapter_name, manga) {
        return new Promise((resolve, reject) => {
            let chapterDao = new ChapterDao(this._db);
            chapterDao.getChapters(manga).then(results => {
                let chapter_id;
                results.forEach(function (chapter) {
                    if (chapter.name === chapter_name) {
                        chapter_id = chapter.id;
                    }
                })
                this._db.query(
                    'INSERT INTO images (url, chapter_id) VALUES ($1, $2) RETURNING *',
                    [url, chapter_id],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(results.rows[0].id);
                    }
                );
            }).catch(err => {
                reject(err);
            })
        });
    }

    getAllUrls(id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM images WHERE chapter_id = $1;',
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return reject("No results!");
                    }
                    return resolve(results.rows);
                }
            );
        });
    }
}
module.exports = ImagesDao;