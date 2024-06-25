const mongoose = require('mongoose');

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Not Started', 'Completed', 'In Progress'],
        required:true
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client'
    }

});

const Project=mongoose.model('Project',projectSchema);
module.exports=Project;