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
    urlDB = 'mongodb://cafeuser:123456c@ds041154.mlab.com:41154/cafe'
}

process.env.URLDB = urlDB;

