# projet_S6_LEDUN_SKOCZYLAS

**RESOLUTION DE RUBIK'S CUBE PAR ALGORITHME DE BACKTRACKING**

* Modélisation du *Rubik's Cube*
* Modélisation d'une rotation horizontale ou verticale
* Programmation du solveur avec *backtracking*
* `SolvingDemo.py` présente une démonstration d'initialisation, mélange, puis résolution d'un cube de 2x2

Abstraction de différents concepts au fil de l'avancée dans le projet :

* Un `RubiksAbstract` est un `Puzzle` présentant une fonction d'affichage, de résolution, de mélange, et un état résolu
* Un `Solver` peut résoudre un `Puzzle` pour lequel ces fonctions sont implémentées
* Un `RubiksCube` est un `RubiksAbstract` de dimension 3(*3), un `PocketCube` en est un autre de dimension 2(*2)
* Un `RubiksElementSolver` peut résoudre l'instance d'une implémentation d'un `RubiksAbstract`

**LANCER LA DEMONSTRATION**

* Depuis la racine du projet, entrez `python3 ./SolvingDemo.py` pour lancer la démonstration par défaut sur un Pocket Cube mélangé par 6 actions aléatoires.

* Vous pouvez entrer en premier argument 'pocket cube', ou 'rubiks cube' pour un cube de dimension 3. En second argument vous pouvez entrer un nombre quelconque qui sera le facteur par lequel le cube sera mélangé. Nous conseillons d'éviter toute valeur au delà de 3 pour observer un résultat rapidement... 

* Chaque argument est optionnel.