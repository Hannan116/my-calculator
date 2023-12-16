document.addEventListener("DOMContentLoaded", function () {
    var displayInput = document.getElementById("display-input");
    var buttons = document.querySelectorAll(".btn");
    var isButtonClicked = false;

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (!isButtonClicked) {
                isButtonClicked = true;
                handleButtonClick(button.value);
                setTimeout(function () {
                    isButtonClicked = false;
                }, 100); // Set a delay to prevent double clicks due to rapid button clicks
            }
        });
    });

    document.addEventListener("keydown", function (event) {
        handleKeyPress(event.key, event);
    });

    function handleButtonClick(value) {
        switch (value) {
            case "AC":
                clearDisplay();
                break;
            case "DE":
                deleteLastEntry();
                break;
            case "=":
                calculate();
                break;
            default:
                appendInput(value);
        }
    }

    function handleKeyPress(key, event) {
        event.preventDefault(); // Prevent default key behavior like adding a space after pressing the spacebar

        var validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/"];

        if (validKeys.includes(key)) {
            if (key === "0" && displayInput.value !== "") {
                // If "0" is pressed and display is not empty, clear the display
                clearDisplay();
            } else {
                appendInput(key);
            }
        } else if (key === "Enter" || key === "Backspace") {
            switch (key) {
                case "Enter":
                    calculate();
                    break;
                case "Backspace":
                    deleteLastEntry();
                    break;
            }
        }
    }

    function appendInput(value) {
        displayInput.value += value;
    }

    function clearDisplay() {
        displayInput.value = "";
    }

    function deleteLastEntry() {
        displayInput.value = displayInput.value.slice(0, -1);
    }

    function calculate() {
        try {
            var result = evaluateExpression(displayInput.value);
            displayInput.value = result;
        } catch (error) {
            displayInput.value = "Error";
        }
    }

    function evaluateExpression(expression) {
        return Function('"use strict";return (' + expression + ')')();
    }
});
