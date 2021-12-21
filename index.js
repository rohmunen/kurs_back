const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const auth = require('./controller/authController')
const vacancies = require('./controller/vacancyController')
const profile = require('./controller/profileController')
const authmid = require('./middleware/authMiddleware')
const connectDB = require('./initiateDBConnections')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors())


module.exports.connections = []
connectDB.init()
const PORT = 8000
app.post('/register', auth.register)
app.post('/connect', auth.connect)
app.get('/auth', authmid.requireAuth, auth.auth)
app.get('/skills', authmid.requireAuth, vacancies.skills)
app.get('/vacancy/:id', authmid.requireAuth, vacancies.vacancy)
app.get('/vacancies', authmid.requireAuth, vacancies.vacancies)
app.post('/completeemployee', authmid.requireAuth, profile.employeeComplete)
app.post('/completecompany', authmid.requireAuth, profile.companyComplete)
app.post('/createvacancy', authmid.requireAuth, vacancies.createVacancy)
app.listen(PORT, () => console.log("server is listening"))

