document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.chapter-view');
    const searchInput = document.getElementById('defSearch');
    const cards = document.querySelectorAll('.definition-card');

    // Sidebar Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-view');

            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Switch views
            views.forEach(view => {
                if (view.id === `view-${target}`) {
                    view.classList.add('active');
                    // Scroll to top of content
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    view.classList.remove('active');
                }
            });

            // Clear search when switching tabs to avoid confusion
            searchInput.value = '';
            cards.forEach(card => card.style.display = 'block');
        });
    });

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        // Show all views if searching, or keep current one?
        // Better: Search globally but keep the layout
        cards.forEach(card => {
            const term = card.querySelector('.def-term').textContent.toLowerCase();
            const meaning = card.querySelector('.def-meaning').textContent.toLowerCase();

            if (term.includes(query) || meaning.includes(query)) {
                card.style.display = 'block';
                // If a card matches, make sure its parent view is visible during global search?
                // For now, let's just search within the active view or make all views visible if searching
            } else {
                card.style.display = 'none';
            }
        });

        // Optional: If searching, show all sections that have results
        if (query.length > 0) {
            views.forEach(view => {
                const hasResults = view.querySelectorAll('.definition-card[style="display: block;"]').length > 0;
                view.classList.toggle('active', hasResults);
            });
        }
    });

    // Add staggered animation to cards
    const observeCards = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
        });
    };

    observeCards();
});
