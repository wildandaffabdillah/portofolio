/* 
========================================================================
   Wildan Daffa Abdillah Portfolio JS - Cyber & Web Developer Theme
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. TYPING TEXT ANIMATION
    const typedOutput = document.getElementById('typed-output');
    const strings = [
        "IT Student @ President University",
        "Cybersecurity Enthusiast",
        "Aspiring Penetration Tester",
        "Full-Stack Web Developer",
        "Linux OS System Admin"
    ];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentString = strings[stringIndex];
        
        if (isDeleting) {
            typedOutput.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deletion
        } else {
            typedOutput.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typedOutput) {
        setTimeout(typeEffect, 1000);
    }

    // 2. STICKY HEADER & MOBILE HAMBURGER MENU
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking navigation item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // 3. SCROLL INTERSECTION OBSERVER
    const animElements = document.querySelectorAll('.animate-on-scroll');
    const skillBars = document.querySelectorAll('.progress-bar');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // If it's a skill category card, trigger child progress bar animations
                if (entry.target.classList.contains('skill-category-card')) {
                    const bars = entry.target.querySelectorAll('.progress-bar');
                    bars.forEach(bar => {
                        const targetWidth = bar.style.width; // Read pre-defined inline width
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                }
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => scrollObserver.observe(el));
    
    // Also observe skill cards specifically for their bar loads
    const skillCards = document.querySelectorAll('.skill-category-card');
    skillCards.forEach(card => scrollObserver.observe(card));

    // 4. DYNAMIC PROJECTS FILTER SYSTEM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset styling/opacity before transitioning
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // 5. INTERACTIVE CYBER TERMINAL CLI ENGINE
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');

    // Focus input when clicking anywhere inside the terminal box
    const terminalInterface = document.getElementById('terminal-interface');
    if (terminalInterface) {
        terminalInterface.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    const commandRegistry = {
        help: () => {
            return `<div class="term-res-success">
                Available Commands:<br>
                - <span class="term-cmd-highlight">about</span>          : Displays brief background information.<br>
                - <span class="term-cmd-highlight">skills</span>         : Lists core security & programming toolsets.<br>
                - <span class="term-cmd-highlight">experience</span>     : Highlights IT internship history.<br>
                - <span class="term-cmd-highlight">projects</span>       : Lists developed web applications.<br>
                - <span class="term-cmd-highlight">certifications</span> : Displays verified security badges.<br>
                - <span class="term-cmd-highlight">journey</span>        : Describes the personal cybersecurity learning path.<br>
                - <span class="term-cmd-highlight">social</span>         : Displays active contact gateways.<br>
                - <span class="term-cmd-highlight">clear</span>          : Purges the console terminal output.<br>
                - <span class="term-cmd-highlight">secret</span>         : Decrypt classified flags.<br>
            </div>`;
        },
        about: () => {
            return `<div class="term-res-success">
                <span class="highlight-cyan">[ Wildan Daffa Abdillah ]</span><br>
                IT student specializing in Cyber Security infrastructure. Passionate about diagnosing web application flaws, hardening services against attacks, and automating administrative servers.<br>
                Current focus: OWASP Top 10 exploits & secure backend design patterns.
            </div>`;
        },
        skills: () => {
            return `<div class="term-res-success">
                === REGISTERED SKILLSETS ===<br>
                - <span class="highlight-cyan">Cybersecurity:</span> Web Exploitation, basic pentesting, network analysis (Wireshark), vulnerability auditing.<br>
                - <span class="highlight-cyan">Languages:</span> PHP, HTML, CSS, JavaScript, Python (BeautifulSoup, Pandas, NLTK).<br>
                - <span class="highlight-cyan">Platforms:</span> Linux (Ubuntu / Kali Linux), Git/GitHub, VS Code, AWS Basics.
            </div>`;
        },
        experience: () => {
            return `<div class="term-res-success">
                === PROFESSIONAL HISTORY ===<br>
                <span class="highlight-cyan">Programmer internship @ Diskominfosantik Kab Bekasi &middot; Internship</span><br>
                - Duration : Jun 2025 - Aug 2025 (3 mos) [On-site]<br>
                - Location : Komplek Perkantoran Pemkab Bekasi Ds. Sukamahi, Cikarang Pusat Kab. Bekasi<br>
                - Duties   : Website maintenance, network troubleshooting, and government digital systems support.<br>
                - Scripting: Implemented a Python data crawler for governmental social media sentiment analysis.
            </div>`;
        },
        projects: () => {
            return `<div class="term-res-success">
                === DEVELOPED REPOSITORIES ===<br>
                1. <span class="highlight-cyan">PIXL Web Service Platform:</span> Web order automation (PHP, HTML, CSS, JS, MySQL).<br>
                2. <span class="highlight-cyan">QR Attendance System:</span> Dynamic QR scanner attendance engine (JS, PHP, Bootstrap, MySQL).<br>
                3. <span class="highlight-cyan">Sentiment Analyzer:</span> Twitter feedback crawler and visual miner (Python, NLTK).
            </div>`;
        },
        certifications: () => {
            return `<div class="term-res-success">
                === VERIFIED BADGES ===<br>
                - [✔] Web Exploitation &mdash; Cyberkarta<br>
                - [✔] Secrets Flag Extraction Labs &mdash; Cyberkarta<br>
                - [✔] Data Center Fundamentals &mdash; Industry Academy<br>
                - [✔] AWS Serverless Analytics &mdash; Amazon Web Services<br>
                - [✔] Amazon Redshift Analytics &mdash; Amazon Web Services
            </div>`;
        },
        journey: () => {
            return `<div class="term-res-success">
                === MY CYBERSECURITY LEARNING PATH ===<br>
                - <span class="highlight-cyan">CTF Exercises:</span> Solving cryptography, parsing malware logs, and extracting flags from intentionally vulnerable targets.<br>
                - <span class="highlight-cyan">Linux Hardening:</span> Configuring local secure shells (SSH keys), firewall setups (iptables), and basic server management.<br>
                - <span class="highlight-cyan">Secure Code Practices:</span> Hardening PHP registration forms against SQL Injection and Cross-Site Scripting (XSS).
            </div>`;
        },
        social: () => {
            return `<div class="term-res-success">
                === CONNECT GATEWAY ===<br>
                - GitHub   : github.com/wildandaffabdillah<br>
                - LinkedIn : Wildan Daffa Abdillah<br>
                - Email    : wildandaffa.work@gmail.com
            </div>`;
        },
        secret: () => {
            return `<div class="term-res-success" style="color: #22c55e;">
                [!] EXPLOITING VULNERABILITY...<br>
                [!] EXTRACTING SECRETS STACK...<br>
                [✔] DECRYPTION SUCCESSFUL!<br>
                FLAG: <span style="font-weight:bold; text-shadow: 0 0 8px #22c55e;">FLAG{WDA_CYBER_SEC_ACCESS_GRANTED}</span>
            </div>`;
        },
        sudo: () => {
            return `<div class="term-res-error">[!] Permission denied. Guest account is not in the sudoers list. This incident will be logged.</div>`;
        },
        flag: () => {
            return `<div class="term-res-success">Try typing '<span class="term-cmd-highlight">secret</span>' to extract the system flag!</div>`;
        }
    };

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawInput = terminalInput.value.trim();
                const cmd = rawInput.toLowerCase();
                
                // Create user query echo line
                const echoLine = document.createElement('p');
                echoLine.className = 'term-line';
                echoLine.innerHTML = `<span class="term-prompt">guest@wda.sec:~$</span> ${rawInput}`;
                terminalOutput.appendChild(echoLine);
                
                if (cmd !== '') {
                    if (cmd === 'clear') {
                        terminalOutput.innerHTML = '';
                    } else if (commandRegistry[cmd]) {
                        const response = document.createElement('div');
                        response.innerHTML = commandRegistry[cmd]();
                        terminalOutput.appendChild(response);
                    } else {
                        const errorResponse = document.createElement('p');
                        errorResponse.className = 'term-res-error';
                        errorResponse.textContent = `wda-shell: command not found: ${rawInput}. Type 'help' for available directives.`;
                        terminalOutput.appendChild(errorResponse);
                    }
                }
                
                // Clear input field and scroll to bottom
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    // 6. PROGRAMMATIC SIMULATED GITHUB CONTRIBUTION CALENDAR
    const gitCalendar = document.getElementById('simulated-git-calendar');
    
    if (gitCalendar) {
        // We generate 53 weeks * 7 days = 371 calendar cells
        const cellCount = 371;
        
        // Define realistic distribution weights for commits
        // 0: none, 1: low, 2: medium, 3: high, 4: very high
        const contributionLevels = [
            0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4,
            0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2
        ];
        
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < cellCount; i++) {
            const tile = document.createElement('div');
            // Distribute randomly with weights to look realistic
            const levelIndex = Math.floor(Math.random() * contributionLevels.length);
            const level = contributionLevels[levelIndex];
            
            tile.className = `git-calendar-tile sq-${level}`;
            
            // Tooltip showing simulated commit counts on hover
            const dateOffset = cellCount - i;
            const simulatedDate = new Date();
            simulatedDate.setDate(simulatedDate.getDate() - dateOffset);
            
            const commitsNum = level === 0 ? 'No' : level * Math.floor(Math.random() * 3 + 1);
            const tooltipText = `${commitsNum} commits on ${simulatedDate.toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}`;
            
            tile.setAttribute('title', tooltipText);
            fragment.appendChild(tile);
        }
        
        gitCalendar.appendChild(fragment);
    }

    // 7. CONTACT FORM SUBMISSION ANGLER
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('btn-submit-form');

    if (contactForm && formStatus && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show secure transmit warning and animate
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Encrypting Data Stream...`;
            
            setTimeout(() => {
                submitBtn.innerHTML = `<i class="fa-solid fa-shield-halved fa-beat-fade"></i> Establishing Handshake...`;
                
                setTimeout(() => {
                    // Show success status
                    formStatus.className = 'form-notification success';
                    formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connection Established! Message transmitted securely. I will respond to your address shortly.`;
                    
                    // Reset button and inputs
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    contactForm.reset();
                    
                    // Fade out success notification after 5s
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, 1500);
            }, 1200);
        });
    }

    // 8. BACK TO TOP BUTTON TOGGLER
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. CERTIFICATE LIGHTBOX MODAL TRIGGER
    const certModal = document.getElementById('cert-modal');
    const certModalImg = document.getElementById('cert-modal-img');
    const certModalCaption = document.getElementById('cert-modal-caption');
    const certModalClose = document.getElementById('cert-modal-close');
    const certButtons = document.querySelectorAll('.btn-cert-view');

    certButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certSrc = btn.getAttribute('data-cert');
            const certTitle = btn.closest('.cert-card').querySelector('.cert-title').textContent;
            
            if (certModal && certModalImg && certModalCaption) {
                certModal.style.display = 'block';
                certModalImg.src = certSrc;
                certModalCaption.textContent = certTitle;
            }
        });
    });

    if (certModalClose && certModal) {
        certModalClose.addEventListener('click', () => {
            certModal.style.display = 'none';
        });
        
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                certModal.style.display = 'none';
            }
        });
    }
});
