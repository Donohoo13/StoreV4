import { Component, OnInit } from '@angular/core';
import { Show } from '../show';
import { ShowService } from '../shows.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.scss']
})
export class AddShowComponent implements OnInit {
  shows: Show[];
  constructor(private showService: ShowService) { }

  ngOnInit() {
  }
  add(_id, name: String, description: String, price: Number, genre: String): void {
    name = name.trim();
    if (!name) { return; }
    this.showService.addItem({_id, name, description, price, genre } as Show)
      .subscribe(random => {
        this.shows.push(random);
      });
  }
}
