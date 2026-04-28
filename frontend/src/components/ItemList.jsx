import { deleteItem } from '../api'

export default function ItemList({ items, onRefresh, onEdit }) {
  const handleDelete = async (id) => {
    await deleteItem(id)
    onRefresh()
  }

  return (
    <div>
      <h2>Items</h2>

      {items.map(item => (
        <div key={item._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '200px', marginBottom: '1rem' }} />}
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p><strong>Price: ${item.price}</strong></p>
          <p><strong>Category: </strong>{item.category}</p>
          <p><strong>Customer Reviews: </strong>{item.customerReviewCount}</p>

          <button onClick={() => onEdit(item)} style={{ marginRight: '0.5rem' }}>
            Edit
          </button>
          <button onClick={() => handleDelete(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}