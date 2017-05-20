var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(http, config, authService) {
            this.http = http;
            this.config = config;
            this.authService = authService;
            this.configHttp();
            this.authenticated = this.authService.authenticated;
            if (this.authenticated) {
                alert(jwt_decode(this.authService.getAccessToken()).userid);
            }
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'Aurelia';
            config.map([
                { route: ['/', 'Login'], name: 'Login', moduleId: 'components/Login' },
                { route: ['/', 'Character'], name: 'Character', moduleId: 'components/Character', auth: true },
                { route: ['/', 'Weapons'], name: 'Weapons', moduleId: 'components/Weapons', auth: true },
                { route: ['/', 'Quests'], name: 'Quests', moduleId: 'components/Quests', auth: true },
                { route: ['/', 'Bounties'], name: 'Bounties', moduleId: 'components/Bounties', auth: true },
                { route: ['/', 'Register'], name: 'Register', moduleId: 'components/Register' },
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
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_authentication_1.FetchConfig, aurelia_authentication_1.AuthService])
    ], App);
    exports.App = App;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUNKLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDTCxVQUFDO0lBQUQsQ0F6REEsQUF5REMsSUFBQTtJQXpEWSxHQUFHO1FBRGYsOEJBQVU7eUNBS21CLGlDQUFVLEVBQWtCLG9DQUFXLEVBQXVCLG9DQUFXO09BSjFGLEdBQUcsQ0F5RGY7SUF6RFksa0JBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJDb25maWd1cmF0aW9uIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBGZXRjaENvbmZpZyB9IGZyb20gJ2F1cmVsaWEtYXV0aGVudGljYXRpb24nO1xyXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgICByb3V0ZXI6IFJvdXRlcjtcbiAgICBhdXRoZW50aWNhdGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IEZldGNoQ29uZmlnLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnSHR0cCgpO1xuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQ7XG4gICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgICAgIGFsZXJ0KGp3dF9kZWNvZGUodGhpcy5hdXRoU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uZmlndXJlUm91dGVyKGNvbmZpZywgcm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcblxyXG4gICAgICAgIC8vY29uZmlnLmFkZFBpcGVsaW5lU3RlcCgnYXV0aG9yaXplJywgQXV0aG9yaXplU3RlcCk7XHJcblxyXG4gICAgICAgIGNvbmZpZy50aXRsZSA9ICdBdXJlbGlhJztcclxuICAgICAgICBjb25maWcubWFwKFtcclxuXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdMb2dpbiddLCBuYW1lOiAnTG9naW4nLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvTG9naW4nIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnQ2hhcmFjdGVyJ10sIG5hbWU6ICdDaGFyYWN0ZXInLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvQ2hhcmFjdGVyJywgYXV0aDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyByb3V0ZTogWycvJywgJ1dlYXBvbnMnXSwgbmFtZTogJ1dlYXBvbnMnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvV2VhcG9ucycsIGF1dGg6IHRydWUgfSxcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdRdWVzdHMnXSwgbmFtZTogJ1F1ZXN0cycsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9RdWVzdHMnLCBhdXRoOiB0cnVlIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnQm91bnRpZXMnXSwgbmFtZTogJ0JvdW50aWVzJywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL0JvdW50aWVzJywgYXV0aDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyByb3V0ZTogWycvJywgJ1JlZ2lzdGVyJ10sIG5hbWU6ICdSZWdpc3RlcicsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9SZWdpc3RlcicgfSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25maWdIdHRwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmh0dHAuY29uZmlndXJlKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICBjb25maWdcbiAgICAgICAgICAgICAgICAud2l0aEJhc2VVcmwoJ2FwaS8nKVxuICAgICAgICAgICAgICAgIC53aXRoRGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ0ZldGNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhVHlwZSc6ICdqc29uJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVxdWVzdGluZyAke3JlcXVlc3QubWV0aG9kfSAke3JlcXVlc3QudXJsfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlOiBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmVkICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnVybH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbmZpZy5jb25maWd1cmUodGhpcy5odHRwKTtcbiAgICB9XG59XHJcblxyXG4vL2NsYXNzIEF1dGhvcml6ZVN0ZXAge1xyXG4vLyAgICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcclxuLy8gICAgICAgIGlmIChyb3V0aW5nQ29udGV4dC5uZXh0SW5zdHJ1Y3Rpb25zLnNvbWUoaSA9PiBpLmNvbmZpZy5hdXRoKSkge1xyXG4vLyAgICAgICAgICAgIHZhciBpc0xvZ2dlZEluID0gQXV0aG9yaXplU3RlcC5pc0xvZ2dlZEluKCk7XHJcbi8vICAgICAgICAgICAgaWYgKCFpc0xvZ2dlZEluKSB7XHJcbi8vICAgICAgICAgICAgICAgIHJldHVybiBuZXh0LmNhbmNlbCgpO1xyXG4vLyAgICAgICAgICAgIH1cclxuLy8gICAgICAgIH1cclxuLy8gICAgICAgIHJldHVybiBuZXh0KCk7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIHN0YXRpYyBpc0xvZ2dlZEluKCk6IGJvb2xlYW4ge1xyXG4vLyAgICAgICAgdmFyIGF1dGhfdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dGhfdG9rZW5cIik7XHJcbi8vICAgICAgICByZXR1cm4gKHR5cGVvZiBhdXRoX3Rva2VuICE9PSBcInVuZGVmaW5lZFwiICYmIGF1dGhfdG9rZW4gIT09IG51bGwpO1xyXG4vLyAgICB9XHJcbi8vfVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
define('components/Bounties',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode) {
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
            return this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(this.player)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                _this.playerBounties = data;
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQm91bnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxRQUFRO1FBR2pCLGtCQUFvQixJQUFpQixFQUFVLElBQWdCO1lBQTNDLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQzNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUYsMkJBQVEsR0FBUjtZQUFBLGlCQVNFO1lBUkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSwyQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQy9CLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0wsZUFBQztJQUFELENBakJBLEFBaUJDLElBQUE7SUFqQlksUUFBUTtRQURwQiw4QkFBVTt5Q0FJbUIsb0NBQVcsRUFBZ0IsaUNBQVU7T0FIdEQsUUFBUSxDQWlCcEI7SUFqQlksNEJBQVE7SUFtQnJCO1FBRUksZ0JBQVksRUFBVTtZQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQ0wsYUFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksd0JBQU0iLCJmaWxlIjoiY29tcG9uZW50cy9Cb3VudGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBCb3VudGllcyB7XG4gICAgcGxheWVyO1xuICAgIHBsYXllckJvdW50aWVzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmJvdW50aWVzKCk7XHJcbiAgICB9XG5cclxuICAgYm91bnRpZXMoKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucGxheWVyKVxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQm91bnRpZXMgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgSUQ6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5JRCA9IElEO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
            this.weapons();
        }
        Character.prototype.weapons = function () {
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhcmFjdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQU9BLElBQWEsU0FBUztRQUlsQixtQkFBb0IsSUFBaUIsRUFBVSxJQUFnQjtZQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFhO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUQvRCxjQUFTLEdBQUcscUJBQXFCLENBQUM7WUFFOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFFRCwyQkFBTyxHQUFQO1lBQUEsaUJBVUM7WUFURyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDakMsSUFBSSxFQUFFLDJCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDL0IsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNELDRCQUFRLEdBQVI7WUFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO29CQUN0QyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7b0JBQ3JDLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztvQkFDdkMsS0FBSyxDQUFDO2dCQUNWLFFBQVE7WUFDWixDQUFDO1FBQ0wsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FqQ0EsQUFpQ0MsSUFBQTtJQWpDWSxTQUFTO1FBRHJCLDhCQUFVO3lDQUttQixvQ0FBVyxFQUFnQixpQ0FBVTtPQUp0RCxTQUFTLENBaUNyQjtJQWpDWSw4QkFBUztJQW1DdEI7UUFFSSxnQkFBWSxFQUFVO1lBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSx3QkFBTSIsImZpbGUiOiJjb21wb25lbnRzL0NoYXJhY3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXIge1xuICAgIHBsYXllcjtcbiAgICBwbGF5ZXJzdGF0cztcbiAgICBwbGF5ZXJ1cmwgPSBcIi9JbWFnZXMvV2FybG9jay5wbmdcIjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy53ZWFwb25zKCk7XHJcbiAgICB9XG5cclxuICAgIHdlYXBvbnMoKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucGxheWVyKVxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc3RhdHMgPSBkYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW1hZ2UoKTtcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxuICAgIHNldEltYWdlKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucGxheWVyc3RhdHMuY2xhc3NJRCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnVybCA9IFwiL2ltYWdlcy9odW50ZXIucG5nXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJ1cmwgPSBcIi9pbWFnZXMvdGl0YW4ucG5nXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJ1cmwgPSBcIi9pbWFnZXMvd2FybG9jay5wbmdcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyBcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgSUQ6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5JRCA9IElEO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
define('components/Login',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Login = (function () {
        function Login(auth, http) {
            this.auth = auth;
            this.http = http;
            this.name = "";
            this.password = "";
        }
        Login.prototype.login = function () {
            this.auth.login({
                name: this.name,
                password: this.password
            }).then(function (response) {
                swal({
                    title: "U bent succesvol ingelogd",
                    type: "success",
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
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
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], Login);
    exports.Login = Login;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQSxJQUFhLEtBQUs7UUFLZCxlQUFvQixJQUFpQixFQUFVLElBQWdCO1lBQTNDLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBSC9ELFNBQUksR0FBRyxFQUFFLENBQUM7WUFDVixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsQ0FBQztRQUVELHFCQUFLLEdBQUw7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO2dCQUNaLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsMkJBQTJCO29CQUNsQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixjQUFjLEVBQUUsSUFBSTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO2lCQUNHLEtBQUssQ0FBQyxVQUFBLEdBQUc7Z0JBQ04sSUFBSSxDQUFDO29CQUNELEtBQUssRUFBRSw0QkFBNEI7b0JBQ25DLElBQUksRUFBRSxTQUFTO29CQUNmLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLGlCQUFpQixFQUFFLEtBQUs7b0JBQ3hCLGNBQWMsRUFBRSxJQUFJO2lCQUN2QixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFFRCxzQkFBTSxHQUFOO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUVLLG9CQUFJLEdBQVY7Ozs7OztTQUVDO1FBQ0wsWUFBQztJQUFELENBdkNBLEFBdUNDLElBQUE7SUF2Q1ksS0FBSztRQURqQiw4QkFBVTt5Q0FNbUIsb0NBQVcsRUFBZ0IsaUNBQVU7T0FMdEQsS0FBSyxDQXVDakI7SUF2Q1ksc0JBQUsiLCJmaWxlIjoiY29tcG9uZW50cy9Mb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgTG9naW4ge1xyXG5cclxuICAgIG5hbWUgPSBcIlwiO1xyXG4gICAgcGFzc3dvcmQgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIHRoaXMuYXV0aC5sb2dpbih7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVIGJlbnQgc3VjY2Vzdm9sIGluZ2Vsb2dkXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklubG9nZ2VnZXZlbnMgemlqbiBvbmp1aXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoLmxvZ291dCgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdGVzdCgpIHtcclxuXHJcbiAgICB9XHJcbn0gIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
            this.quests();
        }
        Quest.prototype.quests = function () {
            var _this = this;
            this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
            return this.http.fetch('Player/get', {
                body: aurelia_fetch_client_1.json(this.player)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                _this.playerQuests = data;
            });
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQU9BLElBQWEsS0FBSztRQUdkLGVBQW9CLElBQWlCLEVBQVUsSUFBZ0I7WUFBM0MsU0FBSSxHQUFKLElBQUksQ0FBYTtZQUFVLFNBQUksR0FBSixJQUFJLENBQVk7WUFDM0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxzQkFBTSxHQUFOO1lBQUEsaUJBU0M7WUFSRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDakMsSUFBSSxFQUFFLDJCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDL0IsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDTCxZQUFDO0lBQUQsQ0FqQkEsQUFpQkMsSUFBQTtJQWpCWSxLQUFLO1FBRGpCLDhCQUFVO3lDQUltQixvQ0FBVyxFQUFnQixpQ0FBVTtPQUh0RCxLQUFLLENBaUJqQjtJQWpCWSxzQkFBSztJQW1CbEI7UUFFSSxnQkFBWSxFQUFVO1lBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSx3QkFBTSIsImZpbGUiOiJjb21wb25lbnRzL1F1ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBRdWVzdCB7XG4gICAgcGxheWVyO1xuICAgIHBsYXllclF1ZXN0cztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgIH1cblxyXG4gICAgcXVlc3RzKCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoand0X2RlY29kZSh0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW4oKSkudXNlcmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL2dldCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLnBsYXllcilcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllclF1ZXN0cyA9IGRhdGE7XG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBJRDogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKElEOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

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
define('components/Weapons',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode) {
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvV2VhcG9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFPQSxJQUFhLE9BQU87UUFHaEIsaUJBQW9CLElBQWlCLEVBQVUsSUFBZ0I7WUFBM0MsU0FBSSxHQUFKLElBQUksQ0FBYTtZQUFVLFNBQUksR0FBSixJQUFJLENBQVk7WUFEL0Qsa0JBQWEsR0FBRyxFQUFFLENBQUM7WUFFZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUVELHlCQUFPLEdBQVA7WUFBQSxpQkFRQztZQVBHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO2dCQUNqQyxJQUFJLEVBQUUsMkJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUMvQixJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQWhCQSxBQWdCQyxJQUFBO0lBaEJZLE9BQU87UUFEbkIsOEJBQVU7eUNBSW1CLG9DQUFXLEVBQWdCLGlDQUFVO09BSHRELE9BQU8sQ0FnQm5CO0lBaEJZLDBCQUFPO0lBa0JwQjtRQUVJLGdCQUFZLEVBQVU7WUFDbEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLHdCQUFNIiwiZmlsZSI6ImNvbXBvbmVudHMvV2VhcG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBXZWFwb25zIHtcbiAgICBwbGF5ZXI7XG4gICAgd2VhcG9uc3BsYXllciA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLndlYXBvbnMoKTtcclxuICAgIH1cblxyXG4gICAgd2VhcG9ucygpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGp3dF9kZWNvZGUodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuKCkpLnVzZXJpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZmV0Y2goJ1BsYXllci9nZXQnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5wbGF5ZXIpXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb25zcGxheWVyID0gZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBJRDogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKElEOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxtQkFBMEIsTUFBOEI7SUFFeEQsQ0FBQztJQUZELDhCQUVDIiwiZmlsZSI6InJlc291cmNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24pIHtcclxuICAvL2NvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW10pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('text!app.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n\r\n          <a class=\"navbar-brand\">\r\n            DestinyFinder\r\n          </a>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li>\r\n              <a route-href=\"route: Register\">Register</a>\r\n            </li>\r\n\r\n            <li>\r\n              <a route-href=\"route: Login\">Login</a>\r\n            </li>\r\n            <li>\r\n              <a route-href=\"route: Character\">Character</a>\r\n            </li>\r\n            <li>\r\n              <a route-href=\"route: Weapons\">Weapons</a>\r\n            </li>\n            <li>\r\n              <a route-href=\"route: Quests\">Quests</a>\r\n            </li>\n            <li>\r\n              <a route-href=\"route: Bounties\">Bounties</a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <div class=\"container\">\r\n      <router-view></router-view>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Bounties.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Bounties.</h2>\r\n    <p>Hier ziet u een overzicht van al je Bounties.</p>\r\n    <div class=\"container\">\r\n    </div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th>Locatie</th>\n          <th>Omschrijving</th>\r\n          <th>voortgang</th>\r\n          <th>opties</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr repeat.for=\"bounty of playerBounties.bounties\">\r\n          <td class=\"col-md-2\">\r\n            ${bounty.location}\r\n          </td>\n            <td class=\"col-md-8\">\n              ${bounty.description}\n          </td>\n          <td class=\"col-md-2\">\r\n            ${bounty.progress}\r\n          </td>\r\n          <td class=\"col-md-2\">\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\">\r\n              <span class=\"glyphicon glyphicon-ok\"></span> Voltooien\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</template>"; });
define('text!components/Character.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-2\">\r\n              <img src=\"${playerurl}\" alt=\"\" class=\"img-rounded img-responsive\" />\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <h2 class=\"glyphicon glyphicon-user\"> ${playerstats.name}\r\n              </h2>\n              <h4>${playerstats.classname}</h4>\r\n              <p>\r\n                <h4 class=\"glyphicon glyphicon-fire\"><b> Level: </b>${playerstats.level}</h4>\r\n                <br />\r\n                <h4 class=\"glyphicon glyphicon-heart\"><b> HP: </b>${playerstats.hp}</h4>\r\n                <br />\r\n                <h4 class=\"glyphicon glyphicon-flash\"><b> XP tot volgende level: </b>${playerstats.xpNextLevel}</h4>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n</template>"; });
define('text!components/Login.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">Login op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"login()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" required=\"\" name=\"name\" value.bind=\"name\">\r\n              <span class=\"help-block\">Vul hier jouw gekozen naam in.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"modal-body\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" required=\"\" name=\"password\" value.bind=\"password\">\r\n                  <span class=\"help-block\">Vul jouw wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Quests.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Quests.</h2>\r\n    <p>Hier ziet u een overzicht van al je quests.</p>\r\n    <div class=\"container\">\r\n    </div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th>Naam</th>\n          <th>requirement(s)</th>\r\n          <th>voortgang</th>\r\n          <th>opties</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr repeat.for=\"quest of playerQuests.quests\">\r\n          <td class=\"col-md-2\">\r\n            ${quest.description}\r\n          </td>\n            <td class=\"col-md-8\" repeat.for=\"requirement of quest.requirements\">\n              ${requirement.description}\n          </td>\n          <td class=\"col-md-2\">\r\n            ${quest.progress}\r\n          </td>\r\n          <td class=\"col-md-2\">\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\">\r\n              <span class=\"glyphicon glyphicon-ok\"></span> Voltooien\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</template>"; });
define('text!components/Register.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">registreer op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"register()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" name=\"name\" value=\"\" value.bind=\"name\" required>\r\n              <span class=\"help-block\">Jouw naam wordt ook gebruikt bij het inloggen.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"password\" value=\"\" value.bind=\"password\" required>\r\n                  <span class=\"help-block\">Vul een wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"passwordr\">Herhaal Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"passwordr\" value.bind=\"passwordConfirm\" required>\r\n                  <span class=\"help-block\">Herhaal wachtwoord.</span>\r\n                </div>\r\n              </div>\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"Class\">Class</label>\r\n                  <select id=\"classID\" name=\"classID\" class=\"form-control\" value.bind=\"classID\" required>\r\n                    <option disabled selected value> -- Selecteer een Class -- </option>\r\n                    <option>Hunter</option>\r\n                    <option>Titan</option>\r\n                    <option>Warlock</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Weapons.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Wapens.</h2>\r\n    <p>Hier ziet u een overzicht van al je wapens.</p>\r\n    <div class=\"container\">\r\n    </div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th>Naam</th>\r\n          <th>Damage</th>\r\n          <th>Minimale level</th>\r\n          <th>opties</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr repeat.for=\"weapon of weaponsplayer.weapons\">\r\n          <td class=\"col-md-4\">\r\n            ${weapon.name} \r\n          </td>\r\n          <td class=\"col-md-4\">\r\n            ${weapon.damage} \r\n          </td>\r\n          <td class=\"col-md-4\">\r\n            ${weapon.minLevel}\r\n          </td>\r\n          <td class=\"col-md-4\">\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\">\r\n              <span class=\"glyphicon glyphicon-remove\"></span> Verwijder\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map