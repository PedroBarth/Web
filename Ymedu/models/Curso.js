const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    courseTitle : {
        type: String,
        required: true
    },
    courseDescription : {
        type: String,
        required: true
    },
    socialURL : {
        type: String
    },
    imgURL : {
        type: String,
        required: true
    },
    end : {
        type: String,
        required : true
    },
    autor : {
        type : String,
        required : true
    },
    autorID:{
        type: String        
    },
    valor : {
        type : Number,
        required : true
    }
});

const Curso = mongoose.model("Curso", cursoSchema);

module.exports = Curso;