defmodule Intermediate238 do
  def main(_args) do
    receive_difficulty()
    |> min(5)
    |> generate_words()
    |> print_words()
    |> receive_guesses(4)
  end

  def receive_difficulty() do
    {n, _} = IO.gets("DIFFICULTY (1-5)\n> ")
    |> Integer.parse(10)

    n
  end

  def random(min, max) do
    Range.new(min, max)
    |> Enum.random()
  end

  def generate_words(difficulty) do
    length = random(difficulty + 3, difficulty + 10)
    word_count = random(difficulty + 5, difficulty + 10)

    words = Enable1.load()
    |> Enum.filter(fn x -> String.length(x) == length end)
    |> Enum.shuffle()
    |> Enum.take(word_count)
    |> Enum.map(&String.upcase(&1))

    {Enum.random(words), words}
  end

  def print_words({selected, words}) do
    words
    |> Enum.join("\n")
    |> IO.puts

    {selected, words}
  end

  def receive_guesses(words, max_guesses), do: receive_guesses(words, max_guesses, max_guesses)
  def receive_guesses(_, _, 0), do: IO.puts "LOCKED"
  def receive_guesses({selected, words}, max_guesses, guesses_left) do
    guess = IO.gets("#{guesses_left}> ")
    |> String.trim()
    |> String.upcase()

    case guess == selected do
      true -> IO.puts "SUCCESS"
      false ->
        overlap = letter_overlap(guess, selected)
        total = String.length(selected)
        IO.puts "#{overlap}/#{total} CORRECT"
        receive_guesses({selected, words}, max_guesses, guesses_left - 1)
    end
  end

  def letter_overlap(a, b, acc \\ 0)
  def letter_overlap(_, <<>>, acc), do: acc
  def letter_overlap(<<>>, _, acc), do: acc
  def letter_overlap(<<a::bytes-1, rest_a::binary>>, <<b::bytes-1, rest_b::binary>>, acc) when a == b, do: letter_overlap(rest_a, rest_b, acc + 1)
  def letter_overlap(<<_::bytes-1, rest_a::binary>>, <<_::bytes-1, rest_b::binary>>, acc), do: letter_overlap(rest_a, rest_b, acc)
end
