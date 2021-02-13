// To avoid race problem, the following should not be in window.onload as the PaperScript might run before.
window.globals = { a:50, b:-50 };

// Update the path from the JavaScript code.
window.onload = function() {
    document.getElementById('lineToBtn').onclick = function() {
        let x = Number(document.getElementById('x').value);
        let y = Number(document.getElementById('y').value);
        window.globals.lineTo(x,y);
    };
};