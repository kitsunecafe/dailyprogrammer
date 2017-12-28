def defuse wires
  w  = wires.split.map(&:chr).join
  re = /^w[ropg]|rg|b[rgp]|[o|p][rb]|g[wo]$/
  result = w.chars.each_cons(2).map(&:join).map { |s| s =~ re }
  (result.include? nil) ? "Boom" : "Bomb Defused"
end

