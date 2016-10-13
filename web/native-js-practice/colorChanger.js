/**
 * Created by ui2016 on 10/13/2016.
 */
actualColor = "#bdc3c7";

function changeColor(box, click) {
    var userContent = document.getElementById('userContent');
    var boxColor = window.getComputedStyle(box).getPropertyValue('background-color');

    if (click) {
        actualColor = boxColor;
    }

    userContent.style.backgroundColor = boxColor;

}

function resetColor() {
    var userContent = document.getElementById('userContent');
    userContent.style.backgroundColor = actualColor;
}