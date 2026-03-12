document.addEventListener('DOMContentLoaded', () => {
    console.log("Website Portofolio Siap!");

    // 1. AJAX Mengambil Data Portofolio menggunakan Fetch API
    const portfolioContainer = document.getElementById('portfolio-container');
    
    // Smooth scroll statis navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 70px offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    if (portfolioContainer) {
        fetch('php/data.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal memuat data');
                }
                return response.json();
            })
            .then(data => {
                portfolioContainer.innerHTML = ''; // bersihkan tulisan loading
                data.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'portfolio-item';
                    el.innerHTML = `
                        <img src="${item.image}" alt="${item.title}">
                        <div class="portfolio-info">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;
                    portfolioContainer.appendChild(el);
                });
            })
            .catch(error => {
                portfolioContainer.innerHTML = `<p class="error">Gagal memuat portofolio: ${error.message}</p>`;
            });
    }

    // 2. AJAX Form Submit untuk Form Kontak
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah form reload halaman

            // Ambil data dari input field
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Tampilkan tulisan sending
            formResponse.innerHTML = '<p class="loading">Mengirim pesan...</p>';

            // Kirim via AJAX Post (Fetch API)
            fetch('php/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    formResponse.innerHTML = `<p class="success">${result.message}</p>`;
                    contactForm.reset(); // Kosongkan form setelah sukses
                } else {
                    formResponse.innerHTML = `<p class="error">${result.message}</p>`;
                }
            })
            .catch(error => {
                formResponse.innerHTML = `<p class="error">Terjadi kesalahan pada server.</p>`;
            });
        });
    }
});
