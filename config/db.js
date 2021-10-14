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
//     `DELETE FROM images WHERE chapter_id=12;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );

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

// pool.query(
//     `ALTER TABLE mangas ADD capa VARCHAR(255);`,
//     (error, results) => {
//         if (error) {
//             throw error;
//         }
//         console.log('================================');
//     }
// );

// pool.query(
//     `UPDATE mangas SET capa = 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Capas%2Fmanga9.jpeg?alt=media&token=dc1893ce-ed64-4af2-96a0-db09587c1321' 
//     WHERE id = 18;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log('================================');
//     }
// );

// pool.query(
//     `ALTER TABLE mangas RENAME COLUMN "capa" to "cover";`,
//     (error, results) => {
//         if (error) {
//             throw error;
//         }
//         console.log('================================');
//     }
// );

// pool.query(
//     `ALTER TABLE mangas 
//     ADD favorites_count INTEGER NOT NULL 
//     DEFAULT 0;`,
//     (error, results) => {
//         if (error) {
//             throw error;
//         }
//         console.log('================================');
//     }
// );

// pool.query(
//         `SELECT * FROM favorites_lists;`,
//         (error, results) => {
//             if (error) {
//                 throw error;
//             }
//             console.log("favorite_lists: ");
//             console.log(results.rows);
//         }
//     );

// pool.query(
//     `SELECT * FROM mangas;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         results.rows.forEach(element => {
//             console.log(element.name + " => " + element.id);
//         });
//         console.log('================================');
//     }
// );

// pool.query(
//     `SELECT * FROM users;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         results.rows.forEach(element => {
//             console.log(element);
//         });
//         console.log('================================');
//     }
// );

// pool.query(
//     `DELETE FROM users WHERE name = 'admin';`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );
// pool.query(
//     `ALTER TABLE users ADD profile VARCHAR(255);`,
//     (error, results) => {
//         if (error) {
//             throw error;
//         }
//         console.log('================================');
//     }
// );
// pool.query(
//     `ALTER TABLE mangas DROP COLUMN profile;`,
//     (error, results) => {
//         if (error) {
//             throw error;
//         }
//         console.log('================================');
//     }
// );


// pool.query(
//     `DELETE FROM users;`,
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results.rows);
//     }
// );
module.exports = pool;
