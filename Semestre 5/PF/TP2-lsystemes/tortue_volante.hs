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

type EtatDessin = ([EtatTortue], [Path])

--Q8--
interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin
interpreteSymbole c (etatT:etatTs, p:ps) 'F' = (avance c etatT : etatTs, ([fst (avance c etatT)] ++ p) : ps)
interpreteSymbole c (etatT:etatTs, ps)      '+' = (tourneAGauche c etatT : etatTs, ps)
interpreteSymbole c (etatT:etatTs, ps)      '-' = (tourneADroite c etatT : etatTs, ps)
interpreteSymbole _ (etatTs, ps)            '[' = (head etatTs : etatTs, ps)
interpreteSymbole _ (etatT:etatTs, ps)      ']' = (etatTs, [[fst (head etatTs)]] ++ ps)

--Q10--
interpreteMot :: Config -> Mot -> Picture
interpreteMot c mot = pictures (map line (interpreteMot_rec c ([etatInitial c],[[fst (etatInitial c)]]) (filtreSymbolesTortue c mot)))
  where
    interpreteMot_rec _ (s,p) [] = p
    interpreteMot_rec c (s,p) (x:xs) = interpreteMot_rec c (interpreteSymbole c (s,p) x) xs

--dessin = interpreteMot (((-150,0),0),100,1,pi/3,"F+-") "F+F--F+F"
--main = display (InWindow "L-système" (1000, 1000) (0, 0)) white dessin

--Q11--
lsystemeAnime :: LSysteme -> Config -> Float -> Picture
lsystemeAnime lSys (init, pas, ech, ang, symbs) instant = interpreteMot (init, pas * (ech / fromIntegral enieme), ech, ang, symbs) (lSys !! enieme)
  where enieme = round instant `mod` 8


vonKoch2 :: LSysteme
vonKoch2 = lsysteme "F++F++F++" regles
    where regles 'F' = "F-F++F-F"
          regles  s  = [s]

brindille :: LSysteme
brindille = lsysteme "F" regles
    where regles 'F' = "F[-F]F[+F]F"
          regles  s  = [s]

broussaille :: LSysteme
broussaille = lsysteme "F" regles
    where regles 'F' = "FF-[-F+F+F]+[+F-F-F]"
          regles  s  = [s]


vonKoch2Anime :: Float -> Picture
vonKoch2Anime = lsystemeAnime vonKoch2 (((-400, -250), 0), 800, 1/3, pi/3, "F+-")

brindilleAnime :: Float -> Picture
brindilleAnime = lsystemeAnime brindille (((0, -400), pi/2), 800, 1/3, 25*pi/180, "F+-[]")

broussailleAnime :: Float -> Picture
broussailleAnime = lsystemeAnime broussaille (((0, -400), pi/2), 500, 2/5, 25*pi/180, "F+-[]")

dessin :: Picture
dessin = broussailleAnime 5

main :: IO ()
main = display (InWindow "L-système" (1000, 1000) (0, 0)) white dessin