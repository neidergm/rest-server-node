
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")


// Validacion de errores
let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido.'
}

// Modelo de usuario
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es necesario."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario."]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    role: {
        type: String,
        enum: validRoles,
        default: "USER_ROLE"
    },
    img: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        required: false,
        default: true
    },
    google: {
        type: Boolean,
        required: false,
        default: false
    }
});

// Metodo (toJSON) que siempre se ejecuta cuando se intenta imprimir la respuesta del objeto recibido desde la DB. (Elimina un campo del json que no quiera mostrarse al usuario)
userSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    
    delete userObject.password;

    return userObject;
}

// Validacion de campo 'role'.
userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico ya \"{VALUE}\" existe!' });

module.exports = mongoose.model("User", userSchema);

