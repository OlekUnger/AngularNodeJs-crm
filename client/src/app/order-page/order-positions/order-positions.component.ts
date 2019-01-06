import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from "@angular/router"
import {PositionsService} from "../../shared/services/positions.service"
import {Observable} from "rxjs/index"
import {Position} from "../../shared/interfaces";
import {map, switchMap} from "rxjs/internal/operators";
import {OrderService} from "../order.service";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";

@Component({
    selector: 'app-order-positions',
    templateUrl: './order-positions.component.html',
    styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {
    positions$: Observable<Position[]>


    constructor(private route: ActivatedRoute,
                private positionsService: PositionsService,
                private orderService: OrderService) {
    }

    ngOnInit() {
        this.positions$ = this.route.params.pipe(
            switchMap((params: Params)=>{
                return this.positionsService.fetch(params['id'])
            }),

            map((positions: Position[])=>{
                return positions.map(position=>{
                    // по умолчанию делаем кол-во 1
                    position.quantity = 1
                    return position
                })
            })
        )
    }

    addToOrder(position: Position){
        this.orderService.add(position)
        MaterialService.toast(`Добавлено x${position.quantity}`)
    }

}
