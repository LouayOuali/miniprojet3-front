import { Component } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { MusicienService } from '../musicien.service';
import { Musicien } from '../model/musicien.model';
import { Band } from '../model/band.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-musicien',
  templateUrl: './update-musicien.component.html',
  styleUrls: ['./update-musicien.component.css']
})
export class UpdateMusicienComponent {
  currentMusicien = new Musicien();

  bands! : Band[];
  updatedBandId! : number;

  myImage! :string;

  uploadedImage!: File;
  isImageUpdated: Boolean=false;

  constructor(private activatedRoute: ActivatedRoute, private musicienService: MusicienService, private router: Router) {}


  ngOnInit(): void {
    this.musicienService.listeBands().
    subscribe(bands => {this.bands = bands._embedded.bands;
    });
    this.musicienService.consulterMusicien(this.activatedRoute.snapshot.params['id'])
    .subscribe( mus =>{ this.currentMusicien = mus;
    this.updatedBandId = mus.band.idBand;
    } ) ;
    }

  // ngOnInit(): void {
  //   this.musicienService.listeBands().subscribe(bands => {
  //     this.bands = bands._embedded.bands;
  //     console.log(bands);
  //   });
  //   this.musicienService.consulterMusicien(this.activatedRoute.snapshot.params['id']).subscribe(mus => {
  //     this.currentMusicien = mus;
  //     this.updatedBandId = this.currentMusicien.band.idBand;
  //   })
  // }

  updateMusicien() {
    // this.musicienService.updateMusicien(this.currentMusicien).subscribe(mus => {
    //   this.router.navigate(['musiciens']);
    // })

    this.currentMusicien.band = this.bands.find(band => band.idBand == this.updatedBandId)!;
    this.musicienService.updateMusicien(this.currentMusicien).subscribe(mus => {
      this.router.navigate(['musiciens']);
    })
  }

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageMusicien(){
    this.musicienService
    .uploadImageMus(this.uploadedImage,this.uploadedImage.name,this.currentMusicien.idMusicien!)
        .subscribe( (img : Image) => {
              this.currentMusicien.images.push(img);
           });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.musicienService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentMusicien.images 
        const index = this.currentMusicien.images.indexOf(img, 0);
        if (index > -1) {
          this.currentMusicien.images.splice(index, 1);
        }
      });
  }

}
