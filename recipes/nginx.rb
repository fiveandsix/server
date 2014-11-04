# run the nginx::default recipe to install nginx
include_recipe "nginx::source"

cookbook_file "#{node['nginx']['dir']}/sites-available/fiveandsix" do
  source "fiveandsix.nginx"
  owner "root"
  group "root"
  mode  "0644"
end

cookbook_file "/etc/ssl/certs/fiveandsix.crt" do
  source "fiveandsix.crt"
  owner "root"
  group "root"
  mode  "0644"
end

cookbook_file "/etc/ssl/private/fiveandsix.key" do
  source "fiveandsix.key"
  owner "root"
  group "root"
  mode  "0600"
end

nginx_site "fiveandsix" do
  enable true
end

if node.chef_environment == "dev"
  cookbook_file "#{node['nginx']['dir']}/sites-available/fiveandsix-dev" do
    source "fiveandsix-dev.nginx"
    owner "root"
    group "root"
    mode  "0644"
  end
  nginx_site "fiveandsix-dev" do
    enable true
  end
end
