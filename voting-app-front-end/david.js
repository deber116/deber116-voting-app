const USERS_URL = "http://localhost:3000/users"
const POLLS_URL = "http://localhost:3000/polls"

let current_user;

let addPoll = false;
const createPollBtn = document.getElementById("create-poll");
// const pollForm = document.getElementById("add-poll-form");
const pollContainer = document.getElementById('poll-container');

createPollBtn.addEventListener("click", () => {
    addPoll = !addPoll;
    if (addPoll) {
        pollContainer.style.display = "block";
    } else {
        pollContainer.style.display = "none";
    }
})

const userForm = document.querySelector("form.add-user-form")

const main = () => {
    createUserInstance();
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
            console.log(response)
        })

        event.preventDefault();
    })
}

main();
