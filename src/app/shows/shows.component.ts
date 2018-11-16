import { Component, OnInit } from '@angular/core';
import { Show } from '../show';
import { ShowService } from '../shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  shows: Show[];
  constructor(private showService: ShowService) { }

  ngOnInit() {
    this.getShows();
  }
  
  getShows(): void {
    this.showService.getItems()
        .subscribe(shows => this.shows = shows);
  }

  delete(show: Show): void {
    this.shows = this.shows.filter(h => h !== show);
    this.showService.deleteItem(show).subscribe();
  }
}
