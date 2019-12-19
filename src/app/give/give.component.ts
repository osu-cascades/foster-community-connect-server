import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({ templateUrl: 'give.component.html' })
export class GiveComponent {
    constructor(public messageService: MessageService) {}
    logText(){
        console.log("clicked");
        this.messageService.sendMessage("scooby");
    }
}

