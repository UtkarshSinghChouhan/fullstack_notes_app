const Note = require('../models/note')

const fetchNotes = async(req, res) => {
    // Find the Notes
    const notes = await Note.find({user: req.user._id})
    
    // Respond with them
    
    res.json({notes})
}

const fetchSingleNoteById = async(req, res) => {

    // Get id from the url
    const noteId = req.params.id

    // Find note by id
    const note = await Note.findOne({_id: noteId, user : req.user._id})
    
    // Respond with note    
    res.json({note})
}

const updateSingleNoteById = async(req, res) => {

    // Get the Id off the URl
    const noteId = req.params.id;


    // Get the Data off the Request Bodt
    const title = req.body.title;
    const body = req.body.body;

    // Find note by id and Update it
    const note = await Note.findOneAndUpdate({_id: noteId, user: req.user._id}, {title, body})

    // Respond
    res.json(note)
}

const createNote = async(req, res) => {

    // Get the sent in data off the request body
    const title = req.body.title;
    const body = req.body.body;


    // Create a note with it
    const note = await Note.create({
        title,
        body,
        user: req.user._id
    })


    // respond with a new note
    res.json({note: note})
}

const deleteNoteById = async(req, res) => {

    // Get the Id of the URl
    const noteId = req.params.id;

    // Delete the Note
    await Note.deleteOne({_id : noteId, user: req.user._id})

    // respond 
    res.json({success : "record Deleted"}) 
}

module.exports = {
    fetchNotes, 
    fetchSingleNoteById, 
    updateSingleNoteById, 
    createNote, 
    deleteNoteById
}