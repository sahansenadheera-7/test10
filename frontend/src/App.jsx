import { useEffect, useState } from 'react';
import { getItems } from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleEditComplete = () => {
    setEditingItem(null);
    fetchItems();
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Item Manager</h1>
      <ItemForm 
        onItemAdded={fetchItems} 
        editingItem={editingItem}
        onEditComplete={handleEditComplete}
      />
      <ItemList items={items} onRefresh={fetchItems} onEdit={handleEdit} />
    </div>
  );
}

export default App;
