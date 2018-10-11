import React from 'react';
import PropTypes from 'prop-types';
import withRouterResolver from './withRouterResolver';

const propTypes = {
  componentName: PropTypes.string.isRequired,
};

const defaultProps = {};

/**
 * 모듈정보를 로드한다.
 * 권한 정보를 로드한다.
 * @param {*} props
 */
class Controller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Component: null,
    };
  }

  componentDidMount() {
    this.getImport(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { componentName: origin } = this.props;
    const { componentName } = nextProps;
    if (componentName !== origin) this.getImport(nextProps);
    return true;
  }

  getImport(props) {
    const { componentName } = props;
    if (componentName !== null) {
      this.setState(
        () => ({ Component: null }),
        () => {
          import(`__dirsrc/${componentName}`).then(module => {
            this.setState({ Component: module.default });
          });
        },
      );
    }
  }

  render() {
    const { Component } = this.state;
    if (!Component) return null;
    return <Component {...this.props} />;
  }
}

Controller.propTypes = propTypes;
Controller.defaultProps = defaultProps;

export default withRouterResolver(Controller);
