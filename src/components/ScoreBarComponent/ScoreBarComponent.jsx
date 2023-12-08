import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material';

import styles from '../../styles/components/scorebarcomponent.module.scss';

const CustomProgressBar = ({ value }) => {
  const getGradientColor = (value) => {
    const green = '#006400'; // Vert foncé
    const lightGreen = '#35ED2F'; // Vert clair
    const yellow = '#EDC72F'; // Jaune
    const orange = '#FFA500'; // Orange
    const red = '#FF0000'; // Rouge

	value = value * 10;

	const normalizedValue = (value / 1000) * 100; // Normalisation de la valeur entre 0 et 100
	
    if (normalizedValue <= 25) {
      return `linear-gradient(to right, ${green}, ${lightGreen})`;
	  
    } else if (normalizedValue <= 50) {
      return `linear-gradient(to right, ${green}, ${lightGreen}, ${yellow})`;
	  
    } else if (normalizedValue <= 75) {
      return `linear-gradient(to right, ${green}, ${lightGreen}, ${yellow}, ${orange})`;
	  
    } else {
      return `linear-gradient(to right, ${green}, ${lightGreen}, ${yellow}, ${orange}, ${red})`;
	  
    }
  };

  const normalizedValue = (value / 1500) * 100; // Normalisation de la valeur entre 0 et 100

  return (
    <Box id={styles.boxScoreBar}>
        <Box id={styles.boxScore}>
            <Typography style={{ color: (normalizedValue <= 15) ? `#006400` : (normalizedValue <= 30) ? `#35ED2F` : (normalizedValue <= 50) ? `#EDC72F` : (normalizedValue <= 75) ? `#FFA500` : `#FF0000` }} variant="h2" color="initial">{value}</Typography>
        </Box>
        <Box id={styles.boxProgressBarAndText}>
            <LinearProgress
                variant="determinate"
                value={normalizedValue}
                sx={{
                height: '20px',
                borderRadius: '2px',
                '& .MuiLinearProgress-bar': {
                    backgroundImage: getGradientColor(normalizedValue),
                },
            }}
            />
            <Box id={styles.textUnderProgressBar}>
                <Typography variant="h5" color="initial">0</Typography>
                <Box id={styles.boxTypoNeutralite}>
                    <Typography className={styles.typoUnderProgressBar} variant="body1" color="initial">La neutralité carbone</Typography>
                    <Typography className={styles.typoUnderProgressBar} variant="body1" color="initial">est proche...</Typography>
                </Box>
                    <Typography className={styles.typoUnderProgressBar} variant="body1" color="initial">La Terre se réchauffe...</Typography>
                <Typography variant="h5" color="initial">1500</Typography>
            </Box>
        </Box>
    </Box>
  );
};


export default CustomProgressBar;
