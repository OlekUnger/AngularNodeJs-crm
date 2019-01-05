import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/services/positions.service";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";

@Component({
    selector: 'app-positions-form',
    templateUrl: './positions-form.component.html',
    styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input('categoryId') categoryId: string
    @ViewChild('modal') modalRef: ElementRef
    positions: Position[] = []
    loadingPositions = false
    modal: MaterialInstance

    constructor(private positionsService: PositionsService) {
    }

    ngOnInit() {
        this.loadingPositions = true
        this.positionsService.fetch(this.categoryId).subscribe(
            positions => {
                this.positions = positions
                this.loadingPositions = false
            }
        )
    }

    ngOnDestroy() {
        this.modal.destroy()
    }

    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef)
    }

    onSelectPosition(position: Position) {
        this.modal.open()
    }

    onAddPosition() {
        this.modal.open()
    }

    onCancel() {
        this.modal.close()
    }

}
