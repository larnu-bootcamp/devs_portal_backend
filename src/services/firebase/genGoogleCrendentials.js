/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises');
const { existsSync } = require('fs');
const dotEnv = require('dotenv');


dotEnv.config();
const myConfig = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url
};
const fileName = `${__dirname}/${process.env.jsonkeyFileName}`;

if (!existsSync(fileName)) {
  /**
   * 
   * @description creates a google application credentials key in json format
   * given some env_variables intended to be used in a CI/CD pipeline.
   */
  fs.writeFile(fileName, JSON.stringify(myConfig), { encoding: 'utf-8' })
    .then(() => {
      console.log('google credentials created');
    })
    .catch(err => {
      console.log(err);
    });
}
