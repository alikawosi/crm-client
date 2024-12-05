/* #region  [- import -] */
import React, { PureComponent } from "react";
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { checkTokenExpiration } from "../../../../../../../redux/shared/auth/auth.action";
import { Button } from 'reactstrap'
import { getPaymentInstallmentStatusData } from '../../../../../../../redux/sales/payment/payment.action'

/* #endregion */

class GridInstallmentStatusButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            buttonTitle: '',
        }
    }
    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        let receiveFlag = this.props.paymentList.filter(x => x.id=== this.props.node.data.id)[0].receiveFlag;
        let dueDatedFlag= this.props.paymentList.filter(x => x.id=== this.props.node.data.id)[0].dueDatedFlag;        ;
        let overDueDatedFlag = this.props.paymentList.filter(x => x.id=== this.props.node.data.id)[0].overDueDatedFlag;

        if (receiveFlag === false) {
            if(dueDatedFlag===true){
                if(overDueDatedFlag===true){
                    this.setState({
                        buttonTitle: 'دریافت نشد',
                    })
                }
                else{
                    this.setState({
                        buttonTitle: 'تعین وضعیت',
                    })
                }
            }
            else{
                this.setState({
                    buttonTitle: 'تعین وضعیت',
                })
            }

        }
        if (receiveFlag === true) {
            this.setState({
                buttonTitle: 'دریافت شد',
            })
        }
    }
    /* #endregion */

    /* #region  [- onClickShow -] */
    onClickShow = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getInstallmentStatusData(this.props.node.data.id);
        this.props.context.componentParent.showInstallmentStatusModal(this.props.node.data.id);
    }
    /* #endregion */

    //#endregion

    //#region [*** api ***]

    /* #region  [- getInstallmentStatusData -] */
    getInstallmentStatusData = async (id) => {
        let data = {
            paymentId: id
        }
        await this.props.getPaymentInstallmentStatusData(JSON.stringify(data));
    }
    /* #endregion */

    //#endregion

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2' onClick={this.onClickShow} style={{ textAlign: 'right' }}>
                <Button className='submit-button-style' style={{ fontSize: '12px',width:'80%' }} onClick={this.onClickShow}>{this.state.buttonTitle}</Button>
            </div>
        );
    }
    /* #endregion */

    /* #endregion */
};

//#region [- mapStateToProps -]
const mapStateToProps = (state) => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        paymentList: state.payment.paymentList,

    };
};
//#endregion

//#region [- mapDispatchToProps -]
const mapDispatchToProps = (dispatch) => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPaymentInstallmentStatusData: (data) => dispatch(getPaymentInstallmentStatusData(data))
});

//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(GridInstallmentStatusButton);