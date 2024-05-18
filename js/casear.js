let encryptFormDOM = document.querySelector('#encryptForm');
let decryptFormDOM = document.querySelector('#decryptForm');
encryptFormDOM.addEventListener('submit', encryptHandler);
decryptFormDOM.addEventListener('submit', decryptHandler);
const alertDOM = document.querySelector('#alert')

const alertFunction = (title, message, className="warning") => `
<div class="alert alert-${className} alert-dismissible fade show" role="alert">
  <strong>${title}</strong> ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`

function caesarShift(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        if (65 <= c && c <= 90) { // Uppercase
            result += String.fromCharCode(((c - 65 + shift) % 26 + 26) % 26 + 65);
        } else if (97 <= c && c <= 122) { // Lowercase
            result += String.fromCharCode(((c - 97 + shift) % 26 + 26) % 26 + 97);
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

function encryptHandler(event) {
    event.preventDefault();
    const plaintext = document.querySelector("#plaintextEncrypt").value;
    const key = parseInt(document.querySelector("#keyEncrypt").value, 10);

    if (plaintext) {
        let ciphertext = caesarShift(plaintext, key);
        document.querySelector("#ciphertextEncrypt").value = ciphertext;
    } else {
        alertDOM.innerHTML = alertFunction(
            "WARNING",
            "The plaintext field is empty.",
            "danger"
        );
    }
}

function decryptHandler(event) {
    event.preventDefault();
    const ciphertext = document.querySelector("#ciphertextDecrypt").value;
    const key = parseInt(document.querySelector("#keyDecrypt").value, 10);
    if (ciphertext) {
        let plaintext = caesarShift(ciphertext, -key); // Decrypting, so we use negative shift
        document.querySelector("#plaintextDecrypt").value = plaintext;
    } else {
        alertDOM.innerHTML = alertFunction(
            "WARNING",
            "The ciphertext field is empty.",
            "danger"
        );
    }
}




/*

function decrypt(isDecrypt) {
    var shiftText = document.getElementById("shift").value;
    var shift = parseInt(shiftText, 10);
    if (isDecrypt) shift = (26 - shift) % 26;
    var textElem = document.getElementById("inputText");
    textElem.value = caesarShift(textElem.value, shift);
  }
const caesarShift = (text, shift) =>{
    
    var result = "";
  
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
  
      if (65 <= c && c <= 90)
        result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
      // Uppercase
      else if (97 <= c && c <= 122)
        result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
      // Lowercase
      else result += text.charAt(i);
    }
    //var textElem = document.getElementById("plaintext");
    //textElem.value = result;
    //return result;
    let cipherText = document.getElementById("ciphertext");
    cipherText.innerHTML = result;
  }



function formHandler(event)
{
    event.preventDefault()
    const PLAINTEXT = document.querySelector("#plaintext");
    
    
    if (PLAINTEXT.value) {
        caesarShift(PLAINTEXT,3);
        
    }
    else{
        
        alertDOM.innerHTML = alertFunction(
            "WARNING",
            "The information you entered is insufficient",
            "warning"
        ) // gonderdikten sonra sifirladik
        PLAINTEXT.value = ""  ;
    }
}
*/