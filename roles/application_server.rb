name 'application_server'
description 'Application Server'

run_list(
  'recipe[mysql::client]',
  'recipe[nginx::source]',
  'recipe[python]',
  'recipe[fiveandsix::dependencies]',
  'recipe[fiveandsix::nginx]',
  'recipe[fiveandsix::database]'
)

override_attributes(
  :nginx => {
    :default_site_enabled => false,
    :sendfile => 'off'
  }
)
