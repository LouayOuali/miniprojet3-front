import { Band } from "./band.model";

export class BandWrapper {
    _embedded!: {bands: Band[]};
}