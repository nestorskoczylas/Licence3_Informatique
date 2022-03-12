# GL5_PROJECT_L3S5

# Dépôt du binôme Ledun Skoczylas

#### Consignes rendu

* PDF par mail iona.thomas@inria.fr

* NOM1_NOM2_PROJET_GL_GP5.PDF

* avant vendredi 11, 8h30

* objet du mail : [GL] rendu projet GP5

***

## Projet sélectionné : JHotDraw

Lien du projet : https://github.com/wumpz/jhotdraw

I. Présentation globale du projet

1. Utilité du projet

* JHotDraw est un framework d'éditeur de dessin avec interface graphique, basé sur un logiciel réalisé en 1996.

* Le readme ne faisant que renvoyer vers une page SourceForge très peu documentée, nous ne saurions pour l'instant pas expliquer comment utiliser ce framework...

2. Description du projet

* Le readme ne donne que très peu d'informations :

  > L'état du projet : indication d'une transformation du projet en projet maven, et une restructuration du projet

  > Les licences impliquées

  > Le fait que ce dépôt git n'est qu'un fork depuis http://sourceforge.net/projects/jhotdraw

* En ouvrant ce dernier lien, on obtient à peine plus d'informations :

  > Une (très) brève présentation de ce qu'est JHotDraw et de quand est daté sa création

  > Quelques *patch-notes* détaillant les ajouts et corrections des dernières mises à jour

  > Un onglet *Discussion* où sont posées des questions, parfois sans réponses, datant au plus de 2001.

  > Un onglet *Git* avec [un readme plus complet](https://sourceforge.net/p/jhotdraw/git/ci/master/tree/JHotDraw/README.html), et une démonstration à lancer dans un navigateur.

  > Les explications d'installation dans ce dernier readme semblent indiquer qu'aucune étape d'installation n'est nécessaire. À confirmer...

3. Historique du logiciel

* L'équipe semble n'être composée que de deux contributeurs.

* Il y a 4 *pull requests* en attente (toutes datant de 2021), et aucun *commit* récent (le dernier remontant à 2020). Une *issue* a été ouverte en 2021 par un utilisateur extérieur au projet, auquel le *maintainer* a répondu pour demander plus de détails qu'il n'a pas reçu (on peut donc supposer que c'est pour cette raison que l'*issue* n'a pas été fermée). L'historique d'*issues* indique que 4 autres ont été résolues depuis la création du git.

* Sur le GitHub seulement 2 branches sont utilisées (une `master`, close, et une `develop`).

4. Architecture logicielle

* Le readme du dépôt SourceForge nous informe que la dernière version du *framework* se base sur Java 8 et JavaFX.

* Reste à voir si d'autres bibliothèques non référencées sont utilisées en se penchant plus en détail sur le code...

* ...Et quelle utilisation de JavaFX est faite.

* Organisation en paquetages :

  > Certains noms de paquetages suggèrent l'application de designs patterns : les listeners, les decorators... D'autres biens qu'ils n'appliquent a priori pas de patron de conception ont un nom assez explicite : le paquetage "locator" offre des classes permettant de "localiser" des points sur un graphique, par exemple.

* Répartition des classes dans les paquetages :

  > Les paquetages semblent bien se limiter à une fonctionnalité : par exemple `handle` regroupe les classes qui vont gérer les connexions, l'attribution de touche, le déplacement, la rotation, ... Donc des notions a priori bien distinctes les unes des autres, mais un rôle identique (la gestion).


1. Analyse approfondie

* Tests

  > Il y a 6 tests dans 2 classes deux tests sur 752 classes au total. Nous pensons pouvoir dire que la couverture du code par les tests est probablement insuffisante.

  > Ce sont des tests unitaires.

  > 100 % des tests passent !

* Commentaires

  > Il y a plus de 22,000 lignes de commentaires, soit 20 % du contenu des fichiers source. À noter cependant que certains commentaires sont de longs paragraphes dupliqués au sujet des licences.

  > Parmi ces lignes de commentaires, on remarque notamment plusieurs blocs de code commentés, ainsi que des "TODO" éparses.

* Dépréciation

  > L'analyse révèle 49 occurences d'usage de code déprécié en Java et en HTML, répartis dans tous les packages.

  > Parmi elles, on remarque 36 appels à du code déprécié dans des méthodes non dépréciées.

* Duplication de code

  > L'analyse révèle une densité de 16,8 % de code dupliqué, soit 21,500 lignes dupliquées, réparties sur 247 fichiers.

  > On remarque notamment le fichier SVGInputFormat.java qui sort du lot, avec ses 30 % de code dupliqués.

  > Ces duplications sont en grande partie dues à la redéfinition de chaînes de caractères au lieu de les définir en constantes.

* God classes

  > On a une moyenne de 9 méthodes par classe, soit environ 7 000 méthodes pour 750 classes. Le projet contient en 127 843 lignes de codes, avec une médiane d'environ 90 lignes de code par classe.

  > Cependant, parmi ces 750 classes, certaines se démarquent. Il y a bien sûr certaines interfaces et certaines classes abstraites, contenant parfois 0 fonction. Et de l'autre côté, il y a donc effectivement des classes très chargées en lignes de codes et en méthodes. On peut notamment en citer quelques-unes :
    >* SVGInputFormat : comporte 2100 lignes de codes et 67 fonctions.

    >* ButtonsFactory : comporte 1387 lignes et 72 fonctions.

    >* ODGInputFormat : comporte 1233 lignes et 46 fonctions.

    >* DefaultDrawingView : comporte 1175 lignes et 95 fonctions.

    >* PaletteToolBarUI : comporte 1028 lignes et 90 fonctions.

  > Le ratio lignes de codes/nombre de fonctions dans ces classes suggère des fonctions alambiquées...

  > La `god class` toute désignée parmi celles mentionnées est donc SVGInputFormat. Nous nous pencherons sur son cas :

  > On y trouve notamment 12 variables d'instance (dont une classe statique et un booléen pour le débuggage), 39 imports, 16 méthodes dédiées à la lecture d'objets Élément différents, plusieurs méthodes de plus de 100 lignes, qui sont principalement des méthodes de conversion vers des formats (des entiers par exemple) ou des méthodes qui lisent l'élément passé en paramètre et le passent à une classe responsable de sa conversion pour affichage. On peut imaginer que certaines de ces méthodes auraient pu être déléguées à une classe à part pour respecter le principe de responsabilité unique.

* Analyse de méthodes

  > L'analyse met en évidence un grand nombre de méthodes et de classes à la complexité cyclomatique élevée (la complexité cyclomatique du projet complet étant de 15 519).

  > 4 classes, se situant dans `jhotdraw-core/src/main/.../draw/figure/`, ont un seuil de complexité cyclomatique suppérieur à 100 :
    >* `AbstractCompositeFigure.java` 143
    >* `AbstractFigure.java` 108
    >* `BezierFigure.java` 116
    >* `LineConnectionFigure.java` 102

  > Le paquetage `draw`, où figure ces fichiers, recense une complexité de près de 5 019, c'est-à-dire un tier de la complexité total du projet.

  > Là où la complexité est la plus élevée, le nombre de lignes de commentaire est conséquent. Les commentaires sont pour ainsi bien placé quand il s'agit des classes et méthodes où la complexité cyclomatique est forte.