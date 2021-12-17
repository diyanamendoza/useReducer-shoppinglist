import React from 'react'
import { useItems } from '../../context/itemsContext'
import Item from './Item'

export default function ItemList() {
    const { items } = useItems()

    return (
        <ul>
            {items.map(item => (
                <li key={item.id}><Item item={item}/></li>
            ))}
        </ul>
    )
}
