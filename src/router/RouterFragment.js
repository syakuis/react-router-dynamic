/**
 * 기본 페이지를 설정하고 메뉴에 따른 Route 를 생성한다.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Controller from './Controller';

const propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.string,
};

const defaultProps = {
  index: '/',
};

class RouterFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, index } = this.props;
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/:moduleName" render={attr => <Controller {...attr} />} />
            <Route
              exact
              path="/"
              render={attr => (
                <Redirect
                  to={{
                    pathname: index,
                    state: { from: attr.location },
                  }}
                />
              )}
            />
          </Switch>
          {children}
        </React.Fragment>
      </Router>
    );
  }
}

RouterFragment.propTypes = propTypes;
RouterFragment.defaultProps = defaultProps;

export default RouterFragment;
