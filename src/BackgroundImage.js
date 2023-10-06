import React, { useState, useEffect } from 'react';
import './BackgroundImage.css';

function BackgroundImage() {
    const [backgrounds, setBackgrounds] = useState([]);
    const [newBackground, setNewBackground] = useState({ link: '', width: 0, height: 0 });
    const [newTreasure, setNewTreasure] = useState({ file: null, score: 0 });
    const [selectedBackground, setSelectedBackground] = useState(null);

    useEffect(() => {
    }, []);

    const addBackground = () => {
    };

    const addTreasure = () => {
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewBackground({ ...newBackground, file });
    };

    const deleteBackground = (backgroundId) => {
    };

    const selectBackground = (background) => {
        setSelectedBackground(background);
    };

    return (
        <div className="background-container">
            {/* Affichez la liste des images de fond */}
            <ul>
                {backgrounds.map((background) => (
                    <li key={background.id}>
                        <img src={background.link} alt={`Background ${background.id}`} />
                        <button onClick={() => deleteBackground(background.id)}>Supprimer</button>
                        <button onClick={() => selectBackground(background)}>Modifier</button>
                    </li>
                ))}
            </ul>

            {/* ADD TREASURE */}
            <form onSubmit={addTreasure}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewTreasure({ ...newTreasure, file: e.target.files[0] })}
                />
                <input
                    type="number"
                    placeholder="Score du trésor"
                    value={newTreasure.score}
                    onChange={(e) => setNewTreasure({ ...newTreasure, score: e.target.value })}
                />
                <button type="submit">Ajouter un treasure</button>
            </form>

            {/* ADD BACKGROUND */}
            <form onSubmit={addBackground}>
                <input
                    type="file" // Type "file" pour la sélection de fichier
                    accept="image/*" // Pour limiter la sélection aux fichiers image
                    onChange={handleFileChange} // Gérer le changement de fichier
                />
                <button type="submit">Ajouter un background</button>
            </form>
        </div>
    );
}

export default BackgroundImage;