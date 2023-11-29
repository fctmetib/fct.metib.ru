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

![Alt text](readmeAccets/test_btn.png)

![Alt text](readmeAccets/test_input.png)

// input

```js
// add i
 ng g i shared/ui-kit/input/interfaces/input.interface --dry-run
 ng g i shared/ui-kit/badge/interfaces/badge.interface --dry-run
// add comp
 ng g c shared/ui-kit/input/input --flat --skip-tests --dry-run
 ng g c shared/ui-kit/badge/badge --flat --skip-tests --dry-run
 ng g c shared/ui-kit/input/components/autocomplete --flat --skip-tests --dry-run
// add m
ng g m shared/ui-kit/input --dry-run
ng g m shared/ui-kit/badge --dry-run
// add d
ng g d shared/ui-kit/input/directives/metib-input --skip-tests --dry-run
ng g d shared/ui-kit/input/directives/metib-pass-date --skip-tests --dry-run
ng g d shared/ui-kit/input/directives/metib-pass-time --skip-tests --dry-run
```
