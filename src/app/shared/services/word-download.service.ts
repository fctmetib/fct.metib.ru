import {Injectable} from '@angular/core'
import {Packer, Document, Paragraph, TextRun} from 'docx'
import {saveAs} from 'file-saver'
import {ExtendedClientInvoice} from 'src/app/client/modules/invoices/interfaces/client.invoice'
import {DatePipe} from '@angular/common'
import {RubPipe} from '../pipes/rub/rub.pipe'

@Injectable({
	providedIn: 'root'
})
export class WordDownloadService {
	// constructor() {}
	constructor(private datePipe: DatePipe, private rubPipe: RubPipe) {}

	public downloadDocWithText(text: string, name: string = 'requisites'): void {
		const doc = new Document({
			sections: [
				{
					properties: {},
					children: [
						new Paragraph({
							children: [new TextRun(text)]
						})
					]
				}
			]
		})

		// Генерация документа и его сохранение
		Packer.toBlob(doc)
			.then(blob => {
				saveAs(blob, `${name}.docx`)
			})
			.catch(err => console.error(err))
	}

	downloadDataAsHTML(data: ExtendedClientInvoice) {
		const {payerName, beneficiaryName} = {
			payerName: data.Payer.Title,
			beneficiaryName: data.Beneficiary.Title
		}
		const htmlContent = this.convertDataToHTML(data) // Преобразуем данные в HTML
		// Создаем Blob из HTML-контента
		const blob = new Blob([htmlContent], {type: 'text/html'})

		// Используем saveAs из file-saver для скачивания файла
		saveAs(blob, `${beneficiaryName} - ${payerName}.html`)
	}

	convertDataToHTML(data: ExtendedClientInvoice) {
		const {
			payerName,
			beneficiaryName,
			paymentOrder,
			paymentDate,
			accountDebet,
			accountCredit,
			dataAmount
		} = {
			payerName: data.Payer.Title,
			beneficiaryName: data.Beneficiary.Title,
			paymentOrder: data.PaymentLinks[0].Shipment.Delivery.Title,
			paymentDate: data.Date,
			accountDebet: data.AccountDebet,
			accountCredit: data.AccountCredit,
			dataAmount: data.Amount
		}

		const formattedDate = this.datePipe.transform(paymentDate, 'dd.MM.yyyy')
		const formattedAmount = this.rubPipe.transform(dataAmount)

		let html = `<html><head><title>${beneficiaryName} - ${payerName}</title></head><body>`
		html += `<html><body><div align="center">Платежное поручение № <b>${paymentOrder}</b> от <b>${formattedDate} </b>.</div><br><br><div><table width="700" align="center" border="1" cellspacing="0" cellpadding="0"><tr><td align="center" valign="center" width="40%">${accountDebet} (Д)</td><td align="center" valign="center" width="40%">${accountCredit} (К)<td><td align="center" valign="center" width="20%" bgcolor="#DDDDDD">С: <b>{${formattedAmount}}</b></td></tr></table></div><br><br><div align="center"><table width="600" aling="center" border="0" cellspacing="0" cellpadding="0"><tr><td align="justify">Оплата по договору № ДП-020215-1 от 02.02.2015 за бытовую технику , по УПД от 14.03.2024( факторинг). RN24565062048070 В т.ч. НДС (20 %) 10532-40</td></tr></table></div><br><br><div align="center"><table align="center" width="600" cellspacing="0" cellpadding="0" border="1"><tr>`
		// <td align='left' width='150'><b>Получатель:</b></td>
		// <td align='left' bgcolor='#DDDDDD'>&nbsp;<b>ДРИВИКС ООО</b></td>
		// </tr>
		// <tr><td width='100'>Город:</td><td>&nbsp;</td></tr>
		// <tr><td width='100'>ИНН:</td><td>&nbsp;</td></tr>
		// <tr><td width='100'>КПП:</td><td>&nbsp;</td></tr>
		// <tr><td width='100'>Счет:</td><td>&nbsp;612 12 810 2 0000 0013537</td></tr>
		// <tr><td width='100'>Банк:</td><td>&nbsp;</td></tr>
		// <tr><td width='100'>БИК:</td><td>&nbsp;</td></tr>
		// <tr><td width='100'>Кор.счет:</td><td>&nbsp;</td></tr>
		// </table></div><br>
		// <br><div align='center'><table align='center' width='600' cellspacing='0' cellpadding='0' border='1'><tr>
		// <td align='left' width='150'><b>Плательщик:</b></td>
		// <td align='left' bgcolor='#DDDDDD'>&nbsp;<b>ООО "ДНС Ритейл"</b></td>
		// </tr>
		// <tr><td width='100'>Город:</td><td>&nbsp;</td></tr>
		// <tr><td width='100'>ИНН:</td><td>&nbsp;2540167061</td></tr>
		// <tr><td width='100'>КПП:</td><td>&nbsp;</td></tr>
		// <tr><td width='100'>Счет:</td><td>&nbsp;40702810600100003410</td></tr>
		// <tr><td width='100'>Банк:</td><td>&nbsp;ПАО СКБ Приморья "Примсоцбанк"</td></tr>
		// <tr><td width='100'>БИК:</td><td>&nbsp;040507803</td></tr>
		html +=
			'<tr><td width="100">Кор.счет:</td><td>&nbsp;30101810200000000803</td></tr>'
		html += '</table></div><br>'
		html += '</body></html>'
		return html
		/* 		
    рабочий тест
    let html = '<html><head><title>Data</title></head><body>'
		html += '<table><thead><tr><th>Заголовок 1</th></tr></thead><tbody>'
		// data.paymentParticipant.INN
		// data.paymentParticipant.BankName
		Object.entries(data.paymentParticipant).forEach(([_, value]) => {
			console.log(`${value}`)
			html += `<tr><td>${value}</td></tr>`
		})
		html += '</tbody></table></body></html>'
		return html */
	}
}
