document.addEventListener('DOMContentLoaded', (event) => {
    const error = new URLSearchParams(window.location.search).get("error") || "404";
    document.querySelector(".errortext").textContent = error;
});

function LinkTo(link) {
    window.open(link);
}

