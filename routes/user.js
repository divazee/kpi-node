const 
express     = require('express'),
router      = express.Router(),
passport    = require('passport'),
mongoose    = require('mongoose'),

User        = require('../models/user')



//handling user sign up
router.post('/register', function(req, res){
    req.body.username
    req.body.password
    User.register(
        new User({username: req.body.username}), 
        req.body.password, 
        function(err, user){
            if(err){
                console.log("errror:::::::", err)
            // } else {
            //     console.log("something", user)
                // return res.status(200).json('error')
                // return res.render('register')
            }
            passport.authenticate('local')(req, res, function(){
            // res.redirect('/secret')
            console.log("auth error")
            })
        }
    )
    console.log("reqbody", req.body)
    // return res.status(200).json('ok')
    // res.send()
})

// login logic
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login'
    }), 
    function(req, res){
    // res.send('login')
})







module.exports = router;