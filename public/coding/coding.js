const observerFloat = new IntersectionObserver((entries)=> {
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            entry.target.classList.add("float_in");
        } else {
            entry.target.classList.remove("float_in");
        }
    });
});

const observerStagger = new IntersectionObserver((entries)=> {
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            entry.target.classList.add("stagger_in");
        } else {
            entry.target.classList.remove("stagger_in");
        }
    });
});

window.onload = () => {
    const hiddenFloatElements = document.querySelectorAll(".projects");
    hiddenFloatElements.forEach((element)=> observerFloat.observe(element));

    const hiddenStaggerElements = document.querySelectorAll(".moreProjects");
    hiddenStaggerElements.forEach((element)=> observerStagger.observe(element));
}