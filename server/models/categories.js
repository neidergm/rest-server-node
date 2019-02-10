const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let categoriesSchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, "The description is required"]
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

// categoriesSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico. ya \"{VALUE}\" existe!' });

module.exports = mongoose.model("Categories", categoriesSchema);