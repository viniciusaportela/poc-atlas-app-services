const Realm = require("realm")
config = require('dotenv').config();

const appId = process.env.APP_ID;

(async () => {
    const app = new Realm.App({
        id: appId,
    });

    await app.logIn(Realm.Credentials.emailPassword({
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
    }));
})();
