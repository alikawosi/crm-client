/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col,  } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";


/* #endregion */

class Reason extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            /* #endregion */

            /* #region  [- ag-Grid -] */

            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },

            selectedReasonColumnDefs: [
               
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

    /* #region  [- onSelectedReasonGridReady -] */
    onSelectedReasonGridReady = params => {
        this.selectedReasonGridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ padding: '0 2%' }}>

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
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Reason);