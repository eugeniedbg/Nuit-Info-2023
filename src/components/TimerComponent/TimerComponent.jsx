import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import styles from '../../styles/components/timercomponent.module.scss';


const TimerComponent = (props) => {
	const [seconds, setSeconds] = useState(90); // 90 secondes pour 1 minute 30 secondes
	const [progress, setProgress] = useState(100);

	useEffect(() => {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                    setProgress((prevProgress) => prevProgress - (100 / 90)); // Ajustez le décompte
                } else {
                    setProgress(0); // Réinitialisation de la valeur de progression à 0 une fois le temps écoulé
                    props.setIsTimerEnded(true); // Déclenche la fin du jeu
                    clearInterval(interval); // Arrêt du décompte
                }
            }, 1000); // Mise à jour chaque seconde

            return () => clearInterval(interval);
	}, [seconds]);

	return (
		<div className={styles.maincontainer}>
			<CircularProgress variant="determinate" value={progress} size={50} thickness={22} color='info'/>
			<Typography >{Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}</Typography>
		</div>
	);
};

export default TimerComponent;
