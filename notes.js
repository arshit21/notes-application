const chalk = require('chalk')
const fs = require('fs')

const addNote = function(title, body) {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }

};

const removeNote = function(title) {
    const notes = loadNotes()
    const newNotes = notes.filter(function(note) {
        return note.title !== title
    })
    if(notes.length === newNotes.length){
        console.log(chalk.bgRed('No note found!'))
    } else {
        saveNotes(newNotes);
        console.log(chalk.bgGreen('Note deleted'))
    }
}

const listNotes = function() {
    const notes = loadNotes()
    console.log(chalk.blue.bold('Your Notes:-'))
    for(let i = 0; i < notes.length; i++){
        console.log(notes[i].title)
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const readNotes = function(title) {
    const notes = loadNotes()
    SearchedNote = notes.find((note) => note.title === title)
    if(SearchedNote) {
        console.log(chalk.italic.green(SearchedNote.title))
        console.log(SearchedNote.body)
    } else {
        console.log(chalk.bgRed('No Note with the given title exists'))
    }
}

const loadNotes = function () {
    try {
        dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes : readNotes ,
}