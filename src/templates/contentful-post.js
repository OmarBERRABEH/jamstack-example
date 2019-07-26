import React from 'react';

export class ContentfulPostComponent extends React.Component {
  render () {
    console.log ('props', this.props);
    return (
      <h1>
        content full
      </h1>
    );
  }
}

export default ContentfulPostComponent;
