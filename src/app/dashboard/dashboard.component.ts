import { Component, OnInit } from '@angular/core';
import { Show } from '../show'
import { ShowService } from '../shows.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  shows: Show[]=[];

  constructor(private showService: ShowService) { }

  ngOnInit() {
    this.getShows();
  }

  getShows(): void {
    this.showService.getItems().subscribe(shows => this.shows=shows)
  }
}
