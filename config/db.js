require('dotenv/config');
const { Pool } = require('pg');
const red = '\u001b[31m';
const blue = '\u001b[34m';
const reset = '\u001b[0m';

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
});
/*
pool
    .connect()
    .then(client => {
        console.log("connection established")
        return client
          .query('SELECT * FROM users WHERE id = $1', [1])
          .then(res => {
            client.release()
            console.log(res.rows[0])
          })
          .catch(err => {
            client.release()
            console.log(err.stack)
          })
    });
*/
pool.connect(err => {
    if (err) {
        console.error(red + 'error connecting: ' + err.stack + reset);
    } else {
        console.log(blue + 'connection established' + reset);
    }
});
/* Manipulando o postgresql
pool.query(
    `CREATE DATABASE IF NOT EXISTS AlyahDB;`,
    (error, results) => {
        if (error) {
            console.error(error);
        }
        console.log(results);
    }
);

pool.query(
    `CREATE TABLE IF NOT EXISTS users (
        ID SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        favorites_id INTEGER,
        description TEXT DEFAULT ('') NOT NULL
      );`,
    (error, results) => {
        if (error) {
            console.error(error);
        }
        console.log(results);
    }
);

pool.query(
    `CREATE TABLE IF NOT EXISTS favorites (
        ID SERIAL PRIMARY KEY
      );`,
    (error, results) => {
        if (error) {
            console.error(error);
        }
        console.log(results);
    }
);
pool.query(
    `CREATE TABLE IF NOT EXISTS favorites_lists (
        ID SERIAL PRIMARY KEY,
        favorites_id INTEGER,
        manga_id INTEGER
      );`,
    (error, results) => {
        if (error) {
            console.error(error);
        }
        console.log(results);
    }
);

pool.query(
    `CREATE TABLE IF NOT EXISTS mangas (
        ID SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL UNIQUE,
        description TEXT DEFAULT ('') NOT NULL,
        author_id INTEGER
      );`,
    (error, results) => {
        if (error) {
            console.error(error);
        }
        console.log(results);
    }
);

pool.query(
    `CREATE TABLE IF NOT EXISTS authors (
        ID SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL UNIQUE
      );`,
    (error, results) => {
        if (error) {
            console.error(error);
        }
        console.log(results);
    }
);

pool.query(
    `CREATE TABLE IF NOT EXISTS chapters (
        ID SERIAL PRIMARY KEY,
        name VARCHAR(40),
        manga_id INTEGER
      );`,
    (error, results) => {
        if (error) {
            console.error(error);
        }
        console.log(results);
    }
);

pool.query(
    `CREATE TABLE IF NOT EXISTS images (
        ID SERIAL PRIMARY KEY,
        url VARCHAR(255),
        description TEXT DEFAULT ('') NOT NULL,
        chapter_id INTEGER
      );`,
    (error, results) => {
        if (error) {
            console.error(error);
        }
        console.log(results);
    }
);
*//*
pool.query(
    `INSERT INTO users (name, email, password, description, favorites_id)
    VALUES ('Joseh', 'joseh@example.com', '12345','sudo user', 1)`,
    (error, results) => {
        if (error) {
            throw error
        }
        console.log(results);
    }
);*/
//mostra todos os usuários e suas informações.
// pool.query(
//     `SELECT * FROM users;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );

// Apagando todos os usuários
// pool.query(
//     `DELETE FROM users;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );

// Apagando todos os usuários
// pool.query(
//     `DELETE FROM authors;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );
// pool.query(
//     `DELETE FROM mangas;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );
// pool.query(
//     `SELECT * FROM authors;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );
pool.query(
    //ALTER TABLE mangas ALTER COLUMN name TYPE text USING name::varchar;
    `SELECT * FROM mangas;`,
    //`UPDATE mangas SET name = 'Ahiro no Sora' WHERE name = 'Ahiru no Sora';`,
    (error, results) => {
        if (error) {
            throw error
        }
        //console.log("teste: " + results.rows);
        results.rows.forEach(element => {
            console.log(element.name + " => " + element.id);
            // if (element.name == "Ahiru no Sora"){
            //     console.log("here [x]");
            // }
        });
        console.log('================================');
    }
);
// pool.query(
//     `DELETE FROM chapters;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );
// const ChapterDao = require('../dao/chapter-dao');
// let chapterDao = new ChapterDao(pool);
// chapterDao.createChapter('Yesterday wo Utatte', '1').then(() => {
// pool.query(
//     `SELECT * FROM chapters;`,
//     (error, results) => {
//         if (error) {
//             throw error;
//         }
//         console.log("Chapters: ");
//         console.log(results.rows);
//     }
// );
// }).catch(err => console.log(err));

// pool.query(
//     `DELETE FROM images;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );

const ImagesDao = require('../dao/images-dao');
let urls = [
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_000.jpg?alt=media&token=b7081417-fb17-4404-a1e3-17c93edab01d',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_001.jpg?alt=media&token=9dc2f7d0-f1f1-4f28-b433-d96369201471',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_002.png?alt=media&token=47c0fc2d-c754-44ef-a974-6af5bf93ef47',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_003.png?alt=media&token=e629e0f7-e839-492e-9ca8-7766563167ce',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_004.png?alt=media&token=abce0efd-73a5-480a-92b3-a40a082818ab',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_005.png?alt=media&token=b81171a9-6eca-4a4c-bdba-b9a45ac70ba8',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_006.png?alt=media&token=bae7bbe7-f86f-4c84-981d-e050d0f0e101',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_007.png?alt=media&token=fc1f83f9-ddab-49fe-b33a-1c2f2c95ba5a',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_008.png?alt=media&token=303dea1a-2c1a-47db-b7d0-ed4ca6b66273',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_009.png?alt=media&token=b4b63ceb-fd1e-4718-85c6-e97f6dd13c64',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_010.png?alt=media&token=3753206c-e17a-450d-858d-34e1c6ef51b4',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_011.png?alt=media&token=a6c4f800-f9b4-4306-a0a1-4b15b73ab6b6',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_012.png?alt=media&token=dbcb1213-e42f-4a60-8af0-6cd9a39f2c31',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_013.png?alt=media&token=cdb013d1-538c-4f42-97a9-853c786a729e',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_014.png?alt=media&token=9ae48326-d53d-4b84-9470-820f8a724250',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_015.png?alt=media&token=c42b8c32-8413-4504-8c81-376f8d131a6f',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_016.png?alt=media&token=f658c70e-b0a5-4d71-9a13-9c13eafc4c14',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_017.png?alt=media&token=e2527e2f-75be-423f-9f70-3a866f075d81',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_018.png?alt=media&token=d9566155-30ca-4a0d-a956-b499a3f9e34f',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_019.png?alt=media&token=225a8392-2934-41be-8a05-d5b48e5f8313',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_020.png?alt=media&token=e37a46be-7557-47c8-b7f0-d22cfee80f3c',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_021.png?alt=media&token=09e2d784-3ebb-424f-b1f7-4ba5f7886a61',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_022.png?alt=media&token=62997311-1bca-4775-a396-86b389047f1b',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_023.png?alt=media&token=6c0142b7-0ab0-4f1d-ac9b-b8d1246d157f',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_024.png?alt=media&token=fe53cc99-2028-4ae7-8982-323501daa71e',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_025.png?alt=media&token=3be6b3d9-fc7e-4086-a414-f6bc523781db',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_026.png?alt=media&token=d67325c0-cf20-4e25-a71f-00d297aa4177',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_027.png?alt=media&token=4ab2d835-1c84-497f-9cdb-965f7605ecd7',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_028.png?alt=media&token=2ad856e9-9aa7-45a9-9ec6-c52a3b46efa7',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_029.png?alt=media&token=aa800627-8326-494d-bc61-ac095d1a067e',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2F01_030.png?alt=media&token=884becba-9a63-4139-849f-f79dc2e44f78',
    'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Yesterday%20wo%20Utatte%2Fcapitulo%20%231%20-%20Yesterday%20wo%20Utatte%2FCrditos.jpg?alt=media&token=dad6a199-7791-43d4-a03e-c79299f880a4'
]
//let i = 0;
//let aux = -1;
async function f1(url) {
    let imagesDao = new ImagesDao(pool);
    // try {
    let id = await imagesDao.createImages(
        url,
        '1', 'Yesterday wo Utatte');
    // ).then(() => {
    console.log("id: " + id);
    pool.query(
        `SELECT * FROM images;`,
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log("Images: ");
            console.log(results.rows);
            console.log('============================================');
        }
    );
    //return i + 1;
    // } catch (e) { console.log(e); /*return i;*/ }

    //     i++;
    // }).catch(err => console.log(err));
}
//adicionar de forma sequencial e assincrona.
// (async () => {
//     for (let url of urls) {
//         //console.log(aux == i);
//         // if (aux < i) {
//         //     aux++;
//         await f1(url);
//         //     i++;
//         //     console.log("here: " + i);
//         // i++;
//         // }
//     }
// })();

// pool.query(
//     `SELECT * FROM images ORDER BY id;`,
//     (error, results) => {
//         if (error) {
//             throw error;
//         }
//         console.log("Images: ");
//         console.log(results.rows);
//         console.log('============================================');
//     }
// );

module.exports = pool;
