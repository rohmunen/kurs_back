const db = require('./db')
const con = require('./index')

module.exports.init = async() => {
    connections = []
    employeePool = await db.connectDB('employee', 'test').then(response => {
    return response
    }).catch(e => {
        console.error(e.stack)
    })
    companyPool = await db.connectDB('company', 'test').then(response => {
        return response
    }).catch(e => {
        console.error(e.stack)
    })
    adminPool = await db.connectDB('admin', 'test').then(response => {
        return response
    }).catch(e => {
        console.error(e.stack)
    })
    con.connections.push(employeePool)
    con.connections.push(companyPool)
    con.connections.push(adminPool)
}