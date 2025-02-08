import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Para redirigir entre rutas
import { db } from '../Firebase/FirebaseConfig';
import FSection from '../Components/FSection';
import './Add.css';

export default function Add({ navigation }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [singer, setSinger] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [lists, setLists] = useState([]);
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'ClipCloud'));
      const allLists = snapshot.docs.map((doc) => doc.data().List).filter((list) => list);
      const uniqueLists = [...new Set(allLists)];
      setLists(uniqueLists);
    } catch (error) {
      console.error('Error loading lists:', error);
      alert('Failed to load lists.');
    }
  };

  const handleSaveVideo = async () => {
    const finalList = selectedList === 'new' ? newListName : selectedList;

    if (!title || !url || !singer || !finalList) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'ClipCloud'), {
        Title: title,
        Url: url,
        Singers: singer,
        List: finalList,
        timestamp: new Date(),
      });
      alert('Video added successfully!');
      navigate('/all');
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Failed to add video.');
    }
  };

  return (
    <div className="add-container">
      <input
        type="text"
        className="input"
        placeholder="Enter video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="Enter video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="Enter creator's name"
        value={singer}
        onChange={(e) => setSinger(e.target.value)}
      />

      <div className="list-container">
        <label>Select or Create a List</label>
        <select className="picker" value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
          <option value="">Select a list</option>
          {lists.map((list, index) => (
            <option value={list} key={index}>{list}</option>
          ))}
          <option value="new">Create New List</option>
        </select>
        {selectedList === 'new' && (
          <input
            type="text"
            className="input"
            placeholder="Enter new list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        )}
      </div>

      <button className="button" onClick={handleSaveVideo}>Save Video</button>
      <button className="button cancel" onClick={() => navigate('/all')}>Cancel</button>

      <div className="bottom-bar">
        <FSection
          currentSection={3}
          onPress={(id) => {
            if (id === 1) navigate("/all");
            else if (id === 2) navigate("/feed");
            else if (id === 3) navigate("/add");
            else if (id === 4) navigate("/favorites");
            else if (id === 5) navigate("/account");
          }}
        />
      </div>
    </div>
  );
}
