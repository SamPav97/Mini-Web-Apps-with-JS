// Notifications template.
let container = document.getElementById('errorBox');
let span = container.querySelector('span');

export function notify(message) {
    span.textContent = message;
    container.style.display = 'block';

    setTimeout(() => container.style.display = 'none', 3000) // Disappears in 3 sec
}

// Put notigy everywhere you want to alert the user of something.