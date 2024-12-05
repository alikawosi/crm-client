/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col,  Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Modal } from 'antd';
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import Intersections from './intersection.component'
import {
    saveSalesReturnReason
} from "../../../../../../../../redux/sales/invoice/salesReturn/salesReturn.action"

/* #endregion */

class Reason extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isSaveDisabled: true,
            isIntersectionVisible: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */

            reasonColumnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row"
                },
                { headerName: 'نام', field: "title", },
                { headerName: 'توضیحات', field: "descriptionRow", colId: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },

            selectedReasonColumnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row"
                },
                { headerName: 'نام', field: "title", },
                { headerName: 'توضیحات', field: "descriptionRow", colId: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],
            /* #endregion */

            /* #region  [- dbField -] */

            /* #endregion */

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- list -] */
            intersections: [],
            selectedReasonList: [],
            /* #endregion */


        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.setState({
            selectedReasonList: this.props.selectedReasonList.filter(x => x.productId === this.props.productId)
        })
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onSelectedReasonGridReady -] */
    onSelectedReasonGridReady = params => {
        this.selectedReasonGridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.onCancelProductReason()
    }
    /* #endregion */

    /* #region  [- save -] */
    save = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)

        let selectedList = [...this.state.selectedReasonList]
        let intersectionsList = []
        selectedData.forEach(element => {
            let len = Object.keys(this.state.selectedReasonList.filter(x => x.id === element.id)).length
            if (len === 0) {
              let  data = {
                    productId: this.props.productId,
                    id: element.id,
                    title: element.title,
                    descriptionRow: element.descriptionRow,

                }
                selectedList.push(data)
            }
            else if (len === 1) {
                intersectionsList.push(element)
            }
        });
        if (Object.keys(intersectionsList).length > 0) {
            this.setState({
                modalComponent: <Intersections intersections={intersectionsList} headerTitle="علت بازگشتی انتخاب شده در لیست انتخاب شده ها موجود می باشد." />,
                isIntersectionVisible: true
            })
        }
       
            this.setState({
                isSaveDisabled: true,
                selectedReasonList: selectedList,
            })
            this.selectedReasonGridApi.setRowData(selectedList)
            this.gridApi.deselectAll()

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        const selectedNodes = this.selectedReasonGridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        let list = [...this.state.selectedReasonList]
        selectedData.forEach(element => {
          list=  list.filter(x => x.id !== element.id)
        });
        this.setState({
            isDeleteDisabled: true,
            selectedReasonList: list,
        })
        this.selectedReasonGridApi.setRowData(list)
        this.selectedReasonGridApi.deselectAll()
    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        let list=[...this.props.selectedReasonList.filter(x=>x.productId!==this.props.productId)]
        this.state.selectedReasonList.forEach(element => {
            list.push(element)
        });
        await this.props.saveSalesReturnReason(list)
        this.cancel();
    }
    /* #endregion */

    /* #region  [- onCancelIntersection -] */
    onCancelIntersection = () => {
        this.setState({
            isIntersectionVisible: false,
            modalComponent:<div></div>
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- onSelectionChangedReason -] */
    onSelectionChangedReason = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData.length === 0) {
            this.setState({
                isSaveDisabled: true
            })
        }
        else {
            this.setState({
                isSaveDisabled: false
            })
        }
    }
    /* #endregion */

    /* #region  [- onSelectionChangedSelectedReason -] */
    onSelectionChangedSelectedReason = async () => {
        const selectedNodes = this.selectedReasonGridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData.length === 0) {
            this.setState({
                isDeleteDisabled: true
            })
        }
        else {
            this.setState({
                isDeleteDisabled: false
            })
        }
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_02_ReasonGrid' >
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.reasonColumnDefs}
                            onGridReady={this.onGridReady}
                            rowSelection="multiple"
                            rowData={this.props.reasonsSalesReturnList}
                            onSelectionChanged={this.onSelectionChangedReason}
                            localeText={AG_GRID_LOCALE_FA}
                        />

                    </Col>
                </Row>

                <Row name='row_04_ButtonsAndResult'>
                    <Col sm="12" md="12" lg="8" name='col-01-Buttons' style={{ textAlign: 'right', marginTop: '1%' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} disabled={this.state.isSaveDisabled}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>


                </Row>

                <Row name='row_05_SelectedReasonGrid'>

                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            enableRtl={true}
                            columnDefs={this.state.selectedReasonColumnDefs}
                            onGridReady={this.onSelectedReasonGridReady}
                            rowData={this.state.selectedReasonList}
                            rowSelection='multiple'
                            onSelectionChanged={this.onSelectionChangedSelectedReason}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        />

                    </Col>

                </Row>

                <Row name='row_06_SubmitButton'>
                    <Col sm='12' md='12' lg='12' style={{ margin: '4% 0 2% 0' }}>

                        <Button color="secondary" onClick={this.cancel} style={{ marginLeft: '2%' }}>
                            لغو
                        </Button>
                        <Button color="success" onClick={this.submit} >
                            ثبت
                        </Button>
                    </Col>
                </Row>


                <Row name='row_07_Modals'>

                    <Modal name="show intersections"
                        closable={true}
                        maskClosable={false}
                        width='600px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isIntersectionVisible}
                        onOk={this.onCancelIntersection}
                        onCancel={this.onCancelIntersection}
                        cancelButtonProps={{ style: { display: 'none' } }}

                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>خطا</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

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
        reasonsSalesReturnList: state.salesReturn.reasonsSalesReturnList,
        selectedReasonList: state.salesReturn.selectedReasonList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    saveSalesReturnReason: (data) => dispatch(saveSalesReturnReason(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Reason);