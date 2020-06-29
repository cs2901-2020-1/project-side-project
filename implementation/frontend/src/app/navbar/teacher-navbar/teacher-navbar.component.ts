import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-teacher-navbar',
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.css']
})
export class TeacherNavbarComponent implements OnInit {

  fullName: string;

  constructor(
    private authService: AuthService
  ) {
    this.fullName = authService.currentUserFullName();
    console.log(this.fullName)
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }
}
