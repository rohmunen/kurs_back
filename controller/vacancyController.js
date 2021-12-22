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
    vacancy = await pool.connections[0].query(`SELECT getVacancy(${req.params.id});`).then(res=>{
        return res.rows
    }).catch(e => {
        console.error(e.stack)
    })
    res.send(vacancy)
}

module.exports.apply = async (req,res) => {
    await pool.connections[0].query(`SELECT apply(${req.body.iss},${req.body.vac})`).then(() => {
        res.status(200).send('ok')
    }).catch(e => {
        console.error(e.stack)
    })
}

module.exports.getapplied = async (req, res) => {
    console.log('iss',req.body.iss)
    await pool.connections[0].query(`SELECT getApplied(${req.params.id})`).then(result => {
        res.status(200).send(result.rows[0].getapplied)
    }).catch(e => {
        console.error(e.stack)
    })
}

module.exports.getvacancyresponses = async (req, res) => {
    console.log(`SELECT companyGetApplied(${req.params.id})`)
    await pool.connections[1].query(`SELECT companyGetApplied(${req.params.id})`).then(result => {
        res.status(200).send(result.rows[0].companygetapplied)
    }).catch(e => {
        console.error(e.stack)
    })
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
        '${req.body.country_currency}',
        ${req.body.vacancy_salary}
        )`)
    createvacancy = await pool.connections[1].query(`SELECT createVacancy(${req.body.iss},
        '${req.body.vacancy_name}',
        '${req.body.vacancy_description}',
        '${req.body.location_name}',
        '${req.body.location_address}',
        '${req.body.location_details}',
        '${req.body.country_name}',
        '${req.body.country_language}',
        '${req.body.country_currency}',
        ${req.body.vacancy_salary}
        )`).then(response => {
        res.status(200).send('ok')
        return res.rows
    }).catch(e => {
        console.error(e.stack)
        res.status(403).send('notok')
    })
}