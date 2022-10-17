import {indkoebStore} from "../Stores/IndkoebStore";
import {Button, Grid} from "@mui/material";


let ListElement = (Props) => {
    return (
        <Grid item xs={3}>
            <Button variant="string" style={{fontSize: 20}} color={"warning"}
                    onClick={() => {
                        indkoebStore.deletefromdatabase(Props.index);
                    }
                    }>{Props.name}</Button>
        </Grid>
    );
}

export default ListElement;