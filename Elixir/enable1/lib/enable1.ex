defmodule Enable1 do
  @external_resource "priv/enable1.txt"
  @enable1_contents File.read! "priv/enable1.txt"
  def load, do: String.split(@enable1_contents, "\n")
end
