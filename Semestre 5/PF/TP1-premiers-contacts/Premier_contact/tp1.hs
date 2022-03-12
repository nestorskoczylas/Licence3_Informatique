
--Q3--
sommeDeXaY :: Int -> Int -> Int
sommeDeXaY x y = sum[x..y]

--Q4--
somme :: (Num a) => [a] -> a
somme [] = 0
somme (x : xs) = x + somme xs

--Q5--
last' :: [a] -> a
last' [] = error "ee"
last' [x] = x
last' (_:xs) = last' xs

init' :: [a] -> [a]
init' l = take (length l-1) l

--Q6--
(!!!) :: [a] -> Int -> a
l !!! n =  head (reverse (take n l))

(+++) :: [a] -> [a] -> [a]
[] +++ l = l
l +++ n = init l +++ (last l:n)
-- (x:xs) +++ n = x:(xs+++n)--

concat' :: [[a]] -> [a]
concat' [l] = l
concat' (x:xs) = x ++ concat' xs

map' :: (a -> b) -> [a] -> [b]
map' l [] = []
map' l (x:xs) = l x : map' l xs

--Q7--
--(!!) :: [a] -> Int -> a --
-- x :: Int -> a --

--Q8--
length' :: [a] -> Integer
length' = somme . map' (const 1)

--Q9--
itere' :: (t -> t) -> Int -> t -> [t]
itere' _ 0 x = [x] 
itere' f n x = x : itere' f n (f x)

itere'' :: (t -> t) -> Int -> t -> [t]
itere'' _ 0 x = [x]
itere'' f n x = take n (iterate f x)

--Q10--
itere''' n = itere'' (+1) (n+1) 0


