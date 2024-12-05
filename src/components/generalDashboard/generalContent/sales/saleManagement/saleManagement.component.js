/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import SalesDashboardBox from "../../../../shared/common/salesDashboardBox/salesDashboardBox.component";
import { Container, Row, Col } from "reactstrap";
import { getDashboardReport } from "../../../../../redux/sales/dashboard/dashboard.action";
// import Funnel from '../../../../shared/common/funnelChart/funnel.component'
/* #endregion */

class SaleManagement extends PureComponent {
  /* #region  [- ctor -] */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /* #endregion */

  /* #region  [*** methods ***] */

  /* #region  [*** componentMethods ***] */

  /* #region  [- componentDidMount -] */
  componentDidMount() {
    this.getDashboardReport();
  }
  /* #endregion */

  /* #endregion */

  /* #region  [*** buttonTasks ***] */

  /* #endregion */

  /* #region  [*** handle Changes ***] */

  /* #endregion */

  /* #region  [*** api ***] */

  /* #region  [- getDashboardReport -] */
  getDashboardReport = () => {
    let data = {
      domainRef: this.props.domain,
    };

    this.props.getDashboardReport(JSON.stringify(data));
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- render -] */
  render() {
    return (
      <div style={{ padding: '0 2% 0 0'  ,height:'93vh',overflow:'hidden scroll'}}>
        <Row name="row_01_SalesDashboardBox" className="mt-3">
          <Col sm="12" lg="12" md="12">
            <Row sm="12" lg="12" md="12">
              <Col name="priceList" sm="3" lg="3" md="3">
                <SalesDashboardBox
                  mainCardBackgroundColor="#FBCD57"
                  subCardBackgroundColor="#FFF2CC"
                  cardTitle="لیست قیمت"
                  sum={this.props.registeredPriceListQuantity}
                  sumInsertedFlow={this.props.registeredPriceListQuantity}
                  sumConfirmingFlow=""
                  sumConfirmedFlow=""
                  sumRejectedFlow=""
                  sumTodayInsertedFlow={
                    this.props.todayRegisteredPriceListQuantity
                  }
                  sumTodayConfirmingFlow=""
                  sumTodayConfirmedFlow=""
                  sumTodayRejectedFlow=""
                />
              </Col>

              <Col name="quote" sm="3" lg="3" md="3">
                <SalesDashboardBox
                  mainCardBackgroundColor="#ff9b45"
                  subCardBackgroundColor="#f7ceaa"
                  cardTitle="پیش فاکتور"
                  sum={this.props.registeredQuoteQuantity}
                  sumInsertedFlow={this.props.registeredQuoteQuantity}
                  sumConfirmingFlow=""
                  sumConfirmedFlow=""
                  sumRejectedFlow=""
                  sumTodayInsertedFlow={this.props.todayRegisteredQuoteQuantity}
                  sumTodayConfirmingFlow=""
                  sumTodayConfirmedFlow=""
                  sumTodayRejectedFlow=""
                />
              </Col>

              <Col name="order" sm="3" lg="3" md="3">
                <SalesDashboardBox
                  mainCardBackgroundColor="#5288BD"
                  subCardBackgroundColor="#BDD7EE"
                  cardTitle="سفارش"
                  sum={this.props.registeredOrderQuantity}
                  sumInsertedFlow={this.props.registeredOrderQuantity}
                  sumConfirmingFlow=""
                  sumConfirmedFlow=""
                  sumRejectedFlow=""
                  sumTodayInsertedFlow={this.props.todayRegisteredOrderQuantity}
                  sumTodayConfirmingFlow=""
                  sumTodayConfirmedFlow=""
                  sumTodayRejectedFlow=""
                />
              </Col>

              <Col name="invoice" sm="3" lg="3" md="3">
                <SalesDashboardBox
                  mainCardBackgroundColor="#4E9F3C"
                  subCardBackgroundColor="#C5E0B3"
                  cardTitle="فاکتور"
                  sum={this.props.registeredInvoiceQuantity}
                  sumInsertedFlow={this.props.registeredInvoiceQuantity}
                  sumConfirmingFlow=""
                  sumConfirmedFlow=""
                  sumRejectedFlow=""
                  sumTodayInsertedFlow={
                    this.props.todayRegisteredInvoiceQuantity
                  }
                  sumTodayConfirmingFlow=""
                  sumTodayConfirmedFlow=""
                  sumTodayRejectedFlow=""
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* 
                <Row>
                    <Funnel />
                </Row> */}
        <Row name="row_02_Reports" className="mt-3">
          <Col
            name="salesFunnel"
            sm="3"
            style={{ height: "500px", margin: "0" }}
          >
            <Row style={{ margin: "0", backgroundColor: "white" }}>
              <Col name="colorChart" sm="12" style={{ height: "300" }}>
                <Col name="colorChart" sm="12" style={{ height: "100px" }}>
                  <Row name="lead">
                    <Col
                      sm="12"
                      style={{ textAlign: "right", paddingRight: "0" }}
                    >
                      <span
                        style={{
                          fontSize: "30px",
                          color: "#6682bb",
                          width: "300px",
                          textAlign: "right",
                        }}
                      >
                        &#9632;
                        <span style={{ fontSize: "13px", paddingRight: "2%" }}>
                          سرنخ
                        </span>
                      </span>
                    </Col>
                  </Row>

                  <Row name="opportunity">
                    <Col
                      sm="12"
                      style={{ textAlign: "right", paddingRight: "0" }}
                    >
                      <span
                        style={{
                          fontSize: "30px",
                          color: "#a37182",
                          width: "300px",
                          textAlign: "right",
                        }}
                      >
                        &#9632;
                        <span
                          className="opportunityResponsive"
                          style={{ fontSize: "13px", paddingRight: "2%" }}
                        >
                          فرصت تجاری
                        </span>
                      </span>
                    </Col>
                  </Row>

                  <Row name="account">
                    <Col
                      sm="12"
                      style={{ textAlign: "right", paddingRight: "0" }}
                    >
                      <span
                        style={{
                          fontSize: "30px",
                          color: "#eeba69",
                          width: "300px",
                          textAlign: "right",
                        }}
                      >
                        &#9632;
                        <span style={{ fontSize: "13px", paddingRight: "2%" }}>
                          مشتری
                        </span>
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Col>

              <Col
                name="funnelChart"
                sm="12"
                style={{ height: "500px", margin: "0" }}
              >
                <Row
                  style={{
                    backgroundColor: "rgb(102, 130, 187)",
                    height: "80px",
                    margin: "30% 10% 0 10%",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "20px",
                      padding: "15% 50%",
                    }}
                  >
                    {this.props.leadQuantity}
                  </span>
                </Row>
                <Row
                  style={{
                    backgroundColor: "rgb(163, 113, 130)",
                    height: "80px",
                    margin: "0 20% 0 20%",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "20px",
                      padding: "15% 50%",
                    }}
                  >
                    {this.props.opportunityQuantity}
                  </span>
                </Row>
                <Row
                  style={{
                    backgroundColor: "rgb(238, 186, 105)",
                    height: "80px",
                    margin: "0 30% 0 30%",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "20px",
                      padding: "20% 50%",
                    }}
                  >
                    {this.props.accountQuantity}
                  </span>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col name="reports" sm="9">
            <Row name="reports">
              <Col
                name="performance"
                sm="4"
                style={{ height: "200px", margin: "0" }}
              >
                <Row style={{ height: "200px", margin: "0" }}>
                  <Col
                    sm="12"
                    style={{ backgroundColor: "#2E75B5", paddingTop: "20%" }}
                  >
                    <span style={{ color: "white", fontSize: "25px" }}>
                      عملکرد کارشناس
                    </span>
                  </Col>
                </Row>
              </Col>

              <Col
                name="checkReport"
                sm="4"
                style={{ height: "200px", margin: "0" }}
              >
                <Row style={{ height: "200px", margin: "0" }}>
                  <Col
                    sm="12"
                    style={{ backgroundColor: "#A8D08D", paddingTop: "20%" }}
                  >
                    <span style={{ color: "white", fontSize: "25px" }}>
                      گزارش سررسید چک
                    </span>
                  </Col>
                </Row>
              </Col>

              <Col
                name="customerBalance"
                sm="4"
                style={{ height: "200px", margin: "0" }}
              >
                <Row style={{ height: "200px", margin: "0" }}>
                  <Col
                    sm="12"
                    style={{ backgroundColor: "#007F7F", paddingTop: "20%" }}
                  >
                    <span style={{ color: "white", fontSize: "25px" }}>
                      تراز مشتریان
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row name="OpportunityCard" style={{ padding: "2%" }}>
              <Col
                sm="12"
                style={{
                  border: "solid 1px #ced3d6",
                  height: "170px",
                  backgroundColor: "white",
                }}
              >
                <Col sm="12" style={{ paddingTop: "1%" }}>
                  <h6 style={{ textAlign: "right", fontSize: "20px" }}>
                    فرصت تجاری
                  </h6>
                </Col>
                <Col
                  sm="12"
                  style={{
                    border: "solid 1px #ced3d6",
                    height: "100px",
                    backgroundColor: "#eceff1",
                    margin: "2% 0 0 0 ",
                  }}
                ></Col>
              </Col>
            </Row>

            <Row name="LeadCard" style={{ padding: "0 2% 2% 2%" }}>
              <Col
                sm="12"
                style={{
                  border: "solid 1px #ced3d6",
                  height: "170px",
                  backgroundColor: "white",
                }}
              >
                <Col sm="12" style={{ paddingTop: "1%" }}>
                  <h6 style={{ textAlign: "right", fontSize: "20px" }}>سرنخ</h6>
                </Col>
                <Col
                  sm="12"
                  style={{
                    border: "solid 1px #ced3d6",
                    height: "100px",
                    backgroundColor: "#eceff1",
                    margin: "2% 0 0 0 ",
                  }}
                ></Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
  /* #endregion */

  /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
  return {
    domain: state.auth.domain,
    accountQuantity: state.salesDashboard.accountQuantity,
    leadQuantity: state.salesDashboard.leadQuantity,
    opportunityQuantity: state.salesDashboard.opportunityQuantity,
    registeredInvoiceQuantity: state.salesDashboard.registeredInvoiceQuantity,
    registeredOrderQuantity: state.salesDashboard.registeredOrderQuantity,
    registeredPriceListQuantity:
      state.salesDashboard.registeredPriceListQuantity,
    registeredQuoteQuantity: state.salesDashboard.registeredQuoteQuantity,
    todayRegisteredInvoiceQuantity:
      state.salesDashboard.todayRegisteredInvoiceQuantity,
    todayRegisteredOrderQuantity:
      state.salesDashboard.todayRegisteredOrderQuantity,
    todayRegisteredPriceListQuantity:
      state.salesDashboard.todayRegisteredPriceListQuantity,
    todayRegisteredQuoteQuantity:
      state.salesDashboard.todayRegisteredQuoteQuantity,
  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
  getDashboardReport: (data) => dispatch(getDashboardReport(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(SaleManagement);
