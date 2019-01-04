import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/index";
import {MaterialService} from "../../shared/classes/material.service";
import {Category} from "../../shared/interfaces";

@Component({
    selector: 'app-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup
    @ViewChild('input') inputRef: ElementRef
    image: File
    imagePreview = ""
    category: Category

    // режим добавления по умолчанию
    isNew = true

    constructor(private route: ActivatedRoute,
                private categoriesService: CategoriesService,
                private router: Router) {
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
                    (params: Params) => {
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
                (category: Category) => {
                    if (category) {
                        // передаем данные в форму
                        this.form.patchValue({name: category.name})
                        this.imagePreview = category.imageSrc
                        this.category = category
                        MaterialService.updateTextInputs()
                    }
                    this.form.enable()
                },
                error => MaterialService.toast(error.error.message)
            )
    }

    triggerClick() {
        this.inputRef.nativeElement.click()
    }

    onFileUpload(event: any) {
        const file = event.target.files[0]
        this.image = file

        const reader = new FileReader()

        reader.onload = () => {
            this.imagePreview = reader.result.toString()
        }

        reader.readAsDataURL(file)
    }

    onSubmit() {
        let obs$
        this.form.disable()
        if (this.isNew) {
            //create
            obs$ = this.categoriesService.create(this.form.value.name, this.image)
        } else {
            obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
        }

        obs$.subscribe(
            category => {
                this.form.enable()
                this.category = category
                MaterialService.toast('Изменения сохранены')
            },
            error => {
                MaterialService.toast(error.error.message)
                this.form.enable()
            }
        )
    }

    deleteCategory() {
        const decision = window.confirm(`Удалить ${this.category.name}?`)

        if (decision) {
            this.categoriesService.delete(this.category._id)
                .subscribe(
                    response => MaterialService.toast(response.message),
                    error => MaterialService.toast(error.error.message),
                    () => this.router.navigate(['/categories'])
                )
        }
    }

}
