import { Provider } from 'react-redux';
import store from './components/redux/store'
import GoodsList from './components/goodsList/GoodsList';
import FilterBar from './components/filterBar/FilterBar'

function App() {

  return (
    <Provider store={store}>
      <div className="app">
        <div className="app__filters">
          <FilterBar />
        </div>
        <div className="app__list">
          <GoodsList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
