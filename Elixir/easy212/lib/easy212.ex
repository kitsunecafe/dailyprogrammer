defmodule Easy212 do
  def encode(str) do
    Regex.replace(~r/([b-df-hj-np-tv-z])/i, str, fn _, x -> "#{x}o#{String.downcase(x)}" end, global: true)
  end
end
