document.addEventListener("DOMContentLoaded", () => {

    /* MENU HAMBÚRGUER */
    const menuToggle = document.getElementById("menuToggle");
    const navList = document.getElementById("navList");
    const body = document.body;

    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");
        body.classList.toggle("menu-open");
    });

    /* FECHAR MENU AO CLICAR EM LINK */
    document.querySelectorAll(".navList a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("active");
            body.classList.remove("menu-open");
        });
    });

    /* FAQ */
    document.querySelectorAll(".faq-item").forEach(item => {
        item.querySelector(".faq-question").addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });

});