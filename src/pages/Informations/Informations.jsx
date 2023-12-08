import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardItem from '../../components/CardItem/CardItem';
import styles from '../../styles/pages/informations.module.scss';
import ResponsiveAppBar from "../../components/general/ResponsiveAppBar"

const Informations = () => {
	const [items, setItems] = useState([]);
  
	useEffect(() => {
	  const fetchItems = async () => {
		try {
		  // Récupérer les données depuis l'API
		  const response = await fetch('https://nuitinfoscala.osc-fr1.scalingo.io/api/item');
		  
		  if (!response.ok) {
			throw new Error(`Erreur HTTP! Statut : ${response.status}`);
		  }
  
		  const data = await response.json();
  
		  // Mettre à jour l'état avec les données
          shuffle(data);
		  setItems(data);
		} catch (error) {
		  console.error('Erreur lors de la récupération des données :', error);
		}
	  };
   
	  fetchItems();
	}, []);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

	return (
		<div>
			{/* Ajoute la ResponsiveAppBar en haut de ta page */}
			<ResponsiveAppBar />

			{/* Reste du contenu de la page */}
			<div className={styles.informationsPage}>
				<Typography variant="h1" className={styles.pageTitle}>
					Informations
				</Typography>
				<Typography variant="h5" className={styles.pageText}>
          			Sur cette page, nous vous fournissons des informations sur l'empreinte carbone de produits courants pour vous aider à comprendre leur impact sur le réchauffement climatique.
                </Typography>
                <Typography variant="body1" className={styles.pageText}>
                    <span className={styles.lineBreak}></span>
		  			<span className={styles.impactTitle}>Découvrez l'impact : </span>
          			Explorez notre liste d'items tels que les vélos, les centrales pétrolières, et bien d'autres. Chaque item est accompagné d'une estimation de son impact carbone, exprimée en kilogrammes de CO2 équivalents. Ces informations vous aident à prendre des décisions éclairées pour réduire votre impact environnemental.
          			<span className={styles.lineBreak}></span>
          			<span className={styles.impactTitle}>Pourquoi c'est important : </span>
          			Comprendre l'impact carbone des articles que nous utilisons au quotidien est essentiel pour prendre des décisions conscientes. Apprenez pourquoi certains articles sont plus respectueux de l'environnement que d'autres et découvrez comment chaque choix peut contribuer à la lutte contre le réchauffement climatique.
        		</Typography>

				<Box className={styles.itemsList}>
					{items.map((item) => (
						<CardItem
							key={item.id}
							image={item.imageUrl}
							name={item.name}
							score={item.score}
                            CO2={item.CO2}
							description={item.description}
						/>
					))}
				</Box>
			</div>
		</div>
	);
};

export default Informations;
