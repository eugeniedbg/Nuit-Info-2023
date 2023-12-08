const FallenObjet = ({ id, top, left, size, image, score, onElementClick }) => {
  const style = {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      cursor: 'pointer',
      transition: '0.1s ease-out'

  };

  return (
      <div className="FallenObjet" style={style} onClick={() => onElementClick(id, score)}>
          {/* Afficher l'image ici */}
      </div>
  );
};

export default FallenObjet;
