defmodule Dailyprogrammer do
  @moduledoc """
  Documentation for Dailyprogrammer.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Dailyprogrammer.hello
      :world

  """
  def easy341(input), do: easy341(%{}, 2, String.graphemes(input))
  def easy341(acc, count, input) when count == length(input), do: :maps.filter(fn _, v -> v > 1 end, acc)
  def easy341(acc, count, input) do
    input
    |> Enum.chunk_every(count, 1, :discard)
    |> Enum.map(fn(x) -> Enum.join(x) end) 
    |> Enum.reduce(acc, fn x, a -> Map.update(a, x, 1, &(&1 + 1)) end)
    |> easy341(count + 1, input)
  end
end