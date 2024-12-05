/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import moment from 'jalali-moment';
import { saveRequisitionDateDelivered } from '../../../../../../../redux/sales/invoice/requisition/requisition.action'

/* #endregion */

class DateDelivered extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            dateDelivered: dayjs().calendar("jalali").locale("fa"),
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.setState({
            dateDelivered: this.props.dateDelivered
        })
    }
    /* #endregion */

    /* #region  [- disabledDate -] */
    disabledDate = (current) => {
       // let date = this.props.latinDateInvoice === '' ? dayjs().calendar("jalali").locale("fa") : dayjs(this.props.latinDateInvoice).calendar("jalali").locale("fa")

        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateDelivered: dateString,
        })

        this.props.saveRequisitionDateDelivered(dateString)
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <Container fluid>
                <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>انتخاب تاریخ تحویل</span>
                    </Col>
                </Row>
                <Row name='row_03_Modal_Content'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Form>
                            <FormGroup title='dateDelivered' style={{ textAlign: 'right' }}>
                                <br />
                                <Row>
                                    <Col sm='2'></Col>
                                    <Col sm='8'>
                                        <ConfigProvider locale={fa_IR} direction="rtl" >
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                //disabledDate={this.disabledDate}
                                                size="middle"
                                                defaultValue={this.state.dateDelivered}
                                                value={this.state.dateDelivered}
                                                style={{ width: "100%" }}
                                                allowClear={false}
                                                open={true}
                                            />
                                        </ConfigProvider>

                                    </Col>
                                    <Col sm='2'></Col>
                                </Row>

                            </FormGroup>

                        </Form>
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
        latinDateInvoice: state.requisition.latinDateInvoice
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    saveRequisitionDateDelivered: (data) => dispatch(saveRequisitionDateDelivered(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(DateDelivered);