import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import FSection from '../Components/FSection';
import './Feed.css';

export default function Feed() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const loadVideos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'ClipCloud'));
      const loadedVideos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(loadedVideos);
    } catch (error) {
      console.error('Error loading videos: ', error);
      alert('Failed to load videos.');
    }
  };

  const loadVideosByList = async (listName) => {
    try {
      const videosQuery = query(
        collection(db, 'ClipCloud'),
        where('List', '==', listName)
      );
      const snapshot = await getDocs(videosQuery);
      const loadedVideos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(loadedVideos);
      setSelectedList(listName);
    } catch (error) {
      console.error('Error loading videos by list: ', error);
      alert('Failed to load videos.');
    }
  };

  const loadLists = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'ClipCloud'));
      const allVideos = snapshot.docs.map((doc) => doc.data());
      const uniqueLists = [...new Set(allVideos.map((video) => video.List).filter((list) => list))];
      setLists(uniqueLists);
    } catch (error) {
      console.error('Error loading lists: ', error);
      alert('Failed to load lists.');
    }
  };

  const openVideo = (videoUrl) => {
    let videoId = '';
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      if (videoUrl.includes('youtube.com')) {
        const match = videoUrl.split('v=')[1]?.split('&')[0];
        if (match) {
          videoId = match;
        }
      } else if (videoUrl.includes('youtu.be')) {
        videoId = videoUrl.split('youtu.be/')[1];
      }
    }
    if (videoId) {
      navigate(`/videoPlayer/${videoId}`);
    } else {
      console.error('Invalid video URL:', videoUrl);
    }
  };

  useEffect(() => {
    loadLists();
    loadVideos();
  }, []);

  return (
    <div className="container">
      {selectedList === null ? (
        <div className="listContainer">
          {lists.map((item, index) => (
            <div key={index} onClick={() => loadVideosByList(item)} className="listItem">
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div className="videoContainer">
          {videos.map((item) => (
            <div key={item.id} onClick={() => openVideo(item.Url)} className="videoItem">
              <p className="title">{item.Title || 'No Title'}</p>
              <p className="singers">By: {item.Singers || 'Unknown Artist'}</p>
            </div>
          ))}
          <button onClick={() => setSelectedList(null)} className="backButton">Back to Lists</button>
        </div>
      )}

      <div className="bottomBar">
        <FSection
          currentSection={2}
          onPress={(id) => {
            if (id === 1) navigate('/all');
            else if (id === 2) navigate('/feed');
            else if (id === 3) navigate('/add');
            else if (id === 4) navigate('/favorites');
            else if (id === 5) navigate('/account');
          }}
        />
      </div>
    </div>
  );
}
