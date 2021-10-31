var colors = require('colors');
require('dotenv/config');

const jwt = require('jsonwebtoken'); //token
//* Token para o uso da api.
const token = jwt.sign({ id: 0 }, process.env.SECRET, {
    expiresIn: 300 // expires in 5min
});
console.log("Generated token for API:");
console.log(colors.rainbow(token)+'\n');