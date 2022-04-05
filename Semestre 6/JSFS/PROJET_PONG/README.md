# UE Javascript Full Stack

## Binôme : LEDUN Alexandre & SKOCZYLAS Nestor

## Projet - Jeu Pong en réseau local

# V0 : version initiale

* Côté serveur `\TP_PONG_V0\server` : lancer `npm install`, `npm run` puis `nodemon`, puis ouvrez un navigateur à la page `http://localhost:8000/public/index.html`.

# V1 : mise en place du webpack

* Avec `PRODUCTION` à `false` :

  * Côté client `\TP_PONG_V1\client` : lancer `npm install`, `npm run build` puis `npm run dev-server`. Ca ouvrira votre navigateur à la page du jeu.

* Avec `PRODUCTION` à `true` :

  * Côté server `\TP_PONG_V1\server` : lancer `nodemon`, puis ouvrez un navigateur à la page `http://localhost:8000/public/index.html`.

Ces commandes resteront valides pour V2 et V3.

# V2 : création d'un objet raquette, gestion de collision

* Cf les commandes ci-dessus, à effectuer depuis `\TP_PONG_V2\client` ou  `\TP_PONG_V2\server`.

# V3 : ajout d'une seconde raquette, gestion des points et des joueurs

* Cf les commandes ci-dessus, à effectuer depuis `\TP_PONG_V3\client` ou  `\TP_PONG_V3\server`.

# V4 : version multijoueur en réseau local

* Côté client `\TP_PONG_V4\client` : lancer `npm install`, puis lancez `npm run build`.

* Côté serveur `\TP_PONG_V4\server` : lancer `npm install`, puis lancez `nodemon` avant d'ouvrir le navigateur à la page `http://localhost:8000/public/index.html`.

* Un autre joueur peut rejoindre la partie depuis votre adresse ip en ouvrant un navigateur à la page `http://[votre-ip]:8000/public/index.html`.

### Côté serveur, mode production (V1 à V3)

1. Mettre `PRODUCTION` à `true` dans le fichier `/client/webpack.config.cjs`
2. Ouvrir la console dans `/client` et taper `npm run build` pour que le programme soit mis à jour dans `/server/public`
3. Ouvrir la console dans `/server` et taper `nodemon` puis ouvrir un navigateur à la page `http://localhost:8000/public/index.html`

### Côté client, mode développeur (V1 à V3)

1. Mettre `PRODUCTION` à `false` dans le fichier `/client/webpack.config.cjs`
2. Ouvrir la console dans `/client` et taper `npm run build` pour que le programme soit mis à jour dans `/client/dist`
3. Puis taper `npm run dev-server` et ouvrir un navigateur à la page `http://localhost:8000/`

