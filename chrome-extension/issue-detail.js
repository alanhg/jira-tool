const intervalId = window.setInterval(async () => {
    if (window['description-val']) {
        window.clearInterval(intervalId);
        disableQuickToEdit();
    }
}, 500);

function disableEvent(e) {
    e.preventDefault();
}

async function disableQuickToEdit() {
    if (!await readDisableQuickToEdit()) {
        return;
    }
    const descriptionEl = window['description-val'];
    descriptionEl.removeAttribute('title');
    descriptionEl.getElementsByClassName('user-content-block')[0].addEventListener('click', disableEvent)
}