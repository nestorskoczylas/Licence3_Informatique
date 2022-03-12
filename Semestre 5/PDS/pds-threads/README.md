#   Processus légers

Ce dépôt correspond aux TP de PDS sur le thème
« [Processus légers](https://www.fil.univ-lille1.fr/~hym/e/pds/tp/tdth1.html) ».


##  Instructions pour rendre votre travail avec gitlab

Pour permettre à votre chargé de TD de suivre votre travail sur ce projet :

-   *forkez* ce dépôt (bouton _Fork_),
-   dans le dépôt *forké*, ajoutez votre chargé de TD aux membres du
    projet avec l’accès _Developer_,
-   créez un fichier `RAPPORT.md` à la racine du dépôt.

Par ailleurs, vous ferez attention à **ignorer** (ne pas ajouter au
dépôt) les fichiers compilés (`.o`, exécutables, etc.). Ajoutez tous
vos exécutables au fichier `.gitignore` pour éviter les mauvaises
manipulations.


##  Contenu de votre `RAPPORT.md`

Votre rapport devra être au format [markdown] et être à la racine du
dépôt.

[markdown]: https://gitlab-etu.fil.univ-lille1.fr/help/user/markdown.md

Il contiendra :

-   vos noms et prénoms,
-   pour chaque sujet de TP, vous ferez une section contenant les
    3 sous-sections suivantes :

    1.  questions traitées : quelles questions vous avez traitées en
        précisant si elles vous ont posé une difficulté et laquelle,
    2.  questions non-traitées : quelles questions vous n’avez pas
        traitées et pourquoi,
    3.  notions : quelles sont les idées importantes à retenir de ce
        TP (notamment ce que vous avez appris en le faisant).


##  Contenu initial du dépôt

Ce répertoire contient deux squelettes de code.


### Calcul du taux de G / C

Il s’agit de l’exercice pour calculer le [taux de G/C].

[taux de G/C]: https://www.fil.univ-lille1.fr/~hym/e/pds/tp/tdth1-concrets.html#taux-gc

`compteur-gc.c`
:   base pour le compteur de bases G et C

`aleazard.c`
:   générateur d’un « génome » aléatoire


#### Travail à faire

L’objectif est de mettre en place la version _multithread_ du calcul
du taux G/C.


### Rendez-vous

Il s’agit de l’exercice [Rendez-vous].

[Rendez-vous]: https://www.fil.univ-lille1.fr/~hym/e/pds/tp/tdth1-003.html#sec4

`rdv.c`
:   code initial pour l’exercice du rendez-vous


#### Travail à faire

Les objectifs sont, successivement, de :

-   compléter la version à processus légers,
-   faire une variante, `rdv3.c`, à 3 processus légers,
-   faire une variante généralisée, `rdvn.c`, avec un nombre
    arbitraire de processus légers (vous ajouterez une constante
    `#define N` qui sera le nombre de processus légers à déclencher et
    vous changerez la fonction déclenchée dans les _threads_ pour
    qu’elle prenne en argument le numéro du processus léger, sur le
    modèle des fonctions `a` et `b`).
