import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Bounties {
    playerBounties;
    location;
    description;
    newbounty;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.bounties();
    }
    //speler ophalen
    bounties() {
        this.http.fetch('Player/get', {
            body: json(jwt_decode(this.auth.getAccessToken()).userid)
        }).then(response => response.json())
            .then(data => {
                this.playerBounties = data;
            });
    }
    //bounty status aanpassen
    changeProgress(bounty) {
        this.http.fetch('Bounty/setBounty', {
            body: json(bounty)
        });
        this.bounties();
    }
    //bounty toevoegen
    addBounty() {
        this.newbounty = new newBounty(this.location, this.description, this.playerBounties.ID);
        this.http.fetch('Bounty/addBounty', {
            body: json(this.newbounty)
        });
        this.bounties();
    }
    //bounty verwijderen
    deleteBounty(bounty) {
        swal({
            title: 'Weet u het zeker?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja verwijder deze Bounty',
            cancelButtonText: 'Stop',
        }, (isOk) => {
            if (isOk) {
                this.http.fetch('Bounty/deleteBounty', {
                    body: json(bounty)
                });
                this.bounties();
                swal({
                    title: 'Verwijderd',
                    text: 'Bounty is succesvol verwijderd',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });
    }

}

//class voor nieuwe bounty
export class newBounty {
    location: string;
    description: string;
    playerID;
    constructor(location: string, description: string, playerID) {
        this.location = location;
        this.description = description;
        this.playerID = playerID;
    }
}