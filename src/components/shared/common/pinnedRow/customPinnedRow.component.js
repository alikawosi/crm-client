import React, { PureComponent } from 'react';

export default class CustomPinnedRowRenderer extends PureComponent {
  
  render() {
    return <span>{this.props.value}</span>;
  }
}
