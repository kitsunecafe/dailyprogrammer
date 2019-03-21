defmodule Easy375 do
  def add(num) do
    Integer.digits(num)
    |> Enum.reverse()
    |> add_digits()
    |> Integer.undigits()
  end

  def add_digits(digits, acc \\ [])
  def add_digits(digits, [10 | acc]), do: add_digits(digits, [1 | [0 | acc]])
  def add_digits([], acc), do: acc
  def add_digits([head | tail], acc), do: add_digits(tail, [head + 1 | acc])
end
