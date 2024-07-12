import { exRdestowiansData } from './data/exRdestowiansData';
import './App.css';
import Header from './components/Header';

import RouterConfig from './config/RouterConfig';

function App() {
  //console.log(exRdestowiansData);

  return (
    <div className="">
      <Header />

      <RouterConfig />
    </div>
  );
}

export default App;
