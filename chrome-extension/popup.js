const extensionVersion = chrome.runtime.getManifest().version;
document.getElementById('jVersion').innerText = extensionVersion;

const localSetting = {
    disableQuickToEditIsOn: false
}
const disabledQuickToEditEl = document.getElementById('disabledQuickToEdit');

readDisableQuickToEdit().then((res) => {
    localSetting.disableQuickToEditIsOn = res;
    disabledQuickToEditEl.checked = res;
})

disabledQuickToEditEl.addEventListener('change', async (e) => {
    setDisableQuickToEdit(e.target.checked);
})