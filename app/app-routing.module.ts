import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusiciensComponent } from './musiciens/musiciens.component';
import { AddMusicienComponent } from './add-musicien/add-musicien.component';
import { UpdateMusicienComponent } from './update-musicien/update-musicien.component';
import { RechercheParBandComponent } from './recherche-par-band/recherche-par-band.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeBandsComponent } from './liste-bands/liste-bands.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { musicienGuard } from './musicien.guard';


const routes: Routes = [
  {path: "musiciens", component: MusiciensComponent},
  {path: "add-musicien", component: AddMusicienComponent, canActivate:[musicienGuard]},
  {path: "", redirectTo: "musiciens", pathMatch: "full" },
  {path: "updateMusicien/:id", component: UpdateMusicienComponent},
  {path: "rechercheParBand", component : RechercheParBandComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeBands", component: ListeBandsComponent},
  {path: "login", component: LoginComponent},
  {path: "app-forbidden", component:ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
