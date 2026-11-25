# Lheritier — Propuesta de rediseño (vista previa)

Sitio estático de demostración de la nueva Home de Lheritier Argentina S.A.
No requiere build ni dependencias: HTML, CSS y JavaScript plano.

## Estructura

```
index.html          Página principal
css/styles.css      Estilos
js/main.js          Slider, marquesina, contador, mapa y formulario
assets/img/         Imágenes (webp) y favicon
.nojekyll           Evita el procesamiento de Jekyll en GitHub Pages
```

## Ver en local

Abrí `index.html` en el navegador, o levantá un servidor simple:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Initial preview"
git branch -M main
git remote add origin git@github.com:<usuario>/<repo>.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
El sitio queda en `https://<usuario>.github.io/<repo>/`.

## Notas

- Las imágenes son provisorias, tomadas del sitio actual; la versión final usará los originales en alta resolución.
- El formulario de contacto, los PDF y el selector de idioma no están conectados en esta vista previa.
- La página incluye `noindex` para que no aparezca en buscadores.
