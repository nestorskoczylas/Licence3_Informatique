#   Des arbres et des couleurs

## Binôme : SKOCZYLAS Nestor & FRET Gaëlle


### Compiler les programmes :

Pour compiler les fichiers :
→ entrer dans ghci en écrivant `pf-3-arbres$ ghci`
→ dans le prelude écrire : `:l arbres.hs`
→ quitter ghci

Si vous voulez voir l'arborescence en temps réel, écrire la ligne suivante avant de compiler et de générer l'image :
- ArbreAlea :
 `dot -Txlib arbresAlea.dot` pour voir l'arborescence en temps réel
- ArbreAlpha :
`dot -Txlib arbresAlpha.dot` pour voir l'arborescence en temps réel

Pour générer l'image de l'arbre ordonné :
→ écrire `runghc arbres.hs` pour écrire dans arbreAlpha.dot
→ `dot -Tpng arbresAlpha.dot > arbresAlpha.png`

Pour générer l'image de l'arbre aléatoires :
→ dans le fichier arbres.hs, décommenter le deuxième main et mettre en commentaire le premier
→ écrire `runghc arbres.hs` pour écrire dans arbreAlea.dot
→ `dot -Tpng arbresAlea.dot > arbresAlea.png`

### Questions traitées :

1. Déclarez un type Arbre pour les arbres binaires. Ce type sera paramétré par le type des couleurs et le type des valeurs des nœuds.

Votre déclaration pourra donc ressembler à :
``` haskell
data Arbre coul val = …
                      deriving Show
```
Les feuilles ne porteront ni valeur ni couleur, seuls les nœuds en auront.
``` haskell
data Arbre col val = Vide
                    | Noeud col val (Arbre col val) (Arbre col val)
                    deriving Show
```
2. Définissez une fonction mapArbre pour votre type Arbre.
Comme chaque nœud porte une couleur et une valeur, votre fonction mapArbre pourra être paramétrée par deux fonctions, une calculant la nouvelle couleur, l’autre la nouvelle valeur.
``` haskell
mapArbre :: (a -> b) -> Arbre c a -> Arbre c b
mapArbre _ Vide = Vide
mapArbre f (Noeud c v g d) = Noeud c (f v) (mapArbre f g) (mapArbre f d)
```
3. Définissez les fonctions qui calculent la hauteur (nombre maximal de nœuds entre une feuille et la racine) et la taille (nombre total de nœuds) d’un arbre.
``` haskell
hauteur :: Arbre c v -> Int
hauteur Vide = 0
hauteur (Noeud _ _ g d) = 1 + max (hauteur g) (hauteur d)

taille :: Arbre c v -> Int
taille Vide = 0
taille (Noeud _ _ g d) = 1 + taille g + taille d
```
Les deux fonctions hauteur et taille doivent avoir un code très similaire : il est donc possible de définir une fonction plus générique afin d’éviter la duplication de code.

4. Définissez une fonction générique dimension telle que hauteur et taille puissent être redéfinies comme des applications partielles de dimension.
``` haskell
dimension :: (Int -> Int -> Int) -> Arbre c v -> Int
dimension _ Vide = 0
dimension f (Noeud _ _ g d) = 1 + f (dimension f g) (dimension f d)

dimension' :: (Num a) => (c -> v -> a -> a -> a) -> a -> Arbre c v -> a
dimension' _ c Vide = c
dimension' f a (Noeud c v g d) = f c v (dimension' f a g) (dimension' f a d)
```
5. Définissez une fonction `peigneGauche :: [(c,a)] -> Arbre c a` qui prend une liste de paires de couleur et valeur et crée le peigne à gauche correspondant.
``` haskell
peigneGauche :: [(c,v)] -> Arbre c v
peigneGauche [] = Vide
peigneGauche ((c,v):xs) = Noeud c v (peigneGauche xs) Vide
```
6. Ajouter la fonction suivante à votre code source :
`prop_hauteurPeigne xs = length xs == hauteur (peigneGauche xs)`<br/>
Que vérifie-t-elle ? Elle vérifie si la hauteur du peigne de gauche est correcte<br/>
Vérifiez avec QuickCheck qu’elle est satisfaite2 en appelant quickCheck :
```
ghci> quickCheck prop_hauteurPeigne
+++ OK, passed 100 tests.
```
Si QuickCheck trouve un cas de test sur lequel la propriété n’est pas vraie, il vous donne le cas qu’il a trouvé :
```
ghci> quickCheck prop_hauteurPeigne
*** Failed! Falsifiable (after 1 test):
[]
```
Vous pouvez alors regarder le peigneGauche [] et comprendre pourquoi.

7. Testez quelques propriétés sur taille, mapArbre, etc.
``` haskell
prop_taille xs = length xs == taille (peigneGauche xs)
prop_dimension_hauteur xs = length xs == dimension max (peigneGauche xs)
prop_dimension_taille xs = length xs == dimension (+) (peigneGauche xs)

ghci> quickCheck prop_taille
+++ OK, passed 100 tests.

ghci> quickCheck prop_dimension_hauteur
+++ OK, passed 100 tests.

ghci> quickCheck prop_dimension_taille
+++ OK, passed 100 tests.
```
8. Définissez une fonction `estComplet :: Arbre c a -> Bool` qui vaut vrai si et seulement si son argument est un arbre complet.
``` haskell
estComplet' :: Arbre c v -> (Bool, Int)
estComplet' (Noeud _ _ g d) = let (ecg, hg) = estComplet' g
                                  (ecd, hd) = estComplet' d
                                in (ecg && ecd && (hg == hd), max hg hd + 1)

estComplet :: Arbre c v -> Bool
estComplet = fst.estComplet'

prop_estComplet l | l == [] = estComplet (peigneGauche l)
                  | length l == 1 = estComplet (peigneGauche l)
                  | otherwise = estComplet (peigneGauche l) == False

ghci> quickCheck prop_estComplet
+++ OK, passed 100 tests.
```
9. Est-il possible de définir `estComplet` comme une application partielle de `dimension` ? Si ça n’est pas le cas, définissez une fonction assez générique pour que `taille` et `hauteur` en soient des applications partielles et `estComplet` le soit presque (il sera nécessaire de faire un dernier traitement sur le résultat pour définir `estComplet`).
``` haskell
estComplet'' :: Arbre c v -> Bool
estComplet'' Vide = True
estComplet'' a = dimension (+) a == 2^dimension max a -1

prop_estComplet2 l | l == [] = estComplet'' (peigneGauche l)
                   | length l == 1 = estComplet'' (peigneGauche l)
                   | otherwise = estComplet'' (peigneGauche l) == False

ghci> quickCheck prop_estComplet2
+++ OK, passed 100 tests.
```
10. Quels sont les peignes à gauche complets ? Pouvez-vous utiliser QuickCheck pour les trouver ?<br/>
Les peignes gauche complets sont les arbres vides et les arbres de 1 élément, voir QuickCheck Q8.

11. Définissez la fonction `complet`.
``` haskell
complet' :: Int -> [(c, v)] -> (Arbre c v, [(c, v)])
complet' 0 l = (Vide, l)
complet' h l = ((Noeud c v g d), reste'')
            where (g, (c, v) : reste') = complet' (h - 1) l
                  (d, reste'') = complet' (h - 1) reste'  

complet :: Int -> [(c, v)] -> Arbre c v
complet 0 l = fst(complet' 0 l)
complet h l = fst(complet' h l)
```
12. Trouvez la fonction de type `a -> [a]` qui vous donne une liste contenant une infinité de fois son argument.

Redéfinissez cette fonction en utilisant iterate.
``` haskell
myRepeat :: a -> [a]
myRepeat = iterate id
```
13. En utilisant le fait que ['a'..] est la liste de tous les caractères unicode à partir de 'a', créez la liste contenant [((),'a'), ((),'b'), ...].
``` haskell
listUnicode = [((), x) | x <- ['a'..]]
```
14. Définissez la fonction `aplatit :: Arbre c a -> [(c, a)]` qui calcule la liste des paires couleur-valeur présentes dans les nœuds de l’arbre.
``` haskell
aplatit :: Arbre c v -> [(c, v)]
aplatit Vide = []
aplatit (Noeud c v g d) = concat [aplatit g, [(c,v)], aplatit d]

complet1 = complet 4 (take 15 listUnicode)
prop_aplatit' = map snd (aplatit complet1) == "abcdefghijklmno"

ghci> quickCheck prop_aplatit' 
+++ OK, passed 1 test.
```
15. Définissez une fonction `element :: Eq a => a -> Arbre c a -> Bool` qui calcule si un élément de valeur donnée est présent dans l’arbre.
``` haskell
element :: Eq v => v -> Arbre c v -> Bool
element _ Vide = False
element e arbre = elem e (map snd(aplatit arbre))

dot -Txlib arbre.dot
dot -Tpng arbre.dot > arbre.png
```

#### Affichage des arbres

16. Définissez une petite fonction `noeud :: (c -> String) -> (a -> String) -> (c,a) -> String` qui transforme une entrée de la liste aplatie d’un arbre en une ligne de déclaration du nœud en utilisant une fonction qui génère une String pour la couleur et une autre fonction qui génère une String pour la valeur.
``` haskell
color :: (Show a) => a -> String 
color c = "[color=" ++ show c ++ ", fontcolor=" ++ show c ++ "]"

value :: (Show a) => a -> String
value v = show v

noeud :: (c -> String) -> (v -> String) -> (c,v) -> String
noeud nC nV (c,v) =  (nV v) ++ ("[color=" ++ nC c ++ ", fontcolor=" ++ nC c ++ "]")

```
17. Définissez une fonction `arcs :: Arbre c a -> [(a,a)]` qui produit la liste de tous les arcs de l’arbre.
``` haskell
getVal (Noeud _ v _ _) = v

arcs :: Arbre c v -> [(v,v)]
arcs Vide = []
arcs (Noeud _ _ Vide Vide) = []
arcs (Noeud _ v Vide d) = [(v, getVal d)] ++ (arcs d)
arcs (Noeud _ v g Vide) = [(v, getVal g)] ++ (arcs g)
arcs (Noeud _ v g d) = [(v, getVal d)] ++ [(v, getVal g)] ++ (arcs d) ++ (arcs g)
```
18. Définissez une petite fonction `arc :: (a -> String) -> (a,a) -> String` qui transforme un arc de la liste précédente en une ligne graphviz en utilisant une fonction qui génère une String pour une valeur.
``` haskell
string :: (Show a) => a -> String
string = show 

arc :: (a -> String) -> (a,a) -> String
arc str (x,y) = str x ++ "->" ++ str y
```
19. Finalement, définissez une fonction `dotise :: String -> (c -> String) -> (a -> String) -> Arbre c a -> String` qui prend en argument :

* le nom de l’arbre produit,
* une fonction de conversion pour les couleurs,
* une fonction de conversion pour les valeurs,
* un arbre,
* et calcule la chaîne de caractères représentant l’arbre.

Cette fonction pourra avantageusement utiliser la fonction `unlines`.
``` haskell
dotise :: String -> (c -> String) -> (v -> String) -> Arbre c v -> String
dotise name c v a = unlines ([entete] ++ (map (noeud c v) (aplatit a)) ++ ["/* Liste des arcs */"] ++ map (arc v) (arcs a) ++ ["}"])
            where entete = unlines (["/* En tête */"] ++ ["digraph " ++ show name ++ " {"] ++ ["node  [fontname=\"DejaVu-Sans\", shape=circle]"] ++ ["/* Liste des noeuds */"])

```

#### Enfin de la couleur… !

20. Définissez une fonction elementR qui cherche une valeur dans un arbre binaire de recherche. Au lieu de regarder « taille » nœuds, elle regardera au plus « hauteur » nœuds.
``` haskell
elementR :: Ord a => a -> Arbre c a -> Bool
elementR _ Vide = False
elementR x (Noeud _ v g d)  | v < x = elementR x d
                            | v > x = elementR x g
                            | otherwise = True
```
21. Déclarez un type Couleur à deux valeurs, correspondant soit au rouge, soit au noir.
``` haskell
data Couleur = R | B deriving Show

type ArbreRN a = Arbre Couleur a
```
22. Définissez la fonction de rééquilibrage `equilibre :: ArbreRN a -> ArbreRN a`.
``` haskell
equilibre :: Couleur -> a -> ArbreRN a -> ArbreRN a -> ArbreRN a
equilibre B z (Noeud R y (Noeud R x a b) c) d = Noeud R y (Noeud B x a b) (Noeud B z c d)
equilibre B z (Noeud R x a (Noeud R y b c)) d = Noeud R y (Noeud B x a b) (Noeud B z c d)
equilibre B x a (Noeud R z (Noeud R y b c) d) = Noeud R y (Noeud B x a b) (Noeud B z c d)
equilibre B x a (Noeud R y b (Noeud R z c d)) = Noeud R y (Noeud B x a b) (Noeud B z c d)
equilibre c v g d = Noeud c v g d
```
23. Définissez la fonction d’insertion d’une valeur dans un arbre rouge et noir.
``` haskell
racineNoire :: Ord a => ArbreRN a -> ArbreRN a
racineNoire Vide = Vide
racineNoire (Noeud _ v g d) = Noeud B v g d

insertion :: Ord a =>  a -> ArbreRN a -> ArbreRN a
insertion val arbre = racineNoire (ins val arbre)
          where ins v Vide = Noeud R v Vide Vide
                ins v (Noeud c r g d) | v < r = equilibre c r (ins v g) d
                                      | otherwise = equilibre c r g (ins v d)

```
25.  Définissez deux notions différentes (et pertinentes) d’égalité sur les arbres rouge-noir. Définissez les fonctions correspondantes (nommées par exemple (===) et (~==)).
``` haskell
{-
equals :: (Eq a) => ArbreRN a -> ArbreRN a -> Bool
equals Vide Vide = True
equals (Noeud c v g d) (Noeud c1 v1 g1 d1) = b
        where b | (c == c1) && (v == v1) = equals g g1 && equals d d1
                | otherwise = False

(c == c1) && (v == v1) : provoque une erreur :/
-}

almostequals :: (Eq a) => ArbreRN a -> ArbreRN a -> Bool
almostequals Vide Vide = True
almostequals (Noeud c v g d) (Noeud c1 v1 g1 d1) = y
        where y | (v == v1) = almostequals g g1 && almostequals d d1
                | otherwise = False
```

#### … et un peu d’animation

26. Définissez une fonction `arbresDot :: [Char] -> [String]` qui, pour une liste de caractères, retourne une liste des chaînes produites par dotise. À la position i de la liste résultat, il y aura ainsi la description au format graphviz de l’arbre obtenu par les ajouts successifs des caractères aux positions 0 à i − 1 de la liste passée en argument.
``` haskell
coul :: Couleur -> String
coul R = "red"
coul B = "black" 

arbresDot :: [Char] -> [String]
arbresDot chaine = f chaine Vide
  where f "" _ = []
        f (x:xs) abr = dotise "Arbre" coul id arbre : f xs arbre
          where arbre = insertion [x] abr
```
Main :
``` haskell
main = mapM_ ecrit arbresAlpha
    where ecrit a = do writeFile "arbresAlpha.dot" a 
                       threadDelay 1000000
          arbresAlpha = arbresDot "abcdefghijklmopqrstuvwxyz"

{-
main = mapM_ ecrit arbresAlea
    where ecrit a = do writeFile "arbresAlea.dot" a 
                       threadDelay 1000000
          arbresAlea = arbresDot "gcfxieqzrujlmdoywnbakhpvst"
-}
```

### Questions non traitées :

Toutes les questions ont été traitées.

### Notions du TP :

Les notions importantes à retenir sont la manipulation des arbres et de comprendre comment des arbres équilibrés permettent la création d'une structure de données de type Map.
