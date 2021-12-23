const bcrypt = require('bcrypt')
const db = require('../db')
const token = require('../createJWT')
const maxAge = 3 * 24 * 60 * 60


module.exports.connect = async (req,res) => {
    let hash
    let id
    let role
    const authPool = await db.connectDB('auth', 'secret321').then((value) => {
        return value
    })
    hash = await authPool.query('SELECT getHash(\'' + req.body.email+'\');').then(res =>{
        return res.rows[0].gethash
    }).catch(e => {
        console.error(e.stack)
    })
    id = await authPool.query('SELECT getId(\'' + req.body.email+'\');').then(res =>{
        return res.rows[0].getid
    }).catch(e => {
        console.error(e.stack)
    })
    role = await authPool.query('SELECT getRole(\'' + req.body.email+'\');').then(res =>{
        return res.rows[0].getrole
    }).catch(e => {
        console.error(e.stack)
    })
    complete = await authPool.query('SELECT getComplete(\'' + req.body.email+'\');').then(res => {
        return res.rows[0].getcomplete
    }).catch(e => {
        console.error(e.stack)
    })
    console.log(complete)
    const validPassword = await bcrypt.compare(req.body.password, hash).catch(e => console.error(e.stack));
    if (validPassword) {
        res.status(201).send(token.createtoken(id, role, complete))
    } else {
        res.status(401).send('PASSWORD NOT VALID')
    }
}

module.exports.register = async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    hashed = await bcrypt.hash(req.body.password, salt);
    const authPool = await db.connectDB('auth', 'secret321').then((value) => {
        return value
    })
    id = await authPool.query(`SELECT register('${req.body.email}', '${hashed}', '${req.body.role}')`).then(result => {
        authPool.release() 
        return result.rows[0].register
    }).catch(e => {
        console.error(e.stack)
        res.status(400).send('error')
    })
    res.status(201).send(token.createtoken(id, req.body.role, false))
}

module.exports.auth = async (req, res) => {
    res.send('ok')
}