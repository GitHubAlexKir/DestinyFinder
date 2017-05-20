import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router'
import { HttpClient } from 'aurelia-fetch-client';
import { AuthService, FetchConfig } from 'aurelia-authentication';
import { Container } from 'aurelia-dependency-injection';
import * as jwt_decode from 'jwt-decode';
@autoinject
export class App {
    router: Router;
    authenticated: boolean;

    constructor(private http: HttpClient, private config: FetchConfig, private authService: AuthService) {
        this.configHttp();
        this.authenticated = this.authService.authenticated;
        if (this.authenticated) {
            alert(jwt_decode(this.authService.getAccessToken()).userid);
        }
    }


    configureRouter(config, router) {
        this.router = router;

        //config.addPipelineStep('authorize', AuthorizeStep);

        config.title = 'Aurelia';
        config.map([

            { route: ['/', 'Login'], name: 'Login', moduleId: 'components/Login' },
            { route: ['/', 'Character'], name: 'Character', moduleId: 'components/Character', auth: true },
            { route: ['/', 'Weapons'], name: 'Weapons', moduleId: 'components/Weapons', auth: true },
            { route: ['/', 'Quests'], name: 'Quests', moduleId: 'components/Quests', auth: true },
            { route: ['/', 'Bounties'], name: 'Bounties', moduleId: 'components/Bounties', auth: true },
            { route: ['/', 'Register'], name: 'Register', moduleId: 'components/Register' },
        ]);
    }

    configHttp(): void {
        this.http.configure(config => {
            config
                .withBaseUrl('api/')
                .withDefaults({
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch',
                        'dataType': 'json'
                    }
                })
                .withInterceptor({
                    request(request) {
                        console.log(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response(response: Response) {
                        console.log(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
        });

        this.config.configure(this.http);
    }
}

//class AuthorizeStep {
//    run(routingContext, next) {
//        if (routingContext.nextInstructions.some(i => i.config.auth)) {
//            var isLoggedIn = AuthorizeStep.isLoggedIn();
//            if (!isLoggedIn) {
//                return next.cancel();
//            }
//        }
//        return next();
//    }

//    static isLoggedIn(): boolean {
//        var auth_token = localStorage.getItem("auth_token");
//        return (typeof auth_token !== "undefined" && auth_token !== null);
//    }
//}

