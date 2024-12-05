import React, { PureComponent } from 'react';
//import decode from 'jwt-decode';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { decodeToken } from '../../../redux/shared/auth/auth.action';

class Auth extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            accessLevel: [],
            item: '',
            isAuthenticated: false,
            expireTokenTime: null
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
         const encryptedToken = localStorage.getItem('encryptedToken');
         await this.props.decodeToken(encryptedToken);
         this.isAuthenticated(this.props.expirationTime);

    }
    /* #endregion */

    /* #region  [- UNSAFE_componentWillReceiveProps(nextProps) -] */
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.checkTokenCounter > 0) {
            this.isAuthenticated(this.props.expirationTime);
        }

        // if (nextProps.isTokenExpired === true) {
        //     this.isAuthenticated(this.props.expirationTime);
        // }
        // else {
        //     this.isAuthenticated(this.props.expirationTime);
        // }
        //console.log(nextProps.accessLevelList);

    }
    /* #endregion */

    /* #region  [- isAuthenticated(expireTime) -] */
    isAuthenticated = (expireTime) => {
        var date = expireTime * 1000;
        //var test = Date.now();
        if (Date.now() >= date) {
            this.props.history.push('/login');
            localStorage.removeItem("token");
        }
        else {
            return true;
        }
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        return (

            <div>
                {this.props.children}
            </div>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        //token: state.login.token,
        accessLevelList: state.auth.accessLevelList,
        expirationTime: state.auth.expirationTime,
        isTokenExpired: state.auth.isTokenExpired,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    decodeToken: (data) => dispatch(decodeToken(data))
});
/* #endregion */


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));