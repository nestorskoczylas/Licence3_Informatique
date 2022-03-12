#   Interprétation

Ce dépôt correspond au TP de PF « Interprétation ».


##  Instructions pour rendre votre travail avec gitlab

Pour permettre à votre chargé de TD de suivre votre travail sur ce projet :

-   *forkez* ce dépôt (bouton _Fork_),
-   dans le dépôt *forké*, ajoutez votre chargé de TD aux membres du
    projet avec l’accès _Developer_,
-   créez un fichier `RAPPORT.md` à la racine du dépôt.


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


##  Contenu du dépôt

Ce dépôt contient le module `Parser.hs` (dans la version définissant
les instances des classes `Functor`, `Applicative`, `Alternative` et
`Monad`).
Consultez directement la documentation dans les commentaires de
`Parser.hs` ou la section du [mini-haddock] qui concerne ce module.

[mini-haddock]: https://www.fil.univ-lille1.fr/~hym/e/pf/tdtp/minidoc.pdf

N’hésitez pas à vous inspirer des fichiers du dépôt du 1^er dépôt de
TP, en particulier `premiers-contacts.cabal`, etc. si vous voulez
utiliser les outils comme `stack` et/ou `cabal` pour travailler sur
votre machine personnelle : il vous suffira de supprimer la ligne
indiquant la dépendance `gloss` et d’ajouter les autres qui seraient
nécessaires (`cabal build` indique les dépendances manquantes s’il y
en a) pour avoir un fichier `.cabal` exploitable.


##  Intégration continue

Si vous souhaitez utiliser l’intégration continue pour vérifier que
votre source compile correctement, ajoutez un fichier `.gitlab-ci.yml`
contenant par exemple :

```yaml
image: commonci-fil:latest

build:
  script: ghc -Wall -Werror -dynamic -fdefer-typed-holes Interprete.hs
```

N’hésitez pas à effectuer plus de tests que juste la compilation.
