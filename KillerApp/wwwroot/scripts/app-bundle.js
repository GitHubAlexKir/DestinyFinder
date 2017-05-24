var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode", "aurelia-event-aggregator"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode, aurelia_event_aggregator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(http, config, authService, event) {
            this.http = http;
            this.config = config;
            this.authService = authService;
            this.event = event;
            this.configHttp();
            this.authenticated = this.authService.authenticated;
            if (this.authenticated) {
                alert(jwt_decode(this.authService.getAccessToken()).userid);
            }
        }
        App.prototype.attached = function () {
            var _this = this;
            this.event.subscribe('signedIn', function (response) {
                _this.authenticated = response;
            });
        };
        App.prototype.logout = function () {
            var _this = this;
            return this.authService.logout()
                .then(function () {
                _this.authenticated = _this.authService.authenticated;
                _this.router.navigate("login");
                swal({
                    title: "Bedankt voor uw bezoek",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
        };
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            var step = new AuthorizeStep(this.authService);
            config.addAuthorizeStep(step);
            config.title = 'Aurelia';
            config.map([
                { route: ['/', 'Character'], name: 'Character', moduleId: 'components/Character', auth: true },
                { route: ['/', 'Weapons'], name: 'Weapons', moduleId: 'components/Weapons', auth: true },
                { route: ['/', 'Quests'], name: 'Quests', moduleId: 'components/Quests', auth: true },
                { route: ['/', 'Bounties'], name: 'Bounties', moduleId: 'components/Bounties', auth: true },
                { route: ['/', 'Fight'], name: 'Fight', moduleId: 'components/Fight', auth: true },
                { route: ['/', 'Register'], name: 'Register', moduleId: 'components/Register' },
                { route: ['/', 'Login'], name: 'Login', moduleId: 'components/Login' }
            ]);
        };
        App.prototype.configHttp = function () {
            this.http.configure(function (config) {
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
                    request: function (request) {
                        console.log("Requesting " + request.method + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        console.log("Received " + response.status + " " + response.url);
                        return response;
                    }
                });
            });
            this.config.configure(this.http);
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_authentication_1.FetchConfig, aurelia_authentication_1.AuthService, aurelia_event_aggregator_1.EventAggregator])
    ], App);
    exports.App = App;
    var AuthorizeStep = (function () {
        function AuthorizeStep(authService) {
            this.authService = authService;
        }
        AuthorizeStep.prototype.run = function (navigationInstruction, next) {
            if (navigationInstruction.getAllInstructions().some(function (i) { return i.config.auth; })) {
                var isLoggedIn = this.authService.isAuthenticated();
                if (!isLoggedIn) {
                    return next.cancel(new aurelia_router_1.Redirect('login'));
                }
            }
            return next();
        };
        return AuthorizeStep;
    }());
    AuthorizeStep = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService])
    ], AuthorizeStep);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUc7UUFEZiw4QkFBVTt5Q0FLbUIsaUNBQVUsRUFBa0Isb0NBQVcsRUFBdUIsb0NBQVcsRUFBaUIsMENBQWU7T0FKMUgsR0FBRyxDQThFZjtJQTlFWSxrQkFBRztJQWlGaEIsSUFBTSxhQUFhO1FBQ2YsdUJBQW9CLFdBQXdCO1lBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQUksQ0FBQztRQUVqRCwyQkFBRyxHQUFILFVBQUkscUJBQTRDLEVBQUUsSUFBVTtZQUN4RCxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFiLENBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFFcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUkseUJBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQWRLLGFBQWE7UUFEbEIsOEJBQVU7eUNBRTBCLG9DQUFXO09BRDFDLGFBQWEsQ0FjbEIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJDb25maWd1cmF0aW9uLCBOZXh0LCBSZWRpcmVjdCwgTmF2aWdhdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBGZXRjaENvbmZpZyB9IGZyb20gJ2F1cmVsaWEtYXV0aGVudGljYXRpb24nO1xyXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG4gICAgcm91dGVyOiBSb3V0ZXI7XHJcbiAgICBhdXRoZW50aWNhdGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IEZldGNoQ29uZmlnLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBldmVudDogRXZlbnRBZ2dyZWdhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWdIdHRwKCk7XHJcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICAgICAgYWxlcnQoand0X2RlY29kZSh0aGlzLmF1dGhTZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnQuc3Vic2NyaWJlKCdzaWduZWRJbicsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gcmVzcG9uc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFwibG9naW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQmVkYW5rdCB2b29yIHV3IGJlem9la1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lcjogMjAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG5cclxuICAgICAgICBsZXQgc3RlcCA9IG5ldyBBdXRob3JpemVTdGVwKHRoaXMuYXV0aFNlcnZpY2UpO1xyXG4gICAgICAgIGNvbmZpZy5hZGRBdXRob3JpemVTdGVwKHN0ZXApO1xyXG5cclxuICAgICAgICBjb25maWcudGl0bGUgPSAnQXVyZWxpYSc7XHJcbiAgICAgICAgY29uZmlnLm1hcChbXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdDaGFyYWN0ZXInXSwgbmFtZTogJ0NoYXJhY3RlcicsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9DaGFyYWN0ZXInLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdXZWFwb25zJ10sIG5hbWU6ICdXZWFwb25zJywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL1dlYXBvbnMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdRdWVzdHMnXSwgbmFtZTogJ1F1ZXN0cycsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9RdWVzdHMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdCb3VudGllcyddLCBuYW1lOiAnQm91bnRpZXMnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvQm91bnRpZXMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdGaWdodCddLCBuYW1lOiAnRmlnaHQnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvRmlnaHQnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdSZWdpc3RlciddLCBuYW1lOiAnUmVnaXN0ZXInLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvUmVnaXN0ZXInIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdMb2dpbiddLCBuYW1lOiAnTG9naW4nLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvTG9naW4nIH1cclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25maWdIdHRwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHR0cC5jb25maWd1cmUoY29uZmlnID0+IHtcclxuICAgICAgICAgICAgY29uZmlnXHJcbiAgICAgICAgICAgICAgICAud2l0aEJhc2VVcmwoJ2FwaS8nKVxyXG4gICAgICAgICAgICAgICAgLndpdGhEZWZhdWx0cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ0ZldGNoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGFUeXBlJzogJ2pzb24nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVxdWVzdGluZyAke3JlcXVlc3QubWV0aG9kfSAke3JlcXVlc3QudXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlOiBSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZWQgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLmNvbmZpZ3VyZSh0aGlzLmh0dHApO1xyXG4gICAgfVxyXG59XHJcblxyXG5AYXV0b2luamVjdFxyXG5jbGFzcyBBdXRob3JpemVTdGVwIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBydW4obmF2aWdhdGlvbkluc3RydWN0aW9uOiBOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIG5leHQ6IE5leHQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmIChuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24uZ2V0QWxsSW5zdHJ1Y3Rpb25zKCkuc29tZShpID0+IGkuY29uZmlnLmF1dGgpKSB7XHJcbiAgICAgICAgICAgIGxldCBpc0xvZ2dlZEluID0gdGhpcy5hdXRoU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCgnbG9naW4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXh0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('authConfig',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config = {
        providers: {
            google: {
                name: 'google',
                clientId: '833710645751-q02snmqimmijs2jdk9orckpmfdvi53dt.apps.googleusercontent.com'
            }
        }
    };
    exports.default = config;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUEsSUFBSSxNQUFNLEdBQUc7UUFDVCxTQUFTLEVBQUU7WUFDUCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLDBFQUEwRTthQUN2RjtTQUNKO0tBQ0osQ0FBQTtJQUVELGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJhdXRoQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHtcclxuICAgIHByb3ZpZGVyczoge1xyXG4gICAgICAgIGdvb2dsZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnZ29vZ2xlJyxcclxuICAgICAgICAgICAgY2xpZW50SWQ6ICc4MzM3MTA2NDU3NTEtcTAyc25tcWltbWlqczJqZGs5b3Jja3BtZmR2aTUzZHQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLGtCQUFlO1FBQ2IsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMiLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgZGVidWc6IHRydWUsXHJcbiAgdGVzdGluZzogdHJ1ZVxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6InNyYyJ9

define('main',["require", "exports", "./environment", "./authConfig"], function (require, exports, environment_1, authConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-authentication', function (baseConfig) {
            baseConfig.configure(authConfig_1.default);
        });
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUEsbUJBQTBCLE9BQWdCO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHO2FBQ04scUJBQXFCLEVBQUU7YUFDdkIsT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUNwQixNQUFNLENBQUMsd0JBQXdCLEVBQ2hDLFVBQUMsVUFBVTtZQUNQLFVBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRVAsRUFBRSxDQUFDLENBQUMscUJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMscUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFsQkQsOEJBa0JDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXJlbGlhIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnXHJcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICcuL2Vudmlyb25tZW50JztcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2F1dGhDb25maWcnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWE6IEF1cmVsaWEpIHtcclxuICAgIGF1cmVsaWEudXNlXHJcbiAgICAgICAgLnN0YW5kYXJkQ29uZmlndXJhdGlvbigpXHJcbiAgICAgICAgLmZlYXR1cmUoJ3Jlc291cmNlcycpXHJcbiAgICAgICAgLnBsdWdpbignYXVyZWxpYS1hdXRoZW50aWNhdGlvbicsXHJcbiAgICAgICAgKGJhc2VDb25maWcpID0+IHtcclxuICAgICAgICAgICAgYmFzZUNvbmZpZy5jb25maWd1cmUoY29uZmlnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBpZiAoZW52aXJvbm1lbnQuZGVidWcpIHtcclxuICAgICAgICBhdXJlbGlhLnVzZS5kZXZlbG9wbWVudExvZ2dpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW52aXJvbm1lbnQudGVzdGluZykge1xyXG4gICAgICAgIGF1cmVsaWEudXNlLnBsdWdpbignYXVyZWxpYS10ZXN0aW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXVyZWxpYS5zdGFydCgpLnRoZW4oKCkgPT4gYXVyZWxpYS5zZXRSb290KCkpO1xyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Bounties',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Bounties = (function () {
        function Bounties(auth, http) {
            this.auth = auth;
            this.http = http;
            this.bounties();
        }
        Bounties.prototype.bounties = function () {
            var _this = this;
            this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(jwt_decode(this.auth.getAccessToken()).userid)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.playerBounties = data;
            });
        };
        Bounties.prototype.changeProgress = function (bounty) {
            this.http.fetch('Bounty/setBounty', {
                body: aurelia_fetch_client_1.json(bounty)
            });
            this.bounties();
        };
        Bounties.prototype.addBounty = function () {
            this.newbounty = new newBounty(this.location, this.description, this.playerBounties.ID);
            this.http.fetch('Bounty/addBounty', {
                body: aurelia_fetch_client_1.json(this.newbounty)
            });
            this.bounties();
        };
        Bounties.prototype.deleteBounty = function (bounty) {
            var _this = this;
            swal({
                title: 'Weet u het zeker?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ja verwijder deze Bounty',
                cancelButtonText: 'Stop',
            }, function (isOk) {
                if (isOk) {
                    _this.http.fetch('Bounty/deleteBounty', {
                        body: aurelia_fetch_client_1.json(bounty)
                    });
                    _this.bounties();
                    swal({
                        title: 'Verwijderd',
                        text: 'Bounty is succesvol verwijderd',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            });
        };
        return Bounties;
    }());
    Bounties = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], Bounties);
    exports.Bounties = Bounties;
    var newBounty = (function () {
        function newBounty(location, description, playerID) {
            this.location = location;
            this.description = description;
            this.playerID = playerID;
        }
        return newBounty;
    }());
    exports.newBounty = newBounty;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLDhCQUFTIiwiZmlsZSI6ImNvbXBvbmVudHMvQm91bnRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5cclxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIEJvdW50aWVzIHtcclxuICAgIHBsYXllckJvdW50aWVzO1xyXG4gICAgbG9jYXRpb247XHJcbiAgICBkZXNjcmlwdGlvbjtcclxuICAgIG5ld2JvdW50eTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuYm91bnRpZXMoKTtcclxuICAgIH1cclxuXHJcbiAgIGJvdW50aWVzKCkge1xyXG4gICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgIGJvZHk6IGpzb24oand0X2RlY29kZSh0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW4oKSkudXNlcmlkKVxyXG4gICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJCb3VudGllcyA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICBjaGFuZ2VQcm9ncmVzcyhib3VudHkpIHtcclxuICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnQm91bnR5L3NldEJvdW50eScsIHtcclxuICAgICAgICAgICBib2R5OiBqc29uKGJvdW50eSlcclxuICAgICAgIH0pO1xyXG4gICAgICAgdGhpcy5ib3VudGllcygpO1xyXG4gICB9XHJcbiAgIGFkZEJvdW50eSgpIHtcclxuICAgICAgIHRoaXMubmV3Ym91bnR5ID0gbmV3IG5ld0JvdW50eSh0aGlzLmxvY2F0aW9uLCB0aGlzLmRlc2NyaXB0aW9uLCB0aGlzLnBsYXllckJvdW50aWVzLklEKTtcclxuICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnQm91bnR5L2FkZEJvdW50eScsIHtcclxuICAgICAgICAgICBib2R5OiBqc29uKHRoaXMubmV3Ym91bnR5KVxyXG4gICAgICAgfSk7XHJcbiAgICAgICB0aGlzLmJvdW50aWVzKCk7XHJcbiAgIH1cclxuXHJcbiAgIGRlbGV0ZUJvdW50eShib3VudHkpIHtcclxuICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgIHRpdGxlOiAnV2VldCB1IGhldCB6ZWtlcj8nLFxyXG4gICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnSmEgdmVyd2lqZGVyIGRlemUgQm91bnR5JyxcclxuICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnU3RvcCcsXHJcbiAgICAgICB9LCAoaXNPaykgPT4ge1xyXG4gICAgICAgICAgIGlmIChpc09rKSB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnQm91bnR5L2RlbGV0ZUJvdW50eScsIHtcclxuICAgICAgICAgICAgICAgICAgIGJvZHk6IGpzb24oYm91bnR5KVxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgdGhpcy5ib3VudGllcygpO1xyXG4gICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnVmVyd2lqZGVyZCcsXHJcbiAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQm91bnR5IGlzIHN1Y2Nlc3ZvbCB2ZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgIHRpbWVyOiAzMDAwXHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pO1xyXG4gICB9XHJcbiAgIFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIG5ld0JvdW50eSB7XHJcbiAgICBsb2NhdGlvbjogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHBsYXllcklEO1xyXG4gICAgY29uc3RydWN0b3IobG9jYXRpb246IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyxwbGF5ZXJJRClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMucGxheWVySUQgPSBwbGF5ZXJJRDtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Character',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Character = (function () {
        function Character(auth, http) {
            this.auth = auth;
            this.http = http;
            this.playerurl = "/Images/Warlock.png";
            this.stats();
        }
        Character.prototype.stats = function () {
            var _this = this;
            this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(jwt_decode(this.auth.getAccessToken()).userid)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                _this.playerstats = data;
                _this.setImage();
            });
        };
        Character.prototype.setImage = function () {
            switch (this.playerstats.classID) {
                case 1:
                    this.playerurl = "/images/hunter.png";
                    break;
                case 2:
                    this.playerurl = "/images/titan.png";
                    break;
                case 3:
                    this.playerurl = "/images/warlock.png";
                    break;
                default:
            }
        };
        Character.prototype.updatePlayer = function () {
            this.updatedPlayer = new UpdatePlayer(this.playerstats.ID, this.className, this.HP, this.level, this.XP);
            this.http.fetch('Player/update', {
                body: aurelia_fetch_client_1.json(this.updatedPlayer)
            });
            this.stats();
        };
        return Character;
    }());
    Character = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], Character);
    exports.Character = Character;
    var UpdatePlayer = (function () {
        function UpdatePlayer(ID, className, HP, level, XP) {
            this.ID = ID;
            this.className = className;
            this.HP = HP;
            this.level = level;
            this.XP = XP;
        }
        return UpdatePlayer;
    }());
    exports.UpdatePlayer = UpdatePlayer;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhcmFjdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQU9BLElBQWEsU0FBUztRQVNsQixtQkFBb0IsSUFBaUIsRUFBVSxJQUFnQjtZQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFhO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQVAvRCxjQUFTLEdBQUcscUJBQXFCLENBQUM7WUFROUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFFRCx5QkFBSyxHQUFMO1lBQUEsaUJBU0M7WUFSRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQzFCLElBQUksRUFBRSwyQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO2FBQzVELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUMvQixJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsNEJBQVEsR0FBUjtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDO29CQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUM7b0JBQ3RDLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztvQkFDckMsS0FBSyxDQUFDO2dCQUNWLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO29CQUN2QyxLQUFLLENBQUM7Z0JBQ1YsUUFBUTtZQUNaLENBQUM7UUFDTCxDQUFDO1FBRUQsZ0NBQVksR0FBWjtZQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtnQkFDN0IsSUFBSSxFQUFFLDJCQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0E3Q0EsQUE2Q0MsSUFBQTtJQTdDWSxTQUFTO1FBRHJCLDhCQUFVO3lDQVVtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQVR0RCxTQUFTLENBNkNyQjtJQTdDWSw4QkFBUztJQWdEdEI7UUFPSSxzQkFBWSxFQUFVLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FkQSxBQWNDLElBQUE7SUFkWSxvQ0FBWSIsImZpbGUiOiJjb21wb25lbnRzL0NoYXJhY3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXIge1xuICAgIHBsYXllcnN0YXRzO1xuICAgIHBsYXllcnVybCA9IFwiL0ltYWdlcy9XYXJsb2NrLnBuZ1wiO1xuICAgIHVwZGF0ZWRQbGF5ZXI7XG4gICAgY2xhc3NOYW1lO1xuICAgIEhQO1xuICAgIGxldmVsO1xuICAgIFhQO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuc3RhdHMoKTtcclxuICAgIH1cblxyXG4gICAgc3RhdHMoKSB7XG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL2dldCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbihqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnN0YXRzID0gZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEltYWdlKCk7XG4gICAgICAgICAgICB9KTtcclxuICAgIH1cbiAgICBzZXRJbWFnZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnBsYXllcnN0YXRzLmNsYXNzSUQpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJ1cmwgPSBcIi9pbWFnZXMvaHVudGVyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL3RpdGFuLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL3dhcmxvY2sucG5nXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhazsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxuXG4gICAgdXBkYXRlUGxheWVyKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZWRQbGF5ZXIgPSBuZXcgVXBkYXRlUGxheWVyKHRoaXMucGxheWVyc3RhdHMuSUQsIHRoaXMuY2xhc3NOYW1lLCB0aGlzLkhQLCB0aGlzLmxldmVsLCB0aGlzLlhQKTtcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvdXBkYXRlJywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMudXBkYXRlZFBsYXllcilcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0YXRzKCk7XHJcbiAgICB9XHJcbn1cblxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUGxheWVyIHtcbiAgICBJRDogc3RyaW5nO1xuICAgIGNsYXNzTmFtZTogc3RyaW5nO1xuICAgIEhQO1xuICAgIGxldmVsO1xuICAgIFhQO1xuXG4gICAgY29uc3RydWN0b3IoSUQ6IHN0cmluZywgY2xhc3NOYW1lLEhQLGxldmVsLFhQKSB7XHJcbiAgICAgICAgdGhpcy5JRCA9IElEO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgdGhpcy5IUCA9IEhQO1xuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIHRoaXMuWFAgPSBYUDtcclxuICAgIH1cclxufVxuXG4iXSwic291cmNlUm9vdCI6InNyYyJ9

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Fight',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Fight = (function () {
        function Fight(auth, http) {
            this.auth = auth;
            this.http = http;
            this.getPlayers();
            this.getPlayer();
        }
        Fight.prototype.getPlayer = function () {
            var _this = this;
            this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(jwt_decode(this.auth.getAccessToken()).userid)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.player = data;
            });
        };
        Fight.prototype.getPlayers = function () {
            var _this = this;
            this.http.fetch('Player/getPlayers', {
                body: aurelia_fetch_client_1.json(jwt_decode(this.auth.getAccessToken()).userid)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.players = data;
                _this.opponent = _this.players[0];
                _this.setImage();
            });
        };
        Fight.prototype.select = function (player) {
            console.log(player);
            this.selectedID = player.id;
            this.opponent = player;
            this.setImage();
        };
        Fight.prototype.fight = function () {
            this.http.fetch('Player/fight', {
                body: aurelia_fetch_client_1.json(new fight(this.player.id, this.opponent.id, this.weapon.id))
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                if (data) {
                    swal({
                        title: "U heeft gewonnen!",
                        type: "success",
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true
                    });
                }
                else {
                    swal({
                        title: "U heeft verloren!",
                        type: "warning",
                        showCancelButton: false,
                        showConfirmButton: true,
                        closeOnConfirm: true
                    });
                }
            });
        };
        Fight.prototype.setImage = function () {
            switch (this.opponent.classID) {
                case 1:
                    this.playerurl = "/images/hunter.png";
                    break;
                case 2:
                    this.playerurl = "/images/titan.png";
                    break;
                case 3:
                    this.playerurl = "/images/warlock.png";
                    break;
                default:
            }
        };
        return Fight;
    }());
    Fight = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], Fight);
    exports.Fight = Fight;
    var fight = (function () {
        function fight(player, opponement, weapon) {
            this.player = player;
            this.opponement = opponement;
            this.weapon = weapon;
        }
        return fight;
    }());
    exports.fight = fight;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvRmlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxLQUFLO1FBU2QsZUFBb0IsSUFBaUIsRUFBVSxJQUFnQjtZQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFhO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUMzRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFDRCx5QkFBUyxHQUFUO1lBQUEsaUJBT0M7WUFORyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQzFCLElBQUksRUFBRSwyQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO2FBQzVELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUMvQixJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUVELDBCQUFVLEdBQVY7WUFBQSxpQkFTQztZQVJHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFDO2dCQUNoQyxJQUFJLEVBQUUsMkJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQzthQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDL0IsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0Qsc0JBQU0sR0FBTixVQUFPLE1BQU07WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVELHFCQUFLLEdBQUw7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7Z0JBQzVCLElBQUksRUFBRSwyQkFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDMUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQy9CLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUM7d0JBQ0QsS0FBSyxFQUFFLG1CQUFtQjt3QkFDMUIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsZ0JBQWdCLEVBQUUsS0FBSzt3QkFDdkIsaUJBQWlCLEVBQUUsSUFBSTt3QkFDdkIsY0FBYyxFQUFFLElBQUk7cUJBQ3ZCLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLElBQUksQ0FBQzt3QkFDRCxLQUFLLEVBQUUsbUJBQW1CO3dCQUMxQixJQUFJLEVBQUUsU0FBUzt3QkFDZixnQkFBZ0IsRUFBRSxLQUFLO3dCQUN2QixpQkFBaUIsRUFBRSxJQUFJO3dCQUN2QixjQUFjLEVBQUUsSUFBSTtxQkFDdkIsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUVYLENBQUM7UUFFRCx3QkFBUSxHQUFSO1lBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztvQkFDdEMsS0FBSyxDQUFDO2dCQUNWLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDO29CQUNyQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7b0JBQ3ZDLEtBQUssQ0FBQztnQkFDVixRQUFRO1lBQ1osQ0FBQztRQUNMLENBQUM7UUFDTCxZQUFDO0lBQUQsQ0FoRkEsQUFnRkMsSUFBQTtJQWhGWSxLQUFLO1FBRGpCLDhCQUFVO3lDQVVtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQVR0RCxLQUFLLENBZ0ZqQjtJQWhGWSxzQkFBSztJQWtGbEI7UUFJSSxlQUFZLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTTtZQUVsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDO1FBQ0wsWUFBQztJQUFELENBVkEsQUFVQyxJQUFBO0lBVlksc0JBQUsiLCJmaWxlIjoiY29tcG9uZW50cy9GaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgRmlnaHQge1xuICAgIHBsYXllcnM7XG4gICAgcGxheWVyO1xuICAgIG9wcG9uZW50O1xuICAgIHNlbGVjdGVkSUQ7XG4gICAgd2VhcG9uO1xuICAgIGFwcG9uZW1lbnQ7XG4gICAgcGxheWVydXJsO1xuICAgIHJlc3VsdDogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UGxheWVycygpO1xuICAgICAgICB0aGlzLmdldFBsYXllcigpO1xyXG4gICAgfVxuICAgIGdldFBsYXllcigpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1BsYXllci9nZXQnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24oand0X2RlY29kZSh0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW4oKSkudXNlcmlkKVxyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XG5cbiAgICBnZXRQbGF5ZXJzKCkge1xuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1BsYXllci9nZXRQbGF5ZXJzJyx7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24oand0X2RlY29kZSh0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW4oKSkudXNlcmlkKVxyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVycyA9IGRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHBvbmVudCA9IHRoaXMucGxheWVyc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEltYWdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxuICAgIHNlbGVjdChwbGF5ZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSUQgPSBwbGF5ZXIuaWQ7XG4gICAgICAgIHRoaXMub3Bwb25lbnQgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuc2V0SW1hZ2UoKTtcclxuICAgIH1cblxuICAgIGZpZ2h0KCkge1xuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1BsYXllci9maWdodCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbihuZXcgZmlnaHQodGhpcy5wbGF5ZXIuaWQsIHRoaXMub3Bwb25lbnQuaWQsIHRoaXMud2VhcG9uLmlkKSlcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlUgaGVlZnQgZ2V3b25uZW4hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVSBoZWVmdCB2ZXJsb3JlbiFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxyXG4gICAgfVxuXG4gICAgc2V0SW1hZ2UoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5vcHBvbmVudC5jbGFzc0lEKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL2h1bnRlci5wbmdcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnVybCA9IFwiL2ltYWdlcy90aXRhbi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnVybCA9IFwiL2ltYWdlcy93YXJsb2NrLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgZmlnaHQge1xuICAgIHBsYXllcjtcbiAgICBvcHBvbmVtZW50O1xuICAgIHdlYXBvbjtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIG9wcG9uZW1lbnQsIHdlYXBvbilcbiAgICB7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLm9wcG9uZW1lbnQgPSBvcHBvbmVtZW50O1xuICAgICAgICB0aGlzLndlYXBvbiA9IHdlYXBvbjtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Login',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, aurelia_event_aggregator_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Login = (function () {
        function Login(auth, http, event, router) {
            this.auth = auth;
            this.http = http;
            this.event = event;
            this.router = router;
            this.name = "";
            this.password = "";
        }
        Login.prototype.login = function () {
            var _this = this;
            this.auth.login({
                name: this.name,
                password: this.password
            }).then(function (response) {
                _this.event.publish('signedIn', true);
                swal({
                    title: "U bent succesvol ingelogd",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    closeOnConfirm: false,
                    timer: 1000
                });
                _this.router.navigate("Character");
            })
                .catch(function (err) {
                swal({
                    title: "Inloggegevens zijn onjuist",
                    type: "warning",
                    showCancelButton: false,
                    showConfirmButton: false,
                    closeOnConfirm: false,
                    timer: 1000
                });
            });
        };
        return Login;
    }());
    Login = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], Login);
    exports.Login = Login;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBUUEsSUFBYSxLQUFLO1FBS2QsZUFBb0IsSUFBaUIsRUFBVSxJQUFnQixFQUFVLEtBQXNCLEVBQVUsTUFBYztZQUFuRyxTQUFJLEdBQUosSUFBSSxDQUFhO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUh2SCxTQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ1YsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUdkLENBQUM7UUFFRCxxQkFBSyxHQUFMO1lBQUEsaUJBNEJDO1lBM0JHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1osS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUM7b0JBQ0QsS0FBSyxFQUFFLDJCQUEyQjtvQkFDbEMsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsaUJBQWlCLEVBQUUsS0FBSztvQkFDeEIsY0FBYyxFQUFFLEtBQUs7b0JBQ3JCLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQztnQkFFSCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUV0QyxDQUFDLENBQUM7aUJBQ0csS0FBSyxDQUFDLFVBQUEsR0FBRztnQkFDTixJQUFJLENBQUM7b0JBQ0QsS0FBSyxFQUFFLDRCQUE0QjtvQkFDbkMsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsaUJBQWlCLEVBQUUsS0FBSztvQkFDeEIsY0FBYyxFQUFFLEtBQUs7b0JBQ3JCLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQXJDQSxBQXFDQyxJQUFBO0lBckNZLEtBQUs7UUFEakIsOEJBQVU7eUNBTW1CLG9DQUFXLEVBQWdCLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWtCLHVCQUFNO09BTDlHLEtBQUssQ0FxQ2pCO0lBckNZLHNCQUFLIiwiZmlsZSI6ImNvbXBvbmVudHMvTG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBMb2dpbiB7XHJcblxyXG4gICAgbmFtZSA9IFwiXCI7XHJcbiAgICBwYXNzd29yZCA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLmF1dGgubG9naW4oe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQucHVibGlzaCgnc2lnbmVkSW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVIGJlbnQgc3VjY2Vzdm9sIGluZ2Vsb2dkXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRpbWVyOiAxMDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCJDaGFyYWN0ZXJcIik7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5sb2dnZWdldmVucyB6aWpuIG9uanVpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0aW1lcjogMTAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59ICJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Quests',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Quest = (function () {
        function Quest(auth, http) {
            this.auth = auth;
            this.http = http;
            this.requirements = [];
            this.quests();
        }
        Quest.prototype.quests = function () {
            var _this = this;
            this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(jwt_decode(this.auth.getAccessToken()).userid)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.playerQuests = data;
            });
        };
        Quest.prototype.changeProgress = function (quest) {
            this.selectedQuest = new selectedQuest(quest.id, quest.progress);
            this.http.fetch('Quest/setQuestRequirement', {
                body: aurelia_fetch_client_1.json(this.selectedQuest)
            });
            this.quests();
        };
        Quest.prototype.addRequirement = function () {
            this.requirement = new requirement(this.description);
            this.requirements.push(this.requirement);
        };
        Quest.prototype.addQuest = function () {
            this.newQuest = new newQuest(this.requirements, this.name, this.playerQuests.ID);
            console.log(this.newQuest);
            this.http.fetch('Quest/addQuest', {
                body: aurelia_fetch_client_1.json(this.newQuest)
            });
            this.quests();
        };
        return Quest;
    }());
    Quest = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], Quest);
    exports.Quest = Quest;
    var selectedQuest = (function () {
        function selectedQuest(ID, progress) {
            this.ID = ID;
            this.progress = progress;
        }
        return selectedQuest;
    }());
    exports.selectedQuest = selectedQuest;
    var requirement = (function () {
        function requirement(description) {
            this.description = description;
        }
        return requirement;
    }());
    exports.requirement = requirement;
    var newQuest = (function () {
        function newQuest(requirements, name, userID) {
            this.requirements = requirements;
            this.description = name;
            this.ID = userID;
        }
        return newQuest;
    }());
    exports.newQuest = newQuest;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SSxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDckIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLDRCQUFRIiwiZmlsZSI6ImNvbXBvbmVudHMvUXVlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBRdWVzdCB7XHJcbiAgICBwbGF5ZXJRdWVzdHM7XHJcbiAgICBzZWxlY3RlZFF1ZXN0O1xyXG4gICAgbmFtZTtcclxuICAgIGRlc2NyaXB0aW9uO1xyXG4gICAgcmVxdWlyZW1lbnRzID0gW107XHJcbiAgICByZXF1aXJlbWVudDtcclxuICAgIG5ld1F1ZXN0O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBxdWVzdHMoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZClcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllclF1ZXN0cyA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVByb2dyZXNzKHF1ZXN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFF1ZXN0ID0gbmV3IHNlbGVjdGVkUXVlc3QocXVlc3QuaWQsIHF1ZXN0LnByb2dyZXNzKTtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1F1ZXN0L3NldFF1ZXN0UmVxdWlyZW1lbnQnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5zZWxlY3RlZFF1ZXN0KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucXVlc3RzKCk7XHJcbiAgICB9XHJcbiAgICBhZGRSZXF1aXJlbWVudCgpIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVtZW50ID0gbmV3IHJlcXVpcmVtZW50KHRoaXMuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZW1lbnRzLnB1c2godGhpcy5yZXF1aXJlbWVudCk7XHJcbiAgICB9XHJcbiAgICBhZGRRdWVzdCgpIHtcclxuICAgICAgICB0aGlzLm5ld1F1ZXN0ID0gbmV3IG5ld1F1ZXN0KHRoaXMucmVxdWlyZW1lbnRzLCB0aGlzLm5hbWUsIHRoaXMucGxheWVyUXVlc3RzLklEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5ld1F1ZXN0KTtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1F1ZXN0L2FkZFF1ZXN0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMubmV3UXVlc3QpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBzZWxlY3RlZFF1ZXN0IHtcclxuICAgIElEOiBzdHJpbmc7XHJcbiAgICBwcm9ncmVzczogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoSUQ6IHN0cmluZywgcHJvZ3Jlc3M6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuSUQgPSBJRDtcclxuICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyByZXF1aXJlbWVudCB7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBuZXdRdWVzdCB7XHJcbiAgICByZXF1aXJlbWVudHM7XHJcbiAgICBkZXNjcmlwdGlvbjtcclxuICAgIElEO1xyXG4gICAgY29uc3RydWN0b3IocmVxdWlyZW1lbnRzLCBuYW1lLCB1c2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlbWVudHMgPSByZXF1aXJlbWVudHM7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbj0gbmFtZTtcclxuICAgICAgICB0aGlzLklEID0gdXNlcklEO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Register',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, aurelia_event_aggregator_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Register = (function () {
        function Register(auth, http, event, router) {
            this.auth = auth;
            this.http = http;
            this.event = event;
            this.router = router;
            this.name = "";
            this.password = "";
            this.passwordConfirm = "";
            this.classID = "";
        }
        Register.prototype.register = function () {
            var _this = this;
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
                    body: aurelia_fetch_client_1.json(this.player)
                }).then(function (response) { return response.json(); })
                    .then(function (data) {
                    if (data) {
                        _this.login();
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
        };
        Register.prototype.login = function () {
            var _this = this;
            this.auth.login({
                name: this.name,
                password: this.password
            }).then(function (response) {
                _this.event.publish('signedIn', true);
                _this.router.navigate("Character");
            });
        };
        return Register;
    }());
    Register = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], Register);
    exports.Register = Register;
    var Player = (function () {
        function Player(name, password, classID) {
            this.name = name;
            this.password = password;
            this.classID = classID;
        }
        return Player;
    }());
    exports.Player = Player;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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OEJBQVU7eUNBUW1CLG9DQUFXLEVBQWdCLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWtCLHVCQUFNO09BUDlHLFFBQVEsQ0E4RHBCO0lBOURZLDRCQUFRO0lBZ0VyQjtRQUlJLGdCQUFZLElBQVksRUFBQyxRQUFnQixFQUFFLE9BQWU7WUFDdEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQVRBLEFBU0MsSUFBQTtJQVRZLHdCQUFNIiwiZmlsZSI6ImNvbXBvbmVudHMvUmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuXHJcbkBhdXRvaW5qZWN0XG5leHBvcnQgY2xhc3MgUmVnaXN0ZXIge1xyXG4gICAgbmFtZSA9IFwiXCI7XHJcbiAgICBwYXNzd29yZCA9IFwiXCI7XG4gICAgcGFzc3dvcmRDb25maXJtID0gXCJcIjtcclxuICAgIGNsYXNzSUQgPSBcIlwiO1xuICAgIHBsYXllcjtcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIH1cblxuICAgIHJlZ2lzdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wYXNzd29yZCAhPSB0aGlzLnBhc3N3b3JkQ29uZmlybSkge1xyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlV3IGluZ2V2dWxkZSB3YWNodHdvb3JkZW4gemlqbiBuaWV0IGdlbGlqa1wiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5uYW1lLCB0aGlzLnBhc3N3b3JkLCB0aGlzLmNsYXNzSUQpO1xuICAgICAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvcmVnaXN0ZXInLCB7XHJcbiAgICAgICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucGxheWVyKVxuICAgICAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVSBiZW50IHN1Y2Nlc3ZvbCBnZXJlZ2lzdHJlZXJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyOiAxMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5hYW0gaXMgYWwgYmV6ZXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXI6IDEwMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XG5cbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLmF1dGgubG9naW4oe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQucHVibGlzaCgnc2lnbmVkSW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCJDaGFyYWN0ZXJcIik7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxuXHJcbn1cblxuZXhwb3J0IGNsYXNzIFBsYXllcntcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbiAgICBjbGFzc0lEOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLHBhc3N3b3JkOiBzdHJpbmcsIGNsYXNzSUQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgdGhpcy5jbGFzc0lEID0gY2xhc3NJRDtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Weapons',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Weapons = (function () {
        function Weapons(auth, http) {
            this.auth = auth;
            this.http = http;
            this.weapons();
        }
        Weapons.prototype.weapons = function () {
            var _this = this;
            this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(jwt_decode(this.auth.getAccessToken()).userid)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.weaponsplayer = data;
            });
        };
        Weapons.prototype.addWeapon = function () {
            this.newWeapon = new newWeapon(this.name, this.damage, this.minlevel, this.weaponsplayer.ID);
            this.http.fetch('Weapon/addWeapon', {
                body: aurelia_fetch_client_1.json(this.newWeapon)
            });
            this.weapons();
        };
        Weapons.prototype.editWeapon = function (weapon) {
            this.editweapon = new editWeapon(this.name, this.damage, this.minlevel, weapon.id);
            console.log(this.editweapon);
            this.http.fetch('Weapon/editWeapon', {
                body: aurelia_fetch_client_1.json(this.editweapon)
            });
            this.weapons();
        };
        Weapons.prototype.deleteWeapon = function (weapon) {
            var _this = this;
            swal({
                title: 'Weet u het zeker?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ja verwijder deze wapen',
                cancelButtonText: 'Stop'
            }, function (isOk) {
                if (isOk) {
                    _this.http.fetch('Weapon/deleteWeapon', {
                        body: aurelia_fetch_client_1.json(weapon)
                    });
                    _this.weapons();
                    swal({
                        title: 'Verwijderd',
                        text: 'Wapen is succesvol verwijderd',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
        };
        return Weapons;
    }());
    Weapons = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], Weapons);
    exports.Weapons = Weapons;
    var newWeapon = (function () {
        function newWeapon(name, damage, minlevel, playerID) {
            this.name = name;
            this.damage = damage;
            this.minlevel = minlevel;
            this.playerID = playerID;
        }
        return newWeapon;
    }());
    exports.newWeapon = newWeapon;
    var editWeapon = (function () {
        function editWeapon(name, damage, minlevel, ID) {
            this.name = name;
            this.damage = damage;
            this.minlevel = minlevel;
            this.ID = ID;
        }
        return editWeapon;
    }());
    exports.editWeapon = editWeapon;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QTtJQTlEWSxPQUFPO1FBRG5CLDhCQUFVO3lDQVFtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQVB0RCxPQUFPLENBOERuQjtJQTlEWSwwQkFBTztJQStEcEI7UUFLSSxtQkFBWSxJQUFZLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxRQUFRO1lBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFDTCxnQkFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksOEJBQVM7SUFhdEI7UUFLSSxvQkFBWSxJQUFZLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDTCxpQkFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksZ0NBQVUiLCJmaWxlIjoiY29tcG9uZW50cy9XZWFwb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBXZWFwb25zIHtcclxuICAgIHdlYXBvbnNwbGF5ZXI7XHJcbiAgICBuYW1lO1xyXG4gICAgZGFtYWdlO1xyXG4gICAgbWlubGV2ZWw7XHJcbiAgICBuZXdXZWFwb247XG4gICAgZWRpdHdlYXBvbjtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMud2VhcG9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHdlYXBvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZClcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbnNwbGF5ZXIgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2VhcG9uKCkge1xyXG4gICAgICAgIHRoaXMubmV3V2VhcG9uID0gbmV3IG5ld1dlYXBvbih0aGlzLm5hbWUsIHRoaXMuZGFtYWdlLCB0aGlzLm1pbmxldmVsLCB0aGlzLndlYXBvbnNwbGF5ZXIuSUQpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnV2VhcG9uL2FkZFdlYXBvbicsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLm5ld1dlYXBvbilcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLndlYXBvbnMoKTtcclxuICAgIH1cblxuICAgIGVkaXRXZWFwb24od2VhcG9uKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVkaXR3ZWFwb24gPSBuZXcgZWRpdFdlYXBvbih0aGlzLm5hbWUsIHRoaXMuZGFtYWdlLCB0aGlzLm1pbmxldmVsLCB3ZWFwb24uaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdHdlYXBvbik7XG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnV2VhcG9uL2VkaXRXZWFwb24nLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5lZGl0d2VhcG9uKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMud2VhcG9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVdlYXBvbih3ZWFwb24pIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdXZWV0IHUgaGV0IHpla2VyPycsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdKYSB2ZXJ3aWpkZXIgZGV6ZSB3YXBlbicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdTdG9wJ1xyXG4gICAgICAgIH0sIChpc09rKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc09rKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1dlYXBvbi9kZWxldGVXZWFwb24nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToganNvbih3ZWFwb24pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9ucygpO1xyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdWZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnV2FwZW4gaXMgc3VjY2Vzdm9sIHZlcndpamRlcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBuZXdXZWFwb24ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGFtYWdlO1xyXG4gICAgbWlubGV2ZWw7XHJcbiAgICBwbGF5ZXJJRDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGFtYWdlLCBtaW5sZXZlbCxwbGF5ZXJJRCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5taW5sZXZlbCA9IG1pbmxldmVsO1xyXG4gICAgICAgIHRoaXMucGxheWVySUQgPSBwbGF5ZXJJRDtcclxuICAgIH1cclxufVxuXG5leHBvcnQgY2xhc3MgZWRpdFdlYXBvbiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkYW1hZ2U7XHJcbiAgICBtaW5sZXZlbDtcbiAgICBJRDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGFtYWdlLCBtaW5sZXZlbCxJRCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5taW5sZXZlbCA9IG1pbmxldmVsO1xuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxtQkFBMEIsTUFBOEI7SUFFeEQsQ0FBQztJQUZELDhCQUVDIiwiZmlsZSI6InJlc291cmNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24pIHtcclxuICAvL2NvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW10pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('text!app.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n\r\n          <a class=\"navbar-brand\">\r\n            DestinyFinder\r\n          </a>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li show.bind=\"!authenticated\">\r\n              <a route-href=\"route: Register\">Register</a>\r\n            </li>\r\n\r\n            <li show.bind=\"!authenticated\">\r\n              <a route-href=\"route: Login\">Login</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Character\">Character</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Weapons\">Weapons</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Quests\">Quests</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Bounties\">Bounties</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Fight\">Fight</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"#\" click.delegate=\"logout()\" show.bind=\"authenticated\">\r\n                Uitloggen\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <div class=\"container\">\r\n      <router-view></router-view>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Bounties.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Bounties.</h2>\r\n    <p>Hier ziet u een overzicht van al je Bounties.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Voeg Bounty toe</button>\r\n      <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Bounty's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"userEmail\">Locatie</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"location\"  value.bind=\"location\" required>\r\n                <span class=\"help-block\">Vul de locatie van de Bounty in.</span>\r\n              </div>\r\n                  <div class=\"form-group\">\r\n                    <label for=\"password\">Omschrijving</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"description\"  value.bind=\"description\" required>\r\n                    <span class=\"help-block\">vul de omschrijving in van de Bounty.</span>\r\n                  </div>\r\n            <div class=\"modal-footer\">\r\n              <button type=\"button\" class=\"btn btn-default\"  data-dismiss=\"modal\">Annuleren</button>\r\n              <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addBounty()\" data-dismiss=\"modal\">Toevoegen</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"container\">\r\n    </div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th>Locatie</th>\r\n          <th>Omschrijving</th>\r\n          <th>voortgang</th>\r\n          <th>opties</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr repeat.for=\"bounty of playerBounties.bounties\">\r\n          <td class=\"col-md-2\">\r\n            ${bounty.location}\r\n          </td>\r\n            <td class=\"col-md-8\">\r\n              ${bounty.description}\r\n          </td>\r\n          <td class=\"col-md-2\">\r\n            ${bounty.progress}\r\n          </td>\r\n          <td class=\"col-md-2\">\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"changeProgress(bounty)\">\r\n              <span class=\"glyphicon glyphicon-ok\"></span> Voltooien/Onvoltooien\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"deleteBounty(bounty)\">\r\n              <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n</template>"; });
define('text!components/Character.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-2\">\r\n              <img src=\"${playerurl}\" alt=\"\" class=\"img-rounded img-responsive\" />\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <h2 class=\"glyphicon glyphicon-user\"> ${playerstats.name}\r\n              </h2>\n              <h4>${playerstats.classname}</h4>\r\n              <p>\r\n                <h4 class=\"glyphicon glyphicon-fire\"><b> Level: </b>${playerstats.level}</h4>\r\n                <br />\r\n                <h4 class=\"glyphicon glyphicon-heart\"><b> HP: </b>${playerstats.hp}</h4>\r\n                <br />\r\n                <h4 class=\"glyphicon glyphicon-flash\"><b> XP tot volgende level: </b>${playerstats.xpNextLevel}</h4>\r\n              </p>\n              <div class=\"container\">\r\n                <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Character aanpassen</button>\r\n                <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n                  <div class=\"modal-dialog\">\r\n                    <div class=\"modal-content\">\r\n                      <div class=\"modal-header\">\r\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                        <h4 class=\"modal-title\">Vul jouw Character gegevens in.</h4>\r\n                      </div>\r\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"class\">Class</label>\r\n                          <select id=\"class\" name=\"class\" class=\"form-control\" value.bind=\"className\" required>\r\n                            <option disabled selected value> -- Selecteer een class -- </option>\r\n                            <option>Hunter</option>\r\n                            <option>Titan</option>\r\n                            <option>Warlock</option>\r\n                          </select>\n                          <span class=\"help-block\">Verander de class om van uiterlijk te veranderen</span>\r\n                        </div>\r\n                        </div>\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"HP\">HP</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"HP\"  value.bind=\"HP\" required>\r\n                          <span class=\"help-block\">vul de HP in.</span>\r\n                        </div>\n                        </div>\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"level\">Level</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"level\"  value.bind=\"level\" required>\r\n                          <span class=\"help-block\">vul de level in.</span>\r\n                        </div>\r\n                      </div>\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"XP\">XP tot volgende level</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"XP\"  value.bind=\"XP\" required>\r\n                          <span class=\"help-block\">vul de XP tot volgende level in.</span>\r\n                        </div>\r\n                      </div>\r\n                            <div class=\"modal-footer\">\r\n                              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                              <button type=\"button\" class=\"btn btn-default\" click.delegate=\"updatePlayer()\" data-dismiss=\"modal\">Aanpassen</button>\r\n                            </div>\r\n                          </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\n               </div>\r\n              </div>\r\n          </div>\r\n        </div>\r\n</template>"; });
define('text!components/Fight.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container col-md-4\">\r\n    <ul class=\"list-group\">\r\n      <li  repeat.for=\"player of players\" class=\"list-group-item ${player.id === $parent.selectedID ? 'active' : ''}\">\n        <a click.delegate=\"$parent.select(player)\">\r\n        <h4 style=\"color:black;\" class=\"list-group-item-heading\">${player.name}</h4>\r\n          <p style=\"color:black;\" class=\"list-group-item-text\">Level: ${player.level}</p>\n          </a>\r\n        </li>\r\n    </ul>\r\n  </div>\n  <div class=\"col-md-2\">\r\n    <img src=\"${playerurl}\" alt=\"\" class=\"img-rounded img-responsive\" />\r\n  </div>\r\n  <div class=\"col-md-6\">\r\n    <h2 class=\"glyphicon glyphicon-user\">\r\n      ${opponent.name}\r\n    </h2>\r\n    <h4>${opponent.classname}</h4>\r\n    <p>\r\n      <h4 class=\"glyphicon glyphicon-fire\"><b> Level: </b>${opponent.level}</h4>\r\n      <br />\r\n      <h4 class=\"glyphicon glyphicon-heart\"><b> HP: </b>${opponent.hp}</h4>\r\n      </p>\n    </div>\n  <div class=\"container\">\r\n    <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#Fight\">Vechten</button>\r\n    <div class=\"modal fade\" id=\"Fight\" role=\"dialog\">\r\n      <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n            <h4 class=\"modal-title\">Gevecht voorbereiden</h4>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userWeapon\">Wapen</label>\r\n              <select id=\"userWeapon\"value.bind=\"weapon\"  name=\"userWeapon\" class=\"form-control\" required>\r\n                <option repeat.for=\"weapon of player.weapons\" model.bind=\"weapon\">${weapon.name} <b>damage:</b> ${weapon.damage}</option>\r\n              </select>\r\n              <span class=\"help-block\">Kies een van je wapens.</span>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n              <button type=\"button\" class=\"btn btn-default\" click.delegate=\"fight()\" data-dismiss=\"modal\">Vechten</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\n  </div>\r\n</template>"; });
define('text!components/Login.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">Login op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"login()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" required name=\"name\" value.bind=\"name\">\r\n              <span class=\"help-block\">Vul hier jouw gekozen naam in.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"modal-body\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" required name=\"password\" value.bind=\"password\">\r\n                  <span class=\"help-block\">Vul jouw wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Quests.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Quests.</h2>\r\n    <p>Hier ziet u een overzicht van al je quests.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Voeg Quest toe</button>\r\n      <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Quest's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">Naam</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"name\"  value.bind=\"name\" required>\r\n                <span class=\"help-block\">Vul de naam van de Quest in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <h4>Vul de QuestRequirement's gegevens in.</h4>\r\n                <label for=\"password\">Omschrijving</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"description\"  value.bind=\"description\" required>\r\n                <span class=\"help-block\">Vul de omschrijving in van de Requirement.</span>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addRequirement()\">Voeg requirement toe.</button>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addQuest()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\">\r\n        <div class=\"row\" repeat.for=\"quest of playerQuests.quests\">\r\n          <div class=\"col\">\r\n            <h4><b>${quest.description} ${quest.progress}</b></h4>\r\n            <div class=\"col\" repeat.for=\"requirement of quest.requirements\">\r\n              ${requirement.description}\r\n              <b> ${requirement.progress}</b>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"changeProgress(requirement)\">\r\n                <span class=\"glyphicon glyphicon-ok\"></span> Voltooien/Onvoltooien\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Register.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">registreer op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"register()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" name=\"name\"  value.bind=\"name\" required>\r\n              <span class=\"help-block\">Jouw naam wordt ook gebruikt bij het inloggen.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"password\"  value.bind=\"password\" required>\r\n                  <span class=\"help-block\">Vul een wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"passwordr\">Herhaal Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"passwordr\" value.bind=\"passwordConfirm\" required>\r\n                  <span class=\"help-block\">Herhaal wachtwoord.</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"Class\">Class</label>\r\n                  <select id=\"classID\" name=\"classID\" class=\"form-control\" value.bind=\"classID\" required>\r\n                    <option disabled selected value> -- Selecteer een Class -- </option>\r\n                    <option>Hunter</option>\r\n                    <option>Titan</option>\r\n                    <option>Warlock</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Weapons.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Wapens.</h2>\r\n    <p>Hier ziet u een overzicht van al je wapens.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#newWeapon\">Voeg Wapen toe</button>\r\n      <div class=\"modal fade\" id=\"newWeapon\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Wapen's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">naam</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"name\" value.bind=\"name\" required>\r\n                <span class=\"help-block\">Vul de naam in van de Wapen in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"damage\">damage</label>\r\n                <input type=\"number\" class=\"form-control\" name=\"damage\"  value.bind=\"damage\" required>\r\n                <span class=\"help-block\">vul de damage in van de Wapen.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"password\">minlevel</label>\r\n                <input type=\"number\" class=\"form-control\" name=\"minlevel\" value.bind=\"minlevel\" required>\r\n                <span class=\"help-block\">vul de minimale level in van de Wapen.</span>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addWeapon()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\">\r\n      </div>\r\n      <table class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Naam</th>\r\n            <th>Damage</th>\r\n            <th>Minimale level</th>\r\n            <th>opties</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr repeat.for=\"weapon of weaponsplayer.weapons\">\r\n            <td class=\"col-md-4\">\r\n              ${weapon.name}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              ${weapon.damage}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              ${weapon.minLevel}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" data-toggle=\"modal\" data-target=\"#editWeapon\">\r\n                <span class=\"glyphicon glyphicon-edit\"></span> aanpassen\r\n              </button>\r\n              <div class=\"modal fade\" id=\"editWeapon\" role=\"dialog\">\r\n                <div class=\"modal-dialog\">\r\n                  <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n                      <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                      <h4 class=\"modal-title\">Vul de Wapen's gegevens in.</h4>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"name\">naam</label>\r\n                        <input type=\"text\" class=\"form-control\" name=\"name\"  value.bind=\"name\" required>\r\n                        <span class=\"help-block\">Vul de naam in van de Wapen in.</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"damage\">damage</label>\r\n                        <input type=\"number\" class=\"form-control\" name=\"damage\" value.bind=\"damage\" required>\r\n                        <span class=\"help-block\">vul de damage in van de Wapen.</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"password\">minlevel</label>\r\n                        <input type=\"number\" class=\"form-control\" name=\"minlevel\"  value.bind=\"minlevel\" required>\r\n                        <span class=\"help-block\">vul de minimale level in van de Wapen.</span>\r\n                      </div>\r\n                      <div class=\"modal-footer\">\r\n                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                        <button type=\"button\" class=\"btn btn-default\" click.delegate=\"editWeapon(weapon)\" data-dismiss=\"modal\">Aanpassen</button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"deleteWeapon(weapon)\">\r\n                <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n              </button>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n   </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map