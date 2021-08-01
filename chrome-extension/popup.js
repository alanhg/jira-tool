const extensionVersion = chrome.runtime.getManifest().version;
document.getElementById('jVersion').innerText = extensionVersion;

const disabledQuickToEditEl = document.getElementById('disabledQuickToEdit');
const autoSelectToEditEl = document.getElementById('autoSelect');

readDisableQuickToEdit().then(() => {
    disabledQuickToEditEl.checked = localSetting.disableQuickToEditIsOn;
})

readAutoSelect().then((res) => {
    autoSelectToEditEl.checked = localSetting.autoSelect;
})

disabledQuickToEditEl.addEventListener('change', async (e) => {
    setDisableQuickToEdit(e.target.checked);
})

autoSelectToEditEl.addEventListener('change', async (e) => {
    setAutoSelect(e.target.checked);
})
