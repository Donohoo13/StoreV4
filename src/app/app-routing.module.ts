import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { HomeComponent } from './home/home.component';
import { AddShowComponent } from './add-show/add-show.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ShowDetailComponent },
  { path: 'shows', component: ShowsComponent },
  { path: '', component: HomeComponent },
  { path: 'addshow', component: AddShowComponent },
  { path: 'contact', component: ContactComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

