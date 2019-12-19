import { Component, OnInit } from '@angular/core';
import { DonationForm} from '../donation-form';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }
  
  model = new DonationForm('','','','','',"Donation");

  submitted = false;

  onSubmit() {
    console.log('First Name On Submit: ', this.model.firstName);
    this.submitted = true;

    // this.model= new DonationForm()
    // console.log(model.firstName);
    this.messageService.sendMessage(this.model);
  };

  get diagnostic() {return JSON.stringify(this.model);}

  // newDonationForm() {
  //   this.model = new DonationForm('', '', '','','');
  // }

}
