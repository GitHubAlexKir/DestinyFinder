import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Fight {
    players;
    player;
    opponent;
    selectedID;
    weapon;
    apponement;
    playerurl;

    constructor(private auth: AuthService, private http: HttpClient) {
        this.getPlayers();
        this.getPlayer();
    }
    //speler ophalen
    getPlayer() {
        this.http.fetch('Player/get', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.player = data;
            });
    }
    //alle spelers ophalen
    getPlayers() {
        this.http.fetch('Player/getPlayers', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.players = data;
                this.opponent = this.players[0];
                this.setImage();
            });
    }
    //geselecteerde speler aanpassen
    select(player) {
        console.log(player);
        this.selectedID = player.id;
        this.opponent = player;
        this.setImage();
    }
    //gevecht starten
    fight() {
        this.http.fetch('Fight/fight', {
            body: json(new fight(this.player.hp, this.opponent.id, this.weapon.id))
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    this.getReward();
                }
                else {
                    swal({
                        title: "U heeft verloren!",
                        type: "warning",
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true
                    });
                }
            });

    }
    //rewards ophalen
    getReward() {
        this.http.fetch('Fight/getReward', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.text())
            .then(data => {
                swal({
                    title: "U heeft gewonnen!, U heeft " + String(data),
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true
                });
            });
        console.log(this.player)
    }
    //foto op klasse aanpassen
    setImage() {
        switch (this.opponent.classID) {
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
//class op een fight mee te geven
export class fight {
    player;
    opponement;
    weapon;
    constructor(player, opponement, weapon) {
        this.player = player;
        this.opponement = opponement;
        this.weapon = weapon;
    }
}