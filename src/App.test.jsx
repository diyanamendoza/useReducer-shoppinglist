import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { ItemsProvider } from './context/itemsContext'

it('should display a list of items', () => {
    render(<ItemsProvider><App /></ItemsProvider>)
    const itemList = screen.getByRole('list')
    expect(itemList).toHaveTextContent('Bacon')
    expect(itemList).toHaveTextContent('Spinach')
    expect(itemList).toHaveTextContent('Tofu')
})

it('should add an item to the list when add is pressed', () => {
    render(<ItemsProvider><App /></ItemsProvider>)
    const addInput = screen.getByRole('textbox', { name: 'add-input' })
    const addButton = screen.getByRole('button', { name: 'add' })
    const itemList = screen.getByRole('list')

    userEvent.type(addInput, 'Mochi')
    userEvent.click(addButton)
    expect(itemList).toHaveTextContent('Mochi')
})

it('should delete an item to the list when delete is pressed', () => {
    const { queryByText } = render(<ItemsProvider><App /></ItemsProvider>)
    const deleteTofuButton = screen.getByRole('button', { name: 'delete Tofu' })

    userEvent.click(deleteTofuButton)
    expect(queryByText('Tofu')).toBeNull()
})

it('should allow editing of an item in the list when edit is pressed', () => {
    render(<ItemsProvider><App /></ItemsProvider>)
    const editBaconButton = screen.getByRole('button', { name: 'edit Bacon' })
    userEvent.click(editBaconButton)

    const editInput = screen.getByRole('textbox', { name: 'edit' })
    expect(editInput).toBeInTheDocument()

})

