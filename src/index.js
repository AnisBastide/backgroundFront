import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BackgroundImage from './BackgroundImage'; // Importez le composant BackgroundImage
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <BackgroundImage /> {/* Remplacez <App /> par <BackgroundImage /> */}
    </React.StrictMode>,
    document.getElementById('root')
);

// Si vous souhaitez mesurer les performances de votre application, vous pouvez laisser le code reportWebVitals ici.