const sha256 = require("crypto-js/sha256");
const FavoriteDao = require('./favorite-dao');
const profileDefault = 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/profileImage%2Fuser6.png?alt=media&token=d7574240-8c64-4ef8-8a41-25f03de0b95a';
require('dotenv/config');
const cloudinary = require('cloudinary');
class UserDao {
    constructor(db) {
        this._db = db;
    }

    createUser(name, email, password) {
        return new Promise((resolve, reject) => {
            let favoriteDao = new FavoriteDao(this._db);
            favoriteDao.createFavorite().then(favorites_id => {
                this._db.query(
                    'INSERT INTO users (name, email, password, favorites_id, profile) VALUES ($1, $2, $3, $4, $5) RETURNING name, email, favorites_id',
                    [name, email, sha256(password).toString(), favorites_id, profileDefault],
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

    search(email) {
        return new Promise((resolve, reject) => {
            return this.searchEmail(email).then(user => resolve(user)).catch(err => {
                return this.searchName(email).then(user => resolve(user)).catch(err => reject(err));
            });
        });
    }

    updateUser(id, name, email, description, profile) {
        return new Promise((resolve, reject) => {
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET
            });
            cloudinary.v2.uploader.upload(profile, (error, result) => {
                if (error) reject(error);
                if (result) {
                    this._db.query('UPDATE users SET name = $1, email = $2, description = $3, profile = $4 WHERE id = $5;',
                        [name, email, description, result.url, id],
                        (error, results) => {
                            if (error) {
                                return reject(error);
                            }
                            return resolve(result.url);
                        });
                }
            });
        });
    }
    updateUserPassword(id, password) {
        return new Promise((resolve, reject) => {
            this._db.query('UPDATE users SET password = $1 WHERE id = $2;',
                [sha256(password).toString(), id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
        });
    }
}
module.exports = UserDao;