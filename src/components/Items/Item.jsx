import { useState } from 'react'
import { ACTIONS, useItems } from '../../context/itemsContext'

export default function Item({ item }) {
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState('')
    const { dispatch } = useItems()

    const handleEditStatus = (task) => {
        dispatch({
            type: ACTIONS.EDIT,
            task
        })
    }

    const handleEditText = (task) => {
        dispatch({
            type: ACTIONS.EDIT,
            task
        })
        setEditMode(false)
    }

    const handleDelete = (taskId) => {
        dispatch({
            type: ACTIONS.DELETE,
            id: taskId
        })
    }

    let itemContent

    if (editMode) {
        itemContent = (<><input required type='text' aria-label='edit' minLength='1' maxLength='25' width='30px' defaultValue={item.text} onChange={(e) => setText(e.target.value)}/>
                        <button type='button' aria-label='save' onClick={() => {handleEditText({...item, text})}}>Save</button>
                        </>)
    } else {
        itemContent = (<><p style={{ textDecoration: item.done ? 'line-through' : null }}>{item.text}</p>
                        <button type='button' aria-label={`edit ${item.text}`} onClick={() => setEditMode(true)}>Edit</button>
                        </>)
    }

    return (
        <>
            <input type='checkbox' checked={item.done} onChange={(e) => {handleEditStatus({ ...item, done: e.target.checked})}}/>
            {itemContent}
            <button type='button' aria-label={`delete ${item.text}`} onClick={() => handleDelete(item.id)}>Delete</button>
        </>
    )
}
