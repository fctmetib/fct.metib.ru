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

 //--- add header module
src\app\shared\modules\header\header.component.html
ng g m shared/modules/header/header --flat --dry-run
 //---

 //--- new-demand
src\app\shared\modules\new-demand
ng g m shared/modules/new-demand/new-demand --flat --dry-run
ng g i shared/modules/new-demand/interfaces/new-demand.interface --dry-run
ng g c shared/modules/new-demand/new-demand --flat --skip-tests  --dry-run
 //---

 //--- demand-drawer
src\app\client\modules\demand-new\modules\demand-drawer
ng g i client/modules/demand-new/modules/demand-drawer/interfaces/demand-drawer.interface  --dry-run
ng g m client/modules/demand-new/modules/demand-drawer/demand-drawer --flat --dry-run
ng g s client/modules/demand-new/modules/demand-drawer/demand-drawer --skip-tests --dry-run
ng g c client/modules/demand-new/modules/demand-drawer --skip-tests --dry-run
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

 //--- invoice
src\app\client\modules\invoices
ng g c client/modules/invoices/pages/invoice-page --skip-tests --dry-run
 //---

 //--- toaster
src\app\shared\ui-kit\
ng g i shared/ui-kit/toaster/interfaces/toaster.interface  --dry-run
ng g m shared/ui-kit/toaster/toaster --flat  --dry-run
ng g c shared/ui-kit/toaster/toaster --flat  --skip-tests --dry-run
 //---

 //--- media
src\app\shared\ui-kit\media
ng g i shared/ui-kit/media/interfaces/media.interface  --dry-run
ng g m shared/ui-kit/media/media --flat  --dry-run
ng g c shared/ui-kit/media/media --flat  --skip-tests --dry-run
 //---

 //--- file-cell
src\app\shared\ui-kit\file-cell
ng g i shared/ui-kit/file-cell/interfaces/file-cell.interface  --dry-run
ng g m shared/ui-kit/file-cell/file-cell --flat  --dry-run
ng g c shared/ui-kit/file-cell/file-cell --flat  --skip-tests --dry-run
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
```
