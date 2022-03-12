module Main where

import Graphics.Gloss

main :: IO ()
main = animate (InWindow "Dragon" (500, 500) (0, 0)) white (dragonAnime (50,250) (450,250))

dragonAnime :: RealFrac a => Point -> Point -> a -> Picture
--dragonAnime a b t = Line (dragon a b !! (round t `mod` 20))
dragonAnime a b t = Line (dragon2 a b 25 !! (round t `mod` 20))

--Q5--
pointAintercaler :: Point -> Point -> Point
pointAintercaler (x1,y1) (x2,y2) = ((x1 + x2) / 2 + (y2 - y1) / 2 , (y1 + y2) / 2 + (x1 - x2) / 2)

--Q6--
pasDragon :: Path -> Path
pasDragon [] = []
pasDragon [a] = [a]
pasDragon [a, b] = a : pointAintercaler a b : b : []
pasDragon (a : b : c : ps) = a : m : b : m' : pasDragon (c:ps)
    where m = pointAintercaler a b
          m' = pointAintercaler c b

--Q7--
dragon :: Point -> Point -> [Path]
dragon a b = iterate pasDragon [a,b]

--Q8--
dragonOrdre :: Point -> Point -> Int -> Path
dragonOrdre a b 0 = pasDragon [a,b]
dragonOrdre a b n = dragonOrdre a (pointAintercaler a b) (n-1) ++ reverse (dragonOrdre b (pointAintercaler a b) (n-1))

dragon2 :: Point -> Point -> Int -> [Path]
dragon2 a b 0 = [dragonOrdre a b 0]
dragon2 a b n = (dragon2 a b (n-1)) ++ [(dragonOrdre a b n)]