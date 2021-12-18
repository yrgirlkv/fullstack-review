const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  console.log(`requesting ${options.url} from github api...`)

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  return axios.get(options.url, options)
  .catch(err => console.error(err))
}

module.exports.getReposByUsername = getReposByUsername;