import { Component } from '@angular/core';
import { AuthService } from './shared/services';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private authService: AuthService,
    private bnIdle: BnNgIdleService) {
    /*
    this.bnIdle.startWatching(1000).subscribe((res) => {
      if (res) {
        console.log('session expired');
        this.authService.logout();
      }
    });
    */
  }
}
