import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import ProductChooseContent from './productChooseContent.component';
import ProductCategory from './productCategory/productCategory.component'
import Product from './product/product.component'
import WarehouseCategory from './warehouseCategory/warehouseCategory.component'
import Warehouse from './warehouse/warehouse.component'
import Material from './material/material.component';
import MaterialCategory from './materialCategory/materialCategory.component';
import Producer from './producer/producer.component'
import Supplier from './supplier/supplier.component'
import Scale from './scale/scale.component';


class ProductContent extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        }
    }
    /* #endregion */

    /* #region  [- UNSAFE_componentWillReceiveProps(preProps, nextProps) -] */
    UNSAFE_componentWillReceiveProps(nextProps) {

        this.setState({
            clickedItemName: nextProps.generalSettingSelectedItem,
        });
        //console.log(nextProps.generalSettingSelectedItem)
        this.contentSelected();

    }
    /* #endregion */

    /* #region  [- contentSelected() -] */

    contentSelected = () => {
        switch (this.state.clickedItemName) {
            case "productCategory":
                return <ProductCategory />;
            case "product":
                return <Product />;
            case "supplier":
                return <Supplier />;
            case "warehouseCategory":
                return <WarehouseCategory />;
            case "warehouse":
                return <Warehouse />;
            case "material":
                return <Material />;
            case "materialCategory":
                return <MaterialCategory />;
            case "producer":
                return <Producer />;
            case "scale":
                return <Scale />;
            default:
                return <ProductChooseContent />;
        }
    };

    /* #endregion */

    /* #region  [- render() -] */

    render() {
        return (
            <div>
                {this.contentSelected()}
            </div>
        );
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductContent);