const Pool = require('pg').Pool

module.exports.connectDB = async(user, password) =>{
    const pool = new Pool({
        user: user,
        password: password,
        host: 'localhost',
        port: '5432',
        database: 'kurs',
        application_name:'GUI',
        ssl: false
    })
    
    return pool.connect()
    .then(client => {
        return client
    })
}