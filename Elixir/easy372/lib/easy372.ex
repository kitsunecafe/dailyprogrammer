defmodule Easy372 do
  def balanced(str, counter \\ 0)
  def balanced("x" <> rest, counter), do: balanced(rest, counter + 1)
  def balanced("y" <> rest, counter), do: balanced(rest, counter - 1)
  def balanced(<<>>, 0), do: true
  def balanced(<<>>, _), do: false

  def balanced_bonus(str, acc \\ %{})
  
  def balanced_bonus(<<>>, acc) do
    Map.values(acc)
    |> Enum.uniq()
    |> Enum.count() <= 1
  end

  def balanced_bonus(<<char::binary-size(1), rest::binary>>, acc) do
    occurrence = Map.get(acc, char, 0)
    acc = Map.put(acc, char, occurrence + 1)
    balanced_bonus(rest, acc)
  end
end
