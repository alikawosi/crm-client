/* #region  [- imports -] */
import React, { PureComponent } from "react";
//import { Container, Row, Col } from "reactstrap";
import { Switch } from "antd";
import { connect } from "react-redux";
import {
  getUserPermission,
  postUserPermission,
  resetProps,
} from "../../../../../../../redux/account/account.action";
import "./permission.component.css";
//import Notification from "../../../../../../shared/common/notification/notification.component";

/* #endregion */

class Permission extends PureComponent {
  /* #region  [- ctor -] */
  constructor(props) {
    super(props);
    this.state = {
      /* #region  [- managementCartable -] */
      isManagementCartableChecked: false,
      isManagementCartableDisabled: false,

      /* #endregion */

      /* #region  [- sales -] */
      isSalesChecked: false,
      isSalesChildrenHidden: true,
      isSalesManagementCartableChecked: false,
      isSalesManagementChecked: false,

      /* #region  [- inventory -] */
      isInventoryChecked: false,
      isInventoryTaskHidden: true,
      isNewInventoryChecked: false,
      isPrintInventoryChecked: false,
      isEditInventoryChecked: false,

      /* #endregion */

      /* #region  [- priceList -] */
      isPriceListChecked: false,
      isPriceListTaskHidden: true,
      isPriceListOperationChecked: false,
      isPriceListOperationTaskHidden: true,
      isNewPriceListChecked: false,
      isEditPriceListChecked: false,
      isDeletePriceListChecked: false,
      isArchivePriceListChecked: false,
      isPriceListDraftChecked: false,
      isPriceListResponsibilityChecked: false,
      isPriceListTimelineChecked: false,
      isPriceListArchiveChecked: false,

      /* #endregion */

      /* #region  [- quote -] */
      isQuoteChecked: false,
      isQuoteTaskHidden: true,
      isQuoteOperationChecked: false,
      isQuoteOperationTaskHidden: true,
      isNewQuoteChecked: false,
      isEditQuoteChecked: false,
      isDeleteQuoteChecked: false,
      isArchiveQuoteChecked: false,
      isQuoteDraftChecked: false,
      isQuoteResponsibilityChecked: false,
      isQuoteTimelineChecked: false,
      isQuoteArchiveChecked: false,
      isMergeQuoteChecked: false,
      isMergeQuoteDisabled: false,
      isSplitQuoteChecked: false,
      isSplitQuoteDisabled: false,
      isConvertQuoteChecked: false,
      isConvertQuoteDisabled: false,

      /* #region  [- Timeline -] */
      isQuoteTimelineTaskHidden: true,
      isNewQuoteTimelineChecked: false,
      isNewQuoteTimelineDisabled: false,
      isDeleteQuoteTimelineChecked: false,
      isDeleteQuoteTimelineDisabled: false,

      /* #endregion */

      /* #endregion */

      /* #region  [- order -] */
      isOrderChecked: false,
      isOrderTaskHidden: true,
      isOrderOperationChecked: false,
      isOrderOperationTaskHidden: true,
      isNewOrderChecked: false,
      isEditOrderChecked: false,
      isDeleteOrderChecked: false,
      isArchiveOrderChecked: false,
      isOrderDraftChecked: false,
      isOrderResponsibilityChecked: false,
      isOrderTimelineChecked: false,
      isOrderArchiveChecked: false,
      isMergeOrderToInvoiceChecked: false,
      isMergeOrderToInvoiceDisabled: false,
      isSplitOrderToInvoiceChecked: false,
      isSplitOrderToInvoiceDisabled: false,
      isConvertOrderToInvoiceChecked: false,
      isConvertOrderToInvoiceDisabled: false,

      isMergeOrderToOrderChecked: false,
      isMergeOrderToOrderDisabled: false,

      isSplitOrderToOrderChecked: false,
      isSplitOrderToOrderDisabled: false,
      isCorrespondingOrderToOrderChecked: false,
      isCorrespondingOrderToOrderDisabled: false,

      isMergeOrderToQuoteChecked: false,
      isMergeOrderToQuoteDisabled: false,

      isConvertOrderToQuoteChecked: false,
      isConvertOrderToQuoteDisabled: false,
      /* #region  [-  timeline -] */
      isOrderTimelineTaskHidden: true,
      isNewOrderTimelineChecked: false,
      isNewOrderTimelineDisabled: false,
      isDeleteOrderTimelineChecked: false,
      isDeleteOrderTimelineDisabled: false,
      /* #endregion */

      /* #endregion */

      /* #region  [- invoice -] */
      isInvoiceChecked: false,
      isInvoiceTaskHidden: true,
      isInvoiceOperationChecked: false,
      isInvoiceOperationTaskHidden: true,
      isNewInvoiceChecked: false,
      isEditInvoiceChecked: false,
      isDeleteInvoiceChecked: false,
      isArchiveInvoiceChecked: false,
      isInvoiceDraftChecked: false,
      isInvoiceResponsibilityChecked: false,
      isInvoiceTimelineChecked: false,
      isInvoiceArchiveChecked: false,
      isRequisitionChecked: false,
      isRequisitionDisabled: false,
      isRequisitionTaskHidden: true,
      isNewRequisitionChecked: false,
      isNewRequisitionDisabled: false,
      isEditRequisitionChecked: false,
      isEditRequisitionDisabled: false,
      isDeleteRequisitionChecked: false,
      isDeleteRequisitionDisabled: false,
      isArchiveRequisitionChecked: false,
      isArchiveRequisitionDisabled: false,
      isCorrespondingInvoiceToInvoiceChecked: false,
      isCorrespondingInvoiceToInvoiceDisabled: false,
      isInvoiceRequisitionChecked: false,
      isInvoiceRequisitionDisabled: false,
      isMergeInvoiceToOrderChecked: false,
      isMergeInvoiceToOrderDisabled: false,
      isSplitInvoiceToOrderChecked: false,
      isSplitInvoiceToOrderDisabled: false,
      isConvertInvoiceToOrderChecked: false,
      isConvertInvoiceToOrderDisabled: false,
      isCorrespondingInvoiceToOrderChecked: false,
      isCorrespondingInvoiceToOrderDisabled: false,

      /* #region  [-  timeline -] */
      isInvoiceTimelineTaskHidden: true,
      isNewInvoiceTimelineChecked: false,
      isNewInvoiceTimelineDisabled: false,
      isDeleteInvoiceTimelineChecked: false,
      isDeleteInvoiceTimelineDisabled: false,
      /* #endregion */


      /* #region  [- salesReturn -] */
      isSalesReturnChecked: false,
      isSalesReturnDisabled: false,
      isSalesReturnTaskHidden: true,
      isNewSalesReturnChecked: false,
      isNewSalesReturnDisabled: false,
      isEditSalesReturnChecked: false,
      isEditSalesReturnDisabled: false,
      isDeleteSalesReturnChecked: false,
      isDeleteSalesReturnDisabled: false,
      /* #endregion */


      /* #endregion */

      /* #endregion */

      /* #region  [- crm -] */
      isCRMChecked: false,
      isCRMChildrenHidden: true,
      isAccountManagementChecked: false,
      isCRMCartableChecked: false,
      isCRMCrtableTaskHidden: true,
      isCRMCartableOperationChecked: false,
      isCRMCrtableOperationTaskHidden: true,
      isNewAccountChecked: false,
      isEditAccountChecked: false,
      isDeleteAccountChecked: false,
      isAccountResponsibilityChecked: false,
      isAccountChangeLevelChecked: false,
      isArchiveAccountChecked: false,
      isCRMCartableDraftChecked: false,
      isCRMCartableResponsibilityChecked: false,
      isCRMCartableTimelineChecked: false,
      isCRMCartableArchiveChecked: false,

      /* #endregion */

      /* #region  [- management -] */
      isManagementChecked: false,
      /* #endregion */

      /* #region  [- ticket-] */
      isTicketChecked: false,
      /* #endregion */

      /* #region  [- setting-] */
      isSettingChecked: false,
      isSettingChildrenHidden: true,

      /* #region  [- person -] */

      /* #region  [- person -] */
      isPersonChecked: false,
      isPersonChildrenHidden: true,
      //realPerson
      isRealPersonChecked: false,
      isRealPersonTaskHidden: true,
      isNewRealPersonChecked: false,
      isEditRealPersonChecked: false,
      isDeleteRealPersonChecked: false,
      isPrintRealPersonChecked: false,
      isExcelRealPersonChecked: false,
      //legalPerson
      isLegalPersonChecked: false,
      isLegalPersonTaskHidden: true,
      isNewLegalPersonChecked: false,
      isEditLegalPersonChecked: false,
      isDeleteLegalPersonChecked: false,
      isPrintLegalPersonChecked: false,
      isExcelLegalPersonChecked: false,
      /* #endregion */

      /* #region  [- industry -] */
      isIndustryChecked: false,
      isIndustryTaskHidden: true,
      isNewIndustryChecked: false,
      isEditIndustryChecked: false,
      isDeleteIndustryChecked: false,
      isPrintIndustryChecked: false,
      isExcelIndustryChecked: false,
      /* #endregion */

      /* #region  [- organizationType -] */
      isOrganizationTypeChecked: false,
      isOrganizationTypeTaskHidden: true,
      isNewOrganizationTypeChecked: false,
      isEditOrganizationTypeChecked: false,
      isDeleteOrganizationTypeChecked: false,
      isPrintOrganizationTypeChecked: false,
      isExcelOrganizationTypeChecked: false,
      /* #endregion */

      /* #region  [- categoryType -] */
      isCategoryTypeChecked: false,
      isCategoryTypeTaskHidden: true,
      isNewCategoryTypeChecked: false,
      isEditCategoryTypeChecked: false,
      isDeleteCategoryTypeChecked: false,
      isPrintCategoryTypeChecked: false,
      isExcelCategoryTypeChecked: false,
      /* #endregion */

      /* #region  [- educationLevel -] */
      isEducationLevelChecked: false,
      isEducationLevelTaskHidden: true,
      isNewEducationLevelChecked: false,
      isEditEducationLevelChecked: false,
      isDeleteEducationLevelChecked: false,
      isPrintEducationLevelChecked: false,
      isExcelEducationLevelChecked: false,
      /* #endregion */

      /* #region  [- representativeType -] */
      isRepresentativeTypeChecked: false,
      isRepresentativeTypeTaskHidden: true,
      isNewRepresentativeTypeChecked: false,
      isEditRepresentativeTypeChecked: false,
      isDeleteRepresentativeTypeChecked: false,
      isPrintRepresentativeTypeChecked: false,
      isExcelRepresentativeTypeChecked: false,
      /* #endregion */

      /* #region  [- template -] */
      isTemplateChecked: false,
      isTemplateTaskHidden: true,
      isNewTemplateChecked: false,
      isEditTemplateChecked: false,
      isDeleteTemplateChecked: false,
      isPrintTemplateChecked: false,
      isExcelTemplateChecked: false,
      /* #endregion */

      /* #endregion */

      /* #region  [- material -] */

      /* #region  [- mateialMenu -] */
      isMaterialChecked: false,
      isMaterialChildrenHidden: true,
      /* #endregion */

      /* #region  [- material -] */
      isMaterialCardChecked: false,
      isMaterialCardTaskHidden: true,
      isNewMaterialChecked: false,
      isEditMaterialChecked: false,
      isDeleteMaterialChecked: false,
      isPrintMaterialChecked: false,
      isExcelMaterialChecked: false,
      /* #endregion */

      /* #region  [- materialCategory -] */
      isMaterialCategoryChecked: false,
      isMaterialCategoryTaskHidden: true,
      isNewMaterialCategoryChecked: false,
      isEditMaterialCategoryChecked: false,
      isDeleteMaterialCategoryChecked: false,
      isPrintMaterialCategoryChecked: false,
      isExcelMaterialCategoryChecked: false,
      /* #endregion */

      /* #region  [- Scale -] */
      isScaleChecked: false,
      isScaleTaskHidden: true,
      isNewScaleChecked: false,
      isEditScaleChecked: false,
      isDeleteScaleChecked: false,
      isPrintScaleChecked: false,
      isExcelScaleChecked: false,
      /* #endregion */

      /* #region  [- warehouseCategory -] */
      isWarehouseCategoryChecked: false,
      isWarehouseCategoryTaskHidden: true,
      isNewWarehouseCategoryChecked: false,
      isEditWarehouseCategoryChecked: false,
      isDeleteWarehouseCategoryChecked: false,
      isPrintWarehouseCategoryChecked: false,
      isExcelWarehouseCategoryChecked: false,
      /* #endregion */

      /* #region  [- warehouse -] */
      isWarehouseChecked: false,
      isWarehouseTaskHidden: true,
      isNewWarehouseChecked: false,
      isEditWarehouseChecked: false,
      isDeleteWarehouseChecked: false,
      isPrintWarehouseChecked: false,
      isExcelWarehouseChecked: false,
      /* #endregion */

      /* #region  [- product -] */
      isProductChecked: false,
      isProductTaskHidden: true,
      isNewProductChecked: false,
      isEditProductChecked: false,
      isDeleteProductChecked: false,
      isPrintProductChecked: false,
      isExcelProductChecked: false,
      /* #endregion */

      /* #region  [- productCategory -] */
      isProductCategoryChecked: false,
      isProductCategoryTaskHidden: true,
      isNewProductCategoryChecked: false,
      isEditProductCategoryChecked: false,
      isDeleteProductCategoryChecked: false,
      isPrintProductCategoryChecked: false,
      isExcelProductCategoryChecked: false,
      /* #endregion */

            /* #region  [- supplyChain -] */
            isSupplyChainChecked: false,
            isSupplyChainTaskHidden: true,
            isNewSupplyChainChecked: false,
            isEditSupplyChainChecked: false,
            isDeleteSupplyChainChecked: false,
            isPrintSupplyChainChecked: false,
            isExcelSupplyChainChecked: false,
            /* #endregion */

      /* #endregion */

      /* #region  [- marketingSetting -] */
      isMarketingSettingChecked: false,
      isMarketingSettingChildrenHidden: true,
      /* #endregion */

      /* #region  [- transposrtation-] */
      isTransportationChecked: false,
      isTransportationChildrenHidden: true,
      /* #endregion */

      /* #region  [- servicesSetting -] */
      isServicesSettingChecked: false,
      isServicesChildrenHidden: true,
      /* #endregion */

      /* #region  [- salesSetting -] */

      isSalesSettingChildrenHidden: true,
      isSalesSettingChecked: false,

      /* #region  [- accountType -] */
      isAccountTypeChecked: false,
      isAccountTypeDisabled: false,
      isAccountTypeTaskHidden: true,
      isNewAccountTypeChecked: false,
      isNewAccountTypeDisabled: false,
      isEditAccountTypeChecked: false,
      isEditAccountTypeDisabled: false,
      isDeleteAccountTypeChecked: false,
      isDeleteAccountTypeDisabled: false,
      isPrintAccountTypeChecked: false,
      isPrintAccountTypeDisabled: false,
      isExcelAccountTypeChecked: false,
      isExcelAccountTypeDisabled: false,

      /* #endregion */


      /* #region  [- manualActivityType -] */
      isManualActivityTypeChecked: false,
      isManualActivityTypeDisabled: false,
      isManualActivityTypeTaskHidden: true,
      isNewManualActivityTypeChecked: false,
      isNewManualActivityTypeDisabled: false,
      isEditManualActivityTypeChecked: false,
      isEditManualActivityTypeDisabled: false,
      isDeleteManualActivityTypeChecked: false,
      isDeleteManualActivityTypeDisabled: false,
      isPrintManualActivityTypeChecked: false,
      isPrintManualActivityTypeDisabled: false,
      isExcelManualActivityTypeChecked: false,
      isExcelManualActivityTypeDisabled: false,

      /* #endregion */


      /* #region  [- financialCaseType -] */
      isFinancialCaseTypeChecked: false,
      isFinancialCaseTypeDisabled: false,
      isFinancialCaseTypeTaskHidden: true,
      isNewFinancialCaseTypeChecked: false,
      isNewFinancialCaseTypeDisabled: false,
      isEditFinancialCaseTypeChecked: false,
      isEditFinancialCaseTypeDisabled: false,
      isDeleteFinancialCaseTypeChecked: false,
      isDeleteFinancialCaseTypeDisabled: false,
      isPrintFinancialCaseTypeChecked: false,
      isPrintFinancialCaseTypeDisabled: false,
      isExcelFinancialCaseTypeChecked: false,
      isExcelFinancialCaseTypeDisabled: false,

      /* #endregion */

      /* #region  [- termType -] */
      isTermTypeChecked: false,
      isTermTypeDisabled: false,
      isTermTypeTaskHidden: true,
      isNewTermTypeChecked: false,
      isNewTermTypeDisabled: false,
      isEditTermTypeChecked: false,
      isEditTermTypeDisabled: false,
      isDeleteTermTypeChecked: false,
      isDeleteTermTypeDisabled: false,
      isPrintTermTypeChecked: false,
      isPrintTermTypeDisabled: false,
      isExcelTermTypeChecked: false,
      isExcelTermTypeDisabled: false,

      /* #endregion */

      /* #region  [- paymentMethod -] */
      isPaymentMethodChecked: false,
      isPaymentMethodDisabled: false,
      isPaymentMethodTaskHidden: true,
      isNewPaymentMethodChecked: false,
      isNewPaymentMethodDisabled: false,
      isEditPaymentMethodChecked: false,
      isEditPaymentMethodDisabled: false,
      isDeletePaymentMethodChecked: false,
      isDeletePaymentMethodDisabled: false,
      isPrintPaymentMethodChecked: false,
      isPrintPaymentMethodDisabled: false,
      isExcelPaymentMethodChecked: false,
      isExcelPaymentMethodDisabled: false,

      /* #endregion */

      /* #region  [- deliveryTerm -] */
      isDeliveryTermChecked: false,
      isDeliveryTermDisabled: false,
      isDeliveryTermTaskHidden: true,
      isNewDeliveryTermChecked: false,
      isNewDeliveryTermDisabled: false,
      isEditDeliveryTermChecked: false,
      isEditDeliveryTermDisabled: false,
      isDeleteDeliveryTermChecked: false,
      isDeleteDeliveryTermDisabled: false,
      isPrintDeliveryTermChecked: false,
      isPrintDeliveryTermDisabled: false,
      isExcelDeliveryTermChecked: false,
      isExcelDeliveryTermDisabled: false,

      /* #endregion */

      /* #region  [- sippingMethod -] */
      isShippingMethodChecked: false,
      isShippingMethodDisabled: false,
      isShippingMethodTaskHidden: true,
      isNewShippingMethodChecked: false,
      isNewShippingMethodDisabled: false,
      isEditShippingMethodChecked: false,
      isEditShippingMethodDisabled: false,
      isDeleteShippingMethodChecked: false,
      isDeleteShippingMethodDisabled: false,
      isPrintShippingMethodChecked: false,
      isPrintShippingMethodDisabled: false,
      isExcelShippingMethodChecked: false,
      isExcelShippingMethodDisabled: false,

      /* #endregion */

      /* #region  [- responsibleType -] */
      isResponsibleTypeChecked: false,
      isResponsibleTypeDisabled: false,
      isResponsibleTypeTaskHidden: true,
      isNewResponsibleTypeChecked: false,
      isNewResponsibleTypeDisabled: false,
      isEditResponsibleTypeChecked: false,
      isEditResponsibleTypeDisabled: false,
      isDeleteResponsibleTypeChecked: false,
      isDeleteResponsibleTypeDisabled: false,
      isPrintResponsibleTypeChecked: false,
      isPrintResponsibleTypeDisabled: false,
      isExcelResponsibleTypeChecked: false,
      isExcelResponsibleTypeDisabled: false,

      /* #endregion */

      /* #region  [- taskStatus -] */
      isTaskStatusChecked: false,
      isTaskStatusDisabled: false,
      isTaskStatusTaskHidden: true,
      isNewTaskStatusChecked: false,
      isNewTaskStatusDisabled: false,
      isEditTaskStatusChecked: false,
      isEditTaskStatusDisabled: false,
      isDeleteTaskStatusChecked: false,
      isDeleteTaskStatusDisabled: false,
      isPrintTaskStatusChecked: false,
      isPrintTaskStatusDisabled: false,
      isExcelTaskStatusChecked: false,
      isExcelTaskStatusDisabled: false,

      /* #endregion */

      /* #region  [- reportType -] */
      isReportTypeChecked: false,
      isReportTypeDisabled: false,
      isReportTypeTaskHidden: true,
      isNewReportTypeChecked: false,
      isNewReportTypeDisabled: false,
      isEditReportTypeChecked: false,
      isEditReportTypeDisabled: false,
      isDeleteReportTypeChecked: false,
      isDeleteReportTypeDisabled: false,
      isPrintReportTypeChecked: false,
      isPrintReportTypeDisabled: false,
      isExcelReportTypeChecked: false,
      isExcelReportTypeDisabled: false,
      /* #endregion */

      /* #region  [- reasonsSalesReturn -] */
      isReasonsSalesReturnChecked: false,
      isReasonsSalesReturnDisabled: false,
      isReasonsSalesReturnTaskHidden: true,
      isNewReasonsSalesReturnChecked: false,
      isNewReasonsSalesReturnDisabled: false,
      isEditReasonsSalesReturnChecked: false,
      isEditReasonsSalesReturnDisabled: false,
      isDeleteReasonsSalesReturnChecked: false,
      isDeleteReasonsSalesReturnDisabled: false,
      isPrintReasonsSalesReturnChecked: false,
      isPrintReasonsSalesReturnDisabled: false,
      isExcelReasonsSalesReturnChecked: false,
      isExcelReasonsSalesReturnDisabled: false,

      /* #endregion */


      /* #endregion */

      /* #region  [- crmSetting -] */
      isCRMSettingChecked: false,
      isCRMSettingDisabled: false,
      isCRMSettingChildrenHidden: true,

      /* #region  [- rating -] */
      isRatingChecked: false,
      isRatingDisabled: false,
      isRatingTaskHidden: true,
      isNewRatingChecked: false,
      isNewRatingDisabled: false,
      isEditRatingChecked: false,
      isEditRatingDisabled: false,
      isDeleteRatingChecked: false,
      isDeleteRatingDisabled: false,
      isPrintRatingChecked: false,
      isPrintRatingDisabled: false,
      isExcelRatingChecked: false,
      isExcelRatingDisabled: false,
      /* #endregion */

      /* #region  [- accountSource -] */
      isAccountSourceChecked: false,
      isAccountSourceDisabled: false,
      isAccountSourceTaskHidden: true,
      isNewAccountSourceChecked: false,
      isNewAccountSourceDisabled: false,
      isEditAccountSourceChecked: false,
      isEditAccountSourceDisabled: false,
      isDeleteAccountSourceChecked: false,
      isDeleteAccountSourceDisabled: false,
      isPrintAccountSourceChecked: false,
      isPrintAccountSourceDisabled: false,
      isExcelAccountSourceChecked: false,
      isExcelAccountSourceDisabled: false,
      /* #endregion */

      /* #region  [- crmTaskStatus -] */
      isCRMTaskStatusChecked: false,
      isCRMTaskStatusDisabled: false,
      isCRMTaskStatusTaskHidden: true,
      isNewCRMTaskStatusChecked: false,
      isNewCRMTaskStatusDisabled: false,
      isDeleteCRMTaskStatusChecked: false,
      isDeleteCRMTaskStatusDisabled: false,
      isPrintCRMTaskStatusChecked: false,
      isPrintCRMTaskStatusDisabled: false,
      isExcelCRMTaskStatusChecked: false,
      isExcelCRMTaskStatusDisabled: false,
      /* #endregion */

      /* #region  [- crmResponsibleType -] */
      isCRMResponsibleTypeChecked: false,
      isCRMResponsibleTypeDisabled: false,
      isCRMResponsibleTypeTaskHidden: true,
      isNewCRMResponsibleTypeChecked: false,
      isNewCRMResponsibleTypeDisabled: false,
      isEditCRMResponsibleTypeChecked: false,
      isEditCRMResponsibleTypeDisabled: false,
      isDeleteCRMResponsibleTypeChecked: false,
      isDeleteCRMResponsibleTypeDisabled: false,
      isPrintCRMResponsibleTypeChecked: false,
      isPrintCRMResponsibleTypeDisabled: false,
      isExcelCRMResponsibleTypeChecked: false,
      isExcelCRMResponsibleTypeDisabled: false,
      /* #endregion */

      /* #region  [- crmReportType -] */
      isCRMReportTypeChecked: false,
      isCRMReportTypeDisabled: false,
      isCRMReportTypeTaskHidden: true,
      isNewCRMReportTypeChecked: false,
      isNewCRMReportTypeDisabled: false,
      isEditCRMReportTypeChecked: false,
      isEditCRMReportTypeDisabled: false,
      isDeleteCRMReportTypeChecked: false,
      isDeleteCRMReportTypeDisabled: false,
      isPrintCRMReportTypeChecked: false,
      isPrintCRMReportTypeDisabled: false,
      isExcelCRMReportTypeChecked: false,
      isExcelCRMReportTypeDisabled: false,
      /* #endregion */

      /* #endregion */

      /* #region  [- userManagement -] */
      isUserManagementChecked: false,
      isUserManagementChildrenHidden: true,

      /* #region  [- role -] */
      isRoleChecked: false,
      isRoleTaskHidden: true,
      isNewRoleChecked: false,
      isEditRoleChecked: false,
      isDeleteRoleChecked: false,
      isPrintRoleChecked: false,
      isExcelRoleChecked: false,
      /* #endregion */

      /* #region  [- user -] */
      isUserChecked: false,
      isUserTaskHidden: true,
      isNewUserChecked: false,
      isEditUserChecked: false,
      isDeleteUserChecked: false,
      isPrintUserChecked: false,
      isExcelUserChecked: false,
      /* #endregion */

      /* #endregion */

      /* #region  [- ticket -] */
      isTicketSettingChecked: false,
      isTicketSettingChildrenHidden: true,
      /* #endregion */

      /* #region  [- bpms -] */
      isBPMSChecked: false,
      isBPMSChildrenHidden: true,
      /* #endregion */

      /* #endregion */

      /* #region  [- list -] */
      sourceList: [],
      /* #endregion */

      /* #region  [- disabled -] */
      isMarketingSettingDisabled: false,
      isSalesDisabled: false,
      isSalesManagementDisabled: false,
      isSalesManagementCartableDisabled: false,
      isInventoryDisabled: false,
      isNewInventoryDisabled: false,
      isPrintInventoryDisabled: false,
      isEditInventoryDisabled: false,
      isPriceListDisabled: false,
      isPriceListOperationDisabled: false,
      isNewPriceListDisabled: false,
      isEditPriceListDisabled: false,
      isDeletePriceListDisabled: false,
      isArchivePriceListDisabled: false,
      isQuoteDisabled: false,
      isQuoteOperationDisabled: false,
      isNewQuoteDisabled: false,
      isEditQuoteDisabled: false,
      isDeleteQuoteDisabled: false,
      isArchiveQuoteDisabled: false,
      isQuoteDraftDisabled: false,
      isQuoteResponsibilityDisabled: false,
      isQuoteTimelineDisabled: false,
      isQuoteArchiveDisabled: false,
      isOrderDisabled: false,
      isOrderOperationDisabled: false,
      isNewOrderDisabled: false,
      isEditOrderDisabled: false,
      isDeleteOrderDisabled: false,
      isArchiveOrderDisabled: false,
      isOrderDraftDisabled: false,
      isOrderResponsibilityDisabled: false,
      isOrderTimelineDisabled: false,
      isOrderArchiveDisabled: false,
      isInvoiceDisabled: false,
      isInvoiceOperationDisabled: false,
      isNewInvoiceDisabled: false,
      isEditInvoiceDisabled: false,
      isDeleteInvoiceDisabled: false,
      isArchiveInvoiceDisabled: false,
      isInvoiceDraftDisabled: false,
      isInvoiceResponsibilityDisabled: false,
      isInvoiceTimelineDisabled: false,
      isInvoiceArchiveDisabled: false,
      isCRMDisabled: false,
      isAccountManagementDisabled: false,
      isCRMCartableDisabled: false,
      isCRMCartableOperationDisabled: false,
      isNewAccountDisabled: false,
      isEditAccountDisabled: false,
      isDeleteAccountDisabled: false,
      isAccountResponsibilityDisabled: false,
      isAccountChangeLevelDisabled: false,
      isArchiveAccountDisabled: false,
      isCRMCartableDraftDisabled: false,
      isCRMCartableResponsibilityDisabled: false,
      isCRMCartableTimelineDisabled: false,
      isCRMCartableArchiveDisabled: false,
      isManagementDisabled: false,
      isTicketDisabled: false,
      isSettingDisabled: false,
      isPersonDisabled: false,
      isRealPersonDisabled: false,
      isNewRealPersonDisabled: false,
      isEditRealPersonDisabled: false,
      isDeleteRealPersonDisabled: false,
      isPrintRealPersonDisabled: false,
      isExcelRealPersonDisabled: false,
      isLegalPersonDisabled: false,
      isNewLegalPersonDisabled: false,
      isEditLegalPersonDisabled: false,
      isDeleteLegalPersonDisabled: false,
      isPrintLegalPersonDisabled: false,
      isExcelLegalPersonDisabled: false,
      isIndustryDisabled: false,
      isNewIndustryDisabled: false,
      isEditIndustryDisabled: false,
      isDeleteIndustryDisabled: false,
      isPrintIndustryDisabled: false,
      isExcelIndustryDisabled: false,
      isOrganizationTypeDisabled: false,
      isNewOrganizationTypeDisabled: false,
      isEditOrganizationTypeDisabled: false,
      isDeleteOrganizationTypeDisabled: false,
      isPrintOrganizationTypeDisabled: false,
      isExcelOrganizationTypeDisabled: false,
      isCategoryTypeDisabled: false,
      isNewCategoryTypeDisabled: false,
      isEditCategoryTypeDisabled: false,
      isDeleteCategoryTypeDisabled: false,
      isPrintCategoryTypeDisabled: false,
      isExcelCategoryTypeDisabled: false,
      isEducationLevelDisabled: false,
      isNewEducationLevelDisabled: false,
      isEditEducationLevelDisabled: false,
      isDeleteEducationLevelDisabled: false,
      isPrintEducationLevelDisabled: false,
      isExcelEducationLevelDisabled: false,
      isRepresentativeTypeDisabled: false,
      isNewRepresentativeTypeDisabled: false,
      isEditRepresentativeTypeDisabled: false,
      isDeleteRepresentativeTypeDisabled: false,
      isPrintRepresentativeTypeDisabled: false,
      isExcelRepresentativeTypeDisabled: false,
      isTemplateDisabled: false,
      isNewTemplateDisabled: false,
      isEditTemplateDisabled: false,
      isDeleteTemplateDisabled: false,
      isPrintTemplateDisabled: false,
      isExcelTemplateDisabled: false,
      isMaterialDisabled: false,
      isMaterialCardDisabled: false,
      isNewMaterialDisabled: false,
      isEditMaterialDisabled: false,
      isDeleteMaterialDisabled: false,
      isPrintMaterialDisabled: false,
      isExcelMaterialDisabled: false,
      isMaterialCategoryDisabled: false,
      isNewMaterialCategoryDisabled: false,
      isEditMaterialCategoryDisabled: false,
      isDeleteMaterialCategoryDisabled: false,
      isPrintMaterialCategoryDisabled: false,
      isExcelMaterialCategoryDisabled: false,
      isScaleDisabled: false,
      isNewScaleDisabled: false,
      isEditScaleDisabled: false,
      isDeleteScaleDisabled: false,
      isPrintScaleDisabled: false,
      isExcelScaleDisabled: false,
      isWarehouseCategoryDisabled: false,
      isNewWarehouseCategoryDisabled: false,
      isEditWarehouseCategoryDisabled: false,
      isDeleteWarehouseCategoryDisabled: false,
      isPrintWarehouseCategoryDisabled: false,
      isExcelWarehouseCategoryDisabled: false,
      isWarehouseDisabled: false,
      isNewWarehouseDisabled: false,
      isEditWarehouseDisabled: false,
      isDeleteWarehouseDisabled: false,
      isPrintWarehouseDisabled: false,
      isExcelWarehouseDisabled: false,
      isProductDisabled: false,
      isNewProductDisabled: false,
      isEditProductDisabled: false,
      isDeleteProductDisabled: false,
      isPrintProductDisabled: false,
      isExcelProductDisabled: false,
      isProductCategoryDisabled: false,
      isNewProductCategoryDisabled: false,
      isEditProductCategoryDisabled: false,
      isDeleteProductCategoryDisabled: false,
      isPrintProductCategoryDisabled: false,
      isExcelProductCategoryDisabled: false,
      isSupplyChainDisabled: false,
      isNewSupplyChainDisabled: false,
      isEditSupplyChainDisabled: false,
      isDeleteSupplyChainDisabled: false,
      isPrintSupplyChainDisabled: false,
      isExcelSupplyChainDisabled: false,
      isTransportationDisabled: false,
      isServicesSettingDisabled: false,
      isUserManagementDisabled: false,
      isRoleDisabled: false,
      isNewRoleDisabled: false,
      isEditRoleDisabled: false,
      isDeleteRoleDisabled: false,
      isPrintRoleDisabled: false,
      isExcelRoleDisabled: false,
      isUserDisabled: false,
      isNewUserDisabled: false,
      isEditUserDisabled: false,
      isDeleteUserDisabled: false,
      isPrintUserDisabled: false,
      isExcelUserDisabled: false,
      isTicketSettingDisabled: false,
      isBPMSDisabled: false,
      isSalesSettingDisabled: false,
      /* #endregion */
    };
  }
  /* #endregion */

  /* #region  [*** methods ***] */

  /* #region  [*** componentMethods ***] */

  /* #region  [- componentDidMount() -] */
  componentDidMount() {
    this.setAccess(this.props.userPermissionList);
  }
  /* #endregion */

  /* #region  [- componentDidUpdate -] */
  componentDidUpdate(prevProps) {
    this.setAccess(this.props.userPermissionList);
  }
  /* #endregion */

  /* #region  [- setAccess -] */
  setAccess = (userPermissionList) => {
    const sourceList = userPermissionList;

    for (let i = 0; i < sourceList.length; i++) {
      var item = sourceList[i].crmSourceId;
      switch (item) {
        case 1:
          this.setState({
            isManagementCartableChecked: true,
          });
          break;

        case 9:
          this.setState({
            isSalesSettingChecked: true,
            isSalesSettingChildrenHidden: false,
          });
          break;

        case 3:
          this.setState({
            isSalesChecked: true,
            isSalesChildrenHidden: false,
          });
          break;

        case 203:
          this.setState({
            isSalesManagementChecked: true,
          });
          break;

        case 204:
          this.setState({
            isSalesManagementCartableChecked: true,
          });
          break;

        case (212, 213):
          this.setState({
            isInventoryChecked: true,
            isInventoryTaskHidden: false,
          });
          break;

        case (214, 215, 216, 217, 218, 219, 220, 221):
          this.setState({
            isNewInventoryChecked: true,
          });
          break;

        case 367:
          this.setState({
            isPrintInventoryChecked: true,
          });
          break;
        case 915:
          this.setState({
            isEditInventoryChecked: true,
          });
          break;

        case 205:
          this.setState({
            isPriceListChecked: true,
            isPriceListTaskHidden: false,
          });
          break;

        case (382, 383):
          this.setState({
            isPriceListOperationChecked: true,
            isPriceListOperationTaskHidden: false,
          });
          break;

        case (384, 385, 386, 387, 388, 389, 390):
          this.setState({
            isNewPriceListChecked: true,
          });
          break;

        case (385, 386, 387, 388, 389, 390, 391, 392):
          this.setState({
            isEditPriceListChecked: true,
          });
          break;

        case (393, 394):
          this.setState({
            isDeletePriceListChecked: true,
          });
          break;

        case 206:
          this.setState({
            isQuoteChecked: true,
            isQuoteTaskHidden: false,
          });
          break;

        case (395, 396, 397, 398):
          this.setState({
            isQuoteOperationChecked: true,
            isQuoteOperationTaskHidden: false,
          });
          break;

        case 399:
          this.setState({
            isNewQuoteChecked: true,
          });
          break;

        case 407:
          this.setState({
            isEditQuoteChecked: true,
          });
          break;

        case (410, 411):
          this.setState({
            isDeleteQuoteChecked: true,
          });
          break;

        case (483, 511, 512):
          this.setState({
            isMergeQuoteChecked: true,
          });
          break;

        case (484, 513, 514):
          this.setState({
            isSplitQuoteChecked: true,
          });
          break;

        case (485, 515, 516):
          this.setState({
            isConvertQuoteChecked: true,
          });
          break;

        case 207:
          this.setState({
            isOrderChecked: true,
            isOrderTaskHidden: false,
          });
          break;

        case (412, 413, 414, 415, 416, 417):
          this.setState({
            isOrderOperationChecked: true,
            isOrderOperationTaskHidden: false,
          });
          break;

        case (418, 420, 421, 422, 423, 425, 426):
          this.setState({
            isNewOrderChecked: true,
          });
          break;

        case (418, 420, 421, 422, 423, 425, 426, 427, 428, 429, 430):
          this.setState({
            isEditOrderChecked: true,
          });
          break;

        case (431, 432):
          this.setState({
            isDeleteOrderChecked: true,
          });
          break;

        case 486:
          this.setState({
            isConvertOrderToInvoiceChecked: true,
          });
          break;

        case 487:
          this.setState({
            isMergeOrderToInvoiceChecked: true,
          });

          break;

        case 488:
          this.setState({
            isSplitOrderToInvoiceChecked: true,
          });
          break;

        case 208:
          this.setState({
            isInvoiceChecked: true,
            isInvoiceTaskHidden: false,
          });
          break;

        case (433, 434, 435, 437, 438, 439):
          this.setState({
            isInvoiceOperationChecked: true,
            isInvoiceOperationTaskHidden: false,
          });
          break;

        case (440, 441, 442, 443, 445, 446, 700, 701):
          this.setState({
            isNewInvoiceChecked: true,
            isEditInvoiceChecked: true,
          });
          break;

        case (441, 442, 443, 445, 446, 447, 448, 449, 450):
          this.setState({
            isNewInvoiceChecked: true,
            isEditInvoiceChecked: true,
          });
          break;

        case (451, 452):
          this.setState({
            isDeleteInvoiceChecked: true,
          });
          break;

        case 489:
          this.setState({
            isRequisitionChecked: true,
            isRequisitionTaskHidden: false,
          });
          break;

        case 491:
          this.setState({
            isNewRequisitionChecked: true,
            isRequisitionTaskHidden: false,
          });
          break;

        case 496:
          this.setState({
            isDeleteRequisitionChecked: true,
            isRequisitionTaskHidden: false,
          });
          break;

        case 2:
          this.setState({
            isCRMChecked: true,
            isCRMChildrenHidden: false,
          });
          break;

        case 209:
          this.setState({
            isAccountManagementChecked: true,
          });
          break;

        case 210:
          this.setState({
            isCRMCartableChecked: true,
            isCRMCrtableTaskHidden: false,
          });
          break;

        case (368, 369):
          this.setState({
            isCRMCartableOperationChecked: true,
            isCRMCrtableOperationTaskHidden: false,
          });
          break;

        case (370, 371, 372, 373, 374, 375, 376):
          this.setState({
            isNewAccountChecked: true,
          });
          break;

        case (371, 372, 373, 374, 375, 376, 377):
          this.setState({
            isEditAccountChecked: true,
          });
          break;

        case (378, 379):
          this.setState({
            isDeleteAccountChecked: true,
          });
          break;

        case (380, 381):
          this.setState({
            isAccountChangeLevelChecked: true,
          });
          break;

        case 12:
          this.setState({
            isManagementChecked: true,
          });
          break;

        case 14:
          this.setState({
            isTicketSettingChecked: true,
          });
          break;
        case 481:
          this.setState({
            isTicketChecked: true,
          });
          break;

        case 4:
          this.setState({
            isSettingChecked: true,
            isSettingChildrenHidden: false,
          });
          break;

        case 5:
          this.setState({
            isPersonChecked: true,
            isPersonChildrenHidden: false,
          });
          break;

        case (16, 17):
          this.setState({
            isRealPersonChecked: true,
            isRealPersonTaskHidden: false,
          });
          break;

        case (18, 19):
          this.setState({
            isNewRealPersonChecked: true,
          });
          break;

        case (20, 21, 22):
          this.setState({
            isEditRealPersonChecked: true,
          });
          break;

        case (23, 24):
          this.setState({
            isDeleteRealPersonChecked: true,
          });
          break;

        case 25:
          this.setState({
            isPrintRealPersonChecked: true,
          });
          break;

        case 26:
          this.setState({
            isExcelRealPersonChecked: true,
          });
          break;

        case (27, 28):
          this.setState({
            isLegalPersonChecked: true,
            isLegalPersonTaskHidden: false,
          });
          break;

        case (29, 30):
          this.setState({
            isNewLegalPersonChecked: true,
          });
          break;

        case (31, 32, 33):
          this.setState({
            isEditLegalPersonChecked: true,
          });
          break;

        case (34, 35):
          this.setState({
            isDeleteLegalPersonChecked: true,
          });
          break;

        case 36:
          this.setState({
            isPrintLegalPersonChecked: true,
          });
          break;

        case 37:
          this.setState({
            isExcelLegalPersonChecked: true,
          });
          break;

        case (38, 39):
          this.setState({
            isIndustryChecked: true,
            isIndustryTaskHidden: false,
          });
          break;

        case (40, 41):
          this.setState({
            isNewIndustryChecked: true,
          });
          break;

        case (42, 43, 44):
          this.setState({
            isEditIndustryChecked: true,
          });
          break;

        case (45, 46):
          this.setState({
            isDeleteIndustryChecked: true,
          });
          break;

        case 47:
          this.setState({
            isPrintIndustryChecked: true,
          });
          break;

        case 48:
          this.setState({
            isExcelIndustryChecked: true,
          });
          break;

        case (49, 50):
          this.setState({
            isOrganizationTypeChecked: true,
            isOrganizationTypeTaskHidden: false,
          });
          break;

        case (51, 52):
          this.setState({
            isNewOrganizationTypeChecked: true,
          });
          break;

        case (53, 54, 55):
          this.setState({
            isEditOrganizationTypeChecked: true,
          });
          break;

        case (56, 57):
          this.setState({
            isDeleteOrganizationTypeChecked: true,
          });
          break;

        case 58:
          this.setState({
            isPrintOrganizationTypeChecked: true,
          });
          break;

        case 59:
          this.setState({
            isExcelOrganizationTypeChecked: true,
          });
          break;

        case (60, 61):
          this.setState({
            isCategoryTypeChecked: true,
            isCategoryTypeTaskHidden: false,
          });
          break;

        case (62, 63):
          this.setState({
            isNewCategoryTypeChecked: true,
          });
          break;

        case (64, 65, 66):
          this.setState({
            isEditCategoryTypeChecked: true,
          });
          break;

        case (67, 68):
          this.setState({
            isDeleteCategoryTypeChecked: true,
          });
          break;

        case 69:
          this.setState({
            isPrintCategoryTypeChecked: true,
          });
          break;

        case 70:
          this.setState({
            isExcelCategoryTypeChecked: true,
          });
          break;

        case (71, 72):
          this.setState({
            isEducationLevelChecked: true,
            isEducationLevelTaskHidden: false,
          });
          break;

        case (73, 74):
          this.setState({
            isNewEducationLevelChecked: true,
          });
          break;

        case (75, 76, 77):
          this.setState({
            isEditEducationLevelChecked: true,
          });
          break;

        case (78, 79):
          this.setState({
            isDeleteEducationLevelChecked: true,
          });
          break;

        case 80:
          this.setState({
            isPrintEducationLevelChecked: true,
          });
          break;

        case 81:
          this.setState({
            isExcelEducationLevelChecked: true,
          });
          break;

        case (82, 83):
          this.setState({
            isRepresentativeTypeChecked: true,
            isRepresentativeTypeTaskHidden: false,
          });
          break;

        case (84, 85):
          this.setState({
            isNewRepresentativeTypeChecked: true,
          });
          break;

        case (86, 87, 88):
          this.setState({
            isEditRepresentativeTypeChecked: true,
          });
          break;

        case (89, 90):
          this.setState({
            isDeleteRepresentativeTypeChecked: true,
          });
          break;

        case 91:
          this.setState({
            isPrintRepresentativeTypeChecked: true,
          });
          break;

        case 92:
          this.setState({
            isExcelRepresentativeTypeChecked: true,
          });
          break;

        case (93, 94):
          this.setState({
            isTemplateChecked: true,
            isTemplateTaskHidden: false,
          });
          break;

        case (95, 96):
          this.setState({
            isNewTemplateChecked: true,
          });
          break;

        case (97, 98, 99):
          this.setState({
            isEditTemplateChecked: true,
          });
          break;

        case (100, 101):
          this.setState({
            isDeleteTemplateChecked: true,
          });
          break;

        case 102:
          this.setState({
            isPrintTemplateChecked: true,
          });
          break;

        case 103:
          this.setState({
            isExcelTemplateChecked: true,
          });
          break;

        case 6:
          this.setState({
            isMaterialChecked: true,
            isMaterialChildrenHidden: false,
          });
          break;

        case (791, 792,793,794):
          this.setState({
            isMaterialCardChecked: true,
            isMaterialCardTaskHidden: false,
          });
          break;

        case (795, 796,797,798,799,800,801,802,803,804,805,806,807,808,913):
          this.setState({
            isNewMaterialChecked: true,
          });
          break;

        case (811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,914):
          this.setState({
            isEditMaterialChecked: true,
          });
          break;

        case (809, 810):
          this.setState({
            isDeleteMaterialChecked: true,
          });
          break;

        // case 113:
        //   this.setState({
        //     isPrintMaterialChecked: true,
        //   });
        //   break;

        // case 114:
        //   this.setState({
        //     isExcelMaterialChecked: true,
        //   });
        //   break;

        case (780, 781):
          this.setState({
            isMaterialCategoryChecked: true,
            isMaterialCategoryTaskHidden: false,
          });
          break;

        case (782, 783,784):
          this.setState({
            isNewMaterialCategoryChecked: true,
          });
          break;

        case (787,788,789,790):
          this.setState({
            isEditMaterialCategoryChecked: true,
          });
          break;

        case (785,786):
          this.setState({
            isDeleteMaterialCategoryChecked: true,
          });
          break;

        // case 124:
        //   this.setState({
        //     isPrintMaterialCategoryChecked: true,
        //   });
        //   break;

        // case 125:
        //   this.setState({
        //     isExcelMaterialCategoryChecked: true,
        //   });
        //   break;

        case (828, 829):
          this.setState({
            isScaleChecked: true,
            isScaleTaskHidden: false,
          });
          break;

        case (830,831,832):
          this.setState({
            isNewScaleChecked: true,
          });
          break;

        case (836,837,838):
          this.setState({
            isEditScaleChecked: true,
          });
          break;

        case (833, 834):
          this.setState({
            isDeleteScaleChecked: true,
          });
          break;

        // case 135:
        //   this.setState({
        //     isPrintScaleChecked: true,
        //   });
        //   break;

        // case 136:
        //   this.setState({
        //     isExcelScaleChecked: true,
        //   });
        //   break;

        case (861, 862):
          this.setState({
            isWarehouseCategoryChecked: true,
            isWarehouseCategoryTaskHidden: false,
          });
          break;

        case (863, 864,865):
          this.setState({
            isNewWarehouseCategoryChecked: true,
          });
          break;

        case (868, 869, 870):
          this.setState({
            isEditWarehouseCategoryChecked: true,
          });
          break;

        case (866, 867):
          this.setState({
            isDeleteWarehouseCategoryChecked: true,
          });
          break;

        // case 146:
        //   this.setState({
        //     isPrintWarehouseCategoryChecked: true,
        //   });
        //   break;

        // case 147:
        //   this.setState({
        //     isExcelWarehouseCategoryChecked: true,
        //   });
        //   break;

        case (871, 872):
          this.setState({
            isWarehouseChecked: true,
            isWarehouseTaskHidden: false,
          });
          break;

        case (873, 874,875,876,883,884,885,886,887,888):
          this.setState({
            isNewWarehouseChecked: true,
          });
          break;

        case (879,880,881,882,889,890,891,892,893,894):
          this.setState({
            isEditWarehouseChecked: true,
          });
          break;

        case (877, 878):
          this.setState({
            isDeleteWarehouseChecked: true,
          });
          break;

        // case 157:
        //   this.setState({
        //     isPrintWarehouseChecked: true,
        //   });
        //   break;

        // case 158:
        //   this.setState({
        //     isExcelWarehouseChecked: true,
        //   });
        //   break;

        case (895,896,897,898,899):
          this.setState({
            isProductChecked: true,
            isProductTaskHidden: false,
          });
          break;

        case (900,901,902,903,904,905,906,907):
          this.setState({
            isNewProductChecked: true,
          });
          break;

        case (910,911,912):
          this.setState({
            isEditProductChecked: true,
          });
          break;

        case (908,909):
          this.setState({
            isDeleteProductChecked: true,
          });
          break;

        // case 168:
        //   this.setState({
        //     isPrintProductChecked: true,
        //   });
        //   break;

        // case 169:
        //   this.setState({
        //     isExcelProductChecked: true,
        //   });
        //   break;

        case (850,851):
          this.setState({
            isProductCategoryChecked: true,
            isProductCategoryTaskHidden: false,
          });
          break;

        case (852,853,854,855):
          this.setState({
            isNewProductCategoryChecked: true,
          });
          break;

        case (858,859,860):
          this.setState({
            isEditProductCategoryChecked: true,
          });
          break;

        case (856,857):
          this.setState({
            isDeleteProductCategoryChecked: true,
          });
          break;


        case (839,840):
          this.setState({
            isSupplyChainChecked: true,
            isSupplyChainTaskHidden: false,
          });
          break;

        case (841,842,843):
          this.setState({
            isNewSupplyChainChecked: true,
          });
          break;

        case (846,847,848,849):
          this.setState({
            isEditSupplyChainChecked: true,
          });
          break;

        case (844,845):
          this.setState({
            isDeleteSupplyChainChecked: true,
          });
          break;


        case 179:
          this.setState({
            isPrintSupplyChainChecked: true,
          });
          break;

        case 180:
          this.setState({
            isExcelSupplyChainChecked: true,
          });
          break;

        case 10:
          this.setState({
            isTransportationChecked: true,
          });
          break;

        case 11:
          this.setState({
            isServicesSettingChecked: true,
          });
          break;

        case 13:
          this.setState({
            isUserManagementChecked: true,
            isUserManagementChildrenHidden: false,
          });
          break;

        case (181, 182):
          this.setState({
            isRoleChecked: true,
            isRoleTaskHidden: false,
          });
          break;

        case (183, 184):
          this.setState({
            isNewRoleChecked: true,
          });
          break;

        case (185, 186, 187):
          this.setState({
            isEditRoleChecked: true,
          });
          break;

        case (188, 189):
          this.setState({
            isDeleteRoleChecked: true,
          });
          break;

        case 190:
          this.setState({
            isPrintRoleChecked: true,
          });
          break;

        case 191:
          this.setState({
            isExcelRoleChecked: true,
          });
          break;

        case (192, 193):
          this.setState({
            isUserChecked: true,
            isUserTaskHidden: false,
          });
          break;

        case (194, 195, 359, 360, 361):
          this.setState({
            isNewUserChecked: true,
          });
          break;

        case (196, 197, 362, 363, 364, 365, 366):
          this.setState({
            isEditUserChecked: true,
          });
          break;

        case (199, 200):
          this.setState({
            isDeleteUserChecked: true,
          });
          break;

        case 201:
          this.setState({
            isPrintUserChecked: true,
          });
          break;

        case 202:
          this.setState({
            isExcelUserChecked: true,
          });
          break;

        // case 14:
        //   this.setState({
        //     isTicketSettingChecked: true,
        //   });
        //   break;

        // case 481:
        //   this.setState({
        //     isTicketChecked: true,
        //   });
        //   break;

        case 15:
          this.setState({
            isBPMSChecked: true,
          });
          break;

        case (222, 223):
          this.setState({
            isAccountTypeChecked: true,
            isAccountTypeTaskHidden: false,
          });
          break;

        case (224, 226):
          this.setState({
            isNewAccountTypeChecked: true,
          });
          break;

        case (229, 230, 231):
          this.setState({
            isEditAccountTypeChecked: true,
          });
          break;

        case (227, 228):
          this.setState({
            isDeleteAccountTypeChecked: true,
          });
          break;

        case 453:
          this.setState({
            isPrintAccountTypeChecked: true,
          });
          break;

        case 454:
          this.setState({
            isExcelAccountTypeChecked: true,
          });
          break;

        case (232, 233):
          this.setState({
            isFinancialCaseTypeChecked: true,
            isFinancialCaseTypeTaskHidden: false,
          });
          break;

        case (234, 235):
          this.setState({
            isNewFinancialCaseTypeChecked: true,
          });
          break;

        case (238, 239, 240):
          this.setState({
            isEditFinancialCaseTypeChecked: true,
          });
          break;

        case (236, 237):
          this.setState({
            isDeleteFinancialCaseTypeChecked: true,
          });
          break;

        case 455:
          this.setState({
            isPrintFinancialCaseTypeChecked: true,
          });
          break;

        case 456:
          this.setState({
            isExcelFinancialCaseTypeChecked: true,
          });
          break;

        case (241, 242):
          this.setState({
            isTermTypeChecked: true,
            isTermTypeTaskHidden: false,
          });
          break;

        case (243, 244):
          this.setState({
            isNewTermTypeChecked: true,
          });
          break;

        case (247, 248, 249):
          this.setState({
            isEditTermTypeChecked: true,
          });
          break;

        case (245, 246):
          this.setState({
            isDeleteTermTypeChecked: true,
          });
          break;

        case 457:
          this.setState({
            isPrintTermTypeChecked: true,
          });
          break;

        case 458:
          this.setState({
            isExcelTermTypeChecked: true,
          });
          break;

        case (250, 251):
          this.setState({
            isPaymentMethodChecked: true,
            isPaymentMethodTaskHidden: false,
          });
          break;

        case (252, 253):
          this.setState({
            isNewPaymentMethodChecked: true,
          });
          break;

        case (256, 257, 258):
          this.setState({
            isEditPaymentMethodChecked: true,
          });
          break;

        case (254, 255):
          this.setState({
            isDeletePaymentMethodChecked: true,
          });
          break;

        case 459:
          this.setState({
            isPrintPaymentMethodChecked: true,
          });
          break;

        case 460:
          this.setState({
            isExcelPaymentMethodChecked: true,
          });
          break;

        case (259, 260):
          this.setState({
            isDeliveryTermChecked: true,
            isDeliveryTermTaskHidden: false,
          });
          break;

        case (261, 262):
          this.setState({
            isNewDeliveryTermChecked: true,
          });
          break;

        case (265, 267, 268):
          this.setState({
            isEditDeliveryTermChecked: true,
          });
          break;

        case (263, 264):
          this.setState({
            isDeleteDeliveryTermChecked: true,
          });
          break;

        case 461:
          this.setState({
            isPrintDeliveryTermChecked: true,
          });
          break;

        case 462:
          this.setState({
            isExcelDeliveryTermChecked: true,
          });
          break;

        case (269, 270):
          this.setState({
            isShippingMethodChecked: true,
            isShippingMethodTaskHidden: false,
          });
          break;

        case (271, 272):
          this.setState({
            isNewShippingMethodChecked: true,
          });
          break;

        case (276, 277, 278):
          this.setState({
            isEditShippingMethodChecked: true,
          });
          break;

        case (273, 275):
          this.setState({
            isDeleteShippingMethodChecked: true,
          });
          break;

        case 463:
          this.setState({
            isPrintShippingMethodChecked: true,
          });
          break;

        case 464:
          this.setState({
            isExcelShippingMethodChecked: true,
          });
          break;

        case (279, 280):
          this.setState({
            isResponsibleTypeChecked: true,
            isResponsibleTypeTaskHidden: false,
          });
          break;

        case (281, 282):
          this.setState({
            isNewResponsibleTypeChecked: true,
          });
          break;

        case (285, 286, 287):
          this.setState({
            isEditResponsibleTypeChecked: true,
          });
          break;

        case (283, 284):
          this.setState({
            isDeleteResponsibleTypeChecked: true,
          });
          break;

        case 465:
          this.setState({
            isPrintResponsibleTypeChecked: true,
          });
          break;

        case 466:
          this.setState({
            isExcelResponsibleTypeChecked: true,
          });
          break;

        case (288, 289):
          this.setState({
            isTaskStatusChecked: true,
            isTaskStatusTaskHidden: false,
          });
          break;

        case (290, 291):
          this.setState({
            isNewTaskStatusChecked: true,
          });
          break;

        case (294, 295, 296):
          this.setState({
            isEditTaskStatusChecked: true,
          });
          break;

        case (292, 293):
          this.setState({
            isDeleteTaskStatusChecked: true,
          });
          break;

        case 467:
          this.setState({
            isPrintTaskStatusChecked: true,
          });
          break;

        case 468:
          this.setState({
            isExcelTaskStatusChecked: true,
          });
          break;

        case (297, 298):
          this.setState({
            isReportTypeChecked: true,
            isReportTypeTaskHidden: false,
          });
          break;

        case (299, 300):
          this.setState({
            isNewReportTypeChecked: true,
          });
          break;

        case (303, 304, 305):
          this.setState({
            isEditReportTypeChecked: true,
          });
          break;

        case (301, 302):
          this.setState({
            isDeleteReportTypeChecked: true,
          });
          break;

        case 469:
          this.setState({
            isPrintReportTypeChecked: true,
          });
          break;

        case 470:
          this.setState({
            isExcelReportTypeChecked: true,
          });
          break;

        case 8:
          this.setState({
            isCRMSettingChecked: true,
            isCRMSettingChildrenHidden: false,
          });
          break;

        case (306, 307):
          this.setState({
            isRatingChecked: true,
            isRatingTaskHidden: false,
          });
          break;

        case (308, 309):
          this.setState({
            isNewRatingChecked: true,
          });
          break;

        case (312, 313, 314):
          this.setState({
            isEditRatingChecked: true,
          });
          break;

        case (310, 311):
          this.setState({
            isDeleteRatingChecked: true,
          });
          break;

        case 471:
          this.setState({
            isPrintRatingChecked: true,
          });
          break;

        case 472:
          this.setState({
            isExcelRatingChecked: true,
          });
          break;

        case (315, 316):
          this.setState({
            isAccountSourceChecked: true,
            isAccountSourceTaskHidden: false,
          });
          break;

        case (317, 318):
          this.setState({
            isNewAccountSourceChecked: true,
          });
          break;

        case (321, 322, 323):
          this.setState({
            isEditAccountSourceChecked: true,
          });
          break;

        case (319, 320):
          this.setState({
            isDeleteAccountSourceChecked: true,
          });
          break;

        case 473:
          this.setState({
            isPrintAccountSourceChecked: true,
          });
          break;

        case 474:
          this.setState({
            isExcelAccountSourceChecked: true,
          });
          break;

        case (342, 343):
          this.setState({
            isCRMTaskStatusChecked: true,
            isCRMTaskStatusTaskHidden: false,
          });
          break;

        case (344, 345):
          this.setState({
            isNewCRMTaskStatusChecked: true,
          });
          break;

        case (349, 350, 351):
          this.setState({
            isEditCRMTaskStatusChecked: true,
          });
          break;

        case (346, 347):
          this.setState({
            isDeleteCRMTaskStatusChecked: true,
          });
          break;

        case 475:
          this.setState({
            isPrintCRMTaskStatusChecked: true,
          });
          break;

        case 476:
          this.setState({
            isExcelCRMTaskStatusChecked: true,
          });
          break;

        case (324, 325):
          this.setState({
            isCRMResponsibleTypeChecked: true,
            isCRMResponsibleTypeTaskHidden: false,
          });
          break;

        case (326, 327):
          this.setState({
            isNewCRMResponsibleTypeChecked: true,
          });
          break;

        case (330, 331, 332):
          this.setState({
            isEditCRMResponsibleTypeChecked: true,
          });
          break;

        case (328, 329):
          this.setState({
            isDeleteCRMResponsibleTypeChecked: true,
          });
          break;

        case 477:
          this.setState({
            isPrintCRMResponsibleTypeChecked: true,
          });
          break;

        case 478:
          this.setState({
            isExcelCRMResponsibleTypeChecked: true,
          });
          break;

        case (333, 334):
          this.setState({
            isCRMReportTypeChecked: true,
            isCRMReportTypeTaskHidden: false,
          });
          break;

        case (335, 336):
          this.setState({
            isNewCRMReportTypeChecked: true,
          });
          break;

        case (339, 340, 341):
          this.setState({
            isEditCRMReportTypeChecked: true,
          });
          break;

        case (337, 338):
          this.setState({
            isDeleteCRMReportTypeChecked: true,
          });
          break;

        case 479:
          this.setState({
            isPrintCRMReportTypeChecked: true,
          });
          break;

        case 480:
          this.setState({
            isExcelCRMReportTypeChecked: true,
          });
          break;

        case 7:
          this.setState({
            isMarketingSettingChecked: true,
          });
          break;

        case (539, 542, 543, 544, 545, 547, 595):
          this.setState({
            isQuoteTimelineChecked: true,
            isQuoteTimelineTaskHidden: false,
          });
          break;

        case (540, 549, 550, 551):
          this.setState({
            isNewQuoteTimelineChecked: true,
          });
          break;

        case (541, 552):
          this.setState({
            isDeleteQuoteTimelineChecked: true,
          });
          break;

        case (582, 583, 584, 585, 586, 587):
          this.setState({
            isOrderTimelineChecked: true,
            isOrderTimelineTaskHidden: false,
          });
          break;

        case (590, 594):
          this.setState({
            isNewOrderTimelineChecked: true,
          });
          break;

        case (591, 593):
          this.setState({
            isDeleteOrderTimelineChecked: true,
          });
          break;

        case (502, 619, 620):
          this.setState({
            isMergeOrderToOrderChecked: true,
          });
          break;

        case (503, 621, 622):
          this.setState({
            isSplitOrderToOrderChecked: true,
          });
          break;

        case (501, 636, 637):
          this.setState({
            isCorrespondingOrderToOrderChecked: true,
          });
          break;

        case (487, 506, 507):
          this.setState({
            isMergeOrderToInvoiceChecked: true,
          });
          break;

        case (499, 634, 635):
          this.setState({
            isMergeOrderToQuoteChecked: true,
          });
          break;

        case (500, 631, 633):
          this.setState({
            isSplitOrderToQuoteChecked: true,
          });
          break;

        case (498, 629, 630):
          this.setState({
            isConvertOrderToQuoteChecked: true,
          });
          break;

        case (641, 645, 646, 647, 648, 649):
          this.setState({
            isInvoiceTimelineChecked: true,
            isInvoiceTimelineTaskHidden: false,
          });
          break;

        case (642, 650, 651, 652):
          this.setState({
            isNewInvoiceTimelineChecked: true,
          });
          break;

        case (643, 644):
          this.setState({
            isDeleteInvoiceTimelineChecked: true,
          });
          break;

        case (672, 673):
          this.setState({
            isCorrespondingInvoiceToInvoiceChecked: true,
          });
          break;

        case (697, 698, 699):
          this.setState({
            isInvoiceRequisitionChecked: true,
          });
          break;

        case (680, 681, 682):
          this.setState({
            isMergeInvoiceToOrderChecked: true,
          });
          break;

        case (677, 678, 679):
          this.setState({
            isSplitInvoiceToOrderChecked: true,
          });
          break;

        case (674, 675, 676):
          this.setState({
            isConvertInvoiceToOrderChecked: true,
          });
          break;

        case (683, 684):
          this.setState({
            isCorrespondingInvoiceToOrderChecked: true,
          });
          break;

        case (702, 703):
          this.setState({
            isReasonsSalesReturnChecked: true,
            isReasonsSalesReturnTaskHidden: false,
          });
          break;

        case (704, 705):
          this.setState({
            isNewReasonsSalesReturnChecked: true,
          });
          break;

        case (706, 707, 708):
          this.setState({
            isEditReasonsSalesReturnChecked: true,
          });
          break;

        case (709, 710):
          this.setState({
            isDeleteReasonsSalesReturnChecked: true,
          });
          break;

        case 711:
          this.setState({
            isPrintReasonsSalesReturnChecked: true,
          });
          break;

        case 712:
          this.setState({
            isExcelReasonsSalesReturnChecked: true,
          });
          break;

        case (713, 729, 730, 731, 732, 733, 777, 778, 779):
          this.setState({
            isSalesReturnChecked: true,
            isSalesReturnTaskHidden: false,
          });
          break;

        case (714, 715, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755,
          756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776):
          this.setState({
            isNewSalesReturnChecked: true,
            isSalesReturnTaskHidden: false,
            isEditSalesReturnChecked: true,
          });
          break;

        case (714, 715, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755,
          756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776):
          this.setState({
            isNewSalesReturnChecked: true,
            isSalesReturnTaskHidden: false,
            isEditSalesReturnChecked: true,
          });
          break;

        case (716, 734):
          this.setState({
            isDeleteSalesReturnChecked: true,
            isSalesReturnTaskHidden: false,
          });
          break;


        case (717, 718):
          this.setState({
            isManualActivityTypeChecked: true,
            isManualActivityTypeTaskHidden: false,
          });
          break;

        case (720, 721):
          this.setState({
            isNewManualActivityTypeChecked: true,
          });
          break;

        case (722, 723, 724):
          this.setState({
            isEditManualActivityTypeChecked: true,
          });
          break;

        case (725, 726):
          this.setState({
            isDeleteManualActivityTypeChecked: true,
          });
          break;

        case (727):
          this.setState({
            isPrintManualActivityTypeChecked: true,
          });
          break;


        case (728):
          this.setState({
            isExcelManualActivityTypeChecked: true,
          });
          break;
        default:
          break;
      }

    }
  };
  /* #endregion */

  /* #endregion */

  /* #region  [*** Handle Changes ***] */

  /* #region  [- handleChange(e, key) -] */
  handleChange = async (e, key) => {
    switch (key) {
      /* #region  [- managementCartable -] */
      case "managementCartable":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 1 });
          await this.postUserPermission(true);
          this.setState({
            isManagementCartableChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]

          // const filteredItems = items.filter(item => item.sourceId !== 12)
          this.state.sourceList.push({ sourceId: 1 });
          await this.postUserPermission(false);
          this.setState({
            isManagementCartableChecked: e,
            //sourceList: filteredItems
          });
        }
        break;

      /* #endregion */

      /* #region  [- sales -] */

      case "sales":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 3 });
          await this.postUserPermission(true);

          this.setState({
            isSalesChecked: e,
            isSalesChildrenHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 3 },
            { sourceId: 203 },
            { sourceId: 204 },
            { sourceId: 212 },
            { sourceId: 213 },
            { sourceId: 214 },
            { sourceId: 215 },
            { sourceId: 216 },
            { sourceId: 217 },
            { sourceId: 218 },
            { sourceId: 219 },
            { sourceId: 220 },
            { sourceId: 221 },
            { sourceId: 367 },
            { sourceId: 205 },
            { sourceId: 382 },
            { sourceId: 383 },
            { sourceId: 384 },
            { sourceId: 385 },
            { sourceId: 386 },
            { sourceId: 387 },
            { sourceId: 388 },
            { sourceId: 389 },
            { sourceId: 390 },
            { sourceId: 391 },
            { sourceId: 392 },
            { sourceId: 393 },
            { sourceId: 394 },
            { sourceId: 206 },
            { sourceId: 395 },
            { sourceId: 396 },
            { sourceId: 397 },
            { sourceId: 398 },
            { sourceId: 399 },
            { sourceId: 400 },
            { sourceId: 401 },
            { sourceId: 402 },
            { sourceId: 403 },
            { sourceId: 404 },
            { sourceId: 405 },
            { sourceId: 406 },
            { sourceId: 407 },
            { sourceId: 408 },
            { sourceId: 409 },
            { sourceId: 410 },
            { sourceId: 411 },
            { sourceId: 207 },
            { sourceId: 412 },
            { sourceId: 413 },
            { sourceId: 414 },
            { sourceId: 415 },
            { sourceId: 416 },
            { sourceId: 417 },
            { sourceId: 418 },
            { sourceId: 419 },
            { sourceId: 420 },
            { sourceId: 421 },
            { sourceId: 422 },
            { sourceId: 423 },
            { sourceId: 425 },
            { sourceId: 426 },
            { sourceId: 427 },
            { sourceId: 428 },
            { sourceId: 429 },
            { sourceId: 430 },
            { sourceId: 431 },
            { sourceId: 432 },
            { sourceId: 208 },
            { sourceId: 433 },
            { sourceId: 434 },
            { sourceId: 435 },
            { sourceId: 437 },
            { sourceId: 438 },
            { sourceId: 439 },
            { sourceId: 440 },
            { sourceId: 441 },
            { sourceId: 442 },
            { sourceId: 443 },
            { sourceId: 444 },
            { sourceId: 445 },
            { sourceId: 446 },
            { sourceId: 447 },
            { sourceId: 448 },
            { sourceId: 449 },
            { sourceId: 450 },
            { sourceId: 451 },
            { sourceId: 452 },
            { sourceId: 489 },
            { sourceId: 490 },
            { sourceId: 491 },
            { sourceId: 492 },
            { sourceId: 493 },
            { sourceId: 494 },
            { sourceId: 495 },
            { sourceId: 496 },
            { sourceId: 497 },
            { sourceId: 483 },
            { sourceId: 484 },
            { sourceId: 485 },
            { sourceId: 486 },
            { sourceId: 487 },
            { sourceId: 488 },
            { sourceId: 517 },
            { sourceId: 518 },
            { sourceId: 519 },
            { sourceId: 520 },
            { sourceId: 521 },
            { sourceId: 522 },
            { sourceId: 523 },
            { sourceId: 524 },
            { sourceId: 525 },
            { sourceId: 527 },
            { sourceId: 528 },
            { sourceId: 529 },
            { sourceId: 530 },
            { sourceId: 531 },
            { sourceId: 533 },
            { sourceId: 534 },
            { sourceId: 535 },
            { sourceId: 536 },
            { sourceId: 537 },
            { sourceId: 538 },
            { sourceId: 511 },
            { sourceId: 512 },
            { sourceId: 513 },
            { sourceId: 514 },
            { sourceId: 515 },
            { sourceId: 516 },
            { sourceId: 506 },
            { sourceId: 507 },
            { sourceId: 508 },
            { sourceId: 509 },
            { sourceId: 504 },
            { sourceId: 405 },
            { sourceId: 539 },
            { sourceId: 540 },
            { sourceId: 541 },
            { sourceId: 542 },
            { sourceId: 543 },
            { sourceId: 544 },
            { sourceId: 545 },
            { sourceId: 547 },
            { sourceId: 595 },
            { sourceId: 549 },
            { sourceId: 550 },
            { sourceId: 551 },
            { sourceId: 552 },
            { sourceId: 582 },
            { sourceId: 590 },
            { sourceId: 591 },
            { sourceId: 583 },
            { sourceId: 584 },
            { sourceId: 585 },
            { sourceId: 586 },
            { sourceId: 587 },
            { sourceId: 592 },
            { sourceId: 593 },
            { sourceId: 594 },
            { sourceId: 502 },
            { sourceId: 619 },
            { sourceId: 620 },
            { sourceId: 503 },
            { sourceId: 621 },
            { sourceId: 622 },
            { sourceId: 501 },
            { sourceId: 636 },
            { sourceId: 637 },
            { sourceId: 499 },
            { sourceId: 634 },
            { sourceId: 635 },
            { sourceId: 500 },
            { sourceId: 631 },
            { sourceId: 633 },
            { sourceId: 498 },
            { sourceId: 620 },
            { sourceId: 630 },
            { sourceId: 641 },
            { sourceId: 545 },
            { sourceId: 646 },
            { sourceId: 647 },
            { sourceId: 648 },
            { sourceId: 649 },
            { sourceId: 642 },
            { sourceId: 643 },
            { sourceId: 650 },
            { sourceId: 651 },
            { sourceId: 652 },
            { sourceId: 644 },
            { sourceId: 672 },
            { sourceId: 673 },
            { sourceId: 697 },
            { sourceId: 698 },
            { sourceId: 699 },
            { sourceId: 700 },
            { sourceId: 701 },
            { sourceId: 680 },
            { sourceId: 681 },
            { sourceId: 682 },
            { sourceId: 677 },
            { sourceId: 678 },
            { sourceId: 679 },
            { sourceId: 674 },
            { sourceId: 675 },
            { sourceId: 676 },
            { sourceId: 683 },
            { sourceId: 684 },
            { sourceId: 713 },
            { sourceId: 714 },
            { sourceId: 715 },
            { sourceId: 716 },
            { sourceId: 729 },
            { sourceId: 730 },
            { sourceId: 731 },
            { sourceId: 732 },
            { sourceId: 733 },
            { sourceId: 734 },
            { sourceId: 777 },
            { sourceId: 778 },
            { sourceId: 779 },

            { sourceId: 735 },
            { sourceId: 736 },
            { sourceId: 737 },
            { sourceId: 738 },
            { sourceId: 739 },
            { sourceId: 740 },
            { sourceId: 741 },
            { sourceId: 742 },
            { sourceId: 743 },
            { sourceId: 744 },
            { sourceId: 745 },
            { sourceId: 746 },
            { sourceId: 747 },
            { sourceId: 748 },
            { sourceId: 749 },
            { sourceId: 750 },
            { sourceId: 751 },
            { sourceId: 752 },
            { sourceId: 753 },
            { sourceId: 754 },
            { sourceId: 755 },

            { sourceId: 756 },
            { sourceId: 757 },
            { sourceId: 758 },
            { sourceId: 759 },
            { sourceId: 760 },
            { sourceId: 761 },
            { sourceId: 762 },
            { sourceId: 763 },
            { sourceId: 764 },
            { sourceId: 765 },
            { sourceId: 766 },
            { sourceId: 767 },
            { sourceId: 768 },
            { sourceId: 769 },
            { sourceId: 770 },
            { sourceId: 771 },
            { sourceId: 772 },
            { sourceId: 773 },
            { sourceId: 774 },
            { sourceId: 775 },
            { sourceId: 776 },
            { sourceId: 915 }

          );
          await this.postUserPermission(false);

          this.setState({
            isSalesChecked: e,
            isSalesChildrenHidden: true,
            //sourceList: filteredItems,
            isInventoryChecked: false,
            isInventoryTaskHidden: true,
            isNewInventoryChecked: false,
            isPrintInventoryChecked: false,
            isEditInventoryChecked: false,
            isSalesManagementChecked: false,
            isSalesManagementCartableChecked: false,
            /* #region [- priceList -] */
            isPriceListChecked: e,
            isPriceListTaskHidden: true,
            isPriceListOperationTaskHidden: true,
            isPriceListOperationChecked: false,
            isNewPriceListChecked: false,
            isEditPriceListChecked: false,
            isDeletePriceListChecked: false,
            isArchivePriceListChecked: false,
            isPriceListDraftChecked: false,
            isPriceListTimelineChecked: false,
            isPriceListResponsibilityChecked: false,
            isPriceListArchiveChecked: false,

            /* #endregion */

            /* #region  [- quote -] */
            isQuoteChecked: false,
            isQuoteTaskHidden: true,
            isQuoteOperationTaskHidden: true,
            isQuoteOperationChecked: false,
            isNewQuoteChecked: false,
            isEditQuoteChecked: false,
            isDeleteQuoteChecked: false,
            isArchiveQuoteChecked: false,
            isQuoteDraftChecked: false,
            isQuoteResponsibilityChecked: false,
            isQuotetArchiveChecked: false,
            isMergeQuoteChecked: false,
            isSplitQuoteChecked: false,
            isConvertQuoteChecked: false,

            /* #region  [- timeline -] */
            isQuoteTimelineChecked: false,
            isNewQuoteTimelineChecked: false,
            isDeleteQuoteTimelineChecked: false,
            isQuoteTimelineTaskHidden: true,
            /* #endregion */

            /* #endregion */

            /* #region  [- order -] */
            isOrderChecked: false,
            isOrderTaskHidden: true,
            isOrderOperationChecked: false,
            isOrderOperationTaskHidden: true,
            isNewOrderChecked: false,
            isEditOrderChecked: false,
            isDeleteOrderChecked: false,
            isArchiveOrderChecked: false,
            isOrderDraftChecked: false,
            isOrderResponsibilityChecked: false,
            isOrderArchiveChecked: false,
            isMergeOrderToInvoiceChecked: false,
            isSplitOrderToInvoiceChecked: false,
            isConvertOrderToInvoiceChecked: false,
            isMergeOrderToOrderChecked: false,
            isSplitOrderToOrderChecked: false,
            isCorrespondingOrderToOrderChecked: false,
            isMergeOrderToQuoteChecked: false,
            isSplitOrderToQuoteChecked: false,
            isConvertOrderToQuoteChecked: false,
            /* #region  [- timeline -] */
            isOrderTimelineChecked: false,
            isNewOrderTimelineChecked: false,
            isDeleteOrderTimelineChecked: false,
            isOrderTimelineTaskHidden: true,
            /* #endregion */

            /* #endregion */

            /* #region  [- invoice -] */
            isInvoiceChecked: false,
            isInvoiceTaskHidden: true,
            isInvoiceOperationChecked: false,
            isInvoiceOperationTaskHidden: true,
            isNewInvoiceChecked: false,
            isEditInvoiceChecked: false,
            isDeleteInvoiceChecked: false,
            isArchiveInvoiceChecked: false,
            isInvoiceDraftChecked: false,
            isInvoiceResponsibilityChecked: false,
            isInvoiceArchiveChecked: false,
            isRequisitionChecked: false,
            isNewRequisitionChecked: false,
            isDeleteRequisitionChecked: false,
            isEditRequisitionChecked: false,
            isArchiveRequisitionChecked: false,
            isRequisitionTaskHidden: true,
            isCorrespondingInvoiceToInvoiceChecked: false,
            isInvoiceRequisitionChecked: false,
            isMergeInvoiceToOrderChecked: false,
            isSplitInvoiceToOrderChecked: false,
            isConvertInvoiceToOrderChecked: false,
            isCorrespondingInvoiceToOrderChecked: false,
            /* #region  [- timeline -] */
            isInvoiceTimelineChecked: false,
            isNewInvoiceTimelineChecked: false,
            isDeleteInvoiceTimelineChecked: false,
            isInvoiceTimelineTaskHidden: true,
            /* #endregion */

            /* #region  [- salesReturn -] */
            isSalesReturnChecked: false,
            isSalesReturnDisabled: false,
            isSalesReturnTaskHidden: true,
            isNewSalesReturnChecked: false,
            isNewSalesReturnDisabled: false,
            isEditSalesReturnChecked: false,
            isEditSalesReturnDisabled: false,
            isDeleteSalesReturnChecked: false,
            isDeleteSalesReturnDisabled: false,
            /* #endregion */

            /* #endregion */
          });
        }
        break;

      /* #region  [- salesManagement -] */
      case "salesManagement":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 203 });
          await this.postUserPermission(true);
          this.setState({
            isSalesManagementChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [203];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 203 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isSalesManagementChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- salesManagementCartable-] */
      case "salesManagementCartable":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 204 });
          await this.postUserPermission(true);
          this.setState({
            isSalesManagementCartableChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [204];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 204 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isSalesManagementCartableChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- inventory -] */
      case "inventory":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 212 }, { sourceId: 213 });
          await this.postUserPermission(true);
          this.setState({
            isInventoryChecked: e,
            isInventoryTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 212 },
            { sourceId: 213 },
            { sourceId: 214 },
            { sourceId: 215 },
            { sourceId: 216 },
            { sourceId: 217 },
            { sourceId: 218 },
            { sourceId: 219 },
            { sourceId: 220 },
            { sourceId: 221 },
            { sourceId: 367 },
            { sourceId: 915 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isInventoryChecked: e,
            isInventoryTaskHidden: true,
            isNewInventoryChecked: false,
            isExcelInventoryChecked: false,
            isPrintInventoryChecked: false,
            isEditInventoryChecked: false,
          });
        }
        break;

      // case "newInventory":
      //   if (e === true) {
      //     this.state.sourceList.push(
      //       { sourceId: 214 },
      //       { sourceId: 215 },
      //       { sourceId: 216 },
      //       { sourceId: 217 },
      //       { sourceId: 218 },
      //       { sourceId: 219 },
      //       { sourceId: 220 },
      //       { sourceId: 221 }
      //     );
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isNewInventoryChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [214, 215, 216, 217, 218, 219, 220, 221];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push(
      //       { sourceId: 214 },
      //       { sourceId: 215 },
      //       { sourceId: 216 },
      //       { sourceId: 217 },
      //       { sourceId: 218 },
      //       { sourceId: 219 },
      //       { sourceId: 220 },
      //       { sourceId: 221 }
      //     );
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       isNewInventoryChecked: e,
      //     });
      //   }
      //   break;

      case "editInventory":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 915 });
          await this.postUserPermission(true);
          this.setState({
            isPrintInventoryChecked: e,
          });
        } else {

          this.state.sourceList.push({ sourceId: 915 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isPrintInventoryChecked: e,
          });
        }
        break;

      case "printInventory":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 367 });
          await this.postUserPermission(true);
          this.setState({
            isPrintInventoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 367 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isPrintInventoryChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- priceList -] */

      case "priceList":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 205 },
            { sourceId: 382 },
            { sourceId: 383 }
          );
          await this.postUserPermission(true);
          this.setState({
            isPriceListChecked: e,
            isPriceListTaskHidden: false,
            isPriceListOperationChecked: e,
            isPriceListOperationTaskHidden: true,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [205, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 205 },
            { sourceId: 382 },
            { sourceId: 383 },
            { sourceId: 384 },
            { sourceId: 385 },
            { sourceId: 386 },
            { sourceId: 387 },
            { sourceId: 388 },
            { sourceId: 389 },
            { sourceId: 390 },
            { sourceId: 391 },
            { sourceId: 392 },
            { sourceId: 393 },
            { sourceId: 394 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPriceListChecked: e,
            isPriceListTaskHidden: true,
            isPriceListOperationTaskHidden: true,
            isPriceListOperationChecked: e,
            isNewPriceListChecked: false,
            isEditPriceListChecked: false,
            isDeletePriceListChecked: false,
            isArchivePriceListChecked: false,
            isPriceListDraftChecked: false,
            isPriceListTimelineChecked: false,
            isPriceListResponsibilityChecked: false,
            isPriceListArchiveChecked: false,
          });
        }
        break;

      case "priceListOparation":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 382 }, { sourceId: 383 });
          await this.postUserPermission(true);
          this.setState({
            isPriceListOperationChecked: e,
            isPriceListOperationTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 382 },
            { sourceId: 383 },
            { sourceId: 384 },
            { sourceId: 385 },
            { sourceId: 386 },
            { sourceId: 387 },
            { sourceId: 388 },
            { sourceId: 389 },
            { sourceId: 390 },
            { sourceId: 391 },
            { sourceId: 392 },
            { sourceId: 393 },
            { sourceId: 394 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPriceListOperationChecked: e,
            isPriceListOperationTaskHidden: true,
            isNewPriceListChecked: false,
            isEditPriceListChecked: false,
            isDeletePriceListChecked: false,
            isArchivePriceListChecked: false,
          });
        }
        break;

      case "newPriceList":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 384 },
            { sourceId: 385 },
            { sourceId: 391 },
            { sourceId: 392 },
            { sourceId: 386 },
            { sourceId: 387 },
            { sourceId: 388 },
            { sourceId: 389 },
            { sourceId: 390 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewPriceListChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [384, 385, 386, 387, 388, 389, 390];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 391 },
            { sourceId: 392 },
            { sourceId: 384 },
            { sourceId: 385 },
            { sourceId: 386 },
            { sourceId: 387 },
            { sourceId: 388 },
            { sourceId: 389 },
            { sourceId: 390 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewPriceListChecked: e,
            isEditPriceListChecked: false,
          });
        }
        break;

      case "editPriceList":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 391 },
            { sourceId: 392 },
            { sourceId: 385 },
            { sourceId: 386 },
            { sourceId: 387 },
            { sourceId: 388 },
            { sourceId: 389 },
            { sourceId: 390 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditPriceListChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [391, 392, 385, 386, 387, 388, 389, 390];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 384 },
            { sourceId: 385 },
            { sourceId: 386 },
            { sourceId: 387 },
            { sourceId: 388 },
            { sourceId: 389 },
            { sourceId: 390 },
            { sourceId: 391 },
            { sourceId: 392 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditPriceListChecked: e,
            isNewPriceListChecked: false,
          });
        }
        break;

      case "deletePriceList":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 393 }, { sourceId: 394 });
          await this.postUserPermission(true);
          this.setState({
            isDeletePriceListChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [393, 394];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 393 }, { sourceId: 394 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeletePriceListChecked: e,
          });
        }
        break;

      case "archivePriceList":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isArchivePriceListChecked: e,
          });
        } else {
          //const items = [...this.state.sourceList]
          //const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          //const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isArchivePriceListChecked: e,
          });
        }
        break;

      case "priceListDraft":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isPriceListDraftChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isPriceListDraftChecked: e,
          });
        }
        break;

      case "priceListResponsibility":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isPriceListResponsibilityChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isPriceListResponsibilityChecked: e,
          });
        }
        break;

      case "priceListTimeline":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isPriceListTimelineChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isPriceListTimelineChecked: e,
          });
        }
        break;

      case "priceListArchive":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isPriceListArchiveChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isPriceListArchiveChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- quote -] */

      case "quote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 206 },
            { sourceId: 395 },
            { sourceId: 396 },
            { sourceId: 397 },
            { sourceId: 398 }
          );
          await this.postUserPermission(true);
          this.setState({
            isQuoteChecked: e,
            isQuoteTaskHidden: false,
            isQuoteOperationChecked: e,
            isQuoteOperationTaskHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 206 },
            { sourceId: 395 },
            { sourceId: 396 },
            { sourceId: 397 },
            { sourceId: 398 },
            { sourceId: 399 },
            { sourceId: 400 },
            { sourceId: 401 },
            { sourceId: 402 },
            { sourceId: 403 },
            { sourceId: 404 },
            { sourceId: 405 },
            { sourceId: 406 },
            { sourceId: 407 },
            { sourceId: 408 },
            { sourceId: 409 },
            { sourceId: 410 },
            { sourceId: 411 },
            { sourceId: 483 },
            { sourceId: 484 },
            { sourceId: 485 },
            { sourceId: 517 },
            { sourceId: 518 },
            { sourceId: 519 },
            { sourceId: 520 },
            { sourceId: 521 },
            { sourceId: 522 },
            { sourceId: 523 },
            { sourceId: 524 },
            { sourceId: 525 },
            { sourceId: 527 },
            { sourceId: 528 },
            { sourceId: 529 },
            { sourceId: 530 },
            { sourceId: 531 },
            { sourceId: 533 },
            { sourceId: 534 },
            { sourceId: 535 },
            { sourceId: 536 },
            { sourceId: 537 },
            { sourceId: 538 },
            { sourceId: 511 },
            { sourceId: 512 },
            { sourceId: 513 },
            { sourceId: 514 },
            { sourceId: 515 },
            { sourceId: 516 },
            { sourceId: 539 },
            { sourceId: 540 },
            { sourceId: 541 },
            { sourceId: 542 },
            { sourceId: 543 },
            { sourceId: 544 },
            { sourceId: 545 },
            { sourceId: 547 },
            { sourceId: 595 },
            { sourceId: 549 },
            { sourceId: 550 },
            { sourceId: 551 },
            { sourceId: 552 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isQuoteChecked: e,
            isQuoteTaskHidden: true,
            isQuoteOperationTaskHidden: true,
            isQuoteOperationChecked: e,
            isNewQuoteChecked: false,
            isEditQuoteChecked: false,
            isDeleteQuoteChecked: false,
            isArchiveQuoteChecked: false,
            isQuoteDraftChecked: false,
            isQuoteResponsibilityChecked: false,
            isQuotetArchiveChecked: false,
            isMergeQuoteChecked: false,
            isSplitQuoteChecked: false,
            isConvertQuoteChecked: false,

            /* #region  [- timeline -] */
            isQuoteTimelineChecked: false,
            isNewQuoteTimelineChecked: false,
            isDeleteQuoteTimelineChecked: false,
            isQuoteTimelineTaskHidden: true,
            /* #endregion */
          });
        }
        break;

      case "quoteOparation":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 395 },
            { sourceId: 396 },
            { sourceId: 397 },
            { sourceId: 398 }
          );
          await this.postUserPermission(true);
          this.setState({
            isQuoteOperationChecked: e,
            isQuoteOperationTaskHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 395 },
            { sourceId: 396 },
            { sourceId: 397 },
            { sourceId: 398 },
            { sourceId: 399 },
            { sourceId: 400 },
            { sourceId: 401 },
            { sourceId: 402 },
            { sourceId: 403 },
            { sourceId: 404 },
            { sourceId: 405 },
            { sourceId: 406 },
            { sourceId: 407 },
            { sourceId: 408 },
            { sourceId: 409 },
            { sourceId: 410 },
            { sourceId: 411 },
            { sourceId: 483 },
            { sourceId: 484 },
            { sourceId: 485 },
            { sourceId: 517 },
            { sourceId: 518 },
            { sourceId: 519 },
            { sourceId: 520 },
            { sourceId: 521 },
            { sourceId: 522 },
            { sourceId: 523 },
            { sourceId: 524 },
            { sourceId: 525 },
            { sourceId: 527 },
            { sourceId: 528 },
            { sourceId: 529 },
            { sourceId: 530 },
            { sourceId: 531 },
            { sourceId: 533 },
            { sourceId: 534 },
            { sourceId: 535 },
            { sourceId: 536 },
            { sourceId: 537 },
            { sourceId: 538 },
            { sourceId: 511 },
            { sourceId: 512 },
            { sourceId: 513 },
            { sourceId: 514 },
            { sourceId: 515 },
            { sourceId: 516 },
            { sourceId: 549 },
            { sourceId: 550 },
            { sourceId: 551 },
            { sourceId: 552 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isQuoteOperationChecked: e,
            isQuoteOperationTaskHidden: true,
            isNewQuoteChecked: false,
            isEditQuoteChecked: false,
            isDeleteQuoteChecked: false,
            isArchiveQuoteChecked: false,
            isMergeQuoteChecked: false,
            isSplitQuoteChecked: false,
            isConvertQuoteChecked: false,

          });
        }
        break;

      case "newQuote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 399 },
            { sourceId: 400 },
            { sourceId: 401 },
            { sourceId: 402 },
            { sourceId: 403 },
            { sourceId: 404 },
            { sourceId: 405 },
            { sourceId: 406 },
            { sourceId: 517 },
            { sourceId: 518 },
            { sourceId: 519 },
            { sourceId: 520 },
            { sourceId: 521 },
            { sourceId: 522 },
            { sourceId: 523 },
            { sourceId: 524 },
            { sourceId: 525 },
            { sourceId: 527 },
            { sourceId: 528 },
            { sourceId: 529 },
            { sourceId: 530 },
            { sourceId: 531 },
            { sourceId: 533 },
            { sourceId: 534 },
            { sourceId: 535 },
            { sourceId: 536 },
            { sourceId: 537 },
            { sourceId: 538 },
            { sourceId: 407 },
            { sourceId: 408 },
            { sourceId: 409 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewQuoteChecked: e,
            isEditQuoteChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 399 },
            { sourceId: 400 },
            { sourceId: 401 },
            { sourceId: 402 },
            { sourceId: 403 },
            { sourceId: 404 },
            { sourceId: 405 },
            { sourceId: 406 },
            { sourceId: 517 },
            { sourceId: 518 },
            { sourceId: 519 },
            { sourceId: 520 },
            { sourceId: 521 },
            { sourceId: 522 },
            { sourceId: 523 },
            { sourceId: 524 },
            { sourceId: 525 },
            { sourceId: 527 },
            { sourceId: 528 },
            { sourceId: 529 },
            { sourceId: 530 },
            { sourceId: 531 },
            { sourceId: 533 },
            { sourceId: 534 },
            { sourceId: 535 },
            { sourceId: 536 },
            { sourceId: 537 },
            { sourceId: 538 },
            { sourceId: 407 },
            { sourceId: 408 },
            { sourceId: 409 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewQuoteChecked: e,
            isEditQuoteChecked: false,
          });
        }
        break;

      case "editQuote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 399 },
            { sourceId: 400 },
            { sourceId: 401 },
            { sourceId: 402 },
            { sourceId: 403 },
            { sourceId: 404 },
            { sourceId: 405 },
            { sourceId: 406 },
            { sourceId: 517 },
            { sourceId: 518 },
            { sourceId: 519 },
            { sourceId: 520 },
            { sourceId: 521 },
            { sourceId: 522 },
            { sourceId: 523 },
            { sourceId: 524 },
            { sourceId: 525 },
            { sourceId: 527 },
            { sourceId: 528 },
            { sourceId: 529 },
            { sourceId: 530 },
            { sourceId: 531 },
            { sourceId: 533 },
            { sourceId: 534 },
            { sourceId: 535 },
            { sourceId: 536 },
            { sourceId: 537 },
            { sourceId: 538 },
            { sourceId: 407 },
            { sourceId: 408 },
            { sourceId: 409 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditQuoteChecked: e,
            isNewQuoteChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 399 },
            { sourceId: 400 },
            { sourceId: 401 },
            { sourceId: 402 },
            { sourceId: 403 },
            { sourceId: 404 },
            { sourceId: 405 },
            { sourceId: 406 },
            { sourceId: 517 },
            { sourceId: 518 },
            { sourceId: 519 },
            { sourceId: 520 },
            { sourceId: 521 },
            { sourceId: 522 },
            { sourceId: 523 },
            { sourceId: 524 },
            { sourceId: 525 },
            { sourceId: 527 },
            { sourceId: 528 },
            { sourceId: 529 },
            { sourceId: 530 },
            { sourceId: 531 },
            { sourceId: 533 },
            { sourceId: 534 },
            { sourceId: 535 },
            { sourceId: 536 },
            { sourceId: 537 },
            { sourceId: 538 },
            { sourceId: 407 },
            { sourceId: 408 },
            { sourceId: 409 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditQuoteChecked: e,
            isNewQuoteChecked: false,
          });
        }
        break;

      case "deleteQuote":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 410 }, { sourceId: 411 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteQuoteChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [410, 411];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 410 }, { sourceId: 411 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteQuoteChecked: e,
          });
        }
        break;

      case "mergeQuote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 483 },
            { sourceId: 511 },
            { sourceId: 512 }
          );
          await this.postUserPermission(true);
          this.setState({
            isMergeQuoteChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 483 },
            { sourceId: 511 },
            { sourceId: 512 }
          );
          await this.postUserPermission(false);
          this.setState({
            isMergeQuoteChecked: e,
          });
        }
        break;

      case "splitQuote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 484 },
            { sourceId: 513 },
            { sourceId: 514 }
          );
          await this.postUserPermission(true);
          this.setState({
            isSplitQuoteChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 484 },
            { sourceId: 513 },
            { sourceId: 514 }
          );
          await this.postUserPermission(false);
          this.setState({
            isSplitQuoteChecked: e,
          });
        }
        break;

      case "convertQuote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 485 },
            { sourceId: 515 },
            { sourceId: 516 }
          );
          await this.postUserPermission(true);
          this.setState({
            isConvertQuoteChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 485 },
            { sourceId: 515 },
            { sourceId: 516 }
          );
          await this.postUserPermission(false);
          this.setState({
            isConvertQuoteChecked: e,
          });
        }
        break;

      case "archiveQuote":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isArchiveQuoteChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isArchiveQuoteChecked: e,
          });
        }
        break;

      case "quoteDraft":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isQuoteDraftChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isQuoteDraftChecked: e,
          });
        }
        break;

      case "quoteResponsibility":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isQuoteResponsibilityChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isQuoteResponsibilityChecked: e,
          });
        }
        break;

      case "quoteTimeline":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 539 },
            { sourceId: 542 },
            { sourceId: 543 },
            { sourceId: 544 },
            { sourceId: 545 },
            { sourceId: 547 },
            { sourceId: 595 }
          );
          await this.postUserPermission(true);
          this.setState({
            isQuoteTimelineChecked: e,
            isQuoteTimelineTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 539 },
            { sourceId: 540 },
            { sourceId: 541 },
            { sourceId: 542 },
            { sourceId: 543 },
            { sourceId: 544 },
            { sourceId: 545 },
            { sourceId: 547 },
            { sourceId: 595 },
            { sourceId: 549 },
            { sourceId: 550 },
            { sourceId: 551 },
            { sourceId: 552 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isQuoteTimelineChecked: e,
            isNewQuoteTimelineChecked: e,
            isDeleteQuoteTimelineChecked: e,
            isQuoteTimelineTaskHidden: true,
          });
        }
        break;

      case "newQuoteTimeline":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 540 },
            { sourceId: 549 },
            { sourceId: 550 },
            { sourceId: 551 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewQuoteTimelineChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 540 },
            { sourceId: 549 },
            { sourceId: 550 },
            { sourceId: 551 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isNewQuoteTimelineChecked: e,
          });
        }
        break;

      case "deleteQuoteTimeline":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 541 }, { sourceId: 552 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteQuoteTimelineChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 541 }, { sourceId: 552 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isDeleteQuoteTimelineChecked: e,
          });
        }
        break;

      case "quoteArchive":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isQuoteArchiveChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isQuoteArchiveChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- order -] */

      case "order":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 207 },
            { sourceId: 412 },
            { sourceId: 413 },
            { sourceId: 414 },
            { sourceId: 415 },
            { sourceId: 416 },
            { sourceId: 417 }
          );
          await this.postUserPermission(true);
          this.setState({
            isOrderChecked: e,
            isOrderTaskHidden: false,
            isOrderOperationChecked: e,
            isOrderOperationTaskHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 207 },
            { sourceId: 412 },
            { sourceId: 413 },
            { sourceId: 414 },
            { sourceId: 415 },
            { sourceId: 416 },
            { sourceId: 417 },
            { sourceId: 418 },
            { sourceId: 420 },
            { sourceId: 421 },
            { sourceId: 422 },
            { sourceId: 423 },
            { sourceId: 425 },
            { sourceId: 426 },
            { sourceId: 427 },
            { sourceId: 428 },
            { sourceId: 429 },
            { sourceId: 430 },
            { sourceId: 431 },
            { sourceId: 432 },
            { sourceId: 486 },
            { sourceId: 487 },
            { sourceId: 488 },
            { sourceId: 506 },
            { sourceId: 507 },
            { sourceId: 508 },
            { sourceId: 509 },
            { sourceId: 504 },
            { sourceId: 405 },
            { sourceId: 582 },
            { sourceId: 590 },
            { sourceId: 591 },
            { sourceId: 583 },
            { sourceId: 584 },
            { sourceId: 585 },
            { sourceId: 586 },
            { sourceId: 587 },
            { sourceId: 592 },
            { sourceId: 593 },
            { sourceId: 594 },
            { sourceId: 502 },
            { sourceId: 619 },
            { sourceId: 620 },
            { sourceId: 503 },
            { sourceId: 621 },
            { sourceId: 622 },
            { sourceId: 501 },
            { sourceId: 636 },
            { sourceId: 637 },
            { sourceId: 487 },
            { sourceId: 627 },
            { sourceId: 628 },
            { sourceId: 499 },
            { sourceId: 634 },
            { sourceId: 635 },
            { sourceId: 500 },
            { sourceId: 631 },
            { sourceId: 633 },
            { sourceId: 498 },
            { sourceId: 629 },
            { sourceId: 630 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isOrderChecked: e,
            isOrderTaskHidden: true,
            isOrderOperationTaskHidden: true,
            isOrderOperationChecked: e,
            isNewOrderChecked: false,
            isEditOrderChecked: false,
            isDeleteOrderChecked: false,
            isArchiveOrderChecked: false,
            isOrderDraftChecked: false,
            isOrderResponsibilityChecked: false,
            isOrderArchiveChecked: false,
            isMergeOrderToInvoiceChecked: false,
            isSplitOrderToInvoiceChecked: false,
            isConvertOrderToInvoiceChecked: false,
            isMergeOrderToOrderChecked: false,
            isSplitOrderToOrderChecked: false,
            isCorrespondingOrderToOrderChecked: false,
            isMergeOrderToQuoteChecked: false,
            isSplitOrderToQuoteChecked: false,
            isConvertOrderToQuoteChecked: false,
            /* #region  [- timeline -] */
            isOrderTimelineChecked: false,
            isNewOrderTimelineChecked: false,
            isDeleteOrderTimelineChecked: false,
            isOrderTimelineTaskHidden: true,
            /* #endregion */
          });
        }
        break;

      case "orderOparation":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 412 },
            { sourceId: 413 },
            { sourceId: 414 },
            { sourceId: 415 },
            { sourceId: 416 },
            { sourceId: 417 }
          );
          await this.postUserPermission(true);
          this.setState({
            isOrderOperationChecked: e,
            isOrderOperationTaskHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 412 },
            { sourceId: 413 },
            { sourceId: 414 },
            { sourceId: 415 },
            { sourceId: 416 },
            { sourceId: 417 },
            { sourceId: 418 },
            { sourceId: 420 },
            { sourceId: 421 },
            { sourceId: 422 },
            { sourceId: 423 },
            { sourceId: 425 },
            { sourceId: 426 },
            { sourceId: 427 },
            { sourceId: 428 },
            { sourceId: 429 },
            { sourceId: 430 },
            { sourceId: 431 },
            { sourceId: 432 },
            { sourceId: 486 },
            { sourceId: 487 },
            { sourceId: 488 },
            { sourceId: 506 },
            { sourceId: 507 },
            { sourceId: 508 },
            { sourceId: 509 },
            { sourceId: 504 },
            { sourceId: 405 },
            { sourceId: 593 },
            { sourceId: 594 },
            { sourceId: 502 },
            { sourceId: 619 },
            { sourceId: 620 },
            { sourceId: 503 },
            { sourceId: 621 },
            { sourceId: 622 },
            { sourceId: 501 },
            { sourceId: 636 },
            { sourceId: 637 },
            { sourceId: 487 },
            { sourceId: 627 },
            { sourceId: 628 },
            { sourceId: 499 },
            { sourceId: 634 },
            { sourceId: 635 },
            { sourceId: 500 },
            { sourceId: 631 },
            { sourceId: 633 },
            { sourceId: 498 },
            { sourceId: 629 },
            { sourceId: 630 },
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isOrderOperationChecked: e,
            isOrderOperationTaskHidden: true,
            isNewOrderChecked: false,
            isEditOrderChecked: false,
            isDeleteOrderChecked: false,
            isArchiveOrderChecked: false,
            isMergeOrderToInvoiceChecked: false,
            isSplitOrderToInvoiceChecked: false,
            isConvertOrderToInvoiceChecked: false,
            isMergeOrderToOrderChecked: false,
            isSplitOrderToOrderChecked: false,
            isCorrespondingOrderToOrderChecked: false,
            isMergeOrderToQuoteChecked: false,
            isSplitOrderToQuoteChecked: false,
            isConvertOrderToQuoteChecked: false,


          });
        }
        break;

      case "newOrder":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 418 },
            { sourceId: 420 },
            { sourceId: 421 },
            { sourceId: 422 },
            { sourceId: 423 },
            { sourceId: 425 },
            { sourceId: 426 },
            { sourceId: 427 },
            { sourceId: 428 },
            { sourceId: 429 },
            { sourceId: 430 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewOrderChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [418, 420, 421, 422, 423, 425, 426];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 418 },
            { sourceId: 420 },
            { sourceId: 421 },
            { sourceId: 422 },
            { sourceId: 423 },
            { sourceId: 425 },
            { sourceId: 426 },
            { sourceId: 427 },
            { sourceId: 428 },
            { sourceId: 429 },
            { sourceId: 430 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewOrderChecked: e,
            isEditOrderChecked: false,
          });
        }
        break;

      case "editOrder":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 418 },
            { sourceId: 420 },
            { sourceId: 421 },
            { sourceId: 422 },
            { sourceId: 423 },
            { sourceId: 425 },
            { sourceId: 426 },
            { sourceId: 427 },
            { sourceId: 428 },
            { sourceId: 429 },
            { sourceId: 430 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditOrderChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [427, 420, 421, 422, 423, 425, 426, 428, 429, 430];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 418 },
            { sourceId: 420 },
            { sourceId: 421 },
            { sourceId: 422 },
            { sourceId: 423 },
            { sourceId: 425 },
            { sourceId: 426 },
            { sourceId: 427 },
            { sourceId: 428 },
            { sourceId: 429 },
            { sourceId: 430 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditOrderChecked: e,
            isNewOrderChecked: false,
          });
        }
        break;

      case "deleteOrder":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 431 }, { sourceId: 432 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteOrderChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [431, 432];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 431 }, { sourceId: 432 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteOrderChecked: e,
          });
        }
        break;

      case "mergeOrderToOrder":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 502 },
            { sourceId: 619 },
            { sourceId: 620 }
          );
          await this.postUserPermission(true);
          this.setState({
            isMergeOrderToOrderChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 502 },
            { sourceId: 619 },
            { sourceId: 620 }
          );
          await this.postUserPermission(false);
          this.setState({
            isMergeOrderToOrderChecked: e,
          });
        }
        break;

      case "splitOrderToOrder":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 503 },
            { sourceId: 621 },
            { sourceId: 622 }
          );
          await this.postUserPermission(true);
          this.setState({
            isSplitOrderToOrderChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 503 },
            { sourceId: 621 },
            { sourceId: 622 }
          );
          await this.postUserPermission(false);
          this.setState({
            isSplitOrderToOrderChecked: e,
          });
        }
        break;

      case "correspondingOrderToOrder":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 501 },
            { sourceId: 636 },
            { sourceId: 637 }
          );
          await this.postUserPermission(true);
          this.setState({
            isCorrespondingOrderToOrderChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 501 },
            { sourceId: 636 },
            { sourceId: 637 }
          );
          await this.postUserPermission(false);
          this.setState({
            isCorrespondingOrderToOrderChecked: e,
          });
        }
        break;

      case "mergeOrderToInvoice":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 487 },
            { sourceId: 506 },
            { sourceId: 507 }
          );
          await this.postUserPermission(true);
          this.setState({
            isMergeOrderToInvoiceChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 487 },
            { sourceId: 506 },
            { sourceId: 507 }
          );
          await this.postUserPermission(false);
          this.setState({
            isMergeOrderToInvoiceChecked: e,
          });
        }
        break;

      case "splitOrderToInvoice":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 488 },
            { sourceId: 508 },
            { sourceId: 509 }
          );
          await this.postUserPermission(true);
          this.setState({
            isSplitOrderToInvoiceChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 488 },
            { sourceId: 508 },
            { sourceId: 509 }
          );
          await this.postUserPermission(false);
          this.setState({
            isSplitOrderToInvoiceChecked: e,
          });
        }
        break;

      case "convertOrderToInvoice":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 486 },
            { sourceId: 504 },
            { sourceId: 405 }
          );
          await this.postUserPermission(true);
          this.setState({
            isConvertOrderToInvoiceChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 486 },
            { sourceId: 504 },
            { sourceId: 405 }
          );
          await this.postUserPermission(false);
          this.setState({
            isConvertOrderToInvoiceChecked: e,
          });
        }
        break;

      case "mergeOrderToQuote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 499 },
            { sourceId: 634 },
            { sourceId: 635 }
          );
          await this.postUserPermission(true);
          this.setState({
            isMergeOrderToQuoteChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 499 },
            { sourceId: 634 },
            { sourceId: 635 }
          );
          await this.postUserPermission(false);
          this.setState({
            isMergeOrderToQuoteChecked: e,
          });
        }
        break;

      case "splitOrderToQuote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 500 },
            { sourceId: 631 },
            { sourceId: 633 }
          );
          await this.postUserPermission(true);
          this.setState({
            isSplitOrderToQuoteChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 500 },
            { sourceId: 631 },
            { sourceId: 633 }
          );
          await this.postUserPermission(false);
          this.setState({
            isSplitOrderToQuoteChecked: e,
          });
        }
        break;

      case "convertOrderToQuote":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 498 },
            { sourceId: 629 },
            { sourceId: 630 }
          );
          await this.postUserPermission(true);
          this.setState({
            isConvertOrderToQuoteChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 498 },
            { sourceId: 629 },
            { sourceId: 630 }
          );
          await this.postUserPermission(false);
          this.setState({
            isConvertOrderToQuoteChecked: e,
          });
        }
        break;

      case "archiveOrder":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isArchiveOrderChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isArchiveOrderChecked: e,
          });
        }
        break;

      case "orderDraft":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isOrderDraftChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isOrderDraftChecked: e,
          });
        }
        break;

      case "orderResponsibility":
        if (e === true) {
          // this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isOrderResponsibilityChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            // sourceList: filteredItems,
            isOrderResponsibilityChecked: e,
          });
        }
        break;

      case "orderTimeline":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 582 },
            { sourceId: 583 },
            { sourceId: 584 },
            { sourceId: 585 },
            { sourceId: 586 },
            { sourceId: 587 },
            { sourceId: 592 }
          );
          await this.postUserPermission(true);
          this.setState({
            isOrderTimelineChecked: e,
            isOrderTimelineTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 582 },
            { sourceId: 583 },
            { sourceId: 584 },
            { sourceId: 585 },
            { sourceId: 586 },
            { sourceId: 587 },
            { sourceId: 592 },
            { sourceId: 590 },
            { sourceId: 594 },
            { sourceId: 591 },
            { sourceId: 593 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isOrderTimelineChecked: e,
            isNewOrderTimelineChecked: e,
            isDeleteOrderTimelineChecked: e,
            isOrderTimelineTaskHidden: true,
          });
        }
        break;

      case "newOrderTimeline":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 590 },
            { sourceId: 594 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewOrderTimelineChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 590 },
            { sourceId: 594 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isNewOrderTimelineChecked: e,
          });
        }
        break;

      case "deleteOrderTimeline":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 591 }, { sourceId: 593 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteOrderTimelineChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 591 }, { sourceId: 593 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isDeleteOrderTimelineChecked: e,
          });
        }
        break;

      case "orderArchive":
        if (e === true) {
          // this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isOrderArchiveChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isOrderArchiveChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- invoice -] */

      case "invoice":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 208 },
            { sourceId: 433 },
            { sourceId: 434 },
            { sourceId: 435 },
            { sourceId: 437 },
            { sourceId: 438 },
            { sourceId: 439 }
          );
          await this.postUserPermission(true);
          this.setState({
            isInvoiceChecked: e,
            isInvoiceTaskHidden: false,
            isInvoiceOperationChecked: e,
            isInvoiceOperationTaskHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 208 },
            { sourceId: 433 },
            { sourceId: 434 },
            { sourceId: 435 },
            { sourceId: 437 },
            { sourceId: 438 },
            { sourceId: 439 },
            { sourceId: 440 },
            { sourceId: 441 },
            { sourceId: 442 },
            { sourceId: 443 },
            { sourceId: 444 },
            { sourceId: 445 },
            { sourceId: 446 },
            { sourceId: 447 },
            { sourceId: 448 },
            { sourceId: 449 },
            { sourceId: 450 },
            { sourceId: 451 },
            { sourceId: 452 },
            { sourceId: 489 },
            { sourceId: 490 },
            { sourceId: 491 },
            { sourceId: 492 },
            { sourceId: 493 },
            { sourceId: 494 },
            { sourceId: 495 },
            { sourceId: 496 },
            { sourceId: 497 },
            { sourceId: 641 },
            { sourceId: 545 },
            { sourceId: 646 },
            { sourceId: 647 },
            { sourceId: 648 },
            { sourceId: 649 },
            { sourceId: 642 },
            { sourceId: 643 },
            { sourceId: 650 },
            { sourceId: 651 },
            { sourceId: 652 },
            { sourceId: 644 },
            { sourceId: 672 },
            { sourceId: 673 },
            { sourceId: 697 },
            { sourceId: 698 },
            { sourceId: 699 },
            { sourceId: 700 },
            { sourceId: 701 },
            { sourceId: 680 },
            { sourceId: 681 },
            { sourceId: 682 },
            { sourceId: 677 },
            { sourceId: 678 },
            { sourceId: 679 },
            { sourceId: 674 },
            { sourceId: 675 },
            { sourceId: 676 },
            { sourceId: 683 },
            { sourceId: 684 },
            { sourceId: 713 },
            { sourceId: 714 },
            { sourceId: 715 },
            { sourceId: 716 },
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isInvoiceChecked: e,
            isInvoiceTaskHidden: true,
            isInvoiceOperationTaskHidden: true,
            isInvoiceOperationChecked: e,
            isNewInvoiceChecked: false,
            isEditInvoiceChecked: false,
            isDeleteInvoiceChecked: false,
            isArchiveInvoiceChecked: false,
            isInvoiceDraftChecked: false,
            isInvoiceResponsibilityChecked: false,
            isInvoiceArchiveChecked: false,
            isRequisitionChecked: false,
            isNewRequisitionChecked: false,
            isDeleteRequisitionChecked: false,
            isEditRequisitionChecked: false,
            isArchiveRequisitionChecked: false,
            isRequisitionTaskHidden: true,
            isCorrespondingInvoiceToInvoiceChecked: false,
            isInvoiceRequisitionChecked: false,
            isMergeInvoiceToOrderChecked: false,
            isSplitInvoiceToOrderChecked: false,
            isConvertInvoiceToOrderChecked: false,
            isCorrespondingInvoiceToOrderChecked: false,
            /* #region  [- timeline -] */
            isInvoiceTimelineChecked: false,
            isNewInvoiceTimelineChecked: false,
            isDeleteInvoiceTimelineChecked: false,
            isInvoiceTimelineTaskHidden: true,
            /* #endregion */

            /* #region  [- salesReturn -] */
            isSalesReturnChecked: false,
            isSalesReturnDisabled: false,
            isSalesReturnTaskHidden: true,
            isNewSalesReturnChecked: false,
            isNewSalesReturnDisabled: false,
            isEditSalesReturnChecked: false,
            isEditSalesReturnDisabled: false,
            isDeleteSalesReturnChecked: false,
            isDeleteSalesReturnDisabled: false,
            /* #endregion */

          });
        }
        break;

      case "invoiceOparation":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 433 },
            { sourceId: 434 },
            { sourceId: 435 },
            { sourceId: 437 },
            { sourceId: 438 },
            { sourceId: 439 }
          );
          await this.postUserPermission(true);
          this.setState({
            isInvoiceOperationChecked: e,
            isInvoiceOperationTaskHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 433 },
            { sourceId: 434 },
            { sourceId: 435 },
            { sourceId: 437 },
            { sourceId: 438 },
            { sourceId: 439 },
            { sourceId: 440 },
            { sourceId: 441 },
            { sourceId: 442 },
            { sourceId: 443 },
            { sourceId: 444 },
            { sourceId: 445 },
            { sourceId: 446 },
            { sourceId: 447 },
            { sourceId: 448 },
            { sourceId: 449 },
            { sourceId: 450 },
            { sourceId: 451 },
            { sourceId: 452 },
            { sourceId: 489 },
            { sourceId: 490 },
            { sourceId: 491 },
            { sourceId: 492 },
            { sourceId: 493 },
            { sourceId: 494 },
            { sourceId: 495 },
            { sourceId: 496 },
            { sourceId: 497 },
            { sourceId: 545 },
            { sourceId: 650 },
            { sourceId: 651 },
            { sourceId: 652 },
            { sourceId: 644 },
            { sourceId: 672 },
            { sourceId: 673 },
            { sourceId: 697 },
            { sourceId: 698 },
            { sourceId: 699 },
            { sourceId: 700 },
            { sourceId: 701 },
            { sourceId: 680 },
            { sourceId: 681 },
            { sourceId: 682 },
            { sourceId: 677 },
            { sourceId: 678 },
            { sourceId: 679 },
            { sourceId: 674 },
            { sourceId: 675 },
            { sourceId: 676 },
            { sourceId: 683 },
            { sourceId: 684 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isInvoiceOperationChecked: e,
            isInvoiceOperationTaskHidden: true,
            isNewInvoiceChecked: false,
            isEditInvoiceChecked: false,
            isDeleteInvoiceChecked: false,
            isArchiveInvoiceChecked: false,
            isMergeInvoiceToOrderChecked: false,
            isSplitInvoiceToOrderChecked: false,
            isConvertInvoiceToOrderChecked: false,
            isCorrespondingInvoiceToOrderChecked: false,
            isCorrespondingInvoiceToInvoiceChecked: false,
            isInvoiceRequisitionChecked: false,
          });
        }
        break;

      case "correspondingInvoiceToInvoice":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 672 }, { sourceId: 673 });
          await this.postUserPermission(true);
          this.setState({
            isCorrespondingInvoiceToInvoiceChecked: e,
          });
        } else {
          this.state.sourceList.push({ sourceId: 672 }, { sourceId: 673 });
          await this.postUserPermission(false);
          this.setState({
            isCorrespondingInvoiceToInvoiceChecked: e,
          });
        }
        break;

      case "invoiceRequisition":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 697 },
            { sourceId: 698 },
            { sourceId: 699 }
          );
          await this.postUserPermission(true);
          this.setState({
            isInvoiceRequisitionChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 697 },
            { sourceId: 698 },
            { sourceId: 699 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isInvoiceRequisitionChecked: e,
          });
        }
        break;

      case "mergeInvoiceToOrder":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 680 },
            { sourceId: 681 },
            { sourceId: 682 }
          );
          await this.postUserPermission(true);
          this.setState({
            isMergeInvoiceToOrderChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 680 },
            { sourceId: 681 },
            { sourceId: 682 }
          );
          await this.postUserPermission(false);
          this.setState({
            isMergeInvoiceToOrderChecked: e,
          });
        }
        break;

      case "splitInvoiceToOrder":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 677 },
            { sourceId: 678 },
            { sourceId: 679 }
          );
          await this.postUserPermission(true);
          this.setState({
            isSplitInvoiceToOrderChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 677 },
            { sourceId: 678 },
            { sourceId: 679 }
          );
          await this.postUserPermission(false);
          this.setState({
            isSplitInvoiceToOrderChecked: e,
          });
        }
        break;

      case "convertInvoiceToOrder":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 674 },
            { sourceId: 675 },
            { sourceId: 676 }
          );
          await this.postUserPermission(true);
          this.setState({
            isConvertInvoiceToOrderChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 674 },
            { sourceId: 675 },
            { sourceId: 676 }
          );
          await this.postUserPermission(false);
          this.setState({
            isConvertInvoiceToOrderChecked: e,
          });
        }
        break;

      case "correspondingInvoiceToOrder":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 683 }, { sourceId: 684 });
          await this.postUserPermission(true);
          this.setState({
            isCorrespondingInvoiceToOrderChecked: e,
          });
        } else {
          this.state.sourceList.push({ sourceId: 683 }, { sourceId: 684 });
          await this.postUserPermission(false);
          this.setState({
            isCorrespondingInvoiceToOrderChecked: e,
          });
        }
        break;

      case "newInvoice":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 440 },
            { sourceId: 441 },
            { sourceId: 442 },
            { sourceId: 443 },
            { sourceId: 444 },
            { sourceId: 445 },
            { sourceId: 446 },
            { sourceId: 447 },
            { sourceId: 448 },
            { sourceId: 449 },
            { sourceId: 450 },
            { sourceId: 700 },
            { sourceId: 701 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewInvoiceChecked: e,
            isEditInvoiceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [440, 441, 442, 443, 444, 445, 446];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 440 },
            { sourceId: 441 },
            { sourceId: 442 },
            { sourceId: 443 },
            { sourceId: 444 },
            { sourceId: 445 },
            { sourceId: 446 },
            { sourceId: 447 },
            { sourceId: 448 },
            { sourceId: 449 },
            { sourceId: 450 },
            { sourceId: 700 },
            { sourceId: 701 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewInvoiceChecked: e,
            isEditInvoiceChecked: false,
          });
        }
        break;

      case "editInvoice":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 440 },
            { sourceId: 441 },
            { sourceId: 442 },
            { sourceId: 443 },
            { sourceId: 444 },
            { sourceId: 445 },
            { sourceId: 446 },
            { sourceId: 447 },
            { sourceId: 448 },
            { sourceId: 449 },
            { sourceId: 450 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewInvoiceChecked: e,
            isEditInvoiceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [441, 442, 443, 444, 445, 446, 448, 449, 450];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 440 },
            { sourceId: 441 },
            { sourceId: 442 },
            { sourceId: 443 },
            { sourceId: 444 },
            { sourceId: 445 },
            { sourceId: 446 },
            { sourceId: 447 },
            { sourceId: 448 },
            { sourceId: 449 },
            { sourceId: 450 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditInvoiceChecked: e,
            isNewInvoiceChecked: false,
          });
        }
        break;

      case "deleteInvoice":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 451 }, { sourceId: 452 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteInvoiceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [451, 452];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 451 }, { sourceId: 452 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteInvoiceChecked: e,
          });
        }
        break;

      case "archiveInvoice":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isArchiveInvoiceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isArchiveInvoiceChecked: e,
          });
        }
        break;

      case "invoiceDraft":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isInvoiceDraftChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isInvoiceDraftChecked: e,
          });
        }
        break;

      case "invoiceResponsibility":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isInvoiceResponsibilityChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isInvoiceResponsibilityChecked: e,
          });
        }
        break;

      case "invoiceTimeline":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 641 },
            { sourceId: 645 },
            { sourceId: 646 },
            { sourceId: 647 },
            { sourceId: 648 },
            { sourceId: 649 }
          );
          await this.postUserPermission(true);
          this.setState({
            isInvoiceTimelineChecked: e,
            isInvoiceTimelineTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 641 },
            { sourceId: 645 },
            { sourceId: 646 },
            { sourceId: 647 },
            { sourceId: 648 },
            { sourceId: 649 },
            { sourceId: 642 },
            { sourceId: 650 },
            { sourceId: 651 },
            { sourceId: 652 },
            { sourceId: 643 },
            { sourceId: 644 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isInvoiceTimelineChecked: e,
            isNewInvoiceTimelineChecked: e,
            isDeleteInvoiceTimelineChecked: e,
            isInvoiceTimelineTaskHidden: true,
          });
        }
        break;

      case "newInvoiceTimeline":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 642 },
            { sourceId: 650 },
            { sourceId: 651 },
            { sourceId: 652 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewInvoiceTimelineChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 642 },
            { sourceId: 650 },
            { sourceId: 651 },
            { sourceId: 652 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isNewInvoiceTimelineChecked: e,
          });
        }
        break;

      case "deleteInvoiceTimeline":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 643 }, { sourceId: 644 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteInvoiceTimelineChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 643 }, { sourceId: 644 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isDeleteInvoiceTimelineChecked: e,
          });
        }
        break;

      case "requisition":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 489 }, { sourceId: 490 });
          await this.postUserPermission(true);
          this.setState({
            isRequisitionChecked: e,
            isRequisitionTaskHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 489 },
            { sourceId: 490 },
            { sourceId: 491 },
            { sourceId: 492 },
            { sourceId: 493 },
            { sourceId: 494 },
            { sourceId: 495 },
            { sourceId: 496 },
            { sourceId: 497 }
          );
          await this.postUserPermission(false);
          this.setState({
            isRequisitionChecked: e,
            isRequisitionTaskHidden: true,
            isNewRequisitionChecked: false,
            isDeleteRequisitionChecked: false,
            isArchiveRequisitionChecked: false,
          });
        }
        break;

      case "newRequisition":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 491 },
            { sourceId: 492 },
            { sourceId: 493 },
            { sourceId: 494 },
            { sourceId: 495 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewRequisitionChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 491 },
            { sourceId: 492 },
            { sourceId: 493 },
            { sourceId: 494 },
            { sourceId: 495 }
          );
          await this.postUserPermission(false);
          this.setState({
            isNewRequisitionChecked: e,
          });
        }
        break;

      case "deleteRequisition":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 496 }, { sourceId: 497 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteRequisitionChecked: e,
          });
        } else {
          this.state.sourceList.push({ sourceId: 496 }, { sourceId: 497 });
          await this.postUserPermission(false);
          this.setState({
            isDeleteRequisitionChecked: e,
          });
        }
        break;

      case "archiveRequisition":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isArchiveRequisitionChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isArchiveRequisitionChecked: e,
          });
        }
        break;

      case "invoiceArchive":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 205 }, { sourceId: 213 })
          await this.postUserPermission(true);
          this.setState({
            isInvoiceArchiveChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 367];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isInvoiceArchiveChecked: e,
          });
        }
        break;

      case "salesReturn":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 713, },
            { sourceId: 729 },
            { sourceId: 730 },
            { sourceId: 731 },
            { sourceId: 732 },
            { sourceId: 733 },
            { sourceId: 777 },
            { sourceId: 778 },
            { sourceId: 779 });
          await this.postUserPermission(true);
          this.setState({
            isSalesReturnChecked: e,
            isSalesReturnTaskHidden: false,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 713 }, { sourceId: 714 }, { sourceId: 715 }, { sourceId: 716 },
            { sourceId: 729 },
            { sourceId: 730 },
            { sourceId: 731 },
            { sourceId: 732 },
            { sourceId: 733 },
            { sourceId: 734 },
            { sourceId: 777 },
            { sourceId: 778 },
            { sourceId: 779 },
            { sourceId: 735 },
            { sourceId: 736 },
            { sourceId: 737 },
            { sourceId: 738 },
            { sourceId: 739 },
            { sourceId: 740 },
            { sourceId: 741 },
            { sourceId: 742 },
            { sourceId: 743 },
            { sourceId: 744 },
            { sourceId: 745 },
            { sourceId: 746 },
            { sourceId: 747 },
            { sourceId: 748 },
            { sourceId: 749 },
            { sourceId: 750 },
            { sourceId: 751 },
            { sourceId: 752 },
            { sourceId: 753 },
            { sourceId: 754 },
            { sourceId: 755 },
            { sourceId: 756 },
            { sourceId: 757 },
            { sourceId: 758 },
            { sourceId: 759 },
            { sourceId: 760 },
            { sourceId: 761 },
            { sourceId: 762 },
            { sourceId: 763 },
            { sourceId: 764 },
            { sourceId: 765 },
            { sourceId: 766 },
            { sourceId: 767 },
            { sourceId: 768 },
            { sourceId: 769 },
            { sourceId: 770 },
            { sourceId: 771 },
            { sourceId: 772 },
            { sourceId: 773 },
            { sourceId: 774 },
            { sourceId: 775 },
            { sourceId: 776 },
          );
          await this.postUserPermission(false);
          this.setState({
            isSalesReturnChecked: e,
            isSalesReturnTaskHidden: true,
            isNewSalesReturnChecked: false,
            isEditSalesReturnChecked: false,
            isDeleteSalesReturnChecked: false,
            isArchiveSalesReturnChecked: false,
          });
        }
        break;

      case "newSalesReturn":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 714 },
            { sourceId: 715 },
            { sourceId: 735 },
            { sourceId: 736 },
            { sourceId: 737 },
            { sourceId: 738 },
            { sourceId: 739 },
            { sourceId: 740 },
            { sourceId: 741 },
            { sourceId: 742 },
            { sourceId: 743 },
            { sourceId: 744 },
            { sourceId: 745 },
            { sourceId: 746 },
            { sourceId: 747 },
            { sourceId: 748 },
            { sourceId: 749 },
            { sourceId: 750 },
            { sourceId: 751 },
            { sourceId: 752 },
            { sourceId: 753 },
            { sourceId: 754 },
            { sourceId: 755 },
            { sourceId: 756 },
            { sourceId: 757 },
            { sourceId: 758 },
            { sourceId: 759 },
            { sourceId: 760 },
            { sourceId: 761 },
            { sourceId: 762 },
            { sourceId: 763 },
            { sourceId: 764 },
            { sourceId: 765 },
            { sourceId: 766 },
            { sourceId: 767 },
            { sourceId: 768 },
            { sourceId: 769 },
            { sourceId: 770 },
            { sourceId: 771 },
            { sourceId: 772 },
            { sourceId: 773 },
            { sourceId: 774 },
            { sourceId: 775 },
            { sourceId: 776 },
          );
          await this.postUserPermission(true);
          this.setState({
            isNewSalesReturnChecked: e,
            isEditSalesReturnChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 714 },
            { sourceId: 715 },
            { sourceId: 735 },
            { sourceId: 736 },
            { sourceId: 737 },
            { sourceId: 738 },
            { sourceId: 739 },
            { sourceId: 740 },
            { sourceId: 741 },
            { sourceId: 742 },
            { sourceId: 743 },
            { sourceId: 744 },
            { sourceId: 745 },
            { sourceId: 746 },
            { sourceId: 747 },
            { sourceId: 748 },
            { sourceId: 749 },
            { sourceId: 750 },
            { sourceId: 751 },
            { sourceId: 752 },
            { sourceId: 753 },
            { sourceId: 754 },
            { sourceId: 755 },
            { sourceId: 756 },
            { sourceId: 757 },
            { sourceId: 758 },
            { sourceId: 759 },
            { sourceId: 760 },
            { sourceId: 761 },
            { sourceId: 762 },
            { sourceId: 763 },
            { sourceId: 764 },
            { sourceId: 765 },
            { sourceId: 766 },
            { sourceId: 767 },
            { sourceId: 768 },
            { sourceId: 769 },
            { sourceId: 770 },
            { sourceId: 771 },
            { sourceId: 772 },
            { sourceId: 773 },
            { sourceId: 774 },
            { sourceId: 775 },
            { sourceId: 776 },
          );
          await this.postUserPermission(false);
          this.setState({
            isNewSalesReturnChecked: e,
            isEditSalesReturnChecked: e,
          });
        }
        break;

      case "editSalesReturn":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 714 },
            { sourceId: 715 },
            { sourceId: 735 },
            { sourceId: 736 },
            { sourceId: 737 },
            { sourceId: 738 },
            { sourceId: 739 },
            { sourceId: 740 },
            { sourceId: 741 },
            { sourceId: 742 },
            { sourceId: 743 },
            { sourceId: 744 },
            { sourceId: 745 },
            { sourceId: 746 },
            { sourceId: 747 },
            { sourceId: 748 },
            { sourceId: 749 },
            { sourceId: 750 },
            { sourceId: 751 },
            { sourceId: 752 },
            { sourceId: 753 },
            { sourceId: 754 },
            { sourceId: 755 },
            { sourceId: 756 },
            { sourceId: 757 },
            { sourceId: 758 },
            { sourceId: 759 },
            { sourceId: 760 },
            { sourceId: 761 },
            { sourceId: 762 },
            { sourceId: 763 },
            { sourceId: 764 },
            { sourceId: 765 },
            { sourceId: 766 },
            { sourceId: 767 },
            { sourceId: 768 },
            { sourceId: 769 },
            { sourceId: 770 },
            { sourceId: 771 },
            { sourceId: 772 },
            { sourceId: 773 },
            { sourceId: 774 },
            { sourceId: 775 },
            { sourceId: 776 },
          );
          await this.postUserPermission(true);
          this.setState({
            isNewSalesReturnChecked: e,
            isEditSalesReturnChecked: e,
          });
        } else {
          this.state.sourceList.push(
            { sourceId: 714 },
            { sourceId: 715 },
            { sourceId: 735 },
            { sourceId: 736 },
            { sourceId: 737 },
            { sourceId: 738 },
            { sourceId: 739 },
            { sourceId: 740 },
            { sourceId: 741 },
            { sourceId: 742 },
            { sourceId: 743 },
            { sourceId: 744 },
            { sourceId: 745 },
            { sourceId: 746 },
            { sourceId: 747 },
            { sourceId: 748 },
            { sourceId: 749 },
            { sourceId: 750 },
            { sourceId: 751 },
            { sourceId: 752 },
            { sourceId: 753 },
            { sourceId: 754 },
            { sourceId: 755 },
            { sourceId: 756 },
            { sourceId: 757 },
            { sourceId: 758 },
            { sourceId: 759 },
            { sourceId: 760 },
            { sourceId: 761 },
            { sourceId: 762 },
            { sourceId: 763 },
            { sourceId: 764 },
            { sourceId: 765 },
            { sourceId: 766 },
            { sourceId: 767 },
            { sourceId: 768 },
            { sourceId: 769 },
            { sourceId: 770 },
            { sourceId: 771 },
            { sourceId: 772 },
            { sourceId: 773 },
            { sourceId: 774 },
            { sourceId: 775 },
            { sourceId: 776 },
          );
          await this.postUserPermission(false);
          this.setState({
            isNewSalesReturnChecked: e,
            isEditSalesReturnChecked: e,
          });
        }
        break;

      case "deleteSalesReturn":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 716 }, { sourceId: 734 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteSalesReturnChecked: e,
          });
        } else {
          this.state.sourceList.push({ sourceId: 716 }, { sourceId: 734 });
          await this.postUserPermission(false);
          this.setState({
            isDeleteSalesReturnChecked: e,
          });
        }
        break;


      /* #endregion */

      /* #endregion */

      /* #region  [- crm -] */

      case "crm":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 2 });
          await this.postUserPermission(true);
          this.setState({
            isCRMChecked: e,
            isCRMChildrenHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [2, 209, 210, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 2 },
            { sourceId: 209 },
            { sourceId: 210 },
            { sourceId: 368 },
            { sourceId: 369 },
            { sourceId: 370 },
            { sourceId: 371 },
            { sourceId: 372 },
            { sourceId: 373 },
            { sourceId: 374 },
            { sourceId: 375 },
            { sourceId: 376 },
            { sourceId: 377 },
            { sourceId: 378 },
            { sourceId: 379 },
            { sourceId: 380 },
            { sourceId: 381 }
          );
          await this.postUserPermission(false);
          this.setState({
            isCRMChecked: e,
            isCRMChildrenHidden: true,
            //sourceList: filteredItems,
            isCRMCrtableTaskHidden: true,
            isCRMCrtableOperationTaskHidden: true,
            isCRMCartableOperationChecked: false,
            isNewAccountChecked: false,
            isEditAccountChecked: false,
            isDeleteAccountChecked: false,
            isCRMCartableArchiveChecked: false,
            isCRMCartableDraftChecked: false,
            isCRMCartableTimelineChecked: false,
            isCRMCartableResponsibilityChecked: false,
            isArchiveAccountChecked: false,
            isAccountManagementChecked: false,
            isCRMCartableChecked: false,
          });
        }
        break;

      case "accountManagement":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 209 });
          await this.postUserPermission(true);
          this.setState({
            isAccountManagementChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [209];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 209 });
          await this.postUserPermission(false);
          this.setState({
            isAccountManagementChecked: e,
            //sourceList: filteredItems
          });
        }
        break;

      /* #region  [- crmCrtable -] */

      case "crmCrtable":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 210 },
            { sourceId: 368 },
            { sourceId: 369 }
          );
          await this.postUserPermission(true);
          this.setState({
            isCRMCartableChecked: e,
            isCRMCrtableTaskHidden: false,
            isCRMCartableOperationChecked: e,
            isCRMCrtableOperationTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [210, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 210 },
            { sourceId: 368 },
            { sourceId: 369 },
            { sourceId: 370 },
            { sourceId: 371 },
            { sourceId: 372 },
            { sourceId: 373 },
            { sourceId: 374 },
            { sourceId: 375 },
            { sourceId: 376 },
            { sourceId: 377 },
            { sourceId: 378 },
            { sourceId: 379 },
            { sourceId: 380 },
            { sourceId: 381 }
          );
          await this.postUserPermission(false);
          this.setState({
            isCRMCartableChecked: e,
            isCRMCrtableTaskHidden: true,
            //sourceList: filteredItems,
            isCRMCartableOperationChecked: e,
            isCRMCrtableOperationTaskHidden: true,
          });
        }
        break;

      case "crmCartableOparation":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 368 }, { sourceId: 369 });
          await this.postUserPermission(true);
          this.setState({
            isCRMCartableOperationChecked: e,
            isCRMCrtableOperationTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 368 },
            { sourceId: 369 },
            { sourceId: 370 },
            { sourceId: 371 },
            { sourceId: 372 },
            { sourceId: 373 },
            { sourceId: 374 },
            { sourceId: 375 },
            { sourceId: 376 },
            { sourceId: 377 },
            { sourceId: 378 },
            { sourceId: 379 },
            { sourceId: 380 },
            { sourceId: 381 }
          );
          await this.postUserPermission(false);
          this.setState({
            isCRMCartableOperationChecked: e,
            isCRMCrtableOperationTaskHidden: true,
            //sourceList: filteredItems,
            isNewAccountChecked: false,
            isEditAccountChecked: false,
            isDeleteAccountChecked: false,
            isAccountResponsibilityChecked: false,
            isAccountChangeLevelChecked: false,
            isArchiveAccountChecked: false,
          });
        }
        break;

      case "newAccount":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 370 },
            { sourceId: 371 },
            { sourceId: 372 },
            { sourceId: 373 },
            { sourceId: 374 },
            { sourceId: 375 },
            { sourceId: 376 },
            { sourceId: 377 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewAccountChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [370, 371, 372, 373, 374, 375, 376];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 370 },
            { sourceId: 371 },
            { sourceId: 372 },
            { sourceId: 373 },
            { sourceId: 374 },
            { sourceId: 375 },
            { sourceId: 376 },
            { sourceId: 377 }
          );
          await this.postUserPermission(false);
          this.setState({
            isNewAccountChecked: e,
            //sourceList: filteredItems,
            isEditAccountChecked: false,
          });
        }
        break;

      case "editAccount":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 370 },
            { sourceId: 371 },
            { sourceId: 372 },
            { sourceId: 373 },
            { sourceId: 374 },
            { sourceId: 375 },
            { sourceId: 376 },
            { sourceId: 377 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditAccountChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [377, 371, 372, 373, 374, 375, 376];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 370 },
            { sourceId: 371 },
            { sourceId: 372 },
            { sourceId: 373 },
            { sourceId: 374 },
            { sourceId: 375 },
            { sourceId: 376 },
            { sourceId: 377 }
          );
          await this.postUserPermission(false);
          this.setState({
            isEditAccountChecked: e,
            //sourceList: filteredItems,
            isNewAccountChecked: false,
          });
        }
        break;

      case "deleteAccount":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 378 }, { sourceId: 379 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteAccountChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [378, 379];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 378 }, { sourceId: 379 });
          await this.postUserPermission(false);
          this.setState({
            isDeleteAccountChecked: e,
            //sourceList: filteredItems,
          });
        }
        break;

      case "accountResponsibility":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 9 })
          await this.postUserPermission(true);
          this.setState({
            isAccountResponsibilityChecked: e,
          });
        } else {
          //const items = [...this.state.sourceList]
          //const removedItem = [378,379];
          //const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            isAccountResponsibilityChecked: e,
            //sourceList: filteredItems,
          });
        }
        break;

      case "accountChangeLevel":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 380 }, { sourceId: 381 });
          await this.postUserPermission(true);
          this.setState({
            isAccountChangeLevelChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [380, 381];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 380 }, { sourceId: 381 });
          await this.postUserPermission(false);
          this.setState({
            isAccountChangeLevelChecked: e,
            //sourceList: filteredItems,
          });
        }
        break;

      case "archiveAccount":
        if (e === true) {
          // this.state.sourceList.push({ sourceId: 9 })
          await this.postUserPermission(true);
          this.setState({
            isArchiveAccountChecked: e,
          });
        } else {
          //const items = [...this.state.sourceList]
          // const removedItem = [380, 381];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            isArchiveAccountChecked: e,
            //sourceList: filteredItems,
          });
        }
        break;

      case "crmCartableDraft":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 9 })
          await this.postUserPermission(true);
          this.setState({
            isCRMCartableDraftChecked: e,
          });
        } else {
          //const items = [...this.state.sourceList]
          //const removedItem = [380, 381];
          //const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            isCRMCartableDraftChecked: e,
            //sourceList: filteredItems,
          });
        }
        break;

      case "crmCartableResponsibility":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 9 })
          await this.postUserPermission(true);
          this.setState({
            isCRMCartableResponsibilityChecked: e,
          });
        } else {
          //const items = [...this.state.sourceList]
          //const removedItem = [380, 381];
          //const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            isCRMCartableResponsibilityChecked: e,
            //sourceList: filteredItems,
          });
        }
        break;

      case "crmCartableTimeline":
        if (e === true) {
          // this.state.sourceList.push({ sourceId: 9 })
          await this.postUserPermission(true);
          this.setState({
            isCRMCartableTimelineChecked: e,
          });
        } else {
          //const items = [...this.state.sourceList]
          //const removedItem = [380, 381];
          //const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            isCRMCartableTimelineChecked: e,
            //sourceList: filteredItems,
          });
        }
        break;

      case "crmCartableArchive":
        if (e === true) {
          //this.state.sourceList.push({ sourceId: 9 })
          await this.postUserPermission(true);
          this.setState({
            isCRMCartableArchiveChecked: e,
          });
        } else {
          //const items = [...this.state.sourceList]
          //const removedItem = [380, 381];
          //const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            isCRMCartableArchiveChecked: e,
            //sourceList: filteredItems,
          });
        }
        break;

      /* #endregion */

      /* #endregion */

      /* #region  [- management -] */
      case "management":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 12 });
          await this.postUserPermission(true);
          this.setState({
            isManagementChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]

          // const filteredItems = items.filter(item => item.sourceId !== 12)
          this.state.sourceList.push({ sourceId: 12 });
          await this.postUserPermission(false);
          this.setState({
            isManagementChecked: e,
            //sourceList: filteredItems
          });
        }
        break;

      /* #endregion */

      /* #region  [- ticket -] */
      case "ticket":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 481 });
          await this.postUserPermission(true);
          this.setState({
            isTicketChecked: e,
            //isCartableChildrenHidden: false,
          });
        } else {
          this.state.sourceList.push({ sourceId: 481 });
          await this.postUserPermission(false);
          this.setState({
            isTicketChecked: e,
            //isCartableChildrenHidden: true,
            //sourceList: filteredItems
          });
        }
        break;

      /* #endregion */

      /* #region  [- setting -] */

      case "setting":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 4 });
          await this.postUserPermission(true);
          this.setState({
            isSettingChecked: e,
            isSettingChildrenHidden: false,
          });
        } else {
          // const items = [{ sourceId: 2 }, { sourceId: 3 }]
          this.state.sourceList.push(
            { sourceId: 4 },
            { sourceId: 5 },
            { sourceId: 6 },
            { sourceId: 7 },
            { sourceId: 8 },
            { sourceId: 9 },
            { sourceId: 10 },
            { sourceId: 11 },
            { sourceId: 13 },
            { sourceId: 14 },
            { sourceId: 15 },
            { sourceId: 222 },
            { sourceId: 223 },
            { sourceId: 224 },
            { sourceId: 226 },
            { sourceId: 229 },
            { sourceId: 230 },
            { sourceId: 231 },
            { sourceId: 227 },
            { sourceId: 228 },
            { sourceId: 453 },
            { sourceId: 454 },
            { sourceId: 232 },
            { sourceId: 233 },
            { sourceId: 234 },
            { sourceId: 235 },
            { sourceId: 236 },
            { sourceId: 237 },
            { sourceId: 238 },
            { sourceId: 239 },
            { sourceId: 240 },
            { sourceId: 455 },
            { sourceId: 456 },
            { sourceId: 241 },
            { sourceId: 242 },
            { sourceId: 243 },
            { sourceId: 244 },
            { sourceId: 247 },
            { sourceId: 248 },
            { sourceId: 249 },
            { sourceId: 245 },
            { sourceId: 246 },
            { sourceId: 457 },
            { sourceId: 458 },
            { sourceId: 250 },
            { sourceId: 251 },
            { sourceId: 252 },
            { sourceId: 253 },
            { sourceId: 256 },
            { sourceId: 257 },
            { sourceId: 258 },
            { sourceId: 254 },
            { sourceId: 255 },
            { sourceId: 459 },
            { sourceId: 460 },
            { sourceId: 259 },
            { sourceId: 260 },
            { sourceId: 261 },
            { sourceId: 262 },
            { sourceId: 265 },
            { sourceId: 267 },
            { sourceId: 268 },
            { sourceId: 263 },
            { sourceId: 264 },
            { sourceId: 461 },
            { sourceId: 462 },
            { sourceId: 269 },
            { sourceId: 270 },
            { sourceId: 271 },
            { sourceId: 272 },
            { sourceId: 276 },
            { sourceId: 277 },
            { sourceId: 278 },
            { sourceId: 273 },
            { sourceId: 275 },
            { sourceId: 463 },
            { sourceId: 464 },
            { sourceId: 279 },
            { sourceId: 280 },
            { sourceId: 281 },
            { sourceId: 282 },
            { sourceId: 285 },
            { sourceId: 286 },
            { sourceId: 287 },
            { sourceId: 283 },
            { sourceId: 284 },
            { sourceId: 465 },
            { sourceId: 466 },
            { sourceId: 288 },
            { sourceId: 289 },
            { sourceId: 290 },
            { sourceId: 291 },
            { sourceId: 292 },
            { sourceId: 293 },
            { sourceId: 467 },
            { sourceId: 468 },
            { sourceId: 297 },
            { sourceId: 298 },
            { sourceId: 299 },
            { sourceId: 300 },
            { sourceId: 303 },
            { sourceId: 304 },
            { sourceId: 305 },
            { sourceId: 301 },
            { sourceId: 302 },
            { sourceId: 469 },
            { sourceId: 470 },
            { sourceId: 359 },
            { sourceId: 360 },
            { sourceId: 361 },
            { sourceId: 362 },
            { sourceId: 363 },
            { sourceId: 364 },
            { sourceId: 365 },
            { sourceId: 366 },
            { sourceId: 294 },
            { sourceId: 295 },
            { sourceId: 296 },
            { sourceId: 702 },
            { sourceId: 703 },
            { sourceId: 704 },
            { sourceId: 705 },
            { sourceId: 706 },
            { sourceId: 707 },
            { sourceId: 708 },
            { sourceId: 709 },
            { sourceId: 710 },
            { sourceId: 711 },
            { sourceId: 712 },
            { sourceId: 717 },
            { sourceId: 718 },
            { sourceId: 720 },
            { sourceId: 721 },
            { sourceId: 722 },
            { sourceId: 723 },
            { sourceId: 724 },
            { sourceId: 725 },
            { sourceId: 726 },
            { sourceId: 727 },
            { sourceId: 728 },



          );

          for (let index = 16; index < 203; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          for (let index = 780; index < 915; index++) {
            this.state.sourceList.push({ sourceId: index });
          }

          await this.postUserPermission(false);
          this.setState({
            //sourceList: items,
            isSettingChecked: e,
            isSettingChildrenHidden: true,

            /* #region  [- person -] */

            isPersonChecked: false,
            isPersonChildrenHidden: true,

            /* #region  [- realPerson -] */
            isRealPersonChecked: false,
            isRealPersonTaskHidden: true,
            isNewRealPersonChecked: false,
            isEditRealPersonChecked: false,
            isDeleteRealPersonChecked: false,
            isPrintRealPersonChecked: false,
            isExcelRealPersonChecked: false,
            /* #endregion */

            /* #region  [- legalPerson -] */
            isLegalPersonChecked: false,
            isLegalPersonTaskHidden: true,
            isNewLegalPersonChecked: false,
            isEditLegalPersonChecked: false,
            isDeleteLegalPersonChecked: false,
            isPrintLegalPersonChecked: false,
            isExcelLegalPersonChecked: false,
            /* #endregion */

            /* #region  [- industry -] */
            isIndustryChecked: false,
            isIndustryTaskHidden: true,
            isNewIndustryChecked: false,
            isEditIndustryChecked: false,
            isDeleteIndustryChecked: false,
            isPrintIndustryChecked: false,
            isExcelIndustryChecked: false,
            /* #endregion */

            /* #region  [- organizationType -] */
            isOrganizationTypeChecked: false,
            isOrganizationTypeTaskHidden: true,
            isNewOrganizationTypeChecked: false,
            isEditOrganizationTypeChecked: false,
            isDeleteOrganizationTypeChecked: false,
            isPrintOrganizationTypeChecked: false,
            isExcelOrganizationTypeChecked: false,
            /* #endregion */

            /* #region  [- categoryType -] */
            isCategoryTypeChecked: false,
            isCategoryTypeTaskHidden: true,
            isNewCategoryTypeChecked: false,
            isEditCategoryTypeChecked: false,
            isDeleteCategoryTypeChecked: false,
            isPrintCategoryTypeChecked: false,
            isExcelCategoryTypeChecked: false,
            /* #endregion */

            /* #region  [- educationLevel -] */
            isEducationLevelChecked: false,
            isEducationLevelTaskHidden: true,
            isNewEducationLevelChecked: false,
            isEditEducationLevelChecked: false,
            isDeleteEducationLevelChecked: false,
            isPrintEducationLevelChecked: false,
            isExcelEducationLevelChecked: false,
            /* #endregion */

            /* #region  [- representativeType -] */
            isRepresentativeTypeChecked: false,
            isRepresentativeTypeTaskHidden: true,
            isNewRepresentativeTypeChecked: false,
            isEditRepresentativeTypeChecked: false,
            isDeleteRepresentativeTypeChecked: false,
            isPrintRepresentativeTypeChecked: false,
            isExcelRepresentativeTypeChecked: false,

            /* #endregion */

            /* #region  [- template -] */
            isTemplateChecked: false,
            isTemplateTaskHidden: true,
            isNewTemplateChecked: false,
            isEditTemplateChecked: false,
            isDeleteTemplateChecked: false,
            isPrintTemplateChecked: false,
            isExcelTemplateChecked: false,
            /* #endregion */

            /* #endregion */

            /* #region  [- mateialMenu -] */

            isMaterialChecked: false,
            isMaterialChildrenHidden: true,

            /* #region  [- material -] */
            isMaterialCardChecked: false,
            isMaterialCardTaskHidden: true,
            isNewMaterialChecked: false,
            isEditMaterialChecked: false,
            isDeleteMaterialChecked: false,
            isPrintMaterialChecked: false,
            isExcelMaterialChecked: false,
            /* #endregion */

            /* #region  [- materialCategory -] */
            isMaterialCategoryChecked: false,
            isMaterialCategoryTaskHidden: true,
            isNewMaterialCategoryChecked: false,
            isEditMaterialCategoryChecked: false,
            isDeleteMaterialCategoryChecked: false,
            isPrintMaterialCategoryChecked: false,
            isExcelMaterialCategoryChecked: false,
            /* #endregion */

            /* #region  [- Scale -] */
            isScaleChecked: false,
            isScaleTaskHidden: true,
            isNewScaleChecked: false,
            isEditScaleChecked: false,
            isDeleteScaleChecked: false,
            isPrintScaleChecked: false,
            isExcelScaleChecked: false,
            /* #endregion */

            /* #region  [- warehouseCategory -] */
            isWarehouseCategoryChecked: false,
            isWarehouseCategoryTaskHidden: true,
            isNewWarehouseCategoryChecked: false,
            isEditWarehouseCategoryChecked: false,
            isDeleteWarehouseCategoryChecked: false,
            isPrintWarehouseCategoryChecked: false,
            isExcelWarehouseCategoryChecked: false,
            /* #endregion */

            /* #region  [- warehouse -] */
            isWarehouseChecked: false,
            isWarehouseTaskHidden: true,
            isNewWarehouseChecked: false,
            isEditWarehouseChecked: false,
            isDeleteWarehouseChecked: false,
            isPrintWarehouseChecked: false,
            isExcelWarehouseChecked: false,
            /* #endregion */

            /* #region  [- product -] */
            isProductChecked: false,
            isProductTaskHidden: true,
            isNewProductChecked: false,
            isEditProductChecked: false,
            isDeleteProductChecked: false,
            isPrintProductChecked: false,
            isExcelProductChecked: false,
            /* #endregion */

            /* #region  [- productCategory -] */
            isProductCategoryChecked: false,
            isProductCategoryTaskHidden: true,
            isNewProductCategoryChecked: false,
            isEditProductCategoryChecked: false,
            isDeleteProductCategoryChecked: false,
            isPrintProductCategoryChecked: false,
            isExcelProductCategoryChecked: false,
            /* #endregion */

            /* #region  [- supplyChain -] */
            isSupplyChainChecked: false,
            isSupplyChainTaskHidden: true,
            isNewSupplyChainChecked: false,
            isEditSupplyChainChecked: false,
            isDeleteSupplyChainChecked: false,
            isPrintSupplyChainChecked: false,
            isExcelSupplyChainChecked: false,
            /* #endregion */

            /* #endregion */

            /* #region  [- marketingSetting -] */
            isMarketingSettingChecked: false,
            isMarketingSettingChildrenHidden: true,
            /* #endregion */

            /* #region  [- salesSetting -] */
            isSalesSettingChecked: false,
            isSalesSettingChildrenHidden: true,

            /* #region  [- accountType -] */
            isAccountTypeChecked: false,
            isAccountTypeTaskHidden: true,
            isNewAccountTypeChecked: false,
            isEditAccountTypeChecked: false,
            isDeleteAccountTypeChecked: false,
            isPrintAccountTypeChecked: false,
            isExcelAccountTypeChecked: false,

            /* #endregion */

            /* #region  [- manualActivityType -] */
            isManualActivityTypeChecked: false,
            isManualActivityTypeTaskHidden: true,
            isNewManualActivityTypeChecked: false,
            isEditManualActivityTypeChecked: false,
            isDeleteManualActivityTypeChecked: false,
            isPrintManualActivityTypeChecked: false,
            isExcelManualActivityTypeChecked: false,

            /* #endregion */

            /* #region  [- financialCaseType -] */
            isFinancialCaseTypeChecked: false,
            isFinancialCaseTypeTaskHidden: true,
            isNewFinancialCaseTypeChecked: false,
            isEditFinancialCaseTypeChecked: false,
            isDeleteFinancialCaseTypeChecked: false,
            isPrintFinancialCaseTypeChecked: false,
            isExcelFinancialCaseTypeChecked: false,

            /* #endregion */

            /* #region  [- termType -] */
            isTermTypeChecked: false,
            isTermTypeTaskHidden: true,
            isNewTermTypeChecked: false,
            isEditTermTypeChecked: false,
            isDeleteTermTypeChecked: false,
            isPrintTermTypeChecked: false,
            isExcelTermTypeChecked: false,

            /* #endregion */

            /* #region  [- paymentMethod -] */
            isPaymentMethodChecked: false,
            isPaymentMethodTaskHidden: true,
            isNewPaymentMethodChecked: false,
            isEditPaymentMethodChecked: false,
            isDeletePaymentMethodChecked: false,
            isPrintPaymentMethodChecked: false,
            isExcelPaymentMethodChecked: false,

            /* #endregion */

            /* #region  [- deliveryTerm -] */
            isDeliveryTermChecked: false,
            isDeliveryTermTaskHidden: true,
            isNewDeliveryTermChecked: false,
            isEditDeliveryTermChecked: false,
            isDeleteDeliveryTermChecked: false,
            isPrintDeliveryTermChecked: false,
            isExcelDeliveryTermChecked: false,

            /* #endregion */

            /* #region  [- sippingMethod -] */
            isShippingMethodChecked: false,
            isShippingMethodTaskHidden: true,
            isNewShippingMethodChecked: false,
            isEditShippingMethodChecked: false,
            isDeleteShippingMethodChecked: false,
            isPrintShippingMethodChecked: false,
            isExcelShippingMethodChecked: false,

            /* #endregion */

            /* #region  [- responsibleType -] */
            isResponsibleTypeChecked: false,
            isResponsibleTypeTaskHidden: true,
            isNewResponsibleTypeChecked: false,
            isEditResponsibleTypeChecked: false,
            isDeleteResponsibleTypeChecked: false,
            isPrintResponsibleTypeChecked: false,
            isExcelResponsibleTypeChecked: false,

            /* #endregion */

            /* #region  [- taskStatus -] */
            isTaskStatusChecked: false,
            isTaskStatusTaskHidden: true,
            isNewTaskStatusChecked: false,
            isEditTaskStatusChecked: false,
            isDeleteTaskStatusChecked: false,
            isPrintTaskStatusChecked: false,
            isExcelTaskStatusChecked: false,

            /* #endregion */

            /* #region  [- reportType -] */
            isReportTypeChecked: false,
            isReportTypeTaskHidden: true,
            isNewReportTypeChecked: false,
            isEditReportTypeChecked: false,
            isDeleteReportTypeChecked: false,
            isPrintReportTypeChecked: false,
            isExcelReportTypeChecked: false,
            /* #endregion */

            /* #region  [- reasonsSalesReturn -] */
            isReasonsSalesReturnChecked: false,
            isReasonsSalesReturnTaskHidden: true,
            isNewReasonsSalesReturnChecked: false,
            isEditReasonsSalesReturnChecked: false,
            isDeleteReasonsSalesReturnChecked: false,
            isPrintReasonsSalesReturnChecked: false,
            isExcelReasonsSalesReturnChecked: false,

            /* #endregion */

            /* #endregion */

            /* #region  [- transposrtation -] */
            isTransportationChecked: false,
            isTransportationChildrenHidden: true,

            /* #endregion */

            /* #region  [- servicesSetting -] */
            isServicesSettingChecked: false,
            isServicesChildrenHidden: true,
            /* #endregion */

            /* #region  [- userManagement -] */
            isUserManagementChecked: false,
            isUserManagementChildrenHidden: true,

            /* #region  [- role -] */
            isRoleChecked: false,
            isRoleTaskHidden: true,
            isNewRoleChecked: false,
            isEditRoleChecked: false,
            isDeleteRoleChecked: false,
            isPrintRoleChecked: false,
            isExcelRoleChecked: false,
            /* #endregion */

            /* #region  [- user -] */
            isUserChecked: false,
            isUserTaskHidden: true,
            isNewUserChecked: false,
            isEditUserChecked: false,
            isDeleteUserChecked: false,
            isPrintUserChecked: false,
            isExcelUserChecked: false,
            /* #endregion */

            /* #endregion */

            /* #region  [- ticket -] */
            isTicketSettingChecked: false,
            isTicketSettingChildrenHidden: true,

            /* #endregion */

            /* #region  [- bpms -] */
            isBPMSChecked: false,
            isBPMSChildrenHidden: true,

            /* #endregion */

            /* #region  [- crmSetting -] */

            isCRMSettingChecked: false,
            isCRMSettingChildrenHidden: true,

            /* #region  [- rating -] */
            isRatingChecked: false,
            isRatingTaskHidden: true,
            isNewRatingChecked: false,
            isEditRatingChecked: false,
            isDeleteRatingChecked: false,
            isPrintRatingChecked: false,
            isExcelRatingChecked: false,
            /* #endregion */

            /* #region  [- accountSource -] */
            isAccountSourceChecked: false,
            isAccountSourceTaskHidden: true,
            isNewAccountSourceChecked: false,
            isEditAccountSourceChecked: false,
            isDeleteAccountSourceChecked: false,
            isPrintAccountSourceChecked: false,
            isExcelAccountSourceChecked: false,
            /* #endregion */

            /* #region  [- crmTaskStatus -] */
            isCRMTaskStatusChecked: false,
            isCRMTaskStatusTaskHidden: true,
            isNewCRMTaskStatusChecked: false,
            isEditCRMTaskStatusChecked: false,
            isDeleteCRMTaskStatusChecked: false,
            isPrintCRMTaskStatusChecked: false,
            isExcelCRMTaskStatusChecked: false,
            /* #endregion */

            /* #region  [- crmResponsibleType -] */
            isCRMResponsibleTypeChecked: false,
            isCRMResponsibleTypeTaskHidden: true,
            isNewCRMResponsibleTypeChecked: false,
            isEditCRMResponsibleTypeChecked: false,
            isDeleteCRMResponsibleTypeChecked: false,
            isPrintCRMResponsibleTypeChecked: false,
            isExcelCRMResponsibleTypeChecked: false,
            /* #endregion */

            /* #region  [- crmReportType -] */
            isCRMReportTypeChecked: false,
            isCRMReportTypeTaskHidden: true,
            isNewCRMReportTypeChecked: false,
            isEditCRMReportTypeChecked: false,
            isDeleteCRMReportTypeChecked: false,
            isPrintCRMReportTypeChecked: false,
            isExcelCRMReportTypeChecked: false,
            /* #endregion */

            /* #endregion */
          });
        }
        break;

      /* #region  [- person -] */
      case "person":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 5 });
          await this.postUserPermission(true);
          this.setState({
            isPersonChecked: e,
            isPersonChildrenHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [5];
          for (let index = 16; index < 104; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          this.state.sourceList.push({ sourceId: 5 });
          //const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPersonChecked: e,
            isPersonChildrenHidden: true,
            //realPerson
            isRealPersonChecked: false,
            isRealPersonTaskHidden: true,
            isNewRealPersonChecked: false,
            isEditRealPersonChecked: false,
            isDeleteRealPersonChecked: false,
            isPrintRealPersonChecked: false,
            isExcelRealPersonChecked: false,
            //legalPerson
            isLegalPersonChecked: false,
            isLegalPersonTaskHidden: true,
            isNewLegalPersonChecked: false,
            isEditLegalPersonChecked: false,
            isDeleteLegalPersonChecked: false,
            isPrintLegalPersonChecked: false,
            isExcelLegalPersonChecked: false,
            //industry
            isIndustryChecked: false,
            isIndustryTaskHidden: true,
            isNewIndustryChecked: false,
            isEditIndustryChecked: false,
            isDeleteIndustryChecked: false,
            isPrintIndustryChecked: false,
            isExcelIndustryChecked: false,
            //organizationType
            isOrganizationTypeChecked: false,
            isOrganizationTypeTaskHidden: true,
            isNewOrganizationTypeChecked: false,
            isEditOrganizationTypeChecked: false,
            isDeleteOrganizationTypeChecked: false,
            isPrintOrganizationTypeChecked: false,
            isExcelOrganizationTypeChecked: false,
            //categoryType
            isCategoryTypeChecked: false,
            isCategoryTypeTaskHidden: true,
            isNewCategoryTypeChecked: false,
            isEditCategoryTypeChecked: false,
            isDeleteCategoryTypeChecked: false,
            isPrintCategoryTypeChecked: false,
            isExcelCategoryTypeChecked: false,
            //educationLevel
            isEducationLevelChecked: false,
            isEducationLevelTaskHidden: true,
            isNewEducationLevelChecked: false,
            isEditEducationLevelChecked: false,
            isDeleteEducationLevelChecked: false,
            isPrintEducationLevelChecked: false,
            isExcelEducationLevelChecked: false,
            //representativeType
            isRepresentativeTypeChecked: false,
            isRepresentativeTypeTaskHidden: true,
            isNewRepresentativeTypeChecked: false,
            isEditRepresentativeTypeChecked: false,
            isDeleteRepresentativeTypeChecked: false,
            isPrintRepresentativeTypeChecked: false,
            isExcelRepresentativeTypeChecked: false,
            //template
            isTemplateChecked: false,
            isTemplateTaskHidden: true,
            isNewTemplateChecked: false,
            isEditTemplateChecked: false,
            isDeleteTemplateChecked: false,
            isPrintTemplateChecked: false,
            isExcelTemplateChecked: false,
          });
        }
        break;

      /* #region  [- realPerson -] */
      case "realPerson":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 16 }, { sourceId: 17 });
          await this.postUserPermission(true);
          this.setState({
            isRealPersonChecked: e,
            isRealPersonTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 16 },
            { sourceId: 17 },
            { sourceId: 18 },
            { sourceId: 19 },
            { sourceId: 20 },
            { sourceId: 21 },
            { sourceId: 22 },
            { sourceId: 23 },
            { sourceId: 24 },
            { sourceId: 25 },
            { sourceId: 26 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isRealPersonChecked: e,
            isRealPersonTaskHidden: true,
            isNewRealPersonChecked: false,
            isEditRealPersonChecked: false,
            isDeleteRealPersonChecked: false,
            isPrintRealPersonChecked: false,
            isExcelRealPersonChecked: false,
          });
        }
        break;

      case "newRealPerson":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 18 },
            { sourceId: 19 },
            { sourceId: 20 },
            { sourceId: 21 },
            { sourceId: 22 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewRealPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [18, 19];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 18 },
            { sourceId: 19 },
            { sourceId: 20 },
            { sourceId: 21 },
            { sourceId: 22 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewRealPersonChecked: e,
            isEditRealPersonChecked: false,
          });
        }
        break;

      case "editRealPerson":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 18 },
            { sourceId: 19 },
            { sourceId: 20 },
            { sourceId: 21 },
            { sourceId: 22 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditRealPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [20, 21, 22];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 18 },
            { sourceId: 19 },
            { sourceId: 20 },
            { sourceId: 21 },
            { sourceId: 22 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditRealPersonChecked: e,
            isNewRealPersonChecked: false,
          });
        }
        break;

      case "deleteRealPerson":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 23 }, { sourceId: 24 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteRealPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [23, 24];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 23 }, { sourceId: 24 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteRealPersonChecked: e,
          });
        }
        break;

      case "printRealPerson":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 25 });
          await this.postUserPermission(true);
          this.setState({
            isPrintRealPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [25];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 25 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintRealPersonChecked: e,
          });
        }
        break;

      case "excelRealPerson":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 26 });
          await this.postUserPermission(true);
          this.setState({
            isExcelRealPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [26];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 26 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelRealPersonChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- legalPerson -] */
      case "legalPerson":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 27 }, { sourceId: 28 });
          await this.postUserPermission(true);
          this.setState({
            isLegalPersonChecked: e,
            isLegalPersonTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 27 },
            { sourceId: 28 },
            { sourceId: 29 },
            { sourceId: 30 },
            { sourceId: 31 },
            { sourceId: 32 },
            { sourceId: 33 },
            { sourceId: 34 },
            { sourceId: 35 },
            { sourceId: 36 },
            { sourceId: 37 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isLegalPersonChecked: e,
            isLegalPersonTaskHidden: true,
            isNewLegalPersonChecked: false,
            isEditLegalPersonChecked: false,
            isDeleteLegalPersonChecked: false,
            isPrintLegalPersonChecked: false,
            isExcelLegalPersonChecked: false,
          });
        }
        break;

      case "newLegalPerson":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 29 },
            { sourceId: 30 },
            { sourceId: 31 },
            { sourceId: 32 },
            { sourceId: 33 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewLegalPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [29, 30];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 29 },
            { sourceId: 30 },
            { sourceId: 31 },
            { sourceId: 32 },
            { sourceId: 33 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewLegalPersonChecked: e,
            isEditLegalPersonChecked: false,
          });
        }
        break;

      case "editLegalPerson":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 29 },
            { sourceId: 30 },
            { sourceId: 31 },
            { sourceId: 32 },
            { sourceId: 33 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditLegalPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [31, 32, 33];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 29 },
            { sourceId: 30 },
            { sourceId: 31 },
            { sourceId: 32 },
            { sourceId: 33 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditLegalPersonChecked: e,
            isNewLegalPersonChecked: false,
          });
        }
        break;

      case "deleteLegalPerson":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 34 }, { sourceId: 35 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteLegalPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [34, 35];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 34 }, { sourceId: 35 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteLegalPersonChecked: e,
          });
        }
        break;

      case "printLegalPerson":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 36 });
          await this.postUserPermission(true);
          this.setState({
            isPrintLegalPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [36];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 36 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintLegalPersonChecked: e,
          });
        }
        break;

      case "excelLegalPerson":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 37 });
          await this.postUserPermission(true);
          this.setState({
            isExcelLegalPersonChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [37];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 37 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelLegalPersonChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- industry -] */
      case "industry":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 38 }, { sourceId: 39 });
          await this.postUserPermission(true);
          this.setState({
            isIndustryChecked: e,
            isIndustryTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 38 },
            { sourceId: 39 },
            { sourceId: 40 },
            { sourceId: 41 },
            { sourceId: 42 },
            { sourceId: 43 },
            { sourceId: 44 },
            { sourceId: 45 },
            { sourceId: 46 },
            { sourceId: 47 },
            { sourceId: 48 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isIndustryChecked: e,
            isIndustryTaskHidden: true,
            isNewIndustryChecked: false,
            isEditIndustryChecked: false,
            isDeleteIndustryChecked: false,
            isPrintIndustryChecked: false,
            isExcelIndustryChecked: false,
          });
        }
        break;

      case "newIndustry":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 40 },
            { sourceId: 41 },
            { sourceId: 42 },
            { sourceId: 43 },
            { sourceId: 44 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewIndustryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [40, 41];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 40 },
            { sourceId: 41 },
            { sourceId: 42 },
            { sourceId: 43 },
            { sourceId: 44 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewIndustryChecked: e,
            isEditIndustryChecked: false,
          });
        }
        break;

      case "editIndustry":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 40 },
            { sourceId: 41 },
            { sourceId: 42 },
            { sourceId: 43 },
            { sourceId: 44 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditIndustryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [42, 43, 44];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 40 },
            { sourceId: 41 },
            { sourceId: 42 },
            { sourceId: 43 },
            { sourceId: 44 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditIndustryChecked: e,
            isNewIndustryChecked: false,
          });
        }
        break;

      case "deleteIndustry":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 45 }, { sourceId: 46 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteIndustryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [45, 46];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 45 }, { sourceId: 46 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteIndustryChecked: e,
          });
        }
        break;

      case "printIndustry":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 47 });
          await this.postUserPermission(true);
          this.setState({
            isPrintIndustryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [47];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 47 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintIndustryChecked: e,
          });
        }
        break;

      case "excelIndustry":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 48 });
          await this.postUserPermission(true);
          this.setState({
            isExcelIndustryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [48];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 48 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelIndustryChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- organizationType -] */
      case "organizationType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 49 }, { sourceId: 50 });
          await this.postUserPermission(true);
          this.setState({
            isOrganizationTypeChecked: e,
            isOrganizationTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 49 },
            { sourceId: 50 },
            { sourceId: 51 },
            { sourceId: 52 },
            { sourceId: 53 },
            { sourceId: 54 },
            { sourceId: 55 },
            { sourceId: 56 },
            { sourceId: 57 },
            { sourceId: 58 },
            { sourceId: 59 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isOrganizationTypeChecked: e,
            isOrganizationTypeTaskHidden: true,
            isNewOrganizationTypeChecked: false,
            isEditOrganizationTypeChecked: false,
            isDeleteOrganizationTypeChecked: false,
            isPrintOrganizationTypeChecked: false,
            isExcelOrganizationTypeChecked: false,
          });
        }
        break;

      case "newOrganizationType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 51 },
            { sourceId: 52 },
            { sourceId: 53 },
            { sourceId: 54 },
            { sourceId: 55 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewOrganizationTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [51, 52];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 51 },
            { sourceId: 52 },
            { sourceId: 53 },
            { sourceId: 54 },
            { sourceId: 55 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewOrganizationTypeChecked: e,
            isEditOrganizationTypeChecked: false,
          });
        }
        break;

      case "editOrganizationType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 51 },
            { sourceId: 52 },
            { sourceId: 53 },
            { sourceId: 54 },
            { sourceId: 55 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditOrganizationTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [53, 54, 55];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 51 },
            { sourceId: 52 },
            { sourceId: 53 },
            { sourceId: 54 },
            { sourceId: 55 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditOrganizationTypeChecked: e,
            isNewOrganizationTypeChecked: false,
          });
        }
        break;

      case "deleteOrganizationType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 56 }, { sourceId: 57 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteOrganizationTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [56, 57];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 56 }, { sourceId: 57 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteOrganizationTypeChecked: e,
          });
        }
        break;

      case "printOrganizationType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 58 });
          await this.postUserPermission(true);
          this.setState({
            isPrintOrganizationTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [58];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 58 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintOrganizationTypeChecked: e,
          });
        }
        break;

      case "excelOrganizationType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 59 });
          await this.postUserPermission(true);
          this.setState({
            isExcelOrganizationTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [59];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 59 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelOrganizationTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- categoryType -] */
      case "categoryType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 60 }, { sourceId: 61 });
          await this.postUserPermission(true);
          this.setState({
            isCategoryTypeChecked: e,
            isCategoryTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 60 },
            { sourceId: 61 },
            { sourceId: 62 },
            { sourceId: 63 },
            { sourceId: 64 },
            { sourceId: 65 },
            { sourceId: 66 },
            { sourceId: 67 },
            { sourceId: 68 },
            { sourceId: 69 },
            { sourceId: 70 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isCategoryTypeChecked: e,
            isCategoryTypeTaskHidden: true,
            isNewCategoryTypeChecked: false,
            isEditCategoryTypeChecked: false,
            isDeleteCategoryTypeChecked: false,
            isPrintCategoryTypeChecked: false,
            isExcelCategoryTypeChecked: false,
          });
        }
        break;

      case "newCategoryType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 62 },
            { sourceId: 63 },
            { sourceId: 64 },
            { sourceId: 65 },
            { sourceId: 66 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewCategoryTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [62, 63];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 62 },
            { sourceId: 63 },
            { sourceId: 64 },
            { sourceId: 65 },
            { sourceId: 66 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewCategoryTypeChecked: e,
            isEditCategoryTypeChecked: false,
          });
        }
        break;

      case "editCategoryType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 62 },
            { sourceId: 63 },
            { sourceId: 64 },
            { sourceId: 65 },
            { sourceId: 66 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditCategoryTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [64, 65, 66];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 62 },
            { sourceId: 63 },
            { sourceId: 64 },
            { sourceId: 65 },
            { sourceId: 66 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditCategoryTypeChecked: e,
            isNewCategoryTypeChecked: false,
          });
        }
        break;

      case "deleteCategoryType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 67 }, { sourceId: 68 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteCategoryTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [67, 68];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 67 }, { sourceId: 68 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteCategoryTypeChecked: e,
          });
        }
        break;

      case "printCategoryType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 69 });
          await this.postUserPermission(true);
          this.setState({
            isPrintCategoryTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [69];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 69 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintCategoryTypeChecked: e,
          });
        }
        break;

      case "excelCategoryType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 70 });
          await this.postUserPermission(true);
          this.setState({
            isExcelCategoryTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [70];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 70 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelCategoryTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- educationLevel -] */
      case "educationLevel":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 71 }, { sourceId: 72 });
          await this.postUserPermission(true);
          this.setState({
            isEducationLevelChecked: e,
            isEducationLevelTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 71 },
            { sourceId: 72 },
            { sourceId: 73 },
            { sourceId: 74 },
            { sourceId: 75 },
            { sourceId: 76 },
            { sourceId: 77 },
            { sourceId: 78 },
            { sourceId: 79 },
            { sourceId: 80 },
            { sourceId: 81 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEducationLevelChecked: e,
            isEducationLevelTaskHidden: true,
            isNewEducationLevelChecked: false,
            isEditEducationLevelChecked: false,
            isDeleteEducationLevelChecked: false,
            isPrintEducationLevelChecked: false,
            isExcelEducationLevelChecked: false,
          });
        }
        break;

      case "newEducationLevel":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 73 },
            { sourceId: 74 },
            { sourceId: 75 },
            { sourceId: 76 },
            { sourceId: 77 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewEducationLevelChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [73, 74];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 73 },
            { sourceId: 74 },
            { sourceId: 75 },
            { sourceId: 76 },
            { sourceId: 77 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewEducationLevelChecked: e,
            isEditEducationLevelChecked: false,
          });
        }
        break;

      case "editEducationLevel":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 73 },
            { sourceId: 74 },
            { sourceId: 75 },
            { sourceId: 76 },
            { sourceId: 77 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditEducationLevelChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [75, 76, 77];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 73 },
            { sourceId: 74 },
            { sourceId: 75 },
            { sourceId: 76 },
            { sourceId: 77 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditEducationLevelChecked: e,
            isNewEducationLevelChecked: false,
          });
        }
        break;

      case "deleteEducationLevel":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 78 }, { sourceId: 79 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteEducationLevelChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [78, 79];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 78 }, { sourceId: 79 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteEducationLevelChecked: e,
          });
        }
        break;

      case "printEducationLevel":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 80 });
          await this.postUserPermission(true);
          this.setState({
            isPrintEducationLevelChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [80];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 80 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintEducationLevelChecked: e,
          });
        }
        break;

      case "excelEducationLevel":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 81 });
          await this.postUserPermission(true);
          this.setState({
            isExcelEducationLevelChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [81];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 81 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelEducationLevelChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- representativeType -] */
      case "representativeType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 82 }, { sourceId: 83 });
          await this.postUserPermission(true);
          this.setState({
            isRepresentativeTypeChecked: e,
            isRepresentativeTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 82 },
            { sourceId: 83 },
            { sourceId: 84 },
            { sourceId: 85 },
            { sourceId: 86 },
            { sourceId: 87 },
            { sourceId: 88 },
            { sourceId: 89 },
            { sourceId: 90 },
            { sourceId: 91 },
            { sourceId: 92 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isRepresentativeTypeChecked: e,
            isRepresentativeTypeTaskHidden: true,
            isNewRepresentativeTypeChecked: false,
            isEditRepresentativeTypeChecked: false,
            isDeleteRepresentativeTypeChecked: false,
            isPrintRepresentativeTypeChecked: false,
            isExcelRepresentativeTypeChecked: false,
          });
        }
        break;

      case "newRepresentativeType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 84 },
            { sourceId: 85 },
            { sourceId: 86 },
            { sourceId: 87 },
            { sourceId: 88 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewRepresentativeTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [84, 85];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 84 },
            { sourceId: 85 },
            { sourceId: 86 },
            { sourceId: 87 },
            { sourceId: 88 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewRepresentativeTypeChecked: e,
            isEditRepresentativeTypeChecked: false,
          });
        }
        break;

      case "editRepresentativeType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 84 },
            { sourceId: 85 },
            { sourceId: 86 },
            { sourceId: 87 },
            { sourceId: 88 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditRepresentativeTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [86, 87, 88];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 84 },
            { sourceId: 85 },
            { sourceId: 86 },
            { sourceId: 87 },
            { sourceId: 88 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditRepresentativeTypeChecked: e,
            isNewRepresentativeTypeChecked: false,
          });
        }
        break;

      case "deleteRepresentativeType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 89 }, { sourceId: 90 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteRepresentativeTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [89, 90];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 89 }, { sourceId: 90 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteRepresentativeTypeChecked: e,
          });
        }
        break;

      case "printRepresentativeType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 91 });
          await this.postUserPermission(true);
          this.setState({
            isPrintRepresentativeTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [91];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 91 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintRepresentativeTypeChecked: e,
          });
        }
        break;

      case "excelRepresentativeType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 92 });
          await this.postUserPermission(true);
          this.setState({
            isExcelRepresentativeTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [92];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 92 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelRepresentativeTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- template -] */
      case "template":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 93 }, { sourceId: 94 });
          await this.postUserPermission(true);
          this.setState({
            isTemplateChecked: e,
            isTemplateTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 93 },
            { sourceId: 94 },
            { sourceId: 95 },
            { sourceId: 96 },
            { sourceId: 97 },
            { sourceId: 98 },
            { sourceId: 99 },
            { sourceId: 100 },
            { sourceId: 101 },
            { sourceId: 102 },
            { sourceId: 103 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isTemplateChecked: e,
            isTemplateTaskHidden: true,
            isNewTemplateChecked: false,
            isEditTemplateChecked: false,
            isDeleteTemplateChecked: false,
            isPrintTemplateChecked: false,
            isExcelTemplateChecked: false,
          });
        }
        break;

      case "newTemplate":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 95 },
            { sourceId: 96 },
            { sourceId: 97 },
            { sourceId: 98 },
            { sourceId: 99 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewTemplateChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [95, 96];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 95 },
            { sourceId: 96 },
            { sourceId: 97 },
            { sourceId: 98 },
            { sourceId: 99 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewTemplateChecked: e,
            isEditTemplateChecked: false,
          });
        }
        break;

      case "editTemplate":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 95 },
            { sourceId: 96 },
            { sourceId: 97 },
            { sourceId: 98 },
            { sourceId: 99 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditTemplateChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [97, 98, 99];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 95 },
            { sourceId: 96 },
            { sourceId: 97 },
            { sourceId: 98 },
            { sourceId: 99 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditTemplateChecked: e,
            isNewTemplateChecked: false,
          });
        }
        break;

      case "deleteTemplate":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 100 }, { sourceId: 101 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteTemplateChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [100, 101];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 100 }, { sourceId: 101 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteTemplateChecked: e,
          });
        }
        break;

      case "printTemplate":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 102 });
          await this.postUserPermission(true);
          this.setState({
            isPrintTemplateChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [102];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 102 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintTemplateChecked: e,
          });
        }
        break;

      case "excelTemplate":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 103 });
          await this.postUserPermission(true);
          this.setState({
            isExcelTemplateChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [103];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 103 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelTemplateChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #endregion */

      /* #region  [- material -] */

      case "materialMenu":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 6 });
          await this.postUserPermission(true);
          this.setState({
            isMaterialChecked: e,
            isMaterialChildrenHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          for (let index = 780; index < 915; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          this.state.sourceList.push(
            { sourceId: 6 },
            { sourceId: 7 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isMaterialChecked: e,
            isMaterialChildrenHidden: true,
            //--material
            isMaterialCardChecked: false,
            isMaterialCardTaskHidden: true,
            isNewMaterialChecked: false,
            isEditMaterialChecked: false,
            isDeleteMaterialChecked: false,
            isPrintMaterialChecked: false,
            isExcelMaterialChecked: false,
            //--materialCategory
            isMaterialCategoryChecked: false,
            isMaterialCategoryTaskHidden: true,
            isNewMaterialCategoryChecked: false,
            isEditMaterialCategoryChecked: false,
            isDeleteMaterialCategoryChecked: false,
            isPrintMaterialCategoryChecked: false,
            isExcelMaterialCategoryChecked: false,
            //--Scale
            isScaleChecked: false,
            isScaleTaskHidden: true,
            isNewScaleChecked: false,
            isEditScaleChecked: false,
            isDeleteScaleChecked: false,
            isPrintScaleChecked: false,
            isExcelScaleChecked: false,
            //warehouseCategory
            isWarehouseCategoryChecked: false,
            isWarehouseCategoryTaskHidden: true,
            isNewWarehouseCategoryChecked: false,
            isEditWarehouseCategoryChecked: false,
            isDeleteWarehouseCategoryChecked: false,
            isPrintWarehouseCategoryChecked: false,
            isExcelWarehouseCategoryChecked: false,
            //warehouse
            isWarehouseChecked: false,
            isWarehouseTaskHidden: true,
            isNewWarehouseChecked: false,
            isEditWarehouseChecked: false,
            isDeleteWarehouseChecked: false,
            isPrintWarehouseChecked: false,
            isExcelWarehouseChecked: false,
            //product
            isProductChecked: false,
            isProductTaskHidden: true,
            isNewProductChecked: false,
            isEditProductChecked: false,
            isDeleteProductChecked: false,
            isPrintProductChecked: false,
            isExcelProductChecked: false,
            //productCategory
            isProductCategoryChecked: false,
            isProductCategoryTaskHidden: true,
            isNewProductCategoryChecked: false,
            isEditProductCategoryChecked: false,
            isDeleteProductCategoryChecked: false,
            isPrintProductCategoryChecked: false,
            isExcelProductCategoryChecked: false,
            //supplyChain
            isSupplyChainChecked: false,
            isSupplyChainTaskHidden: true,
            isNewSupplyChainChecked: false,
            isEditSupplyChainChecked: false,
            isDeleteSupplyChainChecked: false,
            isPrintSupplyChainChecked: false,
            isExcelSupplyChainChecked: false,
          });
        }
        break;

      /* #region  [- material -] */
      case "materialCard":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 791 },{ sourceId: 792 }, { sourceId: 793 }, { sourceId: 794 });
          await this.postUserPermission(true);
          this.setState({
            isMaterialCardChecked: e,
            isMaterialCardTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 791; index < 828; index++) {
            this.state.sourceList.push({ sourceId: index });
          }

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isMaterialCardChecked: e,
            isMaterialCardTaskHidden: true,
            isNewMaterialChecked: false,
            isEditMaterialChecked: false,
            isDeleteMaterialChecked: false,
            isPrintMaterialChecked: false,
            isExcelMaterialChecked: false,
          });
        }
        break;

      case "newMaterial":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 795 },
            { sourceId: 796 },
            { sourceId: 797 },
            { sourceId: 798 },
            { sourceId: 799 },
            { sourceId: 800 },
            { sourceId: 801 },
            { sourceId: 802 },
            { sourceId: 803 },
            { sourceId: 804 },
            { sourceId: 805 },
            { sourceId: 806 },
            { sourceId: 807 },
            { sourceId: 808 },
            { sourceId: 913 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewMaterialChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 795 },
            { sourceId: 796 },
            { sourceId: 797 },
            { sourceId: 798 },
            { sourceId: 799 },
            { sourceId: 800 },
            { sourceId: 801 },
            { sourceId: 802 },
            { sourceId: 803 },
            { sourceId: 804 },
            { sourceId: 805 },
            { sourceId: 806 },
            { sourceId: 807 },
            { sourceId: 808 },
            { sourceId: 913 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewMaterialChecked: e,
            isEditMaterialChecked: false,
          });
        }
        break;

      case "editMaterial":
        if (e === true) {
          for (let index = 811; index < 828; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          this.state.sourceList.push({ sourceId: 914 })
          await this.postUserPermission(true);
          this.setState({
            isEditMaterialChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [108, 109, 110];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 811; index < 828; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          this.state.sourceList.push({ sourceId: 914 })
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditMaterialChecked: e,
            isNewMaterialChecked: false,
          });
        }
        break;

      case "deleteMaterial":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 809 }, { sourceId: 810 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteMaterialChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [111, 112];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 809 }, { sourceId: 810 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteMaterialChecked: e,
          });
        }
        break;

      // case "printMaterial":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 113 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isPrintMaterialChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [113];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 113 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isPrintMaterialChecked: e,
      //     });
      //   }
      //   break;

      // case "excelMaterial":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 114 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isExcelMaterialChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [114];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 114 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isExcelMaterialChecked: e,
      //     });
      //   }
      //   break;

      /* #endregion */

      /* #region  [- materialCategory -] */
      case "materialCategoryCard":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 780 }, { sourceId: 781 });
          await this.postUserPermission(true);
          this.setState({
            isMaterialCategoryChecked: e,
            isMaterialCategoryTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 780; index < 791; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isMaterialCategoryChecked: e,
            isMaterialCategoryTaskHidden: true,
            isNewMaterialCategoryChecked: false,
            isEditMaterialCategoryChecked: false,
            isDeleteMaterialCategoryChecked: false,
            isPrintMaterialCategoryChecked: false,
            isExcelMaterialCategoryChecked: false,
          });
        }
        break;

      case "newMaterialCategory":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 782 },
            { sourceId: 783 },
            { sourceId: 784 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewMaterialCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [117, 118];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 782 },
            { sourceId: 783 },
            { sourceId: 784 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewMaterialCategoryChecked: e,
            isEditMaterialCategoryChecked: false,
          });
        }
        break;

      case "editMaterialCategory":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 787 },
            { sourceId: 788 },
            { sourceId: 789 },
            { sourceId: 790 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditMaterialCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [119, 120, 121];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 787 },
            { sourceId: 788 },
            { sourceId: 789 },
            { sourceId: 790 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditMaterialCategoryChecked: e,
            isNewMaterialCategoryChecked: false,
          });
        }
        break;

      case "deleteMaterialCategory":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 785 }, { sourceId: 786 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteMaterialCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [122, 123];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 785 }, { sourceId: 786 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteMaterialCategoryChecked: e,
          });
        }
        break;

      // case "printMaterialCategory":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 124 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isPrintMaterialCategoryChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [124];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 124 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isPrintMaterialCategoryChecked: e,
      //     });
      //   }
      //   break;

      // case "excelMaterialCategory":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 125 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isExcelMaterialCategoryChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [125];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 125 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isExcelMaterialCategoryChecked: e,
      //     });
      //   }
      //   break;

      /* #endregion */

      /* #region  [- scale -] */
      case "scaleCard":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 828 }, { sourceId: 829 });
          await this.postUserPermission(true);
          this.setState({
            isScaleChecked: e,
            isScaleTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 828; index < 839; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isScaleChecked: e,
            isScaleTaskHidden: true,
            isNewScaleChecked: false,
            isEditScaleChecked: false,
            isDeleteScaleChecked: false,
            isPrintScaleChecked: false,
            isExcelScaleChecked: false,
          });
        }
        break;

      case "newScale":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 830 },
            { sourceId: 831 },
            { sourceId: 832 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewScaleChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [128, 129];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 830 },
            { sourceId: 831 },
            { sourceId: 832 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewScaleChecked: e,
            isEditScaleChecked: false,
          });
        }
        break;

      case "editScale":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 835 },
            { sourceId: 836 },
            { sourceId: 837 },
            { sourceId: 838 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditScaleChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [130, 131, 132];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 835 },
            { sourceId: 836 },
            { sourceId: 837 },
            { sourceId: 838 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditScaleChecked: e,
            isNewScaleChecked: false,
          });
        }
        break;

      case "deleteScale":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 833 }, { sourceId: 834 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteScaleChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [133, 134];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 833 }, { sourceId: 834 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteScaleChecked: e,
          });
        }
        break;

      // case "printScale":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 135 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isPrintScaleChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [135];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 135 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isPrintScaleChecked: e,
      //     });
      //   }
      //   break;

      // case "excelScale":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 136 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isExcelScaleChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [136];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 136 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isExcelScaleChecked: e,
      //     });
      //   }
      //   break;

      /* #endregion */

      /* #region  [- warehouseCategory -] */
      case "warehouseCategory":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 861 }, { sourceId: 862 });
          await this.postUserPermission(true);
          this.setState({
            isWarehouseCategoryChecked: e,
            isWarehouseCategoryTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 146, 147];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 861 },
            { sourceId: 862 },
            { sourceId: 863 },
            { sourceId: 864 },
            { sourceId: 865 },
            { sourceId: 866 },
            { sourceId: 867 },
            { sourceId: 868 },
            { sourceId: 869 },
            { sourceId: 870 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isWarehouseCategoryChecked: e,
            isWarehouseCategoryTaskHidden: true,
            isNewWarehouseCategoryChecked: false,
            isEditWarehouseCategoryChecked: false,
            isDeleteWarehouseCategoryChecked: false,
            isPrintWarehouseCategoryChecked: false,
            isExcelWarehouseCategoryChecked: false,
          });
        }
        break;

      case "newWarehouseCategory":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 863 },
            { sourceId: 864 },
            { sourceId: 865 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewWarehouseCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [139, 140];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 863 },
            { sourceId: 864 },
            { sourceId: 865 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewWarehouseCategoryChecked: e,
            isEditWarehouseCategoryChecked: false,
          });
        }
        break;

      case "editWarehouseCategory":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 868 },
            { sourceId: 869 },
            { sourceId: 870 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditWarehouseCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [141, 142, 143];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 868 },
            { sourceId: 869 },
            { sourceId: 870 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditWarehouseCategoryChecked: e,
            isNewWarehouseCategoryChecked: false,
          });
        }
        break;

      case "deleteWarehouseCategory":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 866 }, { sourceId: 867 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteWarehouseCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [144, 145];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 144 }, { sourceId: 145 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteWarehouseCategoryChecked: e,
          });
        }
        break;

      // case "printWarehouseCategory":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 146 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isPrintWarehouseCategoryChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [146];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 146 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isPrintWarehouseCategoryChecked: e,
      //     });
      //   }
      //   break;

      // case "excelWarehouseCategory":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 147 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isExcelWarehouseCategoryChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [147];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 147 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isExcelWarehouseCategoryChecked: e,
      //     });
      //   }
      //   break;

      /* #endregion */

      /* #region  [- warehouse -] */
      case "warehouse":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 871 }, { sourceId: 872 });
          await this.postUserPermission(true);
          this.setState({
            isWarehouseChecked: e,
            isWarehouseTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 871; index < 895; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isWarehouseChecked: e,
            isWarehouseTaskHidden: true,
            isNewWarehouseChecked: false,
            isEditWarehouseChecked: false,
            isDeleteWarehouseChecked: false,
            isPrintWarehouseChecked: false,
            isExcelWarehouseChecked: false,
          });
        }
        break;

      case "newWarehouse":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 873 },
            { sourceId: 874 },
            { sourceId: 875 },
            { sourceId: 876 },
            { sourceId: 883 },
            { sourceId: 884 },
            { sourceId: 885 },
            { sourceId: 886 },
            { sourceId: 887 },
            { sourceId: 888 },
          );
          await this.postUserPermission(true);
          this.setState({
            isNewWarehouseChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [150, 151];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 873 },
            { sourceId: 874 },
            { sourceId: 875 },
            { sourceId: 876 },
            { sourceId: 883 },
            { sourceId: 884 },
            { sourceId: 885 },
            { sourceId: 886 },
            { sourceId: 887 },
            { sourceId: 888 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewWarehouseChecked: e,
            isEditWarehouseChecked: false,
          });
        }
        break;

      case "editWarehouse":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 879 },
            { sourceId: 880 },
            { sourceId: 881 },
            { sourceId: 882 },
            { sourceId: 889 },
            { sourceId: 890 },
            { sourceId: 891 },
            { sourceId: 892 },
            { sourceId: 893 },
            { sourceId: 894 },
          );
          await this.postUserPermission(true);
          this.setState({
            isEditWarehouseChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [152, 153, 154];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 879 },
            { sourceId: 880 },
            { sourceId: 881 },
            { sourceId: 882 },
            { sourceId: 889 },
            { sourceId: 890 },
            { sourceId: 891 },
            { sourceId: 892 },
            { sourceId: 893 },
            { sourceId: 894 },
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditWarehouseChecked: e,
            isNewWarehouseChecked: false,
          });
        }
        break;

      case "deleteWarehouse":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 877 }, { sourceId: 878 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteWarehouseChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [155, 156];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 877 }, { sourceId: 878 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteWarehouseChecked: e,
          });
        }
        break;

      // case "printWarehouse":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 157 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isPrintWarehouseChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [157];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 157 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isPrintWarehouseChecked: e,
      //     });
      //   }
      //   break;

      // case "excelWarehouse":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 158 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isExcelWarehouseChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [158];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 158 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isExcelWarehouseChecked: e,
      //     });
      //   }
      //   break;

      /* #endregion */

      /* #region  [- product -] */
      case "product":
        if (e === true) {
          for (let index = 895; index < 900; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(true);
          this.setState({
            isProductChecked: e,
            isProductTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 895; index < 913; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isProductChecked: e,
            isProductTaskHidden: true,
            isNewProductChecked: false,
            isEditProductChecked: false,
            isDeleteProductChecked: false,
            isPrintProductChecked: false,
            isExcelProductChecked: false,
          });
        }
        break;

      case "newProduct":
        if (e === true) {
          for (let index = 900; index < 908; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(true);
          this.setState({
            isNewProductChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [161, 162];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 900; index < 908; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewProductChecked: e,
            isEditProductChecked: false,
          });
        }
        break;

      case "editProduct":
        if (e === true) {
          for (let index = 910; index < 913; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(true);
          this.setState({
            isEditProductChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [163, 164, 165];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 910; index < 913; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditProductChecked: e,
            isNewProductChecked: false,
          });
        }
        break;

      case "deleteProduct":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 908 }, { sourceId: 909 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteProductChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [166, 167];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 908 }, { sourceId: 909 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteProductChecked: e,
          });
        }
        break;

      // case "printProduct":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 168 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isPrintProductChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [168];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 168 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isPrintProductChecked: e,
      //     });
      //   }
      //   break;

      // case "excelProduct":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 169 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isExcelProductChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [169];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 169 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isExcelProductChecked: e,
      //     });
      //   }
      //   break;

      /* #endregion */

      /* #region  [- productCategory -] */
      case "productCategory":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 850 }, { sourceId: 851 });
          await this.postUserPermission(true);
          this.setState({
            isProductCategoryChecked: e,
            isProductCategoryTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          for (let index = 850; index < 861; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isProductCategoryChecked: e,
            isProductCategoryTaskHidden: true,
            isNewProductCategoryChecked: false,
            isEditProductCategoryChecked: false,
            isDeleteProductCategoryChecked: false,
            isPrintProductCategoryChecked: false,
            isExcelProductCategoryChecked: false,
          });
        }
        break;

      case "newProductCategory":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 852 },
            { sourceId: 853 },
            { sourceId: 854 },
            { sourceId: 855 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewProductCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [172, 173];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 852 },
            { sourceId: 853 },
            { sourceId: 854 },
            { sourceId: 855 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewProductCategoryChecked: e,
            isEditProductCategoryChecked: false,
          });
        }
        break;

      case "editProductCategory":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 858 },
            { sourceId: 859 },
            { sourceId: 860 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditProductCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [174, 175, 176];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 858 },
            { sourceId: 859 },
            { sourceId: 860 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditProductCategoryChecked: e,
            isNewProductCategoryChecked: false,
          });
        }
        break;

      case "deleteProductCategory":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 856 }, { sourceId: 857 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteProductCategoryChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [177, 178];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 856 }, { sourceId: 857 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteProductCategoryChecked: e,
          });
        }
        break;

      // case "printProductCategory":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 179 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isPrintProductCategoryChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [179];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 179 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isPrintProductCategoryChecked: e,
      //     });
      //   }
      //   break;

      // case "excelProductCategory":
      //   if (e === true) {
      //     this.state.sourceList.push({ sourceId: 180 });
      //     await this.postUserPermission(true);
      //     this.setState({
      //       isExcelProductCategoryChecked: e,
      //     });
      //   } else {
      //     // const items = [...this.state.sourceList]
      //     // const removedItem = [180];
      //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
      //     this.state.sourceList.push({ sourceId: 180 });
      //     await this.postUserPermission(false);
      //     this.setState({
      //       //sourceList: filteredItems,
      //       //
      //       isExcelProductCategoryChecked: e,
      //     });
      //   }
      //   break;

      /* #endregion */

      /* #region  [- supplyChain -] */
        
        case "supplyChain":
          if (e === true) {
            this.state.sourceList.push({ sourceId: 839 }, { sourceId: 840 });
            await this.postUserPermission(true);
            this.setState({
              isSupplyChainChecked: e,
              isSupplyChainTaskHidden: false,
            });
          } else {
            // const items = [...this.state.sourceList]
            // const removedItem = [170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180];
            // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
            for (let index = 839; index < 850; index++) {
              this.state.sourceList.push({ sourceId: index });
            }
            await this.postUserPermission(false);
            this.setState({
              //sourceList: filteredItems,
              //
              isSupplyChainChecked: e,
              isSupplyChainTaskHidden: true,
              isNewSupplyChainChecked: false,
              isEditSupplyChainChecked: false,
              isDeleteSupplyChainChecked: false,
              isPrintSupplyChainChecked: false,
              isExcelSupplyChainChecked: false,
            });
          }
          break;
  
        case "newSupplyChain":
          if (e === true) {
            this.state.sourceList.push(
              { sourceId: 841 },
              { sourceId: 842 },
              { sourceId: 843 }
            );
            await this.postUserPermission(true);
            this.setState({
              isNewSupplyChainChecked: e,
            });
          } else {
            // const items = [...this.state.sourceList]
            // const removedItem = [172, 173];
            // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
            this.state.sourceList.push(
              { sourceId: 841 },
              { sourceId: 842 },
              { sourceId: 843 }
            );
            await this.postUserPermission(false);
            this.setState({
              //sourceList: filteredItems,
              //
              isNewSupplyChainChecked: e,
              isEditSupplyChainChecked: false,
            });
          }
          break;
  
        case "editSupplyChain":
          if (e === true) {
            this.state.sourceList.push(
              { sourceId: 846 },
              { sourceId: 847 },
              { sourceId: 848 },
              { sourceId: 849 }
            );
            await this.postUserPermission(true);
            this.setState({
              isEditSupplyChainChecked: e,
            });
          } else {
            // const items = [...this.state.sourceList]
            // const removedItem = [174, 175, 176];
            // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
            this.state.sourceList.push(
              { sourceId: 846 },
              { sourceId: 847 },
              { sourceId: 848 },
              { sourceId: 849 }
            );
            await this.postUserPermission(false);
            this.setState({
              //sourceList: filteredItems,
              //
              isEditSupplyChainChecked: e,
              isNewSupplyChainChecked: false,
            });
          }
          break;
  
        case "deleteSupplyChain":
          if (e === true) {
            this.state.sourceList.push({ sourceId: 844 }, { sourceId: 845 });
            await this.postUserPermission(true);
            this.setState({
              isDeleteSupplyChainChecked: e,
            });
          } else {
            // const items = [...this.state.sourceList]
            // const removedItem = [177, 178];
            // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
            this.state.sourceList.push({ sourceId: 844 }, { sourceId: 845 });
            await this.postUserPermission(false);
            this.setState({
              //sourceList: filteredItems,
              //
              isDeleteSupplyChainChecked: e,
            });
          }
          break;
  
        // case "printSupplyChain":
        //   if (e === true) {
        //     this.state.sourceList.push({ sourceId: 179 });
        //     await this.postUserPermission(true);
        //     this.setState({
        //       isPrintSupplyChainChecked: e,
        //     });
        //   } else {
        //     // const items = [...this.state.sourceList]
        //     // const removedItem = [179];
        //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
        //     this.state.sourceList.push({ sourceId: 179 });
        //     await this.postUserPermission(false);
        //     this.setState({
        //       //sourceList: filteredItems,
        //       //
        //       isPrintSupplyChainChecked: e,
        //     });
        //   }
        //   break;
  
        // case "excelSupplyChain":
        //   if (e === true) {
        //     this.state.sourceList.push({ sourceId: 180 });
        //     await this.postUserPermission(true);
        //     this.setState({
        //       isExcelSupplyChainChecked: e,
        //     });
        //   } else {
        //     // const items = [...this.state.sourceList]
        //     // const removedItem = [180];
        //     // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
        //     this.state.sourceList.push({ sourceId: 180 });
        //     await this.postUserPermission(false);
        //     this.setState({
        //       //sourceList: filteredItems,
        //       //
        //       isExcelSupplyChainChecked: e,
        //     });
        //   }
        //   break;
      
            /* #endregion */
      

      /* #endregion */

      /* #region  [- marketingSetting -] */
      case "marketingSetting":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 7 });
          await this.postUserPermission(true);
          this.setState({
            isMarketingSettingChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 7 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isMarketingSettingChecked: e,
          });
        }

        break;

      /* #endregion */

      /* #region  [- crmSetting -] */
      case "crmSetting":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 8 });
          await this.postUserPermission(true);
          this.setState({
            isCRMSettingChecked: e,
            isCRMSettingChildrenHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 8 },
            { sourceId: 306 },
            { sourceId: 307 },
            { sourceId: 308 },
            { sourceId: 309 },
            { sourceId: 312 },
            { sourceId: 313 },
            { sourceId: 314 },
            { sourceId: 310 },
            { sourceId: 311 },
            { sourceId: 471 },
            { sourceId: 472 },
            { sourceId: 315 },
            { sourceId: 316 },
            { sourceId: 317 },
            { sourceId: 318 },
            { sourceId: 321 },
            { sourceId: 322 },
            { sourceId: 323 },
            { sourceId: 319 },
            { sourceId: 320 },
            { sourceId: 473 },
            { sourceId: 474 },
            { sourceId: 342 },
            { sourceId: 343 },
            { sourceId: 344 },
            { sourceId: 345 },
            { sourceId: 349 },
            { sourceId: 350 },
            { sourceId: 351 },
            { sourceId: 346 },
            { sourceId: 347 },
            { sourceId: 475 },
            { sourceId: 476 },
            { sourceId: 324 },
            { sourceId: 325 },
            { sourceId: 326 },
            { sourceId: 327 },
            { sourceId: 330 },
            { sourceId: 331 },
            { sourceId: 332 },
            { sourceId: 328 },
            { sourceId: 329 },
            { sourceId: 477 },
            { sourceId: 478 },
            { sourceId: 333 },
            { sourceId: 334 },
            { sourceId: 335 },
            { sourceId: 336 },
            { sourceId: 339 },
            { sourceId: 340 },
            { sourceId: 341 },
            { sourceId: 337 },
            { sourceId: 338 },
            { sourceId: 479 },
            { sourceId: 480 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isCRMSettingChecked: e,
            isCRMSettingChildrenHidden: true,

            /* #region  [- rating -] */
            isRatingChecked: false,
            isRatingTaskHidden: true,
            isNewRatingChecked: false,
            isEditRatingChecked: false,
            isDeleteRatingChecked: false,
            isPrintRatingChecked: false,
            isExcelRatingChecked: false,
            /* #endregion */

            /* #region  [- accountSource -] */
            isAccountSourceChecked: false,
            isAccountSourceTaskHidden: true,
            isNewAccountSourceChecked: false,
            isEditAccountSourceChecked: false,
            isDeleteAccountSourceChecked: false,
            isPrintAccountSourceChecked: false,
            isExcelAccountSourceChecked: false,
            /* #endregion */

            /* #region  [- crmTaskStatus -] */
            isCRMTaskStatusChecked: false,
            isCRMTaskStatusTaskHidden: true,
            isNewCRMTaskStatusChecked: false,
            isEditCRMTaskStatusChecked: false,
            isDeleteCRMTaskStatusChecked: false,
            isPrintCRMTaskStatusChecked: false,
            isExcelCRMTaskStatusChecked: false,
            /* #endregion */

            /* #region  [- crmResponsibleType -] */
            isCRMResponsibleTypeChecked: false,
            isCRMResponsibleTypeTaskHidden: true,
            isNewCRMResponsibleTypeChecked: false,
            isEditCRMResponsibleTypeChecked: false,
            isDeleteCRMResponsibleTypeChecked: false,
            isPrintCRMResponsibleTypeChecked: false,
            isExcelCRMResponsibleTypeChecked: false,
            /* #endregion */

            /* #region  [- crmReportType -] */
            isCRMReportTypeChecked: false,
            isCRMReportTypeTaskHidden: true,
            isNewCRMReportTypeChecked: false,
            isEditCRMReportTypeChecked: false,
            isDeleteCRMReportTypeChecked: false,
            isPrintCRMReportTypeChecked: false,
            isExcelCRMReportTypeChecked: false,
            /* #endregion */
          });
        }
        break;

      /* #region  [- rating -] */

      case "rating":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 306 }, { sourceId: 307 });
          await this.postUserPermission(true);
          this.setState({
            isRatingChecked: e,
            isRatingTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 306 },
            { sourceId: 307 },
            { sourceId: 308 },
            { sourceId: 309 },
            { sourceId: 312 },
            { sourceId: 313 },
            { sourceId: 314 },
            { sourceId: 310 },
            { sourceId: 311 },
            { sourceId: 471 },
            { sourceId: 472 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isRatingChecked: e,
            isRatingTaskHidden: true,
            isNewRatingChecked: false,
            isEditRatingChecked: false,
            isDeleteRatingChecked: false,
            isPrintRatingChecked: false,
            isExcelRatingChecked: false,
          });
        }
        break;

      case "newRating":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 308 },
            { sourceId: 309 },
            { sourceId: 312 },
            { sourceId: 313 },
            { sourceId: 314 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewRatingChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 308 },
            { sourceId: 309 },
            { sourceId: 312 },
            { sourceId: 313 },
            { sourceId: 314 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewRatingChecked: e,
            isEditRatingChecked: false,
          });
        }
        break;

      case "editRating":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 308 },
            { sourceId: 309 },
            { sourceId: 312 },
            { sourceId: 313 },
            { sourceId: 314 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditRatingChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 308 },
            { sourceId: 309 },
            { sourceId: 312 },
            { sourceId: 313 },
            { sourceId: 314 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditRatingChecked: e,
            isNewRatingChecked: false,
          });
        }
        break;

      case "deleteRating":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 310 }, { sourceId: 311 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteRatingChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 310 }, { sourceId: 311 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteRatingChecked: e,
          });
        }
        break;

      case "printRating":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 471 });
          await this.postUserPermission(true);
          this.setState({
            isPrintRatingChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 471 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintRatingChecked: e,
          });
        }
        break;

      case "excelRating":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 472 });
          await this.postUserPermission(true);
          this.setState({
            isExcelRatingChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 472 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelRatingChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- accountSource -] */
      case "accountSource":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 315 }, { sourceId: 316 });
          await this.postUserPermission(true);
          this.setState({
            isAccountSourceChecked: e,
            isAccountSourceTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 315 },
            { sourceId: 316 },
            { sourceId: 317 },
            { sourceId: 318 },
            { sourceId: 321 },
            { sourceId: 322 },
            { sourceId: 323 },
            { sourceId: 319 },
            { sourceId: 320 },
            { sourceId: 473 },
            { sourceId: 474 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isAccountSourceChecked: e,
            isAccountSourceTaskHidden: true,
            isNewAccountSourceChecked: false,
            isEditAccountSourceChecked: false,
            isDeleteAccountSourceChecked: false,
            isPrintAccountSourceChecked: false,
            isExcelAccountSourceChecked: false,
          });
        }
        break;

      case "newAccountSource":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 317 },
            { sourceId: 318 },
            { sourceId: 321 },
            { sourceId: 322 },
            { sourceId: 323 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewAccountSourceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 317 },
            { sourceId: 318 },
            { sourceId: 321 },
            { sourceId: 322 },
            { sourceId: 323 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewAccountSourceChecked: e,
            isEditAccountSourceChecked: false,
          });
        }
        break;

      case "editAccountSource":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 317 },
            { sourceId: 318 },
            { sourceId: 321 },
            { sourceId: 322 },
            { sourceId: 323 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditAccountSourceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 317 },
            { sourceId: 318 },
            { sourceId: 321 },
            { sourceId: 322 },
            { sourceId: 323 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditAccountSourceChecked: e,
            isNewAccountSourceChecked: false,
          });
        }
        break;

      case "deleteAccountSource":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 319 }, { sourceId: 320 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteAccountSourceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 319 }, { sourceId: 320 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteAccountSourceChecked: e,
          });
        }
        break;

      case "printAccountSource":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 473 });
          await this.postUserPermission(true);
          this.setState({
            isPrintAccountSourceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 473 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintAccountSourceChecked: e,
          });
        }
        break;

      case "excelAccountSource":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 474 });
          await this.postUserPermission(true);
          this.setState({
            isExcelAccountSourceChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 474 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelAccountSourceChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- crmTaskStatus -] */

      case "crmTaskStatus":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 342 }, { sourceId: 343 });
          await this.postUserPermission(true);
          this.setState({
            isCRMTaskStatusChecked: e,
            isCRMTaskStatusTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 342 },
            { sourceId: 343 },
            { sourceId: 344 },
            { sourceId: 345 },
            { sourceId: 349 },
            { sourceId: 350 },
            { sourceId: 351 },
            { sourceId: 346 },
            { sourceId: 347 },
            { sourceId: 475 },
            { sourceId: 476 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isCRMTaskStatusChecked: e,
            isCRMTaskStatusTaskHidden: true,
            isNewCRMTaskStatusChecked: false,
            isEditCRMTaskStatusChecked: false,
            isDeleteCRMTaskStatusChecked: false,
            isPrintCRMTaskStatusChecked: false,
            isExcelCRMTaskStatusChecked: false,
          });
        }
        break;

      case "newCRMTaskStatus":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 344 },
            { sourceId: 345 },
            { sourceId: 349 },
            { sourceId: 350 },
            { sourceId: 351 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewCRMTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 344 },
            { sourceId: 345 },
            { sourceId: 349 },
            { sourceId: 350 },
            { sourceId: 351 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewCRMTaskStatusChecked: e,
            isEditCRMTaskStatusChecked: false,
          });
        }
        break;

      case "editCRMTaskStatus":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 344 },
            { sourceId: 345 },
            { sourceId: 349 },
            { sourceId: 350 },
            { sourceId: 351 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditCRMTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 344 },
            { sourceId: 345 },
            { sourceId: 349 },
            { sourceId: 350 },
            { sourceId: 351 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditCRMTaskStatusChecked: e,
            isNewCRMTaskStatusChecked: false,
          });
        }
        break;

      case "deleteCRMTaskStatus":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 346 }, { sourceId: 347 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteCRMTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 346 }, { sourceId: 347 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteCRMTaskStatusChecked: e,
          });
        }
        break;

      case "printCRMTaskStatus":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 475 });
          await this.postUserPermission(true);
          this.setState({
            isPrintCRMTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 475 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintCRMTaskStatusChecked: e,
          });
        }
        break;

      case "excelCRMTaskStatus":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 476 });
          await this.postUserPermission(true);
          this.setState({
            isExcelCRMTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 476 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelCRMTaskStatusChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- crmResponsibleType -] */
      case "crmResponsibleType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 324 }, { sourceId: 325 });
          await this.postUserPermission(true);
          this.setState({
            isCRMResponsibleTypeChecked: e,
            isCRMResponsibleTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 324 },
            { sourceId: 325 },
            { sourceId: 326 },
            { sourceId: 327 },
            { sourceId: 330 },
            { sourceId: 331 },
            { sourceId: 332 },
            { sourceId: 328 },
            { sourceId: 329 },
            { sourceId: 477 },
            { sourceId: 478 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isCRMResponsibleTypeChecked: e,
            isCRMResponsibleTypeTaskHidden: true,
            isNewCRMResponsibleTypeChecked: false,
            isEditCRMResponsibleTypeChecked: false,
            isDeleteCRMResponsibleTypeChecked: false,
            isPrintCRMResponsibleTypeChecked: false,
            isExcelCRMResponsibleTypeChecked: false,
          });
        }
        break;

      case "newCRMResponsibleType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 326 },
            { sourceId: 327 },
            { sourceId: 330 },
            { sourceId: 331 },
            { sourceId: 332 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewCRMResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 326 },
            { sourceId: 327 },
            { sourceId: 330 },
            { sourceId: 331 },
            { sourceId: 332 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewCRMResponsibleTypeChecked: e,
            isEditCRMResponsibleTypeChecked: false,
          });
        }
        break;

      case "editCRMResponsibleType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 326 },
            { sourceId: 327 },
            { sourceId: 330 },
            { sourceId: 331 },
            { sourceId: 332 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditCRMResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 326 },
            { sourceId: 327 },
            { sourceId: 330 },
            { sourceId: 331 },
            { sourceId: 332 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditCRMResponsibleTypeChecked: e,
            isNewCRMResponsibleTypeChecked: false,
          });
        }
        break;

      case "deleteCRMResponsibleType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 328 }, { sourceId: 329 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteCRMResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 328 }, { sourceId: 329 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteCRMResponsibleTypeChecked: e,
          });
        }
        break;

      case "printCRMResponsibleType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 477 });
          await this.postUserPermission(true);
          this.setState({
            isPrintCRMResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 477 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintCRMResponsibleTypeChecked: e,
          });
        }
        break;

      case "excelCRMResponsibleType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 478 });
          await this.postUserPermission(true);
          this.setState({
            isExcelCRMResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 478 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelCRMResponsibleTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- crmReportType -] */
      case "crmReportType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 333 }, { sourceId: 334 });
          await this.postUserPermission(true);
          this.setState({
            isCRMReportTypeChecked: e,
            isCRMReportTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 333 },
            { sourceId: 334 },
            { sourceId: 335 },
            { sourceId: 336 },
            { sourceId: 339 },
            { sourceId: 340 },
            { sourceId: 341 },
            { sourceId: 337 },
            { sourceId: 338 },
            { sourceId: 479 },
            { sourceId: 480 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isCRMReportTypeChecked: e,
            isCRMReportTypeTaskHidden: true,
            isNewCRMReportTypeChecked: false,
            isEditCRMReportTypeChecked: false,
            isDeleteCRMReportTypeChecked: false,
            isPrintCRMReportTypeChecked: false,
            isExcelCRMReportTypeChecked: false,
          });
        }
        break;

      case "newCRMReportType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 335 },
            { sourceId: 336 },
            { sourceId: 339 },
            { sourceId: 340 },
            { sourceId: 341 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewCRMReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 335 },
            { sourceId: 336 },
            { sourceId: 339 },
            { sourceId: 340 },
            { sourceId: 341 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewCRMReportTypeChecked: e,
            isEditCRMReportTypeChecked: false,
          });
        }
        break;

      case "editCRMReportType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 335 },
            { sourceId: 336 },
            { sourceId: 339 },
            { sourceId: 340 },
            { sourceId: 341 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditCRMReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 335 },
            { sourceId: 336 },
            { sourceId: 339 },
            { sourceId: 340 },
            { sourceId: 341 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditCRMReportTypeChecked: e,
            isNewCRMReportTypeChecked: false,
          });
        }
        break;

      case "deleteCRMReportType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 337 }, { sourceId: 338 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteCRMReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 337 }, { sourceId: 338 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteCRMReportTypeChecked: e,
          });
        }
        break;

      case "printCRMReportType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 479 });
          await this.postUserPermission(true);
          this.setState({
            isPrintCRMReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 479 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintCRMReportTypeChecked: e,
          });
        }
        break;

      case "excelCRMReportType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 480 });
          await this.postUserPermission(true);
          this.setState({
            isExcelCRMReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push({ sourceId: 480 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelCRMReportTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #endregion */

      /* #region  [- salesSetting -] */

      case "salesSetting":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 9 });
          await this.postUserPermission(true);
          this.setState({
            isSalesSettingChecked: e,
            isSalesSettingChildrenHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [6, 7];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          this.state.sourceList.push(
            { sourceId: 9 },
            { sourceId: 222 },
            { sourceId: 223 },
            { sourceId: 224 },
            { sourceId: 226 },
            { sourceId: 229 },
            { sourceId: 230 },
            { sourceId: 231 },
            { sourceId: 227 },
            { sourceId: 228 },
            { sourceId: 453 },
            { sourceId: 454 },
            { sourceId: 232 },
            { sourceId: 233 },
            { sourceId: 234 },
            { sourceId: 235 },
            { sourceId: 236 },
            { sourceId: 237 },
            { sourceId: 238 },
            { sourceId: 239 },
            { sourceId: 240 },
            { sourceId: 455 },
            { sourceId: 456 },
            { sourceId: 241 },
            { sourceId: 242 },
            { sourceId: 243 },
            { sourceId: 244 },
            { sourceId: 247 },
            { sourceId: 248 },
            { sourceId: 249 },
            { sourceId: 245 },
            { sourceId: 246 },
            { sourceId: 457 },
            { sourceId: 458 },
            { sourceId: 250 },
            { sourceId: 251 },
            { sourceId: 252 },
            { sourceId: 253 },
            { sourceId: 256 },
            { sourceId: 257 },
            { sourceId: 258 },
            { sourceId: 254 },
            { sourceId: 255 },
            { sourceId: 459 },
            { sourceId: 460 },
            { sourceId: 259 },
            { sourceId: 260 },
            { sourceId: 261 },
            { sourceId: 262 },
            { sourceId: 265 },
            { sourceId: 267 },
            { sourceId: 268 },
            { sourceId: 263 },
            { sourceId: 264 },
            { sourceId: 461 },
            { sourceId: 462 },
            { sourceId: 269 },
            { sourceId: 270 },
            { sourceId: 271 },
            { sourceId: 272 },
            { sourceId: 276 },
            { sourceId: 277 },
            { sourceId: 278 },
            { sourceId: 273 },
            { sourceId: 275 },
            { sourceId: 463 },
            { sourceId: 464 },
            { sourceId: 279 },
            { sourceId: 280 },
            { sourceId: 281 },
            { sourceId: 282 },
            { sourceId: 285 },
            { sourceId: 286 },
            { sourceId: 287 },
            { sourceId: 283 },
            { sourceId: 284 },
            { sourceId: 465 },
            { sourceId: 466 },
            { sourceId: 288 },
            { sourceId: 289 },
            { sourceId: 290 },
            { sourceId: 291 },
            { sourceId: 292 },
            { sourceId: 293 },
            { sourceId: 467 },
            { sourceId: 468 },
            { sourceId: 297 },
            { sourceId: 298 },
            { sourceId: 299 },
            { sourceId: 300 },
            { sourceId: 303 },
            { sourceId: 304 },
            { sourceId: 305 },
            { sourceId: 301 },
            { sourceId: 302 },
            { sourceId: 469 },
            { sourceId: 470 },
            { sourceId: 294 },
            { sourceId: 295 },
            { sourceId: 296 },

            { sourceId: 702 },
            { sourceId: 703 },
            { sourceId: 704 },
            { sourceId: 705 },
            { sourceId: 706 },
            { sourceId: 707 },
            { sourceId: 708 },
            { sourceId: 709 },
            { sourceId: 710 },
            { sourceId: 711 },
            { sourceId: 712 },

            { sourceId: 717 },
            { sourceId: 718 },
            { sourceId: 720 },
            { sourceId: 721 },
            { sourceId: 722 },
            { sourceId: 723 },
            { sourceId: 724 },
            { sourceId: 725 },
            { sourceId: 726 },
            { sourceId: 727 },
            { sourceId: 728 },

          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isSalesSettingChecked: e,
            isSalesSettingChildrenHidden: true,

            /* #region  [- accountType -] */
            isAccountTypeChecked: false,
            isAccountTypeTaskHidden: true,
            isNewAccountTypeChecked: false,
            isEditAccountTypeChecked: false,
            isDeleteAccountTypeChecked: false,
            isPrintAccountTypeChecked: false,
            isExcelAccountTypeChecked: false,

            /* #endregion */


            /* #region  [- manualActivityType -] */
            isManualActivityTypeChecked: false,
            isManualActivityTypeTaskHidden: true,
            isNewManualActivityTypeChecked: false,
            isEditManualActivityTypeChecked: false,
            isDeleteManualActivityTypeChecked: false,
            isPrintManualActivityTypeChecked: false,
            isExcelManualActivityTypeChecked: false,

            /* #endregion */


            /* #region  [- financialCaseType -] */
            isFinancialCaseTypeChecked: false,
            isFinancialCaseTypeTaskHidden: true,
            isNewFinancialCaseTypeChecked: false,
            isEditFinancialCaseTypeChecked: false,
            isDeleteFinancialCaseTypeChecked: false,
            isPrintFinancialCaseTypeChecked: false,
            isExcelFinancialCaseTypeChecked: false,

            /* #endregion */

            /* #region  [- termType -] */
            isTermTypeChecked: false,
            isTermTypeTaskHidden: true,
            isNewTermTypeChecked: false,
            isEditTermTypeChecked: false,
            isDeleteTermTypeChecked: false,
            isPrintTermTypeChecked: false,
            isExcelTermTypeChecked: false,

            /* #endregion */

            /* #region  [- paymentMethod -] */
            isPaymentMethodChecked: false,
            isPaymentMethodTaskHidden: true,
            isNewPaymentMethodChecked: false,
            isEditPaymentMethodChecked: false,
            isDeletePaymentMethodChecked: false,
            isPrintPaymentMethodChecked: false,
            isExcelPaymentMethodChecked: false,

            /* #endregion */

            /* #region  [- deliveryTerm -] */
            isDeliveryTermChecked: false,
            isDeliveryTermTaskHidden: true,
            isNewDeliveryTermChecked: false,
            isEditDeliveryTermChecked: false,
            isDeleteDeliveryTermChecked: false,
            isPrintDeliveryTermChecked: false,
            isExcelDeliveryTermChecked: false,

            /* #endregion */

            /* #region  [- sippingMethod -] */
            isShippingMethodChecked: false,
            isShippingMethodTaskHidden: true,
            isNewShippingMethodChecked: false,
            isEditShippingMethodChecked: false,
            isDeleteShippingMethodChecked: false,
            isPrintShippingMethodChecked: false,
            isExcelShippingMethodChecked: false,

            /* #endregion */

            /* #region  [- responsibleType -] */
            isResponsibleTypeChecked: false,
            isResponsibleTypeTaskHidden: true,
            isNewResponsibleTypeChecked: false,
            isEditResponsibleTypeChecked: false,
            isDeleteResponsibleTypeChecked: false,
            isPrintResponsibleTypeChecked: false,
            isExcelResponsibleTypeChecked: false,

            /* #endregion */

            /* #region  [- taskStatus -] */
            isTaskStatusChecked: false,
            isTaskStatusTaskHidden: true,
            isNewTaskStatusChecked: false,
            isEditTaskStatusChecked: false,
            isDeleteTaskStatusChecked: false,
            isPrintTaskStatusChecked: false,
            isExcelTaskStatusChecked: false,

            /* #endregion */

            /* #region  [- reportType -] */
            isReportTypeChecked: false,
            isReportTypeTaskHidden: true,
            isNewReportTypeChecked: false,
            isEditReportTypeChecked: false,
            isDeleteReportTypeChecked: false,
            isPrintReportTypeChecked: false,
            isExcelReportTypeChecked: false,
            /* #endregion */

            /* #region  [- reasonsSalesReturn -] */
            isReasonsSalesReturnChecked: false,
            isReasonsSalesReturnTaskHidden: true,
            isNewReasonsSalesReturnChecked: false,
            isEditReasonsSalesReturnChecked: false,
            isDeleteReasonsSalesReturnChecked: false,
            isPrintReasonsSalesReturnChecked: false,
            isExcelReasonsSalesReturnChecked: false,

            /* #endregion */


          });
        }
        break;

      /* #region  [- accountType -] */
      case "accountType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 222 }, { sourceId: 223 });
          await this.postUserPermission(true);
          this.setState({
            isAccountTypeChecked: e,
            isAccountTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 222 },
            { sourceId: 223 },
            { sourceId: 224 },
            { sourceId: 226 },
            { sourceId: 229 },
            { sourceId: 230 },
            { sourceId: 231 },
            { sourceId: 227 },
            { sourceId: 228 },
            { sourceId: 453 },
            { sourceId: 454 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isAccountTypeChecked: e,
            isAccountTypeTaskHidden: true,
            /* #region  [- accountType -] */
            isNewAccountTypeChecked: false,
            isEditAccountTypeChecked: false,
            isDeleteAccountTypeChecked: false,
            isPrintAccountTypeChecked: false,
            isExcelAccountTypeChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newAccountType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 224 },
            { sourceId: 226 },
            { sourceId: 229 },
            { sourceId: 230 },
            { sourceId: 231 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewAccountTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 224 },
            { sourceId: 226 },
            { sourceId: 229 },
            { sourceId: 230 },
            { sourceId: 231 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewAccountTypeChecked: e,
            isEditAccountTypeChecked: false,
          });
        }
        break;

      case "editAccountType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 224 },
            { sourceId: 226 },
            { sourceId: 229 },
            { sourceId: 230 },
            { sourceId: 231 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditAccountTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 224 },
            { sourceId: 226 },
            { sourceId: 229 },
            { sourceId: 230 },
            { sourceId: 231 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditAccountTypeChecked: e,
            isNewAccountTypeChecked: false,
          });
        }
        break;

      case "deleteAccountType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 227 }, { sourceId: 228 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteAccountTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 227 }, { sourceId: 228 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteAccountTypeChecked: e,
          });
        }
        break;

      case "printAccountType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 453 });
          await this.postUserPermission(true);
          this.setState({
            isPrintAccountTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 453 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintAccountTypeChecked: e,
          });
        }
        break;

      case "excelAccountType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 454 });
          await this.postUserPermission(true);
          this.setState({
            isExcelAccountTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 454 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelAccountTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- manualActivityType -] */
      case "manualActivityType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 717 }, { sourceId: 718 });
          await this.postUserPermission(true);
          this.setState({
            isManualActivityTypeChecked: e,
            isManualActivityTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 717 },
            { sourceId: 718 },
            { sourceId: 720 },
            { sourceId: 721 },
            { sourceId: 722 },
            { sourceId: 723 },
            { sourceId: 724 },
            { sourceId: 725 },
            { sourceId: 726 },
            { sourceId: 727 },
            { sourceId: 728 },
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isManualActivityTypeChecked: e,
            isManualActivityTypeTaskHidden: true,
            /* #region  [- accountType -] */
            isNewManualActivityTypeChecked: false,
            isEditManualActivityTypeChecked: false,
            isDeleteManualActivityTypeChecked: false,
            isPrintManualActivityTypeChecked: false,
            isExcelManualActivityTypeChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newManualActivityType":
        if (e === true) {
          this.state.sourceList.push(

            { sourceId: 720 },
            { sourceId: 721 },
            { sourceId: 722 },
            { sourceId: 723 },
            { sourceId: 724 },
          );
          await this.postUserPermission(true);
          this.setState({
            isNewManualActivityTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 720 },
            { sourceId: 721 },
            { sourceId: 722 },
            { sourceId: 723 },
            { sourceId: 724 },
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewManualActivityTypeChecked: e,
            isEditManualActivityTypeChecked: false,
          });
        }
        break;

      case "editManualActivityType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 720 },
            { sourceId: 721 },
            { sourceId: 722 },
            { sourceId: 723 },
            { sourceId: 724 },
          );
          await this.postUserPermission(true);
          this.setState({
            isEditManualActivityTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 720 },
            { sourceId: 721 },
            { sourceId: 722 },
            { sourceId: 723 },
            { sourceId: 724 },
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditManualActivityTypeChecked: e,
            isNewManualActivityTypeChecked: false,
          });
        }
        break;

      case "deleteManualActivityType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 725 }, { sourceId: 726 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteManualActivityTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 725 }, { sourceId: 726 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteManualActivityTypeChecked: e,
          });
        }
        break;

      case "printManualActivityType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 727 });
          await this.postUserPermission(true);
          this.setState({
            isPrintManualActivityTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 727 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintManualActivityTypeChecked: e,
          });
        }
        break;

      case "excelManualActivityType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 728 });
          await this.postUserPermission(true);
          this.setState({
            isExcelManualActivityTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 728 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelManualActivityTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- financialCaseType -] */
      case "financialCaseType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 232 }, { sourceId: 233 });
          await this.postUserPermission(true);
          this.setState({
            isFinancialCaseTypeChecked: e,
            isFinancialCaseTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 232 },
            { sourceId: 233 },
            { sourceId: 234 },
            { sourceId: 235 },
            { sourceId: 236 },
            { sourceId: 237 },
            { sourceId: 238 },
            { sourceId: 239 },
            { sourceId: 240 },
            { sourceId: 455 },
            { sourceId: 456 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isFinancialCaseTypeChecked: e,
            isFinancialCaseTypeTaskHidden: true,
            /* #region  [- financialCaseType -] */
            isNewFinancialCaseTypeChecked: false,
            isEditFinancialCaseTypeChecked: false,
            isDeleteFinancialCaseTypeChecked: false,
            isPrintFinancialCaseTypeChecked: false,
            isExcelFinancialCaseTypeChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newFinancialCaseType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 234 },
            { sourceId: 235 },
            { sourceId: 238 },
            { sourceId: 239 },
            { sourceId: 240 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewFinancialCaseTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 234 },
            { sourceId: 235 },
            { sourceId: 238 },
            { sourceId: 239 },
            { sourceId: 240 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewFinancialCaseTypeChecked: e,
            isEditFinancialCaseTypeChecked: false,
          });
        }
        break;

      case "editFinancialCaseType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 234 },
            { sourceId: 235 },
            { sourceId: 238 },
            { sourceId: 239 },
            { sourceId: 240 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditFinancialCaseTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 234 },
            { sourceId: 235 },
            { sourceId: 238 },
            { sourceId: 239 },
            { sourceId: 240 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditFinancialCaseTypeChecked: e,
            isNewFinancialCaseTypeChecked: false,
          });
        }
        break;

      case "deleteFinancialCaseType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 236 }, { sourceId: 237 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteFinancialCaseTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 236 }, { sourceId: 237 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteFinancialCaseTypeChecked: e,
          });
        }
        break;

      case "printFinancialCaseType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 455 });
          await this.postUserPermission(true);
          this.setState({
            isPrintFinancialCaseTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 455 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintFinancialCaseTypeChecked: e,
          });
        }
        break;

      case "excelFinancialCaseType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 456 });
          await this.postUserPermission(true);
          this.setState({
            isExcelFinancialCaseTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 456 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelFinancialCaseTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- termType -] */
      case "termType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 241 }, { sourceId: 242 });
          await this.postUserPermission(true);
          this.setState({
            isTermTypeChecked: e,
            isTermTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 241 },
            { sourceId: 242 },
            { sourceId: 243 },
            { sourceId: 244 },
            { sourceId: 247 },
            { sourceId: 248 },
            { sourceId: 249 },
            { sourceId: 245 },
            { sourceId: 246 },
            { sourceId: 457 },
            { sourceId: 458 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isTermTypeChecked: e,
            isTermTypeTaskHidden: true,
            /* #region  [- termType -] */
            isNewTermTypeChecked: false,
            isEditTermTypeChecked: false,
            isDeleteTermTypeChecked: false,
            isPrintTermTypeChecked: false,
            isExcelTermTypeChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newTermType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 243 },
            { sourceId: 244 },
            { sourceId: 247 },
            { sourceId: 248 },
            { sourceId: 249 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewTermTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 243 },
            { sourceId: 244 },
            { sourceId: 247 },
            { sourceId: 248 },
            { sourceId: 249 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewTermTypeChecked: e,
            isEditTermTypeChecked: false,
          });
        }
        break;

      case "editTermType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 243 },
            { sourceId: 244 },
            { sourceId: 247 },
            { sourceId: 248 },
            { sourceId: 249 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditTermTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 243 },
            { sourceId: 244 },
            { sourceId: 247 },
            { sourceId: 248 },
            { sourceId: 249 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditTermTypeChecked: e,
            isNewTermTypeChecked: false,
          });
        }
        break;

      case "deleteTermType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 245 }, { sourceId: 246 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteTermTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 245 }, { sourceId: 246 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteTermTypeChecked: e,
          });
        }
        break;

      case "printTermType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 457 });
          await this.postUserPermission(true);
          this.setState({
            isPrintTermTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 457 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintTermTypeChecked: e,
          });
        }
        break;

      case "excelTermType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 458 });
          await this.postUserPermission(true);
          this.setState({
            isExcelTermTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 458 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelTermTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- paymentMethod -] */
      case "paymentMethod":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 250 }, { sourceId: 251 });
          await this.postUserPermission(true);
          this.setState({
            isPaymentMethodChecked: e,
            isPaymentMethodTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 250 },
            { sourceId: 251 },
            { sourceId: 252 },
            { sourceId: 253 },
            { sourceId: 256 },
            { sourceId: 257 },
            { sourceId: 258 },
            { sourceId: 254 },
            { sourceId: 255 },
            { sourceId: 459 },
            { sourceId: 460 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPaymentMethodChecked: e,
            isPaymentMethodTaskHidden: true,
            /* #region  [- paymentMethod -] */
            isNewPaymentMethodChecked: false,
            isEditPaymentMethodChecked: false,
            isDeletePaymentMethodChecked: false,
            isPrintPaymentMethodChecked: false,
            isExcelPaymentMethodChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newPaymentMethod":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 252 },
            { sourceId: 253 },
            { sourceId: 256 },
            { sourceId: 257 },
            { sourceId: 258 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewPaymentMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 252 },
            { sourceId: 253 },
            { sourceId: 256 },
            { sourceId: 257 },
            { sourceId: 258 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewPaymentMethodChecked: e,
            isEditPaymentMethodChecked: false,
          });
        }
        break;

      case "editPaymentMethod":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 252 },
            { sourceId: 253 },
            { sourceId: 256 },
            { sourceId: 257 },
            { sourceId: 258 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditPaymentMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 252 },
            { sourceId: 253 },
            { sourceId: 256 },
            { sourceId: 257 },
            { sourceId: 258 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditPaymentMethodChecked: e,
            isNewPaymentMethodChecked: false,
          });
        }
        break;

      case "deletePaymentMethod":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 254 }, { sourceId: 255 });
          await this.postUserPermission(true);
          this.setState({
            isDeletePaymentMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 254 }, { sourceId: 255 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeletePaymentMethodChecked: e,
          });
        }
        break;

      case "printPaymentMethod":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 459 });
          await this.postUserPermission(true);
          this.setState({
            isPrintPaymentMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 459 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintPaymentMethodChecked: e,
          });
        }
        break;

      case "excelPaymentMethod":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 460 });
          await this.postUserPermission(true);
          this.setState({
            isExcelPaymentMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 460 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelPaymentMethodChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- deliveryTerm -] */
      case "deliveryTerm":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 259 }, { sourceId: 260 });
          await this.postUserPermission(true);
          this.setState({
            isDeliveryTermChecked: e,
            isDeliveryTermTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 259 },
            { sourceId: 260 },
            { sourceId: 261 },
            { sourceId: 262 },
            { sourceId: 265 },
            { sourceId: 267 },
            { sourceId: 268 },
            { sourceId: 263 },
            { sourceId: 264 },
            { sourceId: 461 },
            { sourceId: 462 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeliveryTermChecked: e,
            isDeliveryTermTaskHidden: true,
            /* #region  [- deliveryTerm -] */
            isNewDeliveryTermChecked: false,
            isEditDeliveryTermChecked: false,
            isDeleteDeliveryTermChecked: false,
            isPrintDeliveryTermChecked: false,
            isExcelDeliveryTermChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newDeliveryTerm":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 261 },
            { sourceId: 262 },
            { sourceId: 265 },
            { sourceId: 267 },
            { sourceId: 268 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewDeliveryTermChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 261 },
            { sourceId: 262 },
            { sourceId: 265 },
            { sourceId: 267 },
            { sourceId: 268 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewDeliveryTermChecked: e,
            isEditDeliveryTermChecked: false,
          });
        }
        break;

      case "editDeliveryTerm":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 261 },
            { sourceId: 262 },
            { sourceId: 265 },
            { sourceId: 267 },
            { sourceId: 268 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditDeliveryTermChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 261 },
            { sourceId: 262 },
            { sourceId: 265 },
            { sourceId: 267 },
            { sourceId: 268 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditDeliveryTermChecked: e,
            isNewDeliveryTermChecked: false,
          });
        }
        break;

      case "deleteDeliveryTerm":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 263 }, { sourceId: 264 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteDeliveryTermChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 263 }, { sourceId: 264 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteDeliveryTermChecked: e,
          });
        }
        break;

      case "printDeliveryTerm":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 461 });
          await this.postUserPermission(true);
          this.setState({
            isPrintDeliveryTermChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 461 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintDeliveryTermChecked: e,
          });
        }
        break;

      case "excelDeliveryTerm":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 462 });
          await this.postUserPermission(true);
          this.setState({
            isExcelDeliveryTermChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 462 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelDeliveryTermChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- shippingMethod -] */
      case "shippingMethod":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 269 }, { sourceId: 270 });
          await this.postUserPermission(true);
          this.setState({
            isShippingMethodChecked: e,
            isShippingMethodTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 269 },
            { sourceId: 270 },
            { sourceId: 271 },
            { sourceId: 272 },
            { sourceId: 276 },
            { sourceId: 277 },
            { sourceId: 278 },
            { sourceId: 273 },
            { sourceId: 275 },
            { sourceId: 463 },
            { sourceId: 464 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isShippingMethodChecked: e,
            isShippingMethodTaskHidden: true,
            /* #region  [- sippingMethod -] */
            isNewShippingMethodChecked: false,
            isEditShippingMethodChecked: false,
            isDeleteShippingMethodChecked: false,
            isPrintShippingMethodChecked: false,
            isExcelShippingMethodChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newShippingMethod":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 271 },
            { sourceId: 272 },
            { sourceId: 276 },
            { sourceId: 277 },
            { sourceId: 278 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewShippingMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 271 },
            { sourceId: 272 },
            { sourceId: 276 },
            { sourceId: 277 },
            { sourceId: 278 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewShippingMethodChecked: e,
            isEditShippingMethodChecked: false,
          });
        }
        break;

      case "editShippingMethod":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 271 },
            { sourceId: 272 },
            { sourceId: 276 },
            { sourceId: 277 },
            { sourceId: 278 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditShippingMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 271 },
            { sourceId: 272 },
            { sourceId: 276 },
            { sourceId: 277 },
            { sourceId: 278 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditShippingMethodChecked: e,
            isNewShippingMethodChecked: false,
          });
        }
        break;

      case "deleteShippingMethod":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 273 }, { sourceId: 275 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteShippingMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 273 }, { sourceId: 275 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteShippingMethodChecked: e,
          });
        }
        break;

      case "printShippingMethod":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 463 });
          await this.postUserPermission(true);
          this.setState({
            isPrintShippingMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 463 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintShippingMethodChecked: e,
          });
        }
        break;

      case "excelShippingMethod":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 464 });
          await this.postUserPermission(true);
          this.setState({
            isExcelShippingMethodChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 464 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelShippingMethodChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- responsibleType -] */
      case "responsibleType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 279 }, { sourceId: 280 });
          await this.postUserPermission(true);
          this.setState({
            isResponsibleTypeChecked: e,
            isResponsibleTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 279 },
            { sourceId: 280 },
            { sourceId: 281 },
            { sourceId: 282 },
            { sourceId: 285 },
            { sourceId: 286 },
            { sourceId: 287 },
            { sourceId: 283 },
            { sourceId: 284 },
            { sourceId: 465 },
            { sourceId: 466 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isResponsibleTypeChecked: e,
            isResponsibleTypeTaskHidden: true,
            /* #region  [- responsibleType -] */
            isNewResponsibleTypeChecked: false,
            isEditResponsibleTypeChecked: false,
            isDeleteResponsibleTypeChecked: false,
            isPrintResponsibleTypeChecked: false,
            isExcelResponsibleTypeChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newResponsibleType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 281 },
            { sourceId: 282 },
            { sourceId: 285 },
            { sourceId: 286 },
            { sourceId: 287 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 281 },
            { sourceId: 282 },
            { sourceId: 285 },
            { sourceId: 286 },
            { sourceId: 287 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewResponsibleTypeChecked: e,
            isEditResponsibleTypeChecked: false,
          });
        }
        break;

      case "editResponsibleType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 281 },
            { sourceId: 282 },
            { sourceId: 285 },
            { sourceId: 286 },
            { sourceId: 287 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 281 },
            { sourceId: 282 },
            { sourceId: 285 },
            { sourceId: 286 },
            { sourceId: 287 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditResponsibleTypeChecked: e,
            isNewResponsibleTypeChecked: false,
          });
        }
        break;

      case "deleteResponsibleType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 283 }, { sourceId: 284 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 283 }, { sourceId: 284 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteResponsibleTypeChecked: e,
          });
        }
        break;

      case "printResponsibleType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 465 });
          await this.postUserPermission(true);
          this.setState({
            isPrintResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 465 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintResponsibleTypeChecked: e,
          });
        }
        break;

      case "excelResponsibleType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 466 });
          await this.postUserPermission(true);
          this.setState({
            isExcelResponsibleTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 466 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelResponsibleTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- taskStatus -] */
      case "taskStatus":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 288 }, { sourceId: 289 });
          await this.postUserPermission(true);
          this.setState({
            isTaskStatusChecked: e,
            isTaskStatusTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 288 },
            { sourceId: 289 },
            { sourceId: 290 },
            { sourceId: 291 },
            { sourceId: 292 },
            { sourceId: 293 },
            { sourceId: 467 },
            { sourceId: 468 },
            { sourceId: 294 },
            { sourceId: 295 },
            { sourceId: 296 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isTaskStatusChecked: e,
            isTaskStatusTaskHidden: true,
            /* #region  [- taskStatus -] */
            isNewTaskStatusChecked: false,
            isEditTaskStatusChecked: false,
            isDeleteTaskStatusChecked: false,
            isPrintTaskStatusChecked: false,
            isExcelTaskStatusChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newTaskStatus":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 290 },
            { sourceId: 291 },
            { sourceId: 294 },
            { sourceId: 295 },
            { sourceId: 296 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 290 },
            { sourceId: 291 },
            { sourceId: 294 },
            { sourceId: 295 },
            { sourceId: 296 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewTaskStatusChecked: e,
            isEditTaskStatusChecked: false,
          });
        }
        break;

      case "editTaskStatus":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 290 },
            { sourceId: 291 },
            { sourceId: 294 },
            { sourceId: 295 },
            { sourceId: 296 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 290 },
            { sourceId: 291 },
            { sourceId: 294 },
            { sourceId: 295 },
            { sourceId: 296 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditTaskStatusChecked: e,
            isNewTaskStatusChecked: false,
          });
        }
        break;

      case "deleteTaskStatus":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 292 }, { sourceId: 293 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 292 }, { sourceId: 293 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteTaskStatusChecked: e,
          });
        }
        break;

      case "printTaskStatus":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 467 });
          await this.postUserPermission(true);
          this.setState({
            isPrintTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 467 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintTaskStatusChecked: e,
          });
        }
        break;

      case "excelTaskStatus":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 468 });
          await this.postUserPermission(true);
          this.setState({
            isExcelTaskStatusChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 468 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelTaskStatusChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- reportType -] */
      case "reportType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 297 }, { sourceId: 298 });
          await this.postUserPermission(true);
          this.setState({
            isReportTypeChecked: e,
            isReportTypeTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 297 },
            { sourceId: 298 },
            { sourceId: 299 },
            { sourceId: 300 },
            { sourceId: 303 },
            { sourceId: 304 },
            { sourceId: 305 },
            { sourceId: 301 },
            { sourceId: 302 },
            { sourceId: 469 },
            { sourceId: 470 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isReportTypeChecked: e,
            isReportTypeTaskHidden: true,
            /* #region  [- reportType -] */
            isNewReportTypeChecked: false,
            isEditReportTypeChecked: false,
            isDeleteReportTypeChecked: false,
            isPrintReportTypeChecked: false,
            isExcelReportTypeChecked: false,
            /* #endregion */
          });
        }
        break;

      case "newReportType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 299 },
            { sourceId: 300 },
            { sourceId: 303 },
            { sourceId: 304 },
            { sourceId: 305 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 299 },
            { sourceId: 300 },
            { sourceId: 303 },
            { sourceId: 304 },
            { sourceId: 305 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewReportTypeChecked: e,
            isEditReportTypeChecked: false,
          });
        }
        break;

      case "editReportType":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 299 },
            { sourceId: 300 },
            { sourceId: 303 },
            { sourceId: 304 },
            { sourceId: 305 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 299 },
            { sourceId: 300 },
            { sourceId: 303 },
            { sourceId: 304 },
            { sourceId: 305 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditReportTypeChecked: e,
            isNewReportTypeChecked: false,
          });
        }
        break;

      case "deleteReportType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 301 }, { sourceId: 302 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 301 }, { sourceId: 302 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteReportTypeChecked: e,
          });
        }
        break;

      case "printReportType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 469 });
          await this.postUserPermission(true);
          this.setState({
            isPrintReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 469 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintReportTypeChecked: e,
          });
        }
        break;

      case "excelReportType":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 470 });
          await this.postUserPermission(true);
          this.setState({
            isExcelReportTypeChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 470 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelReportTypeChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- reasonsSalesReturn -] */
      case "reasonsSalesReturn":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 702 }, { sourceId: 703 });
          await this.postUserPermission(true);
          this.setState({
            isReasonsSalesReturnChecked: e,
            isReasonsSalesReturnTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 702 },
            { sourceId: 703 },
            { sourceId: 704 },
            { sourceId: 705 },
            { sourceId: 706 },
            { sourceId: 707 },
            { sourceId: 708 },
            { sourceId: 709 },
            { sourceId: 710 },
            { sourceId: 711 },
            { sourceId: 712 },
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isReasonsSalesReturnChecked: e,
            isReasonsSalesReturnTaskHidden: true,
            /* #region  [- reasonsSalesReturn -] */
            isNewReasonsSalesReturnChecked: false,
            isEditReasonsSalesReturnChecked: false,
            isDeleteReasonsSalesReturnChecked: false,
            isPrintReasonsSalesReturnChecked: false,
            isExcelReasonsSalesReturnChecked: false,

            /* #endregion */
          });
        }
        break;

      case "newReasonsSalesReturn":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 704 },
            { sourceId: 705 },
            { sourceId: 706 },
            { sourceId: 707 },
            { sourceId: 708 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewReasonsSalesReturnChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 704 },
            { sourceId: 705 },
            { sourceId: 706 },
            { sourceId: 707 },
            { sourceId: 708 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewReasonsSalesReturnChecked: e,
            isEditReasonsSalesReturnChecked: false,
          });
        }
        break;

      case "editReasonsSalesReturn":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 704 },
            { sourceId: 705 },
            { sourceId: 706 },
            { sourceId: 707 },
            { sourceId: 708 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditReasonsSalesReturnChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 704 },
            { sourceId: 705 },
            { sourceId: 706 },
            { sourceId: 707 },
            { sourceId: 708 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditReasonsSalesReturnChecked: e,
            isNewReasonsSalesReturnChecked: false,
          });
        }
        break;

      case "deleteReasonsSalesReturn":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 709 }, { sourceId: 710 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteReasonsSalesReturnChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 709 }, { sourceId: 710 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteReasonsSalesReturnChecked: e,
          });
        }
        break;

      case "printReasonsSalesReturn":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 711 });
          await this.postUserPermission(true);
          this.setState({
            isPrintReasonsSalesReturnChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 711 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintReasonsSalesReturnChecked: e,
          });
        }
        break;

      case "excelReasonsSalesReturn":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 712 });
          await this.postUserPermission(true);
          this.setState({
            isExcelReasonsSalesReturnChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [106, 107];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 712 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelReasonsSalesReturnChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #endregion */

      /* #region  [- transportation -] */
      case "transportation":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 10 });
          await this.postUserPermission(true);
          this.setState({
            isTransportationChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [10];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 10 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isTransportationChecked: e,
          });
        }

        break;

      /* #endregion */

      /* #region  [- servicesSetting -] */
      case "servicesSetting":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 11 });
          await this.postUserPermission(true);
          this.setState({
            isServicesSettingChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [11];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 11 });

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isServicesSettingChecked: e,
          });
        }

        break;

      /* #endregion */

      /* #region  [- userManagement -] */

      case "userManagement":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 13 });
          await this.postUserPermission(true);
          this.setState({
            isUserManagementChecked: e,
            isUserManagementChildrenHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [13];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));

          for (let index = 181; index < 203; index++) {
            this.state.sourceList.push({ sourceId: index });
          }
          this.state.sourceList.push(
            { sourceId: 13 },
            { sourceId: 359 },
            { sourceId: 360 },
            { sourceId: 361 },
            { sourceId: 362 },
            { sourceId: 363 },
            { sourceId: 364 },
            { sourceId: 365 },
            { sourceId: 366 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            isUserManagementChecked: e,
            isUserManagementChildrenHidden: true,
            //role
            isRoleChecked: false,
            isRoleTaskHidden: true,
            isNewRoleChecked: false,
            isEditRoleChecked: false,
            isDeleteRoleChecked: false,
            isPrintRoleChecked: false,
            isExcelRoleChecked: false,
            //user
            isUserChecked: false,
            isUserTaskHidden: true,
            isNewUserChecked: false,
            isEditUserChecked: false,
            isDeleteUserChecked: false,
            isPrintUserChecked: false,
            isExcelUserChecked: false,
          });
        }
        break;

      /* #region  [- role -] */
      case "role":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 181 }, { sourceId: 182 });
          await this.postUserPermission(true);
          this.setState({
            isRoleChecked: e,
            isRoleTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 181 },
            { sourceId: 182 },
            { sourceId: 183 },
            { sourceId: 184 },
            { sourceId: 185 },
            { sourceId: 186 },
            { sourceId: 187 },
            { sourceId: 188 },
            { sourceId: 189 },
            { sourceId: 190 },
            { sourceId: 191 }
          );

          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isRoleChecked: e,
            isRoleTaskHidden: true,
            isNewRoleChecked: false,
            isEditRoleChecked: false,
            isDeleteRoleChecked: false,
            isPrintRoleChecked: false,
            isExcelRoleChecked: false,
          });
        }
        break;

      case "newRole":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 183 },
            { sourceId: 184 },
            { sourceId: 185 },
            { sourceId: 186 },
            { sourceId: 187 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewRoleChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [183, 184];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 183 },
            { sourceId: 184 },
            { sourceId: 185 },
            { sourceId: 186 },
            { sourceId: 187 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewRoleChecked: e,
            isEditRoleChecked: false,
          });
        }
        break;

      case "editRole":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 183 },
            { sourceId: 184 },
            { sourceId: 185 },
            { sourceId: 186 },
            { sourceId: 187 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditRoleChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [185, 186, 187];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 183 },
            { sourceId: 184 },
            { sourceId: 185 },
            { sourceId: 186 },
            { sourceId: 187 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditRoleChecked: e,
            isNewRoleChecked: false,
          });
        }
        break;

      case "deleteRole":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 188 }, { sourceId: 189 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteRoleChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [188, 189];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 188 }, { sourceId: 189 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteRoleChecked: e,
          });
        }
        break;

      case "printRole":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 190 });
          await this.postUserPermission(true);
          this.setState({
            isPrintRoleChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [190];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 190 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintRoleChecked: e,
          });
        }
        break;

      case "excelRole":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 191 });
          await this.postUserPermission(true);
          this.setState({
            isExcelRoleChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [191];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 191 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelRoleChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #region  [- user -] */
      case "user":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 192 }, { sourceId: 193 });
          await this.postUserPermission(true);
          this.setState({
            isUserChecked: e,
            isUserTaskHidden: false,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [192, 193, 194, 195, 196, 197, 199, 200, 201, 202];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 192 },
            { sourceId: 193 },
            { sourceId: 194 },
            { sourceId: 195 },
            { sourceId: 196 },
            { sourceId: 197 },
            { sourceId: 199 },
            { sourceId: 200 },
            { sourceId: 201 },
            { sourceId: 202 },
            { sourceId: 359 },
            { sourceId: 360 },
            { sourceId: 361 },
            { sourceId: 362 },
            { sourceId: 363 },
            { sourceId: 364 },
            { sourceId: 365 },
            { sourceId: 366 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isUserChecked: e,
            isUserTaskHidden: true,
            isNewUserChecked: false,
            isEditUserChecked: false,
            isDeleteUserChecked: false,
            isPrintUserChecked: false,
            isExcelUserChecked: false,
          });
        }
        break;

      case "newUser":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 194 },
            { sourceId: 195 },
            { sourceId: 196 },
            { sourceId: 197 },
            { sourceId: 359 },
            { sourceId: 360 },
            { sourceId: 361 },
            { sourceId: 362 },
            { sourceId: 363 },
            { sourceId: 364 },
            { sourceId: 365 },
            { sourceId: 366 }
          );
          await this.postUserPermission(true);
          this.setState({
            isNewUserChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [194, 195];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 194 },
            { sourceId: 195 },
            { sourceId: 196 },
            { sourceId: 197 },
            { sourceId: 359 },
            { sourceId: 360 },
            { sourceId: 361 },
            { sourceId: 362 },
            { sourceId: 363 },
            { sourceId: 364 },
            { sourceId: 365 },
            { sourceId: 366 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isNewUserChecked: e,
            isEditUserChecked: false,
          });
        }
        break;

      case "editUser":
        if (e === true) {
          this.state.sourceList.push(
            { sourceId: 194 },
            { sourceId: 195 },
            { sourceId: 196 },
            { sourceId: 197 },
            { sourceId: 359 },
            { sourceId: 360 },
            { sourceId: 361 },
            { sourceId: 362 },
            { sourceId: 363 },
            { sourceId: 364 },
            { sourceId: 365 },
            { sourceId: 366 }
          );
          await this.postUserPermission(true);
          this.setState({
            isEditUserChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [196, 197];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push(
            { sourceId: 194 },
            { sourceId: 195 },
            { sourceId: 196 },
            { sourceId: 197 },
            { sourceId: 359 },
            { sourceId: 360 },
            { sourceId: 361 },
            { sourceId: 362 },
            { sourceId: 363 },
            { sourceId: 364 },
            { sourceId: 365 },
            { sourceId: 366 }
          );
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isEditUserChecked: e,
            isNewUserChecked: false,
          });
        }
        break;

      case "deleteUser":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 199 }, { sourceId: 200 });
          await this.postUserPermission(true);
          this.setState({
            isDeleteUserChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [199, 200];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 199 }, { sourceId: 200 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isDeleteUserChecked: e,
          });
        }
        break;

      case "printUser":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 201 });
          await this.postUserPermission(true);
          this.setState({
            isPrintUserChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [201];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 201 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isPrintUserChecked: e,
          });
        }
        break;

      case "excelUser":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 202 });
          await this.postUserPermission(true);
          this.setState({
            isExcelUserChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [202];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 202 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isExcelUserChecked: e,
          });
        }
        break;

      /* #endregion */

      /* #endregion */

      /* #region  [- ticketSetting -] */
      case "ticketSetting":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 14 });
          await this.postUserPermission(true);
          this.setState({
            isTicketSettingChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [14];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 14 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isTicketSettingChecked: e,
          });
        }

        break;

      /* #endregion */

      /* #region  [- bpms -] */
      case "bpms":
        if (e === true) {
          this.state.sourceList.push({ sourceId: 15 });
          await this.postUserPermission(true);
          this.setState({
            isBPMSChecked: e,
          });
        } else {
          // const items = [...this.state.sourceList]
          // const removedItem = [15];
          // const filteredItems = items.filter(item => !removedItem.includes(item.sourceId));
          this.state.sourceList.push({ sourceId: 15 });
          await this.postUserPermission(false);
          this.setState({
            //sourceList: filteredItems,
            //
            isBPMSChecked: e,
          });
        }

        break;

      /* #endregion */

      /* #endregion */

      default:
        break;
    }

    this.setState({
      sourceList: [],
    });
  };
  /* #endregion */

  /* #endregion */

  /* #region  [*** api  ***] */

  /* #region  [- getUserPermission -] */
  getUserPermission = async () => {
    let data = {
      userRef: this.props.userId,
    };

    await this.props.getUserPermission(JSON.stringify(data));
  };
  /* #endregion */

  /* #region  [- postUserPermission -] */
  postUserPermission = async (statusFlag) => {
    let data = {
      userRef: this.props.userId,
      sourceList: this.state.sourceList,
      statusFlag: statusFlag,
    };
 
    await this.props.postUserPermission(JSON.stringify(data));
  };
  /* #endregion */

  /* #endregion */

  /* #region  [- render() -] */
  render() {
    return (
      <div style={{ marginBottom: "30%" }}>
        <div name="managementCartable" className="item-container">
          میز مدیریت
          <Switch
            checked={this.state.isManagementCartableChecked}
            disabled={this.state.isManagementCartableDisabled}
            onChange={(e) => {
              this.handleChange(e, "managementCartable");
            }}
            className="switch"
          />
        </div>

        <div name="sales" className="item-container">
          فروش
          <Switch
            checked={this.state.isSalesChecked}
            disabled={this.state.isSalesDisabled}
            onChange={(e) => {
              this.handleChange(e, "sales");
            }}
            className="switch"
          />
          <div
            name="salesChildren"
            hidden={this.state.isSalesChildrenHidden}
            style={{ borderRight: "1px dashed gray" }}
          >
            <div
              name="salesManagement"
              className="item-container"
              style={{ width: "100%" }}
            >
              مدیریت فروش
              <Switch
                checked={this.state.isSalesManagementChecked}
                disabled={this.state.isSalesManagementDisabled}
                onChange={(e) => {
                  this.handleChange(e, "salesManagement");
                }}
                className="switch"
              />
            </div>

            <div
              name="salesManagementCartable"
              className="item-container"
              style={{ width: "100%" }}
            >
              میز کار
              <Switch
                checked={this.state.isSalesManagementCartableChecked}
                disabled={this.state.isSalesManagementCartableDisabled}
                onChange={(e) => {
                  this.handleChange(e, "salesManagementCartable");
                }}
                className="switch"
              />
            </div>

            <div
              name="inventory"
              className="item-container"
              style={{ width: "100%" }}
            >
              موجودی کالا
              <Switch
                checked={this.state.isInventoryChecked}
                disabled={this.state.isInventoryDisabled}
                onChange={(e) => {
                  this.handleChange(e, "inventory");
                }}
                className="switch"
              />
              <div
                name="inventoryTask"
                hidden={this.state.isInventoryTaskHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                {/* <div
                  name="newInventory"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  ثبت موجودی
                  <Switch
                    checked={this.state.isNewInventoryChecked}
                    disabled={this.state.isNewInventoryDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "newInventory");
                    }}
                    className="switch"
                  />
                </div> */}

                <div
                  name="editInventory"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  ویرایش
                  <Switch
                    checked={this.state.isEditInventoryChecked}
                    disabled={this.state.isEditInventoryDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "editInventory");
                    }}
                    className="switch"
                  />
                </div>
             

                {/* <div
                  name="printInventory"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  چاپ
                  <Switch
                    checked={this.state.isPrintInventoryChecked}
                    disabled={this.state.isPrintInventoryDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "printInventory");
                    }}
                    className="switch"
                  />
                </div>
               */}
              </div>
            </div>

            <div
              name="priceList"
              className="item-container"
              style={{ width: "100%" }}
            >
              لیست قیمت
              <Switch
                checked={this.state.isPriceListChecked}
                disabled={this.state.isPriceListDisabled}
                onChange={(e) => {
                  this.handleChange(e, "priceList");
                }}
                className="switch"
              />
              <div
                name="priceListTask"
                hidden={this.state.isPriceListTaskHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  name="priceListOparation"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  عملیات
                  <Switch
                    checked={this.state.isPriceListOperationChecked}
                    disabled={this.state.isPriceListOperationDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "priceListOparation");
                    }}
                    className="switch"
                  />
                  <div
                    name="priceListOperationTask"
                    hidden={this.state.isPriceListOperationTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      name="newPriceList"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewPriceListChecked}
                        disabled={this.state.isNewPriceListDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newPriceList");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="editPriceList"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditPriceListChecked}
                        disabled={this.state.isEditPriceListDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editPriceList");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="deletePriceList"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeletePriceListChecked}
                        disabled={this.state.isDeletePriceListDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deletePriceList");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={true}
                      name="archivePriceList"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      آرشیو
                      <Switch
                        checked={this.state.isArchivePriceListChecked}
                        disabled={this.state.isArchivePriceListDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "archivePriceList");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  hidden={true}
                  name="priceListDraft"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  پیش نویس
                  <Switch
                    checked={this.state.isPriceListDraftChecked}
                    onChange={(e) => {
                      this.handleChange(e, "priceListDraft");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="priceListResponsibility"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  وظایف
                  <Switch
                    checked={this.state.isPriceListResponsibilityChecked}
                    onChange={(e) => {
                      this.handleChange(e, "priceListResponsibility");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="priceListTimeline"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  سوابق
                  <Switch
                    checked={this.state.isPriceListTimelineChecked}
                    onChange={(e) => {
                      this.handleChange(e, "priceListTimeline");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="priceListArchive"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  آرشیو
                  <Switch
                    checked={this.state.isPriceListArchiveChecked}
                    onChange={(e) => {
                      this.handleChange(e, "priceListArchive");
                    }}
                    className="switch"
                  />
                </div>
              </div>
            </div>

            <div
              name="quote"
              className="item-container"
              style={{ width: "100%" }}
            >
              پیش فاکتور
              <Switch
                checked={this.state.isQuoteChecked}
                disabled={this.state.isQuoteDisabled}
                onChange={(e) => {
                  this.handleChange(e, "quote");
                }}
                className="switch"
              />
              <div
                name="quoteTask"
                hidden={this.state.isQuoteTaskHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  name="quoteOparation"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  عملیات
                  <Switch
                    checked={this.state.isQuoteOperationChecked}
                    disabled={this.state.isQuoteOperationDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "quoteOparation");
                    }}
                    className="switch"
                  />
                  <div
                    name="quoteOperationTask"
                    hidden={this.state.isQuoteOperationTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      name="newQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewQuoteChecked}
                        disabled={this.state.isNewQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="editQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditQuoteChecked}
                        disabled={this.state.isEditQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="deleteQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteQuoteChecked}
                        disabled={this.state.isDeleteQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="mergeQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ادغام
                      <Switch
                        checked={this.state.isMergeQuoteChecked}
                        disabled={this.state.isMergeQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "mergeQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="splitQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تفکیک
                      <Switch
                        checked={this.state.isSplitQuoteChecked}
                        disabled={this.state.isSplitQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "splitQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="convertQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تبدیل
                      <Switch
                        checked={this.state.isConvertQuoteChecked}
                        disabled={this.state.isConvertQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "convertQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={true}
                      name="archiveQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      آرشیو
                      <Switch
                        checked={this.state.isArchiveQuoteChecked}
                        disabled={this.state.isArchiveQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "archiveQuote");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  hidden={true}
                  name="quoteDraft"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  پیش نویس
                  <Switch
                    checked={this.state.isQuoteDraftChecked}
                    disabled={this.state.isQuoteDraftDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "quoteDraft");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="quoteResponsibility"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  وظایف
                  <Switch
                    checked={this.state.isQuoteResponsibilityChecked}
                    disabled={this.state.isQuoteResponsibilityDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "quoteResponsibility");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  name="quoteTimeline"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  پیشینه
                  <Switch
                    checked={this.state.isQuoteTimelineChecked}
                    disabled={this.state.isQuoteTimelineDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "quoteTimeline");
                    }}
                    className="switch"
                  />
                  <div
                    name="quoteTimeline"
                    className="item-container"
                    style={{ width: "100%" }}
                  >
                    <div
                      name="quoteTimelineTask"
                      hidden={this.state.isQuoteTimelineTaskHidden}
                      style={{ borderRight: "1px dashed gray" }}
                    >
                      <div
                        name="newQuoteTimeline"
                        className="item-container"
                        style={{ width: "100%" }}
                      >
                        جدید
                        <Switch
                          checked={this.state.isNewQuoteTimelineChecked}
                          disabled={this.state.isNewQuoteTimelineDisabled}
                          onChange={(e) => {
                            this.handleChange(e, "newQuoteTimeline");
                          }}
                          className="switch"
                        />
                      </div>

                      <div
                        name="deleteQuote"
                        className="item-container"
                        style={{ width: "100%" }}
                      >
                        حذف
                        <Switch
                          checked={this.state.isDeleteQuoteTimelineChecked}
                          disabled={this.state.isDeleteQuoteTimelineDisabled}
                          onChange={(e) => {
                            this.handleChange(e, "deleteQuoteTimeline");
                          }}
                          className="switch"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  hidden={true}
                  name="quoteArchive"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  آرشیو
                  <Switch
                    checked={this.state.isQuoteArchiveChecked}
                    disabled={this.state.isQuoteArchiveDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "quoteArchive");
                    }}
                    className="switch"
                  />
                </div>
              </div>
            </div>

            <div
              name="order"
              className="item-container"
              style={{ width: "100%" }}
            >
              سفارش
              <Switch
                checked={this.state.isOrderChecked}
                disabled={this.state.isOrderDisabled}
                onChange={(e) => {
                  this.handleChange(e, "order");
                }}
                className="switch"
              />
              <div
                name="orderTask"
                hidden={this.state.isOrderTaskHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  name="orderOparation"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  عملیات
                  <Switch
                    checked={this.state.isOrderOperationChecked}
                    disabled={this.state.isOrderOperationDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "orderOparation");
                    }}
                    className="switch"
                  />
                  <div
                    name="orderOperationTask"
                    hidden={this.state.isOrderOperationTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      name="newOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewOrderChecked}
                        disabled={this.state.isNewOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="editOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditOrderChecked}
                        disabled={this.state.isEditOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="deleteOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteOrderChecked}
                        disabled={this.state.isDeleteOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="mergeOrderToOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ادغام به سفارش
                      <Switch
                        checked={this.state.isMergeOrderToOrderChecked}
                        disabled={this.state.isMergeOrderToOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "mergeOrderToOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="splitOrderToOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تفکیک به سفارش
                      <Switch
                        checked={this.state.isSplitOrderToOrderChecked}
                        disabled={this.state.isSplitOrderToOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "splitOrderToOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="correspondingOrderToOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ایجاد سند متناظر
                      <Switch
                        checked={this.state.isCorrespondingOrderToOrderChecked}
                        disabled={
                          this.state.isCorrespondingOrderToOrderDisabled
                        }
                        onChange={(e) => {
                          this.handleChange(e, "correspondingOrderToOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="mergeOrderToInvoice"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ادغام به فاکتور
                      <Switch
                        checked={this.state.isMergeOrderToInvoiceChecked}
                        disabled={this.state.isMergeOrderToInvoiceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "mergeOrderToInvoice");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="splitOrderToInvoice"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تفکیک به فاکتور
                      <Switch
                        checked={this.state.isSplitOrderToInvoiceChecked}
                        disabled={this.state.isSplitOrderToInvoiceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "splitOrderToInvoice");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="convertOrderToInvoice"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تبدیل به فاکتور
                      <Switch
                        checked={this.state.isConvertOrderToInvoiceChecked}
                        disabled={this.state.isConvertOrderToInvoiceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "convertOrderToInvoice");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="mergeOrderToQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ادغام به پیش فاکتور
                      <Switch
                        checked={this.state.isMergeOrderToQuoteChecked}
                        disabled={this.state.isMergeOrderToQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "mergeOrderToQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="splitOrderToQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تفکیک به پیش فاکتور
                      <Switch
                        checked={this.state.isSplitOrderToQuoteChecked}
                        disabled={this.state.isSplitOrderToQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "splitOrderToQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="convertOrderToQuote"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تبدیل به پیش فاکتور
                      <Switch
                        checked={this.state.isConvertOrderToQuoteChecked}
                        disabled={this.state.isConvertOrderToQuoteDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "convertOrderToQuote");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={true}
                      name="archiveOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      آرشیو
                      <Switch
                        checked={this.state.isArchiveOrderChecked}
                        disabled={this.state.isArchiveOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "archiveOrder");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  hidden={true}
                  name="orderDraft"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  پیش نویس
                  <Switch
                    checked={this.state.isOrderDraftChecked}
                    disabled={this.state.isOrderDraftDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "orderDraft");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="orderResponsibility"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  وظایف
                  <Switch
                    checked={this.state.isOrderResponsibilityChecked}
                    disabled={this.state.isOrderResponsibilityDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "orderResponsibility");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  name="orderTimeline"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  پیشینه
                  <Switch
                    checked={this.state.isOrderTimelineChecked}
                    disabled={this.state.isOrderTimelineDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "orderTimeline");
                    }}
                    className="switch"
                  />
                  <div
                    name="orderTimeline"
                    className="item-container"
                    style={{ width: "100%" }}
                  >
                    <div
                      name="orderTimelineTask"
                      hidden={this.state.isOrderTimelineTaskHidden}
                      style={{ borderRight: "1px dashed gray" }}
                    >
                      <div
                        name="newOrderTimeline"
                        className="item-container"
                        style={{ width: "100%" }}
                      >
                        جدید
                        <Switch
                          checked={this.state.isNewOrderTimelineChecked}
                          disabled={this.state.isNewOrderTimelineDisabled}
                          onChange={(e) => {
                            this.handleChange(e, "newOrderTimeline");
                          }}
                          className="switch"
                        />
                      </div>

                      <div
                        name="deleteOrder"
                        className="item-container"
                        style={{ width: "100%" }}
                      >
                        حذف
                        <Switch
                          checked={this.state.isDeleteOrderTimelineChecked}
                          disabled={this.state.isDeleteOrderTimelineDisabled}
                          onChange={(e) => {
                            this.handleChange(e, "deleteOrderTimeline");
                          }}
                          className="switch"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  hidden={true}
                  name="orderArchive"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  آرشیو
                  <Switch
                    checked={this.state.isOrderArchiveChecked}
                    disabled={this.state.isOrderArchiveDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "orderArchive");
                    }}
                    className="switch"
                  />
                </div>
              </div>
            </div>

            <div
              name="invoice"
              className="item-container"
              style={{ width: "100%" }}
            >
              فاکتور
              <Switch
                checked={this.state.isInvoiceChecked}
                disabled={this.state.isInvoiceDisabled}
                onChange={(e) => {
                  this.handleChange(e, "invoice");
                }}
                className="switch"
              />
              <div
                name="invoiceTask"
                hidden={this.state.isInvoiceTaskHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  name="invoiceOparation"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  عملیات
                  <Switch
                    checked={this.state.isInvoiceOperationChecked}
                    disabled={this.state.isInvoiceOperationDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "invoiceOparation");
                    }}
                    className="switch"
                  />
                  <div
                    name="invoiceOperationTask"
                    hidden={this.state.isInvoiceOperationTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      name="newInvoice"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewInvoiceChecked}
                        disabled={this.state.isNewInvoiceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newInvoice");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="editInvoice"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditInvoiceChecked}
                        disabled={this.state.isEditInvoiceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editInvoice");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="deleteInvoice"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteInvoiceChecked}
                        disabled={this.state.isDeleteInvoiceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteInvoice");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="correspondingInvoiceToInvoice"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      سند متناظر
                      <Switch
                        checked={
                          this.state.isCorrespondingInvoiceToInvoiceChecked
                        }
                        disabled={
                          this.state.isCorrespondingInvoiceToInvoiceDisabled
                        }
                        onChange={(e) => {
                          this.handleChange(e, "correspondingInvoiceToInvoice");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="invoiceRequisition"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      حواله خروج
                      <Switch
                        checked={this.state.isInvoiceRequisitionChecked}
                        disabled={this.state.isInvoiceRequisitionDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "invoiceRequisition");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="mergeInvoiceToOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ادغام به سفارش
                      <Switch
                        checked={this.state.isMergeInvoiceToOrderChecked}
                        disabled={this.state.isMergeInvoiceToOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "mergeInvoiceToOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="splitInvoiceToOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تفکیک به سفارش
                      <Switch
                        checked={this.state.isSplitInvoiceToOrderChecked}
                        disabled={this.state.isSplitInvoiceToOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "splitInvoiceToOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="convertInvoiceToOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تبدیل به سفارش
                      <Switch
                        checked={this.state.isConvertInvoiceToOrderChecked}
                        disabled={this.state.isConvertInvoiceToOrderDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "convertInvoiceToOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="correspondingInvoiceToOrder"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      سند متناظر به سفارش
                      <Switch
                        checked={
                          this.state.isCorrespondingInvoiceToOrderChecked
                        }
                        disabled={
                          this.state.isCorrespondingInvoiceToOrderDisabled
                        }
                        onChange={(e) => {
                          this.handleChange(e, "correspondingInvoiceToOrder");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={true}
                      name="archiveInvoice"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      آرشیو
                      <Switch
                        checked={this.state.isArchiveInvoiceChecked}
                        disabled={this.state.isArchiveInvoiceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "archiveInvoice");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  hidden={true}
                  name="invoiceDraft"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  پیش نویس
                  <Switch
                    checked={this.state.isInvoiceDraftChecked}
                    disabled={this.state.isInvoiceDraftDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "invoiceDraft");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="invoiceResponsibility"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  وظایف
                  <Switch
                    checked={this.state.isInvoiceResponsibilityChecked}
                    disabled={this.state.isInvoiceResponsibilityDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "invoiceResponsibility");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  name="invoiceTimeline"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  پیشینه
                  <Switch
                    checked={this.state.isInvoiceTimelineChecked}
                    disabled={this.state.isInvoiceTimelineDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "invoiceTimeline");
                    }}
                    className="switch"
                  />
                  <div
                    name="invoiceTimeline"
                    className="item-container"
                    style={{ width: "100%" }}
                  >
                    <div
                      name="invoiceTimelineTask"
                      hidden={this.state.isInvoiceTimelineTaskHidden}
                      style={{ borderRight: "1px dashed gray" }}
                    >
                      <div
                        name="newInvoiceTimeline"
                        className="item-container"
                        style={{ width: "100%" }}
                      >
                        جدید
                        <Switch
                          checked={this.state.isNewInvoiceTimelineChecked}
                          disabled={this.state.isNewInvoiceTimelineDisabled}
                          onChange={(e) => {
                            this.handleChange(e, "newInvoiceTimeline");
                          }}
                          className="switch"
                        />
                      </div>

                      <div
                        name="deleteInvoice"
                        className="item-container"
                        style={{ width: "100%" }}
                      >
                        حذف
                        <Switch
                          checked={this.state.isDeleteInvoiceTimelineChecked}
                          disabled={this.state.isDeleteInvoiceTimelineDisabled}
                          onChange={(e) => {
                            this.handleChange(e, "deleteInvoiceTimeline");
                          }}
                          className="switch"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  name="requisition"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  حواله خروج
                  <Switch
                    checked={this.state.isRequisitionChecked}
                    disabled={this.state.isRequisitionDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "requisition");
                    }}
                    className="switch"
                  />
                  <div
                    name="requisitionTask"
                    hidden={this.state.isRequisitionTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      name="newRequisition"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewRequisitionChecked}
                        disabled={this.state.isNewRequisitionDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newRequisition");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={true}
                      name="editRequisition"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditRequisitionChecked}
                        disabled={this.state.isEditRequisitionDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editRequisition");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="deleteRequisition"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteRequisitionChecked}
                        disabled={this.state.isDeleteRequisitionDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteRequisition");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={true}
                      name="archiveRequisition"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      آرشیو
                      <Switch
                        checked={this.state.isArchiveRequisitionChecked}
                        disabled={this.state.isArchiveRequisitionDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "archiveRequisition");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  hidden={true}
                  name="invoiceArchive"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  آرشیو
                  <Switch
                    checked={this.state.isInvoiceArchiveChecked}
                    disabled={this.state.isInvoiceArchiveDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "invoiceArchive");
                    }}
                    className="switch"
                  />
                </div>

                <div name="salesReturn" className="item-container" style={{ width: "100%" }}>
                  برگشت از فروش
                  <Switch
                    checked={this.state.isSalesReturnChecked}
                    disabled={this.state.isSalesReturnDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "salesReturn");
                    }}
                    className="switch"
                  />
                  <div
                    name="salesReturnTask"
                    hidden={this.state.isSalesReturnTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      name="newSalesReturn"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewSalesReturnChecked}
                        disabled={this.state.isNewSalesReturnDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newSalesReturn");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={this.state.isSalesReturnTaskHidden}
                      name="editSalesReturn"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditSalesReturnChecked}
                        disabled={this.state.isEditSalesReturnDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editSalesReturn");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="deleteSalesReturn"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteSalesReturnChecked}
                        disabled={this.state.isDeleteSalesReturnDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteSalesReturn");
                        }}
                        className="switch"
                      />
                    </div>


                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div name="crm" className="item-container">
          CRM
          <Switch
            checked={this.state.isCRMChecked}
            disabled={this.state.isCRMDisabled}
            onChange={(e) => {
              this.handleChange(e, "crm");
            }}
            className="switch"
          />
          <div
            name="crmChildren"
            hidden={this.state.isCRMChildrenHidden}
            style={{ borderRight: "1px dashed gray" }}
          >
            <div
              name="accountManagement"
              className="item-container"
              style={{ width: "100%" }}
            >
              مدیریت طرف حساب
              <Switch
                checked={this.state.isAccountManagementChecked}
                disabled={this.state.isAccountManagementDisabled}
                onChange={(e) => {
                  this.handleChange(e, "accountManagement");
                }}
                className="switch"
              />
            </div>

            <div
              name="crmCrtable"
              className="item-container"
              style={{ width: "100%" }}
            >
              میزکار
              <Switch
                checked={this.state.isCRMCartableChecked}
                disabled={this.state.isCRMCartableDisabled}
                onChange={(e) => {
                  this.handleChange(e, "crmCrtable");
                }}
                className="switch"
              />
              <div
                name="crmCrtableTask"
                hidden={this.state.isCRMCrtableTaskHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  name="crmCartableOparation"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  عملیات
                  <Switch
                    checked={this.state.isCRMCartableOperationChecked}
                    disabled={this.state.isCRMCartableOperationDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "crmCartableOparation");
                    }}
                    className="switch"
                  />
                  <div
                    name="crmCrtableOperationTask"
                    hidden={this.state.isCRMCrtableOperationTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      name="newAccount"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      طرف حساب جدید
                      <Switch
                        checked={this.state.isNewAccountChecked}
                        disabled={this.state.isNewAccountDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newAccount");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="editAccount"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      ویرایش طرف حساب
                      <Switch
                        checked={this.state.isEditAccountChecked}
                        disabled={this.state.isEditAccountDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editAccount");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="deleteAccount"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      حذف طرف حساب
                      <Switch
                        checked={this.state.isDeleteAccountChecked}
                        disabled={this.state.isDeleteAccountDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteAccount");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={true}
                      name="accountResponsibility"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      انتخاب مسئول
                      <Switch
                        checked={this.state.isAccountResponsibilityChecked}
                        disabled={this.state.isAccountResponsibilityDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "accountResponsibility");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      name="accountChangeLevel"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      تغییر سطح
                      <Switch
                        checked={this.state.isAccountChangeLevelChecked}
                        disabled={this.state.isAccountChangeLevelDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "accountChangeLevel");
                        }}
                        className="switch"
                      />
                    </div>

                    <div
                      hidden={true}
                      name="archiveAccount"
                      className="item-container"
                      style={{ width: "100%" }}
                    >
                      آرشیو
                      <Switch
                        checked={this.state.isArchiveAccountChecked}
                        disabled={this.state.isArchiveAccountDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "archiveAccount");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  hidden={true}
                  name="crmCartableDraft"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  پیش نویس
                  <Switch
                    checked={this.state.isCRMCartableDraftChecked}
                    disabled={this.state.isCRMCartableDraftDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "crmCartableDraft");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="crmCartableResponsibility"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  وظایف
                  <Switch
                    checked={this.state.isCRMCartableResponsibilityChecked}
                    disabled={this.state.isCRMCartableResponsibilityDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "crmCartableResponsibility");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="crmCartableTimeline"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  سوابق
                  <Switch
                    checked={this.state.isCRMCartableTimelineChecked}
                    disabled={this.state.isCRMCartableTimelineDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "crmCartableTimeline");
                    }}
                    className="switch"
                  />
                </div>

                <div
                  hidden={true}
                  name="crmCartableArchive"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  آرشیو
                  <Switch
                    checked={this.state.isCRMCartableArchiveChecked}
                    disabled={this.state.isCRMCartableArchiveDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "crmCartableArchive");
                    }}
                    className="switch"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div name="management" className="item-container">
          مدیریت
          <Switch
            checked={this.state.isManagementChecked}
            disabled={this.state.isManagementDisabled}
            onChange={(e) => {
              this.handleChange(e, "management");
            }}
            className="switch"
          />
        </div>

        <div name="ticket" className="item-container">
          تیکت
          <Switch
            checked={this.state.isTicketChecked}
            disabled={this.state.isTicketDisabled}
            onChange={(e) => {
              this.handleChange(e, "ticket");
            }}
            className="switch"
          />
        </div>

        <div name="setting" className="item-container">
          تنظیمات
          <Switch
            checked={this.state.isSettingChecked}
            disabled={this.state.isSettingDisabled}
            onChange={(e) => {
              this.handleChange(e, "setting");
            }}
            className="switch"
          />
          <div
            title="settingChildren"
            hidden={this.state.isSettingChildrenHidden}
            style={{ borderRight: "1px dashed gray" }}
          >
            <div
              title="person"
              className="item-container"
              style={{ width: "100%" }}
            >
              اشخاص
              <Switch
                checked={this.state.isPersonChecked}
                disabled={this.state.isPersonDisabled}
                onChange={(e) => {
                  this.handleChange(e, "person");
                }}
                className="switch"
              />
              <div
                title="personChildren"
                hidden={this.state.isPersonChildrenHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  title="realPerson"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  شخص حقیقی
                  <Switch
                    checked={this.state.isRealPersonChecked}
                    disabled={this.state.isRealPersonDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "realPerson");
                    }}
                    className="switch"
                  />
                  <div
                    title="realPersonTask"
                    hidden={this.state.isRealPersonTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newRealPerson" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewRealPersonChecked}
                        disabled={this.state.isNewRealPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newRealPerson");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editRealPerson" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditRealPersonChecked}
                        disabled={this.state.isEditRealPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editRealPerson");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteRealPerson" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteRealPersonChecked}
                        disabled={this.state.isDeleteRealPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteRealPerson");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printRealPerson" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintRealPersonChecked}
                        disabled={this.state.isPrintRealPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printRealPerson");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelRealPerson" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelRealPersonChecked}
                        disabled={this.state.isExcelRealPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelRealPerson");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
                <div
                  title="legalPerson"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  شخص حقوقی
                  <Switch
                    checked={this.state.isLegalPersonChecked}
                    disabled={this.state.isLegalPersonDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "legalPerson");
                    }}
                    className="switch"
                  />
                  <div
                    title="legalPersonTask"
                    hidden={this.state.isLegalPersonTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newLegalPerson" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewLegalPersonChecked}
                        disabled={this.state.isNewLegalPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newLegalPerson");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editLegalPerson" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditLegalPersonChecked}
                        disabled={this.state.isEditLegalPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editLegalPerson");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteLegalPerson" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteLegalPersonChecked}
                        disabled={this.state.isDeleteLegalPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteLegalPerson");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printLegalPerson" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintLegalPersonChecked}
                        disabled={this.state.isPrintLegalPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printLegalPerson");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelLegalPerson" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelLegalPersonChecked}
                        disabled={this.state.isExcelLegalPersonDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelLegalPerson");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
                <div
                  title="industry"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  صنعت ها
                  <Switch
                    checked={this.state.isIndustryChecked}
                    disabled={this.state.isIndustryDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "industry");
                    }}
                    className="switch"
                  />
                  <div
                    title="industryTask"
                    hidden={this.state.isIndustryTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newIndustry" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewIndustryChecked}
                        disabled={this.state.isNewIndustryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newIndustry");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editIndustry" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditIndustryChecked}
                        disabled={this.state.isEditIndustryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editIndustry");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteIndustry" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteIndustryChecked}
                        disabled={this.state.isDeleteIndustryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteIndustry");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printIndustry" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintIndustryChecked}
                        disabled={this.state.isPrintIndustryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printIndustry");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelIndustry" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelIndustryChecked}
                        disabled={this.state.isExcelIndustryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelIndustry");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
                <div
                  title="organizationType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع شخص حقوقی
                  <Switch
                    checked={this.state.isOrganizationTypeChecked}
                    disabled={this.state.isOrganizationTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "organizationType");
                    }}
                    className="switch"
                  />
                  <div
                    title="organizationTypeTask"
                    hidden={this.state.isOrganizationTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newOrganizationType" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewOrganizationTypeChecked}
                        disabled={this.state.isNewOrganizationTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newOrganizationType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="editOrganizationType"
                      className="item-container"
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditOrganizationTypeChecked}
                        disabled={this.state.isEditOrganizationTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editOrganizationType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="deleteOrganizationType"
                      className="item-container"
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteOrganizationTypeChecked}
                        disabled={this.state.isDeleteOrganizationTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteOrganizationType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="printOrganizationType"
                      className="item-container"
                    >
                      چاپ
                      <Switch
                        checked={this.state.isPrintOrganizationTypeChecked}
                        disabled={this.state.isPrintOrganizationTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printOrganizationType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="excelOrganizationType"
                      className="item-container"
                    >
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelOrganizationTypeChecked}
                        disabled={this.state.isExcelOrganizationTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelOrganizationType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
                <div
                  title="categoryType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع واحد سازمانی
                  <Switch
                    checked={this.state.isCategoryTypeChecked}
                    disabled={this.state.isCategoryTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "categoryType");
                    }}
                    className="switch"
                  />
                  <div
                    title="categoryTypeTask"
                    hidden={this.state.isCategoryTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newCategoryType" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewCategoryTypeChecked}
                        disabled={this.state.isNewCategoryTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newCategoryType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editCategoryType" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditCategoryTypeChecked}
                        disabled={this.state.isEditCategoryTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editCategoryType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteCategoryType" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteCategoryTypeChecked}
                        disabled={this.state.isDeleteCategoryTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteCategoryType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printCategoryType" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintCategoryTypeChecked}
                        disabled={this.state.isPrintCategoryTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printCategoryType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelCategoryType" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelCategoryTypeChecked}
                        disabled={this.state.isExcelCategoryTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelCategoryType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
                <div
                  title="educationLevel"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  سطوح تحصیلات
                  <Switch
                    checked={this.state.isEducationLevelChecked}
                    disabled={this.state.isEducationLevelDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "educationLevel");
                    }}
                    className="switch"
                  />
                  <div
                    title="educationLevelTask"
                    hidden={this.state.isEducationLevelTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newEducationLevel" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewEducationLevelChecked}
                        disabled={this.state.isNewEducationLevelDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newEducationLevel");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editEducationLevel" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditEducationLevelChecked}
                        disabled={this.state.isEditEducationLevelDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editEducationLevel");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="deleteEducationLevel"
                      className="item-container"
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteEducationLevelChecked}
                        disabled={this.state.isDeleteEducationLevelDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteEducationLevel");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printEducationLevel" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintEducationLevelChecked}
                        disabled={this.state.isPrintEducationLevelDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printEducationLevel");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelEducationLevel" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelEducationLevelChecked}
                        disabled={this.state.isExcelEducationLevelDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelEducationLevel");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
                <div
                  title="representativeType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع نمایندگان
                  <Switch
                    checked={this.state.isRepresentativeTypeChecked}
                    disabled={this.state.isRepresentativeTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "representativeType");
                    }}
                    className="switch"
                  />
                  <div
                    title="representativeTypeTask"
                    hidden={this.state.isRepresentativeTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      title="newRepresentativeType"
                      className="item-container"
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewRepresentativeTypeChecked}
                        disabled={this.state.isNewRepresentativeTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newRepresentativeType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="editRepresentativeType"
                      className="item-container"
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditRepresentativeTypeChecked}
                        disabled={this.state.isEditRepresentativeTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editRepresentativeType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="deleteRepresentativeType"
                      className="item-container"
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteRepresentativeTypeChecked}
                        disabled={this.state.isDeleteRepresentativeTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteRepresentativeType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="printRepresentativeType"
                      className="item-container"
                    >
                      چاپ
                      <Switch
                        checked={this.state.isPrintRepresentativeTypeChecked}
                        disabled={this.state.isPrintRepresentativeTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printRepresentativeType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="excelRepresentativeType"
                      className="item-container"
                    >
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelRepresentativeTypeChecked}
                        disabled={this.state.isExcelRepresentativeTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelRepresentativeType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
                <div
                  title="template"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  نمونه ها
                  <Switch
                    checked={this.state.isTemplateChecked}
                    disabled={this.state.isTemplateDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "template");
                    }}
                    className="switch"
                  />
                  <div
                    title="templateTask"
                    hidden={this.state.isTemplateTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newTemplate" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewTemplateChecked}
                        disabled={this.state.isNewTemplateDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newTemplate");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editTemplate" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditTemplateChecked}
                        disabled={this.state.isEditTemplateDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editTemplate");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteTemplate" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteTemplateChecked}
                        disabled={this.state.isDeleteTemplateDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteTemplate");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printTemplate" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintTemplateChecked}
                        disabled={this.state.isPrintTemplateDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printTemplate");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelTemplate" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelTemplateChecked}
                        disabled={this.state.isExcelTemplateDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelTemplate");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              title="materialMenu"
              className="item-container"
              style={{ width: "100%" }}
            >
              کالا 
              <Switch
                checked={this.state.isMaterialChecked}
                disabled={this.state.isMaterialDisabled}
                onChange={(e) => {
                  this.handleChange(e, "materialMenu");
                }}
                className="switch"
              />
              <div
                title="materialChildren"
                hidden={this.state.isMaterialChildrenHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  title="materialCard"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  کالا پایه
                  <Switch
                    checked={this.state.isMaterialCardChecked}
                    disabled={this.state.isMaterialCardDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "materialCard");
                    }}
                    className="switch"
                  />
                  <div
                    title="materialCardTask"
                    hidden={this.state.isMaterialCardTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newMaterial" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewMaterialChecked}
                        disabled={this.state.isNewMaterialDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newMaterial");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editMaterial" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditMaterialChecked}
                        disabled={this.state.isEditMaterialDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editMaterial");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteMaterial" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteMaterialChecked}
                        disabled={this.state.isDeleteMaterialDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteMaterial");
                        }}
                        className="switch"
                      />
                    </div>
                    
                    {/* <div title="printMaterial" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintMaterialChecked}
                        disabled={this.state.isPrintMaterialDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printMaterial");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelMaterial" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelMaterialChecked}
                        disabled={this.state.isExcelMaterialDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelMaterial");
                        }}
                        className="switch"
                      />
                    </div>
                   */}
                  </div>
                </div>

                <div
                  title="materialCategoryCard"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                   گروه کالا پایه
                  <Switch
                    checked={this.state.isMaterialCategoryChecked}
                    disabled={this.state.isMaterialCategoryDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "materialCategoryCard");
                    }}
                    className="switch"
                  />
                  <div
                    title="materialCategoryTask"
                    hidden={this.state.isMaterialCategoryTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newMaterialCategory" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewMaterialCategoryChecked}
                        disabled={this.state.isNewMaterialCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newMaterialCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="editMaterialCategory"
                      className="item-container"
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditMaterialCategoryChecked}
                        disabled={this.state.isEditMaterialCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editMaterialCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="deleteMaterialCategory"
                      className="item-container"
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteMaterialCategoryChecked}
                        disabled={this.state.isDeleteMaterialCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteMaterialCategory");
                        }}
                        className="switch"
                      />
                    </div>
                   
                    {/* <div
                      title="printMaterialCategory"
                      className="item-container"
                    >
                      چاپ
                      <Switch
                        checked={this.state.isPrintMaterialCategoryChecked}
                        disabled={this.state.isPrintMaterialCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printMaterialCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="excelMaterialCategory"
                      className="item-container"
                    >
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelMaterialCategoryChecked}
                        disabled={this.state.isExcelMaterialCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelMaterialCategory");
                        }}
                        className="switch"
                      />
                    </div>
                   */}
                  </div>
                </div>

                <div
                  title="scaleCard"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  واحد اندازه گیری
                  <Switch
                    checked={this.state.isScaleChecked}
                    disabled={this.state.isScaleDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "scaleCard");
                    }}
                    className="switch"
                  />
                  <div
                    title="scaleTask"
                    hidden={this.state.isScaleTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newScale" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewScaleChecked}
                        disabled={this.state.isNewScaleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newScale");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editScale" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditScaleChecked}
                        disabled={this.state.isEditScaleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editScale");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteScale" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteScaleChecked}
                        disabled={this.state.isDeleteScaleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteScale");
                        }}
                        className="switch"
                      />
                    </div>
                    
                    {/* <div title="printScale" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintScaleChecked}
                        disabled={this.state.isPrintScaleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printScale");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelScale" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelScaleChecked}
                        disabled={this.state.isExcelScaleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelScale");
                        }}
                        className="switch"
                      />
                    </div>
                   */}
                  </div>
                </div>

                <div
                  title="warehouseCategory"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  گروه انبار
                  <Switch
                    checked={this.state.isWarehouseCategoryChecked}
                    disabled={this.state.isWarehouseCategoryDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "warehouseCategory");
                    }}
                    className="switch"
                  />
                  <div
                    title="warehouseCategoryTask"
                    hidden={this.state.isWarehouseCategoryTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      title="newWarehouseCategory"
                      className="item-container"
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewWarehouseCategoryChecked}
                        disabled={this.state.isNewWarehouseCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newWarehouseCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="editWarehouseCategory"
                      className="item-container"
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditWarehouseCategoryChecked}
                        disabled={this.state.isEditWarehouseCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editWarehouseCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="deleteWarehouseCategory"
                      className="item-container"
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteWarehouseCategoryChecked}
                        disabled={this.state.isDeleteWarehouseCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteWarehouseCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    {/* <div
                      title="printWarehouseCategory"
                      className="item-container"
                    >
                      چاپ
                      <Switch
                        checked={this.state.isPrintWarehouseCategoryChecked}
                        disabled={this.state.isPrintWarehouseCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printWarehouseCategory");
                        }}
                        className="switch"
                      />
                    </div>
                   
                    <div
                      title="excelWarehouseCategory"
                      className="item-container"
                    >
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelWarehouseCategoryChecked}
                        disabled={this.state.isExcelWarehouseCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelWarehouseCategory");
                        }}
                        className="switch"
                      />
                    </div>
                   */}
                  </div>
                </div>

                <div
                  title="warehouse"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انبار
                  <Switch
                    checked={this.state.isWarehouseChecked}
                    disabled={this.state.isWarehouseDisabled}
                    onChange={(e) => {  this.handleChange(e, "warehouse"); }}
                    className="switch"
                  />
                  <div
                    title="warehouseTask"
                    hidden={this.state.isWarehouseTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newWarehouse" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewWarehouseChecked}
                        disabled={this.state.isNewWarehouseDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newWarehouse");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editWarehouse" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditWarehouseChecked}
                        disabled={this.state.isEditWarehouseDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editWarehouse");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteWarehouse" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteWarehouseChecked}
                        disabled={this.state.isDeleteWarehouseDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteWarehouse");
                        }}
                        className="switch"
                      />
                    </div>
                    
                    {/* <div title="printWarehouse" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintWarehouseChecked}
                        disabled={this.state.isPrintWarehouseDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printWarehouse");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelWarehouse" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelWarehouseChecked}
                        disabled={this.state.isExcelWarehouseDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelWarehouse");
                        }}
                        className="switch"
                      />
                    </div>
                   */}
                  </div>
                </div>

                <div
                  title="product"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  کالا
                  <Switch
                    checked={this.state.isProductChecked}
                    disabled={this.state.isProductDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "product");
                    }}
                    className="switch"
                  />
                  <div
                    title="productTask"
                    hidden={this.state.isProductTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newProduct" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewProductChecked}
                        disabled={this.state.isNewProductDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newProduct");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editProduct" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditProductChecked}
                        disabled={this.state.isEditProductDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editProduct");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteProduct" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteProductChecked}
                        disabled={this.state.isDeleteProductDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteProduct");
                        }}
                        className="switch"
                      />
                    </div>
                    {/* <div title="printProduct" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintProductChecked}
                        disabled={this.state.isPrintProductDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printProduct");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelProduct" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelProductChecked}
                        disabled={this.state.isExcelProductDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelProduct");
                        }}
                        className="switch"
                      />
                    </div>
                   */}
                  </div>
                </div>

                <div
                  title="productCategory"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  گروه کالا
                  <Switch
                    checked={this.state.isProductCategoryChecked}
                    disabled={this.state.isProductCategoryDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "productCategory");
                    }}
                    className="switch"
                  />
                  <div
                    title="productCategoryTask"
                    hidden={this.state.isProductCategoryTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newProductCategory" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewProductCategoryChecked}
                        disabled={this.state.isNewProductCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newProductCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editProductCategory" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditProductCategoryChecked}
                        disabled={this.state.isEditProductCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editProductCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteProductCategory" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteProductCategoryChecked}
                        disabled={this.state.isDeleteProductCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteProductCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    
                    {/* <div title="printProductCategory" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintProductCategoryChecked}
                        disabled={this.state.isPrintProductCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printProductCategory");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelProductCategory" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelProductCategoryChecked}
                        disabled={this.state.isExcelProductCategoryDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelProductCategory");
                        }}
                        className="switch"
                      />
                    </div>
                  */}
                  </div>
                </div>
              
                <div
                  title="supplyChain"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  تولیدکنندگان / تامین کنندگان
                  <Switch
                    checked={this.state.isSupplyChainChecked}
                    disabled={this.state.isSupplyChainDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "supplyChain");
                    }}
                    className="switch"
                  />
                  <div
                    title="supplyChainTask"
                    hidden={this.state.isSupplyChainTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newSupplyChain" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewSupplyChainChecked}
                        disabled={this.state.isNewSupplyChainDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newSupplyChain");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editSupplyChain" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditSupplyChainChecked}
                        disabled={this.state.isEditSupplyChainDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editSupplyChain");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteSupplyChain" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteSupplyChainChecked}
                        disabled={this.state.isDeleteSupplyChainDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteSupplyChain");
                        }}
                        className="switch"
                      />
                    </div>
                    
                    {/* <div title="printSupplyChain" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintSupplyChainChecked}
                        disabled={this.state.isPrintSupplyChainDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printSupplyChain");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelSupplyChain" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelSupplyChainChecked}
                        disabled={this.state.isExcelSupplyChainDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelSupplyChain");
                        }}
                        className="switch"
                      />
                    </div>
                  */}
                  </div>
                </div>
              

              </div>
            </div>

            <div
              title="marketingSetting"
              className="item-container"
              style={{ width: "100%" }}
            >
              بازاریابی
              <Switch
                checked={this.state.isMarketingSettingChecked}
                disabled={this.state.isMarketingSettingDisabled}
                onChange={(e) => {
                  this.handleChange(e, "marketingSetting");
                }}
                className="switch"
              />
            </div>

            <div
              title="salesSetting"
              className="item-container"
              style={{ width: "100%" }}
            >
              فروش
              <Switch
                checked={this.state.isSalesSettingChecked}
                disabled={this.state.isSalesSettingDisabled}
                onChange={(e) => {
                  this.handleChange(e, "salesSetting");
                }}
                className="switch"
              />
              <div
                title="salesSettingChildren"
                hidden={this.state.isSalesSettingChildrenHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  title="accountType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع طرف حساب
                  <Switch
                    checked={this.state.isAccountTypeChecked}
                    disabled={this.state.isAccountTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "accountType");
                    }}
                    className="switch"
                  />
                  <div
                    title="accountTypeTask"
                    hidden={this.state.isAccountTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newAccountType" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewAccountTypeChecked}
                        disabled={this.state.isNewAccountTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newAccountType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editAccountType" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditAccountTypeChecked}
                        disabled={this.state.isEditAccountTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editAccountType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteAccountType" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteAccountTypeChecked}
                        disabled={this.state.isDeleteAccountTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteAccountType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printAccountType" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintAccountTypeChecked}
                        disabled={this.state.isPrintAccountTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printAccountType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelAccountType" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelAccountTypeChecked}
                        disabled={this.state.isExcelAccountTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelAccountType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="manualActivityType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع فعالیت
                  <Switch
                    checked={this.state.isManualActivityTypeChecked}
                    disabled={this.state.isManualActivityTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "manualActivityType");
                    }}
                    className="switch"
                  />
                  <div
                    title="manualActivityTypeTask"
                    hidden={this.state.isManualActivityTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newManualActivityType" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewManualActivityTypeChecked}
                        disabled={this.state.isNewManualActivityTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newManualActivityType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editManualActivityType" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditManualActivityTypeChecked}
                        disabled={this.state.isEditManualActivityTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editManualActivityType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteManualActivityType" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteManualActivityTypeChecked}
                        disabled={this.state.isDeleteManualActivityTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteManualActivityType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printManualActivityType" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintManualActivityTypeChecked}
                        disabled={this.state.isPrintManualActivityTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printManualActivityType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelManualActivityType" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelManualActivityTypeChecked}
                        disabled={this.state.isExcelManualActivityTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelManualActivityType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="financialCaseType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع اضافات و کسورات
                  <Switch
                    checked={this.state.isFinancialCaseTypeChecked}
                    disabled={this.state.isFinancialCaseTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "financialCaseType");
                    }}
                    className="switch"
                  />
                  <div
                    title="financialCaseTypeTask"
                    hidden={this.state.isFinancialCaseTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      title="newFinancialCaseType"
                      className="item-container"
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewFinancialCaseTypeChecked}
                        disabled={this.state.isNewFinancialCaseTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newFinancialCaseType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="editFinancialCaseType"
                      className="item-container"
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditFinancialCaseTypeChecked}
                        disabled={this.state.isEditFinancialCaseTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editFinancialCaseType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="deleteFinancialCaseType"
                      className="item-container"
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteFinancialCaseTypeChecked}
                        disabled={this.state.isDeleteFinancialCaseTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteFinancialCaseType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="printFinancialCaseType"
                      className="item-container"
                    >
                      چاپ
                      <Switch
                        checked={this.state.isPrintFinancialCaseTypeChecked}
                        disabled={this.state.isPrintFinancialCaseTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printFinancialCaseType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="excelFinancialCaseType"
                      className="item-container"
                    >
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelFinancialCaseTypeChecked}
                        disabled={this.state.isExcelFinancialCaseTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelFinancialCaseType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="termType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع شرایط و ملاحضات
                  <Switch
                    checked={this.state.isTermTypeChecked}
                    disabled={this.state.isTermTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "termType");
                    }}
                    className="switch"
                  />
                  <div
                    title="termTypeTask"
                    hidden={this.state.isTermTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newTermType" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewTermTypeChecked}
                        disabled={this.state.isNewTermTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newTermType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editTermType" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditTermTypeChecked}
                        disabled={this.state.isEditTermTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editTermType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteTermType" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteTermTypeChecked}
                        disabled={this.state.isDeleteTermTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteTermType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printTermType" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintTermTypeChecked}
                        disabled={this.state.isPrintTermTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printTermType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelTermType" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelTermTypeChecked}
                        disabled={this.state.isExcelTermTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelTermType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="paymentMethod"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع روش پرداخت
                  <Switch
                    checked={this.state.isPaymentMethodChecked}
                    disabled={this.state.isPaymentMethodDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "paymentMethod");
                    }}
                    className="switch"
                  />
                  <div
                    title="paymentMethodTask"
                    hidden={this.state.isPaymentMethodTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newPaymentMethod" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewPaymentMethodChecked}
                        disabled={this.state.isNewPaymentMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newPaymentMethod");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editPaymentMethod" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditPaymentMethodChecked}
                        disabled={this.state.isEditPaymentMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editPaymentMethod");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deletePaymentMethod" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeletePaymentMethodChecked}
                        disabled={this.state.isDeletePaymentMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deletePaymentMethod");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printPaymentMethod" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintPaymentMethodChecked}
                        disabled={this.state.isPrintPaymentMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printPaymentMethod");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelPaymentMethod" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelPaymentMethodChecked}
                        disabled={this.state.isExcelPaymentMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelPaymentMethod");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="deliveryTerm"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  شرایط تحویل
                  <Switch
                    checked={this.state.isDeliveryTermChecked}
                    disabled={this.state.isDeliveryTermDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "deliveryTerm");
                    }}
                    className="switch"
                  />
                  <div
                    title="deliveryTermTask"
                    hidden={this.state.isDeliveryTermTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newDeliveryTerm" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewDeliveryTermChecked}
                        disabled={this.state.isNewDeliveryTermDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newDeliveryTerm");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editDeliveryTerm" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditDeliveryTermChecked}
                        disabled={this.state.isEditDeliveryTermDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editDeliveryTerm");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteDeliveryTerm" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteDeliveryTermChecked}
                        disabled={this.state.isDeleteDeliveryTermDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteDeliveryTerm");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printDeliveryTerm" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintDeliveryTermChecked}
                        disabled={this.state.isPrintDeliveryTermDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printDeliveryTerm");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelDeliveryTerm" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelDeliveryTermChecked}
                        disabled={this.state.isExcelDeliveryTermDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelDeliveryTerm");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="shippingMethod"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع روش حمل و نقل
                  <Switch
                    checked={this.state.isShippingMethodChecked}
                    disabled={this.state.isShippingMethodDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "shippingMethod");
                    }}
                    className="switch"
                  />
                  <div
                    title="shippingMethodTask"
                    hidden={this.state.isShippingMethodTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newShippingMethod" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewShippingMethodChecked}
                        disabled={this.state.isNewShippingMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newShippingMethod");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editDeliveryTerm" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditShippingMethodChecked}
                        disabled={this.state.isEditShippingMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editShippingMethod");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteDeliveryTerm" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteShippingMethodChecked}
                        disabled={this.state.isDeleteShippingMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteShippingMethod");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printDeliveryTerm" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintShippingMethodChecked}
                        disabled={this.state.isPrintShippingMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printShippingMethod");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelDeliveryTerm" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelShippingMethodChecked}
                        disabled={this.state.isExcelShippingMethodDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelShippingMethod");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="responsibleType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع مسئولیت
                  <Switch
                    checked={this.state.isResponsibleTypeChecked}
                    disabled={this.state.isResponsibleTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "responsibleType");
                    }}
                    className="switch"
                  />
                  <div
                    title="responsibleTypeTask"
                    hidden={this.state.isResponsibleTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newResponsibleType" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewResponsibleTypeChecked}
                        disabled={this.state.isNewResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editResponsibleType" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditResponsibleTypeChecked}
                        disabled={this.state.isEditResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="deleteResponsibleType"
                      className="item-container"
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteResponsibleTypeChecked}
                        disabled={this.state.isDeleteResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="printResponsibleType"
                      className="item-container"
                    >
                      چاپ
                      <Switch
                        checked={this.state.isPrintResponsibleTypeChecked}
                        disabled={this.state.isPrintResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="excelResponsibleType"
                      className="item-container"
                    >
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelResponsibleTypeChecked}
                        disabled={this.state.isExcelResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="taskStatus"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  وضعیت کار
                  <Switch
                    checked={this.state.isTaskStatusChecked}
                    disabled={this.state.isTaskStatusDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "taskStatus");
                    }}
                    className="switch"
                  />
                  <div
                    title="taskStatusTask"
                    hidden={this.state.isTaskStatusTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newTaskStatus" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewTaskStatusChecked}
                        disabled={this.state.isNewTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editTaskStatus" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditTaskStatusChecked}
                        disabled={this.state.isEditTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteTaskStatus" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteTaskStatusChecked}
                        disabled={this.state.isDeleteTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printTaskStatus" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintTaskStatusChecked}
                        disabled={this.state.isPrintTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelTaskStatus" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelTaskStatusChecked}
                        disabled={this.state.isExcelTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="reportType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  انواع گزارش
                  <Switch
                    checked={this.state.isReportTypeChecked}
                    disabled={this.state.isReportTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "reportType");
                    }}
                    className="switch"
                  />
                  <div
                    title="reportTypeTask"
                    hidden={this.state.isReportTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newReportType" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewReportTypeChecked}
                        disabled={this.state.isNewReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newReportType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editReportType" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditReportTypeChecked}
                        disabled={this.state.isEditReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editReportType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteReportType" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteReportTypeChecked}
                        disabled={this.state.isDeleteReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteReportType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printReportType" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintReportTypeChecked}
                        disabled={this.state.isPrintReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printReportType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelReportType" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelReportTypeChecked}
                        disabled={this.state.isExcelReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelReportType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>



                </div>

                <div
                  title="reasonsSalesReturn"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  علت مرجوعی
                  <Switch
                    checked={this.state.isReasonsSalesReturnChecked}
                    disabled={this.state.isReasonsSalesReturnDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "reasonsSalesReturn");
                    }}
                    className="switch"
                  />
                  <div
                    title="reasonsSalesReturnTask"
                    hidden={this.state.isReasonsSalesReturnTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newReasonsSalesReturn" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewReasonsSalesReturnChecked}
                        disabled={this.state.isNewReasonsSalesReturnDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newReasonsSalesReturn");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editReasonsSalesReturn" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditReasonsSalesReturnChecked}
                        disabled={this.state.isEditReasonsSalesReturnDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editReasonsSalesReturn");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteReasonsSalesReturn" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteReasonsSalesReturnChecked}
                        disabled={this.state.isDeleteReasonsSalesReturnDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteReasonsSalesReturn");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printReasonsSalesReturn" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintReasonsSalesReturnChecked}
                        disabled={this.state.isPrintReasonsSalesReturnDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printReasonsSalesReturn");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelReasonsSalesReturn" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelReasonsSalesReturnChecked}
                        disabled={this.state.isExcelReasonsSalesReturnDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelReasonsSalesReturn");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>


              </div>

            </div>

            <div
              title="crmSetting"
              className="item-container"
              style={{ width: "100%" }}
            >
              CRM
              <Switch
                checked={this.state.isCRMSettingChecked}
                disabled={this.state.isCRMSettingDisabled}
                onChange={(e) => {
                  this.handleChange(e, "crmSetting");
                }}
                className="switch"
              />
              <div
                title="crmSettingChildren"
                hidden={this.state.isCRMSettingChildrenHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  title="rating"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  امتیاز
                  <Switch
                    checked={this.state.isRatingChecked}
                    disabled={this.state.isRatingDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "rating");
                    }}
                    className="switch"
                  />
                  <div
                    title="ratingTask"
                    hidden={this.state.isRatingTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newRating" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewRatingChecked}
                        disabled={this.state.isNewRatingDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newRating");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editRating" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditRatingChecked}
                        disabled={this.state.isEditRatingDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editRating");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteRating" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteRatingChecked}
                        disabled={this.state.isDeleteRatingDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteRating");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printRating" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintRatingChecked}
                        disabled={this.state.isPrintRatingDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printRating");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelRating" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelRatingChecked}
                        disabled={this.state.isExcelRatingDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelRating");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="accountSource"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  منابع
                  <Switch
                    checked={this.state.isAccountSourceChecked}
                    disabled={this.state.isAccountSourceDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "accountSource");
                    }}
                    className="switch"
                  />
                  <div
                    title="accountSourceTask"
                    hidden={this.state.isAccountSourceTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newAccountSource" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewAccountSourceChecked}
                        disabled={this.state.isNewAccountSourceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newAccountSource");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editAccountSource" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditAccountSourceChecked}
                        disabled={this.state.isEditAccountSourceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editAccountSource");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteAccountSource" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteAccountSourceChecked}
                        disabled={this.state.isDeleteAccountSourceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteAccountSource");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printAccountSource" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintAccountSourceChecked}
                        disabled={this.state.isPrintAccountSourceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printAccountSource");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelAccountSource" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelAccountSourceChecked}
                        disabled={this.state.isExcelAccountSourceDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelAccountSource");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="crmTaskStatus"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  وضعیت کار
                  <Switch
                    checked={this.state.isCRMTaskStatusChecked}
                    disabled={this.state.isCRMTaskStatusDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "crmTaskStatus");
                    }}
                    className="switch"
                  />
                  <div
                    title="crmTaskStatusTask"
                    hidden={this.state.isCRMTaskStatusTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newCRMTaskStatus" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewCRMTaskStatusChecked}
                        disabled={this.state.isNewCRMTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newCRMTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editCRMTaskStatus" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditCRMTaskStatusChecked}
                        disabled={this.state.isEditCRMTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editCRMTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteCRMTaskStatus" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteCRMTaskStatusChecked}
                        disabled={this.state.isDeleteCRMTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteCRMTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printCRMTaskStatus" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintCRMTaskStatusChecked}
                        disabled={this.state.isPrintCRMTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printCRMTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelCRMTaskStatus" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelCRMTaskStatusChecked}
                        disabled={this.state.isExcelCRMTaskStatusDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelCRMTaskStatus");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="crmResponsibleType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  نوع مسئولیت
                  <Switch
                    checked={this.state.isCRMResponsibleTypeChecked}
                    disabled={this.state.isCRMResponsibleTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "crmResponsibleType");
                    }}
                    className="switch"
                  />
                  <div
                    title="crmResponsibleTypeTask"
                    hidden={this.state.isCRMResponsibleTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div
                      title="newCRMResponsibleType"
                      className="item-container"
                    >
                      جدید
                      <Switch
                        checked={this.state.isNewCRMResponsibleTypeChecked}
                        disabled={this.state.isNewCRMResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newCRMResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="editCRMResponsibleType"
                      className="item-container"
                    >
                      ویرایش
                      <Switch
                        checked={this.state.isEditCRMResponsibleTypeChecked}
                        disabled={this.state.isEditCRMResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editCRMResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="deleteCRMResponsibleType"
                      className="item-container"
                    >
                      حذف
                      <Switch
                        checked={this.state.isDeleteCRMResponsibleTypeChecked}
                        disabled={this.state.isDeleteCRMResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteCRMResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="printCRMResponsibleType"
                      className="item-container"
                    >
                      چاپ
                      <Switch
                        checked={this.state.isPrintCRMResponsibleTypeChecked}
                        disabled={this.state.isPrintCRMResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printCRMResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div
                      title="excelCRMResponsibleType"
                      className="item-container"
                    >
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelCRMResponsibleTypeChecked}
                        disabled={this.state.isExcelCRMResponsibleTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelCRMResponsibleType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="crmReportType"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  نوع گزارش
                  <Switch
                    checked={this.state.isCRMReportTypeChecked}
                    disabled={this.state.isCRMReportTypeDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "crmReportType");
                    }}
                    className="switch"
                  />
                  <div
                    title="crmReportTypeTask"
                    hidden={this.state.isCRMReportTypeTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newCRMReportType" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewCRMReportTypeChecked}
                        disabled={this.state.isNewCRMReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newCRMReportType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editCRMReportType" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditCRMReportTypeChecked}
                        disabled={this.state.isEditCRMReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editCRMReportType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteCRMReportType" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteCRMReportTypeChecked}
                        disabled={this.state.isDeleteCRMReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteCRMReportType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printCRMReportType" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintCRMReportTypeChecked}
                        disabled={this.state.isPrintCRMReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printCRMReportType");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelCRMReportType" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelCRMReportTypeChecked}
                        disabled={this.state.isExcelCRMReportTypeDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelCRMReportType");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              title="transportation"
              className="item-container"
              style={{ width: "100%" }}
            >
              حمل و نقل
              <Switch
                checked={this.state.isTransportationChecked}
                disabled={this.state.isTransportationDisabled}
                onChange={(e) => {
                  this.handleChange(e, "transportation");
                }}
                className="switch"
              />
            </div>

            <div
              title="servicesSetting"
              className="item-container"
              style={{ width: "100%" }}
            >
              خدمات
              <Switch
                checked={this.state.isServicesSettingChecked}
                disabled={this.state.isServicesSettingDisabled}
                onChange={(e) => {
                  this.handleChange(e, "servicesSetting");
                }}
                className="switch"
              />
            </div>

            <div
              title="userManagement"
              className="item-container"
              style={{ width: "100%" }}
            >
              مدیریت کاربران
              <Switch
                checked={this.state.isUserManagementChecked}
                disabled={this.state.isUserManagementDisabled}
                onChange={(e) => {
                  this.handleChange(e, "userManagement");
                }}
                className="switch"
              />
              <div
                title="userManagementChildren"
                hidden={this.state.isUserManagementChildrenHidden}
                style={{ borderRight: "1px dashed gray" }}
              >
                <div
                  title="role"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  نقش
                  <Switch
                    checked={this.state.isRoleChecked}
                    disabled={this.state.isRoleDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "role");
                    }}
                    className="switch"
                  />
                  <div
                    title="roleTask"
                    hidden={this.state.isRoleTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newRole" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewRoleChecked}
                        disabled={this.state.isNewRoleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newRole");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editRole" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditRoleChecked}
                        disabled={this.state.isEditRoleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editRole");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteRole" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteRoleChecked}
                        disabled={this.state.isDeleteRoleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteRole");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printRole" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintRoleChecked}
                        disabled={this.state.isPrintRoleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printRole");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelRole" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelRoleChecked}
                        disabled={this.state.isExcelRoleDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelRole");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>

                <div
                  title="user"
                  className="item-container"
                  style={{ width: "100%" }}
                >
                  کاربر
                  <Switch
                    checked={this.state.isUserChecked}
                    disabled={this.state.isUserDisabled}
                    onChange={(e) => {
                      this.handleChange(e, "user");
                    }}
                    className="switch"
                  />
                  <div
                    title="userTask"
                    hidden={this.state.isUserTaskHidden}
                    style={{ borderRight: "1px dashed gray" }}
                  >
                    <div title="newUser" className="item-container">
                      جدید
                      <Switch
                        checked={this.state.isNewUserChecked}
                        disabled={this.state.isNewUserDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "newUser");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="editUser" className="item-container">
                      ویرایش
                      <Switch
                        checked={this.state.isEditUserChecked}
                        disabled={this.state.isEditUserDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "editUser");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="deleteUser" className="item-container">
                      حذف
                      <Switch
                        checked={this.state.isDeleteUserChecked}
                        disabled={this.state.isDeleteUserDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "deleteUser");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="printUser" className="item-container">
                      چاپ
                      <Switch
                        checked={this.state.isPrintUserChecked}
                        disabled={this.state.isPrintUserDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "printUser");
                        }}
                        className="switch"
                      />
                    </div>
                    <div title="excelUser" className="item-container">
                      ارسال / دریافت
                      <Switch
                        checked={this.state.isExcelUserChecked}
                        disabled={this.state.isExcelUserDisabled}
                        onChange={(e) => {
                          this.handleChange(e, "excelUser");
                        }}
                        className="switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              title="ticketSetting"
              className="item-container"
              style={{ width: "100%" }}
            >
              تیکت
              <Switch
                checked={this.state.isTicketSettingChecked}
                disabled={this.state.isTicketSettingDisabled}
                onChange={(e) => {
                  this.handleChange(e, "ticketSetting");
                }}
                className="switch"
              />
            </div>

            <div
              title="bpms"
              className="item-container"
              style={{ width: "100%" }}
            >
              BPMS
              <Switch
                checked={this.state.isBPMSChecked}
                disabled={this.state.isBPMSDisabled}
                onChange={(e) => {
                  this.handleChange(e, "bpms");
                }}
                className="switch"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  /* #endregion */

  /* #endregion */
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = (state) => {
  return {
    roleItem: state.account.roleItem,
    userId: state.account.userId,
    userPermissionList: state.account.userPermissionList,
    message: state.account.message,
  };
};

/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = (dispatch) => ({
  getUserPermission: (data) => dispatch(getUserPermission(data)),
  postUserPermission: (data) => dispatch(postUserPermission(data)),
  resetProps: () => dispatch(resetProps()),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
