defmodule Easy366 do
  def new(words), do: Retrieval.new words

  def is_funnel?(word, funnel, head \\ <<>>)
  def is_funnel?(<<>>, _, _), do: false
  def is_funnel?(<<_, next::binary>>, funnel, head) when head <> next == funnel, do: true
  def is_funnel?(<<skip::binary-size(1), next::binary>>, funnel, head), do: is_funnel?(next, funnel, head <> skip)

  def get_funnel_words(trie, word) do
    get_potential_funnels(word)
    |> Enum.uniq()
    |> Enum.filter(&Retrieval.contains?(trie, &1))
  end

  defp get_potential_funnels(word, head \\ "", funnels \\ [])
  defp get_potential_funnels(<<>>, _, funnels), do: funnels
  defp get_potential_funnels(<<skip::binary-size(1), next::binary>>, head, funnels) do
    get_potential_funnels(next, head <> skip, [head <> next | funnels])
  end

  def bonus2(trie, words) do
    Enum.filter(words, fn word -> Enum.count(get_funnel_words(trie, word)) > 4 end)
  end
end
