const KitsuAPI = require('kitsu-node-js');
const kitsu = new KitsuAPI(debug = false);

const titleCase = text => {
    return text.toLowerCase()
        .split(' ')
        .map((word) => {
            return word[0].toUpperCase() + word.slice(1);
        }).join(' ')
}

// When searching by id, no filter is required.
mangaName = "Jishou F-Rank no Oniisama ga Game de Hyouka sareru Gakuen no Chouten ni Kunrin suru Sou desu yo?";
kitsu.getManga(mangaName, filter = "text")
    .then(mangas => {
        mangas.map(function (manga) {
            let slug = manga.attributes.slug;
            slug = slug.replace(/-/g, ' ');
            slug = titleCase(slug);
            console.log(slug);
            if ((manga.attributes.titles.en_jp === mangaName) && (slug === mangaName)) {
                console.log(manga);
            }
        });

    }, err => {
        console.log(err);
    });