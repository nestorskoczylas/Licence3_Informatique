import Parser
import Data.Char
import Data.Maybe

type Nom = String

data Expression = Lam Nom Expression
                | App Expression Expression
                | Var Nom
                | Lit Litteral
                deriving (Show,Eq)

data Litteral = Entier Integer
              | Bool   Bool
              deriving (Show,Eq)

{-
runParser p "abcbcgc"' = Resultat( 3, "bcgc")
runParser unCaractereQuelconque "abcd" = Resultat("a","bcd")

runParser (car ' ') "  abc" = Resultat(' ',"bcd")
runParser (some (car ' ')) "   avbc" = Resultat("  ","avbc")
-}


--Analyse proprement dite--

--Q1--
espacesP :: Parser ()
espacesP = many (car ' ') >> pure ()
--espacesP = many (car ' ') >> return ()

{-
espacesP :: Parser [Char]
espacesP = many (car ' ')
-}

--Q2--
isMin :: Char -> Bool
isMin = flip elem ['a'..'z']

minP :: Parser [Char]
minP = some (carQuand isMin)

nomP :: Parser Nom
nomP = (minP >>= \e ->
        espacesP >>= \_ ->
        pure e)

--Q3--
varP :: Parser Expression
varP = (nomP >>= \e ->
        pure (Var e))

--Q4--
applique :: [Expression] -> Expression
applique (l:ls) = foldl(\x y -> App x y) l ls

--Q5--
exprP :: Parser Expression
exprP = booleenP <|> nombreP <|> varP <|> lambdaP <|> exprParentheseeP

exprsP :: Parser Expression
exprsP = (some exprP >>= \e ->
        pure (applique e))

--Q6--
lambdaP :: Parser Expression
lambdaP =  (car '\\') <|> (car 'λ') >>
            espacesP >>
            nomP >>= \p ->
            chaine("->") >>
            espacesP >> 
            exprsP >>= \s -> 
            pure (Lam p s)


--Q7--
{-
voir Q5
exprP = varP <|> lambdaP
-}

--Q8--
exprParentheseeP :: Parser Expression
exprParentheseeP = (espacesP >>
                    car '(' >>
                    exprsP >>= \e ->
                    car ')' >>
                    espacesP >>
                    pure e)

--Q9--
nombre :: Parser String
nombre = some (carQuand isDigit)

entier :: Parser Integer
entier = (nombre >>= \nb ->
          pure (read nb))

nombreP :: Parser Expression
nombreP = (entier >>= \e ->
           espacesP >>= \_ ->
           pure(Lit(Entier e)))

--Q10--
booleenP :: Parser Expression
booleenP = (chaine "True" >> espacesP >> pure (Lit (Bool True))) <|>
           (chaine "False" >> espacesP >> pure (Lit (Bool False)))

--Q11--
expressionP :: Parser Expression
expressionP = espacesP >> exprsP

--Q12--
ras :: String -> Expression
ras s = case (runParser expressionP s) of
                Nothing -> error "Erreur d’analyse syntaxique"
                Just(e, _) -> e


--Interprétation--

--Q13--
data ValeurA = VLitteralA Litteral
             | VFonctionA (ValeurA -> ValeurA)
--             | deriving Show


--Q14--

instance Show ValeurA where
        show (VFonctionA _) = "λ"
        show (VLitteralA (Entier n)) = show n
        show (VLitteralA (Bool b)) = show b

type Environnement a = [(Nom, a)]

--Q15--
interpreteA :: Environnement ValeurA -> Expression -> ValeurA
interpreteA _ (Lit l) = VLitteralA l
interpreteA env (Var x) = fromJust $ lookup x env
--TEST : interpreteA _ (Lam _ _) = VFonctionA undefined
interpreteA env (Lam nom expr) = VFonctionA (\v -> interpreteA ((nom,v):env) expr)
interpreteA env (App e1 e2) = f v2
        where   VFonctionA f = interpreteA env e1
                v2 = interpreteA env e2

--Q16--
negA :: ValeurA
negA = VFonctionA (\(VLitteralA (Entier n)) -> VLitteralA (Entier (-n)))

--Q17--
addA :: ValeurA
addA = VFonctionA $ \(VLitteralA (Entier n1)) ->
        VFonctionA $ \(VLitteralA (Entier n2)) ->
                (VLitteralA (Entier (n1 + n2)))

--Q18--
envA :: Environnement ValeurA
envA = [ ("neg",   negA)
       , ("add",   releveBinOpEntierA (+))
       , ("soust", releveBinOpEntierA (-))
       , ("mult",  releveBinOpEntierA (*))
       , ("quot",  releveBinOpEntierA quot) ]

releveBinOpEntierA :: (Integer -> Integer -> Integer) -> ValeurA
releveBinOpEntierA op = VFonctionA $ \(VLitteralA (Entier n1)) ->
        VFonctionA $ \(VLitteralA (Entier n2)) ->
                (VLitteralA (Entier (n1 `op` n2)))

--Q19--
ifthenelseA :: ValeurA
ifthenelseA = VFonctionA $ \(VLitteralA (Bool b)) ->
        VFonctionA $ \(VLitteralA (Entier n1)) ->
                VFonctionA $ \(VLitteralA (Entier n2)) ->
                        if b == True
                                then (VLitteralA (Entier n1))
                                else (VLitteralA (Entier n2))