function $(selector) {
    return document.querySelector(selector);
}

function _$(selector) {
    return document.querySelectorAll(selector);
}

HTMLElement.prototype.on = function(event, callback) {
    this.addEventListener(event, callback);
}

HTMLElement.prototype.val = function(value) {
    if(value !== undefined) this.value = value
    return this.value;
}

HTMLElement.prototype.addClass = function(className) {
    this.classList.add(className);
}


HTMLElement.prototype.removeClass = function(className) {
    this.classList.remove(className);
}

function debounce(callback, time) {
    setTimeout(callback, time);
}