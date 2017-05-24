import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Fight {
    players;
    player;
    selectedID;
    weapon;
    apponement;
    playerurl;

    constructor(private auth: AuthService, private http: HttpClient) {
        this.getPlayers();
    }

    getPlayers() {
        this.http.fetch('Player/getPlayers',{
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.players = data;
            });
    }
    select(player) {
        console.log(player);
        this.selectedID = player.id;
        console.log(this.selectedID);
        this.player = player;
        this.setImage();
    }
    setImage() {
        switch (this.player.classID) {
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
}