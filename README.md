<h1 align="center">🌊 SAUVETAROCHE</h1>
<p align="center"><strong>Application mobile éducative sur l'érosion côtière</strong></p>

<hr>

<h2> Présentation du projet</h2>
<p>
SAUVETAROCHE est une application mobile interactive compatible <strong>Android</strong> et <strong>iOS</strong>, développée dans <strong>VSCode</strong> avec <strong>React Native</strong> pour le front-end et <strong>Node.js</strong> pour le back-end. Elle consiste au travers d'un jeu interactif décisionnel, de défis quotidiens et de cartes prévisionnelles, à sensibiliser les utilisateurs sur le sujet de l’érosion côtière ainsi que son impact.
</p>

<h2> Technologies utilisées</h2>
<ul>
  <li>JavaScript/TypeScript pour le langage de programmation</li>
  <li>React Native (Front-end)</li>
  <li>Expo CLI pour le développement mobile et test</li>
  <li>Android Studio (émulateur)</li>
  <li>VSCode comme IDE principal</li>
</ul>

<h2> Arborescence du projet</h2>
<p>Voici l'organisation des fichiers du projet :</p>

<p>Le projet est divisé en deux parties principales :
- `App/` : le front-end mobile développé avec **React Native** et **Expo**
- `Server/` : le back-end développé avec **Node.js**

SauveTaRocheJS/
├── App/                         # Front-end mobile (React Native + Expo)
│   ├── assets/                  # Images, sons, polices utilisées dans l'app
│   ├── build/                   # Fichiers générés (UI ou builds)
│   ├── .gitignore               # Fichiers à exclure du versioning Git
│   ├── App.tsx                  # Point d’entrée principal de l’application
│   ├── index.ts                 # Entrée secondaire (navigation ou registre)
│   ├── app.json                 # Configuration Expo (nom, icône, version, etc.)
│   ├── eas.json                 # Configuration EAS (Expo Application Services)
│   ├── package.json             # Dépendances et scripts npm
│   ├── tsconfig.json            # Configuration TypeScript
│   ├── ReadMe                   # Fichier de documentation et expication des principes du code
│   ├── *.tsx                    # Tous les écrans de l'appli (Main, GameActivity, ChallengeActivity)
├── Server/                      # Back-end Node.js pour l’API et la logique serveur
│   ├── controllers/             # Logique métier (gestion des requêtes)
│   ├── data/                    # Données statiques ou JSON
│   ├── middlewares/             # Fonctions intermédiaires (authentification, logs, etc.)
│   ├── models/                  # Schémas de données (ex: Mongoose, validation)
│   ├── routes/                  # Définition des endpoints API
│   ├── utils/                   # Fonctions utilitaires réutilisables
│   ├── index.js                 # Point d’entrée du serveur Node.js
│   ├── package.json             # Dépendances et scripts npm du serveur
│   ├── package-lock.json        # Verrouillage des versions des packages 


- **SauveTaRocheJS/** 
  - **App/** : Front-end mobile (React Native + Expo)
    - `assets/` : Images, sons, polices utilisées dans l'app
    - `build/` : Fichiers générés (UI ou builds)
    - `.gitignore` : Fichiers à exclure du versioning Git
    - `App.tsx` : Point d’entrée principal de l’application
    - `index.ts` : Entrée secondaire (navigation ou registre)
    - `app.json` : Configuration Expo
    - `eas.json` : Configuration EAS (Expo Application Services)
    - `package.json` : Dépendances et scripts npm
    - `tsconfig.json` : Configuration TypeScript
    - `ReadMe` : Fichier de documentation et d'explication des principes utilisés dans le code
    - `*.tsx` : Tous les écrans de l'application ( GameActivity, ChallengeActiviy, DataActivity, ...)
  - **Server/** : Back-end Node.js pour l’API et la logique serveur
    - `controllers/` : Logique métier (gestion des requêtes)
    - `data/` : Données statiques ou JSON
    - `middlewares/` : Fonctions intermédiaires (authentification, logs, etc.)
    - `models/` : Schémas de données
    - `routes/` : Définition des endpoints API
    - `utils/` : Fonctions utilitaires réutilisables
    - `index.js` : Point d’entrée du serveur Node.js
    - `package.json` : Dépendances et scripts npm du serveur
    - `package-lock.json` : Verrouillage des versions des packages


<h2> Installation et lancement</h2>
<p>Pour initialiser le projet, suivez les étapes suivantes :</p>
<ul>
  <li>Entrez dans le dossier racine : SauveTaRocheJS</li>
  <li>Dans le dossier racine, entrez la commande suivante : 
    <code>expo init MonApp
      cd MonApp
      npm start</code>
    <p>Ce code initialisera un projet Expo dans le nom de l'App avec les dépendances associées.</p>
  </li>
  <li>Pour lancer l'App initialisée, il faut lancer dans le dossier MonApp, entrer la commande suivante :
    <code>npx expo start</code>
    <p>Un QR code s'affichera dans le terminal de VSCode. Pour lancer l'application sur la machine, il faut juste appuyer sur <code>a</code> (l'instruction apparait dans le terminal).</p>
    <p>Pour lancer l'application sur votre téléphone, il faut scanner le QR code via l'application Expo Go disponible sur Google PlayStore ou App Store.</p>
  </li>
</ul>
    

<h2> Fonctionnalités principales</h2>
<ul>
  <li><strong>Page principale</strong> avec 3 onglets horizontaux : <em>Défis</em>, <em>Jeu</em>, <em>Données</em></li>
  <li><strong>Défis</strong> : une question avec 4 choix de réponses et une correction après les réponses.</li>
  <li><strong>Données</strong> : 4 onglets temporels (<em>Actuel</em>, <em>+50 ans</em>, <em>+100 ans</em>, <em>+200 ans</em>) affichant des cartes prévisionnelles</li>
  <li><strong>Jeu</strong> : Subdivisé en deux niveaux avec complexité différentes. Pour chaque niveau, l'utilisateur joue le role d'un personnage amené à prendre des décisions afin de gérer au mieux sa circonscripton. Chaque décsions a un impact visible sur sa circonscription et la satisfaction de la population à travers un carte de la zone et une jauge de satisfaction.</li>
</ul>

<h2> Aperçus de l'application</h2>
<p>Page principale :</p>
<img src="URL_IMAGE_PAGE_MAIN" alt="Page principale" width="300">

<p>Défis :</p>
<img src="URL_IMAGE_PAGE_DEFIS" alt="Page Défis" width="300">

<p>Données :</p>
<img src="URL_IMAGE_PAGE_DONNEES" alt="Page Données" width="300">

<h2> Remerciements</h2>
<p>
Nous remercions tous les membres de l’équipe, les encadrants, ainsi que les participants aux enquêtes de terrain pour leur précieuse contribution. Ce projet a été pour nous un moyen de monter en compétences et de découvrir tous les aspects de la gestion du projet.
</p>

<h2> Contact & Documentation</h2>
<p>
Pour consulter les <strong>User Stories</strong>, <strong>Personas</strong> et les <strong>études de terrain</strong>, accédez à notre Drive :
</p>
<p><a href="https://drive.google.com/drive/u/2/folders/1-6Zyo5Eqjw6-DlHBN8UDSrhlZlRopb-F" target="_blank"> Accéder à la documentation du projet (Enquête de terrain, blog, état de l'art, cartographie des acteurs.)</a></p>

<hr>

<p align="center"><em>Développé avec ❤️ par l'équipe CAILLOUX composée de : </em>
  <ul>
    <li>1. Pako Justin</li>
    <li>2. Jamgotchian Clémence</li>
    <li>3. Berry Coline</li>
    <li>4. Kouassi Emmanuel</li>
    <li>4. Guillot Flavien</li>
  </ul>
</p>
