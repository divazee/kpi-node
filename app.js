const mongoose                  =   require('mongoose'),
      bodyParser                =   require('body-parser'),
      cors                      =   require('cors'),
      express                   =   require('express'),
      kpiRoutes                 =   require('./routes/kpi'),
      userRoutes                =   require('./routes/user'),
      User                      =   require('./models/user'),
    //   passport                  =   require('passport'),
    //   LocalStrategy             =   require('passport-local'),
    //   passportLocalMongoose     =   require('passport-local-mongoose')
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

// // PASSPORT CONFIGURATION
// app.use(require('express-session')({
//     secret: "My KPI Tracker is the bomb",
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser())

app.use(userRoutes)
app.use('/kpis', kpiRoutes);

app.listen(5000, () => console.log("server started..."))