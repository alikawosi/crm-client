/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Icon, Button, Label, Menu } from 'semantic-ui-react'
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
        if (this.props.sumAllProductQuantity.length !== 0) {
            let sumAllSelectedProductQuantity = this.props.sumAllProductQuantity.filter(y => y.productRef === this.props.node.data.productRef)
            let list = this.props.orderProductQuantityList.filter(x => x.productRef === this.props.node.data.productRef && x.headerRef===this.props.node.data.quoteHeaderId)

            let sumProductQuantity = 0
            sumAllSelectedProductQuantity.map(x => {
                sumProductQuantity = sumProductQuantity + x.sumProductQuantity
            })

            this.setState({
                sumQuantities:this.props.node.data.quantity,
                rowCount: list.length
            })
        }
        else {
            this.setState({
                sumQuantities: this.props.node.data.quantity,
                rowCount: 0
            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- countQuantity -] */
    countQuantity = () => {
        let data = {
            id: this.props.node.data.productRef,
            productTitle: this.props.node.data.title,
            quantity:this.props.node.data.quantity,
            quoteHeaderId:this.props.node.data.quoteHeaderId,
            checkRefFlag:this.props.node.data.checkRefFlag,
            node:this.props.node,
            supplyChainTitle: this.props.data.supplyChainTitle,
            scaleTitle: this.props.data.scaleTitle,
        }
        this.props.context.componentParent.countQuantity(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{paddingBottom:'5px'}}>
            <Menu compact style={{ marginRight: '20%',fontSize:'12px',  }}>
                <Menu.Item as='a'>
                    {this.state.sumQuantities.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    <Label style={{fontSize:'10px'}}    circular size='small' color='yellow' floating >{this.state.rowCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </Label>

                </Menu.Item>
                <Button style={{fontSize:'8px'}}  color='yellow' onClick={this.countQuantity}>
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
        quoteMergedList: state.quote.quoteMergedList,
        orderProductQuantityList: state.quote.orderProductQuantityList,
        sumAllProductQuantity: state.quote.sumAllProductQuantity
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridQuantityButton);
