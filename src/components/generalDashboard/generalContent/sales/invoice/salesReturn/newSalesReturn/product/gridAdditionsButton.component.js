/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Icon, Button, Label, Menu } from 'semantic-ui-react'
import '../product/product.component.css'
import { connect } from "react-redux";
import { editInvoiceProductAdditions } from '../../../../../../../../redux/sales/invoice/invoice/invoice.action'

/* #endregion */

class GridAdditionsButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            sumAdditions: 0,
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

      
            let list = this.props.invoiceProductAdditionsList.filter(x => x.productRef === this.props.node.data.id)
            let sumAdditions = 0
            if (list.length !== 0) {
                list.map(x => {
                    if (x.percentFlag === true) {
                        x.financialCasePrice = ((x.financialCasePercent*1) * (this.props.node.data.unitPrice * this.props.node.data.quantity) / 100)
                    }
                    sumAdditions = sumAdditions + x.financialCasePrice
                })
            }

            this.setState({
                sumAdditions: sumAdditions,
                rowCount: list.length
            })
       

    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- additions -] */
    additions = () => {
        let data = {
            id: this.props.node.data.id,
        }
        this.props.context.componentParent.showAdditions(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{paddingBottom:'5px'}}>
            <Menu compact style={{ marginRight: '20%' ,fontSize:'12px',}}>
                <Menu.Item as='a'   >
                    {this.state.sumAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    <Label style={{fontSize:'10px'}}  circular size='small' color='green' floating >{this.state.rowCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </Label>

                </Menu.Item>
                <Button  style={{fontSize:'8px'}} color='green' onClick={this.additions}>
                    <Icon name='plus' size='small'></Icon>
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
        invoiceProductAdditionsList: state.salesReturn.invoiceProductAdditionsList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    editInvoiceProductAdditions: (data) => dispatch(editInvoiceProductAdditions(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridAdditionsButton);
