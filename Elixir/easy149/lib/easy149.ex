defmodule Easy149 do
  @vowels ~w(a e i o u)

  def disemvowel(input, result \\ {<<>>, <<>>})
  def disemvowel(<<>>, {consonants, vowels}), do: IO.puts "#{consonants}\n#{vowels}"
  def disemvowel(<<ch :: bytes-size(1), rest :: binary>>, {consonants, vowels}) do
    result = cond do
      Enum.member?(@vowels, ch) -> {consonants, vowels <> ch}
      ch == " " -> {consonants, vowels}
      true -> {consonants <> ch, vowels}
    end

    disemvowel(rest, result)
  end
end

