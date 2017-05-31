import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class mainQuest {
    quests;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.getMainQuest();
    }

    getMainQuest() {
        this.http.fetch('Quest/getMain').then(response => response.json())
            .then(data => {
                this.quests = data;
            });
    }
}
