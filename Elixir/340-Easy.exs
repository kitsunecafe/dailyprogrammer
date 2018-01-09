defmodule Pattern do
  def first(str) do
    str
    |> String.graphemes
    |> get_dups
    |> Enum.find fn x -> 
  end

  def get_dups(letters), do: letters -- Enum.uniq(letters)
end

IO.inspect Pattern.first("ABBA")