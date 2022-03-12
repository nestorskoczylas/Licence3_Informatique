#   Tri rapide

Ce dépôt correspond au TP de PDS+ « [tri rapide](https://www.fil.univ-lille1.fr/~hym/e/pds/tp/tdth2-tri.html) ».


##  Instructions pour rendre votre travail avec gitlab

Pour permettre à votre chargé de TD de suivre votre travail sur ce projet :

-   *forkez* ce dépôt (bouton _Fork_),
-   dans le dépôt *forké*, ajoutez votre chargé de TD aux membres du
    projet avec l’accès _Developer_,
-   créez un fichier `RAPPORT.md` à la racine du dépôt.


##  Contenu initial du dépôt

`pile.[ch]`
:   implémentation simple d’une pile,

`tri.[ch]`
:   fonctions de base permettant de charge ou afficher un tableau
    ainsi que vérifier qu’un tableau est trié,

`rapide.[ch]`
:   implémentation du tri rapide séquentiel, où vous ajouterez votre
    implémentation multithreadé,

`main.[ch]`
:   une fonction `main`, avec un `getopt` pour toute une série
    d’options qui vous aideront à tester et mettre au point votre
    code.


##  Contenu de votre `RAPPORT.md`

Votre rapport devra être au format [markdown] et être à la racine du
dépôt.

[markdown]: https://gitlab-etu.fil.univ-lille1.fr/help/user/markdown.md

Il contiendra :

-   vos noms et prénoms,
-   les notions importantes à retenir de ce TP (notamment ce que vous
    avez appris en le faisant),
-   comment fonctionne votre tri rapide multithreadé, notamment quand
    et pourquoi il s’arrête,
-   les mesures de performances que vous avez effectuées, sous la
    forme d’un graphe, et les résultats que vous avez obtenus : est-ce
    que vous avez le gain de performance que vous espériez ?
