name 'database_server'
description 'Database Server'

run_list(
  'recipe[mysql::server]'
)
