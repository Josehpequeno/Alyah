const sha256 = require("crypto-js/sha256");
const FavoriteDao = require('./favorite-dao');
class UserDao {
    constructor(db) {
        this._db = db;
    }

    createUser(name, email, password) {
        return new Promise((resolve, reject) => {
            let favoriteDao = new FavoriteDao(this._db);
            favoriteDao.createFavorite().then(favorites_id => {
                this._db.query(
                    'INSERT INTO users (name, email, password, favorites_id) VALUES ($1, $2, $3, $4) RETURNING name, email, favorites_id',
                    [name, email, sha256(password), favorites_id],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(results.rows[0]);
                    }
                );
            }).catch(err => {
                return reject(err);
            });
        });
    }

    getAllUser() {
        return new Promise((resolve, reject) => {
            this._db.query(
                `SELECT * FROM users;`,
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    //response.status(200).send(`User modified with ID: ${id}`)
                    resolve(results.rows);
                }
            );
        });
    }

    searchEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT * FROM users WHERE email = $1
            `,
                [email],
                (err, results) => {
                    if (err || results.rows.length === 0) {
                        return reject("User not exist");
                    }
                    return resolve(results.rows);
                });
        });
    }

    searchName(name) {
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT * FROM users WHERE name = $1
            `,
                [name],
                (err, results) => {
                    if (err || results.rows.length === 0) {
                        return reject("User not exist");
                    }
                    return resolve(results.rows);
                });
        });
    }

}
module.exports = UserDao;