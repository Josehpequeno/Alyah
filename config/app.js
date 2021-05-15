const Vue = require('vue')
//require('./index.css');
module.exports = function createApp(context) {
    return new Vue({
        data: {
            url: context.url
        },
        template: `<div></div>`
    })
}