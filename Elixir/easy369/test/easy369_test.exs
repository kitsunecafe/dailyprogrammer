defmodule Easy369Test do
  use ExUnit.Case
  doctest Easy369

  test "converts rgb to hex" do
    assert Easy369.hexcolor(255, 99, 71) == "#FF6347"
    assert Easy369.hexcolor(184, 134, 11) == "#B8860B"
    assert Easy369.hexcolor(189, 183, 107) == "#BDB76B"
    assert Easy369.hexcolor(0, 0, 205) == "#0000CD"
  end

  test "blends two hex values" do
    # test case from reddit uses #3C444C but that's based on an incorrect rounding of the blue channel
    assert Easy369.blend(["#000000", "#778899"]) == "#3C444D"
    assert Easy369.blend(["#E6E6FA", "#FF69B4", "#B0C4DE"]) == "#DCB1D9"
  end
end
