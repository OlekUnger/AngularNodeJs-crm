// import {Injectable} from '@angular/core';
declare var M

// @Injectable({
//     providedIn: 'root'
// })
export class MaterialService {

    constructor() {
    }
    // формируем сообщение
    static toast(message: string) {
        M.toast({html: message})
    }

}
