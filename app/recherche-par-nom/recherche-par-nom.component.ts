import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Musicien } from '../model/musicien.model';
import { MusicienService } from '../musicien.service';


@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent {

  nomMusicien! : string;
  musiciens!: Musicien[];
  allMusiciens! : Musicien[];
  searchTerm!: string;
  constructor(private musicienService: MusicienService) {}

  ngOnInit(): void {
    this.musicienService.listeMusiciens().subscribe(mus => {
      this.allMusiciens = mus;
    });
  }

  rechercheParNom() {
    this.musicienService.rechercheParNom(this.nomMusicien).subscribe(mus => {
      this.musiciens = mus;
    })
  }

  onKeyUp(filterText:string) {
    this.musiciens = this.allMusiciens.filter(item => item.nomMusicien!.toLowerCase().includes(filterText));
  }

}
