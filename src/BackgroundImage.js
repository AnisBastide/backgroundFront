import React, { useState, useEffect } from 'react';
import './BackgroundImage.css';
import axios from 'axios';

function BackgroundImage() {
    const [backgrounds, setBackgrounds] = useState([]);
    const [newBackground, setNewBackground] = useState({ link: '', width: 0, height: 0 });
    const [newTreasure, setNewTreasure] = useState({ file: '', score: 0 });
    const [selectedBackground, setSelectedBackground] = useState(null);
    const backendUrl = process.env.BACKEND_URL;
    console.log(backendUrl);
    console.log("here");

    useEffect(() => {
        axios.get(`${backendUrl}/background`)
            .then((response) => {
                setBackgrounds(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const addBackground = async () => {
        try {
            console.log(backendUrl);
            console.log("here");
            const formData = new FormData();
            formData.append('link', newBackground.link);
            formData.append('width', newBackground.width);
            formData.append('height', newBackground.height);

            const response = await axios.post(`${backendUrl}/background`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setBackgrounds([...backgrounds, response.data]);
            setNewBackground({ link: '', width: 0, height: 0 });

        } catch (error) {
            console.error(error);
        }
    };

    const addTreasure = async (e) => {
        e.preventDefault();
        try {
            console.log(backendUrl);
            console.log("here");
            const formData = new FormData();
            formData.append('image', newTreasure.file.name);
            formData.append('score', newTreasure.score);

            const response = await axios.post(`${backendUrl}/treasure`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);

            setNewTreasure({ file: '', score: 0 });

        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewBackground({ ...newBackground, file });
    };

    const deleteBackground = async (backgroundId) => {
        try {
            await axios.delete(`${backendUrl}/background/${backgroundId}`);

            const updatedBackgrounds = backgrounds.filter((background) => background.id !== backgroundId);
            setBackgrounds(updatedBackgrounds);
        } catch (error) {
            console.error(error);
        }
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