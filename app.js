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
        useUnifiedTopology: true
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
        console.log(e);
        res.status(422).send(e)
    }
})

app.get('/kpis', function(req, res){
    KPI.find({}, function(err, kpis){
        err ? res.send(err) :
        res.send(kpis)
    })
})

app.put('/kpis/:id', function(req, res){
    // const { task, start_date, supposed_end_date, stage, status, percent, end_date } = req.body;
    const status = KPI.findOneAndUpdate(req.params.id, req.body.status, function(err, newPercent){
        console.log("req.body.status1", req.body.status)
        err ? res.send("error", err) :
        // console.log("new status", status)
        console.log("req.body.status2", req.body.status)
        // res.send(status)    
    })
})

app.listen(5000, function(){
    console.log("server started...")
})