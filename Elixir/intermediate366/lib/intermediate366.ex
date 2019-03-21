defmodule Intermediate366 do
  def new(words), do: Retrieval.new(words)

  def funnel2(trie, word) do
    get_funnel_words(trie, word)
    |> Enum.map(&funnel2(trie, &1))
    |> Enum.reduce(0, &max(&1, &2))
    |> Kernel.+(1)
  end

  def bonus1(trie, words, length) do
    Enum.filter(words, fn word -> String.length(word) > length end)
    |> Enum.filter(fn word -> funnel2(trie, word) == length end)
  end

  def get_funnel_words(trie, word) do
    get_potential_funnels(word)
    |> Enum.filter(&Retrieval.contains?(trie, &1))
  end

  defp get_potential_funnels(word, head \\ "", funnels \\ [])
  defp get_potential_funnels(<<>>, _, funnels), do: funnels
  defp get_potential_funnels(<<skip::binary-size(1), next::binary>>, head, funnels) do
    get_potential_funnels(next, head <> skip, [head <> next | funnels])
  end
end
