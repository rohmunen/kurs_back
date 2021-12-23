const db = require('./db')
const con = require('./index')

module.exports.init = async() => {
    connections = []
    employeePool = await db.connectDB('employee', 'secret321').then(response => {
    return response
    }).catch(e => {
        console.error(e.stack)
    })
    companyPool = await db.connectDB('company', 'secret321').then(response => {
        return response
    }).catch(e => {
        console.error(e.stack)
    })
    con.connections.push(employeePool)
    con.connections.push(companyPool)
}