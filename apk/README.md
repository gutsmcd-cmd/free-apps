# apk/

Android APKs for the family apps, served by GitHub Pages at
`https://gutsmcd-cmd.github.io/free-apps/apk/<repo>.apk`.

Built on Mat's build box by `/workspace/family-apk/build-all.sh` (Trusted Web
Activity wrappers that open the live web app) and uploaded through the GitHub
website (Add file → Upload files), because binaries can't go through the API
connector. `install.js` only shows an app's “Install app” button once its APK
here answers a HEAD request, so an app without an APK keeps the old card.

`black-screen.apk` is the native Black Screen app (github.com/gutsmcd-cmd/black-screen).
