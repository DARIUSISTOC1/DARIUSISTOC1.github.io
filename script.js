const toggle = document.getElementById("theme-toggle");
if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}

const listBtn = document.getElementById("list-view");
const gridBtn = document.getElementById("grid-view");
const container = document.getElementById("projects-container");

if (listBtn) {
    listBtn.onclick = () => container.classList.add("list");
}

if (gridBtn) {
    gridBtn.onclick = () => container.classList.remove("list");
}

const search = document.getElementById("search");
if (search) {
    search.addEventListener("input", () => {
        const value = search.value.toLowerCase();
        document.querySelectorAll(".project-item").forEach(project => {
            project.style.display =
                project.textContent.toLowerCase().includes(value)
                    ? ""
                    : "none";
        });
    });
}
