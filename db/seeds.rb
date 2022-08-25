if Rails.env.development?
  ## Admin User
  User.find_or_create_by!(email: 'admin@example.com') do |user|
    user.password = 'password'
    user.password_confirmation = 'password'
  end
end

### GROUPS
groups = [
  "leonas",
  "panteras",
  "leones",
  "aguilas",
  "gatitas",
  "conejitas",
  "gaviotas",
  "espartanos de jesus",
  "escorpiones",
  "linces",
  "lobos"
]

groups.each do |name|
  Group.find_or_create_by!(name: name)
end

flags = [
  { name: "Permitir crear fuera de las fechas", var_name: 'permits_create_out_date', is_active: false}
]

flags.each do |flag|
  FeatureFlag.find_or_create_by!(var_name: flag[:var_name]) do |ff|
    ff.name = flag[:name]
    ff.is_active = flag[:is_active]
  end
end