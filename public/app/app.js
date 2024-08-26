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

        // Iterate over the FAQ array to create the elements
        faq.forEach(({ question, answer, icon }) => {
            const faqElement = document.createElement('div');
            faqElement.classList.add('faq-item');

            faqElement.innerHTML = `
                <div class="faq-icon-text">
                    <i class="${escapeHTML(icon)} faq-icon"></i>
                    <div>
                        <h3 class="faq-title">${escapeHTML(question)}</h3>
                        <p class="faq-answer">${escapeHTML(answer)}</p>
                    </div>
                </div>
            `;

            faqContainer.appendChild(faqElement);
        });

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