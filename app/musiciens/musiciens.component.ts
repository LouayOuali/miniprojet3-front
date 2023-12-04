import { Component } from '@angular/core';
import { Musicien } from '../model/musicien.model';
import { MusicienService } from '../musicien.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-musiciens',
  templateUrl: './musiciens.component.html',
  styleUrls: ['./musiciens.component.css']
})
export class MusiciensComponent {
  musiciens : Musicien[] = [];
  apiurl:string='http://localhost:8080/musiciens/api';
  constructor(private musicienService: MusicienService, public authService : AuthService) {
    //  this.musiciens = this.musicienService.listeMusiciens();
  }
  
  ngOnInit(): void {
    this.chargerMusicien();
  }

  chargerMusicien(){
    this.musicienService.listeMusiciens().subscribe(mus => {
    this.musiciens = mus;
    this.musiciens.forEach((m) => {
    m.imageStr = 'data:' + m.images[0].type + ';base64,' + 
    m.images[0].image;
    }); 
    });
    }

  // chargerMusicien(){ 
  //   this.musicienService.listeMusiciens().subscribe(muss => 
  //     { this.musiciens = muss; this.musiciens.forEach((m) => { 
  //       this.musicienService 
  //         .loadImage(m.image.idImage) 
  //         .subscribe((img: Image) => { 
  //           m.imageStr = 'data:' + img.type + ';base64,' + img.image; 
  //         }); 
  //       }); 
  //     }); 
  //   }
  



  

  supprimerMusicien(m: Musicien) {
    let conf = confirm("Etes-vous sur ?");
    if (conf)
      this.musicienService.supprimerMusicien(m.idMusicien!).subscribe(() => {
        console.log("produit supprimé");
        this.chargerMusicien();
     });
  }

  modifierMusicien(m: Musicien) {
    
  }
}

