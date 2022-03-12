# Quelques notions

* L'algorithme de *backtracking* est un algorithme de *parcours en profondeur*, qui se décrit donc de manière récursive.

* C'est aussi un algorithme de recherche par *brute force* ("recherche exhaustive").

* Combien d'état de rubik's cube possible pour un cube dont chaque face fait 9 blocks?

* Quelles condition va vérifier l'algorithme?

* Désavantages de la méthode : potentiellement très long...

# Modélisation d'un Rubik's cube de 3x3x3 ou de 6x3x3 blocks

* On peut estimer qu'un cube est un array à trois dimensions de 3x3x3 blocs (=27 dont un au centre, immuable). Donc Cube = [3][3][3]. Dans ce cas de figure, on doit représenter les cubes de côté ou de coin par des objets différents, car ils ont une à deux couleurs supplémentaires par rapport à un cube au centre.

* On peut aussi estimer les faces de chaque block individuellement, et dans ce cas un cube est un array de 6 faces fois 3x3 carrés. Donc Cube = [6][3][3].
  * Dans ce cas de figure, pas besoin de créer plusieurs objets blocs : on a simplement des faces avec chacune 9 blocs.
