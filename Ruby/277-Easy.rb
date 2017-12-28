def gcd a, b
  return a if b.zero?  
  gcd b, a%b
end

def f s
  a, b = s.split.map &:to_i
  "#{a / gcd(a, b)} #{b / gcd(a, b)}"
end

