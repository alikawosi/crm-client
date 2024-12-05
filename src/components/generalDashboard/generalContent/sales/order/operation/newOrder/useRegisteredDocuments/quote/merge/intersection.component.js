/* #region  [- import -] */
import React, { PureComponent } from 'react';

/* #endregion */

class Intersections extends PureComponent {

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
                <h3 style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold', textAlign: 'right' }}>کالای مورد نظر در لیست کالاهای انتخاب شده موجود می باشد. </h3>
                {
                    this.props.intersections.map((el) => (
                        <ul key={el.productRef} style={{ textAlign: 'right' }}>
                            <li >
                                {el.title}
                            </li>
                        </ul>
                    ))
                }

            </div>
        );
    }
    /* #endregion */

}

export default Intersections;