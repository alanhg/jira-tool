const DISABLE_QUICK_TO_EDIT_KEY = 'DISABLE_QUICKTO_EDIT_SWITCH';

const localSetting = {
    disableQuickToEditIsOn: false
}
const disabledQuickToEditEl = document.getElementById('disabledQuickToEdit');

function readStorage() {
    return new Promise(function (resolve) {
        chrome.storage.local.get([DISABLE_QUICK_TO_EDIT_KEY], function (result) {
            localSetting.disableQuickToEditIsOn = result[DISABLE_QUICK_TO_EDIT_KEY] === 'true';
            resolve();
        });
    })
}

readStorage().then(() => {
    disabledQuickToEditEl.checked = localSetting.disableQuickToEditIsOn;
})

disabledQuickToEditEl.addEventListener('change', (e) => {
    chrome.storage.local.set({[DISABLE_QUICK_TO_EDIT_KEY]: String(e.target.checked)}, () => {
        readStorage().then(resolve);
    });
})