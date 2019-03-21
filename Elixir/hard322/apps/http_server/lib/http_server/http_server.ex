defmodule HTTP.Server do
  require Logger
  use GenServer

  def start_link(port \\ 80, ip \\ {127,0,0,1}, opts \\ [])
  def start_link(port, ip, opts) do
    GenServer.start_link(__MODULE__, %{ip: ip, port: port, socket: nil}, opts)
  end

  def init(%{ip: ip, port: port} = state) do
    opts = [:binary, packet: :raw, active: true, reuseaddr: true, ip: ip]
    {:ok, socket} = :gen_tcp.listen(port, opts)
    send self(), :accept

    Logger.info "Accepting connections on #{:inet.ntoa(ip)}:#{port}"
    {:ok, %{state | socket: socket}}
  end

  def handle_info(:accept, %{socket: socket} = state) do
    {:ok, client} = :gen_tcp.accept(socket)
    {:ok, pid} = HTTP.Server.ConnectionSupervisor.start_child(client)
    :gen_tcp.controlling_process(client, pid)
    send self(), :accept

    {:noreply, state}
  end
end
