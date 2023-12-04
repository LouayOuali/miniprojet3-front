import { Component } from '@angular/core';
import { Musicien } from '../model/musicien.model';
import { MusicienService } from '../musicien.service';
import { Band } from '../model/band.model';
import { Router } from '@angular/router';
import { BandWrapper } from '../model/bandWrapper.model';
import { Image } from '../model/image.model';



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
  // addMusicien() {
  //   // this.newBand = this.musicienService.consulterBand(this.newIdBand);
  //   // this.newMusicien.band = this.newBand;
  //   this.newMusicien.band = this.bands.find(band => band.idBand == this.newIdBand)!;
  //   this.musicienService.ajouterMusicien(this.newMusicien).subscribe(mus => {
  //     this.musicienService.uploadImageFS(this.uploadedImage,this.uploadedImage.name,mus.idMusicien!).subscribe((response:any) => {})
  //     console.log(mus);
  //     this.router.navigate(['musiciens'])
  //   });}

  // addMusicien(){
  //   this.musicienService
  //   .uploadImage(this.uploadedImage, this.uploadedImage.name)
  //   .subscribe((img: Image) => {
  //   this.newMusicien.image=img;
  //   this.newMusicien.band = this.bands.find(band => band.idBand
  //   == this.newIdBand)!;
  //   this.musicienService
  //   .ajouterMusicien(this.newMusicien)
  //   .subscribe(() => {
  //   this.router.navigate(['musiciens']);
  //   });
  //   });
  // }


  addMusicien() {
    // Step 1: Add the new plat
    this.musicienService.ajouterMusicien(this.newMusicien)
      .subscribe((addedMusicien: Musicien) => {
        // Step 2: Upload the image
        this.musicienService.uploadImageMus(this.uploadedImage, this.uploadedImage.name , addedMusicien.idMusicien!)
          .subscribe((img: Image) => {
            // Step 3: Associate the image with the new plat
            addedMusicien.band = this.bands.find(cat => cat.idBand == this.newIdBand)!;
            img.idMus = addedMusicien.idMusicien!;
            console.log(addedMusicien.idMusicien)
            console.log(img.idMus); // Assuming idPlat is the ID property of Plat
            addedMusicien.image = img;
  
            // Step 4: Update the plat with the associated image
            this.musicienService.updateMusicien(addedMusicien)
              .subscribe(() => {
                this.router.navigate(['musiciens']);
              });
          });
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }

}
