import Test.QuickCheck
import Control.Concurrent (threadDelay)

--Q1--
data Arbre col val = Vide
                    | Noeud col val (Arbre col val) (Arbre col val)
                    deriving Show

arbreComplet = Noeud 'a' 1 (Noeud 'b' 2 Vide Vide)

--Q2--
mapArbre :: (a -> b) -> Arbre c a -> Arbre c b
mapArbre _ Vide = Vide
mapArbre f (Noeud c v g d) = Noeud c (f v) (mapArbre f g) (mapArbre f d)

--Q3--
hauteur :: Arbre c v -> Int
hauteur Vide = 0
hauteur (Noeud _ _ g d) = 1 + max (hauteur g) (hauteur d)

taille :: Arbre c v -> Int
taille Vide = 0
taille (Noeud _ _ g d) = 1 + taille g + taille d

--Q4--

dimension :: (Int -> Int -> Int) -> Arbre c v -> Int
dimension _ Vide = 0
dimension f (Noeud _ _ g d) = 1 + f (dimension f g) (dimension f d)

dimension' :: (Num a) => (c -> v -> a -> a -> a) -> a -> Arbre c v -> a
dimension' _ c Vide = c
dimension' f a (Noeud c v g d) = f c v (dimension' f a g) (dimension' f a d) 

--Q5--
peigneGauche :: [(c,v)] -> Arbre c v
peigneGauche [] = Vide
peigneGauche ((c,v):xs) = Noeud c v (peigneGauche xs) Vide


--Q6--
prop_hauteurPeigne xs = length xs == hauteur (peigneGauche xs)

{- Test
ghci> quickCheck prop_hauteurPeigne
+++ OK, passed 100 tests.
-}

--Q7--
prop_taille xs = length xs == taille (peigneGauche xs)
prop_dimension_hauteur xs = length xs == dimension max (peigneGauche xs)
prop_dimension_taille xs = length xs == dimension (+) (peigneGauche xs)

{-
ghci> quickCheck prop_taille
+++ OK, passed 100 tests.

ghci> quickCheck prop_dimension_hauteur
+++ OK, passed 100 tests.

ghci> quickCheck prop_dimension_taille
+++ OK, passed 100 tests.
-}

--Q8--
estComplet' :: Arbre c v -> (Bool, Int)
estComplet' (Noeud _ _ g d) = let (ecg, hg) = estComplet' g
                                  (ecd, hd) = estComplet' d
                                in (ecg && ecd && (hg == hd), max hg hd + 1)

estComplet :: Arbre c v -> Bool
estComplet = fst.estComplet'

prop_estComplet l | l == [] = estComplet (peigneGauche l)
                  | length l == 1 = estComplet (peigneGauche l)
                  | otherwise = estComplet (peigneGauche l) == False

{-
ghci> quickCheck prop_estComplet
+++ OK, passed 100 tests.
-}

--Q9--
estComplet'' :: Arbre c v -> Bool
estComplet'' Vide = True
estComplet'' a = dimension (+) a == 2^dimension max a -1

prop_estComplet2 l | l == [] = estComplet'' (peigneGauche l)
                   | length l == 1 = estComplet'' (peigneGauche l)
                   | otherwise = estComplet'' (peigneGauche l) == False

{-
ghci> quickCheck prop_estComplet2
+++ OK, passed 100 tests.
-}

--Q10--
-- Les peignes gauche complets sont les arbres vides et les arbres de 1 élément
-- Pour quickCheck voir Q8

--Q11--
complet' :: Int -> [(c, v)] -> (Arbre c v, [(c, v)])
complet' 0 l = (Vide, l)
complet' h l = ((Noeud c v g d), reste'')
            where (g, (c, v) : reste') = complet' (h - 1) l
                  (d, reste'') = complet' (h - 1) reste'  

complet :: Int -> [(c, v)] -> Arbre c v
complet 0 l = fst(complet' 0 l)
complet h l = fst(complet' h l)

--Q12--
myRepeat :: a -> [a]
myRepeat = iterate id

--Q13--
listUnicode = [((), x) | x <- ['a'..]]

--Q14--
aplatit :: Arbre c v -> [(c, v)]
aplatit Vide = []
aplatit (Noeud c v g d) = concat [aplatit g, [(c,v)], aplatit d]

complet1 = complet 4 (take 15 listUnicode)
prop_aplatit' = map snd (aplatit complet1) == "abcdefghijklmno"

{-
ghci> quickCheck prop_aplatit' 
+++ OK, passed 1 test.
-}

--Q15--
element :: Eq v => v -> Arbre c v -> Bool
element _ Vide = False
element e arbre = elem e (map snd(aplatit arbre))

{-
dot -Txlib arbre.dot
dot -Tpng arbre.dot > arbre.png
-}

--Q16--
color :: (Show a) => a -> String    -- show 12 => "12" // show [1,2,3] => "[1,2,3]"
color c = "[color=" ++ show c ++ ", fontcolor=" ++ show c ++ "]"

value :: (Show a) => a -> String
value v = show v

noeud :: (c -> String) -> (v -> String) -> (c,v) -> String
noeud nC nV (c,v) =  (nV v) ++ ("[color=" ++ nC c ++ ", fontcolor=" ++ nC c ++ "]")

--Q17--
getVal :: Arbre c v -> v
getVal (Noeud _ v _ _) = v

arcs :: Arbre c v -> [(v,v)]
arcs Vide = []
arcs (Noeud _ _ Vide Vide) = []
arcs (Noeud _ v Vide d) = [(v, getVal d)] ++ (arcs d)
arcs (Noeud _ v g Vide) = [(v, getVal g)] ++ (arcs g)
arcs (Noeud _ v g d) = [(v, getVal d)] ++ [(v, getVal g)] ++ (arcs d) ++ (arcs g)

--Q18--
string :: (Show a) => a -> String
string = show 

arc :: (a -> String) -> (a,a) -> String
arc str (x,y) = str x ++ "->" ++ str y

--Q19--

dotise :: String -> (c -> String) -> (v -> String) -> Arbre c v -> String
dotise name c v a = unlines ([entete] ++ (map (noeud c v) (aplatit a)) ++ ["/* Liste des arcs */"] ++ map (arc v) (arcs a) ++ ["}"])
            where entete = unlines (["/* En tête */"] ++ ["digraph " ++ show name ++ " {"] ++ ["node  [fontname=\"DejaVu-Sans\", shape=circle]"] ++ ["/* Liste des noeuds */"])


--Q20--
elementR :: Ord a => a -> Arbre c a -> Bool     -- ord 'a' => 97 // ord '\n' => 10
elementR _ Vide = False
elementR x (Noeud _ v g d)  | v < x = elementR x d
                            | v > x = elementR x g
                            | otherwise = True

--Q21--
data Couleur = R | B deriving Show

type ArbreRN a = Arbre Couleur a

--Q22-
equilibre :: Couleur -> a -> ArbreRN a -> ArbreRN a -> ArbreRN a
equilibre B z (Noeud R y (Noeud R x a b) c) d = Noeud R y (Noeud B x a b) (Noeud B z c d)
equilibre B z (Noeud R x a (Noeud R y b c)) d = Noeud R y (Noeud B x a b) (Noeud B z c d)
equilibre B x a (Noeud R z (Noeud R y b c) d) = Noeud R y (Noeud B x a b) (Noeud B z c d)
equilibre B x a (Noeud R y b (Noeud R z c d)) = Noeud R y (Noeud B x a b) (Noeud B z c d)
equilibre c v g d = Noeud c v g d

--Q23--
racineNoire :: Ord a => ArbreRN a -> ArbreRN a
racineNoire Vide = Vide
racineNoire (Noeud _ v g d) = Noeud B v g d

insertion :: Ord a =>  a -> ArbreRN a -> ArbreRN a
insertion val arbre = racineNoire (ins val arbre)
          where ins v Vide = Noeud R v Vide Vide
                ins v (Noeud c r g d) | v < r = equilibre c r (ins v g) d
                                      | otherwise = equilibre c r g (ins v d)

--Q25--
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

--Q26--
coul :: Couleur -> String
coul R = "red"
coul B = "black" 

arbresDot :: [Char] -> [String]
arbresDot chaine = f chaine Vide
  where f "" _ = []
        f (x:xs) abr = dotise "Arbre" coul id arbre : f xs arbre
          where arbre = insertion [x] abr


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


      