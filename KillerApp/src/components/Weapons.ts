﻿import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Weapons {
    player;
    weaponsplayer = [];
    constructor(private auth: AuthService, private http: HttpClient) {
        this.weapons();
    }

    weapons() {
        this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
        return this.http.fetch('Player/getweapons', {
            body: json(this.player)
        }).then(response => response.json())
            .then(data => {
                this.weaponsplayer = data;
                });
    }
}

export class Player {
    ID: string;
    constructor(ID: string) {
        this.ID = ID;
    }
}