defmodule Intermediate366Test do
  use ExUnit.Case
  doctest Intermediate366

  setup do
    words = Enable1.load()
    %{trie: Intermediate366.new(words), words: words} 
  end

  test "challenge", %{trie: trie} do
    assert Intermediate366.funnel2(trie, "gnash") == 4
    assert Intermediate366.funnel2(trie, "princesses") == 9
    assert Intermediate366.funnel2(trie, "turntables") == 5
    assert Intermediate366.funnel2(trie, "implosive") == 1
    assert Intermediate366.funnel2(trie, "programmer") == 2
  end

  test "bonus", %{trie: trie, words: words} do
    assert Intermediate366.bonus1(trie, words, 10) == ["complecting"]
  end

  test "bonus 2", %{trie: trie, words: words} do
    assert Enum.sort(Intermediate366.bonus2(trie, words, 12)) == Enum.sort(["contradictorinesses", "preformationists",
      "noncooperationists", "nonrepresentationalisms", "establishmentarianisms", "unrepresentativenesses"])
  end
end
