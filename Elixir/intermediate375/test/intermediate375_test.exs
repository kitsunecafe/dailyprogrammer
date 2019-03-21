defmodule Intermediate375Test do
  use ExUnit.Case
  doctest Intermediate375

  test "qcheck" do
    assert Intermediate375.qcheck([4, 2, 7, 3, 6, 8, 5, 1]) == true
    assert Intermediate375.qcheck([2, 5, 7, 4, 1, 8, 6, 3]) == true
    assert Intermediate375.qcheck([5, 3, 1, 4, 2, 8, 6, 3]) == false
    assert Intermediate375.qcheck([5, 8, 2, 4, 7, 1, 3, 6]) == false
    assert Intermediate375.qcheck([4, 3, 1, 8, 1, 3, 5, 2]) == false
  end
end
