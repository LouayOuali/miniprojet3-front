import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MiniProjet';

  constructor(public authService : AuthService,private router : Router) {}
  // ngOnInit() {
  //   let isloggedin;
  //   let loggedUser;
  //   isloggedin = localStorage.getItem('isloggedIn');
  //   loggedUser = localStorage.getItem('loggedUser');

  //   if(isloggedin!="true" || !loggedUser)
  //     this.router.navigate(['/login']);
  //   else
  //     this.authService.setLogegdUserFromLocalStorage(loggedUser);

  // }
  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken()==null || 
        this.authService.isTokenExpired())
          this.router.navigate(['/login']);

  }

  onLogout(){
    this.authService.logout();
  }
}
