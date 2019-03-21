defmodule HTTP.Server.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec
    # List all child processes to be supervised
    children = [
      # Starts a worker by calling: HTTPServer.Worker.start_link(arg)
      # {HTTPServer.Worker, arg}
      # {Task.Supervisor, name: HTTP.Server.TaskSupervisor},
      # {Task, fn -> HTTP.Server.start_link(8080) end}
      worker(HTTP.Server, [8080]),
      supervisor(HTTP.Server.ConnectionSupervisor, [])
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: HTTP.Server.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
