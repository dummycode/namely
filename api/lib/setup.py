#!/usr/bin/env python3

import subprocess

def run_command(command):
    return subprocess.run(command, shell=True)

def create_config_if_not_found():
    example = "config.json.example"
    config = "config.json"

    cmd = "test -e '{}'".format(config)
    status = subprocess.run(cmd, shell=True)
    found = not status.returncode

    if not found:
        print("Copying {} to {}".format(example, config))
        cmd = "cp '{}' '{}'".format(example, config)
        subprocess.run(cmd, shell=True)

def npm_install():
    run_command("npm install")

def init_database_config():
    print("Initializing database...")
    run_command("npx sequelize init")

def copy_database_config_if_not_found():
    example = "db/config/config.json.example"
    config = "db/config/config.json"

    cmd = "test -e '{}'".format(config)
    status = subprocess.run(cmd, shell=True)
    found = not status.returncode

    if not found:
        print("Copying {} to {}".format(example, config))
        cmd = "cp '{}' '{}'".format(example, config)
        subprocess.run(cmd, shell=True)

def main():
    print("Initializing project...")
    npm_install()
    create_config_if_not_found()
    init_database_config()
    copy_database_config_if_not_found()
    print("Please run the following postgres commands...")
    print("CREATE DATABASE \"namely\";")
    print("CREATE ROLE \"namely\";")
    print("ALTER ROLE \"namely\" WITH LOGIN;")
    print("ALTER USER \"namely\" WITH SUPERUSER;")

if __name__ == "__main__":
    main()
