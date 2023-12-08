import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from '../../styles/components/carditem.module.scss';
import { Box } from '@mui/material';

const CardItem = ({ image, name, CO2, score, description }) => {
  return (
      
      
      <Card className={styles.card}>
        { name === "Bioplastiques" || name === "Voitures électriques avec batteries à base de métaux rares" || name === "Centrales électriques biomasse" || name === "Énergie éolienne" || name === "Énergie solaire" ? (
            <Box className={styles.diagonalBannerContainer}>
            <Typography className={styles.typoDiagonalBannerContainer} variant="h4" color="initial">Idée reçue !</Typography>
        </Box>
        ):null}
      <CardMedia component="img" height="140" image={image} alt={name} className={styles.cardImage} />
      <CardContent>
        <Typography variant="h5" component="div" className={styles.cardTitle}>
          {name}
        </Typography>
        {score > 0 ? (
          <Typography variant="body2" color="red" className={styles.cardScore}>
            Score: {score}
          </Typography>
        ) : (
          <Typography variant="body2" color="green" className={styles.cardScore}>
            Score: {score}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" className={styles.cardScore}>
          Taux de CO2: {CO2}
        </Typography>
        <Typography variant="body2" color="text.secondary" className={styles.cardDescription}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

CardItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardItem;
