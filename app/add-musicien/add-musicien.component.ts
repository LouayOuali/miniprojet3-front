import { Component } from '@angular/core';
import { Musicien } from '../model/musicien.model';
import { MusicienService } from '../musicien.service';
import { Band } from '../model/band.model';
import { Router } from '@angular/router';
import { BandWrapper } from '../model/bandWrapper.model';



@Component({
  selector: 'app-add-musicien',
  templateUrl: './add-musicien.component.html',
  styleUrls: ['./add-musicien.component.css']
})
export class AddMusicienComponent {
  newMusicien = new Musicien();
  bands! : Band[];
  newIdBand! : number;
  newBand! : Band;

  uploadedImage!: File;
  imagePath: any;

  constructor(private musicienService: MusicienService, private router: Router) { }
  ngOnInit(): void {
    
    this.musicienService.listeBands().subscribe(bands => {
      this.bands = bands._embedded.bands;
    })
  }
  addMusicien() {
    // this.newBand = this.musicienService.consulterBand(this.newIdBand);
    // this.newMusicien.band = this.newBand;
    this.newMusicien.band = this.bands.find(band => band.idBand == this.newIdBand)!;
    this.musicienService.ajouterMusicien(this.newMusicien).subscribe(mus => {
      this.musicienService.uploadImageFS(this.uploadedImage,this.uploadedImage.name,mus.idMusicien!).subscribe((response:any) => {})
      console.log(mus);
      this.router.navigate(['musiciens'])
    });
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }

}
