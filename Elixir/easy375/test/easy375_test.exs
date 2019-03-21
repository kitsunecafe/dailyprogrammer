defmodule Easy375Test do
  use ExUnit.Case
  doctest Easy375

  test "add" do
    assert Easy375.add(998) == 10109
  end
end
