import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class strongWeapons {
    weapons;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.getWeapons();
    }

    getWeapons() {
        this.http.fetch('Weapon/getBest').then(response => response.json())
            .then(data => {
                this.weapons = data;
            });
    }
}
