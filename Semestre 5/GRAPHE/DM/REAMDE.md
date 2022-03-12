# Graphe : Des problèmes qui ne sont pas tristes

## Binôme : SKOCZYLAS Nestor & FRET Gaëlle

***
</br>

## Modélisation

* ce qui est modélisé par les sommets : </br>
* ce qui est modélisé par les arcs ou les arêtes (suivant le type de graphe que vous jugez nécessaire) : </br>
* les éventuelles informations complémentaires que vous jugerez nécessaires à ajouter au graphe : </br>
* vous expliquerez ce qu’on cherche à réaliser dans le graphe, et en quoi cela permet de répondre au problème de l’application : </br>
* Enoncer clairement le problème posé :

</br>

<strong style = "color: red">Rendu intermédiaire numéro 1 entre le 22 et le 26 novembre 2021.</strong> Rendre sous forme rédigée la partie modélisation du DM.

</br>

## Algorithmes

* Expliquer ce qu’on entend par "problème difficile".
* Qu’est-ce qu’une heuristique ?
* Proposer un premier algorithme naïf, qui permettra de résoudre le problème lorsqu’on ne met pas de contraintes sur le nombre d’éléments permettant de resoudre le problème (typiquement le nombre de fréquences pour le problème des antennes, ou le nombre de couleurs pour le problème des cartes).
* Proposer un second algorithme qui mettra en œuvre une heuristique dont l’objectif sera de tenter d’envisager les sommets dans un ordre plus habile.
* Discuter des limites de cette heuristique.

</br>

<strong style = "color: red">Rendu intermédiaire numéro 2 entre le 6 et le 10 décembre 2021.</strong> Rendre sous forme rédigée la partie algorithmes du DM.

</br>

## Applications

Vous implémenterez les deux algorithmes en Python dans un module nommé `algorithms.py`. Vous rendrez trois main nommés `sudoku.py`, `gsm.py` et `map.py` qui, étant donnés des fichiers modélisant une grille de sudoku, une disposition d’antennes ou une carte fournis en argument, produira une solution.</br>
Chacun des 3 scripts se lancera de la même manière :

```$ bash
python3 script.py -i input.txt -o output.txt
```

où les noms de fichier sont remplacés par les noms adéquats. Le format des fichiers est donné plus bas.

</br>

<strong style = "color: red">Rendu final pour le 17 décembre 2021.</strong> Rendre les fichiers Python et un fichier `README.md` qui explicitera le fonctionnement des programmes, comment les exécuter (avec les commandes précises), et commentera les résultats produits.
