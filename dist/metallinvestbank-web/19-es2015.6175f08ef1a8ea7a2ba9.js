(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{BMXd:function(t,n,e){"use strict";e.r(n),e.d(n,"ContractsModule",function(){return St});var i=e("0s3d"),c=e("ofXK"),o=e("arFO"),s=e("QIUk"),r=e("jIHw"),a=e("rEr+"),l=e("lVkt"),b=e("+DzE"),p=e("+la4"),d=e("3Pt+"),h=e("7kUa"),g=e("Ji6n"),u=e("LuMj"),m=e("zFJ7"),f=e("b1Ni"),y=e("+F6F"),P=e("tyNb"),C=e("xrr7"),O=e("quSY"),D=e("fXoL");const v=new D.q("WindowToken","undefined"!=typeof window&&window.document?{providedIn:"root",factory:()=>window}:{providedIn:"root",factory:()=>{}});var w=e("XNiG");let M=(()=>{class t{constructor(t,n){this.document=t,this.window=n,this.copySubject=new w.a,this.copyResponse$=this.copySubject.asObservable(),this.config={}}configure(t){this.config=t}copy(t){if(!this.isSupported||!t)return this.pushCopyResponse({isSuccess:!1,content:t});const n=this.copyFromContent(t);return this.pushCopyResponse(n?{content:t,isSuccess:n}:{isSuccess:!1,content:t})}get isSupported(){return!!this.document.queryCommandSupported&&!!this.document.queryCommandSupported("copy")&&!!this.window}isTargetValid(t){if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');return!0}throw new Error("Target should be input or textarea")}copyFromInputElement(t,n=!0){try{this.selectTarget(t);const e=this.copyText();return this.clearSelection(n?t:void 0,this.window),e&&this.isCopySuccessInIE11()}catch(e){return!1}}isCopySuccessInIE11(){const t=this.window.clipboardData;return!(t&&t.getData&&!t.getData("Text"))}copyFromContent(t,n=this.document.body){if(this.tempTextArea&&!n.contains(this.tempTextArea)&&this.destroy(this.tempTextArea.parentElement||void 0),!this.tempTextArea){this.tempTextArea=this.createTempTextArea(this.document,this.window);try{n.appendChild(this.tempTextArea)}catch(i){throw new Error("Container should be a Dom element")}}this.tempTextArea.value=t;const e=this.copyFromInputElement(this.tempTextArea,!1);return this.config.cleanUpAfterCopy&&this.destroy(this.tempTextArea.parentElement||void 0),e}destroy(t=this.document.body){this.tempTextArea&&(t.removeChild(this.tempTextArea),this.tempTextArea=void 0)}selectTarget(t){return t.select(),t.setSelectionRange(0,t.value.length),t.value.length}copyText(){return this.document.execCommand("copy")}clearSelection(t,n){var e;t&&t.focus(),null===(e=n.getSelection())||void 0===e||e.removeAllRanges()}createTempTextArea(t,n){const e="rtl"===t.documentElement.getAttribute("dir");let i;return i=t.createElement("textarea"),i.style.fontSize="12pt",i.style.border="0",i.style.padding="0",i.style.margin="0",i.style.position="absolute",i.style[e?"right":"left"]="-9999px",i.style.top=(n.pageYOffset||t.documentElement.scrollTop)+"px",i.setAttribute("readonly",""),i}pushCopyResponse(t){this.copySubject.next(t)}pushCopyReponse(t){this.pushCopyResponse(t)}}return t.\u0275fac=function(n){return new(n||t)(D.Ub(c.e),D.Ub(v,8))},t.\u0275prov=Object(D.Gb)({factory:function(){return new t(Object(D.Ub)(c.e),Object(D.Ub)(v,8))},token:t,providedIn:"root"}),t})(),_=(()=>{class t{}return t.\u0275mod=D.Ib({type:t}),t.\u0275inj=D.Hb({factory:function(n){return new(n||t)},imports:[[c.c]]}),t})();var x=e("5EWq"),S=e("7zfz"),z=e("6t4m"),Q=e("/RsI"),F=e("jeV5"),T=e("xlun"),I=e("DVgK");const E=["paginator"];function k(t,n){if(1&t){const t=D.Rb();D.Qb(0,"div"),D.Qb(1,"button",12),D.Xb("click",function(){return D.yc(t),D.ac().showAllToggle()}),D.Pb(),D.Qb(2,"button",13),D.Xb("click",function(){return D.yc(t),D.ac().updateData()}),D.Pb(),D.Pb(),D.Qb(3,"div"),D.Qb(4,"p-dropdown",14),D.Xb("ngModelChange",function(n){return D.yc(t),D.ac().onDebtorChange(n)}),D.Pb(),D.Pb()}if(2&t){const t=D.ac();D.zb(1),D.ic("label",t.btnShowAllText),D.zb(3),D.hc("options",t.debtorsList)("ngModel",t.selectedDebtorDisplay)}}function L(t,n){1&t&&(D.Qb(0,"div",17),D.Qb(1,"div",18),D.Qb(2,"div",19),D.Lb(3,"p-skeleton",20),D.Pb(),D.Qb(4,"div",21),D.Lb(5,"p-skeleton",20),D.Pb(),D.Qb(6,"div",22),D.Lb(7,"p-skeleton",20),D.Pb(),D.Pb(),D.Qb(8,"div",23),D.Qb(9,"div",24),D.Lb(10,"p-skeleton",20),D.Pb(),D.Qb(11,"div",25),D.Hc(12,"\u0423\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u043e "),D.Pb(),D.Pb(),D.Qb(13,"div",26),D.Qb(14,"div",24),D.Lb(15,"p-skeleton",20),D.Pb(),D.Qb(16,"div",25),D.Hc(17,"\u041f\u0440\u043e\u0441\u0440\u043e\u0447\u043a\u0430"),D.Pb(),D.Pb(),D.Qb(18,"div",27),D.Qb(19,"div",24),D.Lb(20,"p-skeleton",20),D.Pb(),D.Qb(21,"div",25),D.Hc(22,"\u0421\u0432\u043e\u0431\u043e\u0434\u043d\u044b\u0439 \u043b\u0438\u043c\u0438\u0442"),D.Pb(),D.Pb(),D.Pb())}const A=function(){return[1,2,3,4,5]};function R(t,n){1&t&&(D.Ob(0),D.Qb(1,"div",15),D.Fc(2,L,23,0,"div",16),D.Pb(),D.Nb()),2&t&&(D.zb(2),D.hc("ngForOf",D.lc(1,A)))}function H(t,n){if(1&t){const t=D.Rb();D.Qb(0,"div",17),D.Qb(1,"div",18),D.Qb(2,"div",28),D.Qb(3,"div",29),D.Hc(4),D.Lb(5,"div",30),D.Pb(),D.Qb(6,"div",31),D.Qb(7,"div",32),D.Xb("click",function(){D.yc(t);const e=n.$implicit;return D.ac(2).showPropertyDialog(e.ID)}),D.Lb(8,"i",33),D.Pb(),D.Qb(9,"div",34),D.Xb("click",function(){D.yc(t);const e=n.$implicit;return D.ac(2).showShipmentsDialog(e.ID)}),D.Lb(10,"i",35),D.Pb(),D.Pb(),D.Pb(),D.Qb(11,"div",21),D.Hc(12),D.bc(13,"date"),D.Qb(14,"div",22),D.Qb(15,"span",36),D.Hc(16),D.Pb(),D.Hc(17),D.Pb(),D.Pb(),D.Pb(),D.Qb(18,"div",23),D.Qb(19,"div",24),D.Hc(20),D.bc(21,"currency"),D.Pb(),D.Qb(22,"div",25),D.Hc(23,"\u0423\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u043e"),D.Pb(),D.Pb(),D.Qb(24,"div",26),D.Qb(25,"div",24),D.Hc(26),D.bc(27,"currency"),D.Pb(),D.Qb(28,"div",25),D.Hc(29,"\u041f\u0440\u043e\u0441\u0440\u043e\u0447\u043a\u0430"),D.Pb(),D.Pb(),D.Qb(30,"div",27),D.Qb(31,"div",24),D.Hc(32),D.bc(33,"currency"),D.Pb(),D.Qb(34,"div",25),D.Hc(35,"\u0421\u0432\u043e\u0431\u043e\u0434\u043d\u044b\u0439 \u043b\u0438\u043c\u0438\u0442"),D.Pb(),D.Pb(),D.Pb()}if(2&t){const t=n.$implicit;D.zb(4),D.Jc(" ",t.Debtor.Title," "),D.zb(8),D.Kc("",t.Number," \u043e\u0442 ",D.dc(13,8,t.DateFrom,"dd.MM.yyyy")," "),D.zb(4),D.Jc("",t.Tariff,","),D.zb(1),D.Jc(" ",t.Delay.Count," \u043a.\u0434."),D.zb(3),D.Ic(D.dc(21,11,null==t||null==t.Statistics?null:t.Statistics.DutyCustomer,"RUB")),D.zb(6),D.Ic(D.dc(27,14,null==t||null==t.Statistics?null:t.Statistics.DutyDebtor,"RUB")),D.zb(6),D.Ic(D.dc(33,17,null==t||null==t.Statistics?null:t.Statistics.FreeLimit,"RUB"))}}function N(t,n){if(1&t&&(D.Qb(0,"div",15),D.Fc(1,H,36,20,"div",16),D.Pb()),2&t){const t=D.ac();D.zb(1),D.hc("ngForOf",t.listDisplayContracts)}}function $(t,n){1&t&&(D.Ob(0),D.Qb(1,"p",37),D.Hc(2,"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."),D.Pb(),D.Nb())}function j(t,n){1&t&&(D.Ob(0),D.Lb(1,"metib-backend-error-messages",39),D.Nb()),2&t&&(D.zb(1),D.hc("backendErrors","\u041e\u0448\u0438\u0431\u043a\u0430! \u0423 \u0412\u0430\u0441 \u043d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430, \u043a \u044d\u0442\u043e\u0439 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438."))}function B(t,n){if(1&t&&(D.Ob(0),D.Hc(1),D.Lb(2,"br"),D.Nb()),2&t){const t=n.$implicit;D.zb(1),D.Jc(" ",t," ")}}function U(t,n){if(1&t&&(D.Qb(0,"p",37),D.Fc(1,B,3,1,"ng-container",40),D.Pb()),2&t){const t=D.ac(2);D.zb(1),D.hc("ngForOf",t.getOrganizationList())}}function X(t,n){if(1&t&&(D.Fc(0,j,2,1,"ng-container",3),D.Fc(1,U,2,1,"ng-template",null,38,D.Gc)),2&t){const t=D.vc(2),n=D.ac();D.hc("ngIf",n.isOrganizationError)("ngIfElse",t)}}function J(t,n){if(1&t){const t=D.Rb();D.Qb(0,"p-button",41),D.Xb("click",function(){return D.yc(t),D.ac().copyDynamicText()}),D.Pb(),D.Qb(1,"p-button",42),D.Xb("click",function(){return D.yc(t),D.ac().displayProperty=!1}),D.Pb()}}function K(t,n){1&t&&(D.Ob(0),D.Qb(1,"p",37),D.Hc(2,"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."),D.Pb(),D.Nb())}function q(t,n){1&t&&(D.Ob(0),D.Lb(1,"metib-backend-error-messages",39),D.Nb()),2&t&&(D.zb(1),D.hc("backendErrors","\u041e\u0448\u0438\u0431\u043a\u0430!"))}const G=function(){return{minWidth:"200px"}};function W(t,n){if(1&t){const t=D.Rb();D.Qb(0,"p-multiSelect",48),D.Xb("ngModelChange",function(n){return D.yc(t),D.ac(3).selectedColumns=n}),D.Pb(),D.Qb(1,"div",49),D.Xb("click",function(){return D.yc(t),D.ac(3).exportExcel()}),D.Lb(2,"img",50),D.Pb()}if(2&t){const t=D.ac(3);D.Dc(D.lc(4,G)),D.hc("options",t.cols)("ngModel",t.selectedColumns)}}function V(t,n){if(1&t&&(D.Qb(0,"th"),D.Qb(1,"div",51),D.Qb(2,"div"),D.Hc(3),D.Pb(),D.Pb(),D.Pb()),2&t){const t=n.$implicit;D.zb(3),D.Jc(" ",t.header," ")}}function Z(t,n){if(1&t&&(D.Qb(0,"tr"),D.Fc(1,V,4,1,"th",40),D.Pb()),2&t){const t=n.$implicit;D.zb(1),D.hc("ngForOf",t)}}function Y(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",55),D.Qb(2,"div"),D.Hc(3),D.bc(4,"date"),D.Pb(),D.Pb(),D.Nb()),2&t){const t=D.ac().$implicit,n=D.ac().$implicit;D.zb(3),D.Jc(" ",D.dc(4,1,n[t.field],"dd.MM.yyyy")," ")}}function tt(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",55),D.Qb(2,"div"),D.Hc(3),D.bc(4,"date"),D.Pb(),D.Pb(),D.Nb()),2&t){const t=D.ac().$implicit,n=D.ac().$implicit;D.zb(3),D.Jc(" ",D.dc(4,1,n[t.field],"dd.MM.yyyy")," ")}}function nt(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",55),D.Qb(2,"div"),D.Hc(3),D.bc(4,"date"),D.Pb(),D.Pb(),D.Nb()),2&t){const t=D.ac().$implicit,n=D.ac().$implicit;D.zb(3),D.Jc(" ",D.dc(4,1,n[t.field],"dd.MM.yyyy")," ")}}function et(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",56),D.Qb(2,"div"),D.Hc(3),D.bc(4,"currency"),D.Pb(),D.Pb(),D.Nb()),2&t){const t=D.ac().$implicit,n=D.ac().$implicit;D.zb(3),D.Jc(" ",D.ec(4,1,n[t.field],"RUB","symbol-narrow")," ")}}function it(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",56),D.Qb(2,"div"),D.Hc(3),D.bc(4,"currency"),D.Pb(),D.Pb(),D.Nb()),2&t){const t=D.ac().$implicit,n=D.ac().$implicit;D.zb(3),D.Jc(" ",D.ec(4,1,n[t.field],"RUB","symbol-narrow")," ")}}function ct(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",56),D.Qb(2,"div"),D.Hc(3),D.bc(4,"currency"),D.Pb(),D.Pb(),D.Nb()),2&t){const t=D.ac().$implicit,n=D.ac().$implicit;D.zb(3),D.Jc(" ",D.ec(4,1,n[t.field],"RUB","symbol-narrow")," ")}}function ot(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",55),D.Qb(2,"div"),D.Hc(3),D.Pb(),D.Pb(),D.Nb()),2&t){const t=D.ac().$implicit,n=D.ac().$implicit;D.zb(3),D.Jc(" ",n[t.field]," ")}}function st(t,n){if(1&t&&(D.Qb(0,"td"),D.Ob(1,52),D.Fc(2,Y,5,4,"ng-container",53),D.Fc(3,tt,5,4,"ng-container",53),D.Fc(4,nt,5,4,"ng-container",53),D.Fc(5,et,5,5,"ng-container",53),D.Fc(6,it,5,5,"ng-container",53),D.Fc(7,ct,5,5,"ng-container",53),D.Fc(8,ot,4,1,"ng-container",54),D.Nb(),D.Pb()),2&t){const t=n.$implicit;D.zb(1),D.hc("ngSwitch",t.field),D.zb(1),D.hc("ngSwitchCase","DateAddon"),D.zb(1),D.hc("ngSwitchCase","DatePayment"),D.zb(1),D.hc("ngSwitchCase","DateShipment"),D.zb(1),D.hc("ngSwitchCase","Summ"),D.zb(1),D.hc("ngSwitchCase","DutyDebtor"),D.zb(1),D.hc("ngSwitchCase","DutyCustomer")}}function rt(t,n){if(1&t&&(D.Qb(0,"tr"),D.Fc(1,st,9,7,"td",40),D.Pb()),2&t){const t=n.columns;D.zb(1),D.hc("ngForOf",t)}}function at(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",57),D.Hc(2),D.bc(3,"currency"),D.Pb(),D.Nb()),2&t){const t=D.ac(5);D.zb(2),D.Jc(" ",D.ec(3,1,t.getSumDutyDebtor(),"RUB","symbol")," ")}}function lt(t,n){if(1&t&&(D.Ob(0),D.Qb(1,"div",57),D.Hc(2),D.bc(3,"currency"),D.Pb(),D.Nb()),2&t){const t=D.ac(5);D.zb(2),D.Jc(" ",D.ec(3,1,t.getSumDutyCustomer(),"RUB","symbol")," ")}}function bt(t,n){1&t&&D.Mb(0)}function pt(t,n){if(1&t&&(D.Qb(0,"td"),D.Ob(1,52),D.Fc(2,at,4,5,"ng-container",53),D.Fc(3,lt,4,5,"ng-container",53),D.Fc(4,bt,1,0,"ng-container",54),D.Nb(),D.Pb()),2&t){const t=n.$implicit;D.zb(1),D.hc("ngSwitch",t.field),D.zb(1),D.hc("ngSwitchCase","DutyDebtor"),D.zb(1),D.hc("ngSwitchCase","DutyCustomer")}}function dt(t,n){if(1&t&&(D.Qb(0,"tr"),D.Fc(1,pt,5,3,"td",40),D.Pb()),2&t){const t=D.ac(3);D.zb(1),D.hc("ngForOf",t.selectedColumns)}}function ht(t,n){if(1&t&&(D.Qb(0,"p-table",44),D.Fc(1,W,3,5,"ng-template",45),D.Fc(2,Z,2,1,"ng-template",46),D.Fc(3,rt,2,1,"ng-template",47),D.Fc(4,dt,2,1,"ng-template",9),D.Pb()),2&t){const t=D.ac(2);D.hc("columns",t.selectedColumns)("value",t.currentShipments)}}function gt(t,n){if(1&t&&(D.Fc(0,q,2,1,"ng-container",3),D.Fc(1,ht,5,2,"ng-template",null,43,D.Gc)),2&t){const t=D.vc(2),n=D.ac();D.hc("ngIf",n.isShipmentsError)("ngIfElse",t)}}function ut(t,n){if(1&t){const t=D.Rb();D.Qb(0,"p-button",58),D.Xb("click",function(){return D.yc(t),D.ac().displayProperty=!1}),D.Pb()}}function mt(t,n){if(1&t){const t=D.Rb();D.Qb(0,"p-button",58),D.Xb("click",function(){return D.yc(t),D.ac().displayShipments=!1}),D.Pb()}}const ft=function(t){return{hidden:t}},yt=function(){return{width:"50vw"}},Pt=function(){return{width:"90vw"}},Ct=[{path:"",children:[{path:"",component:(()=>{class t{constructor(t,n){this.deliveryService=t,this._clipboardService=n,this.noFilter=!0,this.isLoading=!1,this.listContracts=[],this.listContractsFiltered=[],this.isPagination=!0,this.btnShowAllText="\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0451",this.listDisplayContracts=[],this.type="current",this.paginationPage=0,this.paginationRows=10,this.displayProperty=!1,this.displayShipments=!1,this.debtorsList=[],this.selectedDebtorDisplay={ID:0,Title:"\u0412\u0441\u0435"},this.selectedDebtor={ID:0,Title:"\u0412\u0441\u0435"},this.isOrganizationError=!1,this.isOrganizationLoading=!1,this.currentOrganization={ABSID:0,Account:{BIK:"",Bank:"",COR:"",Number:""},Accountant:"",CustomerID:0,DebtorID:0,Description:"",Email:"",ID:0,INN:"",KPP:"",LegalForm:"",OGRN:"",OKATO:"",OKPO:"",OKVED:"",RegDate:new Date,RegRegion:"",Signer:{FIO:"",Position:"",Reason:""},State:"",Telephone:"",Title:"",WebSite:""},this.isShipmentsError=!1,this.isShipmentsLoading=!1,this.currentShipments=[],this.subscription$=new O.a}get selectedColumns(){return this._selectedColumns}ngOnInit(){this.fetch(),this.cols=[{field:"ID",header:"ID"},{field:"Account",header:"\u0410\u043a\u043a\u0430\u0443\u043d\u0442"},{field:"DateAddon",header:"\u0414\u0430\u0442\u0430 \u0434\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f"},{field:"DatePayment",header:"\u0414\u0430\u0442\u0430 \u043e\u043f\u043b\u0430\u0442\u0430"},{field:"DateShipment",header:"\u0414\u0430\u0442\u0430 \u043f\u043e\u0441\u0442\u0430\u0432\u043a\u0438"},{field:"DutyCustomer",header:"\u0417\u0430\u0434\u043e\u043b\u0436\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u0434\u0435\u0431\u0442\u043e\u0440\u0430"},{field:"DutyDebtor",header:"\u0417\u0430\u0434\u043e\u043b\u0436\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u043a\u043b\u0438\u0435\u043d\u0442\u0430"}],this._selectedColumns=this.cols}set selectedColumns(t){this._selectedColumns=this.cols.filter(n=>t.includes(n))}showPropertyDialog(t){this.displayProperty=!0,this.isOrganizationLoading=!0,this.isOrganizationError=!1,this.subscription$.add(this.deliveryService.getRequisitesByDeliveryId(t).subscribe(t=>{this.currentOrganizationContent=t,this.isOrganizationLoading=!1},t=>{this.isOrganizationError=!0,this.isOrganizationLoading=!1}))}getSumDutyDebtor(){if(this.cols.find(t=>"DutyDebtor"===t.field))return this.currentShipments.reduce((t,n)=>t+n.DutyDebtor,0)}getSumDutyCustomer(){if(this.cols.find(t=>"DutyCustomer"===t.field))return this.currentShipments.reduce((t,n)=>t+n.DutyCustomer,0)}showShipmentsDialog(t){this.displayShipments=!0,this.isShipmentsLoading=!0,this.isShipmentsError=!1,this.subscription$.add(this.deliveryService.getShipments(t).subscribe(t=>{this.currentShipments=t,this.isShipmentsLoading=!1},t=>{this.isShipmentsError=!0,this.isShipmentsLoading=!1}))}getAccountInfo(t){let n=this.currentShipments.find(n=>n.ID===t);return n.Waybill?n.Waybill:n.Account?n.Account:n.Request.Number?n.Request.Number:""}getOrganizationList(){if(!this.currentOrganizationContent)return;let t=[];return t=this.currentOrganizationContent.split("\n"),t}copyDynamicText(){this._clipboardService.copyFromContent(this.currentOrganizationContent)}showAllToggle(){"all"===this.type?(this.btnShowAllText="\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0451",this.type="current"):"current"===this.type&&(this.btnShowAllText="\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0435",this.type="all"),this.updateDisplayData(this.type,this.selectedDebtor.ID)}updateDisplayData(t,n){let e=this.listContracts,i=[];"current"===t&&(i=this.getCurrentList(e)),"all"===t&&(i=e);let c=[];c=n?i.filter(t=>t.Debtor.ID===n):i,this.listContractsFiltered=c,this.paginateData()}paginateData(t){if(this.listDisplayContracts=[],t){this.paginationPage=t.page;let n=t.page*t.rows;this.listDisplayContracts=this.listContractsFiltered.slice(n,n+t.rows)}else{let t=this.paginationPage*this.paginationRows;this.updateCurrentPage(t),this.listDisplayContracts=this.listContractsFiltered.slice(t,t+this.paginationRows)}}getCurrentList(t){return t.filter(t=>new Date(t.DateTo)>new Date)}updateData(){this.fetch()}paginate(t){if(this.noFilter=!0,this.listDisplayContracts=[],t){this.paginationPage=t.page;let n=t.page*t.rows;this.listDisplayContracts=this.listContractsFiltered.slice(n,n+t.rows)}else{let t=this.paginationPage*this.paginationRows;this.updateCurrentPage(t),this.listDisplayContracts=this.listContractsFiltered.slice(t,t+this.paginationRows)}}onDebtorChange(t){if(0===t)this.selectedDebtor={ID:0,Title:"\u0412\u0441\u0435"},this.btnShowAllText="\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0451",this.type="current",this.updateDisplayData(this.type,this.selectedDebtor.ID);else{let n=this.debtorsList.find(n=>n.ID===t);this.selectedDebtor={ID:t,Title:n.Title},this.paginationPage=0,this.paginationRows=10,this.updateDisplayData(this.type,this.selectedDebtor.ID)}}fetch(){this.isLoading=!0,this.subscription$.add(this.deliveryService.getDeliveriesWithStats().subscribe(t=>{this.listContracts=t.sort((t,n)=>new Date(n.DateFrom).getTime()-new Date(t.DateFrom).getTime()),this.filterByDate(),this.paginate(),this.selectedDebtorDisplay={ID:0,Title:"\u0412\u0441\u0435"},this.selectedDebtor={ID:0,Title:"\u0412\u0441\u0435"},this.debtorsList=[{ID:0,Title:"\u0412\u0441\u0435"}];let n=this.listContracts.map(t=>t.Debtor),e=C.a.getUniqByProperty(n,"Title");this.debtorsList.push(...e),this.isLoading=!1}))}updateCurrentPage(t){this.paginator.changePage(t)}filterByDate(){this.listContractsFiltered=this.listContracts.filter(t=>new Date(t.DateTo)>new Date),console.log(this.listContractsFiltered)}ngOnDestroy(){this.subscription$.unsubscribe()}exportExcel(){e.e(5).then(e.t.bind(null,"EUZL",7)).then(t=>{let n=[];console.log("shipments",this.currentShipments),console.log("cols",this.cols),this.currentShipments.forEach(t=>{let e={};this.cols.forEach(n=>{e[n.field]=t[n.field]}),n.push(e)});const e=t.utils.json_to_sheet(n),i=t.write({Sheets:{data:e},SheetNames:["data"]},{bookType:"xlsx",type:"array"});this._saveAsExcelFile(i,"\u043e\u0442\u0447\u0435\u0442")})}_saveAsExcelFile(t,n){e.e(7).then(e.t.bind(null,"Iab2",7)).then(e=>{const i=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});e.saveAs(i,n+"_export_"+(new Date).getTime()+".xlsx")})}}return t.\u0275fac=function(n){return new(n||t)(D.Kb(i.a),D.Kb(M))},t.\u0275cmp=D.Eb({type:t,selectors:[["app-contracts-page"]],viewQuery:function(t,n){if(1&t&&D.Nc(E,!0),2&t){let t;D.uc(t=D.Yb())&&(n.paginator=t.first)}},inputs:{selectedColumns:"selectedColumns"},decls:19,vars:27,consts:[["id","step1",1,"card-content"],["styleClass","p-mb-4 ml-0 additional-actions"],["pTemplate","left"],[4,"ngIf","ngIfElse"],["contentTemplate",""],[3,"rows","totalRecords","ngClass","onPageChange"],["paginator",""],["header","\u0420\u0435\u043a\u0432\u0438\u0437\u0438\u0442\u044b",3,"visible","modal","baseZIndex","draggable","resizable","visibleChange"],["organizationTemplate",""],["pTemplate","footer"],["header","\u0422\u043e\u0432\u0430\u0440\u043d\u044b\u0435 \u041d\u0430\u043a\u043b\u0430\u0434\u043d\u044b\u0435",3,"visible","modal","baseZIndex","draggable","resizable","visibleChange"],["shipmentsTemplate",""],["type","button","pButton","",1,"basic","p-mr-2",3,"label","click"],["type","button","pButton","","label","\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435",1,"basic","p-mr-2",3,"click"],["placeholder","\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0431\u0438\u0442\u043e\u0440\u0430","optionLabel","Title","optionValue","ID",1,"fix-width--200",3,"options","ngModel","ngModelChange"],[1,"contracts-list"],["class","contract-item",4,"ngFor","ngForOf"],[1,"contract-item"],[1,"contract-info","item"],[1,"contract-name"],["width","10rem","styleClass","p-mb-2"],[1,"contract-number"],[1,"contract-type"],[1,"contract-step","item"],[1,"price"],[1,"description"],[1,"contract-delay","item"],[1,"contract-limit","item"],[1,"contract-info-name"],[1,"contract-name","can-click"],[1,"icon","arrow_right"],[1,"contract-actions"],["pTooltip","\u0420\u0435\u043a\u0432\u0438\u0437\u0438\u0442\u044b",1,"icon",3,"click"],[1,"pi","pi-book"],["pTooltip","\u0421\u043f\u0438\u0441\u043e\u043a \u043d\u0430\u043a\u043b\u0430\u0434\u043d\u044b\u0445",1,"icon",3,"click"],[1,"pi","pi-list"],[1,"main-color"],[1,"p-m-0"],["noErrorOrganizationTemplate",""],[3,"backendErrors"],[4,"ngFor","ngForOf"],["label","\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c","styleClass","p-button-text",3,"click"],["label","\u0417\u0430\u043a\u0440\u044b\u0442\u044c","styleClass","p-button-text",3,"click"],["noErrorShipmentsTemplate",""],["dataKey","ID","styleClass","p-datatable-customers mib-table header-add h-500",3,"columns","value"],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["optionLabel","header","selectedItemsLabel","\u0412\u044b\u0431\u0440\u0430\u043d\u043e \u043a\u043e\u043b\u043e\u043d\u043e\u043a - {0}","placeholder","\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u043e\u043b\u043e\u043d\u043a\u0438",3,"options","ngModel","ngModelChange"],["pTooltip","\u042d\u043a\u0441\u043f\u043e\u0440\u0442 \u0444\u0430\u0439\u043b\u0430 Excel",1,"mib-action","mib-button-icon","excel-icon","can-click",3,"click"],["src","../../../../../../assets/icons/mib-excel.png","alt",""],[1,"m-th"],[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],[1,"m-td"],[1,"m-td","currency"],[2,"text-align","right"],["icon","pi pi-check","label","\u0417\u0430\u043a\u0440\u044b\u0442\u044c","styleClass","p-button-text",3,"click"]],template:function(t,n){if(1&t&&(D.Qb(0,"div",0),D.Qb(1,"p-toolbar",1),D.Fc(2,k,5,3,"ng-template",2),D.Pb(),D.Fc(3,R,3,2,"ng-container",3),D.Fc(4,N,2,1,"ng-template",null,4,D.Gc),D.Qb(6,"p-paginator",5,6),D.Xb("onPageChange",function(t){return n.paginate(t)}),D.Pb(),D.Pb(),D.Qb(8,"p-dialog",7),D.Xb("visibleChange",function(t){return n.displayProperty=t}),D.Fc(9,$,3,0,"ng-container",3),D.Fc(10,X,3,2,"ng-template",null,8,D.Gc),D.Fc(12,J,2,0,"ng-template",9),D.Pb(),D.Qb(13,"p-dialog",10),D.Xb("visibleChange",function(t){return n.displayShipments=t}),D.Fc(14,K,3,0,"ng-container",3),D.Fc(15,gt,3,2,"ng-template",null,11,D.Gc),D.Fc(17,ut,1,0,"ng-template",9),D.Fc(18,mt,1,0,"ng-template",9),D.Pb()),2&t){const t=D.vc(5),e=D.vc(11),i=D.vc(16);D.zb(3),D.hc("ngIf",n.isLoading)("ngIfElse",t),D.zb(3),D.ic("totalRecords",n.listContractsFiltered.length),D.hc("rows",10)("ngClass",D.mc(23,ft,!n.noFilter)),D.zb(2),D.Dc(D.lc(25,yt)),D.hc("visible",n.displayProperty)("modal",!0)("baseZIndex",1e4)("draggable",!1)("resizable",!1),D.zb(1),D.hc("ngIf",n.isOrganizationLoading)("ngIfElse",e),D.zb(4),D.Dc(D.lc(26,Pt)),D.hc("visible",n.displayShipments)("modal",!0)("baseZIndex",1e4)("draggable",!1)("resizable",!1),D.zb(1),D.hc("ngIf",n.isShipmentsLoading)("ngIfElse",i)}},directives:[x.a,S.i,c.n,z.a,c.l,Q.a,r.b,o.a,d.p,d.s,c.m,F.a,T.a,I.a,r.a,a.h,l.a,c.p,c.q,c.r],pipes:[c.f,c.d],styles:[".contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]{display:flex;margin-bottom:10px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{padding:12px;border-radius:10px;border:1px solid #d4d4d4}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-info[_ngcontent-%COMP%]{width:100%;min-width:400px;display:flex;flex-direction:column;justify-content:center}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-info[_ngcontent-%COMP%]   .contract-info-name[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-info[_ngcontent-%COMP%]   .contract-actions[_ngcontent-%COMP%]{display:flex;margin-bottom:10px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-info[_ngcontent-%COMP%]   .contract-actions[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{margin-right:10px;font-size:2rem;color:#0c83f1}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-info[_ngcontent-%COMP%]   .contract-actions[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   .icon-own[_ngcontent-%COMP%]{font-size:2rem;color:#0c83f1}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-info[_ngcontent-%COMP%]   .contract-name[_ngcontent-%COMP%]{display:flex;font-size:1.2rem;font-weight:500;margin-bottom:8px;align-items:center}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-info[_ngcontent-%COMP%]   .contract-name[_ngcontent-%COMP%]   .icon.arrow_right[_ngcontent-%COMP%]{margin-left:13px;background:url(/assets/icons/arrow_right.png) no-repeat 50%;width:20px;height:20px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-info[_ngcontent-%COMP%]   .contract-number[_ngcontent-%COMP%]{font-size:.875rem;margin-bottom:9px;color:#989898;display:flex;justify-content:space-between}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-step[_ngcontent-%COMP%]{text-align:center;width:40%;min-width:220px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-step[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#69cf74;height:47px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-step[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:.875rem;display:flex;align-items:center;justify-content:center}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-step[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{margin-left:10px;font-size:2rem;color:#0c83f1}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-delay[_ngcontent-%COMP%]{text-align:center;width:40%;min-width:220px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-delay[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#e74630;height:47px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-delay[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:.875rem;justify-content:end}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-limit[_ngcontent-%COMP%]{text-align:center;width:40%;min-width:220px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-limit[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#0c83f1;height:47px}.contracts-list[_ngcontent-%COMP%]   .contract-item[_ngcontent-%COMP%]   .contract-limit[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:.875rem;justify-content:end}.contracts-list[_ngcontent-%COMP%]   .main-color[_ngcontent-%COMP%]{color:#0c83f1}.p-dialog-content[_ngcontent-%COMP%]{height:500px!important}[_nghost-%COMP%]   .p-datatable[_ngcontent-%COMP%]   .p-datatable-header[_ngcontent-%COMP%]{padding-left:0;padding-right:0;display:flex;justify-content:space-between}"]}),t})()}]}];let Ot=(()=>{class t{}return t.\u0275mod=D.Ib({type:t}),t.\u0275inj=D.Hb({factory:function(n){return new(n||t)},imports:[[P.j.forChild(Ct)],P.j]}),t})();var Dt=e("B16f"),vt=e("i4ku"),wt=e("eUBX"),Mt=e("AytR"),_t=e("tk/3");let xt=(()=>{class t{constructor(t){this.http=t}getAccounts(){return this.http.get(Mt.a.apiUrl+"/accounts")}}return t.\u0275fac=function(n){return new(n||t)(D.Ub(_t.b))},t.\u0275prov=D.Gb({token:t,factory:t.\u0275fac}),t})(),St=(()=>{class t{}return t.\u0275mod=D.Ib({type:t}),t.\u0275inj=D.Hb({factory:function(n){return new(n||t)},providers:[i.a,wt.a,xt],imports:[[c.c,h.b,g.b,r.c,u.a,m.b,p.a,Q.b,a.k,F.b,vt.a,o.b,z.b,x.b,T.b,Dt.b,_,d.j,b.b,l.b,d.v,s.b,f.a,y.a,Ot]]}),t})()}}]);