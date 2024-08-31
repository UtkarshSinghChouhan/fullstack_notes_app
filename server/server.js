// Load env variables
if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}


// Import Dependencies
const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectToDb = require('./config/connectToDb')
const notesController = require('./controllers/notes-controllers')
const userControllers = require('./controllers/user-controllers')
const requireAuth = require('./middlewares/require-auth')

//======================= Create an express app =======================
const app = express()


//======================= Configure express app =======================
app.use(express.json());
app.use(cors({
    origin: true,
    credentials : true
}))
app.use(cookieParser())


//======================= Connect to Database =======================
connectToDb()




//======================= Routing =======================
app.get('/', (req, res) => {
    res.json({Hello : "world!"})
})


// fetch all notes from the Database
app.get('/notes', requireAuth, notesController.fetchNotes)

// fetch single note
app.get('/notes/:id', requireAuth, notesController.fetchSingleNoteById)

// Update a Single Note
app.put('/notes/:id', requireAuth, notesController.updateSingleNoteById)

// Create a note
app.post('/notes', requireAuth, notesController.createNote)

// Delete a Note
app.delete('/notes/:id', requireAuth, notesController.deleteNoteById)


app.post('/signup', userControllers.signUp)
app.post('/login', userControllers.login)
app.get('/logout', userControllers.logout)



app.get('/check-auth', requireAuth,  userControllers.checkAuth)




//======================= Start ther server =======================
app.listen(process.env.PORT);