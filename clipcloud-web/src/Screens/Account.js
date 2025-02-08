import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import FSection from '../Components/FSection';
import './Account.css';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            setEmail(currentUser.email);
        }
    }, []);

    const handleLogout = () => {
        auth.signOut()
            .then(() => navigate('/login'))
            .catch((error) => {
                alert('No es pot tancar la sessió. Prova més tard.');
                console.error(error);
            });
    };

    const handleSocialLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="container">
            <div className="profile-container">
                <img src={user?.photoURL || 'https://via.placeholder.com/150'} alt="Profile" className="profile-image" />

                <input type="text" className="input-field" value={email} disabled placeholder="El teu correu electrònic" />

                <div className="separator"></div>

                <div className="social-buttons-container">
                    <button className="social-button" onClick={() => handleSocialLink('https://www.instagram.com/')}>
                        <img src="../assets/instagramLogo.png" alt="Instagram" className="social-icon" />
                    </button>

                    <button className="social-button" onClick={() => handleSocialLink('https://www.youtube.com/')}>
                        <img src="../assets/ytbLogo.png" alt="YouTube" className="social-icon" />
                    </button>
                </div>

                <div className="separator"></div>

                <p className="logout-prompt">Vols tancar sessió?</p>
                <button className="logout-button" onClick={handleLogout}>Tancar Sessió</button>
            </div>

            <div className="bottom-bar">
                <FSection
                    currentSection={5}
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
