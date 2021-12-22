const db = require('../db')
const pool = require('../index')
module.exports.employeeComplete = async (req,res) => {
    console.log(`SELECT employeeComplete(${req.body.iss},
        '${req.body.employee_name}',
        '{${req.body.skills}},
        '${req.body.about}',
        '${req.body.gender}',
        '${req.body.age}',
        '${req.body.city}',
        '${req.body.country}',
        '${req.body.pos}',
        '${req.body.yearsOfWork}',
        '${req.body.educationName}',
        '${req.body.educationLevel}')`)
    await pool.connections[0].query(`SELECT employeeComplete(${req.body.iss},
        '${req.body.employee_name}',
        '{${req.body.skills}}',
        '${req.body.about}',
        '${req.body.gender}',
        '${req.body.age}',
        '${req.body.city}',
        '${req.body.country}',
        '${req.body.pos}',
        '${req.body.yearsOfWork}',
        '${req.body.educationName}',
        '${req.body.educationLevel}')`).then(result =>{
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

module.exports.companyGetEmployee = async(req,res) => {
    await pool.connections[1].query(`SELECT * FROM getEmployeeData(${req.params.id}) as x(employee emptype)`).then(result => {
        res.status(200).send(result.rows[0])
    }).catch(e => {
        console.error(e.stack)
        res.status(405).send('notok')
    })
}