let filterEl;
let filterElements;


/**
 * js-work-quickfilters出现时进行按钮追加
 */
const intervalId = window.setInterval(async () => {
    await Promise.all([readSingleFilter(), readAutoSelect(), readDisableQuickToEdit()])
    if (window['js-work-quickfilters']) {
        window.clearInterval(intervalId);
        appendFilterBtn();
        appendHotkeyListener();
    }
}, 500);

function getLeftElement() {
    if (window['subnav-trigger-work']) {
        return window['subnav-trigger-work']
    }
    if (window['subnav-title']) {
        return window['subnav-title'].children[0]
    }
    return window['js-work-quickfilters'];
}

/**
 * @description
 * 追加单选按钮
 */
function appendFilterBtn() {
    const btn = document.createElement('div');
    btn.id = 'j-single-filter';
    btn.innerHTML = `
    Single Filter
    <label class="j-switch">
    <input type="checkbox" ${localSetting.singleFilter ? 'checked' : ''}>
    <span class="j-slider round"></span>
    </label>
    `;
    const leftEl = getLeftElement();
    btn.style.left = leftEl.getBoundingClientRect().left + leftEl.offsetWidth + 10 + 'px';
    btn.style.top = leftEl.getBoundingClientRect().top + 6 + 'px';
    document.body.appendChild(btn);
    btn.addEventListener('click', async function (e) {
            if (localSetting.singleFilter) {
                await turnOffSingleFilter();
                closeSingleFilter();
            } else {
                await turnOnSingleFilter();
                applySingleFilter();
            }
        },
        {
            capture: true
        }
    );
    filterEl = window['js-work-quickfilters'];
    if (localSetting.singleFilter) {
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
        let targetElement;
        if (filterElements.length === 1) {
            return;
        }
        if (e.key === 'ArrowUp') {
            if (isFirstElement) {
                return;
            }
            targetElement = focusUpElement(focusElement);
        } else if (e.key === 'ArrowRight') {
            if (isLastElement) {
                return;
            }
            targetElement = filterElements[focusElementIndex + 1];
        } else if (e.key === 'ArrowDown') {
            if (isLastElement) {
                return;
            }
            targetElement = focusDownElement(focusElement);
        } else if (e.key === 'ArrowLeft') {
            if (isFirstElement) {
                return;
            }
            targetElement = filterElements[focusElementIndex - 1];
        }
        if (targetElement) {
            targetElement.focus();
            localSetting.autoSelect && targetElement.click();
        }
    })
}

function isUnderFilters(upElement) {
    return filterEl.contains(upElement);
}

function focusUpElement(element) {
    return focusElement(element, 'up');
}

function focusDownElement(element) {
    return focusElement(element, 'down');
}

function focusElement(element, offsetPosition) {
    const rect = element.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2;
    const OFFSET = 30;
    const y = offsetPosition === 'up' ? (rect.top - OFFSET) : (rect.bottom + OFFSET);
    const upElement = document.elementFromPoint(x, y);
    if (upElement && isUnderFilters(upElement)) {
        return upElement;
    }
    return element;
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
