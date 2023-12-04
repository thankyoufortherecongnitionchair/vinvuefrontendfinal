import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categoryArray: Array<any>;
  formCategory: string;
  formStatus: string = 'Add';
  categoryId: string;
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
    });
  }
  onSubmit(categoryForm: any) {
    let categoryData: Category = {
      category: categoryForm.value.categories,
    };

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      categoryForm.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      categoryForm.reset();
      this.formStatus = 'Add';
    }
  }
  onEdit(category: any, id: any) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: any) {
    this.categoryService.deleteData(id);
  }
}
