import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router'

@autoinject
export class Register {
    name = "";
    password = "";
    passwordConfirm = "";
    classID = "";
    player;

    constructor(private auth: AuthService, private http: HttpClient, private event: EventAggregator, private router: Router) {
    }
    //registreren
    register() {
        if (this.password != this.passwordConfirm) {
            swal({
                title: "Uw ingevulde wachtwoorden zijn niet gelijk",
                type: "warning",
                showCancelButton: false,
                showConfirmButton: true,
                closeOnConfirm: true
            });
        }
        else {
            this.player = new Player(this.name, this.password, this.classID);
            this.http.fetch('Player/register', {
                body: json(this.player)
            }).then(response => response.json())
                .then(data => {
                    if (data) {
                        this.login();
                        swal({
                            title: "U bent succesvol geregistreerd",
                            type: "success",
                            showCancelButton: false,
                            showConfirmButton: false,
                            closeOnConfirm: false,
                            timer: 1000
                        });
                    }
                    else {
                        swal({
                            title: "Naam is al bezet",
                            type: "warning",
                            showCancelButton: false,
                            showConfirmButton: false,
                            closeOnConfirm: false,
                            timer: 1000
                        });
                    }
                });
        }
    }
    //inloggen
    login() {
        this.auth.login({
            name: this.name,
            password: this.password
        }).then(response => {
            this.event.publish('signedIn', true);
            this.router.navigate("Character");

        });
    }

}

export class Player {
    name: string;
    password: string;
    classID: string;
    constructor(name: string, password: string, classID: string) {
        this.name = name;
        this.password = password;
        this.classID = classID;
    }
}