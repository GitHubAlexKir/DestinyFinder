import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class TotalClass {
    totalClass;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.getTotalClass();
    }

    getTotalClass() {
        this.http.fetch('Player/getTotalClass').then(response => response.json())
            .then(data => {
                this.totalClass = data;
            });
    }
}
