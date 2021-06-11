const MFA = require('mangadex-full-api');

MFA.login('username', 'password123', './bin/.md_cache').then(() => {
    MFA.Manga.search({
        title: 'isekai',
        limit: Infinity // API Max is 100 per request, but this function accepts more
    }).then(results => {
        console.log(`There are ${results.length} manga with 'isekai' in the title:`);
        results.forEach((elem, i) => console.log(`[${i + 1}] ${elem.title}`));
    }).catch(console.error);
}).catch(console.error);