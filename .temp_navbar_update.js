// Script temporal para actualizar navbar en todos los archivos
// Este archivo se puede eliminar después de usarlo

const navbarCSS = `
        .nav-link:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            border-top: 2px solid white;
            border-bottom: 2px solid white;
            opacity: 0;
            transition: .3s;
        }

        .nav-link:after {
            content: '';
            position: absolute;
            top: -2px;
            left: -4px;
            width: 100%;
            height: 100%;
            background-color: white;
            transform: scale(0);
            opacity: 0;
            transition: .3s;
            z-index: -1;
        }
`;

const navbarJS = `
            if (!toggler || !collapse) return;

            // Helper to get or create MDB Collapse instance
            const getCollapseInstance = () => {
                let instance = mdb.Collapse.getInstance(collapse);
                if (!instance) {
                    instance = new mdb.Collapse(collapse, {
                        toggle: false
                    });
                }
                return instance;
            };

            // Manual toggle listener
            toggler.addEventListener('click', function (e) {
                e.preventDefault();
                const instance = getCollapseInstance();
                instance.toggle();
                
                // Manually update aria-expanded if MDB doesn't do it automatically in this mode
                const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
                toggler.setAttribute('aria-expanded', String(!isExpanded));
            });

            // Close on link click
            const navLinks = collapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
            navLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    const togglerVisible = window.getComputedStyle(toggler).display !== 'none';
                    if (togglerVisible && collapse.classList.contains('show')) {
                        const instance = getCollapseInstance();
                        instance.hide();
                        toggler.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            // Close on click outside
            document.addEventListener('click', function (evt) {
                const target = evt.target;
                if (collapse.classList.contains('show') &&
                    !collapse.contains(target) &&
                    !toggler.contains(target)) {
                    const instance = getCollapseInstance();
                    instance.hide();
                    toggler.setAttribute('aria-expanded', 'false');
                }
            });
`;

console.log('Navbar CSS y JS preparados para actualización');
