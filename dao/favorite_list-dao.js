class FavoriteListDao {
    constructor(db) {
        this._db = db;
    }

    addFavoriteList(manga_id, favorite_id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'INSERT INTO favorites_lists (manga_id, favorites_id) VALUES ($1, $2)',
                [manga_id, favorite_id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    // console.log(results.insertId);
                    return resolve(results.rows);
                }
            );
        });
    }
    removeFavoriteList(manga_id, favorite_id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'DELETE FROM favorites_lists WHERE manga_id = $1 AND favorites_id = $2',
                [manga_id, favorite_id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results.rows);
                }
            );
        });
    }
    ExitsFavoriteList(manga_id, favorite_id) {
        return new Promise((resolve, reject) => {
            this._db.query(
                'SELECT FROM favorites_lists WHERE manga_id = $1 AND favorites_id = $2',
                [manga_id, favorite_id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if( results.rows.length === 0){
                        return resolve(false);
                    }
                    return resolve(true);
                }
            );
        });
    }
}
module.exports = FavoriteListDao;