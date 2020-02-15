const mongoose                  =   require('mongoose'),
      bodyParser                =   require('body-parser'),
      cors                      =   require('cors'),
      express                   =   require('express'),
      kpiRoutes                 =   require('./routes/kpi'),
      userRoutes                =   require('./routes/user'),
    //   cookieParser              =   require('cookie-parser'),
      app                       =   express();

mongoose.connect(
    'mongodb://localhost/kpi_tracker',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
// app.use(cookieParser());

app.use(userRoutes)
app.use('/kpis', kpiRoutes);

app.listen(5000, () => console.log("server started..."))