import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredArray: Array<any> = [];
  latestPostArray: Array<any> = [];

  constructor(private postService: PostsService) {
    this.postService.loadFeatured().subscribe((val) => {
      this.featuredArray = val;
    });
    this.postService.loadLatest().subscribe((val) => {
      this.latestPostArray = val;
    });
  }
}
