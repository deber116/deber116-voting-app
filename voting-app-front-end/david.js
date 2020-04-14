const USERS_URL = "http://localhost:3000/users"
const POLLS_URL = "http://localhost:3000/polls"

const main = () => {
    createUserInstance();
    showCreatePollForm();
    createPollEventListener();
}

let currentUser;
let addPoll = false;
const createPollBtn = document.getElementById("create-poll");
const pollForm = document.getElementById("add-poll-form");
const pollContainer = document.getElementById('poll-container');
const userForm = document.querySelector("form.add-user-form")

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

const createPollEventListener = () => {
    pollForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const pollName = pollForm.querySelector('[name="poll-name"]').value

        //create a post fetch to POLLS_URL
        //body needs to have name and user_id 
        //user_id is in current_user
        //need something that will stop this from going through if current_user is blank
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
                  "user_id": currentUser.id
                })
            }
    
            fetch(POLLS_URL, pollConfigObj)
            .then(resp => resp.json())
            .then(response => {
                console.log(response)
            })

        } else {
            alert('You must sign in with your email to create a poll.')
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
            console.log(currentUser)
        })
        userForm.querySelector('[name="user_email"]').value = ''
        event.preventDefault();
    })
}

main();
