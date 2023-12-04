import { Component } from '@angular/core';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  comments: {text:string}[] = [];
  newCommentText: string = '';

  constructor(private commentservice: CommentsService) {
    // Fetch comments when the component is initialized
    this.comments = this.commentservice.getComments();
  }

  addComment() {
    if (this.newCommentText) {
      this.commentservice.addComment(this.newCommentText);
      this.newCommentText = '';
      // You can refresh the comments list here or update it when the service updates.
    }
  }
}
