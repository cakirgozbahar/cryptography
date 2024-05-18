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


function encryptHandler(event)
{
    event.preventDefault();
    const plaintext = document.querySelector("#plaintextEncrypt").value;
    const key = document.querySelector("#keyEncrypt").value;
    if (plaintext) 
    {
        let cipherText = vigenereEncrypt(plaintext,key);
        document.querySelector("#ciphertextEncrypt").value = cipherText;
    }
    else
    {
        alertDOM.innerHTML = alertFunction(
            "WARNING",
            "The plaintext field is empty.",
            "danger"
        );
    }
}

function decryptHandler(event)
{
    event.preventDefault();
    const ciphertext = document.querySelector("#ciphertextDecrypt").value;
    const key = document.querySelector("#keyDecrypt").value;
    if (ciphertext) {
        let plaintext = vigenereDecrypt(ciphertext,key); // Decrypting, so we use negative shift
        document.querySelector("#plaintextDecrypt").value = plaintext;
    } else {
        alertDOM.innerHTML = alertFunction(
            "WARNING",
            "The ciphertext field is empty.",
            "danger"
        );
    }
}

function vigenereEncrypt(plainText, key) {
    let encryptedText = "";
    let j = 0; // To track key index

    for (let i = 0; i < plainText.length; i++) {
        let currentLetter = plainText[i];
        if (currentLetter.match(/[a-z]/i)) { // Check if the character is a letter
            let charCode = currentLetter.charCodeAt(0);

            // Handling both uppercase and lowercase letters
            let base = (charCode >= 65 && charCode <= 90) ? 65 : 97;
            let keyCharCode = key[j % key.length].toLowerCase().charCodeAt(0) - 97;

            encryptedText += String.fromCharCode(((charCode - base + keyCharCode) % 26) + base);
            j++; // Only increment j when a letter is encrypted
        } else {
            encryptedText += currentLetter;
        }
    }

    return encryptedText;
}

function vigenereDecrypt(encryptedText, key) {
    let decryptedText = "";
    let j = 0; // To track key index

    for (let i = 0; i < encryptedText.length; i++) {
        let currentLetter = encryptedText[i];
        if (currentLetter.match(/[a-z]/i)) { // Check if the character is a letter
            let charCode = currentLetter.charCodeAt(0);

            // Handling both uppercase and lowercase letters
            let base = (charCode >= 65 && charCode <= 90) ? 65 : 97;
            let keyCharCode = key[j % key.length].toLowerCase().charCodeAt(0) - 97;

            decryptedText += String.fromCharCode(((charCode - base - keyCharCode + 26) % 26) + base);
            j++; // Only increment j when a letter is decrypted
        } else {
            decryptedText += currentLetter;
        }
    }

    return decryptedText;
}
