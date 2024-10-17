# Add StashID to Whisparr Chrome Extension

## Overview

The **Add StashID to Whisparr** Chrome extension allows users to quickly add scenes from [StashDB](https://stashdb.org) to their local **Whisparr** instance. This extension adds a button to the scene page on StashDB, enabling a streamlined process for sending scene data to your Whisparr instance with a single click.

The extension includes a customizable **Options page** where users can input and store the necessary API details and configurations specific to their Whisparr instance.

## Features

- **One-click scene addition**: Easily add scenes from StashDB to your Whisparr collection.
- **Configurable options page**: Enter your API details and configuration settings directly in the extension options page.
- **Toast notifications**: Displays toast messages for both successes and errors directly on the page.
- **Handles CORS restrictions**: Handles Cross-Origin Resource Sharing (CORS) by working with your local Whisparr instance and Chrome’s security policies.

## Installation

1. Clone or download the repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top-right corner.
4. Click the "Load unpacked" button and select the extension folder.
5. The extension should now be loaded and active.

## Configuration

After installing the extension, configure the following parameters by navigating to the **Options** page of the extension:

- **Scheme**: `http` or `https` depending on how your Whisparr instance is served.
- **Whisparr Domain**: The URL/IP of your Whisparr instance.
- **API Key**: The API key generated from your Whisparr instance.
- **Quality Profile ID**: The quality profile ID for the scene.
- **Root Folder Path**: The root folder for storing your media on the Whisparr instance.

## Usage

1. Once the extension is installed and configured, navigate to a scene page on [StashDB](https://stashdb.org).
2. You will see a button labeled **Add scene to Whisparr**. Click the button, and the scene will be sent to your Whisparr instance.
3. You will receive a toast notification for the success or failure of the operation.

## Handling CORS Errors

### Known Issue: Private Network Access Restrictions in Chrome

Starting with Chrome 130 (October 2024), Google Chrome has introduced new security measures known as **Private Network Access (PNA)**. This can result in an error when the extension tries to communicate with your Whisparr instance on a private network.

The error may look like this:

```
A site requested a resource from a network that it could only access because of its users' privileged network position. These requests expose devices and servers to the internet, increasing the risk of a cross-site request forgery (CSRF) attack, and/or information leakage.

To mitigate these risks, Chrome will require non-public subresources to opt-into being accessed with a preflight request and will start blocking them in Chrome 130 (October 2024).

To fix this issue, ensure that the response to the preflight request for the private network resource has the Access-Control-Allow-Private-Network header set to true.
```

### Workaround

To fix this, you need to configure your Whisparr server (or reverse proxy) to respond to **preflight requests** with the header:

```http
Access-Control-Allow-Private-Network: true
```

Alternatively, during development or testing, you can disable the `Block insecure private network requests` Chrome flag:

1. Navigate to `chrome://flags/#block-insecure-private-network-requests`.
2. Disable the flag, but note that this is not recommended for production use due to security concerns.

If you're using a reverse proxy like **Nginx** or **Apache**, you can configure CORS headers as needed to allow private network requests.
