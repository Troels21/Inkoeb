import {makeAutoObservable, runInAction} from "mobx";
import ListElement from "../Component/ListElement";


class IndkoebStore {
    Indkoebsliste;
    indKoebItemList;
    renderhack = [];
    changes = false;

    constructor() {
        makeAutoObservable(this,
            {},
            {autoBind: true}//For non-arrow-functions bind
        )
    }

    async fetchapi() {
        if (!this.changes) {
            fetch("http://localhost:8080/api/vare"
            ).then(
                async (response) => await response.json().then(
                    (json) => runInAction(async () => {
                        this.Indkoebsliste = await json.vareliste;
                        this.renderhack.push("");
                        this.renderhack.pop();
                    })));
        } else {
            fetch('http://localhost:8080/api/vare', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.Indkoebsliste)
            }).then(resp => console.log(resp)).then(
                await fetch("http://localhost:8080/api/vare"
                ).then(
                    async (response) => await response.json().then(
                        (json) => runInAction(async () => {
                            this.Indkoebsliste = await json.vareliste;
                            this.renderhack.push("");
                            this.renderhack.pop();
                        }))));
        }
    }


    addToIndKoebsListe = (dims) => {
        if (dims.length > 0) {
            this.changes = true;
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

    async updateView() {
        //Fetch all database
        //Get Json with all names of indkøb
        this.indKoebItemList = (this.Indkoebsliste.map((element, index) => {
            return <ListElement key={index}
                                name={element.name}
                                index={index}
            />
        }));
    }

}

export const indkoebStore = new IndkoebStore();