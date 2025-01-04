const express = require("express");
const {db} = require("./config/database");
const path = require("path");
const LocalStrategy = require('./middlewares/passportLocal');
const passport = require('passport');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash')

const port = 8083;

const app = express();

app.set('view engine', 'ejs');
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/assets')));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name:'User',
    secret: 'User@1234',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUserData);

app.use('/', require('./routers'));

app.listen(port, (err) => {
    if (!err) {
        db();
        console.log("server started on :- \n http://localhost:" + port);

    }
});