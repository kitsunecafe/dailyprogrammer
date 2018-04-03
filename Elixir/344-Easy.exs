defmodule BaumSweet do
  def to(0), do: [1]
  def to(n), do: [1 | Enum.map(1..n, fn(x) -> getValue(Integer.digits(x, 2)) end)]

  def getValue(list \\ [], inc \\ 0)
  def getValue([1 | rest], inc) when rem(inc, 2) == 0, do: getValue(rest, 0)
  def getValue([1 | _], _), do: 0
  def getValue([0 | rest], inc), do: getValue(rest, inc + 1)
  def getValue([], inc) when rem(inc, 2) == 0, do: 1
  def getValue([], _), do: 0
end

IO.inspect BaumSweet.to(20)