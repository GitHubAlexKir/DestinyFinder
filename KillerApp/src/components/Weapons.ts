﻿import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Weapons {
    player;
    name;
    damage;
    minlevel;
    newWeapon;
    selectedWeapon;
    editweapon;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.weapons();
    }
    //speler ophalen
    weapons() {
        this.http.fetch('Player/get').then(response => response.json())
            .then(data => {
                this.player = data;
            });
    }
    //wapen toevoegen
    addWeapon() {
        this.newWeapon = new newWeapon(this.name, this.damage, this.minlevel);
        this.http.fetch('Weapon/addWeapon', {
            body: json(this.newWeapon)
        });
        this.weapons();
    }
    //wapen veranderen
    editWeapon(weapon) {
        this.editweapon = new editWeapon(this.name, this.damage, this.minlevel, weapon.id);
        this.http.fetch('Weapon/editWeapon', {
            body: json(this.editweapon)
        });
        this.weapons();
    }
    //wapen verwijderen
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
    randomWeapon() {
        this.http.fetch('Weapon/random', {
            body: json(this.player.level)
        }).then(response => {
            this.weapons();
            });
    }
}
export class newWeapon {
    name: string;
    damage;
    minlevel;
    constructor(name: string, damage, minlevel) {
        this.name = name;
        this.damage = damage;
        this.minlevel = minlevel;
    }
}

export class editWeapon {
    name: string;
    damage;
    minlevel;
    ID;
    constructor(name: string, damage, minlevel, ID) {
        this.name = name;
        this.damage = damage;
        this.minlevel = minlevel;
        this.ID = ID;
    }
}