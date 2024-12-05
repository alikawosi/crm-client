/* #region  [- import -] */
import React, { Component } from 'react';
import { Button } from 'reactstrap';

/* #endregion */

class AttachFileGridButton extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- download() -] */
    download = () => {
        let fileData = {
            fileTitle: this.props.node.data.fileTitle,
            fileType: this.props.node.data.fileType,
            attachedFile: this.props.node.data.attachedFile
        }
        this.props.context.componentParent.download(fileData);
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (
            <Button color='info' size='sm' onClick={this.download}>
                دانلود
            </Button>
        );
    }
    /* #endregion */

    /* #endregion */
}

export default AttachFileGridButton;