import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Band } from '../model/band.model';

@Component({
  selector: 'app-update-band',
  templateUrl: './update-band.component.html',
  styleUrls: ['./update-band.component.css']
})
export class UpdateBandComponent {
@Input()
band! : Band;

@Input()
ajout!:boolean;

@Output()
bandUpdated = new EventEmitter<Band>();



ngOnInit(): void {
  //console.log("ngOnInit du composant UpdateBand",this.band);
}

saveBand() {
  this.bandUpdated.emit(this.band);
}
}
