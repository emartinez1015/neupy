Ext.define("Neupy.controller.RBFLMSController", {
    extend : 'Ext.app.Controller',
    views : ['RBFLMSVista'],
   // stores : [],

    //models : [],

    init : function() {

        this.control({
        	'rbflmsvista button[action=subir_datos_rbf_lms]':{

        		click: this.subirDatosRbflms
        	}

        });

        },


        subirDatosRbflms:function(){

        		var form = Ext.getCmp('form_rbf_lms').getForm() 

        	    form.submit({

                method : 'POST',
                url : 'neupy/subirdatos.php',
                waitMsg : 'Cargando Archivo...',
                success : function(form, action) {
                    var obj = Ext.JSON.decode(action.response.responseText);

                    if (obj.success) {
                      //  Ext.getCmp('idgridarchivos').getStore().load();
                        Ext.Msg.alert('Exito', 'Archivo subido con exito');

                    


                     

                     var newStore =  Ext.create("Ext.data.Store",{
                   
                    fields: obj.fields,
                   
                    data: obj.datos
                   
                      });
                     

                     Ext.getCmp('grid_datos_rbf_lms').reconfigure(newStore, obj.columns)
                        //fin pruebas

                    }

                },
                failure : function(form, action) {
                    if (action.failureType === 'server') {
                        // var r = Ext.getCmp('idArchivo').getSubmitValue()
                        // alert(r)

                        Ext.Msg
                        .alert('Error',
                            'Archivo invalido verifique tamaño o extension');
                    }

                }

            });

        }

    });
