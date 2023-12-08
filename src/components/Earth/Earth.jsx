import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/components/earth.module.scss'; // Assurez-vous que le chemin du fichier CSS est correct
import variables from '../../styles/abstract/variables.module.scss'; // Assurez-vous que le chemin du fichier CSS est correct

const Earth = () => {
  const [positionX, setPositionX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  let offsetX = useRef(0);
  
  const handleMouseMove = (event) => {
    if (isMouseDown) {
		// Calculer la nouvelle position en fonction du mouvement de la souris
		let newPosition = event.clientX - offsetX.current;
	
		// Limiter la position pour éviter le dépassement des bords de l'écran
		newPosition = Math.max(newPosition, 0); // Limite gauche de l'écran
		newPosition = Math.min(newPosition, window.innerWidth - variables.earthWidth); // Limite droite de l'écran
	
		setPositionX(newPosition);
	}
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

    const handleMouseDown = (event) => {
    setIsMouseDown(true);
    offsetX.current = event.clientX - positionX;
  };

  const handleKeyDown = (event) => {
    if (!isMouseDown) {
      	if (event.key === 'ArrowLeft') {
			//Add class earthAnimation to earth
        	setPositionX((prevPosition) => Math.max(prevPosition - 40, 0));
      } else if (event.key === 'ArrowRight') {
        	setPositionX((prevPosition) => Math.min(prevPosition + 40, window.innerWidth - variables.earthWidth));
      }
    }
  };

//   const animate = () => {
//     requestAnimationFrame(animate);
//     // Vos opérations de mise à jour de la position ici
//   };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
    //animate(); // Démarrage de la boucle d'animation

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMouseDown]);

  return (
    <div className={styles.earthContainer}>
      <div
        className={styles.earth}
        id={'earth'}
        style={{
          left: `${positionX}px`,
          cursor: isMouseDown ? 'grabbing' : 'grab',
          transition: isMouseDown ? 'none' : 'left 0.3s ease-out',
        }}
        onMouseDown={handleMouseDown}
        tabIndex="0"
      ></div>
    </div>
  );
};

export default Earth;
