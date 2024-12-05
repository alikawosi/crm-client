/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../../../../../redux/shared/auth/auth.action';
import { postQuoteToQuoteCorresponding } from '../../../../../../../../../../redux/sales/quote/quote/quote.action'
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import moment from 'jalali-moment';
/* #endregion */

class NewQuoteCorresponding extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            /* #endregion */

            /* #region  [- flags -] */
            /* #endregion */

            /* #region  [- dbField -] */
            patternCode: moment().locale('fa').format('YYYY'),
            dateQuote: dayjs(new Date()).calendar("jalali").locale("fa"),
            descriptionRow: '',
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onCloseNewQuoteCorrespondingModal();

    }
    /* #endregion */


    /* #region  [- submit -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.postQuoteToQuoteCorresponding();
        await this.props.onCloseNewQuoteCorrespondingModal();
        await this.props.showInsertedCodeListModal(1);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateQuote: dateString,
            patternCode: date.split('-')[0],
        })
    }
    /* #endregion */

    /* #region  [- handleChange -] */
    handleChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- postQuoteToQuoteCorresponding -] */
    postQuoteToQuoteCorresponding = async () => {
        let quoteHeaderList = []

        let nativeDate = dayjs(this.state.dateQuote).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        quoteHeaderList.push({
            nativeDateQuote: dayjs(this.state.dateQuote).format('YYYY/MM/DD').toString(),
            LatinDateQuote: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            patternCode: this.state.patternCode,
            descriptionRow: this.state.descriptionRow
        })
        let data = {
            domainRef: this.props.domain,
            headerRef: this.props.headerRef,
            quoteHeaderList: quoteHeaderList,
            aspNetUsersRef:this.props.userId,
        }
        await this.props.postQuoteToQuoteCorresponding(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name='row_01_Forms' >

                    <Col name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='dateQuote' style={{ textAlign: 'right' }}>
                                <Label for='dateQuote'>تاریخ پیش فاکتور جدید</Label>
                                <br />
                                <Row>
                                    <Col sm={6}>
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.dateQuote}
                                                value={this.state.dateQuote}
                                                style={{ width: "100%" }}
                                                allowClear={false}
                                            />
                                        </ConfigProvider>

                                    </Col>
                                </Row>

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

                <Row name="row_02_Buttons" style={{ paddingLeft: '0.7%', marginBottom: '1%', marginTop: '10%' }}>
                    <Col sm="6"></Col>
                    <Col sm="6" style={{ textAlign: 'left' }}>

                        <Button className='cancel-button-style' style={{ marginLeft: '1%' }} onClick={this.cancel}>لغو</Button>
                        <Button className='submit-button-style' onClick={this.submit}>تایید نهایی و ثبت در سیستم</Button>

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
        domain: state.auth.domain,
        userId: state.auth.userId,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postQuoteToQuoteCorresponding: (data) => dispatch(postQuoteToQuoteCorresponding(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewQuoteCorresponding);