/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { Row, } from 'reactstrap'

/* #endregion */
export default class CustomHeader extends PureComponent {
  /* #region  [- ctor -] */
  constructor(props) {
    super(props);

    this.state = {
    };

  }
  /* #endregion */

  /* #region  [- onMenuClicked  -] */
  onMenuClicked() {
    this.props.showColumnMenu(this.menuButton);
  }
  /* #endregion */

  /* #region  [- render -] */
  render() {

    /* #region  [- menu -] */
    let menu = null;
    if (this.props.enableMenu) {
      this.props.menuIcon !== 'fa-bars' ?
        menu = (
          <Row style={{ overflow: 'hidden', margin: '0', padding: '0' }}>
            <i style={{ pointerEvents: 'none'  ,fontSize:'9px'}} className={`fa ${this.props.menuIcon}`}></i>
            <i style={{ marginRight: '5px' ,fontSize:'9px'}} ref={(menuButton) => { this.menuButton = menuButton }} onClick={this.onMenuClicked.bind(this)} className="fa fa-bars"></i>
          </Row>
        )
        :
        menu = (
          <div style={{ overflow: 'hidden' }} ref={(menuButton) => { this.menuButton = menuButton }} onClick={this.onMenuClicked.bind(this)}>
            <i style={{ fontSize:'9px'}} onClick={this.onMenuClicked.bind(this)} className="fa fa-bars"></i>
          </div>
        );
    }
    /* #endregion */

    return (

      <div className="ag-cell-label-container" role="presentation">
        <span ref="eMenu" className="ag-header-icon ag-header-cell-menu-button"></span>
        <div ref="eLabel" className="ag-header-cell-label" role="presentation">
          <span ref="eSortOrder" className="ag-header-icon ag-sort-order" ></span>
          <span ref="eSortAsc" className="ag-header-icon ag-sort-ascending-icon" ></span>
          <span ref="eSortDesc" className="ag-header-icon ag-sort-descending-icon" ></span>
          <span ref="eSortNone" className="ag-header-icon ag-sort-none-icon" ></span>
          <span ref="eText" className="ag-header-cell-text" role="columnheader"></span>
          <div style={{ float: 'right', width: 'auto', overflow: 'hidden' }}>{this.props.displayName}</div>
          <div style={{ float: 'left', width: 'auto', overflow: 'hidden', marginRight: '10px' }}>{menu}</div>
          <span ref="eFilter" className="ag-header-icon ag-filter-icon"></span>
        </div>
      </div>

    );
  }
  /* #endregion */
}