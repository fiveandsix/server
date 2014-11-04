include_recipe "database::mysql"

template '/etc/mysql/conf.d/fiveandsix.cnf' do
  owner 'mysql'
  owner 'mysql'
  source 'mysql-fiveandsix.cnf.erb'
  notifies :restart, 'mysql_service[default]'
end

mysql_connection_info = {
  :host     => 'localhost',
  :username => 'root',
  :password => node['mysql']['server_root_password']
}

mysql_database node['app_mysql_database'] do
  connection mysql_connection_info
  action :create
end

mysql_database_user node['app_mysql_user'] do
  connection mysql_connection_info
  password node['app_mysql_password']
  action :create
end

mysql_database_user node['app_mysql_user'] do
  connection mysql_connection_info
  database_name node['app_mysql_database']
  password node['app_mysql_password']
  action :grant
end
