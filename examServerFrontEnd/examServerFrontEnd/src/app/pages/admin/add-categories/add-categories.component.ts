import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
})
export class AddCategoriesComponent implements OnInit {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.category.title.trim() == '' ||
      this.category.description.trim() == ''
    ) {
      this._snack.open('!!! Title and Description Required !!!', '', {
        duration: 3000,
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title='',
        this.category.description='',
        Swal.fire('!!! Success !!!', 'Category Added Successfully.', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('!!! Error !!!', 'Server Error', 'error');
      }
    );
  }

  
}
