/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Row, Col, Button } from "reactstrap";
import GridSourceButton from './gridSourceButton.component'
import GridTargetButton from './gridTargetButton.component'
import GridFileAttachmentButton from './gridFileAttachmentButton.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { getTimeline, saveIsDeleteButonDisabled, saveTimelineIdList, saveTimelineCellRendererRowId,getTimelineSourceList,getTimelineTargetList } from '../../../../../../redux/sales/quote/timeline/timeline.action'
import TimelineCRMFile from './timelineCRMFile.component'
import { Modal } from 'antd'
import PartyCellRenderer from './partyCellRenderer.component'
import Source from './source/source.component'
import Target from './target/target.component'
/* #endregion */

class TimelineCellRenderer extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);

        this.state = {

            /* #region  [- agGrid -] */
            columnDefs: [
                {
                   // cellRenderer: "agGroupCellRenderer",
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                },
                { headerName: 'کد', field: "code" },
                { headerName: 'نوع', field: "timelineType" },
                { headerName: 'عنوان', field: "title" },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'زمان ثبت', field: "nativeTimeCreated" },
                { headerName: 'سند ریشه', field: "timelineType", cellRenderer: "gridSourceButton", },
                { headerName: 'سند نتیجه', field: "timelineType", cellRenderer: "gridTargetButton", },
                { headerName: 'کاربر', field: "userName" },
                { headerName: 'توضیحات', field: "descriptionRow" },
                { headerName: 'فایل پیوست', field: "attachment", cellRenderer: "gridFileAttachmentButton", width: 200 },
                { headerName: "latinDateCreated", field: "latinDateCreated",sort:'desc' ,hide:true},
            ],
            gridOptions: {
               // detailRowHeight: 200,
                detailCellRenderer: 'partyCellRenderer',
                context: { componentParent: this },
                frameworkComponents: {
                    gridSourceButton: GridSourceButton,
                    gridTargetButton: GridTargetButton,
                    gridFileAttachmentButton: GridFileAttachmentButton,
                    partyCellRenderer: PartyCellRenderer,
                },
                detailRowAutoHeight: true,
                domLayout:'autoHeight'
            },
            isRowSelectable: function (rowNode) { return rowNode.data.checkTypeFlag === 'true' ? true : false },
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

            isSourceModalVisible: false,
            isSourceModalDestroy: true,

            isTargetModalVisible: false,
            isTargetModalDestroy: true,
            /* #endregion */

        };
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.getTimeline();
        this.props.saveTimelineCellRendererRowId(this.state.rowId)
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

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length
        let list = []
        if (len === 0) {
            this.props.saveIsDeleteButonDisabled(true)
            this.props.saveTimelineIdList(list)
        }
        else {

            selectedData.map(x => {
                list.push({
                    id: x.id
                })
            })
            this.props.saveIsDeleteButonDisabled(false)
            this.props.saveTimelineIdList(list)
        }

    }
    /* #endregion */

    /* #region  [- showSourceDetails -] */
    showSourceDetails = async (data) => {
         await this.props.getTimelineSourceList(data);
        this.setState({
            isSourceModalVisible: true,
            isSourceModalDestroy: false,
            modalComponent: <Source />,
        })
    }
    /* #endregion */

    /* #region  [- showTargetDetails -] */
    showTargetDetails = async (data) => {
        await this.props.getTimelineTargetList(data);
       this.setState({
           isTargetModalVisible: true,
           isTargetModalDestroy: false,
           modalComponent: <Target />,
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

    /* #region  [- onCloseSourceModal -] */
    onCloseSourceModal = () => {
        this.setState({
            isSourceModalVisible: false,
            isSourceModalDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */

    /* #region  [- onCloseTargetModal -] */
    onCloseTargetModal = () => {
        this.setState({
            isTargetModalVisible: false,
            isTargetModalDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getTimeline -] */
    getTimeline = async () => {
        let timelineGetData = {
            quoteRef: this.state.rowId
        }

        await this.props.getTimeline(JSON.stringify(timelineGetData))
        return this.props.timelineList
    }
    /* #endregion */

    /* #region  [- getTimelineSourceList -] */
    getTimelineSourceList = async (timelineSourceGetData) => {
        await this.props.getTimelineSourceList(JSON.stringify(timelineSourceGetData))
    }
    /* #endregion */

    /* #region  [- getTimelineTargetList -] */
    getTimelineTargetList = async (timelineTargetGetData) => {
        await this.props.getTimelineTargetList(JSON.stringify(timelineTargetGetData))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <Container fluid >

                <div name='div_01_agGrid' className="ag-theme-alpine" style={{ width: '100%', padding: '2%', marginBottom: '3%', overflowY: 'scroll !important' }}>
                    <AgGridReact
                        id="detailGrid1"
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.props.timelineList}
                        modules={AllModules}
                        onGridReady={this.onGridReady}
                        enableRtl={true}
                        localeText={AG_GRID_LOCALE_FA}
                        rowSelection='single'
                        masterDetail={true}
                        gridOptions={this.state.gridOptions}
                        onSelectionChanged={this.onSelectionChanged}
                        isRowSelectable={this.state.isRowSelectable}

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

                    <Modal name='source'
                        visible={this.state.isSourceModalVisible}
                        width={1200}
                        destroyOnClose={this.state.isSourceModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSourceModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseSourceModal}>لغو</Button>
                        ]}
                    >

                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>سند ریشه</span>
                                </Col>
                            </Row>
                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name='target'
                        visible={this.state.isTargetModalVisible}
                        width={1200}
                        destroyOnClose={this.state.isTargetModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseTargetModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseTargetModal}>لغو</Button>
                        ]}
                    >

                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>سند نتیجه</span>
                                </Col>
                            </Row>
                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    {this.state.modalComponent}
                                </Col>
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
        timelineList: state.quoteTimeline.timelineList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getTimeline: (data) => dispatch(getTimeline(data)),
    saveIsDeleteButonDisabled: (data) => dispatch(saveIsDeleteButonDisabled(data)),
    saveTimelineIdList: (data) => dispatch(saveTimelineIdList(data)),
    saveTimelineCellRendererRowId: (data) => dispatch(saveTimelineCellRendererRowId(data)),
    getTimelineSourceList: (data) => dispatch(getTimelineSourceList(data)),
    getTimelineTargetList: (data) => dispatch(getTimelineTargetList(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(TimelineCellRenderer);