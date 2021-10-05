const ChapterDao = require('./chapter-dao');

class ImagesDao {
    constructor(db) {
        this._db = db;
    }

    createImages(url, chapter_name, manga) {
        return new Promise((resolve, reject) => {
            let chapterDao = new ChapterDao(this._db);
            chapterDao.getChapters(manga).then(results => {
                console.log(results);
                let chapter_id;
                //var arrayJson = JSON.parse(results);
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
                        // console.log(results);
                        return resolve(results.rows[0].id);
                    }
                );
            }).catch(err => {
                reject(err);
            })
        });
    }
}
module.exports = ImagesDao;