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
    name;
    description;
    requirements = [];
    requirement;
    newQuest;
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
    addRequirement() {
        this.requirement = new requirement(this.description);
        this.requirements.push(this.requirement);
    }
    addQuest() {
        this.newQuest = new newQuest(this.requirements, this.name, this.player.ID);
        console.log(this.newQuest);
        this.http.fetch('Quest/addQuest', {
            body: json(this.newQuest)
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

export class requirement {
    description: string;
    constructor(description: string)
    {
        this.description = description;
    }
}

export class newQuest {
    requirements;
    description;
    ID;
    constructor(requirements, name, userID)
    {
        this.requirements = requirements;
        this.description= name;
        this.ID = userID;
    }
}