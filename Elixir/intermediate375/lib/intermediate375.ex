defmodule Intermediate375 do
  def qcheck(queens) do
    with true <- collides_horizontal?(queens),
         do: collides_diaganol?(queens)
  end

  def collides_horizontal?(list) do
    list -- Enum.uniq(list)
    |> empty?()
  end

  def empty?([]), do: true
  def empty?(list) when is_list(list), do: false

  def collides_diaganol?(queens) do
    queens
    |> Enum.with_index()
    |> Enum.map(fn {n, i} -> n + i end)
    |> collides_horizontal?()
  end
end
