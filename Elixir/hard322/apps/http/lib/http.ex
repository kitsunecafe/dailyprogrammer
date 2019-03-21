defmodule HTTP do
  def handle_request(request) do
    request
    |> HTTP.Request.new()
    |> resolve_endpoint_path()
    |> generate_response()
  end

  def resolve_endpoint_path(%{path: "/"} = request) do
    resolve_endpoint_path(%{request | path: "/index.html"})
  end

  def resolve_endpoint_path(%{path: path} = request) do
    static_path = Application.get_env(:http, :static_path)
    %{request | path: "#{static_path}#{path}"}
  end

  defp generate_response(%{method: :get, path: path}) do
    case File.read(path) do
      {:ok, file} -> HTTP.Response.new(:ok, file, generate_headers(path))
      {:error, :enoent} -> HTTP.Response.new(:not_found)
    end
  end

  defp generate_response(%{method: :head, path: path}) do
    case generate_headers(path) do
      {:error, :enoent} -> HTTP.Response.new(:not_found)
      headers -> HTTP.Response.new(:ok, "", headers)
    end
  end

  defp generate_response(%{method: :post, path: path, body: body}) do
    case File.write(path, body) do
      :ok ->
        headers = %{ location: "/#{Path.basename(path)}" }
        HTTP.Response.new(:created, "", headers)
      {:error, _} -> HTTP.Response.new(:internal_server_error)
    end
  end

  defp generate_response(_) do
    HTTP.Response.new("", :method_not_supported)
  end

  defp generate_headers(path) do
    with {:ok, stat} <- File.stat(path),
         do: %{
           content_type: MIME.get(path),
           content_length: stat.size + 2
         }
  end
end
