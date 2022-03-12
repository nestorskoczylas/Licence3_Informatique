# Interprétation

## Binôme : SKOCZYLAS Nestor & FRET Gaëlle


### Compiler les programmes :

Pour compiler les fichiers :
→ entrer dans ghci en écrivant `$ ghci`
→ dans le prelude écrire : `:l Interprete.hs`
→ quitter ghci

### Questions traitées :

#### Analyse proprement dite

1. Définissez un analyseur syntaxique `espacesP :: Parser ()` qui consomme tous les espaces au début de la chaîne à analyser, et retourne toujours () pour ignorer ces espaces.
``` haskell
espacesP :: Parser ()
espacesP = many (car ' ') >> pure ()
```
2. Définissez un analyseur syntaxique `nomP :: Parser Nom` qui analyse le premier nom apparaissant dans la chaîne.
``` haskell
isMin :: Char -> Bool
isMin = flip elem ['a'..'z']

minP :: Parser [Char]
minP = some (carQuand isMin)

nomP :: Parser Nom
nomP = (minP >>= \e ->
        espacesP >>= \_ ->
        pure e)
```
3. Définissez un analyseur syntaxique `varP :: Parser Expression`.
``` haskell
varP :: Parser Expression
varP = (nomP >>= \e ->
        pure (Var e))
```
4. Définissez une fonction `applique :: [Expression] -> Expression` telle que :
* `applique []` n’est pas définie,
* `applique [e]` vaut `e`,
* `applique [e1, e2]` vaut `App e1 e2`,
* `applique [e1, e2, e3]` vaut `App (App e1 e2) e3`,
* `applique [e1, e2, e3, e4]` vaut `App (App (App e1 e2) e3) e4`,
* etc.
``` haskell
applique :: [Expression] -> Expression
applique (l:ls) = foldl(\x y -> App x y) l ls
```
5. Définissez deux analyseurs syntaxiques `exprP :: Parser Expression` et `exprsP :: Parser Expression` tels que :

* pour l’instant `exprP` soit équivalent à `varP`,
* `exprsP` parse une suite de une ou plusieurs expressions (chacune parsées par `exprP`) et les combine en une expression par la fonction applique.
``` haskell
exprP :: Parser Expression
exprP = booleenP <|> nombreP <|> varP <|> lambdaP <|> exprParentheseeP

exprsP :: Parser Expression
exprsP = (some exprP >>= \e ->
        pure (applique e))
```
6. Définissez un analyseur syntaxique `lambdaP :: Parser Expression` qui reconnaisse une expression utilisant la syntaxe suivante inspirée d’Haskell : `\ x -> e` où `e` sera parsé par `exprsP`.
``` haskell
lambdaP :: Parser Expression
lambdaP =  (car '\\') <|> (car 'λ') >>
            espacesP >>
            nomP >>= \p ->
            chaine("->") >>
            espacesP >> 
            exprsP >>= \s -> 
            pure (Lam p s)
```
En oubliant le second `espacesP`, cela posé problème dans la suite du TP.<br/>
7. Étendez la définition de `exprP` pour que
``` haskell
ghci> runParser exprP "\\x -> x"
Just (Lam "x" (Var "x"),"")
```
Voir la Q5, `exprP = varP <|> lambdaP`<br/>
8. Définissez un analyseur syntaxique `exprParentheseeP :: Parser Expression`
``` haskell
exprParentheseeP :: Parser Expression
exprParentheseeP = (espacesP >>
                    car '(' >>
                    exprsP >>= \e ->
                    car ')' >>
                    espacesP >>
                    pure e)
```
9. Définissez un analyseur syntaxique `nombreP :: Parser Expression`
``` haskell
nombre :: Parser String
nombre = some (carQuand isDigit)

entier :: Parser Integer
entier = (nombre >>= \nb ->
          pure (read nb))

nombreP :: Parser Expression
nombreP = (entier >>= \e ->
           espacesP >>= \_ ->
           pure(Lit(Entier e)))
```
10. Définissez un analyseur syntaxique `booleenP :: Parser Expression`
``` haskell
booleenP :: Parser Expression
booleenP = (chaine "True" >> espacesP >> pure (Lit (Bool True))) <|>
           (chaine "False" >> espacesP >> pure (Lit (Bool False)))
```
11. Peaufinez le tout en définissant un analyseur syntaxique `expressionP :: Parser Expression` correspondant à `exprsP` éventuellement précédé d’espaces.
``` haskell
expressionP :: Parser Expression
expressionP = espacesP >> exprsP
```
12. Définissez une fonction au nom court, disons ras (résultat de l’analyse syntaxique), pour faire toute l’analyse : `ras :: String -> Expression`
``` haskell
ras :: String -> Expression
ras s = case (runParser expressionP s) of
                Nothing -> error "Erreur d’analyse syntaxique"
                Just(e, _) -> e
```

#### Interprétation

13. Essayez tout de même d’ajouter : `deriving Show`
14. Complétez la définition de l’instance `Show` pour `ValeurA`
``` haskell
instance Show ValeurA where
        show (VFonctionA _) = "λ"
        show (VLitteralA (Entier n)) = show n
        show (VLitteralA (Bool b)) = show b
```
15. Définissez `interpreteA :: Environnement ValeurA -> Expression -> ValeurA`
``` haskell
interpreteA :: Environnement ValeurA -> Expression -> ValeurA
interpreteA _ (Lit l) = VLitteralA l
interpreteA env (Var x) = fromJust $ lookup x env
--TEST : interpreteA _ (Lam _ _) = VFonctionA undefined
interpreteA env (Lam nom expr) = VFonctionA (\v -> interpreteA ((nom,v):env) expr)
interpreteA env (App e1 e2) = f v2
        where   VFonctionA f = interpreteA env e1
                v2 = interpreteA env e2
```
16. Définissez une fonction `negA :: ValeurA`
``` haskell
negA :: ValeurA
negA = VFonctionA (\(VLitteralA (Entier n)) -> VLitteralA (Entier (-n)))
```
17. Définissez une fonction `addA :: ValeurA`
``` haskell
addA :: ValeurA
addA = VFonctionA $ \(VLitteralA (Entier n1)) -> VFonctionA $ \(VLitteralA (Entier n2)) -> (VLitteralA (Entier (n1 + n2)))
```
18. Définissez une fonction `releveBinOpEntierA :: (Integer -> Integer -> Integer) -> ValeurA` qui prend en argument un opérateur binaire sur les entiers et en fait une `ValeurA`.
``` haskell
releveBinOpEntierA :: (Integer -> Integer -> Integer) -> ValeurA
releveBinOpEntierA op = VFonctionA $ \(VLitteralA (Entier n1)) ->
        VFonctionA $ \(VLitteralA (Entier n2)) ->
                (VLitteralA (Entier (n1 `op` n2)))
```

19.  Définissez `ifthenelseA :: ValeurA`
``` haskell
ifthenelseA :: ValeurA
ifthenelseA :: ValeurA
ifthenelseA = VFonctionA $ \(VLitteralA (Bool b)) ->
        VFonctionA $ \(VLitteralA (Entier n1)) ->
                VFonctionA $ \(VLitteralA (Entier n2)) ->
                        if b == True
                                then (VLitteralA (Entier n1))
                                else (VLitteralA (Entier n2))
```

### Questions non traitées :

Toutes les questions jusqu'à la 19 ont été traitées.
