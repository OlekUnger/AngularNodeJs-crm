import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs/index";
import {Order} from "../shared/interfaces";

const STEP = 2

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('tooltip') tooltipRef: ElementRef
    isFilterVisible = false
    tooltip: MaterialInstance
    oSub: Subscription
    orders: Order[] = []
    loadingOrders = false
    reloading = false
    offset = 0
    limit = STEP
    noMoreOrders = false


    constructor(private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.reloading = true
        this.fetch()
    }

    private fetch(){
        const params = {
            offset: this.offset,
            limit: this.limit
        }
        this.oSub = this.ordersService.fetch(params).subscribe(
            orders=>{
                this.orders = this.orders.concat(orders)
                this.noMoreOrders = orders.length < STEP
                this.loadingOrders = false
                this.reloading = false
            }
        )
    }


    loadMore() {
        this.offset += STEP
        this.loadingOrders = true
        this.fetch()
    }

    ngOnDestroy() {
        this.tooltip.destroy()
        if(this.oSub) this.oSub.unsubscribe()
    }

    ngAfterViewInit() {
        this.tooltip = MaterialService.initTooltip(this.tooltipRef)
    }


}


