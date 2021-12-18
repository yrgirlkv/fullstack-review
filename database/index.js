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
  const repo = new Repo(repoInfo);
  repo.save()
  .then(res => console.log(`successfully saved ${res.id} to database`))
  .catch(err => {
    err.code === 11000 ?
    console.log(`duplicate repo @ id ${err.keyValue.id} skipped`)
    : console.error(err)
  });
}

module.exports.save = save;