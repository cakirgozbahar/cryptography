
let encryptSHA256FormDOM = document.querySelector('#encryptSHA256Form');
let encryptMD5FormDOM = document.querySelector('#encryptMD5Form');
encryptSHA256FormDOM.addEventListener('submit', encryptSHA256Handler);
encryptMD5FormDOM.addEventListener('submit', encryptMD5Handler);
const alertDOM = document.querySelector('#alert')

const alertFunction = (title, message, className="warning") => `
<div class="alert alert-${className} alert-dismissible fade show" role="alert">
  <strong>${title}</strong> ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`
function encryptSHA256Handler(event)
{
    event.preventDefault();
    const plaintext = document.querySelector("#plaintextSHA256").value;
    if (plaintext) 
    {
        let cipherText = encryptSHA256(plaintext);
        document.querySelector("#ciphertextSHA256").value = cipherText;
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
function encryptMD5Handler(event)
{
    event.preventDefault();
    const plaintext = document.querySelector("#plaintextMD5").value;
    if (plaintext) 
    {
        let cipherText = encryptMD5(plaintext);
        document.querySelector("#ciphertextMD5").value = cipherText;
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




function encryptSHA256(message, ) {
    const hash = CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
    return hash;
}
function encryptMD5(message) {
    const hash = CryptoJS.MD5(message).toString(CryptoJS.enc.Hex);
    return hash;
}
