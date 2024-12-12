import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'mib-demand-surety-drawer-second-step',
  templateUrl: './demand-surety-drawer-second-step.component.html',
  styleUrls: ['./demand-surety-drawer-second-step.component.scss']
})
export class DemandSuretyDrawerSecondStepComponent {
  @Input() orgDataForm: FormGroup;
  @Input() options: [] = [];
  @Output() apply = new EventEmitter<void>()

  public confirmIds() {
    this.apply.emit();
  }
}
// {
//   "value": "ООО \"ПР\"",
//   "unrestricted_value": "ООО \"ПР\"",
//   "data": {
//   "kpp": "780501001",
//     "capital": null,
//     "invalid": null,
//     "management": {
//     "name": "Антошина Екатерина Юрьевна",
//       "post": "ГЕНЕРАЛЬНЫЙ ДИРЕКТОР",
//       "disqualified": null
//   },
//   "founders": null,
//     "managers": null,
//     "predecessors": null,
//     "successors": null,
//     "branch_type": "MAIN",
//     "branch_count": 0,
//     "source": null,
//     "qc": null,
//     "hid": "daa4e78fd9360a7e2ca46544a5861ef27564496eeb7c8cd96ddf2ad17060d592",
//     "type": "LEGAL",
//     "state": {
//     "status": "ACTIVE",
//       "code": null,
//       "actuality_date": 1714003200000,
//       "registration_date": 1553040000000,
//       "liquidation_date": null
//   },
//   "opf": {
//     "type": "2014",
//       "code": "12300",
//       "full": "Общество с ограниченной ответственностью",
//       "short": "ООО"
//   },
//   "name": {
//     "full_with_opf": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ПР\"",
//       "short_with_opf": "ООО \"ПР\"",
//       "latin": null,
//       "full": "ПР",
//       "short": "ПР"
//   },
//   "inn": "7805746764",
//     "ogrn": "1197847066020",
//     "okpo": "36762866",
//     "okato": "40276000000",
//     "oktmo": "40338000000",
//     "okogu": "4210011",
//     "okfs": "34",
//     "okved": "46.90",
//     "okveds": null,
//     "authorities": null,
//     "documents": null,
//     "licenses": null,
//     "finance": {
//     "tax_system": null,
//       "income": null,
//       "expense": null,
//       "revenue": null,
//       "debt": null,
//       "penalty": null,
//       "year": null
//   },
//   "address": {
//     "value": "198096, Г.САНКТ-ПЕТЕРБУРГ, УЛ. КРОНШТАДТСКАЯ, Д. 9, К. 4 СТР 1, ПОМЕЩ. 28-Н ОФИС 504",
//       "unrestricted_value": "198096, Г.САНКТ-ПЕТЕРБУРГ, УЛ. КРОНШТАДТСКАЯ, Д. 9, К. 4 СТР 1, ПОМЕЩ. 28-Н ОФИС 504",
//       "invalidity": null,
//       "data": {
//       "postal_code": "198096",
//         "country": "Россия",
//         "country_iso_code": "RU",
//         "federal_district": "Северо-Западный",
//         "region_fias_id": "c2deb16a-0330-4f05-821f-1d09c93331e6",
//         "region_kladr_id": "7800000000000",
//         "region_iso_code": "RU-SPE",
//         "region_with_type": "г Санкт-Петербург",
//         "region_type": "г",
//         "region_type_full": "город",
//         "region": "Санкт-Петербург",
//         "area_fias_id": null,
//         "area_kladr_id": null,
//         "area_with_type": null,
//         "area_type": null,
//         "area_type_full": null,
//         "area": null,
//         "city_fias_id": "c2deb16a-0330-4f05-821f-1d09c93331e6",
//         "city_kladr_id": "7800000000000",
//         "city_with_type": "г Санкт-Петербург",
//         "city_type": "г",
//         "city_type_full": "город",
//         "city": "Санкт-Петербург",
//         "city_area": null,
//         "city_district_fias_id": null,
//         "city_district_kladr_id": null,
//         "city_district_with_type": "Кировский р-н",
//         "city_district_type": "р-н",
//         "city_district_type_full": "район",
//         "city_district": "Кировский",
//         "settlement_fias_id": null,
//         "settlement_kladr_id": null,
//         "settlement_with_type": null,
//         "settlement_type": null,
//         "settlement_type_full": null,
//         "settlement": null,
//         "street_fias_id": "a7ea22a3-8af4-4d87-b4d3-a2abc34f8dda",
//         "street_kladr_id": "78000000000064100",
//         "street_with_type": "ул Кронштадтская",
//         "street_type": "ул",
//         "street_type_full": "улица",
//         "street": "Кронштадтская",
//         "stead_fias_id": null,
//         "stead_cadnum": null,
//         "stead_type": null,
//         "stead_type_full": null,
//         "stead": null,
//         "house_fias_id": "df4ad1a4-bc7a-4e79-b038-d2b28197ddcb",
//         "house_kladr_id": "7800000000006410070",
//         "house_cadnum": "78:15:0008217:3051",
//         "house_flat_count": null,
//         "house_type": "д",
//         "house_type_full": "дом",
//         "house": "9",
//         "block_type": "к",
//         "block_type_full": "корпус",
//         "block": "4 стр 1",
//         "entrance": null,
//         "floor": null,
//         "flat_fias_id": null,
//         "flat_cadnum": null,
//         "flat_type": "помещ",
//         "flat_type_full": "помещение",
//         "flat": "28",
//         "flat_area": "-1",
//         "square_meter_price": "-1",
//         "flat_price": null,
//         "room_fias_id": null,
//         "room_cadnum": null,
//         "room_type": null,
//         "room_type_full": null,
//         "room": null,
//         "postal_box": null,
//         "fias_id": "df4ad1a4-bc7a-4e79-b038-d2b28197ddcb",
//         "fias_code": "78000000000000006410070",
//         "fias_level": "8",
//         "fias_actuality_state": "0",
//         "kladr_id": "7800000000006410070",
//         "geoname_id": "498817",
//         "capital_marker": "0",
//         "okato": "40276564000",
//         "oktmo": "40338000",
//         "tax_office": "7805",
//         "tax_office_legal": "7805",
//         "timezone": "UTC+3",
//         "geo_lat": "59.8709048",
//         "geo_lon": "30.2554396",
//         "beltway_hit": "IN_KAD",
//         "beltway_distance": null,
//         "metro": [
//         {
//           "name": "Автово",
//           "line": "Кировско-Выборгская",
//           "distance": 0.5
//         },
//         {
//           "name": "Кировский завод",
//           "line": "Кировско-Выборгская",
//           "distance": 1
//         },
//         {
//           "name": "Ленинский проспект",
//           "line": "Кировско-Выборгская",
//           "distance": 2.3
//         }
//       ],
//         "divisions": null,
//         "qc_geo": "1",
//         "qc_complete": null,
//         "qc_house": null,
//         "history_values": null,
//         "unparsed_parts": null,
//         "source": "198096, Г.САНКТ-ПЕТЕРБУРГ, УЛ. КРОНШТАДТСКАЯ, Д. 9, К. 4 СТР 1, ПОМЕЩ. 28-Н ОФИС 504",
//         "qc": "1"
//     }
//   },
//   "phones": null,
//     "emails": null,
//     "ogrn_date": 1553040000000,
//     "okved_type": "2014",
//     "employee_count": null
// }
// }
