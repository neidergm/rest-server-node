// =========================
// PORT
// =========================

process.env.PORT = process.env.PORT || 3000;

// =========================
// ENVIRONMENT
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
// DATA BASE
// =========================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // MONGO_URI está creada en el entorno del proyecto e heroku 
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

