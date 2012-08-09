sw_mlp = false;

Ext.define("Neupy.controller.MLPController", {
    extend : 'Ext.app.Controller',
    views : ['MLPVista'],
   // stores : [],

    //models : [],

    init : function() {

        this.control({
        	'mlpvista button[action=subir_datos_mlp]':{

        		click: this.subirDatosMlp
        	},
            'mlpvista button[action=subir_datos_mlp_test]':{

                click: this.subirDatosMlpTest
            },
            'mlpvista button[action=ejecutar_mlp]':{
                click: this.ejecutarMlp
            },
            'mlpvista button[action=graficar_entrenamiento_mlp]':{
                click: this.graficarEntrenamientoMlp
            },
            'mlpvista button[action=graficar_test_mlp]':{
                click: this.graficarTestMlp
            },
            'mlpvista button[action=graficar_ent_error_mlp]':{
                click: this.graficarErrorEntrenamientoMlp
            },
            'mlpvista button[action=graficar_test_error_mlp]':{
                click: this.graficarErrorTestMlp
            },
            'mlpvista button[action=to_excel]':{
                click: this.toExcelMlpTest
            }



        });

        },

       toExcelMlpTest: function(){
       if(sw_mlp){
        var store_test = Ext.getCmp('grid_datos_mlp_test').getStore();

        


           var array = [];
           for (var i = 0; i < (store_test.data.length) ; i++) {
         
             array.push(store_test.data.items[i].data);
           };

          



               Ext.Ajax.request({
                    url : 'neupy/toexcel.php',
                    params : {
                       fields: Ext.JSON.encode(keysTest),
                       datos: Ext.JSON.encode(array),
                       name: 'test_mlp' 

                     
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

        ejecutarMlp: function(){


             var form =  Ext.getCmp('form_mlp').getForm();

        
             if(form.isValid()){
              if((typeof(keys) != "undefined") && (typeof(keysTest) != "undefined")){
          
              var store_ent = Ext.getCmp('grid_datos_mlp_entrenamiento').getStore();

              var store_test = Ext.getCmp('grid_datos_mlp_test').getStore();
            
              var datos_entrenamiento = clasificarDatos(store_ent, keys)

              var datos_test = clasificarDatos(store_test, keysTest)

              var error = parseFloat(Ext.getCmp('error_deseado_mlp').getValue())

  
                    Ext.Ajax.request({
                    url : 'neupy/testMLP.py',
                    params : {
                       datos: Ext.JSON.encode(form.getValues()),
                       entrenamiento: datos_entrenamiento,
                       test: datos_test,
                       error: error 

                     
                    },
                    method : 'POST',

                    success : function(result, request) {
                       
                        sw_mlp = true;
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

        subirDatosMlp:function(){

        		var form = Ext.getCmp('f_upload_entrenamiento').getForm() 
       


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

                    keys = obj.fields;

                    if (obj.success) {
                      
                        Ext.Msg.alert('Exito', 'Archivo subido con exito');


                     var newStore =  Ext.create("Ext.data.Store",{
                   
                    fields: obj.fields,
                   
                    data: obj.datos
                   
                      });
                     

                     Ext.getCmp('grid_datos_mlp_entrenamiento').reconfigure(newStore, obj.columns)
                   

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

        subirDatosMlpTest: function(){

                var form = Ext.getCmp('f_upload_test').getForm() 
                


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

                    keysTest = obj.fields;

                    if (obj.success) {
                    
                        Ext.Msg.alert('Exito', 'Archivo subido con exito');


                        var newStore =  Ext.create("Ext.data.Store",{
                   
                        fields: obj.fields,
                   
                        data: obj.datos
                   
                      });
                     

                     Ext.getCmp('grid_datos_mlp_test').reconfigure(newStore, obj.columns)
                   

                    }

                },
                failure : function(form, action) {
                    if (action.failureType === 'server') {
                      

                        Ext.Msg.alert('Error','Archivo invalido verifique tamaño o extension');
                    }

                }

            });
          }
        },

        graficarEntrenamientoMlp: function(){
         

         if(sw_mlp){
         var datos = [];


         var store_ent = Ext.getCmp('grid_datos_mlp_entrenamiento').getStore();
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
                  title: 'Grafica Entrenamiento MLP',
                  renderTo: Ext.getBody(),
                  layout: 'fit',
                  items: [lineChart]
                  });

          w.show();
        }else{

           Ext.Msg.alert('Error','No hay resultados para Graficar.');

        }

        },

        graficarTestMlp: function(){

        if(sw_mlp){
           var datos = [];
           var store_ent = Ext.getCmp('grid_datos_mlp_test').getStore();
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
                  title: 'Grafica Test MLP',
                  renderTo: Ext.getBody(),
                  layout: 'fit',
                  items: [lineChart]
                  });

          w.show();
           }else{

           Ext.Msg.alert('Error','No hay resultados para Graficar.');

           }



        },


        graficarErrorEntrenamientoMlp: function(){
             if(sw_mlp){
           var salidas = [];
           var respuestas = [];
           var store_ent = Ext.getCmp('grid_datos_mlp_entrenamiento').getStore();
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
                                title: 'Grafica Error Entrenamiento MLP',
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


        graficarErrorTestMlp: function(){

                 if(sw_mlp){
           var salidas = [];
           var respuestas = [];
           var store_ent = Ext.getCmp('grid_datos_mlp_test').getStore();
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
                                title: 'Grafica Error Test MLP',
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

    function clasificarDatos(store, keys){

         var entradas = new Array();
         var salidasDeseadas = new Array();
    
        var cont = 0;
        store.each(function(records, a) {

                var aux = new Array();
                for (var i = 0; i < keys.length-1; i++) {
                  
                     if(i == keys.length-2){
                     salidasDeseadas.push(parseFloat(records.data[keys[i]]))                                     
                    }else{
                       aux.push(parseFloat(records.data[keys[i]]))
                    }
                }
                    entradas[cont] = aux;  
                    cont++;
                });

       
        var resp = {"entradas" : entradas, "salidas" :  salidasDeseadas}
        return Ext.JSON.encode(resp)

    }

    function setRespuesta(store, respuestas){


        cont = 0;
                          store.each(function(records, a) {

                              records.set('Respuesta', parseFloat(respuestas[cont]));
                              cont++;
                               
                          });
                          store.commitChanges();


    }