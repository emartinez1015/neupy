Ext.define('Neupy.view.RBFBINVVista', {
    extend: 'Ext.form.Panel',
    alias: 'widget.rbfbinvvista',
    id: 'tab_rbf_binv',
    autoShow: true,
    frame: true,
    layout: {
        type: 'border'
    },
    title: 'RBF BINV',

     initComponent: function() {
        var me = this;
        me.dockedItems = [
            {
                xtype: 'toolbar',
                region: 'center',
                dock: 'top',
                layout: {
                    pack: 'end',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        height: 70,
                        width: 84,
                        action: 'graficar_entrenamiento_rbf',
                        text: '<font size="0.1"> Grafica Datos <br> Entrenamiento </font>', // Salida Deseada y Salida de Red para Entrenameinto
                        iconAlign: 'top',
                        scale: 'large',
                        icon: 'resources/images/grafica_ent.png'
                    },
                    {
                        xtype: 'button',
                        height: 70,
                        width: 84,
                        action: 'graficar_test_rbf',
                        text: '<font size="0.1"> Grafica Datos <br> Test </font>',  // Salida Deseada y Salida de Red para test
                        iconAlign: 'top',
                        scale: 'large',
                        icon: 'resources/images/grafica_test.png'
                    },
                    {
                        xtype: 'button',
                        height: 70,
                        width: 84,
                        action: 'graficar_entrenamiento_error_rbf',
                        text: '<font size="0.1"> Grafica Error<br> Entrenamiento </font>', 
                        iconAlign: 'top',
                        scale: 'large',
                        icon: 'resources/images/grafica_error.png'
                    },
                    {
                        xtype: 'button',
                        height: 70,
                        width: 84,
                        action: 'graficar_test_error_rbf',
                        text: '<font size="0.1"> Grafica Error <br> Test </font>', 
                        iconAlign: 'top',
                        scale: 'large',
                        icon: 'resources/images/grafica_error.png'
                    },
                    {
                        xtype: 'button',
                        height: 70,
                        width: 84,
                        action: 'to_excel',
                        text: '<font size="0.1"> Exportar <br> Excel </font>', 
                        iconAlign: 'top',
                        scale: 'large',
                        icon: 'resources/images/Excel.png'
                    }
                
                ]
            }
        ];
        me.items = [
       
            {
                xtype: 'panel',
                layout: {
                    type: 'border'
                },
                title: '',
                region: 'center',
                items: [
                    {
                xtype: 'gridpanel',
                title: 'Datos de Test',
                region: 'center',
                id: 'grid_datos_rbf_test',
                store: Ext.create("Ext.data.Store",{
                   
                    fields: ['x1'],
                    data: [{x1: "No hay datos para mostrar"}]
                
                }),
                columns: [
                    {
                       
                        dataIndex: 'x1',
                        text: 'x1',
                        width: 150
                    }
                ],
                       
            dockedItems: [
                       
                {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        xtype: 'form',
                        frame: true,
                        id: 'f_upload_test_rbf',
                        height: 32,
                        width: 594,
                        layout: {
                            type: 'absolute'
                        },
                        bodyPadding: 10,
                        title: '',
                        items: [
                            {
                                xtype: 'filefield',
                                fieldLabel: 'Subir Datos',
                                name: 'datoscsvtest',
                                buttonText: 'Examinar...',
                                blankText : 'No ha selecionado un archivo',
                                allowBlank : false,
                                editable: false,
                                regex : /^(.+\.csv)$/,
                                regexText : 'Solo se aceptan archivos con extension .csv',
                                x: 10,
                                y: 0
                            },
                            {
                                xtype: 'button',
                                text: 'Importar Datos Csv',
                                action: 'subir_datos_test_rbf',
                                icon: 'resources/images/page_excel.png',
                                x: 350,
                                y: 0
                            }
                        ]
                    }
                ]
            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        width: 600,
                        title: 'Datos de Entrenamiento',
                        id: 'grid_datos_rbf_entrenamiento',
                        region: 'west',
                        store: Ext.create("Ext.data.Store",{
                        fields: ['x1'],
                        data: [{x1: "No hay datos para mostrar"}]
                
                }),
                columns: [
                    {
                       
                        dataIndex: 'x1',
                        text: 'x1',
                        width: 150
                    }
                ],
                       
             dockedItems: [
                       
                {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        xtype: 'form',
                        frame: true,
                        id: 'f_upload_entrenamiento_rbf',
                        height: 32,
                        width: 594,
                        layout: {
                            type: 'absolute'
                        },
                        bodyPadding: 10,
                        title: '',
                        items: [
                            {
                                xtype: 'filefield',
                                fieldLabel: 'Subir Datos',
                                name: 'datoscsv',
                                buttonText: 'Examinar...',
                                blankText : 'No ha selecionado un archivo',
                                allowBlank : false,
                                editable: false,
                                regex : /^(.+\.csv)$/,
                                regexText : 'Solo se aceptan archivos con extension .csv',
                                x: 10,
                                y: 0
                            },
                            {
                                xtype: 'button',
                                text: 'Importar Datos Csv',
                                action: 'subir_datos_rbf',
                                icon: 'resources/images/page_excel.png',
                                x: 350,
                                y: 0
                            }
                        ]
                    }
                ]
            }
                        ]
                    }
                ]
            },
            {
                xtype: 'form',
                frame: true,
                width: 305,
                id: 'form_rbf',
                layout: {
                    type: 'absolute'
                },
                bodyPadding: 10,
                title: 'Datos de Entrada',
                region: 'west',
                items: [
                      {
                        xtype: 'textfield',
                        fieldLabel: 'Neuronas capa oculta',
                        name: 'NumCapasOcultas',
                        allowBlank: false,
                        blankText: 'Ingrese el numero de Neuronas',
                        x: 20,
                        y: 30
                    }
                    
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                           
                            {
                                xtype: 'button',
                                text: 'Ejecutar',
                                action: 'ejecutar_rbf',
                                icon: 'resources/images/ejecutar.png'
                            }
                        ]
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});