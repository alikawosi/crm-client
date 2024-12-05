/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';

/* #endregion */

class Print extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            currencyRef: 1,
            invoiceTotalPrice: '',
            sumAdditions: 0,
            sumDeductions: 0,
            descriptionRow: '',
            isTermTableHidden: true,
            /* #endregion */

            /* #region  [- dbField -] */
            code: '',
            nativeDateInvoice: '',
            sellerName: '',
            sellerEconomicNumber: '',
            sellerTitle: '',
            sellerEconomicCode: '',
            sellerRegistrationNumber: '',
            sellerFullAddress: '',
            sellerTel: '',
            sellerPostalCode: '',
            buyerName: '',
            buyerEconomicNumber: '',
            buyerTitle: '',
            buyerEconomicCode: '',
            buyerRegistrationNumber: '',
            buyerFullAddress: '',
            buyerTel: '',
            buyerPostalCode: '',
            warehouseTitle: '',
            warehouseCode: '',
            serialNumber:''
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.setrequisitionItem()
    }
    /* #endregion */

    /* #region  [- setrequisitionItem -] */
    setrequisitionItem = async () => {
        let requisitionItem = Object.assign({}, this.props.requisitionItem[0])
        let seller = { ...this.props.requisitionSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0] }
        let buyer = { ...this.props.requisitionSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0] }
        this.setState({
            nativeDateInvoice: requisitionItem.requisitionNativeDateDelivered,
            code: requisitionItem.requisitionCode,
            referenceCode: requisitionItem.referenceCode,
            descriptionRow: requisitionItem.descriptionRow,

            sellerTitle: seller.title,
            sellerEconomicCode: seller.economicCode,
            sellerRegistrationNumber: seller.registrationNumber,
            sellerFullAddress: seller.fullAddress,
            sellerTel: seller.tel,
            sellerPostalCode: seller.postalCode,

            buyerTitle: buyer.title,
            buyerEconomicCode: buyer.economicCode,
            buyerRegistrationNumber: buyer.registrationNumber,
            buyerFullAddress: buyer.fullAddress,
            buyerTel: buyer.tel,
            buyerPostalCode: buyer.postalCode,

            warehouseTitle: requisitionItem.warehouseTitle,
            warehouseCode: requisitionItem.warehouseCode,

            serialNumber:requisitionItem.requisitionSerialNumber
        })

    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */


    /* #region [- callPrintFunction -]  */
    callPrintFunction = () => {

        this.printElement(document.getElementById("printPage"))

    }
    /* #endregion */

    /* #region  [- printElement -] */
    printElement = (el) => {
        var domClone = el.cloneNode(true);
        //console.log(domClone)
        var printSection = document.getElementById("printSection");

        if (!printSection) {
            printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
            printSection.innerHTML = "";
        }

        printSection.appendChild(domClone);
        //console.log($printSection)
        window.print();
        printSection.innerHTML = '';
    }
    /* #endregion */



    /* #endregion */




    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ padding: '2% 5% 4% 2%' }}>
                <Row>
                    <Container id='printPage' fluid style={{ padding: '2% 2% 4% 2%' }}>
                        <Row name='printRow'>
                            <Col name='printTargetCol' sm='11'>

                                <Row className='printPageHeader'>
                                    <Col sm='12'>
                                        <Row name='row_01_HeaderAndBasicInfo' >

                                            <Col sm='4'></Col>

                                            <Col sm='4' name="header"> <h3> حواله خروج کالا و خدمات</h3></Col>

                                            <Col sm='4' name="basicInfo">

                                                <Row name='serialNumber'>

                                                    <Col sm="4" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="serialNumber">شماره سریال:</Label>
                                                    </Col>

                                                    <Col sm="8" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>
                                                        <Input
                                                            type="text"
                                                            name="serialNumber"
                                                            id="serialNumber"
                                                            value={this.state.serialNumber}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                                <Row name='code'>

                                                    <Col sm="4" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="code">کد:</Label>
                                                    </Col>

                                                    <Col sm="8" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>
                                                        <Input
                                                            type="text"
                                                            name="code"
                                                            id="code"
                                                            value={this.state.code}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                                <Row name="nativeDateInvoice">

                                                    <Col sm="4" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="nativeDateInvoice">تاریخ:</Label>
                                                    </Col>

                                                    <Col sm="8" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>


                                                        <Input
                                                            type="text"
                                                            name="nativeDateInvoice"
                                                            id="nativeDateInvoice"
                                                            value={this.state.nativeDateInvoice}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                            </Col>
                                        </Row>

                                        <Row name='row_02_AccountInfo' >

                                            <Col name="seller" sm="12" style={{ border: 'solid 1px', marginTop: '1%' }}>

                                                <Row style={{ borderBottom: 'solid 1px' }}>
                                                    <Col sm='4'></Col>
                                                    <Col sm='4' style={{ textAlign: 'center' }}> <h6>مشخصات فروشنده</h6></Col>
                                                    <Col sm='4'></Col>

                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="6" name='col-03-sellerTitle' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>نام شخص حقیقی/حقوقی: {this.state.sellerTitle}</p>

                                                    </Col>

                                                    <Col sm="6" name='col-03-sellerEconomicCode' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>شماره اقتصادی: {this.state.sellerEconomicCode}</p>

                                                    </Col>

                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="8" name='col-03-sellerRegistrationNumber' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>شماره ثبت/شماره ملی:{this.state.sellerRegistrationNumber}</p>

                                                    </Col>


                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="6" name='col-03-sellerAddress' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>نشانی: {this.state.sellerFullAddress}</p>

                                                    </Col>

                                                    <Col sm="3" name='col-03-economicNumber' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>شماره تلفن: {this.state.sellerTel}</p>

                                                    </Col>

                                                    <Col sm="3" name='col-03-sellerPostalCode' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>کدپستی: {this.state.sellerPostalCode}</p>

                                                    </Col>

                                                </Row>

                                            </Col>

                                            <Col name="buyer" sm="12" style={{ border: 'solid 1px', marginTop: '1%' }}>

                                                <Row style={{ borderBottom: 'solid 1px' }}>
                                                    <Col sm='4'></Col>
                                                    <Col sm='4' style={{ textAlign: 'center' }}> <h6>مشخصات خریدار</h6></Col>
                                                    <Col sm='4'></Col>

                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="6" name='col-03-buyerTitle' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>نام شخص حقیقی/حقوقی: {this.state.buyerTitle}</p>

                                                    </Col>

                                                    <Col sm="6" name='col-03-buyerEconomicCode' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>شماره اقتصادی: {this.state.buyerEconomicCode}</p>

                                                    </Col>

                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="8" name='col-03-buyerRegistrationNumber' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>شماره ثبت/شماره ملی:{this.state.buyerRegistrationNumber}</p>

                                                    </Col>


                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="6" name='col-03-buyerFullAddress' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>نشانی: {this.state.buyerFullAddress}</p>

                                                    </Col>

                                                    <Col sm="3" name='col-03-buyerTel' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>شماره تلفن: {this.state.buyerTel}</p>

                                                    </Col>

                                                    <Col sm="3" name='col-03-buyerPostalCode' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>کدپستی: {this.state.buyerPostalCode}</p>

                                                    </Col>

                                                </Row>

                                            </Col>

                                            <Col name="warehouseInformation" sm="12" style={{ border: 'solid 1px', marginTop: '1%' }}>

                                                <Row style={{ borderBottom: 'solid 1px' }}>
                                                    <Col sm='4'></Col>
                                                    <Col sm='4' style={{ textAlign: 'center' }}> <h6>مشخصات انبار</h6></Col>
                                                    <Col sm='4'></Col>

                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="6" name='col-03-warehouseTitle' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>نام انبار: {this.state.warehouseTitle}</p>

                                                    </Col>

                                                    <Col sm="6" name='col-03-warehouseCode' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p> کد انبار: {this.state.warehouseCode}</p>

                                                    </Col>

                                                </Row>

                                            </Col>


                                        </Row>
                                    </Col>
                                </Row>

                                <Row className='printPageGrid' name="row_03_Product" >

                                    <Col name="header" sm='12' style={{ border: 'solid 1px', marginTop: '1%' }}>
                                    <Row >
                                            <Col sm='12' style={{ textAlign: 'right' }}> <h6>مشخصات کالا یا خدمات مورد معامله</h6></Col>

                                        </Row>
                                    </Col>

                                    <Col name="grid" sm='12' style={{ width: '100%', padding: '0', border: 'solid 1px', overflowY: 'scroll' }}>
                                        <table style={{ width: '100%', tableLayout: 'auto', borderCollapse: 'collapse', textAlign: 'center' }} >
                                            <thead>
                                                <tr>
                                                    <th>ردیف</th>
                                                    <th>کد کالا</th>
                                                    <th>نام کالا</th>
                                                    <th>واحد اندازه گیری</th>
                                                    <th>تعداد</th>
                                                    <th>تامین کننده</th>
                                                </tr>

                                                {this.props.requisitionDetail.map((x, i = 0) =>
                                                    <tr>
                                                        <td style={{ textAlign: 'right' }}>{i + 1}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.productCode}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.productTitle}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.scaleTitle}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.supplyChainTitle}</td>
                                                    </tr>
                                                )}
                                            </thead>
                                        </table>

                                    </Col>

                                </Row>

                                <Row className='printPageFooter'>
                                    <Col>
                                        <Row name='row_06_Signature' style={{ border: 'solid 1px' }}>

                                            <Col sm="6" style={{ textAlign: 'right' }}>
                                                <Row>
                                                    <Col sm="4" style={{ borderLeft: 'solid 1px', paddingBottom: '4%' }}>
                                                        <h7>مهر و امضا صادر کننده:</h7>

                                                    </Col>
                                                    <Col sm="4" style={{ borderLeft: 'solid 1px', paddingBottom: '4%' }}>
                                                        <h7>مهر و امضا کنترل کننده:</h7>

                                                    </Col>
                                                    <Col sm="4" style={{ borderLeft: 'solid 1px', paddingBottom: '4%' }}>
                                                        <h7>مهر و امضا تایید کننده:</h7>

                                                    </Col>
                                                </Row>

                                            </Col>

                                            <Col sm="6" style={{ textAlign: 'right' }}>
                                                <h7>مهر و امضا خریدار:</h7>
                                            </Col>

                                        </Row>

                                        <hr style={{ pageBreakAfter: 'always ' }}></hr>
                                    </Col>

                                </Row>





                            </Col>

                            <Col name='licenseCol' sm='1' style={{ paddingTop: '10%', paddingBottom: '10%' }}>
                                <p className='licenseName' style={{ fontSize: '18px' }}>Powered by:
                                    <a style={{ fontSize: '22px' }} href='https://www.crmonde.com'>www.CRMonde.com</a>
                                </p>
                            </Col>
                        </Row>

                    </Container>
                </Row>

                <Row name='buttonsAndCheckboxes' >
                    <Col name='buttonAndCheckBoxCol' sm='12' hidden={true}>
                        <Row name='termCheckBoxRow'>
                            <Label>
                                <Input type="checkbox" value={this.state.isTermTableHidden} onChange={this.handleChange} />
                                نمایش  شرایط و ملاحظات
                            </Label>
                        </Row>
                        <Row name='printButtonRow'>
                            <Button color="success" onClick={this.callPrintFunction}>Print</Button>
                        </Row>
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
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        requisitionItem: state.requisition.requisitionItem,
        requisitionSellerAndBuyerList: state.requisition.requisitionSellerAndBuyerList,
        requisitionDetail: state.requisition.requisitionDetail,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Print);
