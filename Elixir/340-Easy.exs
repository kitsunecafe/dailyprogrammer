defmodule Pattern do
  def nb_first(str) do
    str
    |> String.graphemes
    |> get_dups
    |> Enum.at(0)
  end

  def get_dups(letters), do: letters -- Enum.uniq(letters)

  def first(str), do: first(String.graphemes(str), %{}, str)
  defp first([], _, _), do: :not_found
  defp first([letter | _], %{^letter => _}, _), do: letter
  defp first([letter | rest], acc, str), do: first(rest, Map.put(letters, letter, Enum.find_index(str, fn x -> x == letter end)))
end

IO.inspect Pattern.first("ABCDEBC")