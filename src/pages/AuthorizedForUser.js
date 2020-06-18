import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';

@connect()
class RouterUser extends React.PureComponent {
  state = {
    isRedirect: false,
    loaded: false
  };

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;
    if ('info' in query) {
      dispatch({
        type: 'global/login',
        payload: {
          base: true,
          loginInfo: query.info
        }
      }).then((result) => {
        if (result) {
          this.setState({
            isRedirect: true
          });
        } else {
          this.setState({
            loaded: true
          });
        }
      });
    } else {
      this.setState({
        loaded: true
      });
    }
  }

  render() {
    const { isRedirect, loaded } = this.state;
    const { children } = this.props;
    return (
      <React.Fragment>
        {
          loaded ? (
            <div style={{ height: '100%' }}>
              {children}
            </div>
          ) : (
            isRedirect ? <Redirect to="www.baidu.com" /> : null
          )
        }
      </React.Fragment>
    );
  }
}

export default RouterUser;
