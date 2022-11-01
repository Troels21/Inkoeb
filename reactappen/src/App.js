import './App.css';
import Indhold from "./Component/Indhold";
import {indkoebStore} from "./Stores/IndkoebStore";


function App() {
    indkoebStore.fetchVarer()
    return (
        <Indhold/>
    );
}

export default App;
