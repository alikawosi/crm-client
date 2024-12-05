/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Row, Col } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { getPartyDetail } from '../../../../../../redux/sales/invoice/timeline/timeline.action'
import TimelineCRMFile from './timelineCRMFile.component'
import {Modal } from 'antd'

/* #endregion */

class PartyCellRenderer extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);

        this.state = {

            /* #region  [- agGrid -] */
            columnDefs: [
                {
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: false,
                    cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    width:80
                },
                { headerName: 'نوع فعالیت', field: "activityTypeTitle" },
                { headerName: 'کد سند', field: "code" },
            ],
      
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            rowId: props.node.data.id,
            masterGridApi: props.api,
            /* #endregion */

            /* #region  componentFields */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */

            isTimelineCRMFileModalDestroy: true,
            isTimelineCRMFileModalVisible: false,
            /* #endregion */

        };
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.getPartyDetail();
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = params => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
    /* #endregion */

    /* #region  [- showCRMFileModal -] */
    showCRMFileModal = async () => {
        this.setState({
            isTimelineCRMFileModalDestroy: false,
            isTimelineCRMFileModalVisible: true,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [ - onCancelTimelineCRMFileModal - ] */
    onCancelTimelineCRMFileModal = () => {
        this.setState({
            isTimelineCRMFileModalDestroy: true,
            isTimelineCRMFileModalVisible: false
        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getPartyDetail -] */
    getPartyDetail = async () => {
        let partyGetData = {
            timelineRef: this.state.rowId
        }

        await this.props.getPartyDetail(JSON.stringify(partyGetData))
        return this.props.partyDetailList
    }
    /* #endregion */


    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <Container fluid >

                <div name='div_01_agGrid' className="ag-theme-alpine" style={{ width: '100%', padding: '2%', marginBottom: '3%', overflowY: 'scroll !important' }}>
                    <AgGridReact
                        id="detailGrid"
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.props.partyDetailList}
                        onGridReady={this.onGridReady}
                        enableRtl={true}
                        localeText={AG_GRID_LOCALE_FA}
                        rowSelection='single'
                        onSelectionChanged={this.onSelectionChanged}
                        domLayout='autoHeight'
                    />

                </div>

                <Row name='row_02_modals'>

                    <Modal name="crmFileItem"
                        destroyOnClose={this.state.isTimelineCRMFileModalDestroy}
                        width="800px"
                        visible={this.state.isTimelineCRMFileModalVisible}
                        onCancel={this.onCancelTimelineCRMFileModal}
                        footer={null}
                        closable={true}
                        maskClosable={false}

                    >
                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>پیوست ها</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <TimelineCRMFile />
                            </Row>
                        </Container>

                    </Modal>

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
        partyDetailList: state.invoiceTimeline.partyDetailList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPartyDetail: (data) => dispatch(getPartyDetail(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(PartyCellRenderer);