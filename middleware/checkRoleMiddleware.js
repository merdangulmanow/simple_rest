const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const bearer = req.headers.authorization.split(' ')[0] 
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            // const {token} = req.cookies;
            if (bearer !== 'Bearer' || !token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.verified != true) {
                return res.status(403).json({message: "Номер не потверждён!"})
            }
            let access = false;
            for(var i = 0; i < decoded.role.length; i++){
                var jwt_role = decoded.role[i];
                for (var j = 0; j < role.length; j++){
                    if (jwt_role == role[j]) {
                        access = true;
                        break;
                    }
                }
            }
            if (access == false){
                return res.status(403).json({message: "Нет доступа!"})
            }
            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    };
}



