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