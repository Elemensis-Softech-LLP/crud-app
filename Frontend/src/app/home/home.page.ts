import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public users : any;
  constructor(private data: DataService) {
    this.getUsers();
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  async getUsers(){
    this.data.getUsers().subscribe((users: any) => {
        this.users = users;
    }, error => {
      console.log(error);
    });
  }

}
