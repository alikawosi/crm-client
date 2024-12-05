/* #region  [- import -] */
import React, { PureComponent } from 'react';

/* #endregion */

class WarehouseIntersections extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            intersections: []
        }
    }
    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (

            <div>
                <h3 style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold', textAlign: 'right' }}>انبارهای مورد نظر در لیست انبارهای انتخاب شده موجود می باشد. </h3>
                {
                    this.props.intersections.map((el) => (
                        <ul key={el.warehouseRef} style={{ textAlign: 'right' }}>
                            <li >
                                {el.warehouseTitle}
                            </li>
                        </ul>
                    ))
                }

            </div>
        );
    }
    /* #endregion */

}

export default WarehouseIntersections;