import {makeAutoObservable, runInAction} from "mobx";
import ListElement from "../Component/ListElement";


class IndkoebStore {
    Indkoebsliste = [];
    indKoebItemList;
    renderhack = [];
    changes = false;

    constructor() {
        makeAutoObservable(this,
            {},
            {autoBind: true}//For non-arrow-functions bind
        )
    }

    async fetchVarer(){
       const res = await fetch("https://backend.troelskiib.dk/api/vare",{
            method: 'GET',
            mode: 'cors',
        });
        this.Indkoebsliste = await res.json();
    }
/*
    async fetchapi() {
        if (!this.changes) {
            fetch("https://backend.troelskiib.dk/api/vare",{
                method: 'GET',
                mode: 'cors',
                }
            ).then(
                async (response) => await response.json().then(
                    (json) => runInAction(async () => {
                        this.Indkoebsliste = await json;
                        this.renderhack.push("");
                        this.renderhack.pop();
                    })));
        } else {
            fetch('https://backend.troelskiib.dk/api/vare', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: '{"vareliste" : ' + JSON.stringify(this.Indkoebsliste) + '}'
            }).then(resp => console.log(resp)).then(
                await fetch("https://backend.troelskiib.dk/api/vare",{
                        method: 'GET',
                        mode: 'cors',
                    }
                ).then(
                    async (response) => await response.json().then(
                        (json) => runInAction(async () => {
                            this.Indkoebsliste = await json;
                            this.renderhack.push("");
                            this.renderhack.pop();
                        }))));
        }
    }*/

    postAPI(name){
        fetch('https://backend.troelskiib.dk/api/vare/single', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: name});
    }

    deletefromdatabase(index) {
        console.log(this.Indkoebsliste)
        console.log(index)
        console.log(this.Indkoebsliste[index])
        fetch('https://backend.troelskiib.dk/api/vare', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'
            }, body : this.Indkoebsliste[index].name
    }).then((resp)=> this.deleteIndkoebItem(index));
    }


    addToIndKoebsListe = (dims) => {
        if (dims.length > 0) {
            this.changes = true;
            this.postAPI(dims)
            let feed = {"name": dims}
            this.Indkoebsliste.push(feed);
            this.renderhack.push("");
            this.renderhack.pop();
        }
    }

    deleteIndkoebItem = (key) => {
        this.changes = true;
        this.Indkoebsliste.splice(key, 1); // 2nd parameter means remove one item only
        this.renderhack.push("")
        this.renderhack.pop();
    }

}

export const indkoebStore = new IndkoebStore();
