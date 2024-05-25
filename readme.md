# What is this?

I'm calling this project MUDcraft.

MUDs or Multi User Dungeons are text based real-time multiplayer games. Instead, I built a version of one that uses Minecraft as the engine and you play through a bot on the terminal. 

Basically this is a text base interface for playing minecraft.

When this is in an more mvp state, I'll release a guide for playing.

# Setup Guide

This project runs on a node server and requires downloading the node package manager (or npm) 
Set up guide -> (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

After installing npm and cloning this repository, navigate in a terminal to the project's root directory.

Run `npm install`

Go to [src/creds.json](./src/creds.json) and change the login creds to your minecraft credentials. 

Go to [src/creds.json](./src/settings.json) and change the settings how every you like.

Run `npm run mudcraft` to start up the mudcraft client

# TODO list

- Display entities
- Inventory Management
- Textures
- Mining
- Crafting
- Combat
