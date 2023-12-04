import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postData: any;
  currentPostId:any;
  similarPostArray: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((val: any) => {
      // this.postService.countViews(val.id);
      this.currentPostId=val.id;
      this.postService.loadOnePost(val.id).subscribe((post) => {
        this.postData = post;
        this.loadSimilarPosts(this.postData.category.categoryId);
      });
    });
  }

  loadSimilarPosts(catId: any) {
    this.postService.loadSimilar(catId).subscribe((val) => {
      // this.similarPostArray = val;
      this.similarPostArray = val.filter((post) => post.id !== this.currentPostId);
    });
  }
}
