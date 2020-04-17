const logUserOut = () => {
    location.reload();
}

const logOutFeature = () => {
    logOut = document.getElementById('logout')
    logOut.addEventListener('click', logUserOut)
}


const addGraphListener = () => {
    document.addEventListener("click", showGraph);

}

const showGraph = () => {






    if (event.target.dataset.vote){
        let getPollId = event.target.dataset.vote 
        let graphNode = event.target.parentElement.parentElement.nextElementSibling         



        fetch(POLLS_URL + `/${getPollId}`)
        .then(resp => resp.json())
        .then(pollObj => {
            addGraphToPollCard(graphNode, pollObj)
        })
    }

    if (event.target.lastElementChild && event.target.lastElementChild.disabled === true){
        let graphNode = event.target.parentElement.nextElementSibling

        if (graphNode.className !== 'chartjs-render-monitor'){

            let getPollId = event.target.lastElementChild.dataset.vote
    
    
            fetch(POLLS_URL + `/${getPollId}`)
            .then(resp => resp.json())
            .then(pollObj => {
                addGraphToPollCard(graphNode, pollObj, event)
                
            })
            
        }


    }
}

addGraphToPollCard = (canvasTag, pollObj) => {

    let dataOne = pollObj.options[0]
    let dataTwo = pollObj.options[1]
    
    // if (dataOne + dataTwo === 0) {
    //     if (vote) {
    //         dataOne += 1
    //     } else {
    //         dataTwo += 1 
    //     }
    // }

    let ctx = canvasTag
    ctx.style.width = '500px'
    ctx.style.height = 'auto'
    ctx.style.backgroundColor = 'white'
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            datasets: [{
                maxBarThickness: 100,
                label: dataOne.name,
                data: [dataOne.numVotes],
                backgroundColor: ['rgba(14, 110, 184)'],
                borderColor: ['rgba(135, 108, 108)'],
                borderWidth: 1
            },
            {
                maxBarThickness: 100,  
                label: dataTwo.name,
                data: [dataTwo.numVotes],
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
                text: pollObj.name
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
                        display: true,
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        display: true,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

logOutFeature()
addGraphListener()