defmodule MIME do
  @mime_types %{
    ".html" => "text/html",
    ".htm" => "text/html",
    ".css" => "text/css",
    ".gif" => "image/gif",
    ".png" => "image/png",
    ".jpeg" => "image/jpeg",
    ".jpg" => "image/jpeg",
    ".svg" => "image/svg+xml",
    ".xml" => "application/xml",
    ".json" => "application/json",
    ".js" => "application/javascript",
    ".txt" => "text/plain"
  }

  def get(file) do
    Map.get(@mime_types, Path.extname(file), "text/plain")
  end
end
