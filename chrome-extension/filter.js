const SINGLE_FILTER_SWITCH_KEY = 'single_filter_switch';
let filterEl;
let filterElements;

function readStorage() {
    return new Promise(function (resolve) {
        chrome.storage.local.get([SINGLE_FILTER_SWITCH_KEY], function (result) {
            localSetting.switchIsOn = result[SINGLE_FILTER_SWITCH_KEY] === 'true';
            localSetting.switchStatusString = localSetting.switchIsOn ? 'on' : 'off';
            resolve();
        });
    })
}

/**
 * js-work-quickfilters出现时进行按钮追加
 */
const intervalId = window.setInterval(async () => {
    if (window['js-work-quickfilters']) {
        window.clearInterval(intervalId);
        await readStorage();
        appendFilterBtn();
        appendHotkeyListener();
    }
}, 500);

const localSetting = {
    switchIsOn: false,
    switchStatusString: null,
    turnOn: () => new Promise(function (resolve) {
        chrome.storage.local.set({[SINGLE_FILTER_SWITCH_KEY]: 'true'}, () => {
            readStorage().then(resolve);
        });
    }),
    turnOff: () => new Promise(function (resolve) {
        chrome.storage.local.set({[SINGLE_FILTER_SWITCH_KEY]: 'false'}, () => {
            readStorage().then(resolve);
        });
    }),
}

function getLeftElement() {
    if (window['subnav-trigger-work']) {
        return window['subnav-trigger-work']
    }
    if (window['subnav-title']) {
        return window['subnav-title'].children[0]
    }
    return window['js-work-quickfilters'];
}

function appendFilterBtn() {
    const btn = document.createElement('div');
    btn.id = 'jira-single-filter';
    btn.innerHTML = `
    Single Filter
    <label class="switch">
    <input type="checkbox" ${localSetting.switchIsOn ? 'checked' : ''}>
    <span class="slider round"></span>
    </label>
    `;
    const leftEl = getLeftElement();
    btn.style.left = leftEl.getBoundingClientRect().left + leftEl.offsetWidth + 10 + 'px';
    btn.style.top = leftEl.getBoundingClientRect().top + 6 + 'px';
    document.body.appendChild(btn);
    btn.addEventListener('click', async function (e) {
            if (localSetting.switchIsOn) {
                await localSetting.turnOff();
                closeSingleFilter();
            } else {
                await localSetting.turnOn();
                applySingleFilter();
            }
        },
        {
            capture: true
        }
    );
    filterEl = window['js-work-quickfilters'];
    if (localSetting.switchIsOn) {
        applySingleFilter();
    }
}

/**
 * @description
 * 点击热键方向键【上下左右】，实现filter切换
 */
function appendHotkeyListener() {
    filterElements = filterEl.getElementsByTagName('a');
    window['js-work-quickfilters'].addEventListener('keydown', function (e) {
        const focusElement = document.activeElement;
        const focusElementIndex = Array.prototype.findIndex.call(filterElements, item => item === focusElement);
        const isFirstElement = focusElementIndex === 0;
        const isLastElement = focusElementIndex === (filterElements.length - 1);

        if (filterElements.length === 1) {
            return;
        }
        if (e.key === 'ArrowUp') {
            if (isFirstElement) {
                return;
            }
            focusUpElement(focusElement);
        } else if (e.key === 'ArrowRight') {
            if (isLastElement) {
                return;
            }
            filterElements[focusElementIndex + 1].focus();
        } else if (e.key === 'ArrowDown') {
            if (isLastElement) {
                return;
            }
            focusDownElement(focusElement);
        } else if (e.key === 'ArrowLeft') {
            if (isFirstElement) {
                return;
            }
            filterElements[focusElementIndex - 1].focus();
        }
    })
}

function isUnderFilters(upElement) {
    return filterEl.contains(upElement);
}

function focusUpElement(element) {
    focusElement(element, 'up');
}

function focusDownElement(element) {
    focusElement(element, 'down');
}

function focusElement(element, offsetPosition) {
    const rect = element.getBoundingClientRect();
    const x = rect.left;
    const OFFSET = 30;
    const y = offsetPosition === 'up' ? (rect.top - OFFSET) : (rect.bottom + OFFSET);
    const upElement = document.elementFromPoint(x, y);
    if (upElement && isUnderFilters(upElement)) {
        upElement.focus();
    }
}


function filterInterceptor(e) {
    if (e.target.dataset.filterId) {
        Array.prototype.forEach.call(filterEl.getElementsByClassName('ghx-active'), function (item) {
            if (item !== e.target) {
                item.click();
            }
        });
    }
}


function applySingleFilter() {
    filterEl.addEventListener('click', filterInterceptor, {capture: true})
}

function closeSingleFilter() {
    filterEl.removeEventListener('click', filterInterceptor, {capture: true})
}