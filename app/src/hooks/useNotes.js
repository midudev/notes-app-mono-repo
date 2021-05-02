import { useEffect, useState } from 'react'
import noteService from '../services/notes'

export function useNotes () {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchNotes = async () => {
      const initialNotes = await noteService.getAll()
      setNotes(initialNotes)
    }
    fetchNotes()
  }, [])

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    return noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }

  return {
    addNote,
    notes,
    toggleImportanceOf
  }
}
