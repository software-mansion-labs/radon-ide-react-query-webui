# React Query DevTools for Radon IDE 
Radon IDE needs to have built project, which artifacts are loaded into webview in IDE. This repo is used as building pipeline for React Query DevTools for Radon IDE. 
We:
- take original react-query devtools: https://github.com/TanStack/query/tree/main/packages/query-devtools. 
- sync state analogicaly as https://github.com/TanStack/query/blob/main/packages/query-broadcast-client-experimental/src/index.ts
- to communicate with Radon IDE vscode extension we use: https://code.visualstudio.com/api/extension-guides/webview#passing-messages-from-a-webview-to-an-extension

The artifacts are comitted in the repo, Radon IDE is copying them while building.

## If you developing 

```
yarn install
yarn build 
# restart Radon IDE extension to see the changes
```

The build & restart needs to be done after every change - auto refresh/hot reaload does not work. 


