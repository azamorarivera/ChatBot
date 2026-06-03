const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario= require('../modelos/Usuario')

const singToken = (user) =>
    jwt.sign({ uid: user._id, email:user.email}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || '7d',
    })

exports.registrar = async (req, res) =>{
    try{
        const {nombre,email, password} = req.body
        if(!nombre || !email || !password) return res.status(400).json({ error: 'Datos incompletos'})

        const existe = await Usuario.findOne({email})
        if(existe) return res.status(409).json({ error: 'El email ya esta registrado!! '})

        const passwordHash = await bcrypt.hash(password, 10)
        const user = await Usuario.create({ nombre, email, passwordHash})

        const token = singToken(user)
        res.status(201).json({ token, user: {id: user._id, nombre: user.nombre, email: user.email}})
    }catch (e){
        res.status(500).json({ error: 'Error al registrar', detalle: e.message})
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body
        if (!email || !password) return res.status(400).json({ error: 'Datos incompletos'})

        const user = await Usuario.findOne({ email })
        if(!user) return res.status(401).json({ error: 'Credenciales Invalidas'})

        const ok = await bcrypt.compare(password, user.passwordHash)
        if(!ok) return res.status(401).json({ error: 'Credenciales invalidas'})

        const token = singToken(user)
        res.json({ token, user: {id: user._id, nombre: user.nombre, email: user.email}})
    }catch (e){
        res.status(500).json({error: 'Error al iniciar sesion', detalle: e.message})
    }
}

exports.me = async (req, res) =>{
    try{
        const user = await Usuario.findById(req.uid).select('_id nombre email')
        if(!user) return res.status(404).json({ error: 'No encontrado'})
        res.json({user})
    }catch (e){
        res.status(500).json({ error: 'Error al obtener el perfil', detalle: e.message})
    }
}