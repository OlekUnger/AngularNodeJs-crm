// import {Injectable} from '@angular/core';
import {ElementRef} from "@angular/core";

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

    static initializeFloatingButton(ref: ElementRef){
        M.FloatingActionButton.init(ref.nativeElement)
    }

    static updateTextInputs(){
        M.updateTextFields()
    }
}
