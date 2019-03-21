defmodule HTTPTest do
  use ExUnit.Case
  doctest HTTP

  test "greets the world" do
    assert HTTP.hello() == :world
  end
end
