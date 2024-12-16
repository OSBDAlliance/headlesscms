<p align="center">

<img src="./docs/static/OSBD_logo.svg" width="250">

<br><br>

<strong>Open source headless CMS by OSBD Alliance</strong>
<br><br>
OSBD is a community-driven initiative. We welcome everyone to contribute whether it’s fixing bugs, enhancing documentation, or helping spread the word. Your involvement matters!

</p>

<p align="center">

<a href="https://osbdalliance.org/">Website</a> |  <a href="https://github.com/OSBDAlliance/headlesscms">Documentation</a>

</p>

  
  

## Quick guide
`npm install`
`npm run start`

## nodemon installation for windows

Install Globally:

`npm install -g ts-node`
This makes ts-node available as a global command.

Install Locally in the Project:

`npm install ts-node --save-dev`

Update your scripts in package.json:
"start": "nodemon --ext 'ts,js,mjs,json' --exec npx ts-node server.ts"


If installed, find the global npm path:
`npm config get prefix`

Ensure this path is in your system's Environment Variables:

Search for Environment Variables in the Start menu.
Edit the Path variable under "System Variables."
Add the global npm path (e.g., C:\Users\<YourUsername>\AppData\Roaming\npm).

Then restart using: `npm run start`

TODO::

  
**Prerequisites**
- Node.js ^20.14
- TypeScript

TODO::

## Documentation

### API

Find comprehensive API interaction documentation [here](./docs/api).

### Architecture

Explore the project's architecture, key components, and data flow [here](./docs/architecture).

### Contributing

Learn how to contribute, including setup and code standards, [here](./docs/contributing).

### Development

Set up a local development environment with the steps provided [here](./docs/development).
- [Bangladesh Headless CMS Market Analysis 2024](./docs/development/bangladesh-cms-analysis.md).
- [Headless CMS Market Analysis 2024](./docs/development/cms-market-analysis.md).
- [Headless CMS Technical Comparison Matrix](./docs/development/cms-technical-comparison.md).
- [Global Compliance](./docs/development/global-compliance).
- [Global Compliance Code](./docs/development/global-compliance-code).

### Static

Details about static assets and resources are available [here](./docs/static).


## Contributing
TODO::

