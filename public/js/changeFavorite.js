const db = require('../../config/db');
const FavoriteListDao = require('../../dao/favorite_list-dao');

let favorite = new FavoriteListDao(db);
function changeFavorite(manga_id, favorite_id, favorited) {
    if (favorited) {
        favorite.ExitsFavoriteList(manga_id, favorite_id).then(bool => {
            if (bool) {
                return bool;
            }
            favorite.addFavoriteList(manga_id, favorite_id).then(() => {
                return !bool;
            }).catch((err) => {
                return err;
            })
        }).catch(err => {
            return err;
        })
    } else {
        favorite.ExitsFavoriteList(manga_id, favorite_id).then(bool => {
            if (bool) {
                favorite.removeFavoriteList(manga_id, favorite_id).then(() => {
                    return !bool;
                }).catch((err) => {
                    return err;
                })
            }
            return bool;
        }).catch(err => {
            return err;
        })
    }
}