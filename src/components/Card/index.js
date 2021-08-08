import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './card.module.scss';
import AppContext from '../../context';

function Card({ id, name, price, imageUrl, onFavorite, onPlus, Favorited = false, loading = false }) {
  const {isItemAdded} = React.useContext(AppContext);
  //const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(Favorited);

  const onClickPlus = () => {
    onPlus(id, name, price, imageUrl)
    //setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onFavorite({ id, name, price, imageUrl })
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="unliked" />
          </div>
          <img width={133} height={122} src={imageUrl} alt="sd" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Стоимость:</span>
              <b>{price}</b>
            </div>
            <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="plus" />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
