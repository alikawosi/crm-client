/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import {
    Container,
    FormGroup,
    Label,
    Row,
    Col,
    Button,
    Form,
    Input,
} from "reactstrap";
import { postPaymentInstallmentStatus } from '../../../../../../../redux/sales/payment/payment.action'
/* #endregion */

class InstallmentStatus extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isReceiveFlagChecked: false,
            isReceiveFlagDisabled: false,
            isNotReceiveFlagDisabled: false,
            isSubmitDisabled: false,
            /* #endregion */

            /* #region  [- dbField -] */
            descriptionRow: '',
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.loadData();
    }
    /* #endregion */

    /* #region  [- loadData -] */
    loadData = async () => {
        let data = this.props.paymentInstallmentStatusItem[0]
        this.setState({
            isReceiveFlagChecked: data.receiveFlag === true ? true : false,
            descriptionRow: data.receiveDescription
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- cancel -] */
    cancel = () => {
        this.props.onCancelInstallmentStatusModal();
    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        await this.insertPaymentInstallmentStatus();
        await this.props.onCancelInstallmentStatusModal();
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChange -] */
    handleChange = (e) => {
        this.setState({
            descriptionRow: e.target.value
        })
    }
    /* #endregion */

    /* #region  [- handleChangeInstallmentStatus -] */
    handleChangeInstallmentStatus = (e) => {
        if (e.target.id === '1') {
            this.setState({
                isReceiveFlagChecked: true
            })
        }
        else {
            this.setState({
                isReceiveFlagChecked: false
            })
        }

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- insertPaymentInstallmentStatus -] */
    insertPaymentInstallmentStatus = async () => {
        let data = [{
            receiveFlag: this.state.isReceiveFlagChecked,
            receiveDescription: this.state.descriptionRow
        }]
        let installmentPostData = {
            headerRef: this.props.salesReturnInsertedId,
            typeRef:2*1,
            paymentId: this.props.id,
            paymentInstallmentStatusList: data,
        }
        await this.props.postPaymentInstallmentStatus(JSON.stringify(installmentPostData));
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {


        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_Form'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Form style={{ padding: '1%' }}>
                            <br />
                            <FormGroup name='installmentStatus' style={{ paddingRight: '4%', marginBottom: '4%' }}>

                                <Label name="received" check >

                                    <Input
                                        type="radio"
                                        id="1"
                                        value="received"
                                        name="received"
                                        checked={this.state.isReceiveFlagChecked}
                                        onChange={this.handleChangeInstallmentStatus}
                                        disabled={this.state.isReceiveFlagDisabled}
                                    />دریافت شد</Label>
                                <br />
                                <Label name="notReceived" check>

                                    <Input
                                        type="radio"
                                        id="2"
                                        value="notReceived"
                                        name="notReceived"
                                        checked={!this.state.isReceiveFlagChecked}
                                        onChange={this.handleChangeInstallmentStatus}
                                        disabled={this.state.isNotReceiveFlagDisabled}
                                    />دریافت نشد</Label>
                                <br />

                            </FormGroup>

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="descriptionRow">توضیحات </Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    onChange={this.handleChange}
                                    value={this.state.descriptionRow}
                                >
                                </Input>
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>

                <Row name='row_02_SubmitButton'>
                    <Col sm='12' style={{ margin: '4% 0 2% 0' }}>

                        <Button className="cancel-button-style" onClick={this.cancel} style={{ marginLeft: '2%' }}>
                            لغو
                        </Button>
                        <Button className="submit-button-style mr-2" disabled={this.state.isSubmitDisabled} onClick={this.submit} >
                            ثبت
                        </Button>
                    </Col>
                </Row>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        paymentInstallmentStatusItem: state.payment.paymentInstallmentStatusItem,
        salesReturnInsertedId: state.salesReturn.salesReturnInsertedId,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postPaymentInstallmentStatus: (data) => dispatch(postPaymentInstallmentStatus(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(InstallmentStatus);