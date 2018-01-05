defmodule Pattern do
  def count(input), do: count(%{}, 2, String.graphemes(input))
  def count(acc, count, input) when count == length(input), do: :maps.filter(fn _, v -> v > 1 end, acc)
  def count(acc, count, input) do
    input
    |> Enum.chunk_every(count, 1, :discard)
    |> Enum.map(fn(x) -> Enum.join(x) end) 
    |> Enum.reduce(acc, fn x, a -> Map.update(a, x, 1, &(&1 + 1)) end)
    |> count(count + 1, input)
  end
end

Enum.each(
  ["9870209870409898", "82156821568221", "11111011110111011", "98778912332145", "124489903108444899", "abcddbcaabab"],
  fn x -> IO.inspect(Pattern.count(x))
  end
)