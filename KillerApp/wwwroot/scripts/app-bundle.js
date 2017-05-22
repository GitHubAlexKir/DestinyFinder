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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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dUJBQW9CLFdBQXdCO1lBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQUksQ0FBQztRQUVqRCwyQkFBRyxHQUFILFVBQUkscUJBQTRDLEVBQUUsSUFBVTtZQUN4RCxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFiLENBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFFcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUkseUJBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQWRLLGFBQWE7UUFEbEIsOEJBQVU7eUNBRTBCLG9DQUFXO09BRDFDLGFBQWEsQ0FjbEIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJDb25maWd1cmF0aW9uLCBOZXh0LCBSZWRpcmVjdCwgTmF2aWdhdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBGZXRjaENvbmZpZyB9IGZyb20gJ2F1cmVsaWEtYXV0aGVudGljYXRpb24nO1xyXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG4gICAgcm91dGVyOiBSb3V0ZXI7XHJcbiAgICBhdXRoZW50aWNhdGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IEZldGNoQ29uZmlnLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBldmVudDogRXZlbnRBZ2dyZWdhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWdIdHRwKCk7XHJcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICAgICAgYWxlcnQoand0X2RlY29kZSh0aGlzLmF1dGhTZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnQuc3Vic2NyaWJlKCdzaWduZWRJbicsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gcmVzcG9uc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFwibG9naW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQmVkYW5rdCB2b29yIHV3IGJlem9la1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lcjogMjAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG5cclxuICAgICAgICBsZXQgc3RlcCA9IG5ldyBBdXRob3JpemVTdGVwKHRoaXMuYXV0aFNlcnZpY2UpO1xyXG4gICAgICAgIGNvbmZpZy5hZGRBdXRob3JpemVTdGVwKHN0ZXApO1xyXG5cclxuICAgICAgICBjb25maWcudGl0bGUgPSAnQXVyZWxpYSc7XHJcbiAgICAgICAgY29uZmlnLm1hcChbXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdDaGFyYWN0ZXInXSwgbmFtZTogJ0NoYXJhY3RlcicsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9DaGFyYWN0ZXInLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdXZWFwb25zJ10sIG5hbWU6ICdXZWFwb25zJywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL1dlYXBvbnMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdRdWVzdHMnXSwgbmFtZTogJ1F1ZXN0cycsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9RdWVzdHMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdCb3VudGllcyddLCBuYW1lOiAnQm91bnRpZXMnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvQm91bnRpZXMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdSZWdpc3RlciddLCBuYW1lOiAnUmVnaXN0ZXInLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvUmVnaXN0ZXInIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdMb2dpbiddLCBuYW1lOiAnTG9naW4nLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvTG9naW4nIH1cclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25maWdIdHRwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHR0cC5jb25maWd1cmUoY29uZmlnID0+IHtcclxuICAgICAgICAgICAgY29uZmlnXHJcbiAgICAgICAgICAgICAgICAud2l0aEJhc2VVcmwoJ2FwaS8nKVxyXG4gICAgICAgICAgICAgICAgLndpdGhEZWZhdWx0cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ0ZldGNoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGFUeXBlJzogJ2pzb24nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVxdWVzdGluZyAke3JlcXVlc3QubWV0aG9kfSAke3JlcXVlc3QudXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlOiBSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZWQgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLmNvbmZpZ3VyZSh0aGlzLmh0dHApO1xyXG4gICAgfVxyXG59XHJcblxyXG5AYXV0b2luamVjdFxyXG5jbGFzcyBBdXRob3JpemVTdGVwIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBydW4obmF2aWdhdGlvbkluc3RydWN0aW9uOiBOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIG5leHQ6IE5leHQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmIChuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24uZ2V0QWxsSW5zdHJ1Y3Rpb25zKCkuc29tZShpID0+IGkuY29uZmlnLmF1dGgpKSB7XHJcbiAgICAgICAgICAgIGxldCBpc0xvZ2dlZEluID0gdGhpcy5hdXRoU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCgnbG9naW4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXh0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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
            this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
            this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(this.player)
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
            this.newbounty = new newBounty(this.location, this.description, this.player.ID);
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
    var Player = (function () {
        function Player(ID) {
            this.ID = ID;
        }
        return Player;
    }());
    exports.Player = Player;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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O1FBQ2pCLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSx3QkFBTTtJQU9uQjtRQUlJLG1CQUFZLFFBQWdCLEVBQUUsV0FBbUIsRUFBQyxRQUFRO1lBRXRELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFDTCxnQkFBQztJQUFELENBVkEsQUFVQyxJQUFBO0lBVlksOEJBQVMiLCJmaWxlIjoiY29tcG9uZW50cy9Cb3VudGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgQm91bnRpZXMge1xyXG4gICAgcGxheWVyO1xyXG4gICAgcGxheWVyQm91bnRpZXM7XHJcbiAgICBsb2NhdGlvbjtcclxuICAgIGRlc2NyaXB0aW9uO1xyXG4gICAgbmV3Ym91bnR5O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5ib3VudGllcygpO1xyXG4gICAgfVxyXG5cclxuICAgYm91bnRpZXMoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCk7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucGxheWVyKVxyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQm91bnRpZXMgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgfVxyXG5cclxuICAgY2hhbmdlUHJvZ3Jlc3MoYm91bnR5KSB7XHJcbiAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ0JvdW50eS9zZXRCb3VudHknLCB7XHJcbiAgICAgICAgICAgYm9keToganNvbihib3VudHkpXHJcbiAgICAgICB9KTtcclxuICAgICAgIHRoaXMuYm91bnRpZXMoKTtcclxuICAgfVxyXG4gICBhZGRCb3VudHkoKSB7XHJcbiAgICAgICB0aGlzLm5ld2JvdW50eSA9IG5ldyBuZXdCb3VudHkodGhpcy5sb2NhdGlvbiwgdGhpcy5kZXNjcmlwdGlvbiwgdGhpcy5wbGF5ZXIuSUQpO1xyXG4gICAgICAgdGhpcy5odHRwLmZldGNoKCdCb3VudHkvYWRkQm91bnR5Jywge1xyXG4gICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5uZXdib3VudHkpXHJcbiAgICAgICB9KTtcclxuICAgICAgIHRoaXMuYm91bnRpZXMoKTtcclxuICAgfVxyXG5cclxuICAgZGVsZXRlQm91bnR5KGJvdW50eSkge1xyXG4gICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgdGl0bGU6ICdXZWV0IHUgaGV0IHpla2VyPycsXHJcbiAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdKYSB2ZXJ3aWpkZXIgZGV6ZSBCb3VudHknLFxyXG4gICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdTdG9wJyxcclxuICAgICAgIH0sIChpc09rKSA9PiB7XHJcbiAgICAgICAgICAgaWYgKGlzT2spIHtcclxuICAgICAgICAgICAgICAgdGhpcy5odHRwLmZldGNoKCdCb3VudHkvZGVsZXRlQm91bnR5Jywge1xyXG4gICAgICAgICAgICAgICAgICAgYm9keToganNvbihib3VudHkpXHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICB0aGlzLmJvdW50aWVzKCk7XHJcbiAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgdGl0bGU6ICdWZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgIHRleHQ6ICdCb3VudHkgaXMgc3VjY2Vzdm9sIHZlcndpamRlcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgdGltZXI6IDMwMDBcclxuICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSk7XHJcbiAgIH1cclxuICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKElEOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBuZXdCb3VudHkge1xyXG4gICAgbG9jYXRpb246IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBwbGF5ZXJJRDtcclxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcscGxheWVySUQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLnBsYXllcklEID0gcGxheWVySUQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

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
            this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
            return this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(this.player)
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
            this.updatedPlayer = new UpdatePlayer(this.player.ID, this.className, this.HP, this.level, this.XP);
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
    var Player = (function () {
        function Player(ID) {
            this.ID = ID;
        }
        return Player;
    }());
    exports.Player = Player;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUM7WUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FkQSxBQWNDLElBQUE7SUFkWSxvQ0FBWSIsImZpbGUiOiJjb21wb25lbnRzL0NoYXJhY3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXIge1xuICAgIHBsYXllcjtcbiAgICBwbGF5ZXJzdGF0cztcbiAgICBwbGF5ZXJ1cmwgPSBcIi9JbWFnZXMvV2FybG9jay5wbmdcIjtcbiAgICB1cGRhdGVkUGxheWVyO1xuICAgIGNsYXNzTmFtZTtcbiAgICBIUDtcbiAgICBsZXZlbDtcbiAgICBYUDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLnN0YXRzKCk7XHJcbiAgICB9XG5cclxuICAgIHN0YXRzKCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoand0X2RlY29kZSh0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW4oKSkudXNlcmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL2dldCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLnBsYXllcilcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnN0YXRzID0gZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEltYWdlKCk7XG4gICAgICAgICAgICB9KTtcclxuICAgIH1cbiAgICBzZXRJbWFnZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnBsYXllcnN0YXRzLmNsYXNzSUQpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJ1cmwgPSBcIi9pbWFnZXMvaHVudGVyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL3RpdGFuLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL3dhcmxvY2sucG5nXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhazsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxuXG4gICAgdXBkYXRlUGxheWVyKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZWRQbGF5ZXIgPSBuZXcgVXBkYXRlUGxheWVyKHRoaXMucGxheWVyLklELCB0aGlzLmNsYXNzTmFtZSwgdGhpcy5IUCwgdGhpcy5sZXZlbCwgdGhpcy5YUCk7XG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL3VwZGF0ZScsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLnVwZGF0ZWRQbGF5ZXIpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdGF0cygpO1xyXG4gICAgfVxyXG59XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICAgIElEOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IoSUQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuSUQgPSBJRDtcclxuICAgIH1cclxufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlUGxheWVyIHtcbiAgICBJRDogc3RyaW5nO1xuICAgIGNsYXNzTmFtZTogc3RyaW5nO1xuICAgIEhQO1xuICAgIGxldmVsO1xuICAgIFhQO1xuXG4gICAgY29uc3RydWN0b3IoSUQ6IHN0cmluZywgY2xhc3NOYW1lLEhQLGxldmVsLFhQKSB7XHJcbiAgICAgICAgdGhpcy5JRCA9IElEO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgdGhpcy5IUCA9IEhQO1xuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIHRoaXMuWFAgPSBYUDtcclxuICAgIH1cclxufVxuXG4iXSwic291cmNlUm9vdCI6InNyYyJ9

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
                _this.router.navigate("Character");
            })
                .catch(function (err) {
                swal({
                    title: "Inloggegevens zijn onjuist",
                    type: "warning",
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
            });
        };
        Login.prototype.logout = function () {
            this.auth.logout('');
        };
        Login.prototype.test = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQSxJQUFhLEtBQUs7UUFLZCxlQUFvQixJQUFpQixFQUFVLElBQWdCLEVBQVUsS0FBc0IsRUFBVSxNQUFjO1lBQW5HLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBSHZILFNBQUksR0FBRyxFQUFFLENBQUM7WUFDVixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsQ0FBQztRQUVELHFCQUFLLEdBQUw7WUFBQSxpQkEwQkM7WUF6QkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDWixLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsMkJBQTJCO29CQUNsQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixjQUFjLEVBQUUsSUFBSTtpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXRDLENBQUMsQ0FBQztpQkFDRyxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNOLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsNEJBQTRCO29CQUNuQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixjQUFjLEVBQUUsSUFBSTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsc0JBQU0sR0FBTjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFFSyxvQkFBSSxHQUFWOzs7Ozs7U0FFQztRQUNMLFlBQUM7SUFBRCxDQTNDQSxBQTJDQyxJQUFBO0lBM0NZLEtBQUs7UUFEakIsOEJBQVU7eUNBTW1CLG9DQUFXLEVBQWdCLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWtCLHVCQUFNO09BTDlHLEtBQUssQ0EyQ2pCO0lBM0NZLHNCQUFLIiwiZmlsZSI6ImNvbXBvbmVudHMvTG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBMb2dpbiB7XHJcblxyXG4gICAgbmFtZSA9IFwiXCI7XHJcbiAgICBwYXNzd29yZCA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLmF1dGgubG9naW4oe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQucHVibGlzaCgnc2lnbmVkSW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVIGJlbnQgc3VjY2Vzdm9sIGluZ2Vsb2dkXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFwiQ2hhcmFjdGVyXCIpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklubG9nZ2VnZXZlbnMgemlqbiBvbmp1aXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoLmxvZ291dCgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdGVzdCgpIHtcclxuXHJcbiAgICB9XHJcbn0gIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
            this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
            return this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(this.player)
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
            this.newQuest = new newQuest(this.requirements, this.name, this.player.ID);
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
    var Player = (function () {
        function Player(ID) {
            this.ID = ID;
        }
        return Player;
    }());
    exports.Player = Player;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFZLFdBQW1CO1lBRTNCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25DLENBQUM7UUFDTCxrQkFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBTlksa0NBQVc7SUFReEI7UUFJSSxrQkFBWSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU07WUFFbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDckIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLDRCQUFRIiwiZmlsZSI6ImNvbXBvbmVudHMvUXVlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBRdWVzdCB7XHJcbiAgICBwbGF5ZXI7XHJcbiAgICBwbGF5ZXJRdWVzdHM7XHJcbiAgICBzZWxlY3RlZFF1ZXN0O1xyXG4gICAgbmFtZTtcclxuICAgIGRlc2NyaXB0aW9uO1xyXG4gICAgcmVxdWlyZW1lbnRzID0gW107XHJcbiAgICByZXF1aXJlbWVudDtcclxuICAgIG5ld1F1ZXN0O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBxdWVzdHMoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL2dldCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLnBsYXllcilcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllclF1ZXN0cyA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVByb2dyZXNzKHF1ZXN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFF1ZXN0ID0gbmV3IHNlbGVjdGVkUXVlc3QocXVlc3QuaWQsIHF1ZXN0LnByb2dyZXNzKTtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1F1ZXN0L3NldFF1ZXN0UmVxdWlyZW1lbnQnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5zZWxlY3RlZFF1ZXN0KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucXVlc3RzKCk7XHJcbiAgICB9XHJcbiAgICBhZGRSZXF1aXJlbWVudCgpIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVtZW50ID0gbmV3IHJlcXVpcmVtZW50KHRoaXMuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZW1lbnRzLnB1c2godGhpcy5yZXF1aXJlbWVudCk7XHJcbiAgICB9XHJcbiAgICBhZGRRdWVzdCgpIHtcclxuICAgICAgICB0aGlzLm5ld1F1ZXN0ID0gbmV3IG5ld1F1ZXN0KHRoaXMucmVxdWlyZW1lbnRzLCB0aGlzLm5hbWUsIHRoaXMucGxheWVyLklEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5ld1F1ZXN0KTtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1F1ZXN0L2FkZFF1ZXN0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMubmV3UXVlc3QpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXllciB7XHJcbiAgICBJRDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoSUQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuSUQgPSBJRDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHNlbGVjdGVkUXVlc3Qge1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIHByb2dyZXNzOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihJRDogc3RyaW5nLCBwcm9ncmVzczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5JRCA9IElEO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHJlcXVpcmVtZW50IHtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIG5ld1F1ZXN0IHtcclxuICAgIHJlcXVpcmVtZW50cztcclxuICAgIGRlc2NyaXB0aW9uO1xyXG4gICAgSUQ7XHJcbiAgICBjb25zdHJ1Y3RvcihyZXF1aXJlbWVudHMsIG5hbWUsIHVzZXJJRClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVtZW50cyA9IHJlcXVpcmVtZW50cztcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuSUQgPSB1c2VySUQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Register',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Register = (function () {
        function Register(auth, http) {
            this.auth = auth;
            this.http = http;
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
                    _this.response = data,
                        console.log(_this.response);
                });
                if (this.response == 'false') {
                    swal({
                        title: "U bent succesvol geregistreerd",
                        type: "success",
                        showCancelButton: true,
                        showConfirmButton: false,
                        closeOnConfirm: true
                    });
                }
                if (this.response == 'true') {
                    swal({
                        title: "Naam is al bezet",
                        type: "warning",
                        showCancelButton: true,
                        showConfirmButton: false,
                        closeOnConfirm: true
                    });
                }
            }
        };
        return Register;
    }());
    Register = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuXHJcbkBhdXRvaW5qZWN0XG5leHBvcnQgY2xhc3MgUmVnaXN0ZXIge1xyXG4gICAgbmFtZSA9IFwiXCI7XHJcbiAgICBwYXNzd29yZCA9IFwiXCI7XG4gICAgcGFzc3dvcmRDb25maXJtID0gXCJcIjtcclxuICAgIGNsYXNzSUQgPSBcIlwiO1xuICAgIHBsYXllcjtcbiAgICByZXNwb25zZTtcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICB9XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmQgIT0gdGhpcy5wYXNzd29yZENvbmZpcm0pIHtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVdyBpbmdldnVsZGUgd2FjaHR3b29yZGVuIHppam4gbmlldCBnZWxpamtcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMubmFtZSwgdGhpcy5wYXNzd29yZCwgdGhpcy5jbGFzc0lEKTtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICAgICAgYm9keToganNvbih0aGlzLnBsYXllcilcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSBkYXRhLFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXNwb25zZSA9PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVIGJlbnQgc3VjY2Vzdm9sIGdlcmVnaXN0cmVlcmRcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNlID09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5hYW0gaXMgYWwgYmV6ZXRcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XG5cclxuICAgIH1cblxuICAgLy8gbG9naW4oKSB7XHJcbiAgIC8vICAgICB0aGlzLmF1dGgubG9naW4oe1xyXG4gICAvLyAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgLy8gICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZFxyXG4gICAvLyAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgIC8vICAgICAgICAgc3dhbCh7XHJcbiAgIC8vICAgICAgICAgICAgIHRpdGxlOiBcIlUgYmVudCBzdWNjZXN2b2wgaW5nZWxvZ2RcIixcclxuICAgLy8gICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgIC8vICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgIC8vICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgLy8gICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgLy8gICAgICAgICB9KTtcclxuICAgLy8gICAgIH0pXHJcbiAgIC8vICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgIC8vICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAvLyAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5sb2dnZWdldmVucyB6aWpuIG9uanVpc3RcIixcclxuICAgLy8gICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAvLyAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgLy8gICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgLy8gICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXHJcbiAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAvLyAgICAgICAgIH0pO1xyXG4gICAvLyB9XHJcbn1cblxuZXhwb3J0IGNsYXNzIFBsYXllcntcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbiAgICBjbGFzc0lEOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLHBhc3N3b3JkOiBzdHJpbmcsIGNsYXNzSUQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgdGhpcy5jbGFzc0lEID0gY2xhc3NJRDtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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
            this.weaponsplayer = [];
            this.weapons();
        }
        Weapons.prototype.weapons = function () {
            var _this = this;
            this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
            return this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(this.player)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.weaponsplayer = data;
            });
        };
        Weapons.prototype.addWeapon = function () {
            this.newWeapon = new newWeapon(this.name, this.damage, this.minlevel, this.player.ID);
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
                cancelButtonText: 'Stop',
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
                        timer: 3000
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
    var Player = (function () {
        function Player(ID) {
            this.ID = ID;
        }
        return Player;
    }());
    exports.Player = Player;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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S0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FoRUEsQUFnRUMsSUFBQTtJQWhFWSxPQUFPO1FBRG5CLDhCQUFVO3lDQVNtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQVJ0RCxPQUFPLENBZ0VuQjtJQWhFWSwwQkFBTztJQWtFcEI7UUFFSSxnQkFBWSxFQUFVO1lBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSx3QkFBTTtJQU9uQjtRQUtJLG1CQUFZLElBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLFFBQVE7WUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSw4QkFBUztJQWF0QjtRQUtJLG9CQUFZLElBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSxnQ0FBVSIsImZpbGUiOiJjb21wb25lbnRzL1dlYXBvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5cclxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIFdlYXBvbnMge1xyXG4gICAgcGxheWVyO1xyXG4gICAgd2VhcG9uc3BsYXllciA9IFtdO1xyXG4gICAgbmFtZTtcclxuICAgIGRhbWFnZTtcclxuICAgIG1pbmxldmVsO1xyXG4gICAgbmV3V2VhcG9uO1xuICAgIGVkaXR3ZWFwb247XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgICAgICB0aGlzLndlYXBvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICB3ZWFwb25zKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZmV0Y2goJ1BsYXllci9nZXQnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5wbGF5ZXIpXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb25zcGxheWVyID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdlYXBvbigpIHtcclxuICAgICAgICB0aGlzLm5ld1dlYXBvbiA9IG5ldyBuZXdXZWFwb24odGhpcy5uYW1lLCB0aGlzLmRhbWFnZSwgdGhpcy5taW5sZXZlbCx0aGlzLnBsYXllci5JRCk7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdXZWFwb24vYWRkV2VhcG9uJywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMubmV3V2VhcG9uKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMud2VhcG9ucygpO1xyXG4gICAgfVxuXG4gICAgZWRpdFdlYXBvbih3ZWFwb24pIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZWRpdHdlYXBvbiA9IG5ldyBlZGl0V2VhcG9uKHRoaXMubmFtZSwgdGhpcy5kYW1hZ2UsIHRoaXMubWlubGV2ZWwsIHdlYXBvbi5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lZGl0d2VhcG9uKTtcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdXZWFwb24vZWRpdFdlYXBvbicsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLmVkaXR3ZWFwb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlV2VhcG9uKHdlYXBvbikge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1dlZXQgdSBoZXQgemVrZXI/JyxcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0phIHZlcndpamRlciBkZXplIHdhcGVuJyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1N0b3AnLFxyXG4gICAgICAgIH0sIChpc09rKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc09rKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1dlYXBvbi9kZWxldGVXZWFwb24nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToganNvbih3ZWFwb24pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9ucygpO1xyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdWZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnV2FwZW4gaXMgc3VjY2Vzdm9sIHZlcndpamRlcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXI6IDMwMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKElEOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBuZXdXZWFwb24ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGFtYWdlO1xyXG4gICAgbWlubGV2ZWw7XHJcbiAgICBwbGF5ZXJJRDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGFtYWdlLCBtaW5sZXZlbCxwbGF5ZXJJRCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5taW5sZXZlbCA9IG1pbmxldmVsO1xyXG4gICAgICAgIHRoaXMucGxheWVySUQgPSBwbGF5ZXJJRDtcclxuICAgIH1cclxufVxuXG5leHBvcnQgY2xhc3MgZWRpdFdlYXBvbiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkYW1hZ2U7XHJcbiAgICBtaW5sZXZlbDtcbiAgICBJRDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGFtYWdlLCBtaW5sZXZlbCxJRCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5taW5sZXZlbCA9IG1pbmxldmVsO1xuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxtQkFBMEIsTUFBOEI7SUFFeEQsQ0FBQztJQUZELDhCQUVDIiwiZmlsZSI6InJlc291cmNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24pIHtcclxuICAvL2NvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW10pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('text!app.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n\r\n          <a class=\"navbar-brand\">\r\n            DestinyFinder\r\n          </a>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li show.bind=\"!authenticated\">\r\n              <a route-href=\"route: Register\">Register</a>\r\n            </li>\r\n\r\n            <li show.bind=\"!authenticated\">\r\n              <a route-href=\"route: Login\">Login</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Character\">Character</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Weapons\">Weapons</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Quests\">Quests</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Bounties\">Bounties</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"#\" click.delegate=\"logout()\" show.bind=\"authenticated\">\r\n                Uitloggen\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <div class=\"container\">\r\n      <router-view></router-view>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Bounties.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Bounties.</h2>\r\n    <p>Hier ziet u een overzicht van al je Bounties.</p>\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Voeg Bounty toe</button>\r\n      <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Bounty's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"userEmail\">Locatie</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"location\" value=\"\" value.bind=\"location\" required>\r\n                <span class=\"help-block\">Vul de locatie van de Bounty in.</span>\r\n              </div>\r\n                  <div class=\"form-group\">\r\n                    <label for=\"password\">Omschrijving</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"description\" value=\"\" value.bind=\"description\" required>\r\n                    <span class=\"help-block\">vul de omschrijving in van de Bounty.</span>\r\n                  </div>\r\n            <div class=\"modal-footer\">\r\n              <button type=\"button\" class=\"btn btn-default\"  data-dismiss=\"modal\">Annuleren</button>\n              <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addBounty()\" data-dismiss=\"modal\">Toevoegen</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"container\">\r\n    </div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th>Locatie</th>\n          <th>Omschrijving</th>\r\n          <th>voortgang</th>\r\n          <th>opties</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr repeat.for=\"bounty of playerBounties.bounties\">\r\n          <td class=\"col-md-2\">\r\n            ${bounty.location}\r\n          </td>\n            <td class=\"col-md-8\">\n              ${bounty.description}\n          </td>\n          <td class=\"col-md-2\">\r\n            ${bounty.progress}\r\n          </td>\r\n          <td class=\"col-md-2\">\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"changeProgress(bounty)\">\r\n              <span class=\"glyphicon glyphicon-ok\"></span> Voltooien/Onvoltooien\r\n            </button>\n            <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"deleteBounty(bounty)\">\r\n              <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\n</div>\r\n</template>"; });
define('text!components/Character.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-2\">\r\n              <img src=\"${playerurl}\" alt=\"\" class=\"img-rounded img-responsive\" />\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <h2 class=\"glyphicon glyphicon-user\"> ${playerstats.name}\r\n              </h2>\n              <h4>${playerstats.classname}</h4>\r\n              <p>\r\n                <h4 class=\"glyphicon glyphicon-fire\"><b> Level: </b>${playerstats.level}</h4>\r\n                <br />\r\n                <h4 class=\"glyphicon glyphicon-heart\"><b> HP: </b>${playerstats.hp}</h4>\r\n                <br />\r\n                <h4 class=\"glyphicon glyphicon-flash\"><b> XP tot volgende level: </b>${playerstats.xpNextLevel}</h4>\r\n              </p>\n              <div class=\"container\">\r\n                <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Character aanpassen</button>\r\n                <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n                  <div class=\"modal-dialog\">\r\n                    <div class=\"modal-content\">\r\n                      <div class=\"modal-header\">\r\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                        <h4 class=\"modal-title\">Vul jouw Character gegevens in.</h4>\r\n                      </div>\r\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"class\">Class</label>\r\n                          <select id=\"class\" name=\"class\" class=\"form-control\" value.bind=\"className\" required>\r\n                            <option disabled selected value> -- Selecteer een class -- </option>\r\n                            <option>Hunter</option>\r\n                            <option>Titan</option>\r\n                            <option>Warlock</option>\r\n                          </select>\n                          <span class=\"help-block\">Verander de class om van uiterlijk te veranderen</span>\r\n                        </div>\r\n                        </div>\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"HP\">HP</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"HP\"  value.bind=\"HP\" required>\r\n                          <span class=\"help-block\">vul de HP in.</span>\r\n                        </div>\n                        </div>\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"level\">Level</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"level\"  value.bind=\"level\" required>\r\n                          <span class=\"help-block\">vul de level in.</span>\r\n                        </div>\r\n                      </div>\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"XP\">XP tot volgende level</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"XP\"  value.bind=\"XP\" required>\r\n                          <span class=\"help-block\">vul de XP tot volgende level in.</span>\r\n                        </div>\r\n                      </div>\r\n                            <div class=\"modal-footer\">\r\n                              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                              <button type=\"button\" class=\"btn btn-default\" click.delegate=\"updatePlayer()\" data-dismiss=\"modal\">Aanpassen</button>\r\n                            </div>\r\n                          </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\n               </div>\r\n              </div>\r\n          </div>\r\n        </div>\r\n</template>"; });
define('text!components/Login.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">Login op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"login()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" required=\"\" name=\"name\" value.bind=\"name\">\r\n              <span class=\"help-block\">Vul hier jouw gekozen naam in.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"modal-body\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" required=\"\" name=\"password\" value.bind=\"password\">\r\n                  <span class=\"help-block\">Vul jouw wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Quests.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Quests.</h2>\r\n    <p>Hier ziet u een overzicht van al je quests.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Voeg Quest toe</button>\r\n      <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Quest's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">Naam</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"name\" value=\"\" value.bind=\"name\" required>\r\n                <span class=\"help-block\">Vul de naam van de Quest in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <h4>Vul de QuestRequirement's gegevens in.</h4>\r\n                <label for=\"password\">Omschrijving</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"description\" value=\"\" value.bind=\"description\" required>\r\n                <span class=\"help-block\">Vul de omschrijving in van de Requirement.</span>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addRequirement()\">Voeg requirement toe.</button>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addQuest()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\">\r\n        <div class=\"row\" repeat.for=\"quest of playerQuests.quests\">\r\n          <div class=\"col\">\r\n            <h4><b>${quest.description} ${quest.progress}</b></h4>\r\n            <div class=\"col\" repeat.for=\"requirement of quest.requirements\">\r\n              ${requirement.description}\r\n              <b> ${requirement.progress}</b>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"changeProgress(requirement)\">\r\n                <span class=\"glyphicon glyphicon-ok\"></span> Voltooien/Onvoltooien\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Register.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">registreer op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"register()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" name=\"name\" value=\"\" value.bind=\"name\" required>\r\n              <span class=\"help-block\">Jouw naam wordt ook gebruikt bij het inloggen.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"password\" value=\"\" value.bind=\"password\" required>\r\n                  <span class=\"help-block\">Vul een wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"passwordr\">Herhaal Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"passwordr\" value.bind=\"passwordConfirm\" required>\r\n                  <span class=\"help-block\">Herhaal wachtwoord.</span>\r\n                </div>\r\n              </div>\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"Class\">Class</label>\r\n                  <select id=\"classID\" name=\"classID\" class=\"form-control\" value.bind=\"classID\" required>\r\n                    <option disabled selected value> -- Selecteer een Class -- </option>\r\n                    <option>Hunter</option>\r\n                    <option>Titan</option>\r\n                    <option>Warlock</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Weapons.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Wapens.</h2>\r\n    <p>Hier ziet u een overzicht van al je wapens.</p>\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#newWeapon\">Voeg Wapen toe</button>\r\n      <div class=\"modal fade\" id=\"newWeapon\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Wapen's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">naam</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"name\" value=\"\" value.bind=\"name\" required>\r\n                <span class=\"help-block\">Vul de naam in van de Wapen in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"damage\">damage</label>\r\n                <input type=\"number\" class=\"form-control\" name=\"damage\" value=\"\" value.bind=\"damage\" required>\r\n                <span class=\"help-block\">vul de damage in van de Wapen.</span>\r\n              </div>\n              <div class=\"form-group\">\r\n                <label for=\"password\">minlevel</label>\r\n                <input type=\"number\" class=\"form-control\" name=\"minlevel\" value=\"\" value.bind=\"minlevel\" required>\r\n                <span class=\"help-block\">vul de minimale level in van de Wapen.</span>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addWeapon()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\">\r\n      </div>\r\n      <table class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Naam</th>\r\n            <th>Damage</th>\r\n            <th>Minimale level</th>\r\n            <th>opties</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr repeat.for=\"weapon of weaponsplayer.weapons\">\r\n            <td class=\"col-md-4\">\r\n              ${weapon.name}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              ${weapon.damage}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              ${weapon.minLevel}\r\n            </td>\r\n            <td class=\"col-md-4\">\n              <button type=\"button\" class=\"btn btn-default btn-sm\" data-toggle=\"modal\" data-target=\"#editWeapon\">\n                <span class=\"glyphicon glyphicon-edit\"></span> aanpassen\n              </button>\r\n              <div class=\"modal fade\" id=\"editWeapon\" role=\"dialog\">\r\n                <div class=\"modal-dialog\">\r\n                  <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n                      <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                      <h4 class=\"modal-title\">Vul de Wapen's gegevens in.</h4>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"name\">naam</label>\r\n                        <input type=\"text\" class=\"form-control\" name=\"name\" value=\"\" value.bind=\"name\" required>\r\n                        <span class=\"help-block\">Vul de naam in van de Wapen in.</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"damage\">damage</label>\r\n                        <input type=\"number\" class=\"form-control\" name=\"damage\" value=\"\" value.bind=\"damage\" required>\r\n                        <span class=\"help-block\">vul de damage in van de Wapen.</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"password\">minlevel</label>\r\n                        <input type=\"number\" class=\"form-control\" name=\"minlevel\" value=\"\" value.bind=\"minlevel\" required>\r\n                        <span class=\"help-block\">vul de minimale level in van de Wapen.</span>\r\n                      </div>\r\n                      <div class=\"modal-footer\">\r\n                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                        <button type=\"button\" class=\"btn btn-default\" click.delegate=\"editWeapon(weapon)\" data-dismiss=\"modal\">Aanpassen</button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"deleteWeapon(weapon)\">\r\n                <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n              </button>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\n   </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map