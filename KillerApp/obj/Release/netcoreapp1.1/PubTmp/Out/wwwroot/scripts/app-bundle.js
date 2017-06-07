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
            config.title = 'DestinyFinder ~ Alex Kir';
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
                { route: ['/', 'TotalClass'], name: 'TotalClass', moduleId: 'components/Querys/TotalClass', auth: true },
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFNLGFBQWE7UUFDZix1QkFBb0IsV0FBd0I7WUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBSSxDQUFDO1FBRWpELDJCQUFHLEdBQUgsVUFBSSxxQkFBNEMsRUFBRSxJQUFVO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUVwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSx5QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZEssYUFBYTtRQURsQiw4QkFBVTt5Q0FFMEIsb0NBQVc7T0FEMUMsYUFBYSxDQWNsQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlckNvbmZpZ3VyYXRpb24sIE5leHQsIFJlZGlyZWN0LCBOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UsIEZldGNoQ29uZmlnIH0gZnJvbSAnYXVyZWxpYS1hdXRoZW50aWNhdGlvbic7XHJcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5cclxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgICByb3V0ZXI6IFJvdXRlcjtcclxuICAgIGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogRmV0Y2hDb25maWcsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZ0h0dHAoKTtcclxuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgICBhbGVydChqd3RfZGVjb2RlKHRoaXMuYXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSkudXNlcmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudC5zdWJzY3JpYmUoJ3NpZ25lZEluJywgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSByZXNwb25zZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCJsb2dpblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJCZWRhbmt0IHZvb3IgdXcgYmV6b2VrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlndXJlUm91dGVyKGNvbmZpZywgcm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcblxyXG4gICAgICAgIGxldCBzdGVwID0gbmV3IEF1dGhvcml6ZVN0ZXAodGhpcy5hdXRoU2VydmljZSk7XHJcbiAgICAgICAgY29uZmlnLmFkZEF1dGhvcml6ZVN0ZXAoc3RlcCk7XHJcblxyXG4gICAgICAgIGNvbmZpZy50aXRsZSA9ICdEZXN0aW55RmluZGVyIH4gQWxleCBLaXInO1xyXG4gICAgICAgIGNvbmZpZy5tYXAoW1xyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnQ2hhcmFjdGVyJ10sIG5hbWU6ICdDaGFyYWN0ZXInLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvQ2hhcmFjdGVyJywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnV2VhcG9ucyddLCBuYW1lOiAnV2VhcG9ucycsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9XZWFwb25zJywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnUXVlc3RzJ10sIG5hbWU6ICdRdWVzdHMnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvUXVlc3RzJywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnQm91bnRpZXMnXSwgbmFtZTogJ0JvdW50aWVzJywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL0JvdW50aWVzJywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnRmlnaHQnXSwgbmFtZTogJ0ZpZ2h0JywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL0ZpZ2h0JywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnQmVzdFdlYXBvbnMnXSwgbmFtZTogJ0Jlc3RXZWFwb25zJywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL1F1ZXJ5cy9zdHJvbmdXZWFwb25zJywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnTWFpblF1ZXN0J10sIG5hbWU6ICdNYWluUXVlc3QnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvUXVlcnlzL21haW5RdWVzdCcsIGF1dGg6IHRydWUgfSxcclxuICAgICAgICAgICAgeyByb3V0ZTogWycvJywgJ0F2Z0RhbWFnZSddLCBuYW1lOiAnQXZnRGFtYWdlJywgbW9kdWxlSWQ6ICdjb21wb25lbnRzL1F1ZXJ5cy9BdmVyYWdlRGFtYWdlJywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnUXVlcnlzJ10sIG5hbWU6ICdRdWVyeXMnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvUXVlcnlzL1F1ZXJ5cycsIGF1dGg6IHRydWUgfSxcclxuICAgICAgICAgICAgeyByb3V0ZTogWycvJywgJ0FsbFdlYXBvbnMnXSwgbmFtZTogJ0FsbFdlYXBvbnMnLCBtb2R1bGVJZDogJ2NvbXBvbmVudHMvUXVlcnlzL0FsbFdlYXBvbnMnLCBhdXRoOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdUb3RhbFdlYXBvbnMnXSwgbmFtZTogJ1RvdGFsV2VhcG9ucycsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9RdWVyeXMvVG90YWxXZWFwb25zJywgYXV0aDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IHJvdXRlOiBbJy8nLCAnVG90YWxDbGFzcyddLCBuYW1lOiAnVG90YWxDbGFzcycsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9RdWVyeXMvVG90YWxDbGFzcycsIGF1dGg6IHRydWUgfSxcclxuICAgICAgICAgICAgeyByb3V0ZTogWycvJywgJ1JlZ2lzdGVyJ10sIG5hbWU6ICdSZWdpc3RlcicsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9SZWdpc3RlcicgfSxcclxuICAgICAgICAgICAgeyByb3V0ZTogWycvJywgJ0xvZ2luJ10sIG5hbWU6ICdMb2dpbicsIG1vZHVsZUlkOiAnY29tcG9uZW50cy9Mb2dpbicgfVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZ0h0dHAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5odHRwLmNvbmZpZ3VyZShjb25maWcgPT4ge1xyXG4gICAgICAgICAgICBjb25maWdcclxuICAgICAgICAgICAgICAgIC53aXRoQmFzZVVybCgnYXBpLycpXHJcbiAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnRmV0Y2gnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YVR5cGUnOiAnanNvbidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZXF1ZXN0aW5nICR7cmVxdWVzdC5tZXRob2R9ICR7cmVxdWVzdC51cmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UocmVzcG9uc2U6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlZCAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS51cmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcuY29uZmlndXJlKHRoaXMuaHR0cCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBhdXRvaW5qZWN0XHJcbmNsYXNzIEF1dGhvcml6ZVN0ZXAge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIHJ1bihuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb246IE5hdmlnYXRpb25JbnN0cnVjdGlvbiwgbmV4dDogTmV4dCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5nZXRBbGxJbnN0cnVjdGlvbnMoKS5zb21lKGkgPT4gaS5jb25maWcuYXV0aCkpIHtcclxuICAgICAgICAgICAgbGV0IGlzTG9nZ2VkSW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0xvZ2dlZEluKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KCdsb2dpbicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcclxuICAgIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
define('components/Bounties',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
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
            this.http.fetch('Player/get').then(function (response) { return response.json(); })
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
            this.newbounty = new newBounty(this.location, this.description);
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
        function newBounty(location, description) {
            this.location = location;
            this.description = description;
        }
        return newBounty;
    }());
    exports.newBounty = newBounty;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQm91bnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxRQUFRO1FBS2pCLGtCQUFvQixJQUFpQixFQUFVLElBQWdCO1lBQTNDLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQzNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQsMkJBQVEsR0FBUjtZQUFBLGlCQUtDO1lBSkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDMUQsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFFRCxpQ0FBYyxHQUFkLFVBQWUsTUFBTTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtnQkFDaEMsSUFBSSxFQUFFLDJCQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3JCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQsNEJBQVMsR0FBVDtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ2hDLElBQUksRUFBRSwyQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDN0IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRCwrQkFBWSxHQUFaLFVBQWEsTUFBTTtZQUFuQixpQkFzQkM7WUFyQkcsSUFBSSxDQUFDO2dCQUNELEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLElBQUksRUFBRSxTQUFTO2dCQUNmLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLGlCQUFpQixFQUFFLDBCQUEwQjtnQkFDN0MsZ0JBQWdCLEVBQUUsTUFBTTthQUMzQixFQUFFLFVBQUMsSUFBSTtnQkFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFO3dCQUNuQyxJQUFJLEVBQUUsMkJBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ3JCLENBQUMsQ0FBQztvQkFDSCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQzt3QkFDRCxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsSUFBSSxFQUFFLGdDQUFnQzt3QkFDdEMsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsaUJBQWlCLEVBQUUsS0FBSzt3QkFDeEIsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTCxlQUFDO0lBQUQsQ0F2REEsQUF1REMsSUFBQTtJQXZEWSxRQUFRO1FBRHBCLDhCQUFVO3lDQU1tQixvQ0FBVyxFQUFnQixpQ0FBVTtPQUx0RCxRQUFRLENBdURwQjtJQXZEWSw0QkFBUTtJQTBEckI7UUFHSSxtQkFBWSxRQUFnQixFQUFFLFdBQW1CO1lBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25DLENBQUM7UUFDTCxnQkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksOEJBQVMiLCJmaWxlIjoiY29tcG9uZW50cy9Cb3VudGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgQm91bnRpZXMge1xyXG4gICAgcGxheWVyQm91bnRpZXM7XHJcbiAgICBsb2NhdGlvbjtcclxuICAgIGRlc2NyaXB0aW9uO1xyXG4gICAgbmV3Ym91bnR5O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5ib3VudGllcygpO1xyXG4gICAgfVxyXG4gICAgLy9zcGVsZXIgb3BoYWxlblxyXG4gICAgYm91bnRpZXMoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0JykudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJCb3VudGllcyA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy9ib3VudHkgc3RhdHVzIGFhbnBhc3NlblxyXG4gICAgY2hhbmdlUHJvZ3Jlc3MoYm91bnR5KSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdCb3VudHkvc2V0Qm91bnR5Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKGJvdW50eSlcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJvdW50aWVzKCk7XHJcbiAgICB9XHJcbiAgICAvL2JvdW50eSB0b2V2b2VnZW5cclxuICAgIGFkZEJvdW50eSgpIHtcclxuICAgICAgICB0aGlzLm5ld2JvdW50eSA9IG5ldyBuZXdCb3VudHkodGhpcy5sb2NhdGlvbiwgdGhpcy5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdCb3VudHkvYWRkQm91bnR5Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMubmV3Ym91bnR5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYm91bnRpZXMoKTtcclxuICAgIH1cclxuICAgIC8vYm91bnR5IHZlcndpamRlcmVuXHJcbiAgICBkZWxldGVCb3VudHkoYm91bnR5KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnV2VldCB1IGhldCB6ZWtlcj8nLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnSmEgdmVyd2lqZGVyIGRlemUgQm91bnR5JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1N0b3AnLFxyXG4gICAgICAgIH0sIChpc09rKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc09rKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ0JvdW50eS9kZWxldGVCb3VudHknLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToganNvbihib3VudHkpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm91bnRpZXMoKTtcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnVmVyd2lqZGVyZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0JvdW50eSBpcyBzdWNjZXN2b2wgdmVyd2lqZGVyZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lcjogMzAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vY2xhc3Mgdm9vciBuaWV1d2UgYm91bnR5XHJcbmV4cG9ydCBjbGFzcyBuZXdCb3VudHkge1xyXG4gICAgbG9jYXRpb246IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Character',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
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
            this.http.fetch('Player/get').then(function (response) { return response.json(); })
                .then(function (data) {
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
            this.updatedPlayer = new UpdatePlayer(this.className, this.HP, this.level, this.XP);
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
        function UpdatePlayer(className, HP, level, XP) {
            this.className = className;
            this.HP = HP;
            this.level = level;
            this.XP = XP;
        }
        return UpdatePlayer;
    }());
    exports.UpdatePlayer = UpdatePlayer;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhcmFjdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQU9BLElBQWEsU0FBUztRQVNsQixtQkFBb0IsSUFBaUIsRUFBVSxJQUFnQjtZQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFhO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQVAvRCxjQUFTLEdBQUcscUJBQXFCLENBQUM7WUFROUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFFRCx5QkFBSyxHQUFMO1lBQUEsaUJBTUM7WUFMRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUMxRCxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsNEJBQVEsR0FBUjtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDO29CQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUM7b0JBQ3RDLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztvQkFDckMsS0FBSyxDQUFDO2dCQUNWLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO29CQUN2QyxLQUFLLENBQUM7Z0JBQ1YsUUFBUTtZQUNaLENBQUM7UUFDTCxDQUFDO1FBRUQsZ0NBQVksR0FBWjtZQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtnQkFDN0IsSUFBSSxFQUFFLDJCQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0EzQ0EsQUEyQ0MsSUFBQTtJQTNDWSxTQUFTO1FBRHJCLDhCQUFVO3lDQVVtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQVR0RCxTQUFTLENBMkNyQjtJQTNDWSw4QkFBUztJQThDdEI7UUFNSSxzQkFBWSxTQUFTLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSxvQ0FBWSIsImZpbGUiOiJjb21wb25lbnRzL0NoYXJhY3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgQ2hhcmFjdGVyIHtcclxuICAgIHBsYXllcnN0YXRzO1xyXG4gICAgcGxheWVydXJsID0gXCIvSW1hZ2VzL1dhcmxvY2sucG5nXCI7XHJcbiAgICB1cGRhdGVkUGxheWVyO1xyXG4gICAgY2xhc3NOYW1lO1xyXG4gICAgSFA7XHJcbiAgICBsZXZlbDtcclxuICAgIFhQO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuc3RhdHMoKTtcclxuICAgIH1cclxuICAgIC8vc3BlbGVyIG9waGFsZW5cclxuICAgIHN0YXRzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL2dldCcpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc3RhdHMgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbWFnZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vZm90byBvcCBrbGFzc2Ugd2lqemlnZW5cclxuICAgIHNldEltYWdlKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wbGF5ZXJzdGF0cy5jbGFzc0lEKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL2h1bnRlci5wbmdcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnVybCA9IFwiL2ltYWdlcy90aXRhbi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnVybCA9IFwiL2ltYWdlcy93YXJsb2NrLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9zcGVsZXIgdXBkYXRlblxyXG4gICAgdXBkYXRlUGxheWVyKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlZFBsYXllciA9IG5ldyBVcGRhdGVQbGF5ZXIodGhpcy5jbGFzc05hbWUsIHRoaXMuSFAsIHRoaXMubGV2ZWwsIHRoaXMuWFApO1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL3VwZGF0ZScsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLnVwZGF0ZWRQbGF5ZXIpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdGF0cygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL2NsYXNzIHZvb3IgdXBkYXRlbiB2YW4gc3BlbGVyXHJcbmV4cG9ydCBjbGFzcyBVcGRhdGVQbGF5ZXIge1xyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmc7XHJcbiAgICBIUDtcclxuICAgIGxldmVsO1xyXG4gICAgWFA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2xhc3NOYW1lLCBIUCwgbGV2ZWwsIFhQKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgdGhpcy5IUCA9IEhQO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcclxuICAgICAgICB0aGlzLlhQID0gWFA7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Fight',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
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
            this.http.fetch('Player/get').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.player = data;
            });
        };
        Fight.prototype.getPlayers = function () {
            var _this = this;
            this.http.fetch('Player/getPlayers').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.players = data;
                _this.opponent = _this.players[0];
                _this.setImage();
            });
        };
        Fight.prototype.select = function (player) {
            this.selectedID = player.id;
            this.opponent = player;
            this.setImage();
        };
        Fight.prototype.fight = function () {
            var _this = this;
            this.http.fetch('Fight/fight', {
                body: aurelia_fetch_client_1.json(new fight(this.player.hp, this.opponent.id, this.weapon.id))
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                if (data) {
                    _this.getReward();
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
        Fight.prototype.getReward = function () {
            this.http.fetch('Fight/getReward').then(function (response) { return response.text(); })
                .then(function (data) {
                swal({
                    title: "U heeft gewonnen!, U heeft " + String(data),
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                    closeOnConfirm: true
                });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUM7b0JBQ25ELElBQUksRUFBRSxTQUFTO29CQUNmLGdCQUFnQixFQUFFLEtBQUs7b0JBQ3ZCLGlCQUFpQixFQUFFLElBQUk7b0JBQ3ZCLGNBQWMsRUFBRSxJQUFJO2lCQUN2QixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFFRCx3QkFBUSxHQUFSO1lBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztvQkFDdEMsS0FBSyxDQUFDO2dCQUNWLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDO29CQUNyQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7b0JBQ3ZDLEtBQUssQ0FBQztnQkFDVixRQUFRO1lBQ1osQ0FBQztRQUNMLENBQUM7UUFDTCxZQUFDO0lBQUQsQ0FwRkEsQUFvRkMsSUFBQTtJQXBGWSxLQUFLO1FBRGpCLDhCQUFVO3lDQVVtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQVR0RCxLQUFLLENBb0ZqQjtJQXBGWSxzQkFBSztJQXNGbEI7UUFJSSxlQUFZLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTTtZQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDO1FBQ0wsWUFBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksc0JBQUsiLCJmaWxlIjoiY29tcG9uZW50cy9GaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgRmlnaHQge1xyXG4gICAgcGxheWVycztcclxuICAgIHBsYXllcjtcclxuICAgIG9wcG9uZW50O1xyXG4gICAgc2VsZWN0ZWRJRDtcclxuICAgIHdlYXBvbjtcclxuICAgIGFwcG9uZW1lbnQ7XHJcbiAgICBwbGF5ZXJ1cmw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5nZXRQbGF5ZXJzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRQbGF5ZXIoKTtcclxuICAgIH1cclxuICAgIC8vc3BlbGVyIG9waGFsZW5cclxuICAgIGdldFBsYXllcigpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1BsYXllci9nZXQnKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllciA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy9hbGxlIHNwZWxlcnMgb3BoYWxlblxyXG4gICAgZ2V0UGxheWVycygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1BsYXllci9nZXRQbGF5ZXJzJykudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3Bwb25lbnQgPSB0aGlzLnBsYXllcnNbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEltYWdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy9nZXNlbGVjdGVlcmRlIHNwZWxlciBhYW5wYXNzZW5cclxuICAgIHNlbGVjdChwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSUQgPSBwbGF5ZXIuaWQ7XHJcbiAgICAgICAgdGhpcy5vcHBvbmVudCA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnNldEltYWdlKCk7XHJcbiAgICB9XHJcbiAgICAvL2dldmVjaHQgc3RhcnRlblxyXG4gICAgZmlnaHQoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdGaWdodC9maWdodCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbihuZXcgZmlnaHQodGhpcy5wbGF5ZXIuaHAsIHRoaXMub3Bwb25lbnQuaWQsIHRoaXMud2VhcG9uLmlkKSlcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmV3YXJkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVSBoZWVmdCB2ZXJsb3JlbiFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgLy9yZXdhcmRzIG9waGFsZW5cclxuICAgIGdldFJld2FyZCgpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ0ZpZ2h0L2dldFJld2FyZCcpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlUgaGVlZnQgZ2V3b25uZW4hLCBVIGhlZWZ0IFwiICsgU3RyaW5nKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvL2ZvdG8gb3Aga2xhc3NlIGFhbnBhc3NlblxyXG4gICAgc2V0SW1hZ2UoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm9wcG9uZW50LmNsYXNzSUQpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJ1cmwgPSBcIi9pbWFnZXMvaHVudGVyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL3RpdGFuLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVydXJsID0gXCIvaW1hZ2VzL3dhcmxvY2sucG5nXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy9jbGFzcyBvcCBlZW4gZmlnaHQgbWVlIHRlIGdldmVuXHJcbmV4cG9ydCBjbGFzcyBmaWdodCB7XHJcbiAgICBwbGF5ZXI7XHJcbiAgICBvcHBvbmVtZW50O1xyXG4gICAgd2VhcG9uO1xyXG4gICAgY29uc3RydWN0b3IocGxheWVyLCBvcHBvbmVtZW50LCB3ZWFwb24pIHtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLm9wcG9uZW1lbnQgPSBvcHBvbmVtZW50O1xyXG4gICAgICAgIHRoaXMud2VhcG9uID0gd2VhcG9uO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBUUEsSUFBYSxLQUFLO1FBS2QsZUFBb0IsSUFBaUIsRUFBVSxJQUFnQixFQUFVLEtBQXNCLEVBQVUsTUFBYztZQUFuRyxTQUFJLEdBQUosSUFBSSxDQUFhO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUh2SCxTQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ1YsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUdkLENBQUM7UUFFRCxxQkFBSyxHQUFMO1lBQUEsaUJBNEJDO1lBM0JHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1osS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUM7b0JBQ0QsS0FBSyxFQUFFLDJCQUEyQjtvQkFDbEMsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsaUJBQWlCLEVBQUUsS0FBSztvQkFDeEIsY0FBYyxFQUFFLEtBQUs7b0JBQ3JCLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQztnQkFFSCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUV0QyxDQUFDLENBQUM7aUJBQ0csS0FBSyxDQUFDLFVBQUEsR0FBRztnQkFDTixJQUFJLENBQUM7b0JBQ0QsS0FBSyxFQUFFLDRCQUE0QjtvQkFDbkMsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsaUJBQWlCLEVBQUUsS0FBSztvQkFDeEIsY0FBYyxFQUFFLEtBQUs7b0JBQ3JCLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQXJDQSxBQXFDQyxJQUFBO0lBckNZLEtBQUs7UUFEakIsOEJBQVU7eUNBTW1CLG9DQUFXLEVBQWdCLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWtCLHVCQUFNO09BTDlHLEtBQUssQ0FxQ2pCO0lBckNZLHNCQUFLIiwiZmlsZSI6ImNvbXBvbmVudHMvTG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBMb2dpbiB7XHJcblxyXG4gICAgbmFtZSA9IFwiXCI7XHJcbiAgICBwYXNzd29yZCA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIH1cclxuICAgIC8vaW5sb2dnZW5cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIHRoaXMuYXV0aC5sb2dpbih7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudC5wdWJsaXNoKCdzaWduZWRJbicsIHRydWUpO1xyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlUgYmVudCBzdWNjZXN2b2wgaW5nZWxvZ2RcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0aW1lcjogMTAwMFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFwiQ2hhcmFjdGVyXCIpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklubG9nZ2VnZXZlbnMgemlqbiBvbmp1aXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lcjogMTAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59ICJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Quests',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
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
            this.http.fetch('Player/get').then(function (response) { return response.json(); })
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
            this.newQuest = new newQuest(this.requirements, this.name);
            this.http.fetch('Quest/addQuest', {
                body: aurelia_fetch_client_1.json(this.newQuest)
            });
            this.quests();
            this.requirements = [];
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
        function newQuest(requirements, name) {
            this.requirements = requirements;
            this.description = name;
        }
        return newQuest;
    }());
    exports.newQuest = newQuest;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQU9BLElBQWEsS0FBSztRQVFkLGVBQW9CLElBQWlCLEVBQVUsSUFBZ0I7WUFBM0MsU0FBSSxHQUFKLElBQUksQ0FBYTtZQUFVLFNBQUksR0FBSixJQUFJLENBQVk7WUFIL0QsaUJBQVksR0FBRyxFQUFFLENBQUM7WUFJZCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELHNCQUFNLEdBQU47WUFBQSxpQkFLQztZQUpHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQzFELElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsOEJBQWMsR0FBZCxVQUFlLEtBQUs7WUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRTtnQkFDekMsSUFBSSxFQUFFLDJCQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELDhCQUFjLEdBQWQ7WUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELHdCQUFRLEdBQVI7WUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFO2dCQUM5QixJQUFJLEVBQUUsMkJBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzVCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFDTCxZQUFDO0lBQUQsQ0F4Q0EsQUF3Q0MsSUFBQTtJQXhDWSxLQUFLO1FBRGpCLDhCQUFVO3lDQVNtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQVJ0RCxLQUFLLENBd0NqQjtJQXhDWSxzQkFBSztJQTJDbEI7UUFHSSx1QkFBWSxFQUFVLEVBQUUsUUFBZ0I7WUFDcEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQVBZLHNDQUFhO0lBUzFCO1FBRUkscUJBQVksV0FBbUI7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDbkMsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSxrQ0FBVztJQU94QjtRQUdJLGtCQUFZLFlBQVksRUFBRSxJQUFJO1lBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FQQSxBQU9DLElBQUE7SUFQWSw0QkFBUSIsImZpbGUiOiJjb21wb25lbnRzL1F1ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgUXVlc3Qge1xyXG4gICAgcGxheWVyUXVlc3RzO1xyXG4gICAgc2VsZWN0ZWRRdWVzdDtcclxuICAgIG5hbWU7XHJcbiAgICBkZXNjcmlwdGlvbjtcclxuICAgIHJlcXVpcmVtZW50cyA9IFtdO1xyXG4gICAgcmVxdWlyZW1lbnQ7XHJcbiAgICBuZXdRdWVzdDtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMucXVlc3RzKCk7XHJcbiAgICB9XHJcbiAgICAvL3NwZWxlciBvcGhhbGVuXHJcbiAgICBxdWVzdHMoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0JykudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJRdWVzdHMgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vUXVlc3Qgc3RhdHVzIGFhbnBhc3NlblxyXG4gICAgY2hhbmdlUHJvZ3Jlc3MocXVlc3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUXVlc3QgPSBuZXcgc2VsZWN0ZWRRdWVzdChxdWVzdC5pZCwgcXVlc3QucHJvZ3Jlc3MpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUXVlc3Qvc2V0UXVlc3RSZXF1aXJlbWVudCcsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLnNlbGVjdGVkUXVlc3QpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgIH1cclxuICAgIC8vcmVxdWlyZW1lbnQgdG9ldm9lZ2VuXHJcbiAgICBhZGRSZXF1aXJlbWVudCgpIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVtZW50ID0gbmV3IHJlcXVpcmVtZW50KHRoaXMuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZW1lbnRzLnB1c2godGhpcy5yZXF1aXJlbWVudCk7XHJcbiAgICB9XHJcbiAgICAvL2VpZ2VuIHF1ZXN0IHRvZXZvZWdlblxyXG4gICAgYWRkUXVlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5uZXdRdWVzdCA9IG5ldyBuZXdRdWVzdCh0aGlzLnJlcXVpcmVtZW50cywgdGhpcy5uYW1lKTtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1F1ZXN0L2FkZFF1ZXN0Jywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMubmV3UXVlc3QpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdHMoKTtcclxuICAgICAgICB0aGlzLnJlcXVpcmVtZW50cyA9IFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHNlbGVjdGVkUXVlc3Qge1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIHByb2dyZXNzOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihJRDogc3RyaW5nLCBwcm9ncmVzczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5JRCA9IElEO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHJlcXVpcmVtZW50IHtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgbmV3UXVlc3Qge1xyXG4gICAgcmVxdWlyZW1lbnRzO1xyXG4gICAgZGVzY3JpcHRpb247XHJcbiAgICBjb25zdHJ1Y3RvcihyZXF1aXJlbWVudHMsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVtZW50cyA9IHJlcXVpcmVtZW50cztcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmFtZTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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OEJBQVU7eUNBUW1CLG9DQUFXLEVBQWdCLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWtCLHVCQUFNO09BUDlHLFFBQVEsQ0E4RHBCO0lBOURZLDRCQUFRO0lBZ0VyQjtRQUlJLGdCQUFZLElBQVksRUFBRSxRQUFnQixFQUFFLE9BQWU7WUFDdkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQVRBLEFBU0MsSUFBQTtJQVRZLHdCQUFNIiwiZmlsZSI6ImNvbXBvbmVudHMvUmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcidcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlciB7XHJcbiAgICBuYW1lID0gXCJcIjtcclxuICAgIHBhc3N3b3JkID0gXCJcIjtcclxuICAgIHBhc3N3b3JkQ29uZmlybSA9IFwiXCI7XHJcbiAgICBjbGFzc0lEID0gXCJcIjtcclxuICAgIHBsYXllcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvciwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgfVxyXG4gICAgLy9yZWdpc3RyZXJlblxyXG4gICAgcmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmQgIT0gdGhpcy5wYXNzd29yZENvbmZpcm0pIHtcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVdyBpbmdldnVsZGUgd2FjaHR3b29yZGVuIHppam4gbmlldCBnZWxpamtcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMubmFtZSwgdGhpcy5wYXNzd29yZCwgdGhpcy5jbGFzc0lEKTtcclxuICAgICAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvcmVnaXN0ZXInLCB7XHJcbiAgICAgICAgICAgICAgICBib2R5OiBqc29uKHRoaXMucGxheWVyKVxyXG4gICAgICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVIGJlbnQgc3VjY2Vzdm9sIGdlcmVnaXN0cmVlcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU9uQ29uZmlybTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lcjogMTAwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmFhbSBpcyBhbCBiZXpldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyOiAxMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vaW5sb2dnZW5cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIHRoaXMuYXV0aC5sb2dpbih7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudC5wdWJsaXNoKCdzaWduZWRJbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcIkNoYXJhY3RlclwiKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBjbGFzc0lEOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGNsYXNzSUQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMuY2xhc3NJRCA9IGNsYXNzSUQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Weapons',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
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
            this.http.fetch('Player/get').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.weaponsplayer = data;
            });
        };
        Weapons.prototype.addWeapon = function () {
            this.newWeapon = new newWeapon(this.name, this.damage, this.minlevel);
            this.http.fetch('Weapon/addWeapon', {
                body: aurelia_fetch_client_1.json(this.newWeapon)
            });
            this.weapons();
        };
        Weapons.prototype.editWeapon = function (weapon) {
            this.editweapon = new editWeapon(this.name, this.damage, this.minlevel, weapon.id);
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
        Weapons.prototype.randomWeapon = function () {
            var _this = this;
            this.http.fetch('Weapon/random', {
                body: aurelia_fetch_client_1.json(this.weaponsplayer.level)
            }).then(function (response) {
                _this.weapons();
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
        function newWeapon(name, damage, minlevel) {
            this.name = name;
            this.damage = damage;
            this.minlevel = minlevel;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxDQUFDO1FBQ1gsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQWxFQSxBQWtFQyxJQUFBO0lBbEVZLE9BQU87UUFEbkIsOEJBQVU7eUNBU21CLG9DQUFXLEVBQWdCLGlDQUFVO09BUnRELE9BQU8sQ0FrRW5CO0lBbEVZLDBCQUFPO0lBbUVwQjtRQUlJLG1CQUFZLElBQVksRUFBRSxNQUFNLEVBQUUsUUFBUTtZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQVRBLEFBU0MsSUFBQTtJQVRZLDhCQUFTO0lBV3RCO1FBS0ksb0JBQVksSUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQVhZLGdDQUFVIiwiZmlsZSI6ImNvbXBvbmVudHMvV2VhcG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgV2VhcG9ucyB7XHJcbiAgICB3ZWFwb25zcGxheWVyO1xyXG4gICAgbmFtZTtcclxuICAgIGRhbWFnZTtcclxuICAgIG1pbmxldmVsO1xyXG4gICAgbmV3V2VhcG9uO1xyXG4gICAgc2VsZWN0ZWRXZWFwb247XHJcbiAgICBlZGl0d2VhcG9uO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy53ZWFwb25zKCk7XHJcbiAgICB9XHJcbiAgICAvL3NwZWxlciBvcGhhbGVuXHJcbiAgICB3ZWFwb25zKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnUGxheWVyL2dldCcpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uc3BsYXllciA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy93YXBlbiB0b2V2b2VnZW5cclxuICAgIGFkZFdlYXBvbigpIHtcclxuICAgICAgICB0aGlzLm5ld1dlYXBvbiA9IG5ldyBuZXdXZWFwb24odGhpcy5uYW1lLCB0aGlzLmRhbWFnZSwgdGhpcy5taW5sZXZlbCk7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdXZWFwb24vYWRkV2VhcG9uJywge1xyXG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMubmV3V2VhcG9uKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMud2VhcG9ucygpO1xyXG4gICAgfVxyXG4gICAgLy93YXBlbiB2ZXJhbmRlcmVuXHJcbiAgICBlZGl0V2VhcG9uKHdlYXBvbikge1xyXG4gICAgICAgIHRoaXMuZWRpdHdlYXBvbiA9IG5ldyBlZGl0V2VhcG9uKHRoaXMubmFtZSwgdGhpcy5kYW1hZ2UsIHRoaXMubWlubGV2ZWwsIHdlYXBvbi5pZCk7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdXZWFwb24vZWRpdFdlYXBvbicsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLmVkaXR3ZWFwb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25zKCk7XHJcbiAgICB9XHJcbiAgICAvL3dhcGVuIHZlcndpamRlcmVuXHJcbiAgICBkZWxldGVXZWFwb24od2VhcG9uKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnV2VldCB1IGhldCB6ZWtlcj8nLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnSmEgdmVyd2lqZGVyIGRlemUgd2FwZW4nLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnU3RvcCdcclxuICAgICAgICB9LCAoaXNPaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNPaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odHRwLmZldGNoKCdXZWFwb24vZGVsZXRlV2VhcG9uJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGpzb24od2VhcG9uKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbnMoKTtcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnVmVyd2lqZGVyZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhcGVuIGlzIHN1Y2Nlc3ZvbCB2ZXJ3aWpkZXJkJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cbiAgICByYW5kb21XZWFwb24oKSB7XG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnV2VhcG9uL3JhbmRvbScsIHtcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy53ZWFwb25zcGxheWVyLmxldmVsKVxyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgdGhpcy53ZWFwb25zKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBuZXdXZWFwb24ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGFtYWdlO1xyXG4gICAgbWlubGV2ZWw7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRhbWFnZSwgbWlubGV2ZWwpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMubWlubGV2ZWwgPSBtaW5sZXZlbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGVkaXRXZWFwb24ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGFtYWdlO1xyXG4gICAgbWlubGV2ZWw7XHJcbiAgICBJRDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGFtYWdlLCBtaW5sZXZlbCwgSUQpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMubWlubGV2ZWwgPSBtaW5sZXZlbDtcclxuICAgICAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxtQkFBMEIsTUFBOEI7SUFFeEQsQ0FBQztJQUZELDhCQUVDIiwiZmlsZSI6InJlc291cmNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24pIHtcclxuICAvL2NvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW10pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Querys/AllWeapons',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AllWeapons = (function () {
        function AllWeapons(auth, http) {
            this.auth = auth;
            this.http = http;
            this.getPlayers();
        }
        AllWeapons.prototype.getPlayers = function () {
            var _this = this;
            this.http.fetch('Weapon/getAllWeapons').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.players = data;
            });
        };
        return AllWeapons;
    }());
    AllWeapons = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], AllWeapons);
    exports.AllWeapons = AllWeapons;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlcnlzL0FsbFdlYXBvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxVQUFVO1FBRW5CLG9CQUFvQixJQUFpQixFQUFVLElBQWdCO1lBQTNDLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQzNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsK0JBQVUsR0FBVjtZQUFBLGlCQUtDO1lBSkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUNwRSxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSxVQUFVO1FBRHRCLDhCQUFVO3lDQUdtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQUZ0RCxVQUFVLENBWXRCO0lBWlksZ0NBQVUiLCJmaWxlIjoiY29tcG9uZW50cy9RdWVyeXMvQWxsV2VhcG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgQWxsV2VhcG9ucyB7XHJcbiAgICBwbGF5ZXJzO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5nZXRQbGF5ZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGxheWVycygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1dlYXBvbi9nZXRBbGxXZWFwb25zJykudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Querys/AverageDamage',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AverageDamage = (function () {
        function AverageDamage(auth, http) {
            this.auth = auth;
            this.http = http;
            this.getPlayers();
        }
        AverageDamage.prototype.getPlayers = function () {
            var _this = this;
            this.http.fetch('Player/getAvg').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.players = data;
            });
        };
        return AverageDamage;
    }());
    AverageDamage = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], AverageDamage);
    exports.AverageDamage = AverageDamage;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlcnlzL0F2ZXJhZ2VEYW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxhQUFhO1FBRXRCLHVCQUFvQixJQUFpQixFQUFVLElBQWdCO1lBQTNDLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQzNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsa0NBQVUsR0FBVjtZQUFBLGlCQUtDO1lBSkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDN0QsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDTCxvQkFBQztJQUFELENBWkEsQUFZQyxJQUFBO0lBWlksYUFBYTtRQUR6Qiw4QkFBVTt5Q0FHbUIsb0NBQVcsRUFBZ0IsaUNBQVU7T0FGdEQsYUFBYSxDQVl6QjtJQVpZLHNDQUFhIiwiZmlsZSI6ImNvbXBvbmVudHMvUXVlcnlzL0F2ZXJhZ2VEYW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcclxuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxyXG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5cclxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIEF2ZXJhZ2VEYW1hZ2Uge1xyXG4gICAgcGxheWVycztcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UGxheWVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBsYXllcnMoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdQbGF5ZXIvZ2V0QXZnJykudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Querys/mainQuest',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mainQuest = (function () {
        function mainQuest(auth, http) {
            this.auth = auth;
            this.http = http;
            this.getMainQuest();
        }
        mainQuest.prototype.getMainQuest = function () {
            var _this = this;
            this.http.fetch('Quest/getMain').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.quests = data;
            });
        };
        return mainQuest;
    }());
    mainQuest = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], mainQuest);
    exports.mainQuest = mainQuest;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlcnlzL21haW5RdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFPQSxJQUFhLFNBQVM7UUFFbEIsbUJBQW9CLElBQWlCLEVBQVUsSUFBZ0I7WUFBM0MsU0FBSSxHQUFKLElBQUksQ0FBYTtZQUFVLFNBQUksR0FBSixJQUFJLENBQVk7WUFDM0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCxnQ0FBWSxHQUFaO1lBQUEsaUJBS0M7WUFKRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUM3RCxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSxTQUFTO1FBRHJCLDhCQUFVO3lDQUdtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQUZ0RCxTQUFTLENBWXJCO0lBWlksOEJBQVMiLCJmaWxlIjoiY29tcG9uZW50cy9RdWVyeXMvbWFpblF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3dhbCBmcm9tICdzd2VldGFsZXJ0JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiXHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCJhdXJlbGlhLWF1dGhlbnRpY2F0aW9uXCJcclxuaW1wb3J0ICogYXMgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuXHJcbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBtYWluUXVlc3Qge1xyXG4gICAgcXVlc3RzO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5nZXRNYWluUXVlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYWluUXVlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdRdWVzdC9nZXRNYWluJykudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdHMgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6InNyYyJ9

define('components/Querys/Querys',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Querys = (function () {
        function Querys() {
        }
        return Querys;
    }());
    exports.Querys = Querys;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlcnlzL1F1ZXJ5cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBRUEsQ0FBQztRQUFELGFBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUZZLHdCQUFNIiwiZmlsZSI6ImNvbXBvbmVudHMvUXVlcnlzL1F1ZXJ5cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBRdWVyeXN7XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Querys/strongWeapons',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var strongWeapons = (function () {
        function strongWeapons(auth, http) {
            this.auth = auth;
            this.http = http;
            this.getWeapons();
        }
        strongWeapons.prototype.getWeapons = function () {
            var _this = this;
            this.http.fetch('Weapon/getBest').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.weapons = data;
            });
        };
        return strongWeapons;
    }());
    strongWeapons = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], strongWeapons);
    exports.strongWeapons = strongWeapons;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlcnlzL3N0cm9uZ1dlYXBvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxhQUFhO1FBRXRCLHVCQUFvQixJQUFpQixFQUFVLElBQWdCO1lBQTNDLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQzNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsa0NBQVUsR0FBVjtZQUFBLGlCQUtDO1lBSkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUM5RCxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSxhQUFhO1FBRHpCLDhCQUFVO3lDQUdtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQUZ0RCxhQUFhLENBWXpCO0lBWlksc0NBQWEiLCJmaWxlIjoiY29tcG9uZW50cy9RdWVyeXMvc3Ryb25nV2VhcG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3Mgc3Ryb25nV2VhcG9ucyB7XHJcbiAgICB3ZWFwb25zO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5nZXRXZWFwb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2VhcG9ucygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1dlYXBvbi9nZXRCZXN0JykudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb25zID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Querys/TotalClass',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalClass = (function () {
        function TotalClass(auth, http) {
            this.auth = auth;
            this.http = http;
            this.getTotalClass();
        }
        TotalClass.prototype.getTotalClass = function () {
            var _this = this;
            this.http.fetch('Player/getTotalClass').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.totalClass = data;
            });
        };
        return TotalClass;
    }());
    TotalClass = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], TotalClass);
    exports.TotalClass = TotalClass;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlcnlzL1RvdGFsQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxVQUFVO1FBRW5CLG9CQUFvQixJQUFpQixFQUFVLElBQWdCO1lBQTNDLFNBQUksR0FBSixJQUFJLENBQWE7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQzNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQsa0NBQWEsR0FBYjtZQUFBLGlCQUtDO1lBSkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUNwRSxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSxVQUFVO1FBRHRCLDhCQUFVO3lDQUdtQixvQ0FBVyxFQUFnQixpQ0FBVTtPQUZ0RCxVQUFVLENBWXRCO0lBWlksZ0NBQVUiLCJmaWxlIjoiY29tcG9uZW50cy9RdWVyeXMvVG90YWxDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgVG90YWxDbGFzcyB7XHJcbiAgICB0b3RhbENsYXNzO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5nZXRUb3RhbENsYXNzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWxDbGFzcygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1BsYXllci9nZXRUb3RhbENsYXNzJykudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbENsYXNzID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/Querys/TotalWeapons',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalWeapons = (function () {
        function TotalWeapons(auth, http) {
            this.auth = auth;
            this.http = http;
            this.getPlayers();
        }
        TotalWeapons.prototype.getPlayers = function () {
            var _this = this;
            this.http.fetch('Weapon/getTotalWeapons').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.players = data;
            });
        };
        TotalWeapons.prototype.getPlayersSorted = function () {
            var _this = this;
            this.http.fetch('Weapon/getTotalWeaponsSorted').then(function (response) { return response.json(); })
                .then(function (data) {
                _this.players = data;
            });
        };
        return TotalWeapons;
    }());
    TotalWeapons = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService, aurelia_fetch_client_1.HttpClient])
    ], TotalWeapons);
    exports.TotalWeapons = TotalWeapons;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUXVlcnlzL1RvdGFsV2VhcG9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFPQSxJQUFhLFlBQVk7UUFFckIsc0JBQW9CLElBQWlCLEVBQVUsSUFBZ0I7WUFBM0MsU0FBSSxHQUFKLElBQUksQ0FBYTtZQUFVLFNBQUksR0FBSixJQUFJLENBQVk7WUFDM0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxpQ0FBVSxHQUFWO1lBQUEsaUJBS0M7WUFKRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQ3RFLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsdUNBQWdCLEdBQWhCO1lBQUEsaUJBS0M7WUFKRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQzVFLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQWxCQSxBQWtCQyxJQUFBO0lBbEJZLFlBQVk7UUFEeEIsOEJBQVU7eUNBR21CLG9DQUFXLEVBQWdCLGlDQUFVO09BRnRELFlBQVksQ0FrQnhCO0lBbEJZLG9DQUFZIiwiZmlsZSI6ImNvbXBvbmVudHMvUXVlcnlzL1RvdGFsV2VhcG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCJcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXHJcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcblxyXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3MgVG90YWxXZWFwb25zIHtcclxuICAgIHBsYXllcnM7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgICAgICB0aGlzLmdldFBsYXllcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQbGF5ZXJzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnV2VhcG9uL2dldFRvdGFsV2VhcG9ucycpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVycyA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0UGxheWVyc1NvcnRlZCgpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ1dlYXBvbi9nZXRUb3RhbFdlYXBvbnNTb3J0ZWQnKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnMgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('text!app.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n\r\n          <a class=\"navbar-brand\">\r\n            DestinyFinder\r\n          </a>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li show.bind=\"!authenticated\">\r\n              <a route-href=\"route: Register\">Register</a>\r\n            </li>\r\n\r\n            <li show.bind=\"!authenticated\">\r\n              <a route-href=\"route: Login\">Login</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Character\">Character</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Weapons\">Weapons</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Quests\">Quests</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Bounties\">Bounties</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Fight\">Fight</a>\r\n            </li>\r\n            <li show.bind=\"authenticated\">\r\n              <a route-href=\"route: Querys\">Querys(FUN2)</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"#\" click.delegate=\"logout()\" show.bind=\"authenticated\">\r\n                Uitloggen\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <div class=\"container\">\r\n      <router-view></router-view>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Bounties.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Bounties.</h2>\r\n    <p>Hier ziet u een overzicht van al je Bounties.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Voeg Bounty toe</button>\r\n      <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Bounty's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"userEmail\">Locatie</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"location\" value.bind=\"location\" required>\r\n                <span class=\"help-block\">Vul de locatie van de Bounty in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"password\">Omschrijving</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"description\" value.bind=\"description\" required>\r\n                <span class=\"help-block\">vul de omschrijving in van de Bounty.</span>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addBounty()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\">\r\n      </div>\r\n      <table class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Locatie</th>\r\n            <th>Omschrijving</th>\r\n            <th>voortgang</th>\r\n            <th>opties</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr repeat.for=\"bounty of playerBounties.bounties\">\r\n            <td class=\"col-md-2\">\r\n              ${bounty.location}\r\n            </td>\r\n            <td class=\"col-md-8\">\r\n              ${bounty.description}\r\n            </td>\r\n            <td class=\"col-md-2\">\r\n              ${bounty.progress}\r\n            </td>\r\n            <td class=\"col-md-2\">\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"changeProgress(bounty)\">\r\n                <span class=\"glyphicon glyphicon-ok\"></span> Voltooien/Onvoltooien\r\n              </button>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"deleteBounty(bounty)\">\r\n                <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n              </button>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Character.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-2\">\r\n        <img src=\"${playerurl}\" alt=\"\" class=\"img-rounded img-responsive\" />\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <h2 class=\"glyphicon glyphicon-user\">\r\n          ${playerstats.name}\r\n        </h2>\r\n        <h4>${playerstats.classname}</h4>\r\n        <p>\r\n          <h4 class=\"glyphicon glyphicon-fire\"><b> Level: </b>${playerstats.level}</h4>\r\n          <br />\r\n          <h4 class=\"glyphicon glyphicon-heart\"><b> HP: </b>${playerstats.hp}</h4>\r\n          <br />\r\n          <h4 class=\"glyphicon glyphicon-flash\"><b> XP tot volgende level: </b>${playerstats.xpNextLevel}</h4>\r\n        </p>\r\n        <div class=\"container\">\r\n          <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Character aanpassen</button>\r\n          <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n            <div class=\"modal-dialog\">\r\n              <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                  <h4 class=\"modal-title\">Vul jouw Character gegevens in.</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"class\">Class</label>\r\n                    <select id=\"class\" name=\"class\" class=\"form-control\" value.bind=\"className\" required>\r\n                      <option disabled selected value> -- Selecteer een class -- </option>\r\n                      <option>Hunter</option>\r\n                      <option>Titan</option>\r\n                      <option>Warlock</option>\r\n                    </select>\r\n                    <span class=\"help-block\">Verander de class om van uiterlijk te veranderen</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"HP\">HP</label>\r\n                    <input type=\"number\" class=\"form-control\" name=\"HP\" value.bind=\"HP\" required>\r\n                    <span class=\"help-block\">vul de HP in.</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"level\">Level</label>\r\n                    <input type=\"number\" class=\"form-control\" name=\"level\" value.bind=\"level\" required>\r\n                    <span class=\"help-block\">vul de level in.</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"XP\">XP tot volgende level</label>\r\n                    <input type=\"number\" class=\"form-control\" name=\"XP\" value.bind=\"XP\" required>\r\n                    <span class=\"help-block\">vul de XP tot volgende level in.</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                  <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                  <button type=\"button\" class=\"btn btn-default\" click.delegate=\"updatePlayer()\" data-dismiss=\"modal\">Aanpassen</button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Fight.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container col-md-4\">\r\n    <ul class=\"list-group\">\r\n      <li repeat.for=\"player of players\" class=\"list-group-item ${player.id === $parent.selectedID ? 'active' : ''}\">\r\n        <a click.delegate=\"$parent.select(player)\">\r\n          <h4 style=\"color:black;\" class=\"list-group-item-heading\">${player.name}</h4>\r\n          <p style=\"color:black;\" class=\"list-group-item-text\">Level: ${player.level}</p>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n  <div class=\"col-md-2\">\r\n    <img src=\"${playerurl}\" alt=\"\" class=\"img-rounded img-responsive\" />\r\n  </div>\r\n  <div class=\"col-md-6\">\r\n    <h2 class=\"glyphicon glyphicon-user\">\r\n      ${opponent.name}\r\n    </h2>\r\n    <h4>${opponent.classname}</h4>\r\n    <p>\r\n      <h4 class=\"glyphicon glyphicon-fire\"><b> Level: </b>${opponent.level}</h4>\r\n      <br />\r\n      <h4 class=\"glyphicon glyphicon-heart\"><b> HP: </b>${opponent.hp}</h4>\r\n    </p>\r\n  </div>\r\n  <div class=\"container\">\r\n    <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#Fight\">Vechten</button>\r\n    <div class=\"modal fade\" id=\"Fight\" role=\"dialog\">\r\n      <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n            <h4 class=\"modal-title\">Gevecht voorbereiden</h4>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userWeapon\">Wapen</label>\r\n              <select id=\"userWeapon\" value.bind=\"weapon\" name=\"userWeapon\" class=\"form-control\" required>\r\n                <option repeat.for=\"weapon of player.weapons\" model.bind=\"weapon\">${weapon.name} <b>damage:</b> ${weapon.damage}</option>\r\n              </select>\r\n              <span class=\"help-block\">Kies een van je wapens.</span>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n              <button type=\"button\" class=\"btn btn-default\" click.delegate=\"fight()\" data-dismiss=\"modal\">Vechten</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Login.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">Login op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"login()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" required name=\"name\" value.bind=\"name\">\r\n              <span class=\"help-block\">Vul hier jouw gekozen naam in.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"modal-body\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" required name=\"password\" value.bind=\"password\">\r\n                  <span class=\"help-block\">Vul jouw wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Quests.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Quests.</h2>\r\n    <p>Hier ziet u een overzicht van al je quests.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">Voeg Quest toe</button>\r\n      <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Quest's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">Naam</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"name\" value.bind=\"name\" required>\r\n                <span class=\"help-block\">Vul de naam van de Quest in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <h4>Vul de QuestRequirement's gegevens in.</h4>\r\n                <label for=\"password\">Omschrijving</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"description\" value.bind=\"description\" required>\r\n                <span class=\"help-block\">Vul de omschrijving in van de Requirement.</span>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addRequirement()\">Voeg requirement toe.</button>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addQuest()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\">\r\n        <div class=\"row\" repeat.for=\"quest of playerQuests.quests\">\r\n          <div class=\"col\">\r\n            <h4><b>${quest.description} ${quest.progress}</b></h4>\r\n            <div class=\"col\" repeat.for=\"requirement of quest.requirements\">\r\n              ${requirement.description}\r\n              <b> ${requirement.progress}</b>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"changeProgress(requirement)\">\r\n                <span class=\"glyphicon glyphicon-ok\"></span> Voltooien/Onvoltooien\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Register.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>\r\n          <h4 class=\"modal-title\">registreer op DestinyFinder.</h4>\r\n        </div>\r\n        <form method=\"POST\" submit.delegate=\"register()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"userEmail\">Naam</label>\r\n              <input type=\"text\" class=\"form-control\" name=\"name\" value.bind=\"name\" required>\r\n              <span class=\"help-block\">Jouw naam wordt ook gebruikt bij het inloggen.</span>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"password\">Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"password\" value.bind=\"password\" required>\r\n                  <span class=\"help-block\">Vul een wachtwoord in.</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"passwordr\">Herhaal Wachtwoord</label>\r\n                  <input type=\"password\" class=\"form-control\" name=\"passwordr\" value.bind=\"passwordConfirm\" required>\r\n                  <span class=\"help-block\">Herhaal wachtwoord.</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"Class\">Class</label>\r\n                  <select id=\"classID\" name=\"classID\" class=\"form-control\" value.bind=\"classID\" required>\r\n                    <option disabled selected value> -- Selecteer een Class -- </option>\r\n                    <option>Hunter</option>\r\n                    <option>Titan</option>\r\n                    <option>Warlock</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <input type=\"hidden\" name=\"isEmpty\" value=\"\">\r\n            <button type=\"submit\" name=\"submit\" value=\"newAccount\" class=\"btn btn-success btn-icon\"><i class=\"fa fa-check\"></i> Inloggen</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Weapons.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h2>Wapens.</h2>\r\n    <p>Hier ziet u een overzicht van al je wapens.</p>\r\n    <div class=\"container\">\r\n      <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#newWeapon\">Voeg Wapen toe</button>\r\n      <div class=\"modal fade\" id=\"newWeapon\" role=\"dialog\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n              <h4 class=\"modal-title\">Vul de Wapen's gegevens in.</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">naam</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"name\" value.bind=\"name\" required>\r\n                <span class=\"help-block\">Vul de naam in van de Wapen in.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"damage\">damage</label>\r\n                <input type=\"number\" class=\"form-control\" name=\"damage\" value.bind=\"damage\" required>\r\n                <span class=\"help-block\">vul de damage in van de Wapen.</span>\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <label for=\"password\">minlevel</label>\r\n                <input type=\"number\" class=\"form-control\" name=\"minlevel\" value.bind=\"minlevel\" required>\r\n                <span class=\"help-block\">vul de minimale level in van de Wapen.</span>\r\n              </div>\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                <button type=\"button\" class=\"btn btn-default\" click.delegate=\"addWeapon()\" data-dismiss=\"modal\">Toevoegen</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\n      <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"randomWeapon()\">\r\n         Trigger: random wapen krijgen\r\n      </button>\r\n      <div class=\"container\">\r\n      </div>\r\n      <table class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Naam</th>\r\n            <th>Damage</th>\r\n            <th>Minimale level</th>\r\n            <th>opties</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr repeat.for=\"weapon of weaponsplayer.weapons\">\r\n            <td class=\"col-md-4\">\r\n              ${weapon.name}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              ${weapon.damage}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              ${weapon.minLevel}\r\n            </td>\r\n            <td class=\"col-md-4\">\r\n              <button type=\"button\" click.bind=\"selectedWeapon\" class=\"btn btn-default btn-sm\" data-toggle=\"modal\" data-target=\"#editWeapon\">\r\n                <span class=\"glyphicon glyphicon-edit\"></span> aanpassen\r\n              </button>\r\n              <div class=\"modal fade\" id=\"editWeapon\" role=\"dialog\">\r\n                <div class=\"modal-dialog\">\r\n                  <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n                      <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                      <h4 class=\"modal-title\">Vul de Wapen's gegevens in.</h4>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"name\">naam</label>\r\n                        <input type=\"text\" class=\"form-control\" name=\"name\" value.bind=\"name\" required>\r\n                        <span class=\"help-block\">Vul de naam in van de Wapen in.</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"damage\">damage</label>\r\n                        <input type=\"number\" class=\"form-control\" name=\"damage\" value.bind=\"damage\" required>\r\n                        <span class=\"help-block\">vul de damage in van de Wapen.</span>\r\n                      </div>\r\n                      <div class=\"form-group\">\r\n                        <label for=\"password\">minlevel</label>\r\n                        <input type=\"number\" class=\"form-control\" name=\"minlevel\" value.bind=\"minlevel\" required>\r\n                        <span class=\"help-block\">vul de minimale level in van de Wapen.</span>\r\n                      </div>\r\n                      <div class=\"modal-footer\">\r\n                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annuleren</button>\r\n                        <button type=\"button\" class=\"btn btn-default\" click.delegate=\"editWeapon(weapon)\" data-dismiss=\"modal\">Aanpassen</button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <button type=\"button\" class=\"btn btn-default btn-sm\" click.delegate=\"deleteWeapon(weapon)\">\r\n                <span class=\"glyphicon glyphicon-remove\"></span> verwijderen\r\n              </button>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/Querys/AllWeapons.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>\r\n    Alle wapens met Speler ophalen.\r\n  </h1>\r\n  <a route-href=\"route: Querys\" class=\"btn btn-primary\">\r\n    Ga terug\r\n  </a>\r\n  <div class=\"container\">\r\n  </div>\r\n  <table class=\"table\">\r\n    <thead>\r\n      <tr>\r\n        <th>Speler's Naam</th>\r\n        <th>Wapen's Naam</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr repeat.for=\"player of players\">\r\n        <td class=\"col-md-6\">\r\n          ${player.name}\r\n        </td>\r\n        <td class=\"col-md-4\">\r\n          ${player.weapon}\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>"; });
define('text!components/Querys/AverageDamage.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>\r\n    Spelers ophalen dat lager dan de gemiddelde damage hebben.\r\n  </h1>\r\n  <a route-href=\"route: Querys\" class=\"btn btn-primary\">\r\n    Ga terug\r\n  </a>\r\n  <div class=\"container\">\r\n  </div>\r\n  <table class=\"table\">\r\n    <thead>\r\n      <tr>\r\n        <th>Naam</th>\r\n        <th>Gemiddelde damage</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr repeat.for=\"player of players\">\r\n        <td class=\"col-md-6\">\r\n          ${player.name}\r\n        </td>\r\n        <td class=\"col-md-4\">\r\n          ${player.avgDamage}\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>"; });
define('text!components/Querys/mainQuest.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>\r\n    Subquests ophalen van de Main Quest met als ID 1.\r\n  </h1>\r\n  <a route-href=\"route: Querys\" class=\"btn btn-primary\">\r\n    Ga terug\r\n  </a>\r\n  <div class=\"container\">\r\n  </div>\r\n  <table class=\"table\">\r\n    <thead>\r\n      <tr>\r\n        <th>Naam</th>\r\n        <th>MainQuestNumber</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr repeat.for=\"quest of quests\">\r\n        <td class=\"col-md-6\">\r\n          ${quest.description}\r\n        </td>\r\n        <td class=\"col-md-4\">\r\n          ${quest.mainQuestID}\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>"; });
define('text!components/Querys/Querys.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>\r\n  Voor FUN2 moest ik zelf geschreven Query's implementeren op mijn applicatie.\r\n  Hierbij dus verschillende opties om de Query's uit te voeren.\r\n  </h1>\r\n  <a route-href=\"route: BestWeapons\" class=\"btn btn-primary\">\r\n    Sterke wapens\r\n  </a>\r\n  <a route-href=\"route: AvgDamage\" class=\"btn btn-success\">\r\n    Spelers met lager dan de gemiddelde damage\r\n  </a>\r\n  <a route-href=\"route: MainQuest\" class=\"btn btn-info\">\r\n    SubQuesten van een bepaalde main Quest\r\n  </a>\r\n  <a route-href=\"route: AllWeapons\" class=\"btn btn-warning\">\r\n     Alle wapens met speler ophalen\r\n   </a>\r\n   <a route-href=\"route: TotalWeapons\" class=\"btn btn-danger\">\r\n     Aantal wapens van spelers ophalen\r\n   </a>\r\n  <a route-href=\"route: TotalClass\" class=\"btn btn-default\">\r\n    Aantal spelers per klasse ophalen\r\n  </a>\r\n</template>"; });
define('text!components/Querys/strongWeapons.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>\r\n    Wapens boven damage van 300 ophalen.\r\n  </h1>\r\n  <a route-href=\"route: Querys\" class=\"btn btn-primary\">\r\n    Ga terug\r\n  </a>\r\n  <div class=\"container\">\r\n  </div>\r\n  <table class=\"table\">\r\n    <thead>\r\n      <tr>\r\n        <th>Naam</th>\r\n        <th>Damage</th>\r\n        <th>Minimale level</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr repeat.for=\"weapon of weapons\">\r\n        <td class=\"col-md-6\">\r\n          ${weapon.name}\r\n        </td>\r\n        <td class=\"col-md-4\">\r\n          ${weapon.damage}\r\n        </td>\r\n        <td class=\"col-md-4\">\r\n          ${weapon.minLevel}\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>"; });
define('text!components/Querys/TotalClass.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>\r\n    Aantal spelers per klasse ophalen.\r\n  </h1>\r\n  <a route-href=\"route: Querys\" class=\"btn btn-primary\">\r\n    Ga terug\r\n  </a>\r\n  <div class=\"container\">\r\n  </div>\r\n  <table class=\"table\">\r\n    <thead>\r\n      <tr>\r\n        <th>klasse</th>\r\n        <th>Totaal aantal spelers</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr repeat.for=\"class of totalClass\">\r\n        <td class=\"col-md-6\">\r\n          ${class.name}\r\n        </td>\r\n        <td class=\"col-md-4\">\r\n          ${class.total}\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>"; });
define('text!components/Querys/TotalWeapons.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>\r\n    Aantal wapens van Speler ophalen.\r\n  </h1>\r\n  <a route-href=\"route: Querys\" class=\"btn btn-primary\">\r\n    Ga terug\r\n  </a>\r\n  <a click.delegate=\"getPlayersSorted()\" class=\"btn btn-primary\">\r\n    Sorteren op totaal aantal wapens\r\n    </a>\r\n    <div class=\"container\">\r\n    </div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th>Speler's Naam</th>\r\n          <th>Aantal wapens</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr repeat.for=\"player of players\">\r\n          <td class=\"col-md-6\">\r\n            ${player.name}\r\n          </td>\r\n          <td class=\"col-md-4\">\r\n            ${player.weapon}\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map