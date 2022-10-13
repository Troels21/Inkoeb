import {indkoebStore} from "../Stores/IndkoebStore";
import {Button, Grid} from "@mui/material";



let ListElement = (Props) => {
    return (
        <Grid item xs={3}>
            <Button variant="string" style={{fontSize : 20}} color={"warning"} onClick={() => indkoebStore.deleteIndkoebItem(Props.index)}>{Props.name}</Button>
        </Grid>
    );
}

export default ListElement;