import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import data from '../data';

const withRouterResolver = Component => {
  const propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        moduleName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  class Container extends React.Component {
    constructor(props) {
      super(props);

      this.state = { componentName: null };
    }

    componentWillMount() {
      this.requestDispatcher(this.props);
    }

    componentWillReceiveProps(nextProps) {
      const { match } = this.props;
      const { moduleName: moduleNameOriginal } = match.params;
      const { moduleName } = nextProps.match.params;
      if (moduleName !== moduleNameOriginal) this.requestDispatcher(nextProps);
    }

    requestDispatcher(props) {
      const { moduleName } = props.match.params;
      if (moduleName !== null) {
        const componentName = data[moduleName];
        this.setState({ componentName });
      }
    }

    render() {
      const { componentName } = this.state;
      return <Component componentName={componentName} />;
    }
  }

  Container.propTypes = propTypes;

  return withRouter(Container);
};

export default withRouterResolver;
