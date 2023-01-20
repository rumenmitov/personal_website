onclick = () => {
    location.href = './home/home.html';
}

onkeypress = () => {
    location.href = './home/home.html';
}

window.onload = () => {
    let paragraphs = document.querySelectorAll("p");

    setTimeout(()=>{
        paragraphs[0].setAttribute("class", "show");
    }, 700);

    setTimeout(()=>{
        paragraphs[1].setAttribute("class", "show");
    }, 1500);
}