
import React from 'react';
import KeyEventParser from '../services/KeyEventParser';
import Header from './Header';
import Footer from './Footer';
import Store from '../stores/AppStore';
import ActionCreators from '../actions/AppActionCreators';
import browser from 'detect-browser';

const App = React.createClass({
  displayName: "App",
  getInitialState() {
    return {
      user: Store.getUser(),
      title: Store.getTitle()
    };
  },
  componentDidMount() {
    Store.addChangeListener(this._onChange);
    ActionCreators.requestData();
    console.log(browser.name);
    console.log(browser.version);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },
  _onChange() {
    if (this.isMounted()) {
      this.setState({
        user: Store.getUser(),
        title: Store.getTitle()
      });
    }
  },
  render() {
    var {user, project, title} = this.state;
    return (
      <div>
        <Header user={user} project={project} location={this.props.location} title={title}/>
          <main className="content">
            {this.props.children}
          </main>
      </div>  
    );
  }
});

export default App;