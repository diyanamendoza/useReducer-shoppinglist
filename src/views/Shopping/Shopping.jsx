import { useState } from 'react'
import ItemList from '../../components/Items/ItemList'
import { ACTIONS, useItems } from '../../context/itemsContext'
import createId from '../../utils/utils'

export default function Shopping() {
    const { dispatch } = useItems()
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAdd(text)
        setText('')
    }

    const handleAdd = (text) => {
        dispatch({
            type: ACTIONS.ADD,
            id: createId(),
            text
        })
    }


    return (
        <>
        <h1>Shopping List</h1>
        <form onSubmit={handleSubmit}>
            <input required minLength='1' maxLength='25' type='text' aria-label='add-input' placeholder='Add an item' value={text} onChange={(e) => setText(e.target.value)} />
            <button type='submit' aria-label='add'>Add</button>
        </form>
        <ItemList />
        </>
    )
}
