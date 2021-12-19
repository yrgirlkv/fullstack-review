import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List </h4>
    There are {props.repos.length} repos, sorted by watch count in descending order.
    {props.repos.map(repo => (
      <div key={repo.id}><a href ={`https://github.com/${repo.full_name}`}>{repo.name}</a>, by <a href = {`https://github.com/${repo.owner}`}>{repo.owner}</a></div>
    ))}
  </div>
)

export default RepoList;