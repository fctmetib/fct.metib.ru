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
		const htmlContent = this.convertDataToHTML(data)
		// Создаем Blob из HTML-контента
		const blob = new Blob([htmlContent], {type: 'text/html'})

		// Используем saveAs из file-saver для скачивания файла
		saveAs(blob, `${beneficiaryName} - ${payerName}.html`)
	}

	convertDataToHTML(data: ExtendedClientInvoice) {
		const {
			payerName,
			payerINN,
			payerAccount,
			payerBankName,
			payerBankAccount,
			beneficiaryName,
			payerBic,
			paymentAbsid,
			paymentDate,
			accountDebet,
			accountCredit,
			dataAmount,
			paymentComment
		} = {
			payerName: data?.Payer?.Title,
			payerINN: data?.Payer?.INN,
			payerAccount: data?.Payer?.Account,
			payerBankName: data?.Payer?.BankName,
			payerBic: data.Payer?.BIC,
			payerBankAccount: data?.Payer?.BankAccount,
			beneficiaryName: data?.Beneficiary?.Title,
			paymentAbsid: data?.ABSID,
			paymentDate: data?.Date,
			accountDebet: data?.AccountDebet,
			accountCredit: data?.AccountCredit,
			dataAmount: data?.Amount,
			paymentComment: data?.Comment
		}

		const formattedDate = this.datePipe.transform(paymentDate, 'dd.MM.yyyy')
		const formattedAmount = this.rubPipe.transform(dataAmount)

		let html = `<html><head><title>${beneficiaryName} - ${payerName}</title></head><body>`
		html += `<html><body><div align="center">Платежное поручение № <b>${paymentAbsid}</b> от <b>${formattedDate} </b>.</div><br><br><div><table width="600" align="center" border="1" cellspacing="0" cellpadding="0"><tr><td align="center" valign="center" width="40%">${accountDebet} (Д)</td><td align="center" valign="center" width="40%">${accountCredit} (К)<td><td align="center" valign="center" width="20%" bgcolor="#DDDDDD">С: <b>{${formattedAmount}}</b></td></tr></table></div><br><br><div align="center"><table width="600" aling="center" border="0" cellspacing="0" cellpadding="0"><tr><td align="justify">${paymentComment}</td></tr></table></div><br><br><div align="center"><table align="center" width="600" cellspacing="0" cellpadding="0" border="1"><tr>`
		html += '<td align="left" width="150"><b>Получатель:</b></td>'
		html += `<td align="left" bgcolor="#DDDDDD">&nbsp;<b>${beneficiaryName}</b></td></tr>`
		html += ' <tr><td width="100">Город:</td><td>&nbsp;</td></tr>'
		html += ' <tr><td width="100">ИНН:</td><td>&nbsp;</td></tr>'
		html += ' <tr><td width="100">КПП:</td><td>&nbsp;</td></tr>'
		html += ` <tr><td width="100">Счет:</td><td>&nbsp;${accountCredit}</td></tr>`
		html += ' <tr><td width="100">Банк:</td><td>&nbsp;</td></tr>'
		html += ' <tr><td width="100">БИК:</td><td>&nbsp;</td></tr>'
		html += ' <tr><td width="100">Кор.счет:</td><td>&nbsp;</td></tr>'
		html += '</table></div><br>'
		html +=
			'<br><div align="center"><table align="center" width="600" cellspacing="0" cellpadding="0" border="1"><tr>'
		html += '<td align="left" width="150"><b>Плательщик:</b></td>'
		html += `<td align="left" bgcolor="#DDDDDD">&nbsp;<b>${payerName}</b></td>`
		html += '</tr>'
		html += '<tr><td width="100">Город:</td><td>&nbsp;</td></tr>'
		html += `<tr><td width="100">ИНН:</td><td>&nbsp;${payerINN}</td></tr>`
		html += '<tr><td width="100">КПП:</td><td>&nbsp;</td></tr>'
		html += `<tr><td width="100">Счет:</td><td>&nbsp;${payerAccount}</td></tr>`
		html += `<tr><td width="100">Банк:</td><td>&nbsp;${payerBankName}</td></tr>`
		html += `<tr><td width="100">БИК:</td><td>&nbsp;${payerBic}</td></tr>`
		html += `<tr><td width="100">Кор.счет:</td><td>&nbsp;${payerBankAccount}</td></tr>`
		html += '</table></div><br>'
		html += '</body></html>'
		return html
	}
}
