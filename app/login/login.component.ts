import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();
  err:number=0;

  constructor(private authService : AuthService, private router: Router) {}

  // onLoggedin() {
  //   console.log(this.user);
  //   let isValidUser: Boolean = this.authService.signIn(this.user);

  //   if(isValidUser)
  //     this.router.navigate(['/']);
  //   else
  //     this.erreur = 1;
  // }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization');
        this.authService.saveToken(jwToken!);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    })
  }
}
