import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Weapons {
    player;
    weaponsplayer = [];
    name;
    damage;
    minlevel;
    newWeapon;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.weapons();
    }

    weapons() {
        this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
        return this.http.fetch('Player/get', {
            body: json(this.player)
        }).then(response => response.json())
            .then(data => {
                this.weaponsplayer = data;
                });
    }

    addWeapon() {
        this.newWeapon = new newWeapon(this.name, this.damage, this.minlevel,this.player.ID);
        this.http.fetch('Weapon/addWeapon', {
            body: json(this.newWeapon)
        });
        this.weapons();
    }

    deleteWeapon(weapon) {
        swal({
            title: 'Weet u het zeker?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja verwijder deze wapen',
            cancelButtonText: 'Stop',
        }, (isOk) => {
            if (isOk) {
                this.http.fetch('Weapon/deleteWeapon', {
                    body: json(weapon)
                });
                this.weapons();
                swal({
                    title: 'Verwijderd',
                    text: 'Wapen is succesvol verwijderd',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });
        
    }
}

export class Player {
    ID: string;
    constructor(ID: string) {
        this.ID = ID;
    }
}

export class newWeapon {
    name: string;
    damage;
    minlevel;
    playerID;
    constructor(name: string, damage, minlevel,playerID) {
        this.name = name;
        this.damage = damage;
        this.minlevel = minlevel;
        this.playerID = playerID;
    }
}