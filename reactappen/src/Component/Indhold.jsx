import {Button, Grid, TextField} from "@mui/material";
import {indkoebStore} from "../Stores/IndkoebStore";
import {observer} from "mobx-react-lite";
import RefreshIcon from '@mui/icons-material/Refresh';
import ListElement from "./ListElement";

function clickInset() {
    indkoebStore.addToIndKoebsListe(document.getElementById("textfelt").value);
    document.getElementById("textfelt").value = "";
}


const Indhold = () => {

    return (
        <Grid container
              spacing={0}
              alignItems="center"
              justifyContent="center"
              style={{minHeight: '100vh'}}>
            <Grid item xs={5}>
                <h1>Indkøbsliste </h1>
                <Grid item xs={12}> <Button onClick={()=>indkoebStore.fetchVarer()} variant={"contained"} startIcon={<RefreshIcon/>}>Upload and sync</Button></Grid>
            </Grid>

            <Grid item xs={12}/>

            <Grid item>
                {indkoebStore?.Indkoebsliste.map((el,index)=>
                    <ListElement key={index}
                                 name={el.name}
                                 index={index}
                    />)}

            </Grid>
            <Grid item xs={12}/>
            <Grid item xs={6}> <TextField id={"textfelt"}> </TextField></Grid>
            <Grid item xs={6}> <Button onClick={clickInset} variant={"contained"}>indsæt til
                indkøbslisten</Button></Grid>
            {indkoebStore.renderhack}


        </Grid>
    );

}

export default observer(Indhold);
