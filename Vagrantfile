# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.omnibus.chef_version = :latest
  config.berkshelf.enabled = true
  config.vm.box = "chef/debian-7.4-i386"

  config.vm.network :forwarded_port, guest: 8080, host: 8080
  config.vm.network :forwarded_port, guest: 8888, host: 8888
  config.vm.network :forwarded_port, guest: 3306, host: 3306 # mysql
  config.vm.network :private_network, ip: "192.168.33.30"

  config.vm.provider "virtualbox" do |vb|
    vb.customize [ "modifyvm", :id, "--memory", "1536", "--cpus", "2" ]
  end

  config.vm.provider :digital_ocean do |provider, override|
    override.ssh.private_key_path = '~/.ssh/id_rsa_vagrant'
    override.vm.box = 'digital_ocean'
    override.vm.box_url = "https://github.com/smdahlen/vagrant-digitalocean/raw/master/box/digital_ocean.box"
    provider.token = ENV['DIGITAL_OCEAN_TOKEN']
    provider.image = 'Debian 7.0 x32'
    provider.region = 'ams2'
    provider.size = '512mb'
  end

  config.vm.provision :chef_solo do |chef|
    chef.log_level = :debug
    chef.roles_path = 'roles'
    chef.environment = 'prod'
    chef.environments_path = 'environments'
    chef.add_role("base")
    chef.add_role("database_server")
    chef.add_role("application_server")
    chef.json = {
        :mysql =>  {
          :server_root_password => "root",
          :allow_remote_root => false,
          :bind_address => '127.0.0.1'
        },
        :apt => {
          :compiletime => true
        },
	:nginx => {
	  :version => "1.7.4"
	},
        :app_mysql_user => "fiveandsix",
        :app_mysql_password => "fiveandsix",
        :app_mysql_database => "fiveandsix"
    }
  end
end
