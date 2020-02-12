const mongoose  =   require('mongoose')

var kpiSchema  =  new mongoose.Schema({
    task: String,
    start_date: {  
        type : Date,
        default : Date.now
    },
    supposed_end_date: {  
        type : Date, 
    },
    rate: Number,
    stage: String,
    status: String,
    percent: Number,
    end_date: {  
        type : Date, 
        // default : Date.now
    }
})

var KPI = mongoose.model('KPI', kpiSchema)

module.exports = KPI