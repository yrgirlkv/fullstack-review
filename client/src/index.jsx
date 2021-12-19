import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `http://localhost:1128/repos`,
      repos: []
    }

    this.fetch = this.fetch.bind(this);
  }

  componentDidMount () {
    this.fetch();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax(this.state.url, {
      contentType: 'text/plain',
      data: term,
      method: 'POST'
    })
  }

  fetch () {
    console.log('fetching repos...');
    $.ajax(this.state.url, {
      contentType: 'application/json',
      method: 'GET',
      success: (data) => {
        this.setState({repos: data})
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} fetch={this.state.fetch}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));