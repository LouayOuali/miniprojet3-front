import { Component } from '@angular/core';
import { Musicien } from '../model/musicien.model';
import { Band } from '../model/band.model';
import { MusicienService } from '../musicien.service';

@Component({
  selector: 'app-recherche-par-band',
  templateUrl: './recherche-par-band.component.html',
  styleUrls: ['./recherche-par-band.component.css']
})
export class RechercheParBandComponent {

  musiciens! : Musicien[];
  IdBand! : number;
  bands! : Band[];

  constructor(private musicienService: MusicienService) {}

  ngOnInit(): void {
    this.musicienService.listeBands().subscribe(bands => {
      this.bands = bands._embedded.bands;
      console.log(bands);
    });
  }
 
  onChange() {
    this.musicienService.rechercherParBand(this.IdBand).subscribe(mus => {
      this.musiciens = mus;
    })
  }
}
