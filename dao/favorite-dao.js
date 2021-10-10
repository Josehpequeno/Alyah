class FavoriteDao {
    constructor(db){
        this._db = db;
    }

    createFavorite () {
        return new Promise((resolve, reject) => {
            this._db.query(
                `INSERT INTO favorites DEFAULT VALUES RETURNING *;`,
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results.rows[0].id);
                }
            );
        });
    }

    search(id) {
        return new Promise((resolve, reject) => {
            this._db.query(`
                SELECT * FROM favorites_lists WHERE favorites_id = $1
            `,
                [id],
                (err, results) => {
                    if (err || results.rows.length === 0) {
                        return reject("Favorites not exist");
                    }
                    return resolve(results.rows);
                });
        });
    }
}
module.exports = FavoriteDao;