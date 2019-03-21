defmodule Easy372Test do
  use ExUnit.Case
  doctest Easy372

  test "balanced" do
    assert Easy372.balanced("xxxyyy") == true
    assert Easy372.balanced("yyyxxx") == true
    assert Easy372.balanced("xxxyyyy") == false
    assert Easy372.balanced("yyxyxxyxxyyyyxxxyxyx") == true
    assert Easy372.balanced("xyxxxxyyyxyxxyxxyy") == false
    assert Easy372.balanced("") == true
    assert Easy372.balanced("x") == false
  end

  test "balanced bonus" do
    assert Easy372.balanced_bonus("xxxyyyzzz") == true
    assert Easy372.balanced_bonus("abccbaabccba") == true
    assert Easy372.balanced_bonus("xxxyyyzzzz") == false
    assert Easy372.balanced_bonus("abcdefghijklmnopqrstuvwxyz") == true
    assert Easy372.balanced_bonus("pqq") == false
    assert Easy372.balanced_bonus("fdedfdeffeddefeeeefddf") == false
    assert Easy372.balanced_bonus("www") == true
    assert Easy372.balanced_bonus("x") == true
    assert Easy372.balanced_bonus("") == true
  end
end
