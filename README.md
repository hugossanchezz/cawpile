# 🎬 CAWPILE Calculator

Método CAWPILE para valorar, de una forma más certera y estructurada, **libros y películas**.

> 🌐 **Versión pública:** https://cawpilecalculator.netlify.app/

![CAWPILE](https://img.shields.io/badge/CAWPILE-v1.2-ff8a72?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

---

## 🟦 ¿Qué es?

**CAWPILE Calculator** es una mini app web que te ayuda a puntuar un libro o una película evaluando **7 dimensiones** del 1 al 10, en lugar de dar una nota impulsiva.

Calcula automáticamente:

- **Media sobre 10** → promedio de las 7 categorías.
- **Nota sobre 5** → media sobre 10 dividida entre 2 (resultado principal).

```
nota /10 = (C + A + W + P + I + L + E) / 7
nota /5  = (nota /10) / 2
```

## 🟦 El método CAWPILE

| Letra | Categoría                           | Qué valora                              |
| ----- | ----------------------------------- | --------------------------------------- |
| **C** | **Characters** · Personajes         | Desarrollo, profundidad y credibilidad  |
| **A** | **Atmosphere** · Atmósfera          | Ambiente, mundo y sensaciones que evoca |
| **W** | **Writing** · Escritura / Dirección | Calidad narrativa o cinematográfica     |
| **P** | **Plot** · Trama                    | Estructura, coherencia y desarrollo     |
| **I** | **Intrigue** · Intriga              | Capacidad de mantener el interés        |
| **L** | **Logic** · Lógica                  | Consistencia interna y credibilidad     |
| **E** | **Enjoyment** · Disfrute            | Placer personal experimentado           |

En la app, esta explicación vive en un **desplegable**: al pulsar el título _“¿Qué es el método CAWPILE?”_ se expande/colapsa el contenido.

## 🟦 Funcionalidades

- **Mobile-first y responsive**: 1 columna en móvil, 2 columnas en tablet/desktop, acordeón fijo en pantallas grandes.
- **Solo modo oscuro**: paleta redondeada sobre `#1b1a2e`.
- **Sliders + input numérico sincronizados** (pasos de 0.5, rango 1–10, táctiles de 24px).
- **Barra de progreso `0/7`** en la topbar sticky.
- **Resultado único**: anillo SVG + nota grande `/5`, nota secundaria `/10`, estrellas (con medias), veredicto y desglose por barras:
- `≥4.5` Obra maestra · imprescindible
- `≥4.0` Excelente · muy recomendable
- `≥3.5` Muy bueno · merece la pena
- `≥3.0` Bueno · entretenido
- `≥2.5` Aceptable · con altibajos
- `≥2.0` Flojo · solo para fans
- `<2.0` No recomendable
- **Botón copiar** resultado al portapapeles (`Mi puntuación CAWPILE: X/5 (Y/10) — veredicto`).
- **Botón “Probar ejemplo”** que precarga notas demo y calcula.
- **Botón Restablecer** (vuelve a 5 en todo).
- **Enter para calcular**, validación 1–10 con mensaje de error y resaltado de tarjetas inválidas.
- **Iconos Font Awesome 6.5.2** + tipografías Fredoka / Nunito.

## 🟦 Tecnologías

- HTML semántico + CSS con variables (`cawpile.css`) + JS vanilla (`cawpile.js`).
- Sin build, sin dependencias: basta abrir `index.html` o servir la carpeta.
- CDN: Google Fonts + Font Awesome 6.5.2 (cdnjs).

```
cawpile/
├── index.html   # estructura + acordeón + resultado
├── cawpile.css  # diseño dark mobile-first responsive
├── cawpile.js   # sliders, cálculo, veredicto, progreso, copiar
└── favicon.ico
```

## 🟦 Uso local

```bash
# opción 1: abrir directo
start index.html

# opción 2: servir la carpeta
npx serve .
# o
python -m http.server 8000
```

1. Toca _“¿Qué es el método CAWPILE?”_ si quieres ver las categorías.
2. Mueve cada slider (o escribe la nota) del 1 al 10.
3. Pulsa **Calcular puntuación**.
4. Copia o comparte tu resultado `/5`.

## 🌐 Despliegue

Accesible al público en:

**https://cawpilecalculator.netlify.app/**

Desplegado en Netlify como sitio estático desde este repositorio.

## 👤 Autor

Creado por **[Hugo Sánchez - GitHub](https://github.com/hugossanchezz)**.
