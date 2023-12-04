import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NumericType } from 'mongodb';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  selectedImg: any = '';
  permalink: string = '';
  categories: Array<any>;
  imgSrc: any = './assets/placeholder.jpg';
  postForm: FormGroup;
  post: any;
  formStatus: string = 'Add New';
  docId: string;
  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private PostService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.docId = val.id;

      if (this.docId) {
        this.PostService.loadOneData(val.id).subscribe((post: any) => {
          this.post = post;
          this.postForm = this.fb.group({
            title: [this.post.title],
            permalink: [this.post.permalink],
            excerpt: [this.post.excerpt],
            category: [
              `${this.post.category.categoryId}-${this.post.category.category}`,
            ],
            content: [this.post.content],
            postImg: [`${this.post.category.id}-{ category.data.category }`],
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        });
      } else {
        this.postForm = this.fb.group({
          title: [''],
          permalink: [''],
          excerpt: [''],
          category: [''],
          content: [''],
          postImg: [''],
        });
      }
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  onTitleChanged($event: any) {
    this.postForm.get('title')?.setValue($event.target.value);

    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
  onSubmit() {
    let split = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: split[0],
        category: split[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new!',
      createdAt: new Date(),
    };

    this.PostService.uploadimage(
      this.selectedImg,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();

    this.imgSrc = './assets/placeholder.jpg';
  }
}
