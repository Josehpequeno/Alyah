const AuthorDao = require('./author-dao');

class MangaDao {
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
                'SELECT * FROM mangas WHERE name = $1;',
                [name],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        console.log(name);
                        return reject("No results!");
                    }
                    return resolve(results.rows[0].id);
                }
            );
        });
    }
    getManga(name) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM mangas WHERE name = $1;',
                [name],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        console.log(name);
                        return reject("No results!");
                    }
                    let authorDao = new AuthorDao(this._db);
                    authorDao.getNameAuthor(results.rows[0].author_id).then(name => {
                        results.rows[0]["author"] = name;
                        return resolve(results.rows[0]);
                    }).catch(err => reject(err));
                }
            );
        });
    }
    getMangaById(id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM mangas WHERE id = $1;',
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return reject("No results!");
                    }
                    let authorDao = new AuthorDao(this._db);
                    authorDao.getNameAuthor(results.rows[0].author_id).then(name => {
                        results.rows[0]["author"] = name;
                        return resolve(results.rows[0]);
                    }).catch(err => reject(err));
                }
            );
        });
    }
    getAllMangas() {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM mangas;',
                [],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return reject("No results!");
                    }
                    let promises = [];
                    results.rows.forEach(row => {
                        let authorDao = new AuthorDao(this._db);
                        promises.push(authorDao.getNameAuthor(row.author_id));
                    });
                    Promise.all(promises).then((data) => {
                        for (let i = 0; i < data.length; i++) {
                            results.rows[i]["author"] = data[i];
                        }
                        return resolve(results.rows);
                    }).catch((err) => reject(err));
                }
            );
        });
    }

    getMangasHome() {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM mangas LIMIT 10;',
                [],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return reject("No results!");
                    }
                    let promises = [];
                    results.rows.forEach(row => {
                        let authorDao = new AuthorDao(this._db);
                        promises.push(authorDao.getNameAuthor(row.author_id));
                    });
                    Promise.all(promises).then((data) => {
                        for (let i = 0; i < data.length; i++) {
                            results.rows[i]["author"] = data[i];
                        }
                        return resolve(results.rows);
                    }).catch((err) => console.error(err));
                }
            );
        });
    }

    getMangasOrderByFavorites() {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM mangas ORDER BY favorites_count DESC LIMIT 10;',
                [],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return reject("No results!");
                    }
                    let promises = [];
                    results.rows.forEach(row => {
                        let authorDao = new AuthorDao(this._db);
                        promises.push(authorDao.getNameAuthor(row.author_id));
                    });
                    Promise.all(promises).then((data) => {
                        for (let i = 0; i < data.length; i++) {
                            results.rows[i]["author"] = data[i];
                        }
                        return resolve(results.rows);
                    }).catch((err) => console.error(err));
                }
            );
        });
    }

    addFavoriteManga(id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM mangas WHERE id = $1;',
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return reject("No results!");
                    }
                    this._db.query('UPDATE mangas SET favorites_count = $1 WHERE id = $2;',
                        [results.rows[0].favorites_count + 1, id],
                        (error, results) => {
                            if (error) {
                                return reject(error);
                            }
                            return resolve();
                        }
                    );
                }
            );
        });
    }
    removeFavoriteManga(id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM mangas WHERE id = $1;',
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        return reject("No results!");
                    }
                    this._db.query('UPDATE mangas SET favorites_count = $1 WHERE id = $2;',
                        [results.rows[0].favorites_count - 1, id],
                        (error, results) => {
                            if (error) {
                                return reject(error);
                            }
                            return resolve();
                        }
                    );
                }
            );
        });
    }
}
module.exports = MangaDao;