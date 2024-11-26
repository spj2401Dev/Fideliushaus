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

        Object.entries(faq).forEach(([key, description]) => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item');

            const faqTitle = document.createElement('h3');
            faqTitle.classList.add('faq-title');
            faqTitle.textContent = key;

            const faIcon = document.createElement('i');
            faIcon.classList.add('fa-solid', 'fa-chevron-down', 'faq-collapse-icon');
            faqTitle.appendChild(faIcon);

            const faqAnswer = document.createElement('p');
            faqAnswer.classList.add('faq-answer');
            faqAnswer.textContent = description;
            faqAnswer.style.height = '0'; // Collapsed by default
            faqAnswer.style.overflow = 'hidden'; // Ensure no overflow during animation

            // Toggle display on click
            faqItem.addEventListener('click', () => {
                const isCollapsed = faqAnswer.style.height === '0px';
                if (isCollapsed) {
                    // Expand
                    faqAnswer.style.height = `${faqAnswer.scrollHeight}px`;
                } else {
                    // Collapse
                    faqAnswer.style.height = '0';
                }
                faqTitle.classList.toggle('faq-active', isCollapsed);
                faIcon.classList.toggle('fa-chevron-up', isCollapsed);
                faIcon.classList.toggle('fa-chevron-down', !isCollapsed);
            });

            faqItem.appendChild(faqTitle);
            faqItem.appendChild(faqAnswer);
            faqContainer.appendChild(faqItem);
        });
    } catch (error) {
        console.error('Failed to load FAQ:', error);
    }
}

// Escape HTML function
function escapeHTML(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}

// Load FAQ on DOM content loaded
document.addEventListener('DOMContentLoaded', loadFAQ);
