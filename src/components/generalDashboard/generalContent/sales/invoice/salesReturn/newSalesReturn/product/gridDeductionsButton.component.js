/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Icon, Button, Label, Menu } from 'semantic-ui-react'
import { connect } from "react-redux";

/* #endregion */

class GridDeductionsButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            sumDeductions: 0,
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

            let list = this.props.invoiceProductDeductionsList.filter(x => x.productRef === this.props.node.data.id)
            let sumDeduction = 0
            if (list.length !== 0) {
                list.map(x => {
                    if (x.percentFlag === true) {
                        x.financialCasePrice = ((x.financialCasePercent*1) * (this.props.node.data.unitPrice * this.props.node.data.quantity) / 100)
                    }
                    sumDeduction = sumDeduction + x.financialCasePrice
                })
            }

            this.setState({
                sumDeductions: sumDeduction,
                rowCount: list.length
            })
       

    }
    /* #endregion */

    /* #endregion */


    /* #region  [*** buttonTasks ***] */

    /* #region  [- deductions -] */
    deductions = () => {
        let data = {
            id: this.props.node.data.id,
        }
        this.props.context.componentParent.showDeductions(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{paddingBottom:'5px'}}>
            <Menu compact style={{ marginRight: '20%',fontSize:'12px', }}>
                <Menu.Item as='a'>
                {this.state.sumDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    <Label style={{fontSize:'10px'}}   circular size='small' color='red' floating >{this.state.rowCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}  </Label>

                </Menu.Item>
                <Button style={{fontSize:'8px'}} color='red' onClick={this.deductions}>
                    <Icon name='minus' size='small'></Icon>
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
        invoiceProductDeductionsList: state.salesReturn.invoiceProductDeductionsList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridDeductionsButton);

