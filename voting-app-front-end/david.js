const USERS_URL = "http://localhost:3000/users"
const POLLS_URL = "http://localhost:3000/polls"

let current_user;


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
