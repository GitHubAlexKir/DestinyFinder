﻿import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router'

@autoinject
export class Login {

    name = "";
    password = "";

    constructor(private auth: AuthService, private http: HttpClient, private event: EventAggregator, private router: Router) {
    }
    //inloggen
    login() {
        this.auth.login({
            name: this.name,
            password: this.password
        }).then(response => {
            this.event.publish('signedIn', true);
            swal({
                title: "U bent succesvol ingelogd",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                closeOnConfirm: false,
                timer: 1000
            });

            this.router.navigate("Character");

        })
            .catch(err => {
                swal({
                    title: "Inloggegevens zijn onjuist",
                    type: "warning",
                    showCancelButton: false,
                    showConfirmButton: false,
                    closeOnConfirm: false,
                    timer: 1000
                });
            });
    }
} 