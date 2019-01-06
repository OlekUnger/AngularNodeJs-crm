import {Injectable} from '@angular/core';
import {OrderPosition} from "../shared/interfaces";
import {Position} from "../shared/interfaces";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public list: OrderPosition[] = []
    public price = 0

    constructor() {
    }

    add(position: Position) {
        //трансформируем Position в OrderPosition
        const orderPosition: OrderPosition = Object.assign({}, {
            name: position.name,
            cost: position.cost,
            quantity: position.quantity,
            _id: position._id
        })
        // если такой заказ уже был, то мы его найдем и пересчитаем количество, чтобы избежать дублирования
        const candidate = this.list.find(item=>item._id === position._id)

        if(candidate) {
            // изменяем кол-во
            candidate.quantity += orderPosition.quantity

        } else {
            this.list.push(orderPosition)
        }

        this.computePrice()


    }

    remove(orderPosition: OrderPosition) {
        const indx = this.list.findIndex(item=> orderPosition._id === item._id)
        this.list.splice(indx, 1)
        this.computePrice()
    }

    clear() {
        this.list = []
        this.price = 0
    }

    private computePrice(){
        this.price = this.list.reduce((total, item)=>{
           return  total += item.quantity * item.cost
        }, 0)
    }
}
