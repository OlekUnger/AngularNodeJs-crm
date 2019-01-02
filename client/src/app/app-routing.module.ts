import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {RegisterPageComponent} from "./register-page/register-page.component";

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            {path: '', redirectTo: '/login', pathMatch: 'full'}, //по умолчанию незарегистр пользователь редиректнется еа страницу логина если адрес '/'
            {path: 'login', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent},
        ]
    }, // здесь будут роуты к auth-layout
    {path: '', component: SiteLayoutComponent, children: []}  // здесь будут роуты к site-layout
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
