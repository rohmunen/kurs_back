const db = require('../db')
const pool = require('../index')

module.exports.employeeComplete = async (req,res) => {
    await pool.connections[0].query(`SELECT employeeComplete(${req.body.iss},'${req.body.employee_name}', '{${req.body.skills}}')`).then(result =>{
        res.status(200).send('ok')
    }).catch(e => {
        console.error(e.stack)
        res.status(405).send('notok')
    })
}

module.exports.companyComplete = async (req,res) => {
    await pool.connections[1].query(`SELECT companyComplete(${req.body.iss},'${req.body.company_name}')`).then(result =>{
        res.status(200).send('ok')
    }).catch(e => {
        console.error(e.stack)
        res.status(405).send('notok')
    })
}