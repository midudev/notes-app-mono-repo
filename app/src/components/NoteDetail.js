import React from 'react'
import {
  Helmet
} from 'react-helmet'

export const NoteDetail = ({ note }) => {
  if (!note) return null

  return (
    <>
      <Helmet>
        <title>Note with id {note.id}</title>
      </Helmet>
      <div>
        <h2>{note.content}</h2>
        <div>{note?.user?.name}</div>
        <div>
          <strong>
            {note.important ? 'important' : ''}
          </strong>
        </div>
      </div>
    </>
  )
}
