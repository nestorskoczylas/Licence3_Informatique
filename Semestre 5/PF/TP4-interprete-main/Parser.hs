-- |
-- Module      :  Parser
--
-- Bibliothèque simple d’analyseurs syntaxiques
--
-- L’entête du module précise explicitement ce qui est exporté par le
-- module : en particulier le constructeur `MkParser` n’est pas
-- exporté, de sorte qu’il n’est pas possible d’utiliser un `Parser`
-- autrement qu’en utilisant une des fonctions prévues à cet effet.

module Parser ( Parser
              , Resultat
              , runParser
              , resultat
              , unCaractereQuelconque
              , carQuand
              , car
              , chaine
              -- réexporte les fonctions utiles de Control.Applicative
              , (<|>), empty, many, some )
where

import Control.Applicative
import Control.Monad (ap, liftM)

-- | Type des analyseurs syntaxiques (parseurs)
type Resultat a = Maybe (a, String)
data Parser a   = MkParser (String -> Resultat a)

-- | Exécute un analyseur syntaxique sur une entrée donnée comme une
-- chaîne
runParser :: Parser a -> String -> Resultat a
runParser (MkParser f) = f

-- | Extrait le résultat, en cas de réussite du parseur
resultat :: Resultat a -> a
resultat (Just (r, _)) = r
resultat _             = error "Parsing error"


-- * Briques de base et combinateurs

-- $index
--
-- Les briques de base (hormis `unCaractereQuelconque`) sont des
-- membres de classes de type très génériques. On les définit donc ici
-- en instanciant les classes de type en question.
--
-- Cela permet en particulier d’obtenir automatiquement les
-- implémentations standard de `>>`, `many`, `some`, etc. ainsi que
-- toutes les fonctions génériques s’appliquant à ces différentes
-- classes de types.
-- L’instance de `Monad` permet aussi d’utiliser la notation `do`.
-- Voir la documentation des modules `Data.Functor`,
-- `Control.Applicative` et `Control.Monad`.
--
-- Cela signifie en revanche que la documentation générée par haddock
-- omet complètement ces différentes fonctions, cachées en résumé dans
-- le fait que `Parser` est une instance des classes de type
-- `Applicative`, `Alternative` et `Monad` (entre autres).

-- | Analyseur qui réussit avec le premier caractère (quelconque) de
-- l’entrée
unCaractereQuelconque :: Parser Char
unCaractereQuelconque = MkParser f
    where f     "" = Nothing
          f (c:cs) = Just (c, cs)

instance Functor Parser where
    fmap = liftM

instance Applicative Parser where
    -- | Analyseur qui réussit toujours, avec le résultat passé en
    -- argument
    pure v = MkParser f
        where f cs = Just (v, cs)

    (<*>) = ap

instance Alternative Parser where
    -- | Analyseur qui échoue toujours
    empty = MkParser (const Nothing)

    -- | Alternative entre deux parseurs
    -- Combinateur qui retourne le résultat du premier analyseur si
    -- celui-ci réussit, sinon celui du second
    p1 <|> p2 = MkParser f
        where f cs = case runParser p1 cs of
                        Nothing -> runParser p2 cs
                        r       -> r

instance Monad Parser where
    p >>= fp = MkParser f
        where f cs = case runParser p cs of
                        Nothing       -> Nothing
                        Just (r, cs') -> runParser (fp r) cs'


-- * Analyseurs construits avec les briques de base

-- | Analyseur qui réussit avec le première caractère s’il vérifie la
-- condition donnée
carQuand :: (Char -> Bool) -> Parser Char
carQuand cond = unCaractereQuelconque >>= filtre
    where filtre c | cond c    = pure c
                   | otherwise = empty

-- | Parser qui réussit si l’entrée commence par le caractère donné
car :: Char -> Parser Char
car c = carQuand (c ==)

-- | Parser qui réussit si l’entrée commence par la chaîne donnée
chaine :: String -> Parser String
chaine     "" = pure ""
chaine (c:cs) = car c     >>
                chaine cs >>
                pure (c:cs)

