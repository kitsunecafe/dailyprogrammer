defmodule Easy374Test do
  use ExUnit.Case
  doctest Easy374

  test "additive persistence" do
    assert Easy374.additive_persistence(13) == 1
    assert Easy374.additive_persistence(1234) == 2
    assert Easy374.additive_persistence(9876) == 2
    assert Easy374.additive_persistence(1990) == 3
  end
end
