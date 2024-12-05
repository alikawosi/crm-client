/* #region  [- imports] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { Drawer, Avatar, Space, Modal, } from "antd";
import { Button as AntdButton, Input as AntdInput } from "antd";
import {  SearchOutlined } from '@ant-design/icons';
import Notification from "../../../../../shared/common/notification/notification.component";
import { getOrganization, getOrganizationItem, postOrganization, deleteOrganization, resetProps } from '../../../../../../redux/infrastructure/organization/organization.action'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./legalPerson.component.css";
import NewLegalPerson from "./newLegalPerson.component";
import EditLegalPerson from "./editLegalPerson.component";
import ExcelImport from '../../../../../shared/common/excelImport/excelImport.component'
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
/* #endregion */

class LegalPerson extends PureComponent {

  /* #region  [- ctor -] */

  constructor(props) {
    super(props);

    this.state = {
      domainRef: this.props.domain,
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
        //{ headerName: "Id", field: "id", hide: true },
        { headerName: "کد", field: "code" },
        { headerName: "نام", field: "title" },
        { headerName: "مخفف", field: "abbreviation" },
        { headerName: "نام ثبتی", field: "registrationTitle" },
        { headerName: "تاریخ تاسیس", field: "nativeEstablishmentDate" },
        { headerName: "شناسه ملی", field: "nationalId" },
        { headerName: "تاریخ ثبتی", field: "nativeRegistrationDate" },
        { headerName: "کد اقتصادی", field: "economicCode" },
        { headerName: "موضوع فعالیت", field: "organizationSubject" },
        { headerName: "زمینه کاری", field: "workField" },
        { headerName: "اندازه سازمان", field: "organizationScale" },
        { headerName: "تلفن", field: "tel" },
        { headerName: "فکس", field: "fax" },
        { headerName: "وبسایت", field: "website" },
        //{ headerName: "عکس", field: "personalImage", hide: true },
        { headerName: "ایمیل", field: "email" },
        //{ headerName: "آواتار", field: "avatar", hide: true },
        { headerName: "کد پستی", field: "postalCode" },
        { headerName: "آدرس", field: "organizationAddress" },
      ],
      rowData: [],
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
      },
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
      overlayNoRowsTemplate:
        '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',

      /* #endregion */

      /* #region  [- statesForNewDrawer -] */
      isNewDrawerVisible: false,
      newDrawerContent: <div></div>,
      /* #endregion */

      /* #region  [- statesForEditDrawer -] */
      isEditDrawerVisible: false,
      editDrawerContent: <div></div>,
      /* #endregion */

      deleteModalInputValue: '',
      id: 0,
      parentId: '',
      title: '',
      clearFilters: null,
      selectedRowKeys: [],
      searchText: '',
      searchedColumn: '',

      //Flags
      isDeleteButtonDisable: true,
      isEditButtonDisable: true,
      isDeleteModalVisible: false,
      isModalDeleteButtonDisable: true,
      isPrintModalVisible: false,
      isExcelImportModalVisible: false,

      isNewHidden: true,
      isEditHidden: true,
      isDeleteHidden: true,
      isRefreshHidden: true,
      isExcelHidden: true,
      isPrintHidden: true,
    };
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  componentDidMount() {
    this.getOrganization();
    this.accessToMenu(this.props.userMenuAccessList);
  }
  /* #endregion */

  /* #region  [- accessToMenu -] */
  accessToMenu = (data) => {
    if (data.includes("29")) {
      this.setState({
        isNewHidden: false
      })
    }
    if (data.includes("31")) {
      this.setState({
        isEditHidden: false
      })
    }
    if (data.includes("34")) {
      this.setState({
        isDeleteHidden: false
      })
    }
    if (data.includes("36")) {
      this.setState({
        isPrintHidden: false
      })
    }
    if (data.includes("37")) {
      this.setState({
        isExcelHidden: false
      })
    }
  }
  /* #endregion */

  /* #region  [- componentDidUpdate(prevProps) -] */
  componentDidUpdate(prevProps) {
    if (this.props.message !== prevProps.message) {
      if (this.props.message === "ذخیره با موفقیت انجام شد.") {
        Notification("bottomLeft", this.props.message, "success");
        this.props.resetProps();
      } else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
        Notification("bottomLeft", this.props.message, "success");
        this.props.resetProps();
      } else if (this.props.message === "حذف با موفقیت انجام شد.") {
        Notification("bottomLeft", this.props.message, "success");
        this.props.resetProps();
      } else if (this.props.message === "Successfully Set.") {
        Notification("bottomLeft", this.props.message, "success");
        this.props.resetProps();
      } else if (this.props.message === "پیدا نشد.") {
        Notification("bottomLeft", this.props.message, "error");
        this.props.resetProps();
      } else if (this.props.message === "خطایی رخ داده است.") {
        Notification("bottomLeft", this.props.message, "error");
        this.props.resetProps();
      }
    }
    this.setState({
      rowData: this.props.organizationList
    })
  }
  /* #endregion */


  /* #region  [- getOrganization() -] */
  getOrganization = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    let organizationGetData = {
      domainRef: parseInt(this.state.domainRef)
    }
    await this.props.getOrganization(organizationGetData);
  }
  /* #endregion */

  /* #region  [- getOrganizationItem() -] */
  getOrganizationItem = async () => {
    let organizationItemGetData = {
      organizationId: this.state.id,
      domainRef: parseInt(this.state.domainRef),

    }
    await this.props.getOrganizationItem(organizationItemGetData);
  }
  /* #endregion */

  /* #region  [- deleteOrganization() -] */
  deleteOrganization = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    let organizationDeleteData = {
      organizationIdList: [
        {
          id: this.state.id
        }
      ]
    }
    await this.props.deleteOrganization(organizationDeleteData);
  }
  /* #endregion */

  /* #region  [- postExcelFile -] */
  postExcelFile = async (excelData) => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    let organizationPostData = {
      domainRef: parseInt(this.state.domainRef),
      organizationList: excelData
    }
    await this.props.postOrganization(organizationPostData);
  }
  /* #endregion */



  /* #region  [ - onGridReady - ] */
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };
  /* #endregion */

  /* #region  [- onSelectionChanged() -] */
  onSelectionChanged = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    const len = selectedData.length;
    if (len === 0) {
      this.setState({
        id: 0,
        isDeleteButtonDisable: true,
        isEditButtonDisable: true,
        title: '',
        parentId: '',
      });
    }
    if (len === 1) {
      const picked = Object.keys(selectedData)[0];
      const pickedValue = selectedData[picked];

      if (pickedValue.checkRefFlag === true) {
        this.setState({
          id: pickedValue.id,
          isDeleteButtonDisable: true,
          isEditButtonDisable: false,
          title: pickedValue.title,
          parentId: pickedValue.parentId,
        })
      }
      else {
        this.setState({
          id: pickedValue.id,
          isDeleteButtonDisable: false,
          isEditButtonDisable: false,
          title: pickedValue.title,
          parentId: pickedValue.parentId,
        })
      }



    }
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
      surname: '',
      deleteModalInputValue: '',
      selectedRowKeys: [],
      isDeleteButtonDisable: true,
      isEditButtonDisable: true,
      isModalDeleteButtonDisable: true,
    })
  }
  /* #endregion */

  /* #region  [- getColumnSearchProps -] */
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, }) => (
      <div style={{ padding: 8 }}>
        <AntdInput
          ref={(node) => {
            this.searchInput = node;
          }}
          //placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <AntdButton
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex, clearFilters)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            جستجو
            </AntdButton>
          <AntdButton
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            پاک کردن
            </AntdButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  });

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


  /* #region  [- handleChangeDeleteModalInput(event) -] */
  handleChangeDeleteModalInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (event.target.value === this.state.title) {
      this.setState({
        isModalDeleteButtonDisable: false
      });
    } else {
      this.setState({
        isModalDeleteButtonDisable: true
      });
    }
  }
  /* #endregion */

  /* #region  [- toggleNewDrawer() -] */
  toggleNewDrawer = async () => {
    if (this.state.isNewDrawerVisible === true) {
      this.deselectAllRows();
      await this.refresh();
      this.setState({
        isNewDrawerVisible: false,
        newDrawerContent: <div></div>,
      });

    } else if (this.state.isNewDrawerVisible === false) {
      this.setState({
        isNewDrawerVisible: true,
      });
    }
  };
  /* #endregion */

  /* #region  [- toggleEditDrawer() -] */
  toggleEditDrawer = async () => {
    if (this.state.isEditDrawerVisible === true) {
      this.deselectAllRows();
      await this.refresh();
      this.setState({
        isEditDrawerVisible: false,
        editDrawerContent: <div></div>,
      })
    }
    else if (this.state.isEditDrawerVisible === false) {
      this.setState({
        isEditDrawerVisible: true
      })
    }
  }
  /* #endregion */

  /* #region  [- toggleDeleteModal() -] */
  toggleDeleteModal = async () => {

    if (this.state.isDeleteModalVisible === true) {
      this.deselectGridRow();
      await this.refresh();
      this.setState({
        isDeleteModalVisible: false,
        id: 0,
        title: '',
        deleteModalInputValue: '',
      })
    }
    else if (this.state.isDeleteModalVisible === false) {
      this.setState({
        isDeleteModalVisible: true
      })
    }

  }
  /* #endregion */

  /* #region  [- togglePrintModal() -] */
  togglePrintModal = () => {

    if (this.state.isPrintModalVisible === true) {
      this.setState({
        isPrintModalVisible: false,
      })
    }
    else if (this.state.isPrintModalVisible === false) {
      this.setState({
        isPrintModalVisible: true
      })
    }

  }
  /* #endregion */

  /* #region  [- toggleExcelImportModal() -] */
  toggleExcelImportModal = () => {

    if (this.state.isExcelImportModalVisible === true) {
      this.setState({
        isExcelImportModalVisible: false,
      })
    }
    else if (this.state.isExcelImportModalVisible === false) {
      this.setState({
        isExcelImportModalVisible: true
      })
    }

  }
  /* #endregion */


  /* #region  [- new -] */
  new = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.toggleNewDrawer();
    this.setState({
      newDrawerContent: <NewLegalPerson onClose={this.toggleNewDrawer} />,
    });
  };
  /* #endregion */

  /* #region  [- edit -] */
  edit = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.getOrganizationItem();
    let organizationSelectedItem = { ...this.props.organizationItem[0] }
    if (organizationSelectedItem.id === undefined) {

    }
    else {
      this.toggleEditDrawer();
      this.setState({
        editDrawerContent: <EditLegalPerson organizationId={this.state.id} onClose={this.toggleEditDrawer} />
      })
    }

  }
  /* #endregion */

  /* #region  [- refresh -] */
  refresh = async () => {
    await this.getOrganization();
    this.deselectGridRow();
  };
  /* #endregion */

  /* #region  [- showImportModal -] */
  showImportModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.toggleExcelImportModal();
  }
  /* #endregion */

  /* #region  [- print -] */
  print = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.togglePrintModal();
  }
  /* #endregion */

  /* #region  [- handleOk() -] */
  handleOk = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.deleteOrganization();
    await this.toggleDeleteModal();
  }
  /* #endregion */

  /* #region  [- getDataFromExcelModal -] */
  getDataFromExcelModal = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    this.child.send();
    this.toggleExcelImportModal();
    await this.getOrganization();
  }
  /* #endregion */


  /* #region  [- render() -] */
  render() {

    /* #region  [- const -] */

    /* #region  [- grid -] */
    const columns = [
      {
        title: "عکس",
        dataIndex: "logo",
        key: "id",
        width: 80,
        render: (data) => {
          if (data === "" || data === null) {
            return <Avatar>U</Avatar>;
          } else {
            return <Avatar src={"data:image/png;base64," + data} />;
          }
        },
      },
      {
        title: "مجموعه",
        dataIndex: "fullPath",
        key: "fullPath",
        width: 150,
        ...this.getColumnSearchProps("fullPath"),
      },
      {
        title: "نام",
        dataIndex: "title",
        key: "title",
        width: 150,
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "کد",
        dataIndex: "code",
        key: "code",
        width: 150,
        ...this.getColumnSearchProps("code"),
      },
      {
        title: "نام مخفف",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: 150,
        ...this.getColumnSearchProps("abbreviation"),
      },
      {
        title: "نوع شعبه ",
        dataIndex: "branchTypeTitle",
        key: "branchTypeTitle",
        width: 150,
      },
      {
        title: " وضعیت کاربری",
        dataIndex: "",
        key: "",
        width: 150,
      },
      {
        title: " سطح ",
        dataIndex: "",
        key: "",
        width: 150,
      },
      {
        title: "نام ثبتی",
        dataIndex: "registrationTitle",
        key: "registrationTitle",
        width: 150,
      },
      {
        title: "نوع سازمان",
        dataIndex: "organizationTypeTitle",
        key: "organizationTypeTitle",
        width: 150,
      },
      {
        title: "نوع صنعت",
        dataIndex: "industryTitle",
        key: "industryTitle",
        width: 150,
      },
      {
        title: "تاریخ تاسیس",
        dataIndex: "nativeEstablishmentDate",
        key: "nativeEstablishmentDate",
        width: 150,
      },
      {
        title: "شناسه ملی",
        dataIndex: "nationalId",
        key: "nationalId",
        width: 150,
        ...this.getColumnSearchProps("nationalId"),
      },
      {
        title: "تاریخ ثبتی",
        dataIndex: "nativeRegistrationDate",
        key: "nativeRegistrationDate",
        width: 150,
      },
      {
        title: "کد اقتصادی",
        dataIndex: "economicCode",
        key: "economicCode",
        width: 150,
      },
      {
        title: "موضوع فعالیت",
        dataIndex: "organizationSubject",
        key: "organizationSubject",
        width: 150,
      },
      {
        title: "زمینه کاری",
        dataIndex: "workField",
        key: "workField",
        width: 150,
      },
      {
        title: "اندازه سازمان",
        dataIndex: "organizationScaleTitle",
        key: "organizationScaleTitle",
        width: 150,
      },
      {
        title: "تلفن",
        dataIndex: "tel",
        key: "tel",
        width: 150,
      },
      {
        title: "فکس",
        dataIndex: "fax",
        key: "fax",
        width: 150,
      },
      {
        title: "وبسایت",
        dataIndex: "website",
        key: "website",
        width: 250,
      },
      {
        title: "ایمیل",
        dataIndex: "email",
        key: "email",
        width: 150,
      },

      {
        title: "کد پستی",
        dataIndex: "postalCode",
        key: "postalCode",
        width: 150,
      },
      {
        title: "آدرس",
        dataIndex: "organizationAddress",
        key: "organizationAddress",
        width: 250,
      },
    ];


    /* #endregion */

    /* #region  [- dropdownMenu -] */
    // const menu = (
    //   <Menu>
    //     <Menu.Item>
    //       <ExcelExport rowData={this.state.rowData} excelColumnDef={columns} title='organization' />
    //     </Menu.Item>
    //     <Menu.Item onClick={this.toggleExcelImportModal} disabled={true}>
    //       بارگذاری فایل اکسل
    //     </Menu.Item>
    //   </Menu>
    // );
    /* #endregion */

    /* #endregion */

    return (
      <Container fluid>
        <Row title="header" className="mt-2">
          <Col style={{ direction: "rtl", textAlign: "right" }}>
            <span
              style={{ height: "48px", lineHeight: "48px", fontSize: "25px" }}
            >
              شخص حقوقی
              </span>
          </Col>
        </Row>
        <hr />
        <Row title="buttons">
          <Col sm="6" style={{ textAlign: "right" }}>
            <Button title="addButton" hidden={this.state.isNewHidden} className="submit-button-style mr-2" onClick={this.new} >{" "}جدید{" "}</Button>
            <Button title="editButton" hidden={this.state.isEditHidden} className="submit-button-style mr-2" disabled={this.state.isEditButtonDisable} onClick={this.edit}>  ویرایش </Button>
            <Button title="deleteButton" hidden={this.state.isDeleteHidden} className="submit-button-style mr-2" disabled={this.state.isDeleteButtonDisable} onClick={this.toggleDeleteModal}>  حذف</Button>
            <Button title="refreshButton" hidden={this.state.isRefreshHidden} className="submit-button-style mr-2" onClick={this.refresh} >{" "}بازیابی{" "}</Button>
          </Col>
          <Col sm='6' style={{ textAlign: 'left' }}>
            {/* <Dropdown hidden={this.state.isExcelHidden} className='submit-button-style mr-2' overlay={menu}>
              <Button >ارسال / دریافت ... <DownOutlined /> </Button>
            </Dropdown>

            <Button hidden={this.state.isPrintHidden} className='submit-button-style mr-2' onClick={this.print}>
              چاپ
              </Button> */}
          </Col>
        </Row>

        <Row title="grid" className="mt-2">

          {/* { AgGridReact  } */}
          <Col
            className="ag-theme-balham"
            style={{ height: "60vh", width: "100%" }}
          >
            <AgGridReact
              onGridReady={this.onGridReady}
              columnDefs={this.state.columnDefs}
              rowData={this.props.organizationList}
              enableRtl={true}
              defaultColDef={this.state.defaultColDef}
              rowSelection="single"
              onSelectionChanged={this.onSelectionChanged}
              localeText={AG_GRID_LOCALE_FA}
            ></AgGridReact>
          </Col>



        </Row>

        <Row title="drawersAndModals">
          {/* New Drawer */}
          <Drawer
            placement={"left"}
            width={1000}
            bodyStyle={{ padding: "0px" }}
            closable={false}
            visible={this.state.isNewDrawerVisible}
          >
            {this.state.newDrawerContent}
          </Drawer>
          {/* Edit Drawer */}
          <Drawer
            placement={"left"}
            width={1000}
            bodyStyle={{ padding: "0px" }}
            closable={false}
            visible={this.state.isEditDrawerVisible}
          >
            {this.state.editDrawerContent}
          </Drawer>
          {/* Delete Modal */}
          <Modal visible={this.state.isDeleteModalVisible} bodyStyle={{ padding: '0px' }} closable={false} onOk={this.handleOk} onCancel={this.onClose}
            footer={[
              <Button key='1' className='cancel-button-style' onClick={this.toggleDeleteModal}>
                لغو
                </Button>,
              <Button key='2' className='submit-button-style' onClick={this.handleOk} disabled={this.state.isModalDeleteButtonDisable}>
                حذف
                </Button>,
            ]}
          >
            <Container fluid>
              <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                  <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>حذف</span>
                </Col>
              </Row>
              <Row title='content'>
                <Col sm='12' style={{ textAlign: 'right' }}>
                  <p>
                    آیا از حذف این رکورد اطمینان دارید ؟
                            </p>
                  <p>برای تایید  <strong>{`"${this.state.title}"`}</strong> را وارد کنید.</p>
                  <Row>
                    <Col sm="8">
                      <Form>
                        <FormGroup title="enteredTitle">
                          <Input
                            type="text"
                            id="deleteModalInputValue"
                            name="deleteModalInputValue"
                            value={this.state.deleteModalInputValue}
                            onChange={this.handleChangeDeleteModalInput}
                          />
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Modal>
          {/* Print Modal */}
          <Modal visible={this.state.isPrintModalVisible} bodyStyle={{ padding: '0px' }} onOk={this.togglePrintModal} onCancel={this.togglePrintModal}
            footer={[
              <Button key='1' className='submit-button-style' onClick={this.togglePrintModal}>
                تایید
              </Button>
            ]}
          >
            <Container fluid>
              <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                  <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>چاپ</span>
                </Col>
              </Row>
              <Row title='content'>
                <Col sm='12' style={{ textAlign: 'right' }}>
                  <h3>این عملکرد اکنون در دسترس نیست !</h3>
                </Col>
              </Row>
            </Container>
          </Modal>
          {/* Excel  Modal */}
          <Modal visible={this.state.isExcelImportModalVisible} bodyStyle={{ padding: '0px' }} onOk={this.toggleExcelImportModal} onCancel={this.toggleExcelImportModal}
            destroyOnClose={true} closable={false}
            footer={[
              <Button key='1' className='submit-button-style' onClick={this.getDataFromExcelModal}>
                ذخیره
              </Button>
            ]}

          >
            <Container fluid>
              <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                  <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>بارگذاری فایل اکسل</span>
                </Col>
              </Row>
              <Row title='content'>
                <Col sm='12' >
                  <ExcelImport title='Organization' sendExcelFileList={this.postExcelFile} columnsDef={columns} onRef={ref => (this.child = ref)} />
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
const mapStateToProps = (state) => {
  return {
    organizationList: state.organization.organizationList,
    organizationItem: state.organization.organizationItem,
    message: state.organization.message,
    domain: state.auth.domain,
    checkTokenCounter: state.auth.checkTokenCounter,
    userMenuAccessList: state.auth.userMenuAccessList,

  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({

  getOrganization: (data) => dispatch(getOrganization(data)),
  getOrganizationItem: (data) => dispatch(getOrganizationItem(data)),
  deleteOrganization: (data) => dispatch(deleteOrganization(data)),
  postOrganization: (data) => dispatch(postOrganization(data)),
  resetProps: (data) => dispatch(resetProps(data)),
  checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(LegalPerson);
