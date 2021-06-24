const AuthorDao = require('./author-dao');

class MangarDao {
    constructor(db) {
        this._db = db;
    }

    createManga(name, description, author) {
        return new Promise((resolve, reject) => {
            let authorDao = new AuthorDao(this._db);
            authorDao.getIdAuthor(author).then(author_id => {
                this._db.query(
                    'INSERT INTO mangas (name, description, author_id) VALUES ($1, $2, $3)',
                    [name, description, author_id],
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
    getIdManga(name) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM mangas WHERE name = $1',
                [name],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results.rows);
                }
            );
        });
    }

}
module.exports = MangaDao;