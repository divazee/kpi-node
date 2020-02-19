const mongoose  =   require('mongoose')

var kpiSchema  =  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {
        type: String,
        required: true
    },
    start_date: {  
        type : Date,
        default : Date.now
    },
    supposed_end_date: {  
        type : Date, 
    },
    rate: {
        type: Number,
        required: true
    },
    stage: String,
    status: String,
    percent: Number,
    end_date: {  
        type : Date, 
        // default : Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

var KPI = mongoose.model('KPI', kpiSchema)

module.exports = KPI