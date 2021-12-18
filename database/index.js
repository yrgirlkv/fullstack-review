const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

let repoSchema = mongoose.Schema({
  id: {type: 'Number', unique: true},
  name: 'String',
  owner: 'String',
  full_name: 'String',
  watchers_count: 'Number'
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoInfo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  const repo = new Repo(repoInfo);
  repo.save();
  console.log('successfully saved the following to db: ')
  console.log(repo);
}

module.exports.save = save;