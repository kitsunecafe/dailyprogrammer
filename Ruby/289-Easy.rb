require 'net/http'
require 'json'

class HTTPResponse
  def self.get url
    uri  = URI::escape url
    uri  = URI.parse uri
    response = Net::HTTP.get uri
    JSON.parse response
  end
end

class API
    API_TYPES = ["type", "move", "pokemon"]

    def initialize
        @cache = Hash.new
    end

    def get name
        return @cache[name] if @cache.key? name

        API_TYPES.each do |type|
            response = HTTPResponse.get "http://pokeapi.co/api/v2/#{type}/#{name}/"
            if response["detail"].nil?
                class_name =Object.const_get type.capitalize
                api_object = class_name.new response, self
                return @cache[name] = api_object
            end
        end
    end
end

class APIObject
   def initialize json
       @json = json
       @name = @json["name"]
   end

   def attack
       raise NotImplementedError, "#{@name} cannot be attacked."
   end

   def against *types
      raise NotImplementedError, "#{@name} is not an attack object."
   end
end

class Type < APIObject
    attr_reader :name
    DAMAGE_MULTIPLIERS = { "no_damage_to": 0, "half_damage_to": 0.5, "double_damage_to": 2 }

    def initialize json, api
        super json

        @damage_to  = Hash.new
        DAMAGE_MULTIPLIERS.each do |k, v|
            json = @json["damage_relations"][k.to_s]
            next if json.empty?
            json.each { |row| @damage_to[row["name"]] = k }
        end
    end

    def against *types
        types = types.map { |type| type.attack }.flatten

        multipliers = types.map { |type| DAMAGE_MULTIPLIERS[@damage_to[type.name]] || 1 }.reduce :*
        "%g" % multipliers
    end

    def attack
        self
    end
end

class Pokemon < APIObject
    def initialize json, api
        super json
        @types = @json["types"].map { |i| api.get i["type"]["name"] }
    end

    def attack
        @types
    end
end

class Move < APIObject
    def initialize json, api
       super json
       @type = api.get @json["type"]["name"]
    end

    def against *types
       @type.against *types
    end
end

def main command
    api = API.new
    attacker, attacked = command.split /\s*->\s*/
    attacker = attacker.split.join '-'
    attacker = api.get attacker
    attacked = attacked.split.map { |type| api.get type }
    p "#{attacker.against *attacked}x"
end

