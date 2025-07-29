document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    contactForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        formMessage.textContent = 'Sending message...';
        formMessage.className = 'mt-4 text-center text-sm font-medium text-blue-600';

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
                    name: name,
                    email: email,
                    message: message
                })
            });

            const data = await response.json();

            if (data.success) {
                formMessage.textContent = 'Message sent successfully! Thank you.';
                formMessage.className = 'mt-4 text-center text-sm font-medium text-green-600';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Failed to send message. Please try again later.';
                formMessage.className = 'mt-4 text-center text-sm font-medium text-red-600';
            }
        } catch (error) {
            formMessage.textContent = 'An error occurred. Please try again.';
            formMessage.className = 'mt-4 text-center text-sm font-medium text-red-600';
        }
    });
});