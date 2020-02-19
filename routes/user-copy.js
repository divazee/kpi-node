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



// KPI ROUTE
// router.get('/', checkAuth, function(req, res){
    router.get('/', function(req, res){
        // User.find({email: req.body.email})
        //     .then(users => {
        //         if (!users) {
        //             return res.status(404).json({ message: 'User not found' });
        //         }
        //         return KPI.find({user : req.body.userId}).exec()
        //     })
        KPI.find({user : req.body.userId}).exec()
            .then(kpis => res.send(kpis)
                // res.status(200).json({
                // count: kpis.length,
                // kpis
            // })
            )
            .catch(error => res.status(500).json({ error }))
        
        // KPI.find({}, function(err, kpis){
        //     err ? res.send(err) :
        //     res.send(kpis)
        // })
    })
    