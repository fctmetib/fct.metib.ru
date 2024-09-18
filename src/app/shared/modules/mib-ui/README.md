```js
// add i
ng g i shared/ui-kit/button/interfaces/button.interface --dry-run
// add comp
ng g c shared/ui-kit/button/button --flat --skip-tests --dry-run
// add m
ng g m shared/ui-kit/button --dry-run
// add accepting component module
ng g m shared/modules/mib-ui --dry-run

```

P
![Alt text](readmeAccets/test_btn.png)

![Alt text](readmeAccets/test_input.png)

src\app\shared\ui-kit\tag

// input

```js
// add i
 ng g i shared/ui-kit/input/interfaces/input.interface --dry-run
 ng g i shared/ui-kit/badge/interfaces/badge.interface --dry-run
 ng g i shared/ui-kit/checkbox/interfaces/checkbox.interface --dry-run
 ng g i shared/ui-kit/tag/interfaces/tag.interface --dry-run
 ng g i shared/ui-kit/radio/interfaces/radio.interface --dry-run
 ng g i shared/ui-kit/switch/interfaces/switch.interface --dry-run
// add comp
 ng g c shared/ui-kit/input/input --flat --skip-tests --dry-run
 ng g c shared/ui-kit/badge/badge --flat --skip-tests --dry-run
 ng g c shared/ui-kit/checkbox/checkbox --flat --skip-tests --dry-run
 ng g c shared/ui-kit/radio/radio --flat --skip-tests --dry-run // fx update parent module
 ng g c shared/ui-kit/switch/switch --flat --skip-tests --dry-run // fx update parent module
 ng g c shared/ui-kit/tag/tag --flat --skip-tests --dry-run
 ng g c shared/ui-kit/input/components/autocomplete --flat --skip-tests --dry-run

// agent-client
src\app\agent-client
ng g m agent-client/agent-client --flat --routing --module=app
ng g c agent-client/agent-client --flat --skip-tests --dry-run

// agent-client/cabinet
src\app\agent-client
ng g m agent-client/modules/cabinet/agent-client-cabinet --flat --routing --module=agent-client
ng g c agent-client/modules/cabinet/components/cabinet-page --flat --skip-tests --dry-run

// agent-client/cabinet/agent-factoring
src\app\agent-client\modules\cabinet\components
ng g c agent-client/modules/cabinet/components/agent-factoring --skip-tests

// agent-client/registers
src\app\agent-client
ng g m agent-client/modules/registers/agent-client-registers --flat --routing --module=agent-client
ng g c agent-client/modules/registers/components/registers-page --flat --skip-tests --dry-run

// agent-client/payment-register
src\app\agent-client
ng g m agent-client/modules/payment-register/agent-client-payment-register --flat --routing --module=agent-client
ng g c agent-client/modules/payment-register/components/payment-register-page --flat --skip-tests --dry-run

// agent-client/creditors
src\app\agent-client
ng g m agent-client/modules/creditors/agent-client-creditors --flat --routing --module=agent-client
ng g c agent-client/modules/creditors/components/creditors-page --flat --skip-tests --dry-run

// agent-client/payments
src\app\agent-client
ng g m agent-client/modules/payments/agent-client-payments --flat --routing --module=agent-client
ng g c agent-client/modules/payments/components/payments-page --flat --skip-tests --dry-run

// agent-client/invoices-payment
src\app\agent-client
ng g m agent-client/modules/invoices-payment/agent-client-invoices-payment --flat --routing --module=agent-client
ng g c agent-client/modules/invoices-payment/components/invoices-payment-page --flat --skip-tests --dry-run

// agent-client/queries
src\app\agent-client
ng g m agent-client/modules/queries/agent-client-queries --flat --routing --module=agent-client
ng g c agent-client/modules/queries/components/queries-page --flat --skip-tests

// agent-client/contracts
src\app\agent-client
ng g m agent-client/modules/contracts/agent-client-contracts --flat --routing --module=agent-client
ng g c agent-client/modules/contracts/components/contracts-page --flat --skip-tests

// agent-client/reports
src\app\agent-client
ng g m agent-client/modules/reports/agent-client-reports --flat --routing --module=agent-client
ng g c agent-client/modules/reports/components/reports-page --flat --skip-tests

// agent-client/pay-agent-reports
src\app\agent-client
ng g m agent-client/modules/pay-agent-reports/agent-client-pay-agent-reports --flat --routing --module=agent-client
ng g c agent-client/modules/pay-agent-reports/components/pay-agent-reports-page --flat --skip-tests

// agent-client/documents
src\app\agent-client
ng g m agent-client/modules/documents/agent-client-documents --flat --routing --module=agent-client
ng g c agent-client/modules/documents/components/documents-page --flat --skip-tests

 //--- add header module
src\app\shared\modules\header\header.component.html
ng g m shared/modules/header/header --flat --dry-run
 //---

 //--- add request-create-success-modal
src\app\client\modules\requests\modules
ng g m client/modules/requests/modules/request-create-success-modal --dry-run
ng g c client/modules/requests/modules/request-create-success-modal/request-create-success-modal --flat --skip-tests --dry-run
ng g s client/modules/requests/modules/request-create-success-modal/request-create-success-modal --skip-tests --dry-run
 //---

 //--- new-documents-page
src\app\client\modules\documents\pages
ng g m client/modules/documents/pages/new-documents-page/new-documents-page --flat --dry-run
ng g c client/modules/documents/pages/new-documents-page/new-documents-page --flat --skip-tests  --dry-run
 //---

 //--- new-contracts-page
src\app\client\modules\contracts\pages
ng g c client/modules/contracts/pages/new-contracts-page/new-contracts-page --flat --skip-tests  --dry-run
ng g s client/modules/contracts/services/contacts  --dry-run
 //---

 //--- new-documents-page-drawer
src\app\client\modules\documents\modules
ng g m client/modules/documents/modules/new-documents-page-drawer/new-documents-page-drawer --flat --dry-run
ng g c client/modules/documents/modules/new-documents-page-drawer/new-documents-page-drawer --flat --skip-tests  --dry-run
ng g s client/modules/documents/modules/new-documents-page-drawer/new-documents-page-drawer --flat --skip-tests  --dry-run
ng g i client/modules/documents/modules/new-documents-page-drawer/interfaces/new-documents-page-drawer.interface --dry-run
 //---

 //--- agent-document-page
src\app\agent-client\modules\documents\modules
ng g m agent-client/modules/documents/modules/agent-document-page/agent-document-page --flat --dry-run
ng g c agent-client/modules/documents/modules/agent-document-page/agent-document-page --flat --skip-tests  --dry-run
ng g s agent-client/modules/documents/modules/agent-document-page/agent-document-page --flat --skip-tests  --dry-run
ng g i agent-client/modules/documents/modules/agent-document-page/interfaces/agent-document-page.interface --dry-run
 //---

 //--- agent-document-view-drawer
src\app\agent-client\modules\documents\modules
ng g m agent-client/modules/documents/modules/agent-document-view-drawer/agent-document-view-drawer --flat --dry-run
ng g c agent-client/modules/documents/modules/agent-document-view-drawer/agent-document-view-drawer --flat --skip-tests  --dry-run
ng g s agent-client/modules/documents/modules/agent-document-view-drawer/agent-document-view-drawer --flat --skip-tests  --dry-run
ng g i agent-client/modules/documents/modules/agent-document-view-drawer/interfaces/agent-document-view-drawer.interface --dry-run
 //---

 //--- agent-register-view-drawer
src\app\agent-client\modules\register\modules
ng g m agent-client/modules/register/modules/agent-register-view-drawer/agent-register-view-drawer --flat --dry-run
ng g c agent-client/modules/register/modules/agent-register-view-drawer/agent-register-view-drawer --flat --skip-tests  --dry-run
ng g s agent-client/modules/register/modules/agent-register-view-drawer/agent-register-view-drawer --flat --skip-tests  --dry-run
ng g i agent-client/modules/register/modules/agent-register-view-drawer/interfaces/agent-register-view-drawer.interface --dry-run
 //---

 //--- agent-register-drawer
src\app\agent-client\modules\register\modules
ng g m agent-client/modules/register/modules/agent-register-drawer/agent-register-drawer --flat --dry-run
ng g c agent-client/modules/register/modules/agent-register-drawer/agent-register-drawer --flat --skip-tests  --dry-run
ng g s agent-client/modules/register/modules/agent-register-drawer/agent-register-drawer --flat --skip-tests  --dry-run
ng g i agent-client/modules/register/modules/agent-register-drawer/interfaces/agent-register-drawer.interface --dry-run
 //---

 //--- agent-payments-drawer
src\app\agent-client\modules\payments\modules
ng g m agent-client/modules/payments/modules/agent-payments-drawer/agent-payments-drawer --flat --dry-run
ng g c agent-client/modules/payments/modules/agent-payments-drawer/agent-payments-drawer --flat --skip-tests  --dry-run
ng g s agent-client/modules/payments/modules/agent-payments-drawer/agent-payments-drawer --flat --skip-tests  --dry-run
ng g i agent-client/modules/payments/modules/agent-payments-drawer/interfaces/agent-payments-drawer.interface --dry-run
 //---

 //--- agent-queries-drawer
src\app\agent-client\modules\payments\modules
ng g m agent-client/modules/payments/modules/agent-queries-drawer/agent-queries-drawer --flat --dry-run
ng g c agent-client/modules/payments/modules/agent-queries-drawer/agent-queries-drawer --flat --skip-tests  --dry-run
ng g s agent-client/modules/payments/modules/agent-queries-drawer/agent-queries-drawer --flat --skip-tests  --dry-run
ng g i agent-client/modules/payments/modules/agent-queries-drawer/interfaces/agent-queries-drawer.interface --dry-run
 //---

 //--- agent-contracts-drawer
src\app\agent-client\modules\contracts\modules
ng g m agent-client/modules/contracts/modules/agent-contracts-drawer/agent-contracts-drawer --flat --dry-run
ng g c agent-client/modules/contracts/modules/agent-contracts-drawer/agent-contracts-drawer --flat --skip-tests  --dry-run
ng g s agent-client/modules/contracts/modules/agent-contracts-drawer/agent-contracts-drawer --flat --skip-tests  --dry-run
ng g i agent-client/modules/contracts/modules/agent-contracts-drawer/interfaces/agent-contracts-drawer.interface --dry-run
 //---

 //--- cabinet-news-drawer
src\app\admin\modules\cabinet\modules
ng g m admin/modules/cabinet/modules/cabinet-news-drawer/cabinet-news-drawer --flat --dry-run
ng g c admin/modules/cabinet/modules/cabinet-news-drawer/cabinet-news-drawer --flat --skip-tests  --dry-run
ng g s admin/modules/cabinet/modules/cabinet-news-drawer/cabinet-news-drawer --flat --skip-tests  --dry-run
ng g i admin/modules/cabinet/modules/cabinet-news-drawer/interfaces/cabinet-news-drawer.interface --dry-run

 //--- cabinet-create-news
 -drawer
src\app\admin\modules\cabinet\modules
ng g m admin/modules/cabinet/modules/cabinet-create-news-drawer/cabinet-create-news-drawer --flat --dry-run
ng g c admin/modules/cabinet/modules/cabinet-create-news-drawer/cabinet-create-news-drawer --flat --skip-tests  --dry-run
ng g s admin/modules/cabinet/modules/cabinet-create-news-drawer/cabinet-create-news-drawer --flat --skip-tests  --dry-run
ng g i admin/modules/cabinet/modules/cabinet-create-news-drawer/interfaces/cabinet-create-news-drawer.interface --dry-run
 //---

 //--- cabinet-edit-news
 -drawer
src\app\admin\modules\cabinet\modules
ng g m admin/modules/cabinet/modules/cabinet-edit-news-drawer/cabinet-edit-news-drawer --flat --dry-run
ng g c admin/modules/cabinet/modules/cabinet-edit-news-drawer/cabinet-edit-news-drawer --flat --skip-tests  --dry-run
ng g s admin/modules/cabinet/modules/cabinet-edit-news-drawer/cabinet-edit-news-drawer --flat --skip-tests  --dry-run
ng g i admin/modules/cabinet/modules/cabinet-edit-news-drawer/interfaces/cabinet-edit-news-drawer.interface --dry-run
 //---

 //--- new-contracts-page-drawer
src\app\client\modules\contracts\modules
ng g m client/modules/contracts/modules/new-contracts-page-drawer/new-contracts-page-drawer --flat --dry-run
ng g c client/modules/contracts/modules/new-contracts-page-drawer/new-contracts-page-drawer --flat --skip-tests  --dry-run
ng g s client/modules/contracts/modules/new-contracts-page-drawer/new-contracts-page-drawer --flat --skip-tests  --dry-run
ng g i client/modules/contracts/modules/new-contracts-page-drawer/interfaces/new-contracts-page-drawer.interface --dry-run
 //---

 //--- new-documents-views-drawer
src\app\client\modules\documents\modules
ng g m client/modules/documents/modules/new-documents-views-drawer/new-documents-views-drawer --flat --dry-run
ng g c client/modules/documents/modules/new-documents-views-drawer/new-documents-views-drawer --flat --skip-tests  --dry-run
ng g s client/modules/documents/modules/new-documents-views-drawer/new-documents-views-drawer --flat --skip-tests  --dry-run
ng g i client/modules/documents/modules/new-documents-views-drawer/interfaces/new-documents-views-drawer.interface --dry-run
 //---

 //--- new-demand
src\app\shared\modules\new-demand
ng g m shared/modules/new-demand/new-demand --flat --dry-run
ng g i shared/modules/new-demand/interfaces/new-demand.interface --dry-run
ng g c shared/modules/new-demand/new-demand --flat --skip-tests  --dry-run
 //---

 //--- new-delays
 src\app\client\modules\delays\pages\new-delays
ng g m client/modules/delays/pages/new-delays/new-delays --flat --dry-run
ng g i client/modules/delays/pages/new-delays/interfaces/new-delays.interface --dry-run
ng g c client/modules/delays/pages/new-delays/new-delays --flat --skip-tests  --dry-run
 //---

 //--- new-delays-drawer
 src\app\client\modules\delays\modules\new-delays-drawer
ng g m client/modules/delays/modules/new-delays-drawer/new-delays-drawer --flat --dry-run
ng g i client/modules/delays/modules/new-delays-drawer/interfaces/new-delays-drawer.interface --dry-run
ng g s client/modules/delays/modules/new-delays-drawer/new-delays-drawer --skip-tests  --dry-run
ng g c client/modules/delays/modules/new-delays-drawer/new-delays-drawer --flat --skip-tests  --dry-run
 //---

 //--- demand-drawer
src\app\client\modules\demand-new\modules\demand-drawer
ng g i client/modules/demand-new/modules/demand-drawer/interfaces/demand-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-drawer/demand-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-drawer/demand-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-drawer --skip-tests --dry-run
 //---

 //--- demand-signature-drawer
src\app\client\modules\demand-new\modules\demand-signature-drawer
ng g i client/modules/demand-new/modules/demand-signature-drawer/interfaces/demand-signature-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-signature-drawer/demand-signature-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-signature-drawer/demand-signature-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-signature-drawer --skip-tests --dry-run
 //---

 //--- demand-surety-drawer
src\app\client\modules\demand-new\modules\demand-surety-drawer
ng g i client/modules/demand-new/modules/demand-surety-drawer/interfaces/demand-surety-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-surety-drawer/demand-surety-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-surety-drawer/demand-surety-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-surety-drawer --skip-tests --dry-run
 //---

 //--- demand-editing-drawer
src\app\client\modules\demand-new\modules\demand-editing-drawer
ng g i client/modules/demand-new/modules/demand-editing-drawer/interfaces/demand-editing-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-editing-drawer/demand-editing-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-editing-drawer/demand-editing-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-editing-drawer --skip-tests --dry-run
 //---

 //--- demand-limit-drawer
src\app\client\modules\demand-new\modules\demand-limit-drawer
ng g i client/modules/demand-new/modules/demand-limit-drawer/interfaces/demand-limit-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-limit-drawer/demand-limit-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-limit-drawer/demand-limit-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-limit-drawer --skip-tests --dry-run
 //---

 //--- demand-debtor-drawer
src\app\client\modules\demand-new\modules\demand-debtor-drawer
ng g i client/modules/demand-new/modules/demand-debtor-drawer/interfaces/demand-debtor-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-debtor-drawer/demand-debtor-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-debtor-drawer/demand-debtor-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-debtor-drawer --skip-tests --dry-run
 //---

 //--- demand-verification-drawer
src\app\client\modules\demand-new\modules\demand-verification-drawer
ng g i client/modules/demand-new/modules/demand-verification-drawer/interfaces/demand-verification-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-verification-drawer/demand-verification-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-verification-drawer/demand-verification-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-verification-drawer --skip-tests --dry-run
 //---

 //--- demand-factoring-drawer
src\app\client\modules\demand-new\modules\demand-factoring-drawer
ng g i client/modules/demand-new/modules/demand-factoring-drawer/interfaces/demand-factoring-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-factoring-drawer/demand-factoring-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-factoring-drawer/demand-factoring-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-factoring-drawer --skip-tests --dry-run
 //---

 //--- demand-agent-drawer
src\app\client\modules\demand-new\modules\demand-agent-drawer
ng g i client/modules/demand-new/modules/demand-agent-drawer/interfaces/demand-agent-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-agent-drawer/demand-agent-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-agent-drawer/demand-agent-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-agent-drawer --skip-tests --dry-run
 //---

 //--- invoice-drawer
src\app\client\modules\invoices\modules
ng g i client/modules/invoices/modules/invoice-drawer/interfaces/invoice-drawer.interface  --dry-run
ng g m client/modules/invoices/modules/invoice-drawer/invoice-drawer --flat --dry-run
ng g s client/modules/invoices/modules/invoice-drawer/invoice-drawer --skip-tests --dry-run
ng g c client/modules/invoices/modules/invoice-drawer/ --skip-tests --dry-run
 //---

 //--- request-browser-drawer
src\app\client\modules\requests\modules\request-drawer
ng g i client/modules/requests/modules/request-browser-drawer/interfaces/request-browser-drawer.interface  --dry-run
ng g m client/modules/requests/modules/request-browser-drawer/request-browser-drawer --flat --dry-run
ng g s client/modules/requests/modules/request-browser-drawer/request-browser-drawer --skip-tests --dry-run
ng g c client/modules/requests/modules/request-browser-drawer --skip-tests --dry-run
 //---

 //--- new-demand/modules
src\app\client\modules\demand-new\modules\demand-drawer
ng g c client/modules/demand-new/modules/demand-drawer --skip-tests --dry-run
 //---

 //--- comment-panel
src\app\shared\ui-kit
ng g i shared/ui-kit/comment-panel/interfaces/comment-panel.interface  --dry-run
ng g m shared/ui-kit/comment-panel/comment-panel --flat  --dry-run
ng g c shared/ui-kit/comment-panel/comment-panel --flat  --skip-tests --dry-run
 //---

 //--- loader
src\app\shared\ui-kit
ng g i shared/ui-kit/loader/interfaces/loader.interface  --dry-run
ng g m shared/ui-kit/loader/loader --flat  --dry-run
ng g c shared/ui-kit/loader/loader --flat  --skip-tests --dry-run
 //---

 //--- mark
src\app\shared\ui-kit
ng g i shared/ui-kit/mark/interfaces/mark.interface  --dry-run
ng g m shared/ui-kit/mark/mark --flat  --dry-run
ng g c shared/ui-kit/mark/mark --flat  --skip-tests --dry-run
 //---

 //--- breadcrumb
src\app\shared\ui-kit\breadcrumb
ng g i shared/ui-kit/breadcrumb/interfaces/breadcrumb.interface  --dry-run
ng g m shared/ui-kit/breadcrumb/breadcrumb --flat  --dry-run
ng g c shared/ui-kit/breadcrumb/breadcrumb --flat  --skip-tests --dry-run
 //---

 //--- tags-group
src\app\shared\ui-kit
ng g i shared/ui-kit/tags-group/interfaces/tags-group.interface  --dry-run
ng g m shared/ui-kit/tags-group/tags-group --flat  --dry-run
ng g c shared/ui-kit/tags-group/tags-group --flat  --skip-tests --dry-run
 //---

 //--- test-tab
src\app\shared\ui-kit
ng g i shared/ui-kit/test-tab/interfaces/test-tab.interface  --dry-run
ng g m shared/ui-kit/test-tab/test-tab --flat  --dry-run
ng g c shared/ui-kit/test-tab/test-tab --flat  --skip-tests --dry-run
 //---

 //--- test-modal-outside
src\app\shared\ui-kit
ng g i shared/ui-kit/test-modal-outside/interfaces/test-modal-outside.interface  --dry-run
ng g m shared/ui-kit/test-modal-outside/test-modal-outside --flat  --dry-run
ng g c shared/ui-kit/test-modal-outside/test-modal-outside --flat  --skip-tests --dry-run
 //---

 //--- mobile-table
src\app\shared\ui-kit
ng g i shared/ui-kit/mobile-table/interfaces/mobile-table.interface  --dry-run
ng g m shared/ui-kit/mobile-table/mobile-table --flat  --dry-run
ng g c shared/ui-kit/mobile-table/mobile-table --flat  --skip-tests --dry-run
 //---

 //--- mobile-table-cell
src\app\shared\ui-kit
ng g i shared/ui-kit/mobile-table/components/mobile-table-cell/interfaces/mobile-table-cell.interface  --dry-run
ng g c shared/ui-kit/mobile-table/components/mobile-table-cell --flat  --skip-tests --dry-run
 //---

 //--- invoice
src\app\client\modules\invoices
ng g c client/modules/invoices/pages/invoice-page --skip-tests --dry-run
ng g s client/modules/invoices/services/invoices --skip-tests --dry-run
 //---

 //--- toaster
src\app\shared\ui-kit\
ng g i shared/ui-kit/toaster/interfaces/toaster.interface  --dry-run
ng g m shared/ui-kit/toaster/toaster --flat  --dry-run
ng g c shared/ui-kit/toaster/toaster --flat  --skip-tests --dry-run

 //--- quest
src\app\shared\ui-kit\
ng g i shared/ui-kit/quest/interfaces/quest.interface  --dry-run
ng g m shared/ui-kit/quest/quest --flat  --dry-run
ng g c shared/ui-kit/quest/quest --flat  --skip-tests --dry-run

// service
src\app\shared\services\common\accounts.service.ts
ng g s shared/services/common/toaster --skip-tests --dry-run

//  request-landing-service
src\app\public\service
ng g s public/service/request-landing-service --skip-tests --dry-run

//  get-agent-request
src\app\public\service
ng g s public/service/get-agent-request --skip-tests --dry-run

//  request-landing-interface
src\app\public\type
ng g i public/type/request-landing.interface  --dry-run

// interface
src\app\shared\types\common
ng g i shared/types/common/toaster  --dry-run
ng g i shared/ui-kit/toaster/interfaces/toaster-point.interface  --dry-run

// test-swipe
src\app\shared\ui-kit\toaster\components
ng g c shared/ui-kit/toaster/components/toaster-pointer --skip-tests
 //---

// test-swipe
ng g m shared/ui-kit/test-swipe/test-swipe --flat
ng g c shared/ui-kit/test-swipe/test-swipe  --flat  --skip-tests
 //---

// test-autocomplete
ng g m shared/ui-kit/test-autocomplete/test-autocomplete --flat
ng g c shared/ui-kit/test-autocomplete/test-autocomplete  --flat  --skip-tests
 //---

 //--- modal
src\app\shared\ui-kit
ng g i shared/ui-kit/modal/interfaces/modal.interface  --dry-run
ng g m shared/ui-kit/modal/modal --flat  --dry-run
ng g c shared/ui-kit/modal/modal --flat  --skip-tests --dry-run
//--- modal-components
ng g c shared/ui-kit/modal/components/modal-footer  --skip-tests --dry-run
ng g c shared/ui-kit/modal/components/modal-header  --skip-tests --dry-run
// --modal-banner
src\app\shared\ui-kit\modal\components
ng g c shared/ui-kit/modal/components/banner-success  --skip-tests --dry-run
ng g c shared/ui-kit/modal/components/banner-failure  --skip-tests --dry-run
ng g c shared/ui-kit/modal/components/banner-info  --skip-tests --dry-run
//---modal-content
ng g c shared/ui-kit/modal/components/new-shipment-modal  --skip-tests --dry-run
ng g c shared/ui-kit/modal/components/pin-modal  --skip-tests --dry-run
 //---banner-modal
ng g c shared/ui-kit/modal/components/banner-modal  --skip-tests --dry-run
ng g i shared/ui-kit/modal/components/banner-modal/interfaces/banner-modal.interface

 //--- media
src\app\shared\ui-kit\media
ng g i shared/ui-kit/media/interfaces/media.interface  --dry-run
ng g m shared/ui-kit/media/media --flat  --dry-run
ng g c shared/ui-kit/media/media --flat  --skip-tests --dry-run
 //---

 //--- radio-group
src\app\shared\ui-kit\radio-group
ng g c shared/ui-kit/radio/components/radio-group --flat  --skip-tests --dry-run
 //---

 //--- contracted-forms
src\app\shared\ui-kit\contracted-forms
ng g i shared/ui-kit/contracted-forms/interfaces/contracted-forms.interface  --dry-run
ng g m shared/ui-kit/contracted-forms/contracted-forms --flat  --dry-run
ng g c shared/ui-kit/contracted-forms/contracted-forms --flat  --skip-tests --dry-run
 //---

 //--- accordion-item
src\app\shared\ui-kit\accordion-item
ng g i shared/ui-kit/accordion-item/interfaces/accordion-item.interface  --dry-run
ng g m shared/ui-kit/accordion-item/accordion-item --flat  --dry-run
ng g c shared/ui-kit/accordion-item/accordion-item --flat  --skip-tests --dry-run
 //---

 //--- rate-item
src\app\shared\ui-kit\rate-item
ng g i shared/ui-kit/rate-item/interfaces/rate-item.interface  --dry-run
ng g m shared/ui-kit/rate-item/rate-item --flat  --dry-run
ng g c shared/ui-kit/rate-item/rate-item --flat  --skip-tests --dry-run
 //---

 //--- rate-card
src\app\shared\ui-kit\rate-card
ng g i shared/ui-kit/rate-card/interfaces/rate-card.interface  --dry-run
ng g m shared/ui-kit/rate-card/rate-card --flat  --dry-run
ng g c shared/ui-kit/rate-card/rate-card --flat  --skip-tests --dry-run
 //---

 //--- factoring-calculator
src\app\shared\ui-kit\factoring-calculator
ng g i shared/ui-kit/factoring-calculator/interfaces/factoring-calculator.interface  --dry-run
ng g m shared/ui-kit/factoring-calculator/factoring-calculator --flat  --dry-run
ng g c shared/ui-kit/factoring-calculator/factoring-calculator --flat  --skip-tests --dry-run
 //---

 //--- file-cell
src\app\shared\ui-kit\file-cell
ng g i shared/ui-kit/file-cell/interfaces/file-cell.interface  --dry-run
ng g m shared/ui-kit/file-cell/file-cell --flat  --dry-run
ng g c shared/ui-kit/file-cell/file-cell --flat  --skip-tests --dry-run
 //---

 //--- dl-file-cell
src\app\shared\ui-kit\dl-file-cell
ng g i shared/ui-kit/dl-file-cell/interfaces/dl-file-cell.interface  --dry-run
ng g m shared/ui-kit/dl-file-cell/dl-file-cell --flat  --dry-run
ng g c shared/ui-kit/dl-file-cell/dl-file-cell --flat  --skip-tests --dry-run
 //---

 //--- modals-modules
 src\app\shared\modules\modals\new-shipment-modal
 ng g m shared/modules/modals/new-shipment-modal/new-shipment-modal --flat --dry-run
 ng g s shared/modules/modals/new-shipment-modal/new-shipment-modal --flat --skip-tests --dry-run
 ng g m shared/modules/modals/pin-modal/pin-modal --flat --dry-run
 ng g s shared/modules/modals/pin-modal/pin-modal --flat --skip-tests --dry-run
 //---

 //--- request-failure-modal
 src\app\shared\modules\modals\request-failure-modal
 ng g m shared/modules/modals/request-failure-modal/request-failure-modal --flat --dry-run
 ng g s shared/modules/modals/request-failure-modal/request-failure-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/request-failure-modal/request-failure-modal --flat --skip-tests --dry-run
 //---

 //--- invoice-page-modal
 src\app\shared\modules\modals\invoice-page-modal
 ng g m shared/modules/modals/invoice-page-modal/invoice-page-modal --flat --dry-run
 ng g s shared/modules/modals/invoice-page-modal/invoice-page-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/invoice-page-modal/invoice-page-modal --flat --skip-tests --dry-run
 //---

 //--- register-agent-page-modal
 src\app\shared\modules\modals\register-agent-page-modal
 ng g m shared/modules/modals/register-agent-page-modal/register-agent-page-modal --flat --dry-run
//  ng g s shared/modules/modals/register-agent-page-modal/register-agent-page-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/register-agent-page-modal/register-agent-page-modal --flat --skip-tests --dry-run
 //---

 //--- payments-page-modal
 src\app\shared\modules\modals\payments-page-modal
 ng g m shared/modules/modals/payments-page-modal/payments-page-modal --flat --dry-run
 ng g s shared/modules/modals/payments-page-modal/payments-page-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/payments-page-modal/payments-page-modal --flat --skip-tests --dry-run
 //---

 //--- landing-request-modal
 src\app\shared\modules\modals\landing-request-modal
 ng g m shared/modules/modals/landing-request-modal/landing-request-modal --flat --dry-run
 ng g s shared/modules/modals/landing-request-modal/landing-request-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/landing-request-modal/landing-request-modal --flat --skip-tests --dry-run
 //---

 //--- landing-login-modal
 src\app\shared\modules\modals\landing-login-modal
 ng g m shared/modules/modals/landing-login-modal/landing-login-modal --flat --dry-run
 ng g s shared/modules/modals/landing-login-modal/landing-login-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/landing-login-modal/landing-login-modal --flat --skip-tests --dry-run
 //---

 //--- landing-agreement-modal
 src\app\shared\modules\modals\landing-agreement-modal
 ng g m shared/modules/modals/landing-agreement-modal/landing-agreement-modal --flat --dry-run
 ng g s shared/modules/modals/landing-agreement-modal/landing-agreement-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/landing-agreement-modal/landing-agreement-modal --flat --skip-tests --dry-run
 //---

 //--- free-duty-page-modal
 src\app\shared\modules\modals\free-duty-page-modal
 ng g m shared/modules/modals/free-duty-page-modal/free-duty-page-modal --flat --dry-run
 ng g s shared/modules/modals/free-duty-page-modal/free-duty-page-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/free-duty-page-modal/free-duty-page-modal --flat --skip-tests --dry-run
 //---

 //--- new-delays-page-modal
 src\app\shared\modules\modals\new-delays-page-modal
 ng g m shared/modules/modals/new-delays-page-modal/new-delays-page-modal --flat --dry-run
 ng g s shared/modules/modals/new-delays-page-modal/new-delays-page-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/new-delays-page-modal/new-delays-page-modal --flat --skip-tests --dry-run
 //---

 //--- requests-page-modal
 src\app\shared\modules\modals\requests-page-modal
//  ng g m shared/modules/modals/requests-page-modal/requests-page-modal --flat --dry-run
 ng g s shared/modules/modals/requests-page-modal/requests-page-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/requests-page-modal/requests-page-modal --flat --skip-tests --dry-run
 //---

 //--- demand-page-history-modal
 src\app\shared\modules\modals\demand-page-history-modal
 ng g m shared/modules/modals/demand-page-history-modal/demand-page-history-modal --flat --dry-run
//  ng g s shared/modules/modals/demand-page-history-modal/demand-page-history-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/demand-page-history-modal/demand-page-history-modal --flat --skip-tests --dry-run
 //---

 //--- contracts-factoring-modal
 src\app\shared\modules\modals\contracts-factoring-modal
 ng g m shared/modules/modals/contracts-factoring-modal/contracts-factoring-modal --flat --dry-run
//  ng g s shared/modules/modals/contracts-factoring-modal/contracts-factoring-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/contracts-factoring-modal/contracts-factoring-modal --flat --skip-tests --dry-run
 //---

 //--- documents-page-factoring-modal
 src\app\shared\modules\modals\documents-page-factoring-modal
 ng g m shared/modules/modals/documents-page-factoring-modal/documents-page-factoring-modal --flat --dry-run
//  ng g s shared/modules/modals/documents-page-factoring-modal/documents-page-factoring-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/documents-page-factoring-modal/documents-page-factoring-modal --flat --skip-tests --dry-run
 //---

 //--- request-info-modal
 src\app\shared\modules\modals\request-info-modal
 ng g m shared/modules/modals/request-info-modal/request-info-modal --flat --dry-run
 ng g s shared/modules/modals/request-info-modal/request-info-modal --flat --skip-tests --dry-run
 ng g c shared/modules/modals/request-info-modal/request-info-modal --flat --skip-tests --dry-run
 //---

// add m
ng g m shared/ui-kit/input --dry-run
ng g m shared/ui-kit/badge --dry-run
ng g m shared/ui-kit/checkbox --dry-run
ng g m shared/ui-kit/radio --dry-run
ng g m shared/ui-kit/tag --dry-run
ng g m shared/ui-kit/switch --dry-run

// add d
ng g d shared/ui-kit/input/directives/metib-input --skip-tests --dry-run
ng g d shared/ui-kit/input/directives/metib-pass-date --skip-tests --dry-run
ng g d shared/ui-kit/input/directives/metib-pass-time --skip-tests --dry-run

// public landing
src\app\public\pages
ng g c public/pages/landing --skip-tests --dry-run

// public single-news
src\app\public\pages
ng g c public/pages/single-news --skip-tests --dry-run

// public factoring
src\app\public\pages
ng g c public/pages/factoring --skip-tests --dry-run

// public finance
src\app\public\pages
ng g c public/pages/finance --skip-tests --dry-run

// public leasing
src\app\public\pages
ng g c public/pages/leasing --skip-tests --dry-run

// public corporate
src\app\public\pages
ng g c public/pages/corporate --skip-tests --dry-run

// public individual
src\app\public\pages
ng g c public/pages/individual --skip-tests --dry-run

// public landing
src\app\shared\modules
ng g m shared/modules/new-footer/new-footer --flat --dry-run
ng g c shared/modules/new-footer --skip-tests --dry-run

// public components advantages-icon
src\app\public\components
ng g i public/components/advantages-icon/interfaces/advantages-icon.interface  --dry-run
ng g m public/components/advantages-icon/advantages-icon --flat  --dry-run
ng g c public/components/advantages-icon/advantages-icon --flat  --skip-tests --dry-run
 //---

// public components contact-panel
src\app\public\components
ng g i public/components/contact-panel/interfaces/contact-panel.interface  --dry-run
ng g m public/components/contact-panel/contact-panel --flat  --dry-run
ng g c public/components/contact-panel/contact-panel --flat  --skip-tests --dry-run
 //---

// public components news-panel
src\app\public\components
ng g i public/components/news-panel/interfaces/news-panel.interface  --dry-run
ng g m public/components/news-panel/news-panel --flat  --dry-run
ng g c public/components/news-panel/news-panel --flat  --skip-tests --dry-run
 //---

// public components counter
src\app\public\components
ng g i public/components/counter/interfaces/counter.interface  --dry-run
ng g m public/components/counter/counter --flat  --dry-run
ng g c public/components/counter/counter --flat  --skip-tests --dry-run
 //---

// public components partner-panel
src\app\public\components
ng g i public/components/partner-panel/interfaces/partner-panel.interface  --dry-run
ng g m public/components/partner-panel/partner-panel --flat  --dry-run
ng g c public/components/partner-panel/partner-panel --flat  --skip-tests --dry-run
 //---

 //--- not-verify
src\app\client\modules\not-verify
ng g m client/modules/not-verify/not-verify --flat
ng g m client/modules/not-verify/not-verify --flat --routing --module=app
 //---

 //--- g
 src\app\shared\services\user-verify.guard.ts
 ng g g shared/services/not-verify
 //---

 //--- verify-drawer
src\app\client\modules\not-verify\modules\verify-drawer
ng g i client/modules/not-verify/modules/verify-drawer/interfaces/verify-drawer.interface  --dry-run
ng g m client/modules/not-verify/modules/verify-drawer/verify-drawer --flat --dry-run
ng g s client/modules/not-verify/modules/verify-drawer/verify-drawer --skip-tests --dry-run
ng g c client/modules/not-verify/modules/verify-drawer --skip-tests --dry-run
 //---

 //--- request-drawer
src\app\client\modules\not-verify\modules\request-drawer
ng g i client/modules/not-verify/modules/request-drawer/interfaces/request-drawer.interface  --dry-run
ng g m client/modules/not-verify/modules/request-drawer/request-drawer --flat --dry-run
ng g s client/modules/not-verify/modules/request-drawer/request-drawer --skip-tests --dry-run
ng g c client/modules/not-verify/modules/request-drawer --skip-tests --dry-run
 //---

 //--- request-drawer
 src\app\shared\modules\header\components\mobile-menu
 ng g c shared/modules/header/components/mobile-menu/mobile-menu --skip-tests
 //---

// public components swipe-text-slider
src\app\public\components
ng g i public/components/swipe-text-slider/interfaces/swipe-text-slider.interface  --dry-run
ng g m public/components/swipe-text-slider/swipe-text-slider --flat  --dry-run
ng g c public/components/swipe-text-slider/swipe-text-slider --flat  --skip-tests --dry-run
 //---

 // breakpoint-observer service
 src\app\shared\services\common
 ng g s shared/services/common/breakpoint-observer --skip-tests

```
