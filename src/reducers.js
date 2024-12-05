
/* #region  [- import -] */
import { combineReducers } from 'redux';
import { accountReducer } from './redux/account/account.reducer';
import { authReducer } from './redux/shared/auth/auth.reducer';
import { commonReducer } from './redux/shared/common/common.reducer';
import { personReducer } from './redux/infrastructure/person/person.reducer';
import { extraInfoReducer } from './redux/infrastructure/extraInfo/extraInfo.reducer';
import { crmFileReducer } from './redux/infrastructure/crmFile/crmFile.reducer';
import { educationLevelReducer } from './redux/infrastructure/educationLevel/educationLevel.reducer';

import { materialCategoryReducer } from './redux/product/materialCategory/materialCategory.reducer';
import { scaleReducer } from './redux/product/scale/scale.reducer';
import { supplyChainReducer } from './redux/product/supplyChain/supplyChain.reducer';
import { propertyReducer } from './redux/product/property/property.reducer';
import { materialReducer } from './redux/product/material/material.reducer';
import { materialScaleReducer } from './redux/product/materialScale/materialScale.reducer';
import { producerReducer } from './redux/product/producer/producer.reducer';
import { productCategoryReducer } from './redux/product/productCategory/productCategory.reducer';
import { productReducer } from './redux/product/product/product.reducer';
import { warehouseCategoryReducer } from './redux/product/warehouseCategory/warehouseCategory.reducer';
import { warehouseReducer } from './redux/product/warehouse/warehouse.reducer'
import { inventoryReducer } from './redux/product/inventory/inventory.reducer'

import { organizationReducer } from './redux/infrastructure/organization/organization.reducer';
import { categoryReducer } from './redux/infrastructure/category/category.reducer';
import { positionReducer } from './redux/infrastructure/position/position.reducer';
import { employeeReducer } from './redux/infrastructure/employee/employee.reducer';
import { representativeReducer } from './redux/infrastructure/representative/representative.reducer';
import { organizationTypeReducer } from './redux/infrastructure/organizationType/organizationType.reducer';
import { industryReducer } from './redux/infrastructure/industry/industry.reducer';
import { categoryTypeReducer } from './redux/infrastructure/categoryType/categoryType.reducer';
import { representativeTypeReducer } from './redux/infrastructure/representativeType/representativeType.reducer';
import { sectionReducer } from './redux/warehouse/section/section.reducer';
import { sectionTypeReducer } from './redux/warehouse/sectionType/sectionType.reducer';
import { extraInfoTemplateReducer } from './redux/infrastructure/extraInfoTemplate/extraInfoTemplate.reducer';
import { quoteReducer } from './redux/sales/quote/quote/quote.reducer';
import { orderReducer } from './redux/sales/order/order/order.reducer'
import { invoiceReducer } from './redux/sales/invoice/invoice/invoice.reducer'
import { ratingReducer } from './redux/crm/rating/rating.reducer';
import { deliveryTermReducer } from './redux/sales/deliveryTerm/deliveryTerm.reducer'
import { reportTypeReducer } from './redux/sales/reportType/reportType.reducer'
import { taskStatusReducer } from './redux/sales/taskStatus/taskStatus.reducer'
import { responsibleTypeReducer } from './redux/sales/responsibleType/responsibleType.reducer'
import { accountTypeReducer } from './redux/sales/accountType/accountType.reducer'
import { shippingMethodReducer } from './redux/sales/shippingMethod/shippingMethod.reducer'
import { paymentTypeReducer } from './redux/sales/paymentType/paymentType.reducer'
import { financialCaseTypeReducer } from './redux/sales/financialCaseType/financialCaseType.reducer'
import { salesDashboardReducer } from './redux/sales/dashboard/dashboard.reducer'
import { personAccountReducer } from './redux/crm/account/account/person/personAccount.reducer'
import { crmAccountReducer } from './redux/crm/account/account/account.reducer'
import { organizationAccountReducer } from './redux/crm/account/account/organization/organizationAccount.reducer'
import { accountSourceReducer } from "./redux/crm/accountSource/accountSource.reducer";
import { crmResponsibleTypeReducer } from "./redux/crm/responsibleType/crmResponsibleType.reducer";
import { crmReportTypeReducer } from "./redux/crm/reportType/crmReportType.reducer";
import { crmTaskStatusReducer } from "./redux/crm/taskStatus/crmTaskStatus.reducer";
import { priceListReducer } from './redux/sales/priceList/priceList/priceList.reducer';
import { termReducer } from './redux/sales/term/term.reducer';
import { termTypeReducer } from './redux/sales/termType/termType.reducer';
import { paymentMethodReducer } from './redux/sales/paymentMethod/paymentMethod.reducer';
import { paymentReducer } from './redux/sales/payment/payment.reducer';
import { requisitionReducer } from './redux/sales/invoice/requisition/requisition.reducer'
import { mainInvoiceReducer } from './redux/sales/invoice/invoice.reducer'
import { invoiceTimelineReducer } from './redux/sales/invoice/timeline/timeline.reducer'
import { quoteTimelineReducer } from './redux/sales/quote/timeline/timeline.reducer'
import { mainQuoteReducer } from './redux/sales/quote/quote.reducer'
import { mainOrderReducer } from './redux/sales/order/order.reducer'
import { orderTimelineReducer } from './redux/sales/order/timeline/timeline.reducer'
import { reasonsSalesReturnReducer } from './redux/sales/reasonsSalesReturn/reasonsSalesReturn.reducer'
import { manualActivityTypeReducer } from './redux/sales/manualActivityType/manualActivityType.reducer'
import {salesReturnReducer} from './redux/sales/invoice/salesReturn/salesReturn.reducer'

/* #endregion */


const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  common: commonReducer,
  person: personReducer,
  organization: organizationReducer,
  category: categoryReducer,
  position: positionReducer,
  employee: employeeReducer,
  representative: representativeReducer,
  extraInfo: extraInfoReducer,
  crmFile: crmFileReducer,
  educationLevel: educationLevelReducer,
  materialCategory: materialCategoryReducer,
  productCategory: productCategoryReducer,
  product: productReducer,
  scale: scaleReducer,
  supplyChain: supplyChainReducer,
  material: materialReducer,
  materialScale: materialScaleReducer,
  producer: producerReducer,
  property: propertyReducer,
  organizationType: organizationTypeReducer,
  industry: industryReducer,
  categoryType: categoryTypeReducer,
  representativeType: representativeTypeReducer,
  warehouseCategory: warehouseCategoryReducer,
  warehouse: warehouseReducer,
  section: sectionReducer,
  sectionType: sectionTypeReducer,
  inventory: inventoryReducer,
  extraInfoTemplate: extraInfoTemplateReducer,
  quote: quoteReducer,
  order: orderReducer,
  invoice: invoiceReducer,
  rating: ratingReducer,
  deliveryTerm: deliveryTermReducer,
  reportType: reportTypeReducer,
  taskStatus: taskStatusReducer,
  responsibleType: responsibleTypeReducer,
  salesDashboard: salesDashboardReducer,
  crmAccount: crmAccountReducer,
  personAccount: personAccountReducer,
  organizationAccount: organizationAccountReducer,
  accountType: accountTypeReducer,
  shippingMethod: shippingMethodReducer,
  paymentType: paymentTypeReducer,
  financialCaseType: financialCaseTypeReducer,
  accountSource: accountSourceReducer,
  crmResponsibleType: crmResponsibleTypeReducer,
  crmReportType: crmReportTypeReducer,
  crmTaskStatus: crmTaskStatusReducer,
  priceList: priceListReducer,
  term: termReducer,
  termType: termTypeReducer,
  paymentMethod: paymentMethodReducer,
  payment: paymentReducer,
  requisition: requisitionReducer,
  mainInvoice: mainInvoiceReducer,
  invoiceTimeline: invoiceTimelineReducer,
  quoteTimeline: quoteTimelineReducer,
  mainQuote: mainQuoteReducer,
  mainOrder: mainOrderReducer,
  orderTimeline: orderTimelineReducer,
  reasonsSalesReturn: reasonsSalesReturnReducer,
  manualActivityType: manualActivityTypeReducer,
  salesReturn:salesReturnReducer
});

export default rootReducer