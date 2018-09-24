import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {Category} from '../shared/interfaces';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories-page.component.html',
    styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
    // для старого метода
    // categories: Category[] = [];

    categories$: Observable<Category[]>;

    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        /* старый метод
        this.categoriesService.fetch()
            .subscribe(categories => {

                this.categories = categories;
                console.log('categories ', categories);
            });
         */
        // новый метод
        this.categories$ = this.categoriesService.fetch();
    }

}
