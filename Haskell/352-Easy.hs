module Reddit352Easy where
b62 :: Integer -> String
b62 n 
  | n <= 62   = [char]
  | otherwise = char:b62 (div n 62) 
  where char  = (['0'..'9']++['a'..'z']++['A'..'Z']) !! fromInteger(mod n 62)
