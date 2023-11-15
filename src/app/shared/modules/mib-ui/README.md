```js
// add i
ng g i shared/ui-kit/button/interfaces/button.interface --dry-run
 ng g i shared/ui-kit/input/interfaces/input.interface --dry-run
// add comp
ng g c shared/ui-kit/button/button --flat --skip-tests --dry-run
 ng g c shared/ui-kit/input/input --flat --skip-tests --dry-run
// add m
ng g m shared/ui-kit/button --dry-run
ng g m shared/ui-kit/input --dry-run
// add accepting component module
ng g m shared/modules/mib-ui --dry-run

```

![Alt text](readmeAccets/test_btn.png)

![Alt text](readmeAccets/test_input.png)
