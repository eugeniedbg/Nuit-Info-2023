// IntroPopUp.jsx

import React, { useState } from 'react';
import styles from '../../styles/components/intropopup.module.scss';

const IntroPopUp = (props) => {
    const [isPopUpVisible, setIsPopUpVisible] = useState(true);

    const handleClosePopUp = () => {
        setIsPopUpVisible(false);
        props.setPopupIsActiveForStartGame(false);
    };

    return (
        <div className={`${styles.popup} ${isPopUpVisible ? styles.visible : ''}`}>
            <div className={styles.popupContent}>
                <span className={styles.close} onClick={handleClosePopUp}>&times;</span>
                <h1>Oyé Terrien ! La planète Terre a besoin de toi !</h1>
				<br/>
				<p>Les gaz à effet de serre menacent de tuer notre monde ainsi que nous, habitants de cette planète ! Le réchauffement climatique est à notre porte et la Terre se consume, il te reste 1 an pour la faire revivre. Des objets vont tomber sur la planète Terre, et tous ne sont pas bons pour elle. Ta mission va être d’identifier et d’éviter les objets nocifs et à l’inverse de récupérer les objets bons ou qui ne polluent pas beaucoup par rapport à ce qu’ils produisent. Tu as la possibilité de déplacer la Terre de gauche à droite pour cela.<br/>
				Ton score de départ est de 500, il représente le bilan carbone actuel de la Terre. Si tu atteins le score de 1500, la Terre explose et tu as perdu. Si tu n’arrives pas à passer en dessous du seuil de départ au bout d’1 an, la Terre se consumera complètement et explosera également. Tu as 1 an pour passer en dessous de ce seuil et te rapprocher de la neutralité carbone pour sauver la planète et ses habitants.</p>

				<p>Bon courage, on compte sur toi !</p>
				<br/>
				<button onClick={handleClosePopUp}>Compris!</button>
            </div>
        </div>
    );
};

export default IntroPopUp;
