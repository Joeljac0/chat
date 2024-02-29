const messageField = document.getElementById("chat");
const inputField = document.getElementById("text");
const loginField = document.getElementById("user");
const server = "http://10.0.2.93:3000"

//"http://10.155.16.246:3000"

let hours;
let minutes;

latestArrayLength = 0;

function getText() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", `${server}/text`, true);

    xmlhttp.onload = () => {
        array = JSON.parse(xmlhttp.responseText);
        if (array.length > latestArrayLength){
            for (i = latestArrayLength; i < array.length; i++) {
                messageField.innerHTML += `<h2>${array[i][1]}</h2>`; 
                messageField.innerHTML += `<p>${array[i][0]}</p>`; 
                messageField.innerHTML += `<h3>${array[i][2]}:${array[i][3]}</h3>`;
            }
            latestArrayLength = array.length
        } 
    }
    xmlhttp.send();
}

function sendMessage() {
    hours = new Date().getHours();
    minutes = new Date().getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        hours = "0" + hours;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${server}/send` , true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        message: inputField.value,
        username: loginField.value,
        hours: hours,
        minutes: minutes
    }));

    inputField.value = "";
}

document.getElementById('text').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage()
    }
  });

const interval = setInterval(function() {
    getText();
}, 1000);


/*const messageField = document.getElementById("chat");
const inputField = document.getElementById("text");
const userField = document.getElementById("user");
const server = "http://10.0.2.93:3000"



latestArrayLength = 0

function getText() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", `${server}/text`, true);

    xmlhttp.onload = () => {
        array = JSON.parse(xmlhttp.responseText);
        if (array.length > latestArrayLength){
            for (i = latestArrayLength; i < array.length; i++) {
                messageField.innerHTML += `<h2>${array[i][1]}:</h2>` 
                messageField.innerHTML += `<p>${array[i][0]}</p>`
            }
            latestArrayLength = array.length
        }
    }
    xmlhttp.send();
}

function sendMessage() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${server}/send` , true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        message: inputField.value,
        user: userField.value
    }));

    document.getElementById("text").value = ""
}

const interval = setInterval(function() {
    getText();
}, 1000);*/