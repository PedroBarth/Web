const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carrinhoSchema = new Schema({

    userID : {
        type : String,
        required : true
    },
    cursos : [
        {
            cursoID : { type: Schema.Types.ObjectId, ref: 'cursos'}
        }
    ]

});

const Carrinho = mongoose.model("Carrinho", carrinhoSchema);

module.exports = Carrinho;