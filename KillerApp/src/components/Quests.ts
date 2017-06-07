import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';

@autoinject
export class Quest {
    player;
    selectedQuest;
    name;
    description;
    requirements = [];
    requirement;
    newQuest;
    constructor(private auth: AuthService, private http: HttpClient) {
        this.quests();
    }
    //speler ophalen
    quests() {
        this.http.fetch('Player/get').then(response => response.json())
            .then(data => {
                this.player = data;
            });
    }
    //Quest status aanpassen
    changeProgress(quest) {
        this.selectedQuest = new selectedQuest(quest.id, quest.progress);
        this.http.fetch('Quest/setQuestRequirement', {
            body: json(this.selectedQuest)
        });
        this.quests();
    }
    //requirement toevoegen
    addRequirement() {
        this.requirement = new requirement(this.description);
        this.requirements.push(this.requirement);
    }
    //eigen quest toevoegen
    addQuest() {
        this.newQuest = new newQuest(this.requirements, this.name);
        this.http.fetch('Quest/addQuest', {
            body: json(this.newQuest)
        });
        this.quests();
        this.requirements = [];
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
    constructor(description: string) {
        this.description = description;
    }
}

export class newQuest {
    requirements;
    description;
    constructor(requirements, name) {
        this.requirements = requirements;
        this.description = name;
    }
}