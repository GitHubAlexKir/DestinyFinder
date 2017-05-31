import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class AverageDamage {
    players;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.getPlayers();
    }

    getPlayers() {
        this.http.fetch('Player/getAvg').then(response => response.json())
            .then(data => {
                this.players = data;
            });
    }
}
