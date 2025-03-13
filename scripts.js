
function generateShiftFromKey(password) {
    let shift = 0;
    for (let i = 0; i < password.length; i++) {
        shift += password.charCodeAt(i);
    }
    return shift % 95; 
    range
}

function encrypt(text, shift) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode >= 32 && charCode <= 126) {
            let newCharCode = ((charCode - 32 + shift) % 95) + 32;
            encryptedText += String.fromCharCode(newCharCode);
        } else {
            encryptedText += text[i];
        }
    }
    return encryptedText;
}

function decrypt(text, shift) {
    let decryptedText = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode >= 32 && charCode <= 126) {
            let newCharCode = ((charCode - 32 - shift + 95) % 95) + 32;
            decryptedText += String.fromCharCode(newCharCode);
        } else {
            decryptedText += text[i];
        }
    }
    return decryptedText;
}

function encryptFile() {
    const fileInput = document.getElementById('fileInput');
    const password = document.getElementById('password').value;

    if (fileInput.files.length === 0 || !password) {
        alert('Please upload a file and enter a security key.');
        return;
    }

    const reader = new FileReader();
    const shift = generateShiftFromKey(password);

    reader.onload = function (event) {
        const fileContent = event.target.result;
        const encryptedContent = encrypt(fileContent, shift);
        document.getElementById('encryptedFile').value = encryptedContent;
    };

    reader.readAsText(fileInput.files[0]);
}

function decryptFile() {
    const fileInput = document.getElementById('fileInput');
    const password = document.getElementById('password').value;

    if (fileInput.files.length === 0 || !password) {
        alert('Please upload a file and enter a security key.');
        return;
    }

    const reader = new FileReader();
    const shift = generateShiftFromKey(password);

    reader.onload = function (event) {
        const encryptedContent = event.target.result;
        const decryptedContent = decrypt(encryptedContent, shift);
        document.getElementById('decryptedText').value = decryptedContent;
    };

    reader.readAsText(fileInput.files[0]);
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show';
    }
}

function viewEncryptedFile() {
    const encryptedContent = document.getElementById('encryptedFile').value;
    const blob = new Blob([encryptedContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'encrypted_file.txt';
    link.click();
}

function viewDecryptedFile() {
    const decryptedContent = document.getElementById('decryptedText').value;
    const blob = new Blob([decryptedContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'decrypted_file.txt';
    link.click();
}
