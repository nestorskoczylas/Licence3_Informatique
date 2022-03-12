# Premier contact avec Haskell

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

### Questions traitées :

3. Programmez la fonction sommeDeXaY du TD1.
``` haskell
sommeDeXaY :: Int -> Int -> Int
sommeDeXaY x y = sum[x..y]

*Main> sommeDeXaY 2 4
9
```
4. Programmez une fonction somme de type [Int] -> Int qui calcule la somme des éléments de la liste.
``` haskell
somme :: (Num a) => [a] -> a
somme [] = 0
somme (x : xs) = x + somme xs

*Main> somme []
0
*Main> somme [1,2,3]
6
```
5. Re-programmez les fonctions standard last et init en utilisant uniquement les fonctions head, tail, !!, take, drop, length, ++, reverse.
``` haskell
last' :: [a] -> a
last' [] = error "ee"
last' [x] = x
last' (_:xs) = last' xs

*Main> last' []
*** Exception: ee
CallStack (from HasCallStack):
  error, called at tp1.hs:13:12 in main:Main

*Main> last' [1]
1

*Main> last' [1,2,3]
3

init' :: [a] -> [a]
init' l = take (length l-1) l

*Main> init [1,2,3]
[1,2]
```
6. Re-programmez les fonctions standard !!, ++, concat, map (en leur donnant un autre nom pour éviter le conflit avec les fonctions du Prelude) en n’utilisant que du filtrage de motifs.
```haskell
(!!!) :: [a] -> Int -> a
l !!! n =  head (reverse (take n l))

*Main> (!!!) [1,2,3] 1
1

(+++) :: [a] -> [a] -> [a]
[] +++ l = l
l +++ n = init l +++ (last l:n)
-- (x:xs) +++ n = x:(xs+++n)--

*Main> (+++) [1,2,3] [4,5,6]
[1,2,3,4,5,6]

concat' :: [[a]] -> [a]
concat' [l] = l
concat' (x:xs) = x ++ concat' xs

*Main> concat' [[1,2,3],[4,5,6]]
[1,2,3,4,5,6]

map' :: (a -> b) -> [a] -> [b]
map' l [] = []
map' l (x:xs) = l x : map' l xs

*Main> map' (+1) []
[]

*Main> map' (+1) [1,2,3]
[2,3,4]
```
J'ai eu quelques difficultées pour la création de `map'`. Le cas de base fonctionnait mais l'autre non. Une boucle infinie se créait et le terminal plantait. J'ai trouvé la solution en ajoutant `l x :` devant ma fonction.

7. Si l est une liste (de type [a], ignorons pour l’instant le type des éléments), que représente la déclaration : `x = (!!) l`
``` haskell
(!!) :: [a] -> Int -> a
x :: Int -> a
```
8. Utilisez map et somme pour définir une fonction calculant la longueur d’une liste.
``` haskell
length' :: [a] -> Integer
length' = somme . map' (const 1)

*Main> length' [1,2,3]
3
```
9. Programmez une fonction qui prend pour paramètres :

* une fonction f de type a -> a,
* un élément x de type a,
* et un entier n (≥ 0),
* et construit la liste [x, f x, f (f x), ..., f (f (f ... (f x) ... )] où le dernier élément est fn(x).
``` haskell
itere' :: (t -> t) -> Int -> t -> [t]
itere' _ 0 x = [x] 
itere' f n x = x : itere' f n (f x)

*Main> itere' (+1) 0 5
[5]

*Main> take 2 (itere' (+1) 2 5)
[5,6]
```
Vous proposerez une version récursive et une version utilisant les fonctions standard iterate et take.
``` haskell
itere'' :: (t -> t) -> Int -> t -> [t]
itere'' _ 0 x = [x]
itere'' f n x = take n (iterate f x)

*Main> itere'' (+1) 2 5
[5,6]
```

10.  Utilisez la fonction précédente pour définir une fonction à un argument entier n ≥ 0 qui produit la liste des entiers consécutifs de 0 à n.
``` haskell
itere''' n = itere'' (+1) (n+1) 0

*Main> itere''' 5
[0,1,2,3,4,5]
```

### Questions non traitées :

Toutes les questions ont été traitées.

### Notions du TP :

Les notions importantes à retenir sont les fonctionnalitées de base d'Haskell : concat, head, last, init, map, ... 
