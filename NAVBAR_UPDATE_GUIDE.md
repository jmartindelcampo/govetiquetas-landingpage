# Guía de Actualización del Navbar - GOV Etiquetas

## Archivos a actualizar:
ok - cintas-adhesivas.html
ok - despachadores-cintas.html
ok - etiquetas-especiales.html
ok - impresoras-industriales.html
ok - maquinas-plastiflecha.html
ok - ribbons.html
ok - rollos-tickets.html
- suajes-personalizados.html

## CAMBIO 1: HTML - Clase del dropdown (línea ~508-510)

### BUSCAR:
```html
<a class="nav-link dropdown" href="#" id="navbarDropdown" role="button"
    data-mdb-toggle="dropdown" aria-expanded="false">
    Productos
</a>
```

### REEMPLAZAR CON:
```html
<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
    data-mdb-toggle="dropdown" aria-expanded="false">
    Productos
</a>
```

---

## CAMBIO 2: CSS - .nav-link:before (línea ~70-82)

### BUSCAR:
```css
.nav-link:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    transform: scaleY(2);
    opacity: 0;
    transition: .3s;
}
```

### REEMPLAZAR CON:
```css
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
```

---

## CAMBIO 3: CSS - .nav-link:after (línea ~84-96)

### BUSCAR:
```css
.nav-link:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    width: 100%;
    height: 100%%;
    background-color: white;
    transform: scale(0);
    opacity: 0;
    transition: .3s;
    z-index: -1;
}
```

### REEMPLAZAR CON:
```css
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
```

---

## CAMBIO 4: CSS - Agregar estilos responsive (ANTES de </style>, línea ~479)

### AGREGAR:
```css
@media (max-width: 991.98px) {
    .navbar-collapse {
        background-color: rgba(10, 38, 71, 0.98);
        padding: 20px;
        max-height: 80vh;
        overflow-y: auto;
    }

    .dropdown-menu {
        position: static !important;
        float: none;
        width: auto;
        background-color: transparent;
        border: none;
        box-shadow: none;
        padding-left: 20px;
        margin-top: 0;
        transform: none !important;
    }

    .dropdown-item {
        color: rgba(255, 255, 255, 0.8) !important;
        padding: 8px 15px;
    }

    .dropdown-item:hover,
    .dropdown-item:focus {
        background-color: rgba(255, 255, 255, 0.1);
        color: white !important;
    }

    .nav-link {
        color: white !important;
        padding: 10px 0 !important;
    }
}
```

---

## CAMBIO 5: JavaScript - Navbar toggler logic (línea ~864-876)

### BUSCAR:
```javascript
document.addEventListener('DOMContentLoaded', function () {
    // Navbar toggler logic
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.getElementById('navbarSupportedContent');

    if (toggler && collapse) {
        toggler.addEventListener('click', function (e) {
            e.preventDefault();
            collapse.classList.toggle('show');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!isExpanded));
        });
    }

    // Modal Logic
    const modal = document.getElementById('imageModal');
```

### REEMPLAZAR CON:
```javascript
document.addEventListener('DOMContentLoaded', function () {
    // Navbar toggler logic
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.getElementById('navbarSupportedContent');

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

    // Modal Logic
    const modal = document.getElementById('imageModal');
```

---

## Notas importantes:
1. Los números de línea son aproximados y pueden variar ligeramente entre archivos
2. Asegúrate de mantener la indentación correcta
3. El cambio de JavaScript es el más importante para que funcione el submenú en responsive
4. Después de hacer los cambios, prueba en modo responsive para verificar que el submenú funciona correctamente
