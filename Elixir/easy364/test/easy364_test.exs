defmodule Easy364Test do
  use ExUnit.Case
  doctest Easy364

  test "rolls within dice range" do
    {x, _} = Easy364.roll("3d6")
    assert Enum.member?(3..18, x)
    {x, _} = Easy364.roll("4d12")
    assert Enum.member?(4..48, x)
    {x, _} = Easy364.roll("1d10")
    assert Enum.member?(1..10, x)
    {x, _} = Easy364.roll("5d4")
    assert Enum.member?(5..20, x)
    {x, _} = Easy364.roll("5d12")
    assert Enum.member?(5..60, x)
    {x, _} = Easy364.roll("6d4")
    assert Enum.member?(6..24, x)
    {x, _} = Easy364.roll("1d2")
    assert Enum.member?(1..2, x)
    {x, _} = Easy364.roll("1d8")
    assert Enum.member?(1..8, x)
    {x, _} = Easy364.roll("4d20")
    assert Enum.member?(4..80, x)
    {x, _} = Easy364.roll("100d100")
    assert Enum.member?(100..10000, x)
  end
end
