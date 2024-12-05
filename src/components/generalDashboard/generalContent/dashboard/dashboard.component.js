import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import './dashboard.component.css';
import DashboardBox from '../../../shared/common/dashboardBox/dashboardBox.component';


class Dashboard extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    /* #endregion */

    render() {
        return (
            <div  style={{overflowY:'scroll',overflowX:'hidden',height:'93vh'}}>
                <Row className='mt-3'>
                    <Col sm='3'>
                        <DashboardBox color='#17a2b8' directiom='rtl' textAlign='center' title='سفارشات جدید' number='150' fabricIconName='ShoppingCart' />
                    </Col>
                    <Col sm='3'>
                        <DashboardBox color='#28a745' directiom='rtl' textAlign='center' title='افزایش امتیاز' number='53' fabricIconName='BarChartVertical' />
                    </Col>
                    <Col sm='3'>
                        <DashboardBox color='#ffc107' directiom='rtl' textAlign='center' title='کاربران ثبت شده' number='44' fabricIconName='AddFriend' />
                    </Col>
                    <Col sm='3' style={{ textAlign: 'center' }}>
                        <DashboardBox color='#dc3545' directiom='rtl' textAlign='center' title='بازدید جدید' number='65' fabricIconName='PieSingle' />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header" style={{ display: 'flex' }}>
                                <h5 className="card-title crm-persian-font">گزارش ماهیانه</h5>

                                <div className="card-tools" style={{ marginRight: 'auto' }}>
                                    <button type="button" className="btn btn-tool" data-widget="collapse">
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                            <i className="fa fa-wrench"></i>
                                        </button>
                                    </div>
                                    <button type="button" className="btn btn-tool" data-widget="remove">
                                        <i className="fa fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <p className="text-center">
                                            <strong>فروش ۱ دی ۱۳۹۷</strong>
                                        </p>

                                        <div className="chart">

                                            {/* <canvas id="salesChart" height="180" style={{height: '180px'}}></canvas> */}
                                            {/* Chart */}
                                        </div>

                                    </div>

                                    <div className="col-md-4">
                                        <p className="text-center">
                                            <strong>میزان پیشرفت اهداف</strong>
                                        </p>

                                        <div className="progress-group">
                                            محصولات اضافه شده به سبد خرید
                      <span className="float-left"><b>160</b>/200</span>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-primary" style={{ width: '80%' }}></div>
                                            </div>
                                        </div>

                                        <div className="progress-group">
                                            خرید انجام شده
                      <span className="float-left"><b>310</b>/400</span>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-danger" style={{ width: '75%' }}></div>
                                            </div>
                                        </div>


                                        <div className="progress-group">
                                            <span className="progress-text">بازدید صفحات ویژه</span>
                                            <span className="float-left"><b>480</b>/800</span>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-success" style={{ width: '60%' }}></div>
                                            </div>
                                        </div>


                                        <div className="progress-group">
                                            سوالات ارسالی
                      <span className="float-left"><b>250</b>/500</span>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-warning" style={{ width: '50%' }}></div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-sm-3 col-6">
                                        <div className="description-block border-right">
                                            <span className="description-percentage text-success"><i className="fa fa-caret-up"></i> 17%</span>
                                            <h5 className="description-header">تومان 35,210.43</h5>
                                            <span className="description-text">کل گردش حساب</span>
                                        </div>

                                    </div>

                                    <div className="col-sm-3 col-6">
                                        <div className="description-block border-right">
                                            <span className="description-percentage text-warning"><i className="fa fa-caret-left"></i> 0%</span>
                                            <h5 className="description-header">تومان 10,390.90</h5>
                                            <span className="description-text">فروش کل</span>
                                        </div>

                                    </div>

                                    <div className="col-sm-3 col-6">
                                        <div className="description-block border-right">
                                            <span className="description-percentage text-success"><i className="fa fa-caret-up"></i> 20%</span>
                                            <h5 className="description-header">تومان 24,813.53</h5>
                                            <span className="description-text">سود کل</span>
                                        </div>

                                    </div>

                                    <div className="col-sm-3 col-6">
                                        <div className="description-block">
                                            <span className="description-percentage text-danger"><i className="fa fa-caret-down"></i> 18%</span>
                                            <h5 className="description-header">1200</h5>
                                            <span className="description-text">اهداف</span>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </Row>
                <Row className='mt-3'>
                    <div className='col-sm-8'>
                        <div className="card">
                            <div className="card-header" style={{ display: 'flex' }}>
                                <h3 className="card-title crm-persian-font">گزارش بازدیدها</h3>
                                <div className="card-tools crm-persian-font" style={{ marginRight: 'auto' }}>
                                    <button type="button" className="btn btn-tool" data-widget="collapse">
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    <button type="button" className="btn btn-tool" data-widget="remove">
                                        <i className="fa fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="d-md-flex" style={{direction:'rtl'}}>
                                    <div className="p-1 flex-1" style={{ overflow: 'hidden' }}>
                                        {/*Chart */}
                                        {/* <div id="world-map-markers" style={{height:'325px',overflow:'hidden'}}></div> */}
                                    </div>
                                    <div className="card-pane-right bg-success pt-2 pb-2 pl-4 pr-4" style={{marginRight:'auto'}}>
                                        <div className="description-block mb-4">
                                            {/* <div className="sparkbar pad" data-color="#fff">90,70,90,70,75,80,70</div> */}
                                            <h5 className="description-header mt-2">8390</h5>
                                            <span className="description-text">بازدیدها</span>
                                        </div>
                                        <div className="description-block mb-4">
                                            {/* <div className="sparkbar pad" data-color="#fff">90,50,90,70,61,83,63</div> */}
                                            <h5 className="description-header mt-2">30%</h5>
                                            <span className="description-text">ارجاعات</span>
                                        </div>
                                        <div className="description-block">
                                            {/* <div className="sparkbar pad" data-color="#fff">90,50,90,70,61,83,63</div> */}
                                            <h5 className="description-header mt-2">70%</h5>
                                            <span className="description-text">یکتا</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className="info-box mb-3 bg-warning">
                            <span className="info-box-icon"><i className="fa fa-tag"></i></span>
                            <div className="info-box-content">
                                <span className="info-box-text">فهرست</span>
                                <span className="info-box-number">5,200</span>
                            </div>
                        </div>
                        <div className="info-box mb-3 bg-success">
                            <span className="info-box-icon"><i className="fa fa-heart-o"></i></span>
                            <div className="info-box-content">
                                <span className="info-box-text">برگزیده‌ها</span>
                                <span className="info-box-number">92,050</span>
                            </div>
                        </div>
                        <div className="info-box mb-3 bg-danger">
                            <span className="info-box-icon"><i className="fa fa-cloud-download"></i></span>
                            <div className="info-box-content">
                                <span className="info-box-text">دانلود</span>
                                <span className="info-box-number">114,381</span>
                            </div>
                        </div>
                        <div className="info-box mb-3 bg-info">
                            <span className="info-box-icon"><i className="fa fa-comment-o"></i></span>
                            <div className="info-box-content">
                                <span className="info-box-text">پیام مستقیم</span>
                                <span className="info-box-number">163,921</span>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        )
    }
}



export default Dashboard;