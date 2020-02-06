const mongoose  =   require('mongoose'),
      bodyParser =  require('body-parser'),
      KPI      =   require('./models/kpi'),
      cors      =   require('cors'),
      express   =   require('express'),
      app       =   express();

mongoose.connect(
    'mongodb://localhost/kpi_tracker',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/kpis', async function(req, res){
    try{
        const { task, start_date, supposed_end_date, stage, status, percent, end_date } = req.body;
        console.log("reqbody", req.body)
        console.log("req.body.percent", req.body.percent)
        let kpiObject = await KPI.create({ task, start_date, supposed_end_date, stage, status, percent, end_date });
        
        res.send(kpiObject);
    }catch(e){
        console.log('error', e);
        res.status(422).send(e)
    }
})

app.get('/kpis', function(req, res){
    KPI.find({}, function(err, kpis){
        err ? res.send(err) :
        res.send(kpis)
    })
})

app.get('/kpis/:id/edit', function(req, res){
    KPI.findById(req.params.id, function(err, kpis){
        err ? res.send(err) :
        // console.log("edit route", kpis)
        // console.log("edit req.params.id", req.params.id)
        // res.send('kpis')
        res.send(kpis)
    })
})

app.put('/kpis/:id', async function(req, res){
    try {
    // const { task, start_date, supposed_end_date, stage, status, percent, end_date } = req.body;
        // const body = await KPI.findByIdAndUpdate(req.params.id, req.body, function(err, kpi){
        const body = await KPI.findByIdAndUpdate(req.params.id, req.body,
            {new: true} // return the just updated kpi
        )
        console.log("Success2: ", req.body)
        res.send(body)
        // res.status(200).json('ok')
    }catch(e){
        console.log("Error:::::", e.message);
        res.status(422).send(e)
    }
})

app.listen(5000, function(){
    console.log("server started...")
})