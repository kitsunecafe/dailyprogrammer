defmodule HTTP.Request do
  def new(request) do
    request
    |> String.split(~r/\r?\n/, trim: true)
    |> extract()
    |> process()
  end

  # Process fields in header-specific way
  def process(headers), do: headers

  defp extract([request_line | headers]) do
    [method, path, version] = String.split(request_line, ~r/\s+/)
    extract_headers(headers, %{method: atomize(method), path: path, version: version})
  end

  defp extract_headers([], headers), do: headers
  defp extract_headers([header | rest], headers) do
    case String.split(header, ~r/:\s+?/, parts: 2) do
      [key, value] -> extract_headers(rest, Map.put(headers, atomize(key), value))
      body -> extract_headers(rest, Map.put(headers, :body, body))
    end
  end

  defp atomize(string) do
    string
    |> String.downcase()
    |> String.replace("-", "_")
    |> String.to_atom()
  end
end
