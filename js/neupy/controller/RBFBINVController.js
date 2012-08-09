sw_rbf = false;
Ext.define("Neupy.controller.RBFBINVController", {
    extend : 'Ext.app.Controller',
    views : ['RBFBINVVista'],
   // stores : [],

    //models : [],

    init : function() {

        this.control({
        	'rbfbinvvista button[action=subir_datos_rbf]':{

        		click: this.subirDatosRbf
        	},
            'rbfbinvvista button[action=subir_datos_test_rbf]':{

                click: this.subirDatosTestRbf
            },
            'rbfbinvvista button[action=ejecutar_rbf]':{

                click: this.ejecutarRbf
            },
            'rbfbinvvista button[action=graficar_entrenamiento_rbf]':{

                click: this.graficarEntrenamientoRbf
            },
            'rbfbinvvista button[action=graficar_test_rbf]':{

                click: this.graficarTestRbf
            },
            'rbfbinvvista button[action=graficar_entrenamiento_error_rbf]':{

                click: this.graficarErrorEntrenamientoRbf
            },
            'rbfbinvvista button[action=graficar_test_error_rbf]':{

                click: this.graficarErrorTestRbf
            },
            'rbfbinvvista button[action=to_excel]':{

                click: this.toExcelRbfTest
            }


        });

        },


       toExcelRbfTest: function(){
       if(sw_rbf){
        var store_test = Ext.getCmp('grid_datos_rbf_test').getStore();

  

           var array = [];
           for (var i = 0; i < (store_test.data.length) ; i++) {
            
             array.push(store_test.data.items[i].data);
           };

          



               Ext.Ajax.request({
                    url : 'neupy/toexcel.php',
                    params : {
                       fields: Ext.JSON.encode(keys_rbf_test),
                       datos: Ext.JSON.encode(array),
                       name: 'test_rbf' 

                     
                    },
                    method : 'POST',

                    success : function(result, request) {
                       
                        
                          var  nombre = Ext.decode(result.responseText).nombre;
                           window.open('uploads/'+nombre);
                      
                     
                    }
                });
    
          

        }else{

           Ext.Msg.alert('Error','No hay resultados para Exportar.');

        }

       },


         ejecutarRbf: function(){


             var form =  Ext.getCmp('form_rbf').getForm();

        
             if(form.isValid()){
              if((typeof(keys_rbf_ent) != "undefined") && (typeof(keys_rbf_test) != "undefined")){
          
              var store_ent = Ext.getCmp('grid_datos_rbf_entrenamiento').getStore();

              var store_test = Ext.getCmp('grid_datos_rbf_test').getStore();
            
              var datos_entrenamiento = clasificarDatos(store_ent, keys_rbf_ent)

              var datos_test = clasificarDatos(store_test, keys_rbf_test)

       

  
                    Ext.Ajax.request({
                    url : 'neupy/testRBF.py',
                    params : {
                       datos: Ext.JSON.encode(form.getValues()),
                       entrenamiento: datos_entrenamiento,
                       test: datos_test
                 

                     
                    },
                    method : 'POST',

                    success : function(result, request) {
                        
                        sw_rbf = true;
                        respuesta_ent = Ext.decode(result.responseText).respuestaentrenamiento;
                        respuesta_test = Ext.decode(result.responseText).respuestaentrenamiento;


                        setRespuesta(store_ent, respuesta_ent);
                        setRespuesta(store_test, respuesta_test);
                          
                    }
                });
                   }else{
                      Ext.Msg.alert('Error', 'Verifique que los datos de entrenamiento y test se hayan subido.');

                   }

                  }
        },


        subirDatosTestRbf: function(){

            var form = Ext.getCmp('f_upload_test_rbf').getForm() 
           

            if(form.isValid()){
                form.submit({

                method : 'POST',
                url : 'neupy/subirdatos.php',
                params:{
                    opcion: 2
                },
                waitMsg : 'Cargando Archivo...',
                success : function(form, action) {
                    var obj = Ext.JSON.decode(action.response.responseText);

                    keys_rbf_test = obj.fields;

                    if (obj.success) {
                     
                        Ext.Msg.alert('Exito', 'Archivo subido con exito');


                     var newStore =  Ext.create("Ext.data.Store",{
                   
                        fields: obj.fields,
                       
                        data: obj.datos
                   
                      });
                     

                     Ext.getCmp('grid_datos_rbf_test').reconfigure(newStore, obj.columns)
                   

                    }

                },
                failure : function(form, action) {
                    if (action.failureType === 'server') {
                      

                        Ext.Msg.alert('Error', 'Archivo invalido verifique tamaño o extension');
                    }

                }

            });
            }

        },


        subirDatosRbf:function(){

        	var form = Ext.getCmp('f_upload_entrenamiento_rbf').getForm() 
           

            if(form.isValid()){
                form.submit({

                method : 'POST',
                url : 'neupy/subirdatos.php',
                params:{
                    opcion: 1
                },
                waitMsg : 'Cargando Archivo...',
                success : function(form, action) {
                    var obj = Ext.JSON.decode(action.response.responseText);

                    keys_rbf_ent = obj.fields;

                    if (obj.success) {
                     
                        Ext.Msg.alert('Exito', 'Archivo subido con exito');


                     var newStore =  Ext.create("Ext.data.Store",{
                   
                        fields: obj.fields,
                       
                        data: obj.datos
                   
                      });
                     

                     Ext.getCmp('grid_datos_rbf_entrenamiento').reconfigure(newStore, obj.columns)
                   

                    }

                },
                failure : function(form, action) {
                    if (action.failureType === 'server') {
                      

                        Ext.Msg.alert('Error', 'Archivo invalido verifique tamaño o extension');
                    }

                }

            });
            }
        },

        graficarEntrenamientoRbf: function(){



         if(sw_rbf){
         var datos = [];


         var store_ent = Ext.getCmp('grid_datos_rbf_entrenamiento').getStore();
                         cont = 0;
                          store_ent.each(function(records, a) {
                              var aux = [];

                              aux.push(cont);
                              aux.push(parseFloat(records.get('Salida')));
                              aux.push(records.get('Respuesta'));
                              cont++;
                               datos.push(aux);
                          });

                        
         var store = Ext.create('Ext.data.ArrayStore', {
              fields: [
              {name: 'tiempo'},
              {name: 'Salida Deseada', type: 'float'},
              {name: 'Respuesta Red', type: 'float'}
              ],
              data: datos
              });


          var lineChart = Ext.create('Ext.chart.Chart', {
                          style: 'background:#fff',
                          animate: true,
                          store: store,
                          shadow: true,
                          legend: {
                          position: 'right'
                          },
                          axes: [
                          {
                          type: 'Numeric',
                          minimum: 0,
                          position: 'left',
                          fields: ['Salida Deseada','Respuesta Red'],
                         // title: 'Number of Visits',
                          minorTickSteps: 1
                          }, 
                          {
                          type: 'Category',
                          position: 'bottom',
                          fields: ['tiempo'],
                         // title: 'Month of the Year'
                          }],
                          series: [{
                          type: 'line',
                          highlight: {
                          size: 7,
                          radius: 7
                          },
                          axis: 'left',
                          smooth: true,
                          xField: 'tiempo',
                          yField: 'Salida Deseada',
                          markerConfig: {
                          //type: 'cross',
                          size: 5,
                          radius: 4,
                          'stroke-width': 0
                          }
                          },
                          {
                          type: 'line',
                      
                          axis: 'left',
                          smooth: true,
                          xField: 'tiempo',
                          yField: 'Respuesta Red',
                          markerConfig: {
                          type: 'circle',
                          size: 5,
                          radius: 4,
                          'stroke-width': 0
                        
                          }
                          }]
                          });



         var w = Ext.create('Ext.window.Window', {
                  width: 400,
                  height: 300,
                  hidden: false,
                  maximizable: true,
                  maximized: true,
                  title: 'Grafica Entrenamiento RBF',
                  renderTo: Ext.getBody(),
                  layout: 'fit',
                  items: [lineChart]
                  });

          w.show();
        }else{

           Ext.Msg.alert('Error','No hay resultados para Graficar.');

        }

        },

        graficarTestRbf: function(){


         if(sw_rbf){
         var datos = [];


         var store_ent = Ext.getCmp('grid_datos_rbf_test').getStore();
                         cont = 0;
                          store_ent.each(function(records, a) {
                              var aux = [];

                            
                              aux.push(cont);
                              aux.push(parseFloat(records.get('Salida')));
                              aux.push(records.get('Respuesta'));
                              cont++;
                               datos.push(aux);
                          });

                          
         var store = Ext.create('Ext.data.ArrayStore', {
              fields: [
              {name: 'tiempo'},
              {name: 'Salida Deseada', type: 'float'},
              {name: 'Respuesta Red', type: 'float'}
              ],
              data: datos
              });


          var lineChart = Ext.create('Ext.chart.Chart', {
                          style: 'background:#fff',
                          animate: true,
                          store: store,
                          shadow: true,
                          legend: {
                          position: 'right'
                          },
                          axes: [
                          {
                          type: 'Numeric',
                          minimum: 0,
                          position: 'left',
                          fields: ['Salida Deseada','Respuesta Red'],
                         // title: 'Number of Visits',
                          minorTickSteps: 1
                          }, 
                          {
                          type: 'Category',
                          position: 'bottom',
                          fields: ['tiempo'],
                         // title: 'Month of the Year'
                          }],
                          series: [{
                          type: 'line',
                          highlight: {
                          size: 7,
                          radius: 7
                          },
                          axis: 'left',
                          smooth: true,
                          xField: 'tiempo',
                          yField: 'Salida Deseada',
                          markerConfig: {
                          //type: 'cross',
                          size: 5,
                          radius: 4,
                          'stroke-width': 0
                          }
                          },
                          {
                          type: 'line',
                      
                          axis: 'left',
                          smooth: true,
                          xField: 'tiempo',
                          yField: 'Respuesta Red',
                          markerConfig: {
                          type: 'circle',
                          size: 5,
                          radius: 4,
                          'stroke-width': 0
                        
                          }
                          }]
                          });



         var w = Ext.create('Ext.window.Window', {
                  width: 400,
                  height: 300,
                  hidden: false,
                  maximizable: true,
                  maximized: true,
                  title: 'Grafica Test RBF',
                  renderTo: Ext.getBody(),
                  layout: 'fit',
                  items: [lineChart]
                  });

          w.show();
        }else{

           Ext.Msg.alert('Error','No hay resultados para Graficar.');

        }


        },

        graficarErrorEntrenamientoRbf: function(){

                if(sw_rbf){
           var salidas = [];
           var respuestas = [];
           var store_ent = Ext.getCmp('grid_datos_rbf_entrenamiento').getStore();
              cont = 0;
                     store_ent.each(function(records, a) {
                              
                               
                              salidas.push(parseFloat(records.get('Salida')));
                              respuestas.push(parseFloat(records.get('Respuesta')));
                              
                          });

                      Ext.Ajax.request({
                          url : 'neupy/error.py',
                          params : {
                             salidas: Ext.JSON.encode(salidas),
                             respuestas: Ext.JSON.encode(respuestas)
                            
                           
                          },
                          method : 'POST',

                          success : function(result, request) {
                   
                            
                              error = Ext.decode(result.responseText).r_error;
                                
                                var datos =[];

                                for (var i = 0; i < error.length; i++) {
                                    
                                    var aux = [];
                                    aux.push(i);
                                    aux.push(error[i]);
                                    datos.push(aux);
                                  }
                                
                                      var store = Ext.create('Ext.data.ArrayStore', {
                                          fields: [
                                          {name: 'tiempo'},
                                          {name: 'Error', type: 'float'},
                                    
                                          ],
                                          data: datos
                                          }); 

                                      var lineChart = Ext.create('Ext.chart.Chart', {
                                        style: 'background:#fff',
                                        animate: true,
                                        store: store,
                                        shadow: true,
                                        legend: {
                                        position: 'right'
                                        },
                                        axes: [
                                        {
                                        type: 'Numeric',
                                        minimum: 0,
                                        position: 'left',
                                        fields: ['Error'],
                                       // title: 'Number of Visits',
                                        minorTickSteps: 1
                                        }, 
                                        {
                                        type: 'Category',
                                        position: 'bottom',
                                        fields: ['tiempo'],
                                       // title: 'Month of the Year'
                                        }],
                                        series: [{
                                        type: 'line',
                                        highlight: {
                                        size: 7,
                                        radius: 7
                                        },
                                        axis: 'left',
                                        smooth: true,
                                        xField: 'tiempo',
                                        yField: 'Error',
                                        markerConfig: {
                                        //type: 'cross',
                                        size: 5,
                                        radius: 4,
                                        'stroke-width': 0
                                        }
                                        }]
                                        });



                            var w = Ext.create('Ext.window.Window', {
                                width: 400,
                                height: 300,
                                hidden: false,
                                maximizable: true,
                                maximized: true,
                                title: 'Grafica Error Entrenamiento RBF',
                                renderTo: Ext.getBody(),
                                layout: 'fit',
                                items: [lineChart]
                                });

                        w.show();
                                        

                            }
                      });
                   

                   }else{
                      Ext.Msg.alert('Error', 'Verifique que los datos de entrenamiento y test se hayan subido.');

                   }

        },

      

      graficarErrorTestRbf: function(){

         if(sw_rbf){
           var salidas = [];
           var respuestas = [];
           var store_ent = Ext.getCmp('grid_datos_rbf_test').getStore();
              cont = 0;
                     store_ent.each(function(records, a) {
                              
                             
                              salidas.push(parseFloat(records.get('Salida')));
                              respuestas.push(parseFloat(records.get('Respuesta')));
                              
                          });

                      Ext.Ajax.request({
                          url : 'neupy/error.py',
                          params : {
                             salidas: Ext.JSON.encode(salidas),
                             respuestas: Ext.JSON.encode(respuestas)
                            
                           
                          },
                          method : 'POST',

                          success : function(result, request) {
                           
                            
                              error = Ext.decode(result.responseText).r_error;
                                
                                var datos =[];

                                for (var i = 0; i < error.length; i++) {
                                    
                                    var aux = [];
                                    aux.push(i);
                                    aux.push(error[i]);
                                    datos.push(aux);
                                  }
                                
                                      var store = Ext.create('Ext.data.ArrayStore', {
                                          fields: [
                                          {name: 'tiempo'},
                                          {name: 'Error', type: 'float'},
                                    
                                          ],
                                          data: datos
                                          }); 

                                      var lineChart = Ext.create('Ext.chart.Chart', {
                                        style: 'background:#fff',
                                        animate: true,
                                        store: store,
                                        shadow: true,
                                        legend: {
                                        position: 'right'
                                        },
                                        axes: [
                                        {
                                        type: 'Numeric',
                                        minimum: 0,
                                        position: 'left',
                                        fields: ['Error'],
                                       // title: 'Number of Visits',
                                        minorTickSteps: 1
                                        }, 
                                        {
                                        type: 'Category',
                                        position: 'bottom',
                                        fields: ['tiempo'],
                                       // title: 'Month of the Year'
                                        }],
                                        series: [{
                                        type: 'line',
                                        highlight: {
                                        size: 7,
                                        radius: 7
                                        },
                                        axis: 'left',
                                        smooth: true,
                                        xField: 'tiempo',
                                        yField: 'Error',
                                        markerConfig: {
                                        //type: 'cross',
                                        size: 5,
                                        radius: 4,
                                        'stroke-width': 0
                                        }
                                        }]
                                        });



                            var w = Ext.create('Ext.window.Window', {
                                width: 400,
                                height: 300,
                                hidden: false,
                                maximizable: true,
                                maximized: true,
                                title: 'Grafica Error Test RBF',
                                renderTo: Ext.getBody(),
                                layout: 'fit',
                                items: [lineChart]
                                });

                        w.show();
                                        

                            }
                      });
                   

                   }else{
                      Ext.Msg.alert('Error', 'Verifique que los datos de entrenamiento y test se hayan subido.');

                   }

        }

        


    });
