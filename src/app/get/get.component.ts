import { Component } from '@angular/core';
//import {HttpClient} from '@angular/common/http';
import { MessageService } from '../services/message.service';


@Component({ templateUrl: 'get.component.html' })
export class GetComponent {
    constructor(public messageService: MessageService) {}
    logText(){
        this.messageService.sendMessage("scooby");
        console.log("clicked");
    }
}
