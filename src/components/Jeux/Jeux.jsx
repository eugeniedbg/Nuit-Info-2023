import ReactFlow, { useNodesState, useEdgesState, Panel } from 'reactflow';
import FallenObjet from './FallenObject';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/components/jeux.module.scss';
import Earth from '../Earth/Earth';
import ScoreBarComponent from '../ScoreBarComponent/ScoreBarComponent';
import TimerComponent from '../TimerComponent/TimerComponent';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Jeux = (props) => { 
    const [elements, setElements] = useState([]);
    const [score, setScore] = useState(500);
    const [isTimerEnded, setIsTimerEnded] = useState(false);
    const [open, setOpen] = useState(false); // State for controlling the dialog open/close
    const [intervalCount, setIntervalCount] = useState(0);

    const [stopGame, setStopGame] = useState(false);

    useEffect(() => {
        if(!stopGame) {
            const intervalId = setInterval(() => {
                const numero = Math.floor(Math.random() * 20) + 1; // numéro aléatoire entre 1 et 20

                fetch(`http://nuitinfoscala.osc-fr1.scalingo.io/api/item/id/${numero}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Host': 'https://localhost:3001'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const newElement = {
                            id: Date.now(),
                            top: 0,
                            left: Math.random() * ((window.innerWidth * 0.9) - 50),
                            size: 70,
                            image: data.imageUrl, // Récupère l'URL de l'image à partir de la réponse de l'API
                            score: data.score, // Récupère le score à partir de la réponse de l'API
                        };

                        setElements((prevElements) => [...prevElements, newElement]);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }, 1000 ); // Crée un nouvel élément toutes les 3 secondes + 3 secondes supplémentaires toutes les 10 secondes

            const updateElementsPosition = () => {
                setElements((prevElements) => {
                    return prevElements.map((element) => {
                        return {
                            ...element,
                            top: element.top + 15 , // Augmente la vitesse toutes les 10 secondes
                        };
                    });
                });
            };
        
            const positionIntervalId = setInterval(updateElementsPosition, 100); // Met à jour la position toutes les 10 secondes

            if (isTimerEnded) {
                clearInterval(intervalId); // Arrête l'intervalle de création d'éléments
                clearInterval(positionIntervalId); // Arrête l'intervalle de mise à jour de la position
                setOpen(true); // Open the dialog when the timer ends
            }

            return () => {
                clearInterval(intervalId); // Nettoie l'intervalle lorsque le composant est démonté
                clearInterval(positionIntervalId); // Nettoie l'intervalle de mise à jour de la position
            };
        }
    }, [isTimerEnded, stopGame]); // Exécute le useEffect à chaque fois que isTimerEnded ou props.setPopupIsActiveForStartGame change



    const handleElementClick = (id, elementScore) => {
        // Retire l'élément du tableau et ajoute son score au score total
        setElements((prevElements) => prevElements.filter((el) => el.id !== id));
        setScore((prevScore) => prevScore + elementScore);
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog
    };

    const checkCollision = () => {
        const elementsToRemove = [];
      
        elements.forEach((element) => {
          const centerX = element.left + element.size / 2;
          const centerY = element.top + element.size / 2;
          const earth = document.getElementById('earth');
      
          if (
            centerX >= earth.offsetLeft &&
            centerX <= earth.offsetLeft + earth.offsetWidth &&
            centerY >= earth.offsetTop &&
            centerY <= earth.offsetTop + earth.offsetHeight
          ) {
            setScore((prevScore) => prevScore + element.score);
            
            // if({score} > 1500) {

            //     setOpen(true); // Open the dialog when the timer ends
            // }

            elementsToRemove.push(element.id);
          }
        });
      
        if (elementsToRemove.length > 0) {
          setElements((prevElements) => prevElements.filter((element) => !elementsToRemove.includes(element.id)));
        }
      };
      
      useEffect(() => {
        checkCollision();
      }, [elements, setElements, setScore]);


      // Use effect on change score
        useEffect(() => {
            if(score > 1500) {
                setOpen(true); // Open the dialog when the timer ends
                setStopGame(true);
            }
        }, [score]);
    

      const handleRejouer = () => {
        handleClose();
        // Refresh page
        window.location.reload();
    }

    const navigate = useNavigate();
    const handleNavigate = () => {
        handleClose();
        navigate('/informations');
    }


    return (
        <>
            <div>
                <div className={styles.boxTopGame}>
                    <ScoreBarComponent value={score} />
                    <TimerComponent setIsTimerEnded={setIsTimerEnded} />
                </div>
            </div>
            <div>
            </div>  
            <div className={styles.containerGame}>
                <div className={styles.boxGame}>
                    {elements.map((element) => (
                        <FallenObjet
                            id={styles.FallenObjet}
                            key={element.id}
                            {...element}
                            onElementClick={handleElementClick}
                        />
                    ))}
                    <Earth />
                </div>
            </div>
            <Dialog id={styles.dialog} open={open} onClose={handleClose}>
                <DialogContent>
                    {score < 500 ? (
                        <Typography id={styles.titleDialog} variant="h3" color="green">Vous avez gagné !</Typography>
                    ) : (
                        <Typography id={styles.titleDialog} variant="h3" color="red">Dommage, retentez votre chance...</Typography>
                    )}
                    <Box id={styles.boxScore}>
                        <Typography>Votre score est de :</Typography>
                        {score < 500 ? (
                            <Typography id={styles.typoScore} variant="h1" color="green">{score}</Typography>
                        ) : (
                            <Typography id={styles.typoScore} variant="h1" color="red">{score}</Typography>
                        )}
                    </Box>
                    <Typography id={styles.textContentDialog} variant="body1" color="black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut feugiat sem, ac lacinia arcu. Fusce non felis nunc. Aenean in molestie urna, at bibendum sapien. Curabitur nec turpis id est lobortis tempus.</Typography>
                </DialogContent>
                <DialogActions id={styles.dialogActions}>
                    <Button variant='contained' color='grey' onClick={handleRejouer}>Rejouer</Button>
                    <Button variant='contained' color='grey' onClick={handleNavigate}>Plus d'informations</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Jeux;
