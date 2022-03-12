# Deuxième contact avec Haskell

## Binôme : SKOCZYLAS Nestor & FRET Gaëlle


### Compiler les programmes :

Pour compiler les programmes et les éxécuter, écrivant dans un terminal de commande Linux :
* `ghci` et appuyez sur entrée
``` $ ghci
GHCi, version 8.6.5: http://www.haskell.org/ghc/  :? for help
```
* `:l <le nom du fichier à compiler>`
```
Prelude> :l tp1.hs
[1 of 1] Compiling Main             ( tp1.hs, interpreted )
Ok, one module loaded.
```

Vous pouvez également compiler le fichier `dragon.hs` avec la commande : `make`.

### Questions traitées :

#### Échauffement

1. Écrivez une fonction alterne qui prend un élément sur deux dans une liste. Par exemple alterne [1..5] est égal à [1,3,5].
``` haskell
alterne' :: [a] -> [a]
alterne' [] = []
alterne' [x]= [x]
alterne' (x:xs) = x : (alterne' (tail xs))

*Main> alterne' []
[]

*Main> alterne' [2]
[2]

*Main> alterne' [1,2,3]
[1,3]
```
2. Définissez une fonction combine :: (a -> b -> c) -> [a] -> [b] -> [c] qui prend en argument :

* une fonction f,
* une liste [x1, x2, ...],
* une seconde liste [y1, y2, ...],
* et retourne la liste des [f x1 y1, f x2 y2, ...] (ayant la même longueur que la plus courte des deux listes en argument).

Par exemple :
``` haskell
*Main> combine (+) [0..5] [4..30]
[4,6,8,10,12,14]
```

``` haskell
combine :: (a -> b -> c) -> [a] -> [b] -> [c]
combine f [] _ = []
combine f _ [] = []
combine f (x:xs) (y:ys) = f x y : (combine f xs ys)

*Main> combine (+) [] [4..30]
[]

*Main> combine (+) [0..5] []
[]

*Main> combine (+) [0..5] [4..30]
[4,6,8,10,12,14]
```

#### Triangle de Pascal

3. En utilisant la fonction zipWith, définissez une fonction pasPascal :: [Integer] -> [Integer] qui calcule une ligne du triangle de Pascal en fonction de la ligne précédente.
``` haskell
pasPascal :: [Integer] -> [Integer]
pasPascal [] = [1]
pasPascal l = [1] ++ zipWith (+) l (tail l) ++ [1]

*Main> pasPascal []
[1]

*Main> pasPascal [1,2,3]
[1,3,5,1]
```
4. Définissez le triangle de Pascal pascal :: [[Integer]] en utilisant la fonction iterate.
``` haskell
pascal :: [[Integer]]
pascal = iterate pasPascal [1]

*Main> take 5 pascal
[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

#### Courbe du dragon

5. Définissez une fonction pointAintercaler :: Point -> Point -> Point utilisant cette formule.
```haskell
pointAintercaler :: Point -> Point -> Point
pointAintercaler (x1,y1) (x2,y2) = ((x1 + x2) / 2 + (y2 - y1) / 2 , (y1 + y2) / 2 + (x1 - x2) / 2)

*Main> pointAintercaler (1,2) (3,4)
(3.0,2.0)
```
6. Définissez une fonction pasDragon :: Path -> Path qui, à partir de la courbe d’une itération, calcule la courbe à l’itération suivante.
```haskell
pasDragon :: Path -> Path
pasDragon [] = []
pasDragon [a, b] = a : pointAintercaler a b : b : []
pasDragon (a : b : c : ps) = a : m : b : m' : pasDragon (c:ps)
    where m = pointAintercaler a b
          m' = pointAintercaler c b

*Main> pasDragon []
[]

*Main> pasDragon [(1,2),(3,4)]
[(1.0,2.0),(3.0,2.0),(3.0,4.0)]

```
7. Définissez une fonction dragon :: Point -> Point -> [Path] qui calcule la liste des différentes itérations de la courbe du dragon créée entre les deux points donnés.
```haskell
dragon :: Point -> Point -> [Path]
dragon a b = iterate pasDragon [a,b]
```

#### Définition alternative

8. Définissez une fonction dragonOrdre :: Point -> Point -> Int -> Path qui prend en arguments deux points A et B et un ordre et calcule le dragon de cet ordre.
``` haskell
dragonOrdre :: Point -> Point -> Int -> Path
dragonOrdre a b 0 = pasDragon [a,b]
dragonOrdre a b n = dragonOrdre a (pointAintercaler a b) (n-1) ++ reverse (dragonOrdre b (pointAintercaler a b) (n-1))

dragon2 :: Point -> Point -> Int -> [Path]
dragon2 a b 0 = [dragonOrdre a b 0]
dragon2 a b n = (dragon2 a b (n-1)) ++ [(dragonOrdre a b n)]
```
9. Adapter le canevas de fonction main donné ci-dessus pour utiliser cette version.

### Questions non traitées :

Toutes les questions ont été traitées.

### Notions du TP :

Les notions importantes à retenir sont la création de `type` et l'utilisation de Gloss et du ghc dynamic.
