import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-curador-navbar',
  templateUrl: './curador-navbar.component.html',
  styleUrls: ['./curador-navbar.component.css']
})
export class CuradorNavbarComponent implements OnInit {

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
