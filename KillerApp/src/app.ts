import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, Next, Redirect, NavigationInstruction } from 'aurelia-router'
import { HttpClient } from 'aurelia-fetch-client';
import { AuthService, FetchConfig } from 'aurelia-authentication';
import { Container } from 'aurelia-dependency-injection';
import * as jwt_decode from 'jwt-decode';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class App {
    router: Router;
    authenticated: boolean;

    constructor(private http: HttpClient, private config: FetchConfig, private authService: AuthService, private event: EventAggregator) {
        this.configHttp();
        this.authenticated = this.authService.authenticated;
        if (this.authenticated) {
            alert(jwt_decode(this.authService.getAccessToken()).userid);
        }
    }

    attached() {
        this.event.subscribe('signedIn', response => {
            this.authenticated = response;
        });
    }

    logout() {
        return this.authService.logout()
            .then(() => {
                this.authenticated = this.authService.authenticated;
                this.router.navigate("login");

                swal({
                    title: "Bedankt voor uw bezoek",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    }

    configureRouter(config, router) {
        this.router = router;

        let step = new AuthorizeStep(this.authService);
        config.addAuthorizeStep(step);

        config.title = 'Aurelia';
        config.map([
            { route: ['/', 'Character'], name: 'Character', moduleId: 'components/Character', auth: true },
            { route: ['/', 'Weapons'], name: 'Weapons', moduleId: 'components/Weapons', auth: true },
            { route: ['/', 'Quests'], name: 'Quests', moduleId: 'components/Quests', auth: true },
            { route: ['/', 'Bounties'], name: 'Bounties', moduleId: 'components/Bounties', auth: true },
            { route: ['/', 'Fight'], name: 'Fight', moduleId: 'components/Fight', auth: true },
            { route: ['/', 'BestWeapons'], name: 'BestWeapons', moduleId: 'components/Querys/strongWeapons', auth: true },
            { route: ['/', 'MainQuest'], name: 'MainQuest', moduleId: 'components/Querys/mainQuest', auth: true },
            { route: ['/', 'AvgDamage'], name: 'AvgDamage', moduleId: 'components/Querys/AverageDamage', auth: true },
            { route: ['/', 'Querys'], name: 'Querys', moduleId: 'components/Querys/Querys', auth: true },
            { route: ['/', 'AllWeapons'], name: 'AllWeapons', moduleId: 'components/Querys/AllWeapons', auth: true },
            { route: ['/', 'TotalWeapons'], name: 'TotalWeapons', moduleId: 'components/Querys/TotalWeapons', auth: true },
            { route: ['/', 'Register'], name: 'Register', moduleId: 'components/Register' },
            { route: ['/', 'Login'], name: 'Login', moduleId: 'components/Login' }
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

@autoinject
class AuthorizeStep {
    constructor(private authService: AuthService) { }

    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
            let isLoggedIn = this.authService.isAuthenticated();

            if (!isLoggedIn) {
                return next.cancel(new Redirect('login'));
            }
        }

        return next();
    }
}

