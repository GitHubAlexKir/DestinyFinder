import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Weapons {
    weaponsplayer;
    name;
    damage;
    minlevel;
    newWeapon;
    selectedWeapon;
    editweapon;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.weapons();
    }

    weapons() {
        this.http.fetch('Player/get', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.weaponsplayer = data;
                });
    }

    addWeapon() {
        this.newWeapon = new newWeapon(this.name, this.damage, this.minlevel, jwt_decode(this.auth.getAccessToken()).userid);
        this.http.fetch('Weapon/addWeapon', {
            body: json(this.newWeapon)
        });
        this.weapons();
    }

    editWeapon(weapon) {
        console.log(this.selectedWeapon);
        this.editweapon = new editWeapon(this.name, this.damage, this.minlevel, weapon.id);
        console.log(this.editweapon);
        this.http.fetch('Weapon/editWeapon', {
            body: json(this.editweapon)
        });
        this.weapons();
    }

    deleteWeapon(weapon) {
        swal({
            title: 'Weet u het zeker?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja verwijder deze wapen',
            cancelButtonText: 'Stop'
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
                    timer: 2000
                });
            }
        });
        
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

export class editWeapon {
    name: string;
    damage;
    minlevel;
    ID;
    constructor(name: string, damage, minlevel,ID) {
        this.name = name;
        this.damage = damage;
        this.minlevel = minlevel;
        this.ID = ID;
    }
}