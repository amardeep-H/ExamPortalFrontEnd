import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-usidebar',
  templateUrl: './usidebar.component.html',
  styleUrls: ['./usidebar.component.css'],
})
export class UsidebarComponent implements OnInit {
  categories:any;
  constructor(private categoryService: CategoryService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        this.snackbar.open("Error while loading Categories from Server.", '',{
          duration:3000,
        })
      }
    );
  }
}
