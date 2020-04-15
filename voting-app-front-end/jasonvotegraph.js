const logUserOut = () => {
    // currentUser = ""
    // userForm.parentElement.style.display = 'block'
    location.reload();
}

const logOutFeature = () => {
    logOut = document.getElementById('logout')
    logOut.addEventListener('click', logUserOut)
}


addGraphToPollCard = (canvasTag, pollObj) => {

    // let ctx = document.getElementById('chart') // insert canvas tag
    let ctx = canvasTag

    ctx.style.width = '500px'
    ctx.style.height = 'auto'
    ctx.style.backgroundColor = 'white'
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            datasets: [{
                maxBarThickness: 100,
                label: pollObj.options[0].name,
                // data: [this.optionOne.votes.length],
                data: [pollObj.options[0].numVotes],
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

logOutFeature()

// handleGraphDisplay(event)
// const handleGraphDisplay = (event) => {
//     // adds graph to button of poll div upon vote
//     let graphNode = event.target.parentElement.parentElement.nextElementSibling
//     let thisPollId = event.target.id
                        
//     fetch(POLLS_URL + `/${thisPollId}`)
//     .then(resp => resp.json())
//     .then(pollObj => addGraphToPollCard(graphNode, pollObj))
// }


