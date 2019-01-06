import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrderService} from "./order.service";
import {Order, OrderPosition} from "../shared/interfaces";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs/index";

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css'],
    providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('modal') modalRef: ElementRef
    isRoot: boolean
    modal: MaterialInstance
    pending = false
    oSub: Subscription

    constructor(private router: Router,
                private orderService: OrderService,
                private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.isRoot = this.router.url === '/order'

        // прослушиваем событие смены url
        this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.isRoot = this.router.url === '/order'
                }
            }
        )
    }

    ngOnDestroy() {
        this.modal.destroy()
        if(this.oSub) this.oSub.unsubscribe()
    }

    removePosition(orderPosition: OrderPosition) {
        this.orderService.remove(orderPosition)
    }

    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef)
    }

    openModal() {
        this.modal.open()
    }

    closeModal() {
        this.modal.close()
    }

    submit() {
        // сохраняем заказ
        this.pending = true
        const order: Order = {
            list: this.orderService.list.map(item => {
                delete item._id
                return item
            })
        }
        this.oSub = this.ordersService.create(order).subscribe(
            newOrder => {
                MaterialService.toast(`Заказ №${newOrder.order} добавлен`)
                this.orderService.clear()
            },
            error => MaterialService.toast(error.error.message),
            () => {
                this.modal.close()
                this.pending = false
            }
        )

    }
}
