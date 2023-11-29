import { Injectable } from '@angular/core';
import { Musicien } from './model/musicien.model';
import { MusiciensComponent } from './musiciens/musiciens.component';
import { Band } from './model/band.model';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BandWrapper } from './model/bandWrapper.model';
import { Router } from '@angular/router';
import { User } from './model/user.model';
import { AuthService } from './auth.service';
import { Image } from './model/image.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  apiURL: string = 'http://localhost:8080/musiciens/api';
  apiURLBand: string = 'http://localhost:8080/musiciens/band';

  musiciens : Musicien[]=[];
  musicien!: Musicien;
  bands : Band[]=[];
  token!:string;
  constructor( private http : HttpClient,private authService: AuthService) {
  //   this.bands = [
  //     {idBand: 1, nomBand:"Pink Floyd"},
  //     {idBand: 2, nomBand:"Nirvana"}
  //   ]
  //   this.musiciens = [
  //     {idMusicien: 1, nomMusicien:"Louay Ouali",experienceYear:4,instrument:"Guitare electrique",salaire:1600, band : {idBand:1, nomBand:"Pink Floyd"}},
  //     {idMusicien: 3, nomMusicien:"Mariem",experienceYear:4,instrument:"Piano",salaire:1200, band : {idBand:1, nomBand:"Pink Floyd"}},
  //     {idMusicien: 4, nomMusicien:"Ramzi",experienceYear:3,instrument:"Bongo",salaire:700, band : {idBand:2, nomBand:"Nirvana"}},
  // ];
   }

  

  listeBands(): Observable<BandWrapper> {
    let jwt =  this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<BandWrapper>(this.apiURLBand,{headers:httpHeaders});
  }

  consulterBand(id:number): Band {
    return this.bands.find(band => band.idBand == id)!;
  }

  // listeMusiciens(): Observable<Musicien[]> {
  // return this.http.get<Musicien[]>(this.apiURL);
  // }

  // listeMusiciens(): Observable<Musicien[]> {
  //   let jwt = this.authService.getToken();
  //   jwt = "Bearer "+jwt;
  //   let httpHeaders = new HttpHeaders({"Authorization":jwt})
  //   return this.http.get<Musicien[]>(this.apiURL+"/all",{headers:httpHeaders})
  // }

  listeMusiciens(): Observable<Musicien[]> {
    return this.http.get<Musicien[]>(this.apiURL+"/all");
  }

  ajouterMusicien(mus : Musicien): Observable<Musicien> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
  return this.http.post<Musicien>(this.apiURL+"/addMus", mus, {headers:httpHeaders});
  }

  supprimerMusicien(id : number) {
  const url= `${this.apiURL}/delMus/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.delete(url, {headers:httpHeaders});
  }

  consulterMusicien(id: number): Observable<Musicien> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<Musicien>(url,{headers:httpHeaders});
  }

  updateMusicien(m : Musicien) : Observable<Musicien> {
    // this.supprimerMusicien(m.idMusicien!);
    // this.ajouterMusicien(m);
    // this.trierMusicien();
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.put<Musicien>(this.apiURL+"/updateMus",m,{headers:httpHeaders});
  }

  trierMusicien() {
    this.musiciens = this.musiciens.sort((n1,n2) => {
      if(n1.idMusicien! > n2.idMusicien!) {
        return 1;
      }
      if(n1.idMusicien! < n2.idMusicien!) {
        return -1;
      }
      return 0;

    });
  }

  rechercherParBand(idBand: number): Observable<Musicien[]> {
    const url = `${this.apiURL}/bands/${idBand}`;
    return this.http.get<Musicien[]>(url);
  }

  rechercheParNom(nom: string): Observable<Musicien[]> {
    const url = `${this.apiURL}/musByName/${nom}`;
    return this.http.get<Musicien[]>(url);
  }

  ajouterBand(band: Band):Observable<Band>  {
    return this.http.post<Band>(this.apiURLBand,band,httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
    }


    loadImage(id: number): Observable<Image> {
      const url = `${this.apiURL + '/image/get/info'}/${id}`;
      return this.http.get<Image>(url);
      }


      uploadImageMus(file: File, filename: string, idMus:number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uplaodImageMus'}/${idMus}`;
        return this.http.post(url, imageFormData);
     }
        
     supprimerImage(id : number) {
      const url = `${this.apiURL}/image/delete/${id}`;
      return this.http.delete(url, httpOptions);
      }
      

      uploadImageFS(file: File, filename: string, idMus : number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uploadFS'}/${idMus}`;
        return this.http.post(url, imageFormData);
      }

      

       loadImageFS(id: number): Observable<Image> {
         const url = `${this.apiURL + '/loadfromFS'}/${id}`;
         return this.http.get<Image>(url);
         }



}
