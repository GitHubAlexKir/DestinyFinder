﻿import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Bounties {
    player;
    playerBounties;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.bounties();
    }

   bounties() {
        this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
        return this.http.fetch('Player/get', {
            body: json(this.player)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                this.playerBounties = data;
            });
   }
   changeProgress(bounty) {
       console.log(bounty)
       this.http.fetch('Bounty/setBounty', {
           body: json(bounty)
       });
       this.bounties();
   }
}

export class Player {
    ID: string;
    constructor(ID: string) {
        this.ID = ID;
    }
}