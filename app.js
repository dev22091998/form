// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB6Izsku_qLcnr9lc0Ivj5eejB7-5FCaRE",
  authDomain: "test-form-d3492.firebaseapp.com",
  databaseURL: "https://test-form-d3492.firebaseio.com",
  projectId: "test-form-d3492",
  storageBucket: "test-form-d3492.appspot.com",
  messagingSenderId: "222398070278",
  appId: "1:222398070278:web:bf51f5c8a26dcfff9ecd87",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();

  sendEmail(name, email, message)
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });

  retrieveInfos();
}

function retrieveInfos(){
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);
}

function gotData(data){
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++){
    let infoData = keys[i];
    let name = info[infoData].name;
    let email = info[infoData].email;
    let message = info[infoData].message;
    console.log(name, email, message);

    let infosResults = document.querySelector(".infosResults");

    infosResults.innerHTML += `<div>
    <p><strong>Name: </strong>${name} <br/>
    <a><strong>Email: </strong>${email}</a><br/>
    <a><strong>Message: </strong>${message}</a><br/>
    </p>    
    </div>`;
  }
}

retrieveInfos();


// Send Emain info 
function sendEmail(name, email, message){
  Email.send({
    Host: "smtp.gmail.com",
    Username: "madaminov2298@gmail.com",
    Password: "znpcbfbaqtopfniv",
    To: "madaminov2298@gmail.com",
    From: email,
    Subject: `${name} send you a message`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
  }).then((message)=> alert("mail sent succesfully"))
}
