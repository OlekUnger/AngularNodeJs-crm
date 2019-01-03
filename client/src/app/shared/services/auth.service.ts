import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {User} from "../interfaces"
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // чтобы делать ajax запросы на сервер инжектируем HttpClient
    constructor(private http: HttpClient) {
    }

    register() {
    }

    // мы ожидаем получить некий объект с токеном
    login(user: User): Observable<{token: string}> {
        return this.http.post<{token: string}>('/api/auth/login', user)

    }
}
