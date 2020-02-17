const 
express     = require('express'),
router      = express.Router(),
mongoose    = require('mongoose'),
bcrypt      = require('bcrypt'),
jwt         = require('jsonwebtoken'),

User        = require('../models/user')

router.post('/register', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1 ) { 
                return res.status(409).json({ message: 'Mail exists' })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                        })
                        user
                        .save()
                        .then(result => {
                            console.log("post result:::::::::", result)
                            res.status(201).json({ message: 'User created' })
                        })
                        .catch(err => {
                            console.log("post error::::::::::", err)
                            res.status(500).json({ error: err })
                        })                            
                    }
                })
            }
        }
    )
})

router.post('/login', (req, res) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({ message: 'Auth failed'})
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({ message: 'Auth failed' })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        id: user[0]._id
                    }, 
                    process.env.JWT_KEY, 
                    {
                        expiresIn: '1h'
                    })
                return res.status(200).json({ 
                    message: 'Auth successful', token
                })
            }
            res.status(401).json({ message: 'Auth failed' })
        })
    })
    .catch(error => {
        console.log("post login error", error)
        res.status(500).json({ error })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    User.remove({ _id: id })
    .exec()
    .then(result => res.status(500).json({ message: 'User deleted' }))
    .catch(error => {
        console.log("delete error::::::::::", err)
        res.status(500).json({ error })
    })
})

module.exports = router;