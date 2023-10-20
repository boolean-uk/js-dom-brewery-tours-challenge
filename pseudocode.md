# DRAFT

(cause it's beer related)

## global.js

1. const state = []
2. all const variables pointing to various relevant html elements

## render.js

1. all functions that generate html elements dynamically
2. which also implies functions that remove current content so it can be re-rendered after state had undergone changes

## events.js

1. all const functions that handle events by interacting with the server

## index.js

1. all functions that are called when the page is first loaded (which might only be one or two). Runs last.
