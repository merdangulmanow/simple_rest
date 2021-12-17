const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const bearer = req.headers.authorization.split(' ')[0] 
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (decoded.verified != true) {
            return res.status(403).json({message: "Номер не потверждён!"})
        }
        req.user = decoded
        next()
    } catch (e) {
        console.log(e.message);
        res.status(401).json({message: "Не авторизован!"})
    }
};
