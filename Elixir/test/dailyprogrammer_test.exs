defmodule DailyprogrammerTest do
  use ExUnit.Case
  doctest Dailyprogrammer

  test "greets the world" do
    assert Dailyprogrammer.hello() == :world
  end
end
