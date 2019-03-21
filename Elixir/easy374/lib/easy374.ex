defmodule Easy374 do
  def decompose(num, digits \\ [])
  def decompose(0, digits), do: digits
  def decompose(num, digits) do
    decompose(floor(num / 10), [ rem(num, 10) | digits ])
  end

  def additive_persistence(num, loops \\ 0)
  def additive_persistence(num, loops) when num < 10, do: loops
  def additive_persistence(num, loops) do
    Integer.digits(num)
    |> Enum.sum()
    |> additive_persistence(loops + 1)
  end
end
