import Graphics.Gloss

type Symbole  = Char
type Mot      = [Symbole]
type Axiome   = Mot
type Regles   = Symbole -> Mot
type LSysteme = [Mot]

type EtatTortue = (Point, Float)

type Config = (EtatTortue -- État initial de la tortue
              ,Float      -- Longueur initiale d’un pas
              ,Float      -- Facteur d’échelle
              ,Float      -- Angle pour les rotations de la tortue
              ,[Symbole]) -- Liste des symboles compris par la tortue

--Q1--
motSuivant' :: Regles -> Mot -> Mot
motSuivant' r = concat . map r

--Q3--
lsysteme :: Axiome -> Regles -> LSysteme
lsysteme a r = iterate (motSuivant' r) a

--Q4--
etatInitial :: Config -> EtatTortue
etatInitial (t,_,_,_,_) = t

longueurPas :: Config -> Float
longueurPas (_,d,_,_,_) = d

facteurEchelle :: Config -> Float
facteurEchelle (_,_,f,_,_) = f

angle :: Config -> Float
angle (_,_,_,a,_) = a

symbolesTortue :: Config -> [Symbole]
symbolesTortue (_,_,_,_,s) = s

--Test--
test :: Config
test = (((2.0,3.0), 0.0),1.0,1.0,1.0,['o','k'])


--Q5--
avance :: Config -> EtatTortue -> EtatTortue
avance c ((x, y), cap) = ((x + longueurPas (c) * cos (cap), y + longueurPas (c) * sin (cap)), cap)

{-
avance test (etatInitial test)
((3.0,3.0),0.0)
-}

--Q6--
tourneAGauche :: Config -> EtatTortue -> EtatTortue
tourneAGauche c ((x, y), cap) = ((x,y), cap + (angle c))

{-
tourneAGauche test (etatInitial test)
((2.0,3.0),1.0)
-}

tourneADroite :: Config -> EtatTortue -> EtatTortue
tourneADroite c ((x, y), cap) = ((x,y), cap - (angle c))

{-
tourneADroite test (etatInitial test)
((2.0,3.0),-1.0)
-}

--Q7--
filtreSymbolesTortue :: Config -> Mot -> Mot
filtreSymbolesTortue _ [] = []
filtreSymbolesTortue c (x:xs) = 
    if x `elem` symbolesTortue c then x : (filtreSymbolesTortue c xs)
    else filtreSymbolesTortue c xs

{-
filtreSymbolesTortue test "ka"
"k"
filtreSymbolesTortue test ""
""
filtreSymbolesTortue test "ok"
"ok"
filtreSymbolesTortue test "p"
""
-}

type EtatDessin = (EtatTortue, Path)

--Q8--
interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin
interpreteSymbole c etat_d 'F' = (avance c (fst etat_d), snd etat_d ++ [fst (avance c (fst etat_d))])

interpreteSymbole c etat_d '+' = (tourneAGauche c (fst etat_d), snd etat_d)

interpreteSymbole c etat_d '-' = (tourneADroite c (fst etat_d), snd etat_d)

interpreteSymbole _ _ _ = error "This symbol is not accepted"

--Q10--
interpreteMot :: Config -> Mot -> Picture
interpreteMot c mot = Line (interpreteMot_ c (etatInitial c, [fst (etatInitial c)]) (filtreSymbolesTortue c mot))
  where
    interpreteMot_ _ (x,y) [] = y
    interpreteMot_ c (x,y) (l:ls) = interpreteMot_ c (interpreteSymbole c (x,y) l) ls


{-
dessin :: Picture
dessin = interpreteMot (((-150,0),0),100,1,pi/3,"F+-") "F+F--F+F"

main :: IO ()
main = display (InWindow "L-système" (1000, 1000) (0, 0)) white dessin

--ghc -dynamic -Wall tortue.hs && ./tortue
-}


--Q11--
lsystemeAnime :: LSysteme -> Config -> Float -> Picture
lsystemeAnime lSys (init, pas, ech, ang, symbs) instant = interpreteMot (init, pas * (ech / fromIntegral enieme), ech, ang, symbs) (lSys !! enieme)
  where enieme = round instant `mod` 8

--Test

vonKoch1 :: LSysteme
vonKoch1 = lsysteme "F" regles
    where regles 'F' = "F-F++F-F"
          regles  s  = [s]

vonKoch2 :: LSysteme
vonKoch2 = lsysteme "F++F++F++" regles
    where regles 'F' = "F-F++F-F"
          regles  s  = [s]

hilbert :: LSysteme
hilbert = lsysteme "X" regles
    where regles 'X' = "+YF-XFX-FY+"
          regles 'Y' = "-XF+YFY+FX-"
          regles  s  = [s]

dragon :: LSysteme
dragon = lsysteme "FX" regles
    where regles 'X' = "X+YF+"
          regles 'Y' = "-FX-Y"
          regles  s  = [s]

vonKoch1Anime :: Float -> Picture
vonKoch1Anime = lsystemeAnime vonKoch1 (((-400, 0), 0), 800, 1/3, pi/3, "F+-")

vonKoch2Anime :: Float -> Picture
vonKoch2Anime = lsystemeAnime vonKoch2 (((-400, -250), 0), 800, 1/3, pi/3, "F+-")

hilbertAnime :: Float -> Picture
hilbertAnime = lsystemeAnime hilbert (((-400, -400), 0), 800, 1/2, pi/2, "F+-")

dragonAnime :: Float -> Picture
dragonAnime = lsystemeAnime dragon (((0, 0), 0), 50, 1, pi/2, "F+-")

dessin :: Picture
dessin = vonKoch2Anime 5

main :: IO ()
main = display (InWindow "L-système" (1000, 1000) (0, 0)) white dessin