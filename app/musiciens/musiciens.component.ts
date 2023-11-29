import { Component } from '@angular/core';
import { Musicien } from '../model/musicien.model';
import { MusicienService } from '../musicien.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


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
    this.chargerProduit();
  }

  chargerProduit(): void {
    this.musicienService.listeMusiciens().subscribe(mus => {
      console.log(mus);
      this.musiciens = mus
    })
  }



  

  supprimerMusicien(m: Musicien) {
    let conf = confirm("Etes-vous sur ?");
    if (conf)
      this.musicienService.supprimerMusicien(m.idMusicien!).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduit();
     });
  }

  modifierMusicien(m: Musicien) {
    
  }
}

