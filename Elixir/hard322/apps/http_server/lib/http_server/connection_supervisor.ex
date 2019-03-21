defmodule HTTP.Server.ConnectionSupervisor do
  use DynamicSupervisor

  def start_link() do
    DynamicSupervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  def start_child(state) do
    spec = {HTTP.Server.Connection, state}

    DynamicSupervisor.start_child(__MODULE__, spec)
  end

  def init(_args) do
    DynamicSupervisor.init(strategy: :one_for_one, extra_arguments: [], restart: :temporary)
  end
end
