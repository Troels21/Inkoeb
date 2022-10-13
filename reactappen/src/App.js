import './App.css';
import Indhold from "./Component/Indhold";
import {indkoebStore} from "./Stores/IndkoebStore";


function App() {
    indkoebStore.fetchapi()
    return (
        <Indhold/>
    );
}

export default App;
