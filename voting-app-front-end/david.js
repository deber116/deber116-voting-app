const USERS_URL = "http://localhost:3000/users"
const POLLS_URL = "http://localhost:3000/polls"
const VOTES_URL = "http://localhost:3000/votes"

const main = () => {
    createUserInstance();
    showCreatePollForm();
    createPollEventListener();
    getPolls();
    voteEventListener()
}

let currentUser;
let currentUserVotes;
let addPoll = false;
const createPollBtn = document.getElementById("create-poll");
const pollForm = document.getElementById("add-poll-form");
const pollContainer = document.getElementById("poll-container");
const userForm = document.querySelector("form.add-user-form")
const mainNode = document.getElementById("main")


const showCreatePollForm = () => {
    createPollBtn.addEventListener("click", () => {
        addPoll = !addPoll;
        if (addPoll) {
            pollContainer.style.display = "block";
        } else {
            pollContainer.style.display = "none";
        }
    })
}

const getPolls = () => {
    fetch(POLLS_URL)
    .then(resp => resp.json())
    .then(response => {
        response.forEach(poll => {
            createPollCard(poll);
        })
    })
}

const createPollEventListener = () => {
    pollForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const pollName = pollForm.querySelector('[name="poll-name"]').value
        const optionOne = pollForm.querySelector('[name="option-one"]').value
        const optionTwo = pollForm.querySelector('[name="option-two"]').value

        if (currentUser) {
            
            let pollConfigObj = {
                method: "POST",
                headers: 
                {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  "name": pollName,
                  "user_id": currentUser.id,
                  "option_one": optionOne,
                  "option_two": optionTwo
                })
            }
    
            fetch(POLLS_URL, pollConfigObj)
            .then(resp => resp.json())
            .then(response => {
                createPollCard(response)
                pollContainer.style.display = 'none'
            })

        } else {
            alert("You must sign in with your email to create a poll.")
        }

        event.target.reset();
    })
}

const createPollCard = (pollObj) => {
    let pollCard = `
    <div class="poll-card" data-user-id=${pollObj.user.id} data-poll-id=${pollObj.id}>
        <h1 class="poll-title">${pollObj.name}</h1>
        <br>
        <div class="ui vertically divided grid">
            <div class="two column row">
                <div class="column">
                    <p>Option #1</p>
                    <h2 class="option-one">${pollObj.options[0].name}</h2>
                    <p id="option-one-votes">Votes: ${pollObj.options[0].numVotes}</p>
                    <button name="vote-button" data-vote=${pollObj.id} id=${pollObj.options[0].id} class="ui button">VOTE</button>
                </div>
                <div class="column">
                    <p>Option #2</p>
                    <h2 class="option-two">${pollObj.options[1].name}</h2>
                    <p id="option-two-votes">Votes: ${pollObj.options[1].numVotes}</p>
                    <button name="vote-button" data-vote=${pollObj.id} id=${pollObj.options[1].id} class="ui button">VOTE</button>
                </div>
                <button name="delete-button" data-user-id=${pollObj.user.id} data-poll-id=${pollObj.id} class="ui button" style="display: none;">DELETE</button>
            </div>
            
        </div>
    </div>
    `
    mainNode.innerHTML = pollCard + mainNode.innerHTML

    let pollNode = mainNode.querySelector(`div[data-poll-id='${pollObj.id}']`)
}

const voteEventListener = () => {
    mainNode.addEventListener("click", event => {
        if (event.target.dataset.vote) {
            let voteButton = event.target
            let votesNode = event.target.previousSibling.previousSibling;
            let numVotes = parseInt(votesNode.innerHTML.split(" ")[1])
            let cardNode = voteButton.parentElement.parentElement.parentElement.parentElement
            let allVoteButtons = cardNode.querySelectorAll('button[name="vote-button"]')
            
            console.log(numVotes)
            let voteConfigObj = {
                method: "POST",
                headers: 
                {
                "Content-Type": "application/json",
                Accept: "application/json"
                },
                
                body: JSON.stringify({
                "option_id": event.target.id,
                "user_id": currentUser.id
                })
            }

            fetch(VOTES_URL, voteConfigObj)
            .then(resp => resp.json())
            .then(response => {
                //response.id comes back null if they've already voted on the poll
                //this is because of the uniqueness validation in rails on Vote model
                if (response.id != null) {
                    numVotes += 1
                    votesNode.innerHTML = `Votes: ${numVotes}`
                    voteButton.style.backgroundColor = "lightgreen"
                    allVoteButtons.forEach(button => {
                        button.disabled = true
                    })
                } 
                
            }) //end of fetch
            

        }
       
    })
}
const fetchUserVotes = (userObj) => {
    let allPollCards = document.querySelectorAll("div.poll-card")
    let userPollIds = userObj.votedPollIds.map(choice => {
        return choice["pollId"]
    })
    
    allPollCards.forEach(card => {
        let allVoteButtons = card.querySelectorAll('button[name="vote-button"]')
        if (userPollIds.includes(parseInt(card.dataset.pollId))) {
            userObj.votedPollIds.forEach(voteObj => {
                if (parseInt(voteObj.pollId) == parseInt(card.dataset.pollId)) {
                    let greenButton = card.querySelector(`button[id="${voteObj.optionId}"]`)
                    greenButton.style.backgroundColor = "lightgreen"

                    allVoteButtons.forEach(button => {
                        button.disabled = true
                    })
                }
            })

        }
    })
    
    
}

const createUserInstance = () => {
    userForm.addEventListener("submit", (event) => {
        const email = userForm.querySelector('[name="user_email"]').value
        
        let userConfigObj = {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
             
            body: JSON.stringify({
              "email": email,
            })
        }

        fetch(USERS_URL, userConfigObj)
        .then(resp => resp.json())
        .then(response => {
            currentUser = response
            if (currentUser) {
                event.target.parentElement.parentElement.style.display = "none"
                mainNode.style.display = "block"
                fetchUserVotes(currentUser)
            }
        })
    
        userForm.querySelector('[name="user_email"]').value = ''
        event.preventDefault();
    })
  
}

main();
