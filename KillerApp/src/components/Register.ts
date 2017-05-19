import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"

@autoinject
export class Register {
    name = "";
    password = "";
    passwordConfirm = "";
    classID = "";
    player;
    constructor(private auth: AuthService, private http: HttpClient) {
    }

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
            console.log(this.player);
            console.log(this.player.name);
            console.log(this.player.classID);
            this.http.fetch('Player/register', {
                body: json(this.player)
                    }
            ).then(response => {
                swal({
                    title: "U bent succesvol geregistreerd",
                    type: "success",
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
            })
                .catch(err => {
                    swal({
                        title: "Naam is al bezet",
                        type: "warning",
                        showCancelButton: true,
                        showConfirmButton: false,
                        closeOnConfirm: true
                    });
                });
        }

    }

    login() {
        this.auth.login({
            name: this.name,
            password: this.password
        }).then(response => {
            swal({
                title: "U bent succesvol ingelogd",
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                closeOnConfirm: true
            });
        })
            .catch(err => {
                swal({
                    title: "Inloggegevens zijn onjuist",
                    type: "warning",
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
            });
    }
}

export class Player{
    name: string;
    password: string;
    classID: string;
    constructor(name: string,password: string, classID: string) {
        this.name = name;
        this.password = password;
        this.classID = classID;
    }
}