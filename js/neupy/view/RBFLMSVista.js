Ext.define('Neupy.view.RBFLMSVista', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rbflmsvista',
    id: 'tab_rbf_lms',
    autoShow: true,
    frame: true,
    layout: {
        type: 'border'
    },
    title: 'RBF LMS',

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
                        height: 66,
                        width: 84,
                        text: 'MyButton'
                    },
                    {
                        xtype: 'button',
                        height: 66,
                        width: 84,
                        text: 'MyButton'
                    },
                    {
                        xtype: 'button',
                        height: 66,
                        width: 84,
                        text: 'MyButton'
                    }
                ]
            }
        ];
        me.items = [
            {
                xtype: 'gridpanel',
                title: 'Datos de Entrenamiento',
                region: 'center',
                id: 'grid_datos_rbf_lms',
                store: Ext.create("Ext.data.Store",{
                    //model: 'Prueba',
                    fields: ['x1'],
                    data: [{x1: "No ha datos para mostrar"}]
                    
                }),
                columns: [
                    {
                       
                        dataIndex: 'x1',
                        text: 'x1',
                        width: 150
                    }
                ]
            },
            {
                xtype: 'form',
                frame: true,
                width: 305,
                id: 'form_rbf_lms',
                layout: {
                    type: 'absolute'
                },
                bodyPadding: 10,
                title: 'Datos de Entrada',
                region: 'west',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Epocas',
                        x: 20,
                        y: 180
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Error Deseado',
                        x: 20,
                        y: 100
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Tasa de Aprendizaje',
                        x: 20,
                        y: 140
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Numero de Entradas',
                        x: 20,
                        y: 20
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Neuronas capa oculta',
                        x: 20,
                        y: 60
                    },
                    {
                        xtype: 'filefield',
                        fieldLabel: 'Subir Datos',
                        name: 'datoscsv',
                        x: 20,
                        y: 220
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Importar Datos Csv',
                                action: 'subir_datos_rbf_lms'
                            },
                            {
                                xtype: 'button',
                                text: 'Ejecutar'
                            }
                        ]
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});