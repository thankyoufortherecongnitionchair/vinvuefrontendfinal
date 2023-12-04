import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent {
  subscribersArray: Array<any> = [];
  constructor(private subService: SubscribersService) {
    this.subService.loadData().subscribe((val) => {
      this.subscribersArray = val;
    });
  }
}
