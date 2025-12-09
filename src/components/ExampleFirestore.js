import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ExampleFirestore = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch items from Firestore
  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const itemsList = [];
      querySnapshot.forEach((doc) => {
        itemsList.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsList);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item to Firestore
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.trim() === '') return;

    try {
      await addDoc(collection(db, 'items'), {
        name: newItem,
        createdAt: new Date(),
      });
      setNewItem('');
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Delete item from Firestore
  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Firestore Example</h2>
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleFirestore;

