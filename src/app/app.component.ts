import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SortTableLikeMaterialDirective } from './directives/sort-table-like-material.directive';
import { AddSortIconHoverDirective } from './directives/add-sort-icon-hover.directive';
import {Sort, MatSortModule} from '@angular/material/sort';
import { CommonModule } from '@angular/common';


export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

interface Movie {
  title: string;
  director: string;
  genre: string;
  releaseYear: number;
  rating: number;
  creationDate: string; // YYYY-MM-DD format
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SortTableLikeMaterialDirective, AddSortIconHoverDirective, MatSortModule, CommonModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'LightweightTableSort';


/**
 * Without Libraries
 * Sorting de Tabla con flechas incluidas. Esto aplica junto al directive AddSortIconHoverDirective
 */

movies: Movie[] = [
  {title: 'Inception', director: 'Christopher Nolan', genre: 'Sci-Fi', releaseYear: 2010, rating: 8.8, creationDate: '2024-05-01'},
  {title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski', genre: 'Action', releaseYear: 1999, rating: 8.7, creationDate: '2024-05-02'},
  {title: 'Parasite', director: 'Bong Joon Ho', genre: 'Thriller', releaseYear: 2019, rating: 8.6, creationDate: '2024-05-03'},
  {title: 'The Godfather', director: 'Francis Ford Coppola', genre: 'Crime', releaseYear: 1972, rating: 9.2, creationDate: '2024-05-04'},
  {title: 'Pulp Fiction', director: 'Quentin Tarantino', genre: 'Crime', releaseYear: 1994, rating: 8.9, creationDate: '2024-05-05'},
];

  sortField: string = '';
  sortDirection: string = 'asc';

  setSortField(field: string) {
    if (this.sortField == field) {
      this.sortDirection = this.getNextSortDirection(this.sortDirection);
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  getNextSortDirection(currentDirection: string): string {
    if (currentDirection === 'asc') {
      return 'desc';
    } else {
      return 'asc';
    }
  }




/**
 * Angular Material Sorting 
 */


  desserts: Dessert[] = [
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
  ];

  sortedData: Dessert[];

  constructor() {
    this.sortedData = this.desserts.slice();
  }

  sortData(sort: any) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'calories':
          return compare(a.calories, b.calories, isAsc);
        case 'fat':
          return compare(a.fat, b.fat, isAsc);
        case 'carbs':
          return compare(a.carbs, b.carbs, isAsc);
        case 'protein':
          return compare(a.protein, b.protein, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}