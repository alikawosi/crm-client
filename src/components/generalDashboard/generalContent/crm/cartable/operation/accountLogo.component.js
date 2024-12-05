import React, { PureComponent } from "react";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class AccountLogo extends PureComponent {

    /* #region  [- render -] */

    render() {

        return (
            this.props.node.data.accountLogo === ""
                ?

                <Avatar
                    style={{
                        backgroundColor: "#8FBC8F",
                        width: "40px",
                        height: "40px",
                        border: "0.5px solid #708090",
                        //paddingTop: "2%",
                       // marginTop: "3%",
                        //textAlign:'center'
                    }}
                    icon={<UserOutlined style={{fontSize:'15px'}} />}
                />
                :
                <img
                    alt="Avatar"
                    class="avatar"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "0.5px solid #708090",
                        marginTop: "3%"
                    }}
                    src={"data:image/jpeg;base64," + this.props.node.data.accountLogo}
                />
        );
    }
    /* #endregion */

};

export default AccountLogo;