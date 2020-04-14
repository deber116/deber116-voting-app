const USERS_URL = "http://localhost:3000/users"
const POLLS_URL = "http://localhost:3000/polls"

const main = () => {
    createUserInstance();
    showCreatePollForm();
    createPollEventListener();
    getPolls();
    voteEventListener()
}

let currentUser;
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
    //fetch all instances of poll
    //interate through them and generate cards
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
                console.log(response)
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
    <div class="poll-card">
        <h1 class="poll-title">${pollObj.name}</h1>
        <br>
        <div class="ui vertically divided grid">
            <div class="two column row">
                <div class="column">
                    <p>Option #1</p>
                    <h2 class="option-one">${pollObj.options[0].name}</h2>
                    <button name="vote-button" data-vote=${pollObj.id} id=${pollObj.options[0].id} class="ui button">VOTE</button>
                </div>
                <div class="column">
                    <p>Option #2</p>
                    <h2 class="option-two">${pollObj.options[1].name}</h2>
                    <button name="vote-button" data-vote=${pollObj.id} id=${pollObj.options[1].id} class="ui button">VOTE</button>
                </div>
            </div>
        </div>
    </div>
  `
  mainNode.innerHTML = pollCard + mainNode.innerHTML

}

const voteEventListener = () => {
    mainNode.addEventListener("click", event => {
       if (event.target.dataset.vote) {
           
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
            //document.cookie = `username=${currentUser["name"]}`;
            // document.cookie = "test1=Hello";
            // let testCookie = document.cookie.replace(/(?:(?:^|.*;\s*)test1\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            // console.log(testCookie)
        })
        userForm.querySelector('[name="user_email"]').value = ''
        event.preventDefault();
        event.target.parentElement.parentElement.style.display = "none"
    })
  
}

main();
