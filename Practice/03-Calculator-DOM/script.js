let button = document.getElementById('calc')
button.addEventListener('click',() => {
    let num1 = parseInt(document.getElementById('num1').value);
    let num2 = parseInt(document.getElementById('num2').value);

    document.getElementById('result').innerText = num1 + num2;
});