import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private comments: { text: string }[] = [];

  getComments() {
    return this.comments;
  }

  addComment(comment: string) {
    this.comments.push({ text: comment });
  }
}
