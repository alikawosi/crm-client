/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Table, Button, Row, Col, Upload,message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
//import { ExcelRenderer } from 'react-excel-renderer'
import { Container } from "reactstrap";
//import ExcelExport from '../excelExport/excelExport.component'

/* #endregion */

class ExcelImport extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            errorMessage: null,
            columns: this.props.columnsDef
        };
    }
    /* #endregion */

    /* #region  [- methods -] */
  
    /* #region  [- componentDidMount() -] */

    async componentDidMount() {
        this.props.onRef(this);
    }

    /* #endregion */

    /* #region  [- fileHandler -] */
    fileHandler = fileList => {

        let fileObj = fileList;
        if (fileObj.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') 
        {
            message.error(`${fileObj.name} is not a Excel file`);
          
            return true;
        }
        else{
            //just pass the fileObj as parameter
            // ExcelRenderer(fileObj, (err, resp) => {
            //     if (err) {
            //         console.log(err);
            //     } 
            //     else {
            //         let newRows = [];
            //         let row=resp.rows.slice(1)
            //             if (row && row !== "undefined") 
            //             {
            //                 for (var j=0 ; j<resp.rows.length-1 ; j++ )
            //                 {
            //                     for (var i = 0; i < this.state.columns.length; i++) 
            //                     {
            //                         let newArray = [...newRows];
            //                         newArray[j] = {...newArray[j], [this.state.columns[i].dataIndex]: row[j][i]}
            //                         newRows=newArray
            //                     }
            //                 }
            //             }
            //         this.setState({
            //             rows: newRows,
            //             errorMessage: null
            //         });
                    
            //     }
            // });
        return false;
    };
}
    /* #endregion */

    /* #region  [- send -] */
    send =async () => {
       await  this.props.sendExcelFileList(this.state.rows)
    };
    /* #endregion */

    /* #region  [- render () -] */
    render() {
        const columns = this.state.columns.map(col => {

            return {
              ...col,
              onCell: record => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                width:'10'
              })
            };
          });
        
        return (
            <Container fluid>

                <Row>
                    <Col sm='6'>
                        <Upload
                            name="file"
                            beforeUpload={this.fileHandler}
                            onRemove={() => this.setState({ rows: [] })}
                            multiple={false}
                        >
                            <Button>
                                <UploadOutlined />  Click to Upload Excel File
                            </Button>
                        </Upload>
                    </Col>
                    <Col className='mr-2' sm='6'>
                        <Button  className='submit-button-style' style={{color:'white'}}>
                            {/* <ExcelExport rowData={[]} excelColumnDef={columns} title={this.props.title}/>  */}
                        </Button>
                    </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Col sm='12'>
                    <Table
                        dataSource={this.state.rows}
                        columns={columns}
                        size='small'
                        scroll={{x:true}}
                        width='100%'
                    />
                    </Col>
                </Row>
                
            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}


  
  export default ExcelImport

