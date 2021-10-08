class FavoriteListDao {
    constructor(db) {
        this._db = db;
    }

    createFavoriteList(manga_id, favorite_id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'INSERT INTO favorite_lists (manga_id, favorites_id) VALUES ($1, $2)',
                [manga_id, favorite_id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log(results.insertId);
                    return resolve(results);
                }
            );
        });
    }

}
module.exports = FavoriteListDao;