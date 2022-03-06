const viewBtns = document.querySelectorAll(".view-btn");
const gameList = document.querySelector("#game-list");
const cards = document.querySelectorAll(".card");
const filterInput = document.querySelector("#view-controls input[type='text']");




viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        viewBtns.forEach((dbtn) => {
            dbtn.classList.remove("active");
            const dataClass = dbtn.getAttribute("data-class");
            gameList.classList.remove(dataClass);
        });
        btn.classList.add("active");
        const dataClass = btn.getAttribute("data-class");
        gameList.classList.add(dataClass);
    });
});


filterInput.addEventListener("keyup", (event) => {
    const str = filterInput.value.toLowerCase();
    const games = gameList.querySelectorAll(".card");
    games.forEach((game) => {
        const h3 = game.querySelector("h3");
        if(h3) {
            const txtValue = h3.innerText || h2.textContent;
            if (txtValue.toLowerCase().indexOf(str) > -1) {
                game.style.display = "";
            }
            else {
                game.style.display = "none";
            }
        }
    });
});

fetch("games.json").then(response => response.json()).then(data => {
    data.forEach((game) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<h3>${game.title}</h3>
<img src="${game.imgsrc || "img/game-controller.svg"}" width=128 height=128>
<a href="${game.link || "#"}" class="${game.link ? "main-link" : ""}"></a>`;
        card.addEventListener("click", () => {
            const isTextSelected = window.getSelection().toString();
            if (!isTextSelected) {
                const mainLink = card.querySelector(".main-link");
                if (mainLink) {
                    mainLink.click();
                }
            }
        });
        gameList.appendChild(card);

    });
});