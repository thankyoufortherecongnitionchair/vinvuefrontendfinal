import { Component } from '@angular/core';
import { Sub } from '../pages/models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscriptions-form',
  templateUrl: './subscriptions-form.component.html',
  styleUrls: ['./subscriptions-form.component.css'],
})
export class SubscriptionsFormComponent {
  isEmailError: boolean = false;
  isSubscribed: boolean = false;

  constructor(private subService: SubscribersService) {}
  onSubmit(formVal: any) {
    const subData: Sub = {
      name: formVal.name,
      email: formVal.email,
    };
    this.subService.checkSubs(subData.email).subscribe((val) => {
      if (val.empty) {
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      } else {
        this.isEmailError = true;
      }
    });
  }
}
