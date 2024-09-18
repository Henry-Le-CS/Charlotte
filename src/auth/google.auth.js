'use strict'
import { OAuth2Client } from 'google-auth-library';
import http from 'http';
import { url } from 'inspector';
import open from 'open';
import destroyer from 'server-destroy';
export default function getAuthenticatedClient() {
    return new Promise((resolve, reject) => {
      // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
      // which should be downloaded from the Google Developers Console.
      const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        );
  
      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
      });
  
      // Open an http server to accept the oauth callback. In this simple example, the
      // only request to our webserver is to /oauth2callback?code=<code>
      const server = http
        .createServer(async (req, res) => {
          try {
            if (req.url.indexOf('/oauth2callback') > -1) {
              // acquire the code from the querystring, and close the web server.
              const qs = new url.URL(req.url, 'http://localhost:2155')
                .searchParams;
              const code = qs.get('code');
              console.log(`Code is ${code}`);
              res.end('Authentication successful! Please return to the console.');
              server.destroy();
  
              // Now that we have the code, use that to acquire tokens.
              const r = await oAuth2Client.getToken(code);
              // Make sure to set the credentials on the OAuth2 client.
              oAuth2Client.setCredentials(r.tokens);
              console.info('Tokens acquired.');
              resolve(oAuth2Client);
            }
          } catch (e) {
            reject(e);
          }
        })
        .listen(2155, () => {
            open(authorizeUrl, {wait: false}).then(cp => cp.unref());
        });
      destroyer(server);
    });
  }
  