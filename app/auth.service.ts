import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // users: User[] = [
  //   {"username" : "admin","password": "123","roles":['ADMIN']},
  //   {"username" : "louay","password": "123","roles":['USER']}
  // ];

  public loggedUser?: string;
  public isLoggedIn: Boolean = false;
  public roles? : string[];

  apiURL: string = 'http://localhost:8081/users'; 
  token!:string;

  private helper = new JwtHelperService();
  constructor(private router: Router,private http: HttpClient) { }

  // logOut() {
  //   this.isLoggedIn = false;
  //   this.loggedUser = undefined;
  //   this.roles = undefined;
  //   localStorage.removeItem(this.loggedUser!);
  //   localStorage.setItem('isLoggedIn',String(this.isLoggedIn));
  //   this.router.navigate(['/login']);
  // };

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
    }

  // signIn(user : User) {
  //   let validUser: Boolean = false;
  //   this.users.forEach((curUser) => {
  //     if(user.username == curUser.username && user.password == curUser.password) {
  //       validUser = true;
  //       this.isLoggedIn = true;
  //       this.roles = curUser.roles;
  //       localStorage.setItem('loggedUser',this.loggedUser!);
  //       localStorage.setItem('isLoggedIn',String(this.isLoggedIn));

  //     }
  //   });
  //   return validUser;
  // }

  // isAdmin(): Boolean {
  //   if(!this.roles)
  //   return false;
  // return (this.roles.indexOf('ADMIN') >- 1);
  // }

  setLogegdUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isLoggedIn = true;
    //this.getUserRoles(login);
  }

  // getUserRoles(username : string) {
  //   this.users.forEach((curUser)=> {
  //     if( curUser.username == username) {
  //       this.roles = curUser.roles;
  //     }
  //   })
  // }

  login(user : User) {
    return this.http.post<User>(this.apiURL+'/login',user, {observe:'response'});
  }

  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isLoggedIn = true; 
    this.decodeJWT();

}

decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  getToken() {
    return this.token;
  }

  isTokenExpired(): Boolean
  {
    return  this.helper.isTokenExpired(this.token);   
  }

  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    ;
  } 
  
}
