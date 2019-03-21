defmodule Easy364 do
  def roll(str) do
    String.split(str, "d")
    |> Enum.map(&Integer.parse/1)
    |> Enum.map(&elem(&1, 0))
    |> do_roll()
  end

  defp do_roll(dice, acc \\ [])
  defp do_roll([0, _], acc), do: {Enum.sum(acc), acc}
  defp do_roll([dice, sides], acc) do
    do_roll(
      [dice - 1, sides],
      [Enum.random(1..sides) | acc] 
    )
  end
end
