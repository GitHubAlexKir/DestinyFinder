import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Quest {
    player;
    playerQuests;
    selectedQuest;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.quests();
    }

    quests() {
        this.player = new Player(jwt_decode(this.auth.getAccessToken()).userid);
        return this.http.fetch('Player/get', {
            body: json(this.player)
        }).then(response => response.json())
            .then(data => {
                this.playerQuests = data;
            });
    }

    changeProgress(quest) {
        this.selectedQuest = new selectedQuest(quest.id, quest.progress);
        this.http.fetch('Quest/setQuestRequirement', {
            body: json(this.selectedQuest)
        });
        this.quests();
    }
}

export class Player {
    ID: string;
    constructor(ID: string) {
        this.ID = ID;
    }
}

export class selectedQuest {
    ID: string;
    progress: string;
    constructor(ID: string, progress: string) {
        this.ID = ID;
        this.progress = progress;
    }
}