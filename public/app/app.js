function toAnker(e) {
  document.getElementById(e).scrollIntoView({ behavior: "smooth" });
}

function LinkTo(e) {
  window.open(e, "_blank");
}

window.onload = function () {
  document.querySelector("iframe").src =
    "https://gaestehaus-fideliushaus.tramino.de/api/widgets/timetable";
};

async function loadFAQ() {
    try {
        const response = await fetch('/api/faq');

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const faq = await response.json();
        const faqContainer = document.getElementById('faq-container');

        faqContainer.innerHTML = '';

        const faqElements = Object.entries(faq).map(([key, description]) => {
            const faqElement = document.createElement('div');
            faqElement.classList.add('faq-item');
            faqElement.innerHTML = `
                <h3 class="faq-title">${escapeHTML(key)}</h3>
                <p class="faq-answer">${escapeHTML(description)}</p>
            `;
            return faqElement;
        });

        faqContainer.append(...faqElements);

    } catch (error) {
        console.error('Failed to load FAQ:', error);
    }
}

function escapeHTML(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}

document.addEventListener('DOMContentLoaded', loadFAQ);