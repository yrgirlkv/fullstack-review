const express = require('express');
const bodyParser = require('body-parser')
const { getReposByUsername } = require('../helpers/github.js')
const db = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  console.log(`received ${req.body} from POST`);
  res.send('POST request received');
  getReposByUsername(req.body)
  .then(res => res.data.map(
    repo => ({
      id: repo.id,
      name: repo.name,
      owner: repo.owner.login,
      full_name: repo.full_name,
      watchers_count: repo.watchers_count
    })
  ))
  .then(res => res.forEach(repo => db.save(repo)));

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.produce()
  .then(repos => {
    console.log('got repos');
    return repos;
  })
  .then(repos =>
    repos.sort((first, second) => first.watchers_count < second.watchers_count ? 1 : -1)
  )
  .then(repos => repos.slice(0, 25))
  .then(repos => res.json(repos));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

