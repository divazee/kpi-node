var 
express     = require('express'),
router      = express.Router(),
KPI         = require('../models/kpi'),
User        = require('../models/user'),
mongoose    = require('mongoose'),
checkAuth   = require('../middleware/check-auth')

router.post('/', checkAuth, function(req, res){
    User.findById(req.userData.id)
    // User.findById(req.body.userId)
    // console.log("object::::::::8", req.userData.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const kpi = new KPI({
                _id: mongoose.Types.ObjectId(),
                user: req.userData.id,
                task: req.body.task,
                rate: req.body.rate,
                supposed_end_date: req.body.supposed_end_date,
                status: req.body.status,
                start_date: req.body.start_date

            });
            console.log("object", kpi)
            return kpi.save();
        })
        .then(result => res.status(201).json({
            message: 'KPI created',
            createdKPI: {
                _id: result._id,
                user: result.user,
                task: result.task,
                rate: result.rate,
                supposed_end_date: result.supposed_end_date,
                status: result.status,
                start_date: result.start_date
            }
        }))
        .catch(error => {
            console.log("object", error)
            res.status(500).json({ error })
        })
    // try{
    //     let kpiObject = await KPI.create(req.body);        
    //     res.send(kpiObject);
    // } catch(e){
    //     console.log('error', e);
    //     res.status(422).send(e)
    // }
})

router.get('/', checkAuth, function(req, res){
// router.get('/', function(req, res){
    KPI.find({user : req.userData.id})
        .then(kpis => {
            res.send(kpis)
            // res.status(200).json({
            // // count: kpis.length,
            // kpis
            // })
        })
        .catch(error => res.status(500).json({ error }))
    
    // KPI.find({}, function(err, kpis){
    //     err ? res.send(err) :
    //     res.send(kpis)
    // })
})

router.get('/:id/edit', function(req, res){
    KPI.findById(req.params.id, function(err, kpis){
        err ? res.send(err) :
        res.send(kpis)
    })
})

router.put('/:id', async function(req, res){
    try {
        const updatedKPI = await KPI.findByIdAndUpdate(req.params.id, req.body,
            {new: true} // return the just updated kpi
        )
        console.log("Success2: ", req.body)
        res.send(updatedKPI)
        // res.status(200).json('ok')
    }catch(e){
        console.log("Update Error:::::", e.message);
        res.status(422).send(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedKPI = await KPI.findByIdAndRemove(req.params.id)
        console.log("delete req.params.id", req.params.id)
        res.send(deletedKPI)
    } catch(e){
        console.log("Delete Error:::::", e.message);
        res.status(422).send(e)
    }
})

module.exports = router;