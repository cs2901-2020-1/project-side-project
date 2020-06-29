import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role: any = null;

  constructor(authService: AuthService) {
    if (!authService.isTokenExpired())
      this.role = authService.currentUserRole()
  }

  public ngOnInit() {
  }
}
