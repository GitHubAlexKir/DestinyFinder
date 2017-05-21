import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Bounties {
    player;
    playerBounties;
    location;
    description;
    newbounty;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.bounties();
    }

   bounties() {
        this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
        this.http.fetch('Player/get', {
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
   addBounty() {
       console.log(this.location);
       console.log(this.description);
       this.newbounty = new newBounty(this.location, this.description, this.player.ID);
       this.http.fetch('Bounty/addBounty', {
           body: json(this.newbounty)
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

export class newBounty {
    location: string;
    description: string;
    playerID;
    constructor(location: string, description: string,playerID)
    {
        this.location = location;
        this.description = description;
        this.playerID = playerID;
    }
}