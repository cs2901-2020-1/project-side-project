import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role: any = null;

  constructor(private authService: AuthService) {
    this.role = authService.currentUserRole()
  }

  ngOnInit(): void {
  }
}
