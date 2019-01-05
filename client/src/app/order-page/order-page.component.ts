import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrderService} from "./order.service";

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

    constructor(private router: Router, private orderService: OrderService) {
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
        this.modal.close()
    }

}
