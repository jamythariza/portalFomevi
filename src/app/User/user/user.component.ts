import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service'
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: IUser[] = [];
  titlePage = "Atención al Cliente";
  loader = true;
  
    constructor(  private service: UserService) { 
      this.get();
    }
    
    ngOnInit(): void { 
    }
  
    get(){    
      this.service.getAll().subscribe(news => {
        this.users = news;
        this.loader = false;
      })
    }
}
