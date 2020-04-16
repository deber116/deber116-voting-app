const logUserOut = () => {
    // currentUser = ""
    // userForm.parentElement.style.display = 'block'
    location.reload();
}

const logOutFeature = () => {
    logOut = document.getElementById('logout')
    logOut.addEventListener('click', logUserOut)
}


const addGraphListener = () => {
    document.addEventListener("click", showGraph);
    //document.addEventListener("mouseout", hideGraph)

}

const showGraph = () => {


    if (event.target.dataset.vote){

        let graphNode = event.target.parentElement.parentElement.nextElementSibling 
        let getPollId = event.target.dataset.vote 
        let optionVote = event.target.id
        
        fetch(POLLS_URL + `/${getPollId}`)
        .then(resp => resp.json())
        .then(pollObj => {
            addGraphToPollCard(graphNode, pollObj, optionVote)
        })
    }
}



addGraphToPollCard = (canvasTag, pollObj, optionVote = 0) => {

    //set if option

    let dataOne = pollObj.options[0].numVotes
    let dataTwo = pollObj.options[1].numVotes

    if (optionVote % 2 === 0){
        dataTwo += 1 
    }  
    if (optionVote + 1 % 2 === 0){
        dataOne += 1
    }



    let ctx = canvasTag

    ctx.style.width = '500px'
    ctx.style.height = 'auto'
    ctx.style.backgroundColor = 'white'
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            datasets: [{
                maxBarThickness: 100,
                //label: pollObj.options[0].name,
                // data: [pollObj.options[0].numVotes],
                label: 'one',
                data: [dataOne],
                backgroundColor: ['rgba(14, 110, 184)'],
                borderColor: ['rgba(135, 108, 108)'],
                borderWidth: 1
            },
            {
                maxBarThickness: 100,  
                // label: optionTwo.name,
                // data: [this.optionTwo.votes.length],
                label: 'two',
                data: [dataTwo],
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

logOutFeature()
addGraphListener()


