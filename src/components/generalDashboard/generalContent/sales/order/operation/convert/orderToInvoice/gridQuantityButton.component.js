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
      
            this.setState({
                sumQuantities: this.props.orderProductList.filter(x => x.id === this.props.node.data.id)[0].quantity,
                rowCount:Object.keys(this.props.orderItemProductQuantityList.filter(x => x.productRef === this.props.node.data.id)).length 
            })
        
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- countQuantity -] */
    countQuantity = () => {
        let data = {
            id: this.props.node.data.id,
            productTitle: this.props.node.data.title,
            quantity: this.props.orderProductList.filter(x => x.id === this.props.node.data.id)[0].quantity,
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
        orderProductList: state.order.orderProductList,
        orderItemProductQuantityList: state.order.orderItemProductQuantityList,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridQuantityButton);
