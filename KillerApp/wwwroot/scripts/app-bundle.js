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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUc7UUFEZiw4QkFBVTt5Q0FLbUIsaUNBQVUsRUFBa0Isb0NBQVcsRUFBdUIsb0NBQVcsRUFBaUIsMENBQWU7T0FKMUgsR0FBRyxDQThFZjtJQTlFWSxrQkFBRztJQWlGaEIsSUFBTSxhQUFhO1FBQ2YsdUJBQW9CLFdBQXdCO1lBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQUksQ0FBQztRQUVqRCwyQkFBRyxHQUFILFVBQUkscUJBQTRDLEVBQUUsSUFBVTtZQUN4RCxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFiLENBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFFcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUkseUJBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQWRLLGFBQWE7UUFEbEIsOEJBQVU7eUNBRTBCLG9DQUFXO09BRDFDLGFBQWEsQ0FjbEIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJDb25maWd1cmF0aW9uLCBOZXh0LCBSZWRpcmVjdCwgTmF2aWdhdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBGZXRjaENvbmZpZyB9IGZyb20gJ2F1cmVsaWEtYXV0aGVudGljYXRpb24nO1xyXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgQXBwIHtcclxuICAgIHJvdXRlcjogUm91dGVyO1xyXG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgY29uZmlnOiBGZXRjaENvbmZpZywgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnSHR0cCgpO1xyXG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZDtcclxuICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGp3dF9kZWNvZGUodGhpcy5hdXRoU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cblxuICAgIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnQuc3Vic2NyaWJlKCdzaWduZWRJbicsIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHJlc3BvbnNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFwibG9naW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQmVkYW5rdCB2b29yIHV3IGJlem9la1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lcjogMjAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG5cclxuICAgICAgICBsZXQgc3RlcCA9IG5ldyBBdXRob3JpemVTdGVwKHRoaXMuYXV0aFNlcnZpY2UpO1xyXG4gICAgICAgIGNvbmZpZy5hZGRBdXRob3JpemVTdGVwKHN0ZXApO1xyXG5cclxuICAgICAgICBjb25maWcudGl0bGUgPSAnQXVyZWxpYSc7XHJcbiAgICAgICAgY29uZmlnLm1hcChbXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdDaGFyYWN0ZXInXSwgbmFtZTogJ0NoYXJhY3RlcicsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9DaGFyYWN0ZXInLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdXZWFwb25zJ10sIG5hbWU6ICdXZWFwb25zJywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL1dlYXBvbnMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdRdWVzdHMnXSwgbmFtZTogJ1F1ZXN0cycsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9RdWVzdHMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdCb3VudGllcyddLCBuYW1lOiAnQm91bnRpZXMnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvQm91bnRpZXMnLCBhdXRoOiB0cnVlIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnRmlnaHQnXSwgbmFtZTogJ0ZpZ2h0JywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL0ZpZ2h0JywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnUmVnaXN0ZXInXSwgbmFtZTogJ1JlZ2lzdGVyJywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL1JlZ2lzdGVyJyB9LFxuICAgICAgICAgICAgeyByb3V0ZTogWycvJywgJ0xvZ2luJ10sIG5hbWU6ICdMb2dpbicsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9Mb2dpbicgfVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZ0h0dHAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5odHRwLmNvbmZpZ3VyZShjb25maWcgPT4ge1xyXG4gICAgICAgICAgICBjb25maWdcclxuICAgICAgICAgICAgICAgIC53aXRoQmFzZVVybCgnYXBpLycpXHJcbiAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnRmV0Y2gnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YVR5cGUnOiAnanNvbidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZXF1ZXN0aW5nICR7cmVxdWVzdC5tZXRob2R9ICR7cmVxdWVzdC51cmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UocmVzcG9uc2U6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlZCAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS51cmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcuY29uZmlndXJlKHRoaXMuaHR0cCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBhdXRvaW5qZWN0XHJcbmNsYXNzIEF1dGhvcml6ZVN0ZXAge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIHJ1bihuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb246IE5hdmlnYXRpb25JbnN0cnVjdGlvbiwgbmV4dDogTmV4dCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5nZXRBbGxJbnN0cnVjdGlvbnMoKS5zb21lKGkgPT4gaS5jb25maWcuYXV0aCkpIHtcclxuICAgICAgICAgICAgbGV0IGlzTG9nZ2VkSW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0xvZ2dlZEluKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KCdsb2dpbicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcclxuICAgIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQm91bnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxRQUFRO1FBTWpCLGtCQUFvQixJQUFpQixFQUFVLElBQWdCO1lBQTNDLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQzNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUYsMkJBQVEsR0FBUjtZQUFBLGlCQVFDO1lBUEksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDMUIsSUFBSSxFQUFFLDJCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDL0IsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNaLENBQUM7UUFFRCxpQ0FBYyxHQUFkLFVBQWUsTUFBTTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtnQkFDaEMsSUFBSSxFQUFFLDJCQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3JCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QsNEJBQVMsR0FBVDtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ2hDLElBQUksRUFBRSwyQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDN0IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRCwrQkFBWSxHQUFaLFVBQWEsTUFBTTtZQUFuQixpQkFzQkM7WUFyQkcsSUFBSSxDQUFDO2dCQUNELEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLElBQUksRUFBRSxTQUFTO2dCQUNmLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLGlCQUFpQixFQUFFLDBCQUEwQjtnQkFDN0MsZ0JBQWdCLEVBQUUsTUFBTTthQUMzQixFQUFFLFVBQUMsSUFBSTtnQkFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFO3dCQUNuQyxJQUFJLEVBQUUsMkJBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ3JCLENBQUMsQ0FBQztvQkFDSCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQzt3QkFDRCxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsSUFBSSxFQUFFLGdDQUFnQzt3QkFDdEMsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsaUJBQWlCLEVBQUUsS0FBSzt3QkFDeEIsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFSixlQUFDO0lBQUQsQ0ExREEsQUEwREMsSUFBQTtJQTFEWSxRQUFRO1FBRHBCLDhCQUFVO3lDQU9tQixvQ0FBVyxFQUFnQixpQ0FBVTtPQU50RCxRQUFRLENBMERwQjtJQTFEWSw0QkFBUTtJQTREckI7UUFFSSxnQkFBWSxFQUFVO1lBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSx3QkFBTTtJQU9uQjtRQUlJLG1CQUFZLFFBQWdCLEVBQUUsV0FBbUIsRUFBQyxRQUFRO1lBRXRELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFDTCxnQkFBQztJQUFELENBVkEsQUFVQyxJQUFBO0lBVlksOEJBQVMiLCJmaWxlIjoiY29tcG9uZW50cy9Cb3VudGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgQm91bnRpZXMge1xyXG4gICAgcGxheWVyO1xyXG4gICAgcGxheWVyQm91bnRpZXM7XHJcbiAgICBsb2NhdGlvbjtcclxuICAgIGRlc2NyaXB0aW9uO1xyXG4gICAgbmV3Ym91bnR5O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5ib3VudGllcygpO1xyXG4gICAgfVxyXG5cclxuICAgYm91bnRpZXMoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCk7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucGxheWVyKVxyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQm91bnRpZXMgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgfVxyXG5cclxuICAgY2hhbmdlUHJvZ3Jlc3MoYm91bnR5KSB7XHJcbiAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ0JvdW50eS9zZXRCb3VudHknLCB7XHJcbiAgICAgICAgICAgYm9keToganNvbihib3VudHkpXHJcbiAgICAgICB9KTtcclxuICAgICAgIHRoaXMuYm91bnRpZXMoKTtcclxuICAgfVxyXG4gICBhZGRCb3VudHkoKSB7XHJcbiAgICAgICB0aGlzLm5ld2JvdW50eSA9IG5ldyBuZXdCb3VudHkodGhpcy5sb2NhdGlvbiwgdGhpcy5kZXNjcmlwdGlvbiwgdGhpcy5wbGF5ZXIuSUQpO1xyXG4gICAgICAgdGhpcy5odHRwLmZldGNoKCdCb3VudHkvYWRkQm91bnR5Jywge1xyXG4gICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5uZXdib3VudHkpXHJcbiAgICAgICB9KTtcclxuICAgICAgIHRoaXMuYm91bnRpZXMoKTtcclxuICAgfVxyXG5cclxuICAgZGVsZXRlQm91bnR5KGJvdW50eSkge1xuICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgIHRpdGxlOiAnV2VldCB1IGhldCB6ZWtlcj8nLFxyXG4gICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnSmEgdmVyd2lqZGVyIGRlemUgQm91bnR5JyxcclxuICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnU3RvcCcsXHJcbiAgICAgICB9LCAoaXNPaykgPT4ge1xyXG4gICAgICAgICAgIGlmIChpc09rKSB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnQm91bnR5L2RlbGV0ZUJvdW50eScsIHtcclxuICAgICAgICAgICAgICAgICAgIGJvZHk6IGpzb24oYm91bnR5KVxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgdGhpcy5ib3VudGllcygpO1xyXG4gICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnVmVyd2lqZGVyZCcsXHJcbiAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQm91bnR5IGlzIHN1Y2Nlc3ZvbCB2ZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgIHRpbWVyOiAzMDAwXHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pO1xyXG4gICB9XHJcbiAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcclxuICAgIElEOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5JRCA9IElEO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgbmV3Qm91bnR5IHtcclxuICAgIGxvY2F0aW9uOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgcGxheWVySUQ7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLHBsYXllcklEKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJRCA9IHBsYXllcklEO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUM7WUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FkQSxBQWNDLElBQUE7SUFkWSxvQ0FBWSIsImZpbGUiOiJjb21wb25lbnRzL0NoYXJhY3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgQ2hhcmFjdGVyIHtcclxuICAgIHBsYXllcjtcclxuICAgIHBsYXllcnN0YXRzO1xyXG4gICAgcGxheWVydXJsID0gXCIvSW1hZ2VzL1dhcmxvY2sucG5nXCI7XHJcbiAgICB1cGRhdGVkUGxheWVyO1xyXG4gICAgY2xhc3NOYW1lO1xyXG4gICAgSFA7XHJcbiAgICBsZXZlbDtcclxuICAgIFhQO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuc3RhdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0cygpIHtcclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoand0X2RlY29kZSh0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW4oKSkudXNlcmlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucGxheWVyKVxyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzdGF0cyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEltYWdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0SW1hZ2UoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnBsYXllcnN0YXRzLmNsYXNzSUQpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJ1cmwgPSBcIi9pbWFnZXMvaHVudGVyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL3RpdGFuLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL3dhcmxvY2sucG5nXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhazsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVBsYXllcigpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZWRQbGF5ZXIgPSBuZXcgVXBkYXRlUGxheWVyKHRoaXMucGxheWVyLklELCB0aGlzLmNsYXNzTmFtZSwgdGhpcy5IUCwgdGhpcy5sZXZlbCwgdGhpcy5YUCk7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvdXBkYXRlJywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMudXBkYXRlZFBsYXllcilcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0YXRzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKElEOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVcGRhdGVQbGF5ZXIge1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIGNsYXNzTmFtZTogc3RyaW5nO1xyXG4gICAgSFA7XHJcbiAgICBsZXZlbDtcclxuICAgIFhQO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKElEOiBzdHJpbmcsIGNsYXNzTmFtZSxIUCxsZXZlbCxYUCkge1xyXG4gICAgICAgIHRoaXMuSUQgPSBJRDtcclxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICB0aGlzLkhQID0gSFA7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xyXG4gICAgICAgIHRoaXMuWFAgPSBYUDtcclxuICAgIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('components/Fight',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fight = (function () {
        function fight() {
        }
        return fight;
    }());
    exports.fight = fight;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvRmlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7UUFBQTtRQUVBLENBQUM7UUFBRCxZQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFGWSxzQkFBSyIsImZpbGUiOiJjb21wb25lbnRzL0ZpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIGZpZ2h0IHtcblxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQSxJQUFhLEtBQUs7UUFLZCxlQUFvQixJQUFpQixFQUFVLElBQWdCLEVBQVUsS0FBc0IsRUFBVSxNQUFjO1lBQW5HLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBSHZILFNBQUksR0FBRyxFQUFFLENBQUM7WUFDVixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsQ0FBQztRQUVELHFCQUFLLEdBQUw7WUFBQSxpQkEwQkM7WUF6QkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDWixLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsMkJBQTJCO29CQUNsQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixjQUFjLEVBQUUsSUFBSTtpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXRDLENBQUMsQ0FBQztpQkFDRyxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNOLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsNEJBQTRCO29CQUNuQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixjQUFjLEVBQUUsSUFBSTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsc0JBQU0sR0FBTjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFFSyxvQkFBSSxHQUFWOzs7Ozs7U0FFQztRQUNMLFlBQUM7SUFBRCxDQTNDQSxBQTJDQyxJQUFBO0lBM0NZLEtBQUs7UUFEakIsOEJBQVU7eUNBTW1CLG9DQUFXLEVBQWdCLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWtCLHVCQUFNO09BTDlHLEtBQUssQ0EyQ2pCO0lBM0NZLHNCQUFLIiwiZmlsZSI6ImNvbXBvbmVudHMvTG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBMb2dpbiB7XHJcblxyXG4gICAgbmFtZSA9IFwiXCI7XHJcbiAgICBwYXNzd29yZCA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLmF1dGgubG9naW4oe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50LnB1Ymxpc2goJ3NpZ25lZEluJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiVSBiZW50IHN1Y2Nlc3ZvbCBpbmdlbG9nZFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFwiQ2hhcmFjdGVyXCIpO1xuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmxvZ2dlZ2V2ZW5zIHppam4gb25qdWlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIHRoaXMuYXV0aC5sb2dvdXQoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHRlc3QoKSB7XHJcblxyXG4gICAgfVxyXG59ICJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFZLFdBQW1CO1lBRTNCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25DLENBQUM7UUFDTCxrQkFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBTlksa0NBQVc7SUFReEI7UUFJSSxrQkFBWSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU07WUFFbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDckIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLDRCQUFRIiwiZmlsZSI6ImNvbXBvbmVudHMvUXVlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBRdWVzdCB7XHJcbiAgICBwbGF5ZXI7XHJcbiAgICBwbGF5ZXJRdWVzdHM7XHJcbiAgICBzZWxlY3RlZFF1ZXN0O1xuICAgIG5hbWU7XG4gICAgZGVzY3JpcHRpb247XG4gICAgcmVxdWlyZW1lbnRzID0gW107XG4gICAgcmVxdWlyZW1lbnQ7XG4gICAgbmV3UXVlc3Q7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHF1ZXN0cygpIHtcclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoand0X2RlY29kZSh0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW4oKSkudXNlcmlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucGxheWVyKVxyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyUXVlc3RzID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUHJvZ3Jlc3MocXVlc3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUXVlc3QgPSBuZXcgc2VsZWN0ZWRRdWVzdChxdWVzdC5pZCwgcXVlc3QucHJvZ3Jlc3MpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUXVlc3Qvc2V0UXVlc3RSZXF1aXJlbWVudCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLnNlbGVjdGVkUXVlc3QpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgIH1cbiAgICBhZGRSZXF1aXJlbWVudCgpIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlbWVudCA9IG5ldyByZXF1aXJlbWVudCh0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5yZXF1aXJlbWVudHMucHVzaCh0aGlzLnJlcXVpcmVtZW50KTtcclxuICAgIH1cbiAgICBhZGRRdWVzdCgpIHtcbiAgICAgICAgdGhpcy5uZXdRdWVzdCA9IG5ldyBuZXdRdWVzdCh0aGlzLnJlcXVpcmVtZW50cywgdGhpcy5uYW1lLCB0aGlzLnBsYXllci5JRCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmV3UXVlc3QpO1xuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1F1ZXN0L2FkZFF1ZXN0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMubmV3UXVlc3QpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXllciB7XHJcbiAgICBJRDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoSUQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuSUQgPSBJRDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHNlbGVjdGVkUXVlc3Qge1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIHByb2dyZXNzOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihJRDogc3RyaW5nLCBwcm9ncmVzczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5JRCA9IElEO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgIH1cclxufVxuXG5leHBvcnQgY2xhc3MgcmVxdWlyZW1lbnQge1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxufVxuXG5leHBvcnQgY2xhc3MgbmV3UXVlc3Qge1xuICAgIHJlcXVpcmVtZW50cztcbiAgICBkZXNjcmlwdGlvbjtcbiAgICBJRDtcbiAgICBjb25zdHJ1Y3RvcihyZXF1aXJlbWVudHMsIG5hbWUsIHVzZXJJRClcbiAgICB7XG4gICAgICAgIHRoaXMucmVxdWlyZW1lbnRzID0gcmVxdWlyZW1lbnRzO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uPSBuYW1lO1xuICAgICAgICB0aGlzLklEID0gdXNlcklEO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlciB7XHJcbiAgICBuYW1lID0gXCJcIjtcclxuICAgIHBhc3N3b3JkID0gXCJcIjtcclxuICAgIHBhc3N3b3JkQ29uZmlybSA9IFwiXCI7XHJcbiAgICBjbGFzc0lEID0gXCJcIjtcclxuICAgIHBsYXllcjtcclxuICAgIHJlc3BvbnNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhc3N3b3JkICE9IHRoaXMucGFzc3dvcmRDb25maXJtKSB7XHJcbiAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiVXcgaW5nZXZ1bGRlIHdhY2h0d29vcmRlbiB6aWpuIG5pZXQgZ2VsaWprXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLm5hbWUsIHRoaXMucGFzc3dvcmQsIHRoaXMuY2xhc3NJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICAgICAgYm9keToganNvbih0aGlzLnBsYXllcilcclxuICAgICAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSBkYXRhLFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzcG9uc2UgPT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVSBiZW50IHN1Y2Nlc3ZvbCBnZXJlZ2lzdHJlZXJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNlID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmFhbSBpcyBhbCBiZXpldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAvLyBsb2dpbigpIHtcclxuICAgLy8gICAgIHRoaXMuYXV0aC5sb2dpbih7XHJcbiAgIC8vICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAvLyAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXHJcbiAgIC8vICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgLy8gICAgICAgICBzd2FsKHtcclxuICAgLy8gICAgICAgICAgICAgdGl0bGU6IFwiVSBiZW50IHN1Y2Nlc3ZvbCBpbmdlbG9nZFwiLFxyXG4gICAvLyAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgLy8gICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgLy8gICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAvLyAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZVxyXG4gICAvLyAgICAgICAgIH0pO1xyXG4gICAvLyAgICAgfSlcclxuICAgLy8gICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgLy8gICAgICAgICAgICAgc3dhbCh7XHJcbiAgIC8vICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmxvZ2dlZ2V2ZW5zIHppam4gb25qdWlzdFwiLFxyXG4gICAvLyAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgIC8vICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAvLyAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAvLyAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgIC8vICAgICAgICAgfSk7XHJcbiAgIC8vIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXllcntcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBjbGFzc0lEOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcscGFzc3dvcmQ6IHN0cmluZywgY2xhc3NJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5jbGFzc0lEID0gY2xhc3NJRDtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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S0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FoRUEsQUFnRUMsSUFBQTtJQWhFWSxPQUFPO1FBRG5CLDhCQUFVO3lDQVNtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQVJ0RCxPQUFPLENBZ0VuQjtJQWhFWSwwQkFBTztJQWtFcEI7UUFFSSxnQkFBWSxFQUFVO1lBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSx3QkFBTTtJQU9uQjtRQUtJLG1CQUFZLElBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLFFBQVE7WUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSw4QkFBUztJQWF0QjtRQUtJLG9CQUFZLElBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSxnQ0FBVSIsImZpbGUiOiJjb21wb25lbnRzL1dlYXBvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5cclxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIFdlYXBvbnMge1xyXG4gICAgcGxheWVyO1xyXG4gICAgd2VhcG9uc3BsYXllciA9IFtdO1xyXG4gICAgbmFtZTtcclxuICAgIGRhbWFnZTtcclxuICAgIG1pbmxldmVsO1xyXG4gICAgbmV3V2VhcG9uO1xyXG4gICAgZWRpdHdlYXBvbjtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMud2VhcG9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHdlYXBvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL2dldCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLnBsYXllcilcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbnNwbGF5ZXIgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2VhcG9uKCkge1xyXG4gICAgICAgIHRoaXMubmV3V2VhcG9uID0gbmV3IG5ld1dlYXBvbih0aGlzLm5hbWUsIHRoaXMuZGFtYWdlLCB0aGlzLm1pbmxldmVsLHRoaXMucGxheWVyLklEKTtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1dlYXBvbi9hZGRXZWFwb24nLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5uZXdXZWFwb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFdlYXBvbih3ZWFwb24pIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmVkaXR3ZWFwb24gPSBuZXcgZWRpdFdlYXBvbih0aGlzLm5hbWUsIHRoaXMuZGFtYWdlLCB0aGlzLm1pbmxldmVsLCB3ZWFwb24uaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdHdlYXBvbik7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdXZWFwb24vZWRpdFdlYXBvbicsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLmVkaXR3ZWFwb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlV2VhcG9uKHdlYXBvbikge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1dlZXQgdSBoZXQgemVrZXI/JyxcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0phIHZlcndpamRlciBkZXplIHdhcGVuJyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1N0b3AnLFxyXG4gICAgICAgIH0sIChpc09rKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc09rKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1dlYXBvbi9kZWxldGVXZWFwb24nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToganNvbih3ZWFwb24pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9ucygpO1xyXG4gICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdWZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnV2FwZW4gaXMgc3VjY2Vzdm9sIHZlcndpamRlcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXI6IDMwMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKElEOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBuZXdXZWFwb24ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGFtYWdlO1xyXG4gICAgbWlubGV2ZWw7XHJcbiAgICBwbGF5ZXJJRDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGFtYWdlLCBtaW5sZXZlbCxwbGF5ZXJJRCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5taW5sZXZlbCA9IG1pbmxldmVsO1xyXG4gICAgICAgIHRoaXMucGxheWVySUQgPSBwbGF5ZXJJRDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGVkaXRXZWFwb24ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGFtYWdlO1xyXG4gICAgbWlubGV2ZWw7XHJcbiAgICBJRDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGFtYWdlLCBtaW5sZXZlbCxJRCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5taW5sZXZlbCA9IG1pbmxldmVsO1xyXG4gICAgICAgIHRoaXMuSUQgPSBJRDtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxtQkFBMEIsTUFBOEI7SUFFeEQsQ0FBQztJQUZELDhCQUVDIiwiZmlsZSI6InJlc291cmNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24pIHtcclxuICAvL2NvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW10pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('text!app.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n\r\n          <a class=\"navbar-brand\">\r\n            DestinyFinder\r\n          </a>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li show.bind=\"!authenticated\">\r\n              <a route-href=\"route: Register\">Register</a>\r\n            </li>\r\n\r\n            <li show.bind=\"!authenticated\">\r\n              <a route-href=\"route: Login\">Login</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Character\">Character</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Weapons\">Weapons</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Quests\">Quests</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Bounties\">Bounties</a>\r\n            </li>\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Fight\">Fight</a>\r\n            </li>\n            <li>\r\n              <a href=\"#\" click.delegate=\"logout()\" show.bind=\"authenticated\">\r\n                Uitloggen\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <div class=\"container\">\r\n      <router-view></router-view>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Bounties.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Bounties.</h2>\r\n    <p>Hier ziet u een overzicht van al je Bounties.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Voeg Bounty toe</button>\r\n      <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Bounty's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"userEmail\">Locatie</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"location\"  value.bind=\"location\" required>\r\n                <span class=\"help-block\">Vul de locatie van de Bounty in.</span>\r\n              </div>\r\n                  <div class=\"form-group\">\r\n                    <label for=\"password\">Omschrijving</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"description\"  value.bind=\"description\" required>\r\n                    <span class=\"help-block\">vul de omschrijving in van de Bounty.</span>\r\n                  </div>\r\n            <div class=\"modal-footer\">\r\n              <button type=\"button\" class=\"btn btn-default\"  data-dismiss=\"modal\">Annuleren</button>\r\n              <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addBounty()\" data-dismiss=\"modal\">Toevoegen</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"container\">\r\n    </div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th>Locatie</th>\r\n          <th>Omschrijving</th>\r\n          <th>voortgang</th>\r\n          <th>opties</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr repeat.for=\"bounty of playerBounties.bounties\">\r\n          <td class=\"col-md-2\">\r\n            ${bounty.location}\r\n          </td>\r\n            <td class=\"col-md-8\">\r\n              ${bounty.description}\r\n          </td>\r\n          <td class=\"col-md-2\">\r\n            ${bounty.progress}\r\n          </td>\r\n          <td class=\"col-md-2\">\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"changeProgress(bounty)\">\r\n              <span class=\"glyphicon glyphicon-ok\"></span> Voltooien/Onvoltooien\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"deleteBounty(bounty)\">\r\n              <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n</template>"; });
define('text!components/Character.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-2\">\r\n              <img src=\"${playerurl}\" alt=\"\" class=\"img-rounded img-responsive\" />\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <h2 class=\"glyphicon glyphicon-user\"> ${playerstats.name}\r\n              </h2>\r\n              <h4>${playerstats.classname}</h4>\r\n              <p>\r\n                <h4 class=\"glyphicon glyphicon-fire\"><b> Level: </b>${playerstats.level}</h4>\r\n                <br />\r\n                <h4 class=\"glyphicon glyphicon-heart\"><b> HP: </b>${playerstats.hp}</h4>\r\n                <br />\r\n                <h4 class=\"glyphicon glyphicon-flash\"><b> XP tot volgende level: </b>${playerstats.xpNextLevel}</h4>\r\n              </p>\r\n              <div class=\"container\">\r\n                <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Character aanpassen</button>\r\n                <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n                  <div class=\"modal-dialog\">\r\n                    <div class=\"modal-content\">\r\n                      <div class=\"modal-header\">\r\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                        <h4 class=\"modal-title\">Vul jouw Character gegevens in.</h4>\r\n                      </div>\r\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"class\">Class</label>\r\n                          <select id=\"class\" name=\"class\" class=\"form-control\" value.bind=\"className\" required>\r\n                            <option disabled selected value> -- Selecteer een class -- </option>\r\n                            <option>Hunter</option>\r\n                            <option>Titan</option>\r\n                            <option>Warlock</option>\r\n                          </select>\r\n                          <span class=\"help-block\">Verander de class om van uiterlijk te veranderen</span>\r\n                        </div>\r\n                        </div>\r\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"HP\">HP</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"HP\"  value.bind=\"HP\" required>\r\n                          <span class=\"help-block\">vul de HP in.</span>\r\n                        </div>\r\n                        </div>\r\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"level\">Level</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"level\"  value.bind=\"level\" required>\r\n                          <span class=\"help-block\">vul de level in.</span>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"modal-body\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"XP\">XP tot volgende level</label>\r\n                          <input type=\"number\" class=\"form-control\" name=\"XP\"  value.bind=\"XP\" required>\r\n                          <span class=\"help-block\">vul de XP tot volgende level in.</span>\r\n                        </div>\r\n                      </div>\r\n                            <div class=\"modal-footer\">\r\n                              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                              <button type=\"button\" class=\"btn btn-default\" click.delegate=\"updatePlayer()\" data-dismiss=\"modal\">Aanpassen</button>\r\n                            </div>\r\n                          </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n               </div>\r\n              </div>\r\n          </div>\r\n        </div>\r\n</template>"; });
define('text!components/Fight.html', ['module'], function(module) { module.exports = "<template>\n  Fight....\n</template>"; });
define('text!components/Login.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">Login op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"login()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" required name=\"name\" value.bind=\"name\">\r\n              <span class=\"help-block\">Vul hier jouw gekozen naam in.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"modal-body\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" required name=\"password\" value.bind=\"password\">\r\n                  <span class=\"help-block\">Vul jouw wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Quests.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Quests.</h2>\r\n    <p>Hier ziet u een overzicht van al je quests.</p>\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Voeg Quest toe</button>\r\n      <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Quest's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">Naam</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"name\"  value.bind=\"name\" required>\r\n                <span class=\"help-block\">Vul de naam van de Quest in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\n                <h4>Vul de QuestRequirement's gegevens in.</h4>\r\n                <label for=\"password\">Omschrijving</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"description\"  value.bind=\"description\" required>\r\n                <span class=\"help-block\">Vul de omschrijving in van de Requirement.</span>\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addRequirement()\">Voeg requirement toe.</button>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addQuest()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\">\r\n        <div class=\"row\" repeat.for=\"quest of playerQuests.quests\">\r\n          <div class=\"col\">\r\n            <h4><b>${quest.description} ${quest.progress}</b></h4>\r\n            <div class=\"col\" repeat.for=\"requirement of quest.requirements\">\r\n              ${requirement.description}\r\n              <b> ${requirement.progress}</b>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"changeProgress(requirement)\">\r\n                <span class=\"glyphicon glyphicon-ok\"></span> Voltooien/Onvoltooien\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\n  </div>\r\n</template>"; });
define('text!components/Register.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">registreer op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"register()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" name=\"name\"  value.bind=\"name\" required>\r\n              <span class=\"help-block\">Jouw naam wordt ook gebruikt bij het inloggen.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"password\"  value.bind=\"password\" required>\r\n                  <span class=\"help-block\">Vul een wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"passwordr\">Herhaal Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"passwordr\" value.bind=\"passwordConfirm\" required>\r\n                  <span class=\"help-block\">Herhaal wachtwoord.</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"Class\">Class</label>\r\n                  <select id=\"classID\" name=\"classID\" class=\"form-control\" value.bind=\"classID\" required>\r\n                    <option disabled selected value> -- Selecteer een Class -- </option>\r\n                    <option>Hunter</option>\r\n                    <option>Titan</option>\r\n                    <option>Warlock</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Weapons.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Wapens.</h2>\r\n    <p>Hier ziet u een overzicht van al je wapens.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#newWeapon\">Voeg Wapen toe</button>\r\n      <div class=\"modal fade\" id=\"newWeapon\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Wapen's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">naam</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"name\" value.bind=\"name\" required>\r\n                <span class=\"help-block\">Vul de naam in van de Wapen in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"damage\">damage</label>\r\n                <input type=\"number\" class=\"form-control\" name=\"damage\"  value.bind=\"damage\" required>\r\n                <span class=\"help-block\">vul de damage in van de Wapen.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"password\">minlevel</label>\r\n                <input type=\"number\" class=\"form-control\" name=\"minlevel\" value.bind=\"minlevel\" required>\r\n                <span class=\"help-block\">vul de minimale level in van de Wapen.</span>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addWeapon()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\">\r\n      </div>\r\n      <table class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Naam</th>\r\n            <th>Damage</th>\r\n            <th>Minimale level</th>\r\n            <th>opties</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr repeat.for=\"weapon of weaponsplayer.weapons\">\r\n            <td class=\"col-md-4\">\r\n              ${weapon.name}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              ${weapon.damage}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              ${weapon.minLevel}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" data-toggle=\"modal\" data-target=\"#editWeapon\">\r\n                <span class=\"glyphicon glyphicon-edit\"></span> aanpassen\r\n              </button>\r\n              <div class=\"modal fade\" id=\"editWeapon\" role=\"dialog\">\r\n                <div class=\"modal-dialog\">\r\n                  <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n                      <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                      <h4 class=\"modal-title\">Vul de Wapen's gegevens in.</h4>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"name\">naam</label>\r\n                        <input type=\"text\" class=\"form-control\" name=\"name\"  value.bind=\"name\" required>\r\n                        <span class=\"help-block\">Vul de naam in van de Wapen in.</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"damage\">damage</label>\r\n                        <input type=\"number\" class=\"form-control\" name=\"damage\" value.bind=\"damage\" required>\r\n                        <span class=\"help-block\">vul de damage in van de Wapen.</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"password\">minlevel</label>\r\n                        <input type=\"number\" class=\"form-control\" name=\"minlevel\"  value.bind=\"minlevel\" required>\r\n                        <span class=\"help-block\">vul de minimale level in van de Wapen.</span>\r\n                      </div>\r\n                      <div class=\"modal-footer\">\r\n                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                        <button type=\"button\" class=\"btn btn-default\" click.delegate=\"editWeapon(weapon)\" data-dismiss=\"modal\">Aanpassen</button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"deleteWeapon(weapon)\">\r\n                <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n              </button>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n   </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map