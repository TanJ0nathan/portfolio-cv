# Explication des fichiers web
_Exported on 06/04/2026 at 23:18:55 UTC+2 from Cursor (2.6.21)_

---

**User**

contexte : je suis débutant en developpement web
role : tu as 20 ans d'expérience et tu es pédagogue
explique étape par étape le code créer dans les dossiers @app.js , @index.html , @styles.css 

---

**Cursor**

Je vais te faire une explication pédagogique, fichier par fichier, en partant des bases et en reliant `index.html`, `styles.css` et `app.js` ensemble. Je commence par lire le contenu réel des trois fichiers pour t’expliquer exactement ce que ton code fait.

Très bon projet pour progresser 👏  
Tu as déjà une vraie structure “pro” : **HTML (structure)** + **CSS (style)** + **JS (interactions)**.

Je te l’explique pas à pas, simplement.

## 1) Vue d’ensemble : qui fait quoi ?

- `index.html` = le squelette de la page (les sections, les boutons, les inputs…)
- `styles.css` = l’apparence (couleurs, layout, responsive, animations)
- `app.js` = le comportement (thème clair/sombre, menu mobile, terminal, quiz, validation formulaire…)

En bas de `index.html`, tu relies le JS avec :
- `<script src="app.js"></script>`

Et dans le `<head>`, tu relies le CSS avec :
- `<link rel="stylesheet" href="styles.css" />`

---

## 2) `index.html` — structure de ton portfolio

Tu construis une page “one-page” avec navigation par ancres (`href="#section"`).

### Étapes importantes

- **Balises de base**
  - `<!DOCTYPE html>`, `<html lang="fr">`, `<meta charset>`, `<meta viewport>`
  - bonnes pratiques SEO/accessibilité de base.

- **Header fixe**
  - logo, nav desktop, bouton thème (`id="themeToggle"`), bouton menu mobile (`id="navToggle"`).
  - menu mobile séparé : `id="mobileNav"` (caché au départ via `hidden`).

- **Sections principales**
  - `#hero` : intro + stats animées
  - `#profil` : cartes de profil
  - `#terminal` : console interactive (`terminalOutput` + `terminalInput`)
  - `#competences` : liste dynamique des skills (`skillsList`) + détail (`skillDetail`)
  - `#defi` : quiz (`quizCard`, `quizProgress`)
  - `#parcours` : timeline
  - `#contact` : formulaire (`contactForm`) + message succès (`formSuccess`)

- **Footer**
  - année dynamique avec `<span id="year"></span>`

👉 Ce fichier est bien pensé : beaucoup d’IDs/classes clairement nommés, ce qui facilite le JS.

---

## 3) `styles.css` — design, responsive et animations

Ce fichier est long (normal), mais il suit une logique claire.

### A) Variables globales (très important)
En haut :
- `:root { --bg, --text, --accent, ... }`
- puis `[data-theme="light"] { ... }`

Ça te permet de changer le thème juste en changeant un attribut `data-theme`.  
Excellente approche moderne.

### B) Base et reset
- `box-sizing: border-box`
- styles de base `body`, `a`, `img`
- comportement global du scroll.

### C) Composants visuels
- **Header** fixe avec blur/transparence.
- **Boutons** (`.btn`, `.btn-primary`, `.btn-ghost`).
- **Hero** avec orbes animées (`@keyframes float`).
- **Cards**, **terminal**, **skills**, **quiz**, **timeline**, **formulaire**, **footer**.

### D) Responsive
- Media queries:
  - `@media (min-width: 960px)` pour basculer menu desktop/mobile.
  - autres breakpoints pour grilles (`profil`, `skills-layout`).

### E) Animations et effets
- reveal au scroll (`[data-reveal]` + `.is-visible`)
- hover/transition
- styles de feedback quiz (`.correct`, `.wrong`)
- états formulaire (`.invalid`)

👉 Tu appliques de vraies techniques “UI moderne” (glassmorphism léger, gradients, transitions, variables CSS).

---

## 4) `app.js` — toute la logique interactive

Le fichier est encapsulé dans :

- `(function () { "use strict"; ... })();`

C’est une IIFE : ça évite de polluer l’espace global.

### Étape 1 — Données statiques
Tu déclares :
- `SKILLS` : compétences, niveau, détail, snippet
- `QUIZ` : questions/réponses
- `TERMINAL_WELCOME` + `TERMINAL_CMDS` : mini shell

👉 Très bonne pratique : séparer les données du rendu.

### Étape 2 — Gestion du thème
- lit `localStorage` (`portfolio-theme`)
- applique `data-theme` sur `documentElement` + `body`
- bouton toggle alterne dark/light et sauvegarde

Résultat : le thème persiste après refresh.

### Étape 3 — Menu mobile
- clic sur `navToggle` => ajoute/enlève `is-open`
- affiche/masque `mobileNav` (`hidden`)
- clic sur un lien mobile => referme le menu

### Étape 4 — Effets visuels
- **cursor glow** : suit la souris avec interpolation douce (`requestAnimationFrame`)
- **magnetic buttons** : translation légère selon position du pointeur
- **card tilt** : rotation 3D au survol

### Étape 5 — Animations au scroll
- `IntersectionObserver` observe les éléments `[data-reveal]`
- ajoute `is-visible` quand ils entrent dans la zone visible
- idem pour `.timeline-item`

### Étape 6 — Compteurs de stats
- observe `.stat-value[data-count]`
- anime de 0 à la cible avec easing cubic
- `unobserve` après animation (optimisation)

### Étape 7 — Terminal interactif
- `appendLine()` ajoute une ligne dans la sortie
- `runTerminal()` :
  - affiche la commande tapée
  - exécute commande si connue (`help`, `skills`, `contact`, etc.)
  - gère `clear`
  - sinon message d’erreur
- écoute `Enter` sur `terminalInput`

### Étape 8 — Skills dynamiques
- crée les boutons de skills en JS
- `aria-selected` pour l’état actif
- affiche détail de la skill sélectionnée
- utilise `escapeHtml()` pour éviter injection HTML (très bien 👍)

### Étape 9 — Quiz
- `renderQuiz()` affiche question courante
- clic réponse :
  - désactive les boutons
  - marque correct/wrong
  - affiche explication
  - passe à la suivante après `setTimeout`
- écran final avec score + bouton recommencer

### Étape 10 — Formulaire de contact
- `validateField()` vérifie :
  - nom min 2 caractères
  - email via regex
  - message min 10 caractères
- affichage message d’erreur sous chaque champ
- submit :
  - empêche envoi réel (`preventDefault`)
  - valide les champs
  - affiche succès 5 secondes puis masque

### Étape 11 — Année automatique
- injecte l’année actuelle dans le footer (`#year`)

---

## 5) Ce que tu fais déjà très bien (niveau débutant+)

- Architecture claire par responsabilités.
- IDs/classes cohérents entre HTML/CSS/JS.
- Utilisation de `IntersectionObserver` (propre et performant).
- Accessibilité de base présente (`aria-label`, `aria-live`, rôles, labels).
- Sécurité front minimale pensée (`escapeHtml`).

---

## 6) Prochaines améliorations simples (si tu veux progresser vite)

- Remplacer les données “placeholder” (contact, parcours, pitch).
- Ajouter historique de commandes dans le terminal (flèches haut/bas).
- Bloquer certaines animations si `prefers-reduced-motion`.
- Connecter le formulaire à un backend (ou Formspree/EmailJS).
- Découper `app.js` en modules (quand tu seras à l’aise).

---

Si tu veux, je peux te faire ensuite une **version ultra pédagogique ligne par ligne** de `app.js` (par blocs de 20-30 lignes), avec “ce que fait chaque ligne” + “pourquoi on le fait comme ça”.

---

**User**

oui merci

---

**Cursor**

Parfait. On fait une lecture **ultra pédagogique** de `app.js`, dans l’ordre, comme si on le parcourait ensemble.

## 1) Le “cadre de sécurité” du fichier

Ton script commence par une fonction auto-exécutée :

```js
(function () {
  "use strict";
  // ...
})();
```

- `(function(){ ... })();` = **IIFE** : le code s’exécute tout de suite.
- Avantage : les variables restent “privées” dans ce bloc, elles ne polluent pas `window`.
- `"use strict"` active un mode plus strict de JavaScript (moins d’erreurs silencieuses).

---

## 2) Les données “métier” en haut du fichier

Tu définis 3 gros objets/tableaux :

- `SKILLS` : tes compétences (nom, niveau, détail, snippet)
- `QUIZ` : questions/réponses/explications
- `TERMINAL_*` : messages et commandes de ton faux terminal

Pourquoi c’est bien :
- Tu sépares le **contenu** de la **logique**.
- Si tu veux changer une compétence, pas besoin de toucher au rendu.

---

## 3) Gestion du thème clair/sombre

Bloc “Theme” :

- Récupère le bouton : `document.getElementById("themeToggle")`
- Lit la préférence sauvegardée : `localStorage.getItem("portfolio-theme")`
- Si valeur valide (`light`/`dark`), l’applique.
- Sinon, met `dark` par défaut.
- Au clic :
  - inverse le thème
  - met à jour `data-theme`
  - sauvegarde dans `localStorage`

Important : tu appliques le thème à `document.documentElement` **et** `document.body`, ce qui rend le CSS robuste.

---

## 4) Menu mobile (burger)

Bloc “Mobile nav” :

- `navToggle` = bouton burger
- `mobileNav` = menu mobile

Au clic :
- `classList.toggle("is-open")` sur le bouton
- `hidden` passe à `false/true` selon l’état
- classe `is-open` sur le menu pour l’animation CSS

Puis tu ajoutes un écouteur sur chaque lien du menu :
- dès qu’on clique un lien, le menu se referme.

Très bon UX mobile.

---

## 5) Effet “glow” qui suit la souris

Bloc “Cursor glow” :

- `glow` = l’élément visuel
- `tx/ty` = position cible (souris)
- `gx/gy` = position courante du glow

À chaque mouvement souris :
- tu mets à jour la cible (`tx`,`ty`)

Dans `tick()` (boucle `requestAnimationFrame`) :
- tu rapproches progressivement `gx/gy` de `tx/ty`
- tu appliques `left/top` à l’élément glow

Résultat : mouvement fluide, pas brutal.  
Et tu respectes `prefers-reduced-motion` (accessibilité).

---

## 6) Boutons “magnétiques”

Pour chaque `.magnetic` :

- `pointermove` :
  - calcule le décalage souris par rapport au centre du bouton
  - applique un petit `translate(...)`
- `pointerleave` :
  - remet `transform` vide

Résultat : effet interactif subtil.

---

## 7) Effet tilt 3D des cartes

Pour chaque carte `[data-tilt]` :

- calcule position souris dans la carte
- convertit ça en rotation `rotateX` / `rotateY`
- applique `transform: perspective(...) rotateX(...) rotateY(...)`

Quand la souris sort :
- remet le transform à zéro.

---

## 8) Apparition au scroll (IntersectionObserver)

Tu récupères tous les `[data-reveal]` puis :

- crées un `IntersectionObserver`
- quand un élément entre dans la zone visible :
  - ajoute `.is-visible`

Tu ajoutes aussi un `transitionDelay` progressif (`i * 0.06s`)  
=> effet “cascade”.

Tu fais pareil pour `.timeline-item` : propre et réutilisable.

---

## 9) Animation des compteurs de stats

Sur `.stat-value[data-count]` :

- à l’entrée dans viewport :
  - lit la cible (`data-count`)
  - anime de 0 à cible pendant 1200ms
  - easing : `1 - Math.pow(1 - p, 3)` (accélération/décélération douce)
  - `unobserve` une fois fini (optimisation)

Très bon pattern pour les KPI.

---

## 10) Terminal interactif

Éléments :
- `out` (`terminalOutput`) = zone d’affichage
- `input` (`terminalInput`) = champ commande

Fonctions clés :

- `appendLine(text, className)`  
  Crée un `<p>`, ajoute le texte, applique la classe (`cmd`, `ok`, `err`), scroll en bas.

- `runTerminal(cmdRaw)`  
  - normalise la commande (`trim().toLowerCase()`)
  - affiche la commande tapée
  - gère `clear`
  - cherche la commande dans `TERMINAL_CMDS`
  - affiche résultat ligne par ligne
  - sinon message “commande inconnue”

Écoute clavier :
- sur `Enter`, lance `runTerminal(input.value)`, puis vide le champ.

---

## 11) UI des compétences (générée en JS)

Tu crées dynamiquement les boutons skill :

- bouton avec rôle `tab`
- `aria-selected` pour état actif
- CSS variable `--level` pour la barre de progression
- contenu HTML du bouton (`name`, `tag`, bar)

Au clic :
- désactive la sélection des autres
- active la skill cliquée
- appelle `renderSkillDetail(s)`

`renderSkillDetail` affiche dans `#skillDetail` :
- titre
- description
- snippet dans `<code>`

Tu utilises `escapeHtml()` : excellent réflexe sécurité.

---

## 12) Quiz dynamique

Variables d’état :
- `qIndex` question actuelle
- `score`

`renderQuiz()` :
- si fin du quiz :
  - affiche score + bouton recommencer
- sinon :
  - affiche question + options + feedback caché

Au clic sur une option :
- désactive toutes les options
- colorie les bonnes réponses (`correct`)
- marque la mauvaise choisie (`wrong`) si besoin
- incrémente score si bonne réponse
- affiche explication
- passe à la question suivante après 1.8s

C’est une mini machine à états simple et efficace.

---

## 13) Validation du formulaire

`validateField(name, el)` :

- vide l’état précédent
- applique règles :
  - nom >= 2
  - email regex
  - message >= 10
- écrit message dans `span[data-for="..."]`
- ajoute classe `.invalid` si erreur
- retourne `true/false`

Tu valides :
- au `blur` (retour immédiat utilisateur)
- au `submit` :
  - `preventDefault()`
  - valide tous les champs
  - si OK : affiche succès, reset form, masque succès après 5s

---

## 14) Détail final

```js
document.getElementById("year").textContent = new Date().getFullYear();
```

Ça met l’année automatiquement dans le footer.

---

## Ce que tu dois retenir (version débutant)

- **Le HTML** donne des “points d’accroche” (`id`, classes).
- **Le CSS** style les états (`is-open`, `is-visible`, `invalid`, etc.).
- **Le JS** change ces états selon les actions utilisateur.
- Tu as déjà une architecture **événementielle** propre : clic, scroll, clavier, submit.

---

Si tu veux, prochaine étape je te fais une version **“exercice guidé”** :  
1) on ajoute une nouvelle commande terminal ensemble,  
2) puis une nouvelle question quiz,  
3) puis une amélioration accessibilité simple.

