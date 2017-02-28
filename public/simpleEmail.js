console.log('simple script loaded!');

var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function addEmail() {
  var email = document.getElementById('email').value;

  if (!email || !validEmail.exec(email)) {
    window.alert('invalid email address');
    return;
  }
  function reqListener () {
    console.log(this.responseText);
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', '/api/subscribe/' + email);
  oReq.send();
}