json.array!(@offices) do |office|
  json.extract! office, :name, :sales, :region_id
  json.url office_url(office, format: :json)
end
