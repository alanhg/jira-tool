const DESCRIPTION_EL_ID = 'description-val';


function disableEvent(e) {
    e.preventDefault();
}

async function disableQuickToEdit() {
    await readDisableQuickToEdit();
    toggleDisableEvent(localSetting.disableQuickToEditIsOn);
}

async function toggleDisableEvent(disabled) {
    const descriptionEl = window[DESCRIPTION_EL_ID];
    if (disabled) {
        descriptionEl.removeAttribute('title');
        descriptionEl.classList.add('j-not-allowed');
        descriptionEl.getElementsByClassName('user-content-block')[0].addEventListener('click', disableEvent)
    } else {
        descriptionEl.setAttribute('title', 'Click to edit');
        descriptionEl.classList.remove('j-not-allowed');
        descriptionEl.getElementsByClassName('user-content-block')[0].removeEventListener('click', disableEvent)
    }
}


function handleCopyBtnClick() {
    navigator.clipboard.writeText(`${window['summary-val'].textContent} ${window.location.href.replace(/#?$/, '')}`).then(() => {
        Toastify({
            text: `Copied to clipboard`,
            duration: 3000,
            position: 'center',
            backgroundColor: '#36b37e'
        }).showToast();
    })
}

/**
 * 追加copy按钮
 */
function appendCopyBtn() {
    let toolBars = document.getElementsByClassName('aui-toolbar2-primary');
    if (toolBars.length === 0) {
        return;
    }
    const toolbarEl = toolBars[0];
    toolbarEl.innerHTML = toolbarEl.innerHTML += `
    <div id="opsbar-opsbar-copy" class="aui-buttons pluggable-ops">
    <a href="#" id="opsbar-copy" class="aui-button"  resolved="">
    <span class="dropdown-text">Copy Title & Link</span></a></div>
   `;
    document.getElementById('opsbar-copy').onclick = handleCopyBtnClick;
}

function init() {
    appendCopyBtn();
    const intervalId = window.setInterval(async () => {
        if (window[DESCRIPTION_EL_ID]) {
            window.clearInterval(intervalId);
            disableQuickToEdit();
        }
    }, 500);
}

init();
