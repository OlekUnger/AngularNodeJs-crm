import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthGuard} from './shared/classes/auth.quard';

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            {path: '', redirectTo: '/login', pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent}
        ]
    },
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {
}
