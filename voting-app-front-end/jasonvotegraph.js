addGraphToPollCard = (canvasTag, optionOne, optionTwo) => {

    let ctx = document.getElementById('chart') // insert canvas tag
    ctx.style.width = '500px'
    ctx.style.height = 'auto'
    ctx.style.backgroundColor = 'white'
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            datasets: [{
                maxBarThickness: 100,
                // label: optionOne.name,
                // data: [this.optionOne.votes.length],
                label: 'one',
                data: [1],
                backgroundColor: ['rgba(14, 110, 184)'],
                borderColor: ['rgba(135, 108, 108)'],
                borderWidth: 1
            },
            {
                maxBarThickness: 100,  
                // label: optionTwo.name,
                // data: [this.optionTwo.votes.length],
                label: 'two',
                data: [2],
                backgroundColor: [
                    'rgba(184, 14, 25)'
                ],
                borderColor: [
                    'rgba(135, 135, 108)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                //text: this.optionOne.poll.name
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        display: false,
                        beginAtZero: false
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        display: false,
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}
// addGraphToPollCard(1, 2, 3)

