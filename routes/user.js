const 
express     = require('express'),
router      = express.Router(),
mongoose    = require('mongoose'),
bcrypt      = require('bcrypt'),

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

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    User.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            res.status(500).json({ message: 'User deleted' })
        })
        .catch(error => {
            console.log("delete error::::::::::", err)
            res.status(500).json({ error })
        })
})






module.exports = router;