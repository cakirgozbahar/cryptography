
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
        let cipherText = encryptData(plaintext,key);
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
        let plaintext = decryptData(ciphertext,key); // Decrypting, so we use negative shift
        document.querySelector("#plaintextDecrypt").value = plaintext;
    } else {
        alertDOM.innerHTML = alertFunction(
            "WARNING",
            "The ciphertext field is empty.",
            "danger"
        );
    }
}




function encryptData(message, secretKey) {
    const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
    return ciphertext;
}
function decryptData(ciphertext, secretKey) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}
