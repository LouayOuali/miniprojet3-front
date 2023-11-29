import { Band } from "./band.model";
import { Image } from "./image.model";


export class Musicien { 
    idMusicien?: number; 
    nomMusicien?: string; 
    experienceYear?: number;
    salaire?: number; 
    instrument?: string; 
    band!: Band;

    image! : Image;
    imageStr!:string;

    images!: Image[];
}