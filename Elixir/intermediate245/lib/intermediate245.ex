defmodule Intermediate245 do
  def decode([_, key, _, input]) do
    Regex.scan(~r/\b([a-z])[\s|\n]([g]+)/i, key)
    |> Enum.sort(&sort/2)
    |> IO.inspect
    |> Enum.reduce(input, fn [_, ch, val], acc -> String.replace(acc, val, ch) end)
  end

  def decode(input) do
    Regex.run(~r/((\w \w+ )+)(.+)/i, input)
    |> decode()
  end

  def sort([_, _, a], [_, _, b]) do
    String.length(a) >= String.length(b)
  end
end
