import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {AnalyticsService} from "../shared/services/analytics.service"
import {AnalyticsPage} from "../shared/interfaces"
import {Subscription} from "rxjs/index"
import {Chart} from 'chart.js'

@Component({
    selector: 'app-analytics-page',
    templateUrl: './analytics-page.component.html',
    styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
    @ViewChild('gain') gainRef: ElementRef
    @ViewChild('order') orderRef: ElementRef
    average: number
    pending = true
    aSub: Subscription

    constructor(private service: AnalyticsService) {
    }

    ngAfterViewInit() {
        // график для выручки
        const gainConfig: any = {
            label: 'Выручка',
            color: 'rgba(255,99,132)'
        }

        // график для заказов
        const orderConfig: any = {
            label: 'Выручка',
            color: 'rgba(54,62,235)'
        }


        this.aSub = this.service.getAnalytics().subscribe(
            (data: AnalyticsPage) => {
                this.average = data.average

                gainConfig.labels = data.chart.map(item => item.date)
                gainConfig.data = data.chart.map(item => item.gain)

                orderConfig.labels = data.chart.map(item => item.date)
                orderConfig.data = data.chart.map(item => item.order)

                // gainConfig.labels.push('05.01.2019')
                // gainConfig.data.push(650)
                //
                // orderConfig.labels.push('05.01.2019')
                // orderConfig.data.push(3)

                const gainCtx = this.gainRef.nativeElement.getContext('2d')
                gainCtx.canvas.height = '300px'
                new Chart(gainCtx, createChartConfig(gainConfig))

                const orderCtx = this.orderRef.nativeElement.getContext('2d')
                orderCtx.canvas.height = '300px'
                new Chart(orderCtx, createChartConfig(orderConfig))

                this.pending = false
            }
        )
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe()
        }
    }

}

//функция для конфигурации графика
function createChartConfig({labels, data, label, color}) {
    return {
        type: 'line',
        options: {
            responsive: true
        },
        data: {
            labels,
            datasets: [
                {
                    label,
                    data,
                    borderColor: color,
                    steppedLine: false,
                    fill: false
                }
            ]
        }
    }
}

