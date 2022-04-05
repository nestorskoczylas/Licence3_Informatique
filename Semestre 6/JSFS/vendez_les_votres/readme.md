# Projet JSFS - Vendez Les Votres, *single page application*

# Binôme Ledun Skoczylas

## Commandes

Depuis le dossier `/vendez_les_votres/database`,  tapez dans votre commande :

```bash
mongod -dbpath .
```

Puis depuis le dossier `/vendez_les_votres`, entrez :

```bash
npm install
npm run start
```

Enfin allez à `http://localhost:3000` dans votre navigateur (de préférence *Firefox*).

## Etat du projet

* **Nous avons réalisé le projet en entier**. Le code client n'est cependant pas séparé du code serveur autrement qu'en étant placé dans le dossier `/vendez_les_votres/public`.

* Il est indispensable de se connecter pour accéder à la partie *achat/vente* et y effectuer des opérations (achat, vente, suppression).

* L'accueil, la navigation entre les éléments du menu, et la partie authentification ne sont pas en *single page application*.

* La partie *achat/vente*  est en *single page application*. Vous y accéderez depuis l'onglet **Annonces** de la barre de navigation. Vous pourrez remarquer que chaque action mettant à jour le tableau d'annonces (suppression/création/achat) fait remonter en haut de page (car le tableau est rechargé intégralement, donc vidé puis re-rempli), mais la page elle-même n'est pas rechargée.

* La création d'objet se fait via un formulaire, dans un menu dépliant caché par défaut, sur lequel il faut cliquer pour le déplier. L'implémentation du menu dépliant est fortement inspirée d'une ressource en ligne.

* Il n'est ***pas possible*** de **supprimer l'annonce d'un autre utilisateur**, ni d'**acheter un objet que l'on a mis en vente**, ni d'**acheter un objet trop cher**, ni de **mettre en vente un objet dont le prix est négatif**.

* Si votre token de connexion expire depuis la page de l'application, vos actions pourront avoir une partie de l'effet visuel attendu (par exemple, disparition de l'article en cas d'achat), mais en vous reconnectant et en retournant sur la page, l'**article sera toujours présent et il n'y aura pas eu de transfert d'argent** (car le serveur n'aura **pas effectué les fonctions correspondantes** ni la communication avec la base de donnée).

* **Bonus:** Il est ***possible***, à la création d'une annonce, d'**indiquer un lien vers une image** qui consistera en l'image de l'objet dans la liste des annonces. 

* Nous n'avons pas réalisé d'autres options bonus. Il est possible de modifier son *login* sur la page **Gestion de compte**, mais cette fonctionnalité était déjà fournie dans l'exemple du cours...

* La création de la page *achat/vente* n'est pas implémentée en *React*.

* Le style CSS est fortement inspiré des exemples fournis dans le cours ainsi que de ressources en ligne.
