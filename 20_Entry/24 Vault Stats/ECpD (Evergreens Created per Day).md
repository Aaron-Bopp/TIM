

```dataviewjs
const createdDates = Array.from(dv.pages('#node/evergreen').created).map(p => new Date(p).setHours(0,0,0,0))
console.log(createdDates)

let uniqueDates = Array.from(new Set(createdDates)).sort()
console.log(uniqueDates)
const counts = uniqueDates.map(d => createdDates.reduce((total,x) => (x==d ? total+1 : total), 0))
console.log(counts)
uniqueDates = uniqueDates.map(p => new Date(p).toLocaleString())
const chartData = {
    type: 'bar',
    data: {
        labels: uniqueDates,
        datasets: [{
            label: 'Created',
            data: counts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    }
}

window.renderChart(chartData, this.container);
```