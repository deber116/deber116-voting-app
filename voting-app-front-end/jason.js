//let currentUser; goal is to set currentUser as cookie
//set user name when page opens 

const promptUserSignIn = () => {
    checkCookie()
    currentUserEmail = getCookie("email")
    console.log(currentUserEmail)
}

const deleteCookie = () => {
    document.cookie = "email="
}

const setCookie = (cname, cvalue) => {
    document.cookie = cname + "=" + cvalue + ";path=/";
}
  
const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
  
const checkCookie = () => {
    let email = getCookie("email");
    if (email != "") {
      alert("Welcome back " + email + "!");
    } else {
       email = prompt("Please enter an email to vote!","");

       document.getElementById('whole-page').style.display = 'none'

        if (email != "" && email != null) {
            setCookie("email", email);
            document.getElementById('whole-page').style.display = 'block'
        } else {
            checkCookie()
        }
    }

}

promptUserSignIn()