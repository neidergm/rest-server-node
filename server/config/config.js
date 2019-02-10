// =========================
// PORT
// =========================

process.env.PORT = process.env.PORT || 3000;

// =========================
// ENVIRONMENT
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
// TOKEN EXPIRATION
// =========================
//1. Seconds.
//2. Minutes.
//3. Hours.
//4. Days.

process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// =========================
// TOKEN SEED
// =========================

process.env.TOKEN_SEED = process.env.TOKEN_SEED || "token-seed-development";

// =========================
// Google Client Id
// =========================

process.env.CLIENT_ID = process.env.CLIENT_ID || "361094489142-1s8fnp8jbme31qdr43u2chaa54k8v4ck.apps.googleusercontent.com";

// =========================
// DATA BASE
// =========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // MONGO_URI está creada en el entorno del proyecto e heroku 
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

