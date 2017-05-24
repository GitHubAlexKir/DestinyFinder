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
    result: boolean;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.getPlayers();
        this.getPlayer();
    }
    getPlayer() {
        this.http.fetch('Player/get', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.player = data;
            });
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
        this.opponent = player;
        this.setImage();
    }

    fight() {
        this.http.fetch('Player/fight', {
            body: json(new fight(this.player.id, this.opponent.id, this.weapon.id))
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    swal({
                        title: "U heeft gewonnen!",
                        type: "success",
                        showCancelButton: true,
                        showConfirmButton: false,
                        closeOnConfirm: true
                    });
                }
                else {
                    swal({
                        title: "U heeft verloren!",
                        type: "warning",
                        showCancelButton: true,
                        showConfirmButton: false,
                        closeOnConfirm: true
                    });
                }
            });
        
    }

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

export class fight {
    player;
    opponement;
    weapon;
    constructor(player, opponement, weapon)
    {
        this.player = player;
        this.opponement = opponement;
        this.weapon = weapon;
    }
}