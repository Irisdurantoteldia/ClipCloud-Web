import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import FSection from "../Components/FSection";
import "./All.css";

export default function All() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ClipCloud"));
      const dataFromFirestore = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(dataFromFirestore);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const openVideo = (videoUrl) => {
    let videoId = "";

    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      if (videoUrl.includes("youtube.com")) {
        const match = videoUrl.split("v=")[1]?.split("&")[0];
        if (match) {
          videoId = match;
        }
      } else if (videoUrl.includes("youtu.be")) {
        videoId = videoUrl.split("youtu.be/")[1];
      }
    }

    if (videoId) {
      navigate(`/videoPlayer/${videoId}`);
    } else {
      console.error("Invalid video URL:", videoUrl);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Segur que vols eliminar aquest vídeo?")) {
      try {
        await deleteDoc(doc(db, "ClipCloud", id));
        setData(data.filter((video) => video.id !== id));
      } catch (error) {
        console.error("Error eliminant el vídeo:", error);
      }
    }
  };

  return (
    <div className="container">
      {data.length === 0 ? (
        <div className="noDataContainer">
          <p className="loadingText">Loading...</p>
        </div>
      ) : (
        <div className="gridContainer">
          {data.map((item) => (
            <div key={item.id} className="videoCard">
              <div className="videoContent" onClick={() => openVideo(item.Url)}>
                <p className="title">{item.Title || "No Title"}</p>
                <p className="singers">{item.Singers || "Unknown Artist"}</p>
              </div>
              <button className="deleteButton" onClick={() => handleDelete(item.id)}>
                🗑️ Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bottomBar">
        <FSection
          currentSection={1}
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
