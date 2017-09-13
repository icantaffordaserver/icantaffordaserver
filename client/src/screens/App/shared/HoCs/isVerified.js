/**
 * Created by alexandermann on 2017-03-21.
 */
import React from "react";
import { graphql } from "react-apollo";
import currentUserQuery from "../graphql/queries/currentUserQuery";

export default WrappedComponent => {
  class isAuthenticated extends React.Component {
    static propTypes = {
      data: React.PropTypes.object.isRequired,
      history: React.PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
      const { data } = nextProps;

      if (!data.loading && data.user && !data.user.emailVerified) {
        this.props.history.push("/notverified");
      }
    }

    render() {
      if (this.props.data.loading) return null;

      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(isAuthenticated);
};
