type Symbole  = Char
type Mot      = [Symbole]
type Axiome   = Mot
type Regles   = Symbole -> Mot
type LSysteme = [Mot]

--Q1--

motSuivant :: Regles -> Mot -> Mot
motSuivant r [] = []
motSuivant r (x:xs) = r x ++ motSuivant r xs

motSuivant' :: Regles -> Mot -> Mot
motSuivant' r = concat . map r 

motSuivant'' :: Regles -> Mot -> Mot
motSuivant'' r l = [y | x <- l, y <- r x]

--Q2--
vonKoch :: Char -> [Char]
vonKoch 'F' = "F+F--F+F"
vonKoch '+' = "+"
vonKoch '-' = "-"

--Q3--
lsysteme :: Axiome -> Regles -> LSysteme
lsysteme a r = iterate (motSuivant' r) a