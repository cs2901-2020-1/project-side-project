import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent implements OnInit {

  fullName: string;

  constructor(
    private authService: AuthService
  ) {
    this.fullName = authService.currentUserFullName();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

}
