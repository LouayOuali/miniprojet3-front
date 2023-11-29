import { Component } from '@angular/core';
import { Band } from '../model/band.model';
import { MusicienService } from '../musicien.service';

@Component({
  selector: 'app-liste-bands',
  templateUrl: './liste-bands.component.html',
  styleUrls: ['./liste-bands.component.css']
})
export class ListeBandsComponent {
  ajout:boolean=true;

  bands! : Band[];
  updatedBand: Band = {"idBand":0,"nomBand":""};
  constructor(private musicienService: MusicienService) {}

  ngOnInit(): void {
    // this.musicienService.listeBands().
    // subscribe(bands => {this.bands = bands._embedded.bands;
    //   console.log(bands);
    // });
    this.chargerBands()
  }

  bandUpdated(band: Band) {
    console.log("Band updated event",band);
    this.musicienService.ajouterBand(band).
    subscribe( ()=> this.chargerBands());
  }

  chargerBands() {
    this.musicienService.listeBands().
    subscribe(bands => {this.bands = bands._embedded.bands;
    console.log(bands);
  });
  }

  updateBand(band: Band) {
    this.updatedBand = band;
    this.ajout=false;
  }

}
