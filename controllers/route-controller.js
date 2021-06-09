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
            return res.render(templates + 'home.handlebars', { layout: false });
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
            return res.render(templates + 'mangaReader.handlebars', { layout: false });
            /*methods: {
                options() {
                    const pages = [...Array(context.items.length + 1).keys()];
                    let opt = '';
                    pages.map(function (item) {
                        if (item != 0) {
                            opt += `<option value="${item - 1}"> Page ${item} </<option>`;
                        }
                    });
                    return opt;
                }
            }*/
        }
    }
}
module.exports = RouteController;
