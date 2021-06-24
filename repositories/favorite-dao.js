const sha256 = require("crypto-js/sha256");
class FavoriteDao {
    constructor(db){
        this._db = db;
    }

    createFavorite () {
        return new Promise((resolve, reject) => {
            this._db.query(
                `INSERT INTO favorites DEFAULT VALUES;`,
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

}
module.exports = FavoriteDao;