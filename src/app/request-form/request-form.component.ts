import { Component, OnInit } from '@angular/core';
import { DonationForm} from '../donation-form';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }
  
  model = new DonationForm('','','','','',"Request");

  submitted = false;

  onSubmit() {
    // console.log('First Name On Submit: ', this.model.firstName);
    this.submitted = true;

    this.messageService.sendMessage(this.model);
  };

  get diagnostic() {return JSON.stringify(this.model);}

}
