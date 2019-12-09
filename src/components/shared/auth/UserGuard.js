import React from "react";
import { Redirect } from "react-router-dom";

export class UserGuard extends React.Component {
  render() {
    const { isFetching, isAllowed } = this.props;

    if (isAllowed && !isFetching) {
      return this.props.children;
    } else if (!isAllowed && !isFetching) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    } else {
      return <h1>Loading...</h1>;
    }
  }
}
