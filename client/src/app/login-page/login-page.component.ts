import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription // чтобы не было утечки памяти при subscribe

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  //будет вызываться при переходе на другую страницу
  ngOnDestroy(){
    //отписывемся от subscribe, чтобы не было утечек памяти
     if(this.aSub) this.aSub.unsubscribe()
  }

  onSubmit(){
    this.form.disable()// чтобы не отправлять несколько запросов

    this.aSub = this.auth.login(this.form.value).subscribe(
        ()=>console.log('login success'),
        error=>console.warn('error')
        )
  }

}
