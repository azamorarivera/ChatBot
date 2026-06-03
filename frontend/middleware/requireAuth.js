const jwt = require('jsonwebtoken')

module.exports = (req, _res, next) =>{
    const h = req.headers.authorization || '';
    const token = h.startsWith('Bearer ') ? h.slice(7):null;
    if (!token) return _res.status(401).json({ error: "Token Requerido"})
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = payload.uid
        next()
    }catch(e){
        _res.status(401).json({ error: 'Token Invalido'})
    }
}