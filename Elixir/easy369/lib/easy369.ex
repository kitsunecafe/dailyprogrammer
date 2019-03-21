defmodule Easy369 do
  def hexcolor(r, g, b), do: hexcolor([r, g, b])

  def hexcolor(colors) do
    hex = colors
    |> Enum.map(&Integer.to_string(&1, 16))
    |> Enum.map(&String.pad_leading(&1, 2, "0"))
    |> Enum.join("")

    "##{hex}"
  end

  def blend(colors, gamma \\ 1)
  def blend(colors, gamma) do
    count = Enum.count(colors)

    colors
    |> Enum.map(&to_rgb(&1))
    |> Enum.reduce(fn [r1, g1, b1], [r2, g2, b2] -> [r1 + r2, g1 + g2, b1 + b2] end)
    |> Enum.map(fn x -> round(x / count) end)
    |> gamma_correction(gamma)
    |> hexcolor()
  end

  def gamma_correction(color, gamma \\ 1.00)
  def gamma_correction(color, gamma) do
    Enum.map(color, fn x ->
      255 * (x / 255)
      |> :math.pow(1 / gamma)
      |> round
    end)
  end

  def to_rgb("#" <> hex) do
    <<
      r :: integer,
      g :: integer,
      b :: integer
    >> = Base.decode16!(hex)

    [r, g, b]
  end
end
