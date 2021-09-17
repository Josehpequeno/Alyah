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
                    'INSERT INTO users (name, email, password, favorites_id) VALUES ($1, $2, $3, $4)',
                    [name, email, sha256(password), favorites_id],
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

    getAllUser() {
        return new Promise((resolve, reject) => {
            this_db.query(
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

}
module.exports = UserDao;