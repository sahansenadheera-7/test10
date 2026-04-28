import { useState, useEffect } from 'react'
import { createItem, updateItem } from '../api'

export default function ItemForm({ onItemAdded, editingItem, onEditComplete }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('vehicle')
  const [customerReviewCount, setCustomerReviewCount] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || '')
      setDescription(editingItem.description || '')
      setPrice(editingItem.price || '')
      setCategory(editingItem.category || 'vehicle')
      setCustomerReviewCount(editingItem.customerReviewCount || '')
      setImageUrl(editingItem.imageUrl || '')
    }
  }, [editingItem])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editingItem) {
      await updateItem(editingItem._id, {
        name,
        description,
        price: Number(price),
        category,
        customerReviewCount: customerReviewCount ? Number(customerReviewCount) : 0,
        imageUrl
      })
      onEditComplete()
    } else {
      await createItem({
        name,
        description,
        price: Number(price),
        category,
        customerReviewCount: customerReviewCount ? Number(customerReviewCount) : 0,
        imageUrl
      })
    }

    setName('')
    setDescription('')
    setPrice('')
    setCategory('vehicle')
    setCustomerReviewCount('')
    setImageUrl('')
    onItemAdded()
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
    <div>
      <input placeholder="Item name" value={name}
        onChange={e => setName(e.target.value)} 
        required/>
    </div>
    <div>
      <input placeholder="Description" value={description}
        onChange={e => setDescription(e.target.value)} 
        required/>
    </div>
    <div>
      <input placeholder="Price" type="number" value={price}
        onChange={e => setPrice(e.target.value)} 
        required/>
    </div>
    <div>
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="vehicle">Vehicle</option>
        <option value="cloths">Cloths</option>
        <option value="foods">Foods</option>
        <option value="house">House</option>
      </select>
    </div>
    <div>
      <input placeholder="Customer Review Count" type="number" value={customerReviewCount}
        onChange={e => setCustomerReviewCount(e.target.value)} 
        />
    </div>
    <div>
      <input placeholder="Image URL" value={imageUrl}
        onChange={e => setImageUrl(e.target.value)} />
    </div>
      <button type="submit">{editingItem ? 'Update Item' : 'Add Item'}</button>
      {editingItem && <button type="button" onClick={onEditComplete} style={{ marginLeft: '0.5rem' }}>Cancel</button>}
    </form>
  )
}