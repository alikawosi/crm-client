/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import PersonChooseContent from './personChooseContent.component';
import LegalPerson from './legalPerson/legalPerson.component';
import RealPerson from './realPerson/realPerson.component';
import EducationLevel from './educationLevel/educationLevel.component';
import OrganizationType from './organizationType/organizationType.component';
import WorkField from './workField/workField.component';
import CategoryType from './categoryType/categoryType.component';
import RepresentativeType from './representativeType/representativeType.component';
import ExtraInfoTemplate from './extraInfoTemplate/extraInfoTemplate.component';

/* #endregion */

class PersonContent extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- UNSAFE_componentWillReceiveProps(preProps, nextProps) -] */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            clickedItemName: nextProps.generalSettingSelectedItem,
        });
        ////console.log(nextProps.generalSettingSelectedItem)
        this.contentSelected();
    }
    /* #endregion */


    /* #region  [- contentSelected() -] */
    contentSelected = () => {
        switch (this.state.clickedItemName) {
            case "realPerson":
                return <RealPerson />;
            case "legalPerson":
                return <LegalPerson />;
            case "workField":
                return <WorkField />;
            case "organizationType":
                return <OrganizationType />;
            case "categoryType":
                return <CategoryType />;
            case "educationLevel":
                return <EducationLevel />;
            case "representativeType":
                return <RepresentativeType />;
            case "extraInfoTemplate":
                return <ExtraInfoTemplate />;
            default:
                return <PersonChooseContent />;
            //break;
        }
    };
    /* #endregion */


    /* #region  [- render() -] */
    render() {
        return (
            <div >
                {this.contentSelected()}
            </div>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        generalSettingSelectedItem: state.common.generalSettingSelectedItem,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({


});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(PersonContent);