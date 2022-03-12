# UE Javascript Full Stack

## Binôme : LEDUN Alexandre & SKOCZYLAS Nestor

## Projet - Jeu Pong en réseau local

# V0 : version initiale
* Done

# V1 : mise en place du webpack
* Done

# V2 : création d'un objet raquette, gestion de collision
* Done

# V3 : ajout d'une seconde raquette, gestion des points et des joueurs
* Almost done

# V4 : version multijoueur en réseau local
* Todo

### Côté serveur, mode production

1. Mettre `PRODUCTION` à `true` dans le fichier `/client/webpack.config.cjs`
2. Ouvrir la console dans `/client` et taper `npm run build` pour que le programme soit mis à jour dans `/server/public`
3. Ouvrir la console dans `/server` et taper `nodemon` puis ouvrir un navigateur à la page `http://localhost:3000/public/index.html`

### Côté client, mode développeur

1. Mettre `PRODUCTION` à `false` dans le fichier `/client/webpack.config.cjs`
2. Ouvrir la console dans `/client` et taper `npm run build` pour que le programme soit mis à jour dans `/client/dist`
3. Puis taper `npm run dev-server` et ouvrir un navigateur à la page `http://localhost:3000/`


# TODO : vérifier que ces consignes s'appliquent pour chaque version à partir d'un dépôt fraîchement cloné (ou d'un zip fraîchement extrait)
