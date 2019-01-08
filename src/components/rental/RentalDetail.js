import React, { Component } from 'react'

 export class RentalDetail extends Component {
  render() {

    return (
      <div>
        <h1>I am detail component {this.props.match.params.id}</h1>
      </div>
    )
  }
}

