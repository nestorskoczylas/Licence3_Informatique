--Echauffement--

--Q1--
alterne' :: [a] -> [a]
alterne' [] = []
alterne' [x]= [x]
alterne' (x:xs) = x : (alterne' (tail xs))

--Q2--
combine :: (a -> b -> c) -> [a] -> [b] -> [c]
combine f [] _ = []
combine f _ [] = []
combine f (x:xs) (y:ys) = f x y : (combine f xs ys)

--Triangle de Pascal--

--Q3--
pasPascal :: [Integer] -> [Integer]
pasPascal [] = [1]
pasPascal l = [1] ++ zipWith (+) l (tail l) ++ [1]

--Q4--
pascal :: [[Integer]]
pascal = iterate pasPascal [1]

--Courbe du dragon--

type Point = (Float, Float)
type Path  = [Point]

--Q5--
pointAintercaler :: Point -> Point -> Point
pointAintercaler (x1,y1) (x2,y2) = ((x1 + x2) / 2 + (y2 - y1) / 2 , (y1 + y2) / 2 + (x1 - x2) / 2)

--Q6--
pasDragon :: Path -> Path
pasDragon [] = []
pasDragon [a, b] = a : pointAintercaler a b : b : []
pasDragon (a : b : c : ps) = a : m : b : m' : pasDragon (c:ps)
    where m = pointAintercaler a b
          m' = pointAintercaler c b

--Q7--
dragon :: Point -> Point -> [Path]
dragon a b = iterate pasDragon [a,b]

--Définition alternative--

--Q8--
dragonOrdre :: Point -> Point -> Int -> Path
dragonOrdre a b 0 = [a,b]
dragonOrdre a b n = dragonOrdre a (pointAintercaler a b) (n-1) ++ reverse (dragonOrdre b (pointAintercaler a b) (n-1))

dragon2 :: Point -> Point -> Int -> [Path]
dragon2 a b 0 = [dragonOrdre a b 0]
dragon2 a b n = (dragon2 a b (n-1)) ++ [(dragonOrdre a b n)]
