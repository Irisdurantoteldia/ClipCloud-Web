import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom'; // Para redirigir entre rutas
import FSection from '../Components/FSection';
import './Favorites.css';

export default function Favorites({ navigation }) {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate(); // Usamos useNavigate para redirigir

    // Carregar vídeos de la llista "Favorites"
    const loadFavoriteVideos = async () => {
        try {
            const videosQuery = query(
                collection(db, 'ClipCloud'),
                where('List', '==', 'Favorites')
            );
            const snapshot = await getDocs(videosQuery);
            const loadedVideos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVideos(loadedVideos);
        } catch (error) {
            console.error('Error loading favorite videos: ', error);
            alert('Failed to load favorite videos.');
        }
    };

    useEffect(() => {
        loadFavoriteVideos();
    }, []);

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
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            window.open(embedUrl, '_blank');
        } else {
            console.error("Invalid video URL:", videoUrl);
        }
    };

    return (
        <div className="container">
            <div className="video-list">
                {videos.map((item) => (
                    <div key={item.id} className="video-item" onClick={() => openVideo(item.Url)}>
                        <h3 className="video-title">{item.Title}</h3>
                        <p className="video-singer">By: {item.Singers}</p>
                    </div>
                ))}
            </div>

            <div className="bottom-bar">
                <FSection
                    currentSection={4}
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
