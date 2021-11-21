import { Injectable } from '@angular/core';
// @ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
@Injectable({
    providedIn: 'root'
})
export class PrintService {

    constructor() { }

    private obtenerNombre(datos: any): string {
        return `${datos.bien.contribuyente.primerNombre} ${datos.bien.contribuyente.segundoNombre} ${datos.bien.contribuyente.primerApellido} ${datos.bien.contribuyente.segundoApellido}`
    }

    private blobToBase64(blob: any) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }



    generarPDF(datos: any, idImpuesto: string, codigoDeBarras: string, accion?: string) {
        console.log(JSON.stringify(datos));

        let docDefinition = {
            pageSize: 'LEGAL',
            header: [
                {
                    image: 'data:image/png;base64,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',
                    fit: [200, 200],
                    style: 'header',
                    alignment: 'left',
                }
            ],
            content: [
                {
                    image: codigoDeBarras,
                    fit: [200, 200],
                    alignment: 'right',
                },
                {
                    text: this.obtenerNombre(datos),
                    bold: true,
                    alignment: 'right',
                    style: 'profesor'
                },
                {
                    text: `ID Impuesto: ${idImpuesto}\n\n\n\n`,
                    bold: true,
                    alignment: 'left',
                    style: 'curso'
                },
                {
                    columns: [
                        {
                            text: `Bien:`,
                            style: 'bold'
                        },
                        {
                            text: `Estado:`,
                            style: 'bold'
                        },
                        {
                            text: `Base pago extra ordinario con pago voluntario:`,
                            style: 'bold'
                        },
                    ]
                },
                {
                    columns: [
                        {
                            text: `${datos.nombreTipoBien}`,
                        },
                        {
                            text: `${datos.bien.tipoBien.estado ? 'Vigente' : 'No vigente'}`,
                        },
                        {
                            text: `${datos.impuesto.basePagoExtraOrdinarioConPagoVoluntario}`,
                        },
                    ]
                },
                "\n\n",
                {
                    columns: [
                        {
                            text: `Base pago extraordinario:`,
                            style: 'bold'
                        },
                        {
                            text: `Base pago ordinario:`,
                            style: 'bold'
                        },
                        {
                            text: `Base pago ordinario con pago voluntario:`,
                            style: 'bold'
                        },
                    ]
                },
                {
                    columns: [
                        {
                            text: `${datos.impuesto.basePagoExtraordinario}`,
                        },
                        {
                            text: `${datos.impuesto.basePagoOrdinario}`,
                        },
                        {
                            text: `${datos.impuesto?.basePagoOrdinarioConPagoVoluntario}`,
                        },
                    ]
                },
                "\n\n",
                {
                    columns: [
                        {
                            text: `Fecha limite pago extra ordinario:`,
                            style: 'bold'
                        },
                        {
                            text: `Fecha limite pago ordinario:`,
                            style: 'bold'
                        },
                        {
                            text: `Periodicidad:`,
                            style: 'bold'
                        },
                    ]
                },
                {
                    columns: [
                        {
                            text: `${moment(datos.impuesto?.fechaLimitePagoExtraOrdinario).format('yyyy/MM/DD')}`,
                        },
                        {
                            text: `${moment(datos.impuesto?.fechaLimitePagoOrdinario).format('yyyy/MM/DD')}`,
                        },
                        {
                            text: ``,
                        },
                    ]
                },
                "\n\n",
                {
                    columns: [
                        {
                            text: `Obligatorio:`,
                            style: 'bold'
                        },
                        {
                            text: `Valor pago minimo con pago voluntario:`,
                            style: 'bold'
                        },
                        {
                            text: `Valor pago minimo extra ordinario:`,
                            style: 'bold'
                        },
                    ]
                },
                {
                    columns: [
                        {
                            text: `${datos.impuesto?.obligatorio ? 'Si' : 'No'}`,
                        },
                        {
                            text: `${datos.impuesto?.valorPagoMinimoConPagoVoluntario}`,
                        },
                        {
                            text: `${datos.impuesto?.valorPagoMinimoConPagoVoluntario}`,
                        },
                    ]
                },
                "\n\n",
                {
                    columns: [
                        {
                            text: `Valor pago minimo extra ordinario con pago voluntario:`,
                            style: 'bold'
                        },
                        {
                            text: `Valor pago minimo ordinario:`,
                            style: 'bold'
                        },
                        {
                            text: `Valor pago Total:`,
                            style: 'red'
                        },
                    ]
                },
                {
                    columns: [
                        {
                            text: `${datos.impuesto?.valorPagoMinimoExtraOrdinarioConPagoVoluntario}`,
                        },
                        {
                            text: `${datos.impuesto?.valorPagoMinimoOrdinario}`,
                        },
                        {
                            text: `${datos.valorTotalOrdinario}`,
                        },
                    ]
                },
            ],
            styles: {
                header: {
                    margin: [40, 30, 0, 0]
                },
                profesor: {
                    margin: [0, 40, 0, 0]
                },
                curso: {
                    margin: [0, 5, 0, 0]
                },
                table: {
                    margin: [0, 5, 0, 15]
                },
                bold: {
                    bold: true,
                    color: 'black'
                },
                red: {
                    bold: true,
                    color: 'red'
                },
            }
        };

        switch (accion) {
            case 'descargar':
                pdfMake.createPdf(docDefinition).download();
                break;
            case 'imprimir':
                pdfMake.createPdf(docDefinition).print();
                break;
            case 'abrir':
                pdfMake.createPdf(docDefinition).open();
                break;
            default:
                pdfMake.createPdf(docDefinition).open();
                break;
        }
    }
}
