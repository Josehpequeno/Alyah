const colors = require('colors');
const db = require('./db');
const MangaDao = require('../dao/manga-dao');
let mangaDao = new MangaDao(db);
require('dotenv/config');

mangaDao.getAllMangas().then(results => {
    console.log("Mangas: ");
    results.forEach(element => {
        console.log(colors.yellow("## " + element.name));
    })
    const jwt = require('jsonwebtoken'); //token
    //* Token para o uso da api.
    const token = jwt.sign({ id: 0 }, process.env.SECRET, {
        expiresIn: 1200 // expires in 20min
    });
    console.log("\nGenerated token for API:");
    console.log(colors.rainbow(token) + '\n');
}).catch(err => console.error(err));
