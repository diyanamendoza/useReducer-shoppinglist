//following instructions from https://medium.com/suyeonme/using-usecontext-and-usereducer-together-lets-create-redux-like-global-state-in-react-87470e3ce7fa

import { useReducer, createContext, useContext, useMemo } from 'react'

export const ItemsContext = createContext()

export const ACTIONS = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete'
}

const initialItems = [
    { id: 0, text: 'Tofu', done: false },
    { id: 1, text: 'Spinach', done: false },
    { id: 2, text: 'Bacon', done: false },

]

function itemsReducer(items, action) {
    switch (action.type) {
        case ACTIONS.ADD: {
            return [ ...items, {
                id: action.id,
                text: action.text,
                done: false,
            }]
        }
        case ACTIONS.EDIT: {
            return items.map(item => {
                if (item.id === action.task.id) {
                    return action.task
                }
                return item
            })
        }
        case ACTIONS.DELETE: {
            return items.filter(item => item.id !== action.id)
        }
        default: {
            throw Error(`Unknown action: ${action.type}`)
        }
    }
}

export const ItemsProvider = ({ children }) => {
    const [items, dispatch] = useReducer(itemsReducer, initialItems)

    //per article linked above:
    //implementing useMemo to avoid having an inline object inside the value prop
    //prevents unnecessary re-rendering (since app component creates a new obj on value prop upon re-render)

    //useMemo will only recompute the memoized value when one of the dependencies has changed
    const contextValue = useMemo(() => {
        return { items, dispatch }
    }, [items, dispatch])

    return (
        <ItemsContext.Provider value={contextValue}>{children}</ItemsContext.Provider>
    )
}

export const useItems = () => {
    const context = useContext(ItemsContext)
    if (context === undefined) { throw new Error('useItems hook not called inside provider')}
    return context
}