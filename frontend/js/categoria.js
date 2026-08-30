document.querySelectorAll(".cat-card").forEach(card=>{
    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();
        const x=e.clientX-rect.left;
        const y=e.clientY-rect.top;
        const rotateY=(x-rect.width/2)/25;
        const rotateX=(rect.height/2-y)/25;

        card.style.transform=`
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
        `;

    });

    card.addEventListener("mouseleave",()=>{
        card.style.transform="perspective(900px) rotateX(0) rotateY(0)";
    });

});

/* ESLIDER DE IMAGNES DE INICIO */

const slides=document.querySelectorAll(".slide");
const dots=document.querySelectorAll(".dot");
let current=0;
function showSlide(index){
    slides.forEach(slide=>slide.classList.remove("active"));
    dots.forEach(dot=>dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function nextSlide(){
    current++;
    if(current>=slides.length){
        current=0;
    }
    showSlide(current);
}
setInterval(nextSlide,5000);
dots.forEach((dot,index)=>{
    dot.addEventListener("click",()=>{
        current=index;
        showSlide(current);
    });

});
