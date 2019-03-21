defmodule Easy366Test do
  use ExUnit.Case
  doctest Easy366

  test "challenge" do
    assert Easy366.is_funnel?("leave", "eave") == true
    assert Easy366.is_funnel?("reset", "rest") == true
    assert Easy366.is_funnel?("dragoon", "dragon") == true
    assert Easy366.is_funnel?("eave", "leave") == false
    assert Easy366.is_funnel?("sleet", "lets") == false
    assert Easy366.is_funnel?("skiff", "ski") == false
  end

  test "bonus" do
    trie = Easy366.new(Enable1.load())
    assert Easy366.get_funnel_words(trie, "dragoon") == ["dragon"]
    assert Enum.sort(Easy366.get_funnel_words(trie, "boats")) == Enum.sort(["oats", "bats", "bots", "boas", "boat"])
    assert Easy366.get_funnel_words(trie, "affidavit") == []
  end

  test "bonus 2" do
    words = Enable1.load()
    trie = Easy366.new words
    assert Easy366.bonus2(trie, words) == ["beasts", "boats", "brands", "chards", "charts", "clamps", "coasts", "cramps",
      "drivers", "grabblers", "grains", "grippers", "moats", "peats", "plaints",
      "rousters", "shoots", "skites", "spates", "spicks", "spikes", "spines",
      "teats", "tramps", "twanglers", "waivers", "writes", "yearns"]
  end
end
