const jwt = require("jsonwebtoken");

// ====================
// token verification
// ====================

let verifyToken = (req, resp, next) => {

    let token = req.get("token");


    jwt.verify(token, process.env.TOKEN_SEED, (error, response) => {

        if (error) {
            return resp.status(401).json({
                ok: false,
                error: {
                    message: 'Token no válido'
                }
            });
        }

        req.user = response;

        next();

    });

}

// ====================
// Admin verification
// ====================

let verifyAdmin_Role = (req, resp, next) => {
    console.log(req.user);
    if (req.user.data.role === "ADMIN_ROLE") {
        next();
    } else {
        return resp.status(401).json({
            ok: false,
            error: {
                message: "Esta accion es solo para administradores."
            }
        });
    }

}

module.exports = {
    verifyToken,
    verifyAdmin_Role
} 