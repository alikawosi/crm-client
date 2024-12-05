/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Icon, Button, Label, Menu } from 'semantic-ui-react'
import './product.component.css'
import { connect } from "react-redux";
import { editQuoteProductAdditions } from '../../../../../../../../redux/sales/quote/quote/quote.action'

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
        if (this.props.sumAllAdditions.length !== 0) {
            let sumAdditionsList = this.props.sumAllAdditions.filter(x => x.productRef === this.props.node.data.id)
            let list = this.props.quoteItemProductAdditionsList.filter(x => x.productRef === this.props.node.data.id)
            let sumAddtion = 0
            list.map(x => {
                if (x.percentFlag === true) {
                    x.financialCasePrice = parseFloat((x.financialCasePercent*1) * (this.props.node.data.unitPrice * this.props.node.data.quantity) / 100)
                }
                sumAddtion = sumAddtion + x.financialCasePrice
            })
            let finalSumAddition = Object.assign({}, sumAdditionsList[0]).sumAdditions = sumAddtion
            //let rowCount = this.props.quoteItemProductAdditionsList.filter(x => x.productRef === this.props.node.data.id).length

            this.setState({
                sumAdditions: sumAdditionsList.length === 0 ? 0 : finalSumAddition,
                rowCount: list.length
            })
        }
        else {
            let list = this.props.quoteItemProductAdditionsList.filter(x => x.productRef === this.props.node.data.id)
            let sumAdditions = 0
            if (list.length !== 0) {
                list.map(x => {
                    if (x.percentFlag === true) {
                        x.financialCasePrice = parseFloat((x.financialCasePercent*1) * (this.props.node.data.unitPrice * this.props.node.data.quantity) / 100)
                    }
                    sumAdditions = sumAdditions + x.financialCasePrice
                })
            }

            this.setState({
                sumAdditions: sumAdditions,
                rowCount: list.length
            })
        }

    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- additions -] */
    additions = () => {
        let data = {
            id: this.props.node.data.id,
            price: (this.props.node.data.unitPrice * this.props.node.data.quantity)
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
        sumAllAdditions: state.quote.sumAllAdditions,
        quoteItemProductAdditionsList: state.quote.quoteItemProductAdditionsList,
        quoteItemProductList: state.quote.quoteItemProductList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    editQuoteProductAdditions: (data) => dispatch(editQuoteProductAdditions(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridAdditionsButton);
