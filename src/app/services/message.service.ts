import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  async sendMessage(body) {
    console.log({body});
    return this.http.get(`http://localhost:3000/mailgun?firstName=`+body.firstName+`&lastName=`+body.lastName+`&email=`+body.email+`&phoneNumber=`+body.phoneNumber+`&description=`+body.description+`&form_type=`+body.form_type + ``).subscribe()
  }
}
