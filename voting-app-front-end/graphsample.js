let ctx = document.getElementById('chart')

new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        datasets: [{
            maxBarThickness: 100,
            label: "A",
            data: [1],
            backgroundColor: ['rgba(14, 110, 184)'],
            borderColor: ['rgba(135, 108, 108)'],
            borderWidth: 1
        },
        {
            maxBarThickness: 100,  
            label: "B",
            data: [2],
            backgroundColor: ['rgba(184, 14, 25)'],
            borderColor: ['rgba(135, 135, 108)'],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: "TUG-O-WAR"
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    display: true,
                    beginAtZero: true
                }
            }],
            yAxes: [{
                stacked: true,
            }]
        }
    }
});   


