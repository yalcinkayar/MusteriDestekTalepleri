import AppRoutes from "./AppRoutes";
import {Provider} from 'mobx-react';
import Store from '../store/index';
import './App.scss';

function App() {
  return (
    <Provider {...Store}>
    <AppRoutes />
    </Provider>
  );
}

export default App;
