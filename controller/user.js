const User = require("../models/user.js");

module.exports.renderSignupform = (req, res) =>{
    res.render("./user/signup.ejs")
};

module.exports.signup = async (req, res) => {
    try {
        let { username , email , password} = req.body;
        const newUser = new User({ email, username});
        const registeredUser = await await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return  next(err);
              }
              req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
        });
    } catch (e) {
       req.flash("error", e.message);
       res.redirect("/signup");
    };
};

module.exports.renderLoginform =  (req, res) =>{
    res.render("./user/login.ejs")
};

module.exports.Logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return  next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
};

module.exports.Login =  async (req, res) => {
    req.flash( "success", "welcome back  to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
 };