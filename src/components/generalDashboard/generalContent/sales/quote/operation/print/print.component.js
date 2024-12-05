/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import './print.component.css'
/* #endregion */

class Print extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);

        this.state = {
            /* #region  [-  selectedProduct ag-Grid -] */

            selectedProductColumnDefs: [
                { headerName: 'کد کالا', field: "code", width: 90 },
                { headerName: 'نام کالا', field: "title", width: 270 },
                { headerName: 'مبلغ واحد ', field: "unitPrice", width: 130 },
                { headerName: 'تعداد', field: "quantity", colId: "quantity", width: 90 },
                { headerName: 'مبلغ', field: "price", colId: "price", cellRenderer: this.priceCellRenderer, width: 90 },
                { headerName: 'اضافات', field: "sumAllAdditions", colId: "sumAllAdditions", width: 90 },
                { headerName: 'کسورات', field: "sumAllDeductions", colId: "sumAllDeductions", width: 90 },
                { headerName: 'مبلغ کل', field: "finalPrice", wrapText: true, colId: "finalPrice", cellRenderer: this.finalPriceCellRenderer, width: 100 },
            ],

            /* #endregion */

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            currencyRef: 1,
            quoteTotalPrice: '',
            sumAdditions: 0,
            sumDeductions: 0,
            descriptionRow: '',
            isTermTableHidden: true,
            serialNumber: 0,
            productTotalPrice:'',
            /* #endregion */

            /* #region  [- dbField -] */
            code: '',
            nativeDateQuote: '',
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
            productTotalPrice: 0,
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.calculatePrice()
        await this.calculateQuoteTotalPrice()
        await this.setQuoteItem()
    }
    /* #endregion */

    /* #region  [- setQuoteItem -] */
    setQuoteItem = async () => {
        let quoteItem = Object.assign({}, this.props.quoteItem[0])
        let seller = { ...this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0] }
        let buyer = { ...this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0] }
        let code = ''
        if (quoteItem.separator === '\\') {
            code = quoteItem.ordinalCode + '\\' + quoteItem.patternCode
        }
        else if (quoteItem.separator === '*') {
            code = quoteItem.ordinalCode + '*' + quoteItem.patternCode
        }
        else {
            code = quoteItem.patternCode + quoteItem.separator + quoteItem.ordinalCode
        }

        this.setState({
            serialNumber: quoteItem.serialNumber,
            nativeDateQuote: quoteItem.nativeDateQuote,
            code: code,
            descriptionRow: quoteItem.descriptionRow,

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

        })

    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- priceCellRenderer -] */
    priceCellRenderer = params => {
        let price = (params.data.quantity * params.data.unitPrice)
        return price

    }
    /* #endregion */

    /* #region  [- calculatePrice -] */
    calculatePrice = async () => {

        let totalPrice = 0
        await this.props.quoteItemProductList.map(x => {
            totalPrice = totalPrice + x.finalPrice
        })

        this.setState({
            productTotalPrice: totalPrice
        })
    }
    /* #endregion */

    /* #region  [- calculateQuoteTotalPrice -] */
    calculateQuoteTotalPrice = async () => {
        let sumAdditions = 0
        let sumDeductions = 0
        let quoteTotalPrice = 0
        this.props.quoteItemFinancialCaseList.map(x => {
            if (x.additionsFlag === true) {
                sumAdditions = sumAdditions + x.financialCasePrice
            }
            if (x.deductionsFlag === true) {
                sumDeductions = sumDeductions + x.financialCasePrice
            }

        })
        quoteTotalPrice = this.state.productTotalPrice + sumAdditions - sumDeductions
        this.setState({
            quoteTotalPrice: quoteTotalPrice,
            sumAdditions: sumAdditions,
            sumDeductions: sumDeductions,
        })
    }
    /* #endregion */

    /* #region  [- handleChange -] */
    handleChange = () => {
        if (this.state.isTermTableHidden)
            this.setState({
                isTermTableHidden: false
            })
        else {
            this.setState({
                isTermTableHidden: true
            })
        }
    }
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

                                            <Col sm='4' name="header"> <h3>پیش فاکتور کالا و خدمات</h3></Col>

                                            <Col sm='4' name="basicInfo">


                                                <Row name='serialNumber'>

                                                    <Col sm="6" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="serialNumber">شماره سریال:</Label>
                                                    </Col>

                                                    <Col sm="6" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>
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

                                                    <Col sm="6" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="code">کد:</Label>
                                                    </Col>

                                                    <Col sm="6" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>
                                                        <Input
                                                            type="text"
                                                            name="code"
                                                            id="code"
                                                            value={this.state.code}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                                <Row name="nativeDateQuote">

                                                    <Col sm="6" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="nativeDateQuote">تاریخ:</Label>
                                                    </Col>

                                                    <Col sm="6" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>


                                                        <Input
                                                            type="text"
                                                            name="nativeDateQuote"
                                                            id="nativeDateQuote"
                                                            value={this.state.nativeDateQuote}
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
                                                    <th>کد کالا</th>
                                                    <th>نام کالا</th>
                                                    <th>مبلغ واحد</th>
                                                    <th>واحد اندازه گیری</th>
                                                    <th>تامین کننده</th>
                                                    <th>تعداد</th>
                                                    <th>مبلغ</th>
                                                    <th>اضافات</th>
                                                    <th>کسورات</th>
                                                    <th>مبلغ کل</th>
                                                </tr>

                                                {this.props.quoteItemProductList.map(x =>
                                                    <tr>
                                                        <td style={{textAlign:'right'}}>{x.code}</td>
                                                        <td style={{textAlign:'right'}}>{x.title}</td>
                                                        <td style={{textAlign:'right'}}>{x.unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                                                        <td style={{textAlign:'right'}}>{x.scaleTitle}</td>
                                                        <td style={{textAlign:'right'}}>{x.supplyChainTitle}</td>
                                                        <td style={{textAlign:'right'}}>{x.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                                                        <td style={{textAlign:'right'}}>{x.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                                                        <td style={{textAlign:'right'}}>{x.sumAllAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                                                        <td style={{textAlign:'right'}}>{x.sumAllDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                                                        <td style={{textAlign:'right'}}>{x.finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                                                    </tr>
                                                )}



                                            </thead>
                                        </table>

                                    </Col>

                                </Row>

                                <Row className='printPageFooter'>
                                    <Col sm='12'>
                                        <Row name='row_05_QuoteFinalPrice' >

                                            <Col sm="6" style={{ border: 'solid 1px', margin: '1% 0 1% 0', paddingBottom: '1%' }}>

                                                <Row name='productTotalPrice'>

                                                    <Col sm="6" name="lable" style={{ paddingTop: '3%', textAlign: 'right' }}>
                                                        <Label >مبلغ کل پیش فاکتور:</Label>
                                                    </Col>

                                                    <Col sm="6" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500' }}>
                                                        <Input
                                                            type="text"
                                                            name="productTotalPrice"
                                                            id="productTotalPrice"
                                                            value={this.state.productTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                                <Row name="sumAdditions">

                                                    <Col sm="6" name="lable" style={{ paddingTop: '3%', textAlign: 'right' }}>
                                                        <Label >مبلغ کل اضافات:</Label>
                                                    </Col>

                                                    <Col sm="6" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500' }}>


                                                        <Input
                                                            type="text"
                                                            name="sumAdditions"
                                                            id="sumAdditions"
                                                            value={this.state.sumAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                                <Row name="sumDeductions">

                                                    <Col sm="6" name="lable" style={{ paddingTop: '3%', textAlign: 'right' }}>
                                                        <Label >مبلغ کل کسورات:</Label>
                                                    </Col>

                                                    <Col sm="6" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500' }}>


                                                        <Input
                                                            type="text"
                                                            name="sumDeductions"
                                                            id="sumDeductions"
                                                            value={this.state.sumDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                                <Row name="quoteTotalPrice" >

                                                    <Col sm="6" name="lable" style={{ paddingTop: '3%', textAlign: 'right' }}>
                                                        <Label >مبلغ قابل پرداخت:</Label>
                                                    </Col>

                                                    <Col sm="6" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500' }}>


                                                        <Input
                                                            type="text"
                                                            name="quoteTotalPrice"
                                                            id="quoteTotalPrice"
                                                            value={this.state.quoteTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}

                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>


                                            </Col>

                                            <Col sm="6" style={{
                                                borderTop: 'solid 1px',
                                                borderLeft: 'solid 1px',
                                                borderBottom: 'solid 1px',
                                                margin: '1% 0 1% 0',
                                                textAlign: 'rigth',
                                                paddingBottom: '1%'
                                            }}>
                                                <h6>توضیحات:</h6>
                                                <span>{this.state.descriptionRow}</span>
                                            </Col>

                                        </Row>

                                    </Col>
                                </Row>

                                <Row className='printPageTerm' name='termTable' hidden={this.state.isTermTableHidden}>
                                    <Col name="termTableHeader" sm='12' style={{ border: 'solid 1px', marginTop: '1%' }}>
                                        <Row >
                                            <Col sm='4'></Col>
                                            <Col sm='4' style={{ textAlign: 'center' }}> <h6> شرایط و ملاحظات پیش فاکتور</h6></Col>
                                            <Col sm='4'></Col>

                                        </Row>
                                    </Col>

                                    <Col name="termGrid" sm='12' style={{ width: '100%', padding: '0', border: 'solid 1px', overflowY: 'scroll' }}>
                                        <table style={{ width: '100%', tableLayout: 'auto', borderCollapse: 'collapse', textAlign: 'center' }} >
                                            <thead>
                                                <tr>
                                                    <th>ردیف</th>
                                                    <th>عنوان</th>
                                                    <th>نوع</th>
                                                    <th>شرایط تحول</th>
                                                    <th>روش حمل و نقل </th>
                                                    <th>توضیحات</th>
                                                </tr>

                                                {this.props.quoteTermList.map((x, i = 0) =>
                                                    <tr>
                                                        <td style={{textAlign:'right'}}>{i + 1}</td>
                                                        <td style={{textAlign:'right'}}>{x.title}</td>
                                                        <td style={{textAlign:'right'}}>{x.type}</td>
                                                        <td style={{textAlign:'right'}}>{x.deliveryTerm}</td>
                                                        <td style={{textAlign:'right'}}>{x.shippingMethod}</td>
                                                        <td style={{textAlign:'right'}}>{x.descriptionRow}</td>
                                                    </tr>
                                                )}



                                            </thead>
                                        </table>

                                    </Col>
                                </Row>

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

                            <Col name='licenseCol' sm='1' style={{ paddingTop: '10%', paddingBottom: '10%' }}>
                                <p className='licenseName' style={{ fontSize: '18px' }}>Powered by:
                                    <a style={{ fontSize: '22px' }} href='https://www.crmonde.com'>www.CRMonde.io</a>
                                </p>
                            </Col>
                        </Row>

                    </Container>
                </Row>

                <Row name='buttonsAndCheckboxes' >
                    <Col name='buttonAndCheckBoxCol' sm='12'>
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
        quoteItem: state.quote.quoteItem,
        quoteItemFinancialCaseList: state.quote.quoteItemFinancialCaseList,
        quoteItemProductList: state.quote.quoteItemProductList,
        quoteTermList: state.quote.quoteTermList,
        quoteSellerAndBuyerList: state.quote.quoteSellerAndBuyerList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Print);
