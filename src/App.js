import './App.scss';
import React from 'react';
import axios from 'axios';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { Route } from 'react-router-dom';
import AppContext from './context';



function App() {
  const [items, setItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://610ce59566dd8f0017b76f15.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://610ce59566dd8f0017b76f15.mockapi.io/favorites');
      const itemResponse = await axios.get('https://610ce59566dd8f0017b76f15.mockapi.io/items');

      setIsLoading(false)

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemResponse.data);
    }
    fetchData()
  }, []);

  const onAddToCard = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        axios.delete(`https://610ce59566dd8f0017b76f15.mockapi.io/cart/${obj.id}`)
      } else {
        axios.post('https://610ce59566dd8f0017b76f15.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, obj])
      }
    }
    catch (error) {
      alert('не удалось добавить')
    }

  }

  const onRemoveItem = (id) => {
    axios.delete(`https://610ce59566dd8f0017b76f15.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://610ce59566dd8f0017b76f15.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://610ce59566dd8f0017b76f15.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data]);
      }
    }
    catch (error) {
      alert('не удалось добавить')
    }
  }



  //setCartItems([...cartItems, obj]);
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded }}>
      <div className="wrapper clear">
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path="/" exact>
          <Home onChangeSearchInput={onChangeSearchInput} searchValue={searchValue} onAddToCard={onAddToCard} onAddToFavorite={onAddToFavorite} items={items} cartItems={cartItems} isLoading={isLoading} />
        </Route>
        <Route path="/favorites" exact>
          <Favorites onAddToFavorite={onAddToFavorite} />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>

        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
