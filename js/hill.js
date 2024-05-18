let encryptFormDOM = document.querySelector('#encryptForm');
let decryptFormDOM = document.querySelector('#decryptForm');
encryptFormDOM.addEventListener('submit', encryptHandler);
decryptFormDOM.addEventListener('submit', decryptHandler);
const alertDOM = document.querySelector('#alert');

const alertFunction = (title, message, className="warning") => `
<div class="alert alert-${className} alert-dismissible fade show" role="alert">
  <strong>${title}</strong> ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;

function encryptHandler(event) {
    event.preventDefault();
    const plaintext = document.querySelector("#plaintextEncrypt").value;
    const keyMatrix = [
        [parseInt(document.getElementById('key00').value, 10), parseInt(document.getElementById('key01').value, 10)],
        [parseInt(document.getElementById('key10').value, 10), parseInt(document.getElementById('key11').value, 10)]
    ];
    if (plaintext) {
        let cipherText = encryptHillCipher(plaintext, keyMatrix);
        document.querySelector("#ciphertextEncrypt").value = cipherText;
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
    const keyMatrix = [
        [parseInt(document.getElementById('decKey00').value, 10), parseInt(document.getElementById('decKey01').value, 10)],
        [parseInt(document.getElementById('decKey10').value, 10), parseInt(document.getElementById('decKey11').value, 10)]
    ];
    if (ciphertext) {
        let plainText = decryptHillCipher(ciphertext, keyMatrix);
        if (plainText !== null) {
            document.querySelector("#plaintextDecrypt").value = plainText;
        }
    } else {
        alertDOM.innerHTML = alertFunction(
            "WARNING",
            "The ciphertext field is empty.",
            "danger"
        );
    }
}

function modInverse(a, m) {
    a = a % m;
    for (let x = -m; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return -1; // If no modular inverse exists
}

function encryptHillCipher(text, keyMatrix) {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    if (text.length % 2 !== 0) {
        text += "X"; // Pad with 'X' if text length is odd
    }

    let encryptedText = "";

    for (let i = 0; i < text.length; i += 2) {
        let vector = [
            text.charCodeAt(i) - 65,
            text.charCodeAt(i + 1) - 65
        ];

        let encryptedVector = [
            (vector[0] * keyMatrix[0][0] + vector[1] * keyMatrix[0][1]) % 26,
            (vector[0] * keyMatrix[1][0] + vector[1] * keyMatrix[1][1]) % 26
        ];

        encryptedText += String.fromCharCode(encryptedVector[0] + 65);
        encryptedText += String.fromCharCode(encryptedVector[1] + 65);
    }

    return encryptedText;
}

function decryptHillCipher(ciphertext, keyMatrix) {
    let det = keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0];
    det = ((det % 26) + 26) % 26; // Ensure positive mod 26
    let detInverse = modInverse(det, 26);

    if (detInverse === -1) {
        alertDOM.innerHTML = alertFunction(
            "ERROR",
            "Key matrix is not invertible modulo 26.",
            "danger"
        );
        return null;
    }

    let adjMatrix = [
        [keyMatrix[1][1], -keyMatrix[0][1]],
        [-keyMatrix[1][0], keyMatrix[0][0]]
    ];

    adjMatrix = adjMatrix.map(row => row.map(el => (((el * detInverse) % 26) + 26) % 26));

    let decryptedText = "";
    for (let i = 0; i < ciphertext.length; i += 2) {
        let vector = [ciphertext.charCodeAt(i) - 65, ciphertext.charCodeAt(i + 1) - 65];
        let decryptedVector = [
            (vector[0] * adjMatrix[0][0] + vector[1] * adjMatrix[0][1]) % 26,
            (vector[0] * adjMatrix[1][0] + vector[1] * adjMatrix[1][1]) % 26
        ];

        decryptedText += String.fromCharCode(decryptedVector[0] + 65);
        decryptedText += String.fromCharCode(decryptedVector[1] + 65);
    }
    return decryptedText;
}





/*
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
    const keyMatrix = [
        [parseInt(document.getElementById('key00').value, 10), parseInt(document.getElementById('key01').value, 10)],
        [parseInt(document.getElementById('key10').value, 10), parseInt(document.getElementById('key11').value, 10)]
    ];
    if (plaintext)
    {
        let cipherText = encryptHillCipher(plaintext,keyMatrix);
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
    const keyMatrix = [
        [parseInt(document.getElementById('decKey00').value, 10), parseInt(document.getElementById('decKey01').value, 10)],
        [parseInt(document.getElementById('decKey10').value, 10), parseInt(document.getElementById('decKey11').value, 10)]
    ];
    if (ciphertext)
    {
        let plainText = decryptHillCipher(ciphertext,keyMatrix);
        document.querySelector("#plaintextDecrypt").value = plainText;
    }
    else
    {
        alertDOM.innerHTML = alertFunction(
            "WARNING",
            "The ciphertext field is empty.",
            "danger"
        );
    }
    
}

function modInverse(a, m) {
    // Calculate a^-1 mod m using Extended Euclidean Algorithm
    a = a % m;
    for (let x = -m; x < m; x++) {
        if ((a * x) % m == 1) return x;
    }
    return -1; // If no modular inverse exists
}

function encryptHillCipher(text, keyMatrix) {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    if (text.length % 2 !== 0) {
        text += "X"; // Pad with 'X' if text length is odd
    }

    let encryptedText = "";

    for (let i = 0; i < text.length; i += 2) {
        let vector = [
            text.charCodeAt(i) - 65,
            text.charCodeAt(i + 1) - 65
        ];

        let encryptedVector = [
            (vector[0] * keyMatrix[0][0] + vector[1] * keyMatrix[0][1]) % 26,
            (vector[0] * keyMatrix[1][0] + vector[1] * keyMatrix[1][1]) % 26
        ];

        encryptedText += String.fromCharCode(encryptedVector[0] + 65);
        encryptedText += String.fromCharCode(encryptedVector[1] + 65);
    }

    return encryptedText;
}
function decryptHillCipher(ciphertext, keyMatrix) {
    // Find matrix inverse modulo 26 (determinant and adjugate method)
    let det = keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0];
    det = ((det % 26) + 26) % 26; // Ensure positive mod 26
    let detInverse = modInverse(det, 26);

    if (detInverse === -1) {
        alert("Key matrix is not invertible modulo 26.");
        return null;
    }

    // Calculate adjugate matrix
    let adjMatrix = [
        [keyMatrix[1][1], -keyMatrix[0][1]],
        [-keyMatrix[1][0], keyMatrix[0][0]]
    ];

    // Adjust negative entries and apply mod 26
    adjMatrix = adjMatrix.map(row => row.map(el => (((el * detInverse) % 26) + 26) % 26));

    // Use the adjugate matrix to decrypt
    let decryptedText = "";
    for (let i = 0; i < ciphertext.length; i += 2) {
        let vector = [ciphertext.charCodeAt(i) - 65, ciphertext.charCodeAt(i + 1) - 65];
        let decryptedVector = [
            (vector[0] * adjMatrix[0][0] + vector[1] * adjMatrix[0][1]) % 26,
            (vector[0] * adjMatrix[1][0] + vector[1] * adjMatrix[1][1]) % 26
        ];

        decryptedText += String.fromCharCode(decryptedVector[0] + 65);
        decryptedText += String.fromCharCode(decryptedVector[1] + 65);
    }
    return decryptedText;
}*/