# Collapsible Reece Chat (SPFx Web Part)

## Summary
- Embeds the Innovation Team's chat bot into SharePoint via this web part.
- This is a work in progress.

## Version history
| Version | Date          | Comments    |
| ------- | ------------- | ----------- |
| 1.0     | July 12, 2024 | Initial POC |
| 1.0.2.0 | July 16, 2024 | Many changes, cleaned up CSS, added SVGs, fixed animation bug. |
| 1.0.3.0 | August 29, 2024 | Fixed styling bugs, now works properly for mobile. |

## Frameworks
- [SharePoint (SPFx) Framework](https://aka.ms/spfx) (version 1.19.0)
- [React](https://reactjs.org/)

## Prerequisites
The SPFx framework requires specific versions of NodeJS. Version 18.17.1 was used to build this web part. Highly recommend utilizing NVM to manage the current version of NodeJS.

### Set Up Development Environment
1. Run the following commands
```
npm install -g yo gulp
npm install yo gulp
npm install -g @microsoft/generator-sharepoint
```
2. Create your directory for the web part, navigate to it
```
mkdir webpartDir
cd webpartDir
```
3. Generate a new SPFx web part
```
yo @microsoft/sharepoint
```
4. Trust the developer certificate
```
gulp trust-dev-cert
```
5. Update the property `initialPage` within the file `/config/serve.json`
6. Serve the new web part by running `gulp serve`
7. Begin modifying the web part, navigate to `/src/webparts/webpart/webpart.ts`

## Getting Started
- Clone this repository
- Ensure that you are at the solution folder
- In the terminal run:
  - **npm install**
  - **gulp serve**
- Acquire the `src` URL for the iFrame, then update it in `CollapsibleChatEmbedded.tsx`

### Testing Locally
1. By default, `gulp serve` will automatically open the URL defined by the `initialPage` property in `/config/serve.json`. For most purposes, this will work fine.
2. To test a web part for mobile use, run `gulp serve --nobrowser`. Navigate to any SharePoint site within the site hierarchy, then append the following to the URL `?debug=true&noredir=true&debugManifestsFile=https://localhost:4321/temp/manifests.js`
3. The web parts listed will not appear as 'local' by category, but should be listed nonetheless. Add the web part.
4. Open your browser's Dev Tools (F12), then enable **Responsive Design Mode**, or press `Ctrl + Shift + M`

### Bundle & Ship (admin only)
1. Open terminal
2. Run `gulp bundle --ship` to prepare the minimized version for production
3. Then run `gulp package-solution --ship` to create a package (.sppkg file) in the `sharepoint/solution` directory, which contains all components and assets that SharePoint needs.
4. Navigate to SharePoint Admin Center -> More Features -> Apps -> Open
5. Upload the `.sppkg` file to this library, then SharePoint will prompt to trust the app, asking for permissions based on the manifest
6. If it is a new web part, it must be deployed to insert it onto a page. Otherwise, uploading it should suffice.

### Deploy/Install (new)
1. Navigate to the site collection
2. Click `Settings Icon -> Add an App`
3. Find the app, install; it can now be used

### Updating an Existing Web Part
1. **Make Changes to Your Web Part**:
2. **Re-bundle and Re-package**:
    - Run `gulp bundle --ship` and `gulp package-solution --ship` again to update the production build with your changes.
3. **Update the Package in App Catalog**:
    - Go back to the "App Catalog"
    - Upload the updated `.sppkg` file. SharePoint will recognize that it’s an update to an existing package
    - May be prompted to trust the app again if permissions have changed
4. **Tenant-Wide Deployment Check**:
    - Once the updated package is uploaded, SharePoint automatically updates the web part across all sites where it’s used.