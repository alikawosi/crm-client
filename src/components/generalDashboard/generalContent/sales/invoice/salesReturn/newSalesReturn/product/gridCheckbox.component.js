/* #region  [- imports -] */
import React, { PureComponent } from "react";

/* #endregion */

class GridCheckbox extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.node.data.addInventoryFlag
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [- handleChange -] */

    /* #region  [- handleChange -] */
    handleChange = async (event) => {
        let checked = event.target.checked
        await this.setState({
            checked: checked
        })

        let data = {
            addInventoryFlag: checked,
            inventoryId: this.props.node.data.inventoryId,
        }
        this.props.context.componentParent.changeAddInventoryFlag(data);

    }
    /* #endregion */


    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{ paddingBottom: '5px' }}>
                <input type='checkbox' checked={this.state.checked} onChange={this.handleChange} />
            </div>
        )
    }
    /* #endregion */

    /* #endregion */
};



export default GridCheckbox
