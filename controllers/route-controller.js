const templates = '../views/';
class RouteController {
    static routes() {
        return {
            home: '/',
            login: '/login',
            signup: '/signup',
            mangas: '/mangas',
            manga: '/manga',
            populares: '/populares',
            profile: '/profile',
            editProfile: '/editprofile',
            changePassword: '/changepassword',
            mangaReader: '/mangaReader'
        }
    }
    home() {
        return (req, res) => {
            return res.render(templates + 'home.handlebars', { layout: false, title: 'Alyah' });
        }
    }
    login() {
        return (req, res) => {
            return res.render(templates + 'login.handlebars', { layout: false });
        }
    }
    signup() {
        return (req, res) => {
            return res.render(templates + 'signup.handlebars', { layout: false });
        }
    }
    mangas() {
        return (req, res) => {
            return res.render(templates + 'mangas.handlebars', { layout: false });
        }
    }
    manga() {
        return (req, res) => {
            return res.render(templates + 'manga.handlebars', { layout: false });
        }
    }
    populares() {
        return (req, res) => {
            return res.render(templates + 'populares.handlebars', { layout: false });
        }
    }
    profile() {
        return (req, res) => {
            return res.render(templates + 'profile.handlebars', { layout: false });
        }
    }
    editProfile() {
        return (req, res) => {
            return res.render(templates + 'editProfile.handlebars', { layout: false });
        }
    }
    changePassword() {
        return (req, res) => {
            return res.render(templates + 'changePassword.handlebars', { layout: false });
        }
    }
    mangaReader() {
        return (req, res) => {
            let items = [
                { url: 'static/images/manga-static/manga1.jpg' },
                { url: 'static/images/manga-static/manga2.jpeg' },
                { url: 'static/images/manga-static/manga3.jpeg' },
                { url: 'static/images/manga-static/manga4.jpeg' },
                { url: 'static/images/manga-static/manga5.jpeg' },
                { url: 'static/images/manga-static/manga6.jpg' },
                { url: 'static/images/manga-static/manga7v3.jpeg' },
                { url: 'static/images/manga-static/manga8.jpg' },
                { url: 'static/images/manga-static/manga9.jpeg' },
                { url: 'static/images/manga-static/manga10.png' }
            ];
            const pages = [...Array(items.length + 1).keys()];
            let opt = '';
            pages.map(function (item) {
                if (item != 0) {
                    opt += `<option value="${item - 1}"> Page ${item} </<option>`;
                }
            });
            let images = '';
            let i = 0;
            items.map(function (item) {
                if (images === '') {
                    images += `<img alt="manga" src="${item.url}" id="page_${i}" />`;
                }
                images += `<img alt="manga" src="${item.url}" class="hidden" id="page_${i}" />`;
                i++;
            });
            return res.render(templates + 'mangaReader.handlebars', { layout: false, items: items, options: opt, images: images, length: i });
        }
    }
}
module.exports = RouteController;
