import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/index";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
    selector: 'app-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup
    // режим добавления по умолчанию
    isNew = true

    constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required])
        })
        // чтобы заблокировать ввод данных в форму пока в нее подгружаются данные
        this.form.disable()

        this.route.params
        // как только прочитаем params, хотим выполнить еще один асинхронный запрос при помощи switchMap
            .pipe(
                switchMap(
                    (params: Params)=>{
                        if (params['id']) {
                            this.isNew = false
                            // возвращаем новый стрим
                            return this.categoriesService.getById(params['id'])
                        } else {
                            // тоже возвращаем стрим
                            return of(null)
                        }
                    }
                )
            )
            .subscribe(
                category=>{
                    if(category) {
                        // передаем данные в форму
                        this.form.patchValue({name: category.name})
                        MaterialService.updateTextInputs()
                    }
                    this.form.enable()
                },
                error=>MaterialService.toast(error.error.message)
                )
    }

    onSubmit() {

    }

}
