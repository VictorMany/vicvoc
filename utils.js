import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import React from 'react'


export default function preview(url) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/text');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    getLinkPreview("https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe", {
        imagesPropertyType: "og", // fetches only open-graph images
        headers: headers
    }).then(data => console.debug(data));
}

