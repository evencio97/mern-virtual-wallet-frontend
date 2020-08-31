export const addAnimation = (elem, animation= "animated") => {
    elem.classList.add("animated");
    if (elem.onanimationend) return;
    elem.onanimationend = function () { elem.classList.remove(animation); }
}