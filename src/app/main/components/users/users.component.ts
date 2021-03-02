import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  userType: string = 'tim';

  constructor() { }

  ngOnInit(): void {
  }

  onChange(userTypeValue) {
    this.userType = userTypeValue;
  }
}
