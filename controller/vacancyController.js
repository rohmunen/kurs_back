const db = require('../db')
const pool = require('../index')

module.exports.skills = async (req,res) => {
    skills = await pool.connections[0].query('SELECT getSkills();').then(res =>{
        return res.rows
    }).catch(e => {
        console.error(e.stack)
    })
    res.send(skills)
}

module.exports.vacancies = async (req, res) => {
    vacancies = await pool.connections[0].query(`SELECT * FROM getvacancies() as x(vacancy vacancytype);`).then(res=>{
        return res.rows
    }).catch(e => {
        console.error(e.stack)
    })
    res.send(vacancies)
}

module.exports.vacancy = async (req,res) => {
    console.log('Im here!!', req.params.id)
    vacancy = await pool.connections[0].query(`SELECT getVacancy(${req.params.id});`).then(res=>{
        return res.rows
    }).catch(e => {
        console.error(e.stack)
    })
    res.send(vacancy)
}

module.exports.createVacancy = async (req, res) => {
    console.log(`SELECT createVacancy(${req.body.iss},
        '${req.body.vacancy_name}',
        '${req.body.vacancy_description}',
        '${req.body.location_name}',
        '${req.body.location_address}',
        '${req.body.location_details}',
        '${req.body.country_name}',
        '${req.body.country_language}',
        '${req.body.country_currency}'
        )`)
    createvacancy = await pool.connections[1].query(`SELECT createVacancy(${req.body.iss},
        '${req.body.vacancy_name}',
        '${req.body.vacancy_description}',
        '${req.body.location_name}',
        '${req.body.location_address}',
        '${req.body.location_details}',
        '${req.body.country_name}',
        '${req.body.country_language}',
        '${req.body.country_currency}'
        )`).then(response => {
        res.status(200).send('ok')
        return res.rows
    }).catch(e => {
        console.log('FKOBGOKIEDRBKOERKO')
        console.error(e.stack)
        res.status(403).send('notok')
    })
}