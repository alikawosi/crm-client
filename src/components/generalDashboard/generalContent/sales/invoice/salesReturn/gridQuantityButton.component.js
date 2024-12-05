/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Icon, Button, Label, Menu } from 'semantic-ui-react'
import './newSalesReturn/product/product.component.css'
import { connect } from "react-redux";

/* #endregion */

class GridQuantityButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            sumQuantities: 0,
            rowCount: 0
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {

        this.gridLoadData()
    }
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = () => {
        if (Object.keys(this.props.salesReturnProductQuantityItemList).length>0) {
            let list = this.props.salesReturnProductQuantityItemList.filter(x => x.salesReturnDetailRef === this.props.node.data.id)
            let len = Object.keys(list).length
            let quantity=0
            list.forEach(element => {
                quantity=element.returnRequestesNumber+quantity
            });
            this.setState({
                sumQuantities:len===0?0: quantity,
                rowCount:len
            })
        }

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- countQuantity -] */
    countQuantity = () => {
        let data = {
            salesReturnDetailRef: this.props.node.data.id,
            id: this.props.node.data.productRef,
            productTitle: this.props.node.data.title,
            supplyChainTitle: this.props.data.supplyChainTitle,
            scaleTitle: this.props.data.scaleTitle,
        }
        this.props.context.componentParent.showQuantity(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{ paddingBottom: '5px' }}>
                <Menu compact style={{ marginRight: '20%', fontSize: '12px', }}>
                    <Menu.Item as='a'>
                        {this.state.sumQuantities.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        <Label style={{ fontSize: '10px' }} circular size='small' color='yellow' floating >{this.state.rowCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </Label>

                    </Menu.Item>
                    <Button style={{ fontSize: '8px' }} color='yellow' onClick={this.countQuantity}>
                        <Icon name='edit' size='small' color='black'></Icon>
                    </Button>
                </Menu>
            </div>

        );
    }
    /* #endregion */

    /* #endregion */
};

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        salesReturnProductQuantityItemList: state.salesReturn.salesReturnProductQuantityItemList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridQuantityButton);
