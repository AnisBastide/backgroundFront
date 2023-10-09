import React, { useState, useEffect } from 'react';
import './BackgroundImage.css';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function BackgroundImage() {
    const [backgrounds, setBackgrounds] = useState([]);
    const [treasures, setTreasures] = useState([]);
    const [newBackground, setNewBackground] = useState({ link: '', width: 0, height: 0 });
    const [newTreasure, setNewTreasure] = useState({ image: '', score: 0 });
    const [selectedBackground, setSelectedBackground] = useState(null);

    useEffect(() => {
        fetchBackgrounds();
        fetchTreasures();
    }, []);

    const fetchTreasures = async () => {
        try {
            const response = await axios.get(`${backendUrl}/treasures`);
            setTreasures(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBackgrounds = async () => {
        try {
            const response = await axios.get(`${backendUrl}/backgrounds`);
            setBackgrounds(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addBackground = async () => {
        try {
            console.log("here");
            const requestData = {
                link: newBackground.link,
                height: parseInt(newBackground.height, 10),
                width: parseInt(newBackground.width, 10),
            };

            const response = await axios.post(`${backendUrl}/background`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);

            setBackgrounds([...backgrounds, response.data]);
            setNewBackground({ link: '', width: 0, height: 0 });

        } catch (error) {
            console.log(error);
        }
    };

    const selectBackground = (background) => {
        setSelectedBackground(background);
    };

    const addTreasure = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                image: newTreasure.image,
                score: parseInt(newTreasure.score, 10),
            };

            const response = await axios.post(`${backendUrl}/treasure`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);

            setNewTreasure((prevState) => ({ ...prevState, link: '', score: 0 }));

        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewTreasure({ ...newTreasure, file });
    };

    const deleteBackground = async (backgroundId) => {
        try {
            await axios.delete(`${backendUrl}/background/${backgroundId}`);

            const updatedBackgrounds = backgrounds.filter((background) => background.id !== backgroundId);
            setBackgrounds(updatedBackgrounds);
        } catch (error) {
        }
    };

    const deleteTreasure = async (treasureId) => {
        try {
            await axios.delete(`${backendUrl}/treasure/${treasureId}`);

            const updateTreasures = treasures.filter((treasure) => treasure.id !== treasureId);
            setTreasures(updateTreasures);
        } catch (error) {
        }
    };

    return (
        <div className="background-container">
            <h1>Liste des backgrounds images</h1>
                <ul>
                    {backgrounds.map((background) => (
                        <li key={background.id}>
                            <img src={background.link} alt={`Background ${background.id}`} />
                            <button onClick={() => deleteBackground(background.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>

            {/* ADD BACKGROUND */}
            <form onSubmit={addBackground}>
                <input
                    type="text"
                    placeholder="Link du background image"
                    value={newBackground.link}
                    onChange={(e) => setNewBackground({ ...newBackground, link: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Width du background"
                    value={newBackground.width}
                    onChange={(e) => setNewBackground({ ...newBackground, width: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Height du background"
                    value={newBackground.height}
                    onChange={(e) => setNewBackground({ ...newBackground, height: e.target.value })}
                />
                <button type="submit">Ajouter un background</button>
            </form>

            <h1>Liste des treasures</h1>
            <ul>
                {treasures.map((treasure) => (
                    <li key={treasure.id}>
                        <img src={treasure.image} alt={`Treasure ${treasure.id}`} />
                        <p>Score: {treasure.score}</p>
                        <button onClick={() => deleteTreasure(treasure.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            {/* ADD TREASURE */}
            <form onSubmit={addTreasure}>
                <input
                    type="text"
                    placeholder="Link du treasure"
                    value={newTreasure.image}
                    onChange={(e) => setNewTreasure({ ...newTreasure, image: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Score du trésor"
                    value={newTreasure.score}
                    onChange={(e) => setNewTreasure({ ...newTreasure, score: e.target.value })}
                />
                <button type="submit">Ajouter un treasure</button>
            </form>
        </div>
    );
}

export default BackgroundImage;