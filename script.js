const sections = [
    {
        title: "Qui sommes Nous?",
        href: "#.html",
        subtitles: ["presentation", "q2"]
    },
    {
        title: "Nos conferences",
        href: "nos_conferences.html",
        subtitles: ["Conférence A"]
    },
    {
        title: "Etudes géologiques",
        href: "etudes ecologiques.html",
        subtitles: ["Contextes géologiques","mineralisation",
        "conclusion","archeen", "Processus de l'exploration","proterozoiques"]
    },
    {
        title: "Exploration Minière",
        href: "exploitation_miniere.html",
        subtitles: ["etude technique de l'exploitation de l'or",
         "Sécurité","implatation","carbon in pulp","modèle  d’engins d’appui au CIP"]
    }
];

const barRecherche = document.getElementById("entres");
const resultsContainer = document.getElementById("resltsreche");

// Fonction de recherche
const recherche = (query) => {
    // Vider les résultats
    resultsContainer.innerHTML = "";

    if (!query) {
        resultsContainer.style.display = "none";
        return;
    }

    const filterSections = sections.flatMap((section) => {
        const matches = [];
        // Vérifier le titre
        if (section.title.toLowerCase().includes(query.toLowerCase())) {
            matches.push({
                text: section.title,
                href: `${section.href}`,
                type: "title"
            });
        }
        // Vérifier les sous-titres
        if (Array.isArray(section.subtitles)) {
            section.subtitles.forEach((subtitle) => {
                if (typeof subtitle === "string" && subtitle.toLowerCase().includes(query.toLowerCase())) {
                    matches.push({
                        text: `${subtitle} (dans ${section.title})`,
                        href: `${section.href}#${subtitle.toLowerCase().replace(/ /g, "-")}`,
                        type: "subtitle"
                    });
                }
            });
        }
        return matches;
    });

    // Afficher les résultats
    if (filterSections.length > 0) {
        resultsContainer.style.display = "block";
        filterSections.forEach((match) => {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
            // Ajouter la surbrillance
            const highlightedText = match.text.replace(
                new RegExp(query, "gi"),
                (match) => `<span class="highlight">${match}</span>`
            );
            resultItem.innerHTML = `<a href="${match.href}" data-type="${match.type}">${highlightedText}</a>`;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        // Aucun résultat trouvé
        resultsContainer.style.display = "block";
        const noResult = document.createElement("div");
        noResult.className = "no-result";
        noResult.textContent = "Aucun résultat trouvé";
        resultsContainer.appendChild(noResult);
    }
};

// Gérer l'entrée de recherche
barRecherche.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (query) {
        recherche(query);
    } else {
        resultsContainer.style.display = "none";
    }
});

// Défilement automatique
resultsContainer.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (target) {
        e.preventDefault();
        const href = target.getAttribute("href");
        const type = target.getAttribute("data-type");
        const [page, anchor] = href.split("#");

        if (page) {
            window.location.href = page;
        }

        if (anchor) {
            setTimeout(() => {
                const element = document.getElementById(anchor);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 300);
        }
    }
});

// Cacher les résultats si on clique à l'extérieur
document.addEventListener("click", (e) => {
    if (!e.target.closest(".barrecherche")) {
        resultsContainer.style.display = "none";
    }
});

//GERER LES BOUTONS AVEC DES MESSAGES D'INFO
document.querySelectorAll(".buttoncarte.inactive").forEach((button)=>{
    button.addEventListener("click",(event)=>{
        event.preventDefault();//Empeche la navigation
        const message=button.getAttribute("data-message");
        alert(message);
    })
})
