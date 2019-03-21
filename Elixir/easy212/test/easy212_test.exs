defmodule Easy212Test do
  use ExUnit.Case
  doctest Easy212

  test "challenge" do
    assert Easy212.encode("Jag talar Rövarspråket!") == "Jojagog totalolaror Rorövovarorsospoproråkoketot!"
    assert Easy212.encode("I'm speaking Robber's language!") == "I'mom sospopeakokinongog Rorobobboberor'sos lolanongoguagoge!"
  end
end
