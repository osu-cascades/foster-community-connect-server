import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cofpa-inventory';
  // readonly ROOT_URL = 'http://localhost:3000/ff792xyp872'
  // posts: any;
  constructor(private http: HttpClient) {}
  // getPosts() {
  //   this.posts = this.http.get(this.ROOT_URL)
  //   alert(this.posts)
  // }
}
