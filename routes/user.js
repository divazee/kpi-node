const 
express     = require('express'),
router      = express.Router(),
mongoose    = require('mongoose'),

User        = require('../models/user')

router.post('/register', (req, res) => {
    const user = new User({
        _id: new mongoose.Schema.Types.ObjectId(),
        email: req.body.email,
        password:req.body.password
    })
})





module.exports = router;