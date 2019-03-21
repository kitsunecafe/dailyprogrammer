defmodule HTTP.Response do
  @http_version "1.0"

  def new(status \\ "200 OK", payload \\ "", headers \\ %{})
  def new(:ok, payload, headers), do: new("200 OK", payload, headers)
  def new(:created, payload, headers), do: new("201 Created", payload, headers)
  def new(:not_found, payload, headers), do: new("404 Not Found", payload, headers)
  
  def new(:internal_server_error, payload, headers) do
    new("500 Internal Server Error", payload, headers)
  end

  def new(:method_not_supported, payload, headers) do
    new("505 Method Not Supported", payload, headers)
  end

  def new(status, payload, headers) do
    "HTTP/#{@http_version} #{status}\r\n"
    |> append_headers(headers)
    |> append_payload(payload)
  end

  defp append_headers(response, headers) when headers == %{}, do: "#{response}\r\n"

  defp append_headers(response, headers) do
    header_string = stringify_headers(headers)
    "#{response}#{header_string}\r\n"
  end

  defp append_payload(response, <<>>), do: response
  defp append_payload(response, payload), do: "#{response}#{payload}\r\n"

  def stringify_atom(atom) do
    atom
    |> Atom.to_string()
    |> String.replace("_", "-")
    |> String.capitalize()
  end

  def stringify_headers(headers) do
    headers
    |> Map.to_list()
    |> Enum.reduce("", fn {k, v}, acc -> "#{acc}#{stringify_atom(k)}: #{v}\r\n" end)
  end
end
