import React from 'react';
import AppContext from '../context';
import Card from '../components/Card'

function Home({ onChangeSearchInput, searchValue, onAddToFavorite, onAddToCard, items, cartItems, isLoading }) {
  const {isItemAdded} = React.useContext(AppContext);
  const renderItems = () => {

    return (isLoading ? [...Array(10)] : items.filter((item) => item.name.toLowerCase().includes(searchValue)))
      .map((item, index) => (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCard(item)}
        //  added={isItemAdded(item && item.id)}
          {...item}
          loading={isLoading}
        />
      ))
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>
      <h1>{searchValue ? `Поиск по запосу: "${searchValue}"` : 'Все кроссовки'}</h1>
      {searchValue && <img className="removeBtn" src="img/btn-remove.svg" alt="clear" />}
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
}

export default Home;
