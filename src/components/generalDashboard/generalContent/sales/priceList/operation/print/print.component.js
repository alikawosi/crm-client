/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class Print extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            /* #endregion */

            /* #region  [- dbField -] */
            datePriceList: '',
            descriptionRow: '',
            activeFlagTitle: '',
            retailFlagTitle: '',
            wholesaleFlagTitle: '',
            serialNumber: 0,
            title:'',
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.setPriceListData()
    }
    /* #endregion */

    /* #region  [- setPriceListData -] */
    setPriceListData = async () => {
        let priceListItemList = Object.assign({}, this.props.priceListItemList[0])

        this.setState({
            datePriceList: priceListItemList.nativeDateStarted + '-' + priceListItemList.nativeDateExpired,
            code: priceListItemList.ordinalCode,
            serialNumber: priceListItemList.serialNumber,
            descriptionRow: priceListItemList.descriptionRow,
            activeFlagTitle: priceListItemList.activeFlag === true ? 'است' : 'نیست',
            retailFlagTitle: priceListItemList.retailFlag === true ? 'ندارد' : 'دارد',
            wholesaleFlagTitle: priceListItemList.wholesaleFlag === true ? 'ندارد' : 'دارد',
            title: priceListItemList.title,
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

                                            <Col sm='2'></Col>

                                            <Col sm='4' name="header"> <h3> صورتحساب کالا و خدمات</h3></Col>

                                            <Col sm='6' name="header">

                                                <Row name='serialNumber'>

                                                    <Col sm="5" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="serialNumber">شماره سریال:</Label>
                                                    </Col>

                                                    <Col sm="7" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>
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

                                                    <Col sm="5" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="code">کد:</Label>
                                                    </Col>

                                                    <Col sm="7" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>
                                                        <Input
                                                            type="text"
                                                            name="code"
                                                            id="code"
                                                            value={this.state.code}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                                <Row name="datePriceList">

                                                    <Col sm="5" name="lable" style={{ paddingTop: '2%', textAlign: 'left' }}>
                                                        <Label for="datePriceList">تاریخ اعتبار:</Label>
                                                    </Col>

                                                    <Col sm="7" name='input' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '0' }}>


                                                        <Input
                                                            type="text"
                                                            name="datePriceList"
                                                            id="datePriceList"
                                                            value={this.state.datePriceList}
                                                        >
                                                        </Input>
                                                    </Col>

                                                </Row>

                                            </Col>
                                        </Row>

                                        <Row name='row_02_BasicInfo' >

                                            <Col name="seller" sm="12" style={{ border: 'solid 1px', marginTop: '1%' }}>

                                                <Row style={{ borderBottom: 'solid 1px' }}>
                                                    <Col sm='4'></Col>
                                                    <Col sm='4' style={{ textAlign: 'center' }}> <h6>مشخصات پایه</h6></Col>
                                                    <Col sm='4'></Col>

                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="6" name='col-03-title' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>عنوان: {this.state.title}</p>

                                                    </Col>

                                                    <Col sm="6" name='col-03-sellerEconomicCode' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                   
                                                    </Col>

                                                </Row>


                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="6" name='col-03-sellerTitle' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>فعال: {this.state.activeFlagTitle}</p>

                                                    </Col>

                                                    <Col sm="6" name='col-03-sellerEconomicCode' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                   
                                                    </Col>

                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="8" name='col-03-retailFlagTitle' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>خرده فروشی:{this.state.retailFlagTitle}</p>

                                                    </Col>


                                                </Row>

                                                <Row style={{ backgroundColor: '#d7d7d8' }}>

                                                    <Col sm="6" name='col-03-عمده فروشی' style={{ textAlign: 'right', fontWeight: '500' }}>

                                                        <p>عمده فروشی: {this.state.wholesaleFlagTitle}</p>

                                                    </Col>

                                                    <Col sm="3" name='col-03-economicNumber' style={{ textAlign: 'right', fontWeight: '500' }}>

                                               

                                                    </Col>

                                                    <Col sm="3" name='col-03-sellerPostalCode' style={{ textAlign: 'right', fontWeight: '500' }}>

                                              
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
                                                    <th>واحد اندازه گیری</th>
                                                    <th>تامین کننده</th>
                                                    <th>نام گروه کالا</th>
                                                    <th>مبلغ</th>
                                                    <th>توضیحات</th>
                                                </tr>

                                                {this.props.priceListDetailList.map(x =>
                                                    <tr>
                                                        <td style={{ textAlign: 'right' }}>{x.productCode}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.productTitle}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.scaleTitle}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.supplyChainTitle}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.productCategoryTitle}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.productUnitPrice}</td>
                                                        <td style={{ textAlign: 'right' }}>{x.descriptionRow}</td>
                                                    </tr>
                                                )}



                                            </thead>
                                        </table>

                                    </Col>

                                </Row>

                                <Row className='printPageFooter'>
                                    <Col sm='12'>
                                        <Row name='row_05_OrderFinalPrice' >

                                            <Col sm="12" style={{
                                                borderTop: 'solid 1px',
                                                borderLeft: 'solid 1px',
                                                borderBottom: 'solid 1px',
                                                borderRight: 'solid 1px',
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
                                    <a style={{ fontSize: '22px' }} href='https://www.crmonde.com'>www.CRMonde.com</a>
                                </p>
                            </Col>
                        </Row>

                        <Row name='buttonsAndCheckboxes' >
                            <Col name='buttonAndCheckBoxCol' sm='12'>
                                <Row name='printButtonRow'>
                                    <Button color="success" onClick={this.callPrintFunction}>Print</Button>
                                </Row>
                            </Col>
                        </Row>

                    </Container>
                </Row>


            </Container >



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
        priceListItemList: state.priceList.priceListItemList,
        priceListDetailList: state.priceList.priceListDetailList
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Print);
