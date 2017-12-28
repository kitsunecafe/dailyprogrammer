def decode input
  hands = input.strip.sub(/.{5}/) { |s| s.reverse }
  return "Invalid" if (hands =~ /^([01]1{0,4}0{0,4}){2}$/).nil?
  hands = hands.chars.map(&:to_i).map.with_index { |n, i| n * ((i % 5 == 0) ? 5 : 1) }
  hands = hands.map.with_index { |n, i| n = (i < 5) ? n * 10 : n }
  hands.reduce(:+)
end

