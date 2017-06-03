import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Character {
    playerstats;
    playerurl = "/Images/Warlock.png";
    updatedPlayer;
    className;
    HP;
    level;
    XP;

    constructor(private auth: AuthService, private http: HttpClient) {
        this.stats();
    }
    //speler ophalen
    stats() {
        this.http.fetch('Player/get').then(response => response.json())
            .then(data => {
                this.playerstats = data;
                this.setImage();
            });
    }
    //foto op klasse wijzigen
    setImage() {
        switch (this.playerstats.classID) {
            case 1:
                this.playerurl = "/images/hunter.png";
                break;
            case 2:
                this.playerurl = "/images/titan.png";
                break;
            case 3:
                this.playerurl = "/images/warlock.png";
                break;
            default:
        }
    }
    //speler updaten
    updatePlayer() {
        this.updatedPlayer = new UpdatePlayer(this.className, this.HP, this.level, this.XP);
        this.http.fetch('Player/update', {
            body: json(this.updatedPlayer)
        });
        this.stats();
    }
}

//class voor updaten van speler
export class UpdatePlayer {
    className: string;
    HP;
    level;
    XP;

    constructor(className, HP, level, XP) {
        this.className = className;
        this.HP = HP;
        this.level = level;
        this.XP = XP;
    }
}

