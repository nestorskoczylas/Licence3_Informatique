# Le L-système et la Tortue

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

#### L-système

1. Définissez la fonction motSuivant :: Regles -> Mot -> Mot qui prend en argument les règles d’un L-système et un mot un et calcule le mot un + 1.
``` haskell
motSuivant :: Regles -> Mot -> Mot
motSuivant r [] = []
motSuivant r (x:xs) = r x ++ motSuivant r xs

motSuivant' :: Regles -> Mot -> Mot
motSuivant' r = concat . map r 

motSuivant'' :: Regles -> Mot -> Mot
motSuivant'' r l = [y | x <- l, y <- r x]
```
2. Pour vérifier vos fonctions, vous définirez la règle pour le L-système du flocon de von Koch et vous vérifierez que vous obtenez des mots de la bonne longueur pour les premiers mots du L-système.
``` haskell
vonKoch :: Char -> [Char]
vonKoch 'F' = "F+F--F+F"
vonKoch '+' = "+"
vonKoch '-' = "-"
```
3. Définissez une fonction lsysteme :: Axiome -> Regles -> LSysteme qui calcule le L-système défini par l’axiome et les règles données.
``` haskell
lsysteme :: Axiome -> Regles -> LSysteme
lsysteme a r = iterate (motSuivant' r) a
```

#### Tortue

4. Définissez les fonctions suivantes :

* `etatInitial :: Config -> EtatTortue`,
* `longueurPas :: Config -> Float`,
* `facteurEchelle :: Config -> Float`,
* `angle :: Config -> Float`,
* `symbolesTortue :: Config -> [Symbole]`.
Ces fonctions se contentent d’extraire l’information du quintuplet.
``` haskell
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
```
5. Définissez la fonction avance :: Config -> EtatTortue -> EtatTortue calculant l’état de la tortue après avoir avancé d’un pas.
``` haskell
avance :: Config -> EtatTortue -> EtatTortue
avance c ((x, y), cap) = ((x + longueurPas (c) * cos (cap), y + longueurPas (c) * sin (cap)), cap)
```
6. Définissez les fonctions tourneAGauche :: Config -> EtatTortue -> EtatTortue et tourneADroite :: Config -> EtatTortue -> EtatTortue.
``` haskell
tourneAGauche :: Config -> EtatTortue -> EtatTortue
tourneAGauche c ((x, y), cap) = ((x,y), cap + (angle c))

tourneADroite :: Config -> EtatTortue -> EtatTortue
tourneADroite c ((x, y), cap) = ((x,y), cap - (angle c))
```
7. Définissez la fonction filtreSymbolesTortue :: Config -> Mot -> Mot qui supprime tous les symboles qui ne sont pas des ordres pour la tortue dans le mot passé en argument.
``` haskell
filtreSymbolesTortue :: Config -> Mot -> Mot
filtreSymbolesTortue _ [] = []
filtreSymbolesTortue c (x:xs) = 
    if x `elem` symbolesTortue c then x : (filtreSymbolesTortue c xs)
    else filtreSymbolesTortue c xs
```
Beaucoup de difficultés ont été rencontré par la fonction `filtreSymbolesTortue`. Il m'a été difficile de trouvé un moyen pour qu'elle fonctionne. Ma seule solution reste celle-ci, même si j'aurai souhaité trouvé une autre façon de faire pour retirer les if, else et then.

8. Définissez une fonction interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin qui calcule le nouvel état atteint par l’exécution de l’ordre correspondant au symbole donné en partant de l’état donné.
``` haskell
interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin
interpreteSymbole c etat_d 'F' = (avance c (fst etat_d), snd etat_d ++ [fst (avance c (fst etat_d))])

interpreteSymbole c etat_d '+' = (tourneAGauche c (fst etat_d), snd etat_d)

interpreteSymbole c etat_d '-' = (tourneADroite c (fst etat_d), snd etat_d)

interpreteSymbole _ _ _ = error "This symbol is not accepted"
```

10.  Définissez une fonction interpreteMot :: Config -> Mot -> Picture.
``` haskell
interpreteMot :: Config -> Mot -> Picture
interpreteMot c mot = Line (interpreteMot_ c (etatInitial c, [fst (etatInitial c)]) (filtreSymbolesTortue c mot))
  where
    interpreteMot_ _ (x,y) [] = y
    interpreteMot_ c (x,y) (l:ls) = interpreteMot_ c (interpreteSymbole c (x,y) l) ls
```
11. 
``` haskell
lsystemeAnime :: LSysteme -> Config -> Float -> Picture
lsystemeAnime lSys (init, pas, ech, ang, symbs) instant = interpreteMot (init, pas * (ech / fromIntegral enieme), ech, ang, symbs) (lSys !! enieme)
  where enieme = round instant `mod` 8
```

#### Tortue Volante

Jusqu'à la question numéro 7 le code reste inchangé par rapport à la partie précédente. C'est à partir du moment où l'on change la défintion de `EtatDessin` que les fonctions changent.

8. Définissez une fonction interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin qui calcule le nouvel état atteint par l’exécution de l’ordre correspondant au symbole donné en partant de l’état donné.
``` haskell
interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin
interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin
interpreteSymbole c (etatT:etatTs, p:ps) 'F' = (avance c etatT : etatTs, ([fst (avance c etatT)] ++ p) : ps)
interpreteSymbole c (etatT:etatTs, ps)      '+' = (tourneAGauche c etatT : etatTs, ps)
interpreteSymbole c (etatT:etatTs, ps)      '-' = (tourneADroite c etatT : etatTs, ps)
interpreteSymbole _ (etatTs, ps)            '[' = (head etatTs : etatTs, ps)
interpreteSymbole _ (etatT:etatTs, ps)      ']' = (etatTs, [[fst (head etatTs)]] ++ ps)
```
Ici aussi, j'ai eu des difficultés à modifier mon code pour qu'il accepte la nouvelle définition de dessin. Grâce à l'aide de mes camarades, j'en suis venu à bout.

10.  Définissez une fonction interpreteMot :: Config -> Mot -> Picture.
``` haskell
interpreteMot :: Config -> Mot -> Picture
interpreteMot c mot = pictures (map line (interpreteMot_rec c ([etatInitial c],[[fst (etatInitial c)]]) (filtreSymbolesTortue c mot)))
  where
    interpreteMot_rec _ (s,p) [] = p
    interpreteMot_rec c (s,p) (x:xs) = interpreteMot_rec c (interpreteSymbole c (s,p) x) xs
```
11. 
``` haskell
lsystemeAnime :: LSysteme -> Config -> Float -> Picture
lsystemeAnime lSys (init, pas, ech, ang, symbs) instant = interpreteMot (init, pas * (ech / fromIntegral enieme), ech, ang, symbs) (lSys !! enieme)
  where enieme = round instant `mod` 8
```

### Questions non traitées :

Toutes les questions ont été traitées.

### Notions du TP :

Les notions importantes à retenir sont la multipliciter des fonctions, des définitions de type différentes que l'on peut créer avec Haskell.
