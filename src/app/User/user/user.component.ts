import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser, UserModel } from '../../models/user.interface';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: UserModel[] = [];
  titlePage = 'Atención al Cliente';
  loader = true;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.service.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.content;
          this.loader = false;
        } else {
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message ?? '',
          });
        }
      },
      error: (error: any) => {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
        });
        this.loader = false;
      },
    });
  }
}
