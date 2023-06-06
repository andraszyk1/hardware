import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun,TableCell,TableRow,WidthType,Table as T} from "docx";
export const ProtokolKomputer=(item)=> {
 
    // if( isJsonObject(data[accessor])){
    //     return <td key={accessor}>{
    //         JSON.parse(data[accessor]).map((item,i) => {
    //             return i===0?item.value:", "+item.value  })}
    //         </td>

    const result1 = new Date().toLocaleDateString('en-GB');
    const TabelaNaglowek = new T({
        columnWidths: [3505, 5505],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Obrazek Maflow")],
                    }),
                    new TableCell({
                        width: {
                            size: 10015,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Protokół instalacji i powierzenia komputera")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("FI1.I2.F1")],
                    }),
                ],
            }),
           ],
    });

    const TabelaOpracowal = new T({
        columnWidths: [3505, 5505],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Rev.")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Data")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Opis zmian")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Opracował")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Zatwierdził")],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("01")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("10.07.2018")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Opracowanie dokumentu")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("L.Barszczewski")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("A.Podlipski")],
                    }),
                ],
            }),
           ],
    });

    
    const rowsTabelaSpecyfikacjaKomputera= JSON.parse(item.aplications).map((v,i)=>{
        return new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph((i+1).toString())],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph(v.label)],
                }),
               
            ],
        })
    })

    const TabelaSpecyfikacjaKomputera = new T({
        columnWidths: [3505, 5505],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("LP.")],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Nazwa")],
                    }),
                ],
            })
            ,...rowsTabelaSpecyfikacjaKomputera
        ]
    });
    

 const doc = new Document({
    
    creator: item.owner,
    description: "Protokół  przekazania komputera " ,
    title: "Protokół przekazania komputera " + item.computerName,
    styles: {
        paragraphStyles: [
            {
                id: "MySpectacularStyle",
                name: "My Spectacular Style",
                basedOn: "Heading1",
                next: "Heading1",
                quickFormat: true,
                run: {
                    italics: true,
                    color: "990000",
                },
            },
        ],
    },
    sections: [
        {
            properties: {},
            children: [
                
                TabelaNaglowek,
                new Paragraph({}),
                TabelaOpracowal,
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun("Toruń, dn "+ result1)
                    ],
                }),
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text:"PROTOKÓŁ INSTALACJI I POWIERZENIA Z OBOWIĄZKIEM ZWROTU KOMPUTERA ",
                            bold: true,
                        }),
                    ],
                }),
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Boryszew S.A. Oddział Maflow w Tychach z siedzibą w Tychach, ul. Serdeczna 42,43-100 Tychy, KRS 63824, REGON: 750010992, NIP: 8370000634, kapitał zakładowy 240.000.000 zł, opłacony w całości, zwany dalej: „Maflow” powierza Urządzenie z obowiązkiem zwrotu:`
                        }),
                   
                    ],
                }),
          
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun("Identyfikator użytkownika Windows:")
                    ],
                }),
           
                
            
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Użytkownik "+ item.userName + " ,dalej jako użytkownik RCP ID:",
                        
                        }),
                        new TextRun({
                            text: item.userRcp,
                            bold: true,
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Identyfikator użytkownika Windows:",
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Identyfikator użytkownika Poczty : "+item.email,
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Nazwa Komputera: "+item.computerName,
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "SPECYFIKACJA URZĄDZENIA :",
                            bold:true
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Typ komputera : " + item.typ,
                            bold:true
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Model komputera : " + item.model,
                            bold:true
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Numer seryjny komputera : " + item.sn,
                            bold:true
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "RAM : " + item.ram,
                            bold:true
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Nr inwentarzowy/leasing : " + item.sn,
                            bold:true
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Orientacyjna wartość : " + item.wartosc +"tyś",
                            bold:true
                           
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `dalej jako : "Urządzenie" lub "Komputer"`,  
                        }),
                   
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "SPECYFIKACJA OPROGRAMOWANIA: ",
                            bold:true  
                        }),
                   
                    ],
                }),
                TabelaSpecyfikacjaKomputera

            ],
        },
    ],
});

Packer.toBlob(doc).then(blob => {
    console.log(blob);
    saveAs(blob, "protokol przekazania komputera "+item.computerName +".docx");
    console.log("Document created successfully");
  });
}