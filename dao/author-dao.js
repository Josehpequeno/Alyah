class AuthorDao {
    constructor(db) {
        this._db = db;
    }

    createAuthor(name) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'INSERT INTO authors (name) VALUES ($1) RETURNING *',
                [name],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results.rows[0].id);
                }
            );
        });
    }

    getIdAuthor(name) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM authors WHERE name = $1',
                [name],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results.rows[0].id);
                }
            );
        });
    }
    getNameAuthor(id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT * FROM authors WHERE id = $1',
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.rows.length === 0) {
                        console.log(results.rows);
                        return reject("No author with this id!")
                    }
                    return resolve(results.rows[0].name);
                }
            );
        });
    }

}
module.exports = AuthorDao;