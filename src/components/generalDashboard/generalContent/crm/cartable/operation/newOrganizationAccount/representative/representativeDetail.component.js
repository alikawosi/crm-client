/* #region  [- imports -] */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, FormGroup, Input, Label, Form } from "reactstrap";
import { Table } from "antd";
import { AgGridReact } from "ag-grid-react";
import { getRepresentativeDetailFormData, postRepresentative, deleteRepresentative, resetProps } from '../../../../../../../../redux/infrastructure/representative/representative.action'
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';

/* #endregion */

class RepresentativeDetail extends PureComponent {

  /* #region  [- ctor -] */
  constructor(props) {
    super(props);

    this.state = {
      domainRef:this.props.domain,
      /* #region  [- Ag-gridDefiinitionStates -] */
      columnDefs: [
        {
          headerName: "ردیف",
          //headerCheckboxSelection: true,
          checkboxSelection: true,
          valueGetter: "node.rowIndex+1",
          cellClass: "locked-col",
          //pinned: "right",
          width: 100,
        },
        { headerName: "Id", field: "id", hide: true },
        { headerName: "نام", field: "title" },
        { headerName: "مخفف", field: "abbreviation" },
        { headerName: "واحد ", field: "category" },
        { headerName: "توضیحات ", field: "descriptionRow" },

      ],
      rowData: [],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
      overlayNoRowsTemplate:
        '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',

      /* #endregion */

      /* #region  [- Field -] */

      id: 0,
      organizationRef: this.props.representativeOrganizationId,
      representiveOrganizationRef: '',
      employeeRef: '',
      employeeName: '',
      personRef: '',
      descriptionRow: '',
      selectedRowKeys: [],
      rowIndex: '',
      /* #endregion */

      //Flags
      isEmployeeSwitchSelected: false,
      isOrganizationSwitchSelected: false,
      isAddButtonDisable: true,
      isDeleteButtonDisable: true,

      isPersonSelectHidden: false,
      isOrganizationSelectHidden: true,
      isEmployeeSelectHidden: true,

      isOrganizationEmployeeModalVisible: false

    }
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  async componentDidMount() {
    this.props.onRef(this);
    await this.getRepresentativeDetailFormData()
  }

  /* #endregion */

  /* #region  [- componentDidUpdate(prevProps) -] */
  componentDidUpdate() {
  }
  /* #endregion */


  /* #region  [- getRepresentativeDetailFormData() -] */
  getRepresentativeDetailFormData = async () => {
    let representativeDetailFormGetData = {
      organizationRef: parseInt(this.state.organizationRef)
    }
    await this.props.getRepresentativeDetailFormData(representativeDetailFormGetData);
  }
  /* #endregion */


  /* #region  [ - onGridReady - ] */
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    ;
  };
  /* #endregion */

  /* #region  [- onSelectedRow() -] */
  onSelectedRow = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    const len = selectedData.length;
    if (len === 0) {
      this.setState({
        id: 0,
        isDeleteButtonDisable: true,
      });
    }
    if (len === 1) {
      const picked = Object.keys(selectedData)[0];
      const pickedValue = selectedData[picked];
      this.setState({
        id: pickedValue.id
      })
      if (pickedValue.checkRefFlag === true) {
        this.setState({
          isDeleteButtonDisable: true,
        })
      }
      else {
        this.setState({
          isDeleteButtonDisable: false,

        })
      }



    }
  }
  /* #endregion */

  /* #region  [- onSelectionChanged(selectedRowKeys) -] */
  onSelectionChanged = (selectedRowKeys) => {
    let selectedId = selectedRowKeys[0];
    let selectedObject = this.props.representativeDetailEmployeeTitleList.filter(item => item.id === parseInt(selectedId));
    this.setState({
      id: selectedObject[0].id,
      isDeleteButtonDisable: false,

    })


    this.setState({ selectedRowKeys });
  }
  /* #endregion */

  /* #region  [- deselectAllRows() -] */
  deselectAllRows = async () => {
    await this.gridApi.deselectAll();
  };
  /* #endregion */

  /* #region  [- deselectGridRow() -] */
  deselectGridRow = () => {
    this.setState({
      id: 0,
      selectedRowKeys: [],
    })

  }
  /* #endregion */


  /* #region  [- handleSearch -] */

  handleSearch = (selectedKeys, confirm, dataIndex, clearFilters) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
      clearFilters: clearFilters
    });
  };

  /* #endregion */

  /* #region  [- handleReset -] */

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({
      searchText: "",
    });
  };

  /* #endregion */

  /* #region  [- inputHandleChange(event) -] */
  inputHandleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    switch (event.target.name) {
      case 'employeeRef':
        if (event.target.value !== '' && event.target.value !== "0") {
          var selectedEmployeeId = event.target.value;
          var employeeList = this.props.representativeDetailEmployeeTitleList.filter(item => item.id === parseInt(selectedEmployeeId));
          this.setState({
            isAddButtonDisable: false,
            employeeName: employeeList[0].fullName,
            personRef: employeeList[0].personRef
          })
        }
        else {
          this.setState({
            isAddButtonDisable: true
          })
        }
        break;

      default:
        break;
    }
  };
  /* #endregion */


  /* #region  [- add -] */

  add =async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    const { rowData } = this.state;
    const newData = {
      id: parseInt(this.state.employeeRef),
      organizationRef: parseInt(this.state.organizationRef),
      employeeName: this.state.employeeName,
      personRef: parseInt(this.state.personRef),
      descriptionRow: this.state.descriptionRow
    };
    this.setState({
      rowData: [...rowData, newData]
    });
    this.reset();

  };
  /* #endregion */

  /* #region  [- delete -] */

  delete =async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    const dataSource = [...this.state.rowData];
    var key = this.state.id
    this.setState({
      rowData: dataSource.filter((item) => item.id !== key),
    });
    this.reset();
  }

  /* #endregion */
  
  /* #region  [- send -] */
  send =async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.props.createRepresentativeDetailList(this.state.rowData)
  }
  /* #endregion */
  
  /* #region  [- reset -] */

  reset = () => {
    this.setState({
      isParentIdSelectHidden: true,
      isEmployeeSwitchSelected: false,
      isOrganizationSwitchSelected: false,
      isAddButtonDisable: true,
      isDeleteButtonDisable: true,
      representiveOrganizationRef: '',
      employeeRef: '',
      employeeName: '',
      descriptionRow: '',
    })
    this.deselectGridRow();
  }
  /* #endregion */


  /* #region  [- render() -] */

  render() {

    /* #region  [- const -] */

    /* #region  [- grid -] */
    const columns = [

      {
        dataIndex: "employeeRef",
        key: "employeeRef",
        width: 100,
      },

      {
        title: " نام کارمند",
        dataIndex: "employeeName",
        key: "employeeName",
        width: 100,
      },
      {
        title: " توضیحات",
        dataIndex: "descriptionRow",
        key: "descriptionRow",
        width: 100,
      },

    ];

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectionChanged,
      type: "radio",
    };

    /* #endregion */

    /* #region  [- combobox -] */
    const employee = this.props.representativeDetailEmployeeTitleList.map((item) => (
      <option key={item.id} value={item.id} >
        {item.fullName}
      </option>
    ));

    /* #endregion */

    /* #endregion */

    return (
      <Container fluid>

        <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
          <Col style={{ direction: 'rtl', textAlign: 'right' }}>
            <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>اعضا</span>
          </Col>
        </Row>
        <Form>
          <Row title='representiveDetailForm'>
            <Col>

              <Row title="employeeSelect" >

                <Col sm='6' title='selectEmployee'>
                  <FormGroup title="employeeSelect" style={{ textAlign: "right" }} >
                    <Label for="employeeRef">  نماینده کارمند  </Label>
                    <Row>
                      <Col sm='6'>
                        <Input
                          title='employeeName'
                          type="select"
                          name="employeeRef"
                          id="employeeRef"
                          onChange={this.inputHandleChange}
                          value={this.state.employeeRef}
                        >
                          <option value={0}>-- انتخاب کنید --</option>
                          {employee}
                        </Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>

              <Row title="descriptionRow">
                <Col sm='6'>
                  <FormGroup style={{ textAlign: "right" }}>
                    <Label for="descriptionRow">توضیحات</Label>
                    <Input
                      type="textarea"
                      name="descriptionRow"
                      id="descriptionRow"
                      placeholder="توضیحات"
                      height="500px"
                      onChange={this.inputHandleChange}
                      value={this.state.descriptionRow}
                    />
                  </FormGroup>
                </Col>

              </Row>

            </Col>
          </Row>
        </Form>
        <Row title="gridButtons">
          <Col sm="12" style={{ textAlign: "right" }}>
            <Button title="addButton" className="submit-button-style mr-2" disabled={this.state.isAddButtonDisable} onClick={this.add}  >{" "}ذخیره{" "}</Button>
            <Button title="deleteButton" className="submit-button-style mr-2" disabled={this.state.isDeleteButtonDisable} onClick={this.delete} >  حذف</Button>
          </Col>
        </Row>

        <Row title="grid" className="mt-2">
          {/* { AgGridReact  } */}
          <Col
            hidden={true}
            className="ag-theme-alpine"
            style={{ height: "60vh", width: "100%" }}
          >
            <AgGridReact
              onGridReady={this.onGridReady}
              columnDefs={this.state.columnDefs}
              rowData={this.props.representativeDetailEmployeeTitleList}
              enableRtl={true}
              overlayLoadingTemplate={this.state.overlayLoadingTemplate}
              overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
            ></AgGridReact>
          </Col>
          {/* { AntdGrid  } */}
          <Col
            hidden={false}
            className="ag-theme-balham"
            style={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              overflowY: "scroll",
            }}
          >
            <Table
              rowKey="id"
              rowSelection={rowSelection}
              dataSource={this.state.rowData}
              columns={columns}
              bordered
              pagination={false}
              size='small'
            />
          </Col>
        </Row>

      </Container>);
  }
  /* #endregion */

  /* #endregion */
}


/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
  return {

    representativeDetailEmployeeTitleList: state.representative.representativeDetailEmployeeTitleList,
    domain: state.auth.domain
  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({

  getRepresentativeDetailFormData: data => dispatch(getRepresentativeDetailFormData(data)),
  postRepresentative: data => dispatch(postRepresentative(data)),
  deleteRepresentative: data => dispatch(deleteRepresentative(data)),
  checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
  resetProps: data => dispatch(resetProps(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(RepresentativeDetail);































