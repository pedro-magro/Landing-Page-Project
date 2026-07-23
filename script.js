/**
 * Landing Page - Raquel Janzen Teacher (Inglês Personalizado)
 * Lógica de Interface, Animações e Segurança
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initTypewriter();
    initScrollReveal();
    initFAQ();
    initContactForm();
});

/**
 * 1. Efeito Scroll no Header Navbar
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * 2. Menu Hamburguer Responsivo
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('nav a');
    
    if (!menuBtn || !navbar) return;

    // Toggle Menu
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('open');
        const icon = menuBtn.querySelector('i');
        if (navbar.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    // Fechar ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            menuBtn.querySelector('i').className = 'fa-solid fa-bars-staggered';
            
            // Atualiza classe active
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

/**
 * 3. Efeito Typewriter (Escrita Dinâmica no Hero)
 */
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;

    const words = JSON.parse(textElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const fullWord = words[wordIndex];

        if (isDeleting) {
            currentText = fullWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullWord.substring(0, charIndex + 1);
            charIndex++;
        }

        textElement.textContent = currentText;

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && currentText === fullWord) {
            // Pausa no final da palavra escrita
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            // Pausa antes de começar a digitar próxima palavra
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    // Inicia o loop de digitação
    setTimeout(type, 1000);
}

/**
 * 4. Scroll Reveal (Intersection Observer)
 * Revela elementos suavemente ao rolar a página
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Para de observar o elemento após a animação rodar uma vez
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 5. FAQ Accordion (Perguntas Frequentes Interativas)
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            
            // Fecha outros abertos para manter visual clean
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
}

/**
 * 6. Formulário de Contato - Validação e Segurança
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const messageBox = document.getElementById('form-message');
    
    if (!form) return;

    // Função de sanitização básica de strings (XSS Protection)
    function sanitizeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset da mensagem de status
        messageBox.className = 'form-message';
        messageBox.style.display = 'none';

        // 1. Segurança Honeypot
        const honeypot = document.getElementById('website').value;
        if (honeypot.trim() !== '') {
            console.warn("Spambot detectado e bloqueado.");
            messageBox.textContent = "Mensagem enviada com sucesso!"; // Sucesso falso para o bot
            messageBox.className = 'form-message success';
            form.reset();
            return;
        }

        // 2. Coleta e Sanitização de Dados
        const name = sanitizeHTML(form.name.value.trim());
        const email = sanitizeHTML(form.email.value.trim());
        const phone = sanitizeHTML(form.phone.value.trim());
        const message = sanitizeHTML(form.message.value.trim());

        // 3. Validação dos Campos Principais
        if (!name || !email || !phone) {
            messageBox.textContent = "Por favor, preencha todos os campos obrigatórios (*).";
            messageBox.className = 'form-message error';
            return;
        }

        // Validação básica de formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageBox.textContent = "Por favor, insira um endereço de e-mail válido.";
            messageBox.className = 'form-message error';
            return;
        }

        // Validação simples de telefone (pelo menos 8 caracteres numéricos)
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 8) {
            messageBox.textContent = "Por favor, insira um número de telefone/WhatsApp válido.";
            messageBox.className = 'form-message error';
            return;
        }

        // 4. Feedback Visual de Envio
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

        // Envio real dos dados para a API serverless Vercel
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor.');
            }
            return response.json();
        })
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            // Sucesso do Envio
            messageBox.textContent = `Obrigado, ${name}! Sua solicitação foi salva no nosso banco de dados. Redirecionando para o WhatsApp...`;
            messageBox.className = 'form-message success';

            // Redirecionar direto para o WhatsApp preenchendo as informações
            const whatsappBaseUrl = "https://wa.me/5500000000000";
            const customMessage = encodeURIComponent(
                `Olá Raquel Janzen Teacher! Meu nome é ${name}.\n\nE-mail: ${email}\nWhatsApp: ${phone}\nObjetivo: ${message || 'Não especificado'}`
            );

            // Limpa o formulário
            form.reset();

            // Abre o WhatsApp em nova guia após 1.5 segundos
            setTimeout(() => {
                window.open(`${whatsappBaseUrl}?text=${customMessage}`, '_blank', 'noopener,noreferrer');
            }, 1500);
        })
        .catch(err => {
            console.error('Erro de envio do lead:', err);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            messageBox.textContent = "Ocorreu um problema ao registrar seus dados no banco. Por favor, tente novamente ou fale diretamente pelo WhatsApp.";
            messageBox.className = 'form-message error';
        });
    });
}
