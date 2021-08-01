const extensionVersion = chrome.runtime.getManifest().version;
document.getElementById('jVersion').innerText = extensionVersion;

const localSetting = {
    disableQuickToEditIsOn: true,
    // 自动选中
    autoSelect: true
}
const disabledQuickToEditEl = document.getElementById('disabledQuickToEdit');
const autoSelectToEditEl = document.getElementById('autoSelect');

readDisableQuickToEdit().then((res) => {
    localSetting.disableQuickToEditIsOn = res;
    disabledQuickToEditEl.checked = res;
})

readAutoSelect().then((res) => {
    localSetting.autoSelect = res;
    autoSelectToEditEl.checked = res;
})

disabledQuickToEditEl.addEventListener('change', async (e) => {
    setDisableQuickToEdit(e.target.checked);
})

autoSelectToEditEl.addEventListener('change', async (e) => {
    setAutoSelect(e.target.checked);
})
