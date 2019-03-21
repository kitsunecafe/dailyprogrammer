defmodule MIMETest do
  use ExUnit.Case
  doctest MIME

  test "greets the world" do
    assert MIME.hello() == :world
  end
end
