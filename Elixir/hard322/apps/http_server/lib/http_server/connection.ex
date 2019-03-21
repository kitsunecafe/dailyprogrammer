defmodule HTTP.Server.Connection do
  use GenServer
  require Logger

  def start_link(client, opts \\ [])
  def start_link(client, opts) do
    GenServer.start_link(__MODULE__, client, opts)
  end

  def init(client) do
    state = %{client: client}

    {:ok, state}
  end

  def handle_info({:tcp, socket, data}, state) do
    response = HTTP.handle_request(data)
    :gen_tcp.send(socket, response)
    :gen_tcp.close(socket)

    {:noreply, state}
  end

  def handle_info({:tcp_closed, _socket}, state) do
    {:stop, :normal, state}
  end

  def handle_info({:tcp_error, _socket, reason}, state) do
    {:stop, :error, reason, state}
  end
end