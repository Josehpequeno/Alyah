class AuthorDao {
    constructor(db) {
        this._db = db;
    }

    createAuthor(name) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'INSERT INTO authors (name) VALUES ($1)',
                [name],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log(results.insertId);
                    return resolve(results.insertId);
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
                    return resolve(results.rows);
                }
            );
        });
    }

}
module.exports = AuthorDao;