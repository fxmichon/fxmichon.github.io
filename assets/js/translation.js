function applyLanguage(lang) {
    fetch("assets/lang.json")
        .then(r => r.json())
        .then(data => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const keys = el.dataset.i18n.split(".");
                let val = data[lang];
                keys.forEach(k => { if (val) val = val[k]; });
                if (val) el.innerHTML = val;
            });
        });
}

function setCurrentLangUI(lang) {
    const current = document.getElementById("langCurrent");
    if (!current) return;
    const icon = current.querySelector("img");
    const label = current.querySelector("span");

    if (lang === "fr") {
        icon.src = "assets/icons/lang_fr.png";
        icon.alt = "FR";
        label.textContent = "FR";
    } else {
        icon.src = "assets/icons/lang_en.png";
        icon.alt = "EN";
        label.textContent = "EN";
    }
}

function updateCvDownload(lang) {
    const btn = document.getElementById("cvDownloadBtn");
    if (!btn) return;

    if (lang === "fr") {
        btn.href = "assets/CV/CV-MichonFX_Fr.pdf";
    } else {
        btn.href = "assets/CV/CV-MichonFX_En.pdf";
    }
}

function initLanguage() {
    const saved = localStorage.getItem("lang") || "fr";
    setCurrentLangUI(saved);
    applyLanguage(saved);
    updateCvDownload(saved);

    const current = document.getElementById("langCurrent");
    const dropdown = document.getElementById("langDropdown");

    if (current && dropdown) {
        current.addEventListener("click", () => {
            dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
        });

        dropdown.querySelectorAll(".lang-option").forEach(opt => {
            opt.addEventListener("click", () => {
                const lang = opt.dataset.lang;
                dropdown.style.display = "none";
                localStorage.setItem("lang", lang);
                setCurrentLangUI(lang);
                applyLanguage(lang);
            });
        });

        document.addEventListener("click", (e) => {
            if (!current.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", initLanguage);