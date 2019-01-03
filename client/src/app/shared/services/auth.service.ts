import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {User} from "../interfaces"
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token = null

    // чтобы делать ajax запросы на сервер инжектируем HttpClient
    constructor(private http: HttpClient) {
    }

    register(user: User): Observable<User> {
        return this.http.post<User>('/api/auth/register', user)
    }

    // мы ожидаем получить некий объект с токеном
    login(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/auth/login', user)
            .pipe(
                // сохраним token в переменную для дальнейшего использования при помощи tap
                tap(({token}) => {
                    localStorage.setItem('auth-token', token)
                    this.setToken(token)
                })
            )
    }

    setToken(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    // находится ли пользователь в сессии
    isAuthenticated(): boolean {
        return !!this.token
    }

    logout (){
        this.setToken(null)
        localStorage.clear()
    }
}
