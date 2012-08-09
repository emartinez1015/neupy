Ext.define("Neupy.controller.NeupyController", {
    extend : 'Ext.app.Controller',
    views : ['NeupyVista', 'MLPVista', 'RBFLMSVista', 'RBFBINVVista'],
   // stores : [],

    //models : [],

    init : function() {

        this.control({
            'neupyvista button[action=ver_mlp]':{

                click: this.verMlp
            },
             'neupyvista button[action=ver_rbf_pinv]':{

                click: this.verRbfPinv
            },
             'neupyvista button[action=ver_rbf_lms]':{

                click: this.verRbfLms
            }

        });

        },


        verMlp: function(){

         var idtab =  Ext.getCmp('tab_mlp'); 
        var tabPanel = Ext.getCmp('tabpanel_principal');
        var tab = tabPanel.getComponent(idtab);
        
        if (!tab) {

            tab = Ext.widget('mlpvista');
            tab.closable = true;
            tabPanel.add(tab);
            tabPanel.doLayout();
            tabPanel.setActiveTab(tab);
         
        
        }else {
            tabPanel.setActiveTab(tab);
        }
        },
        
        verRbfPinv: function(){
        var idtab =  Ext.getCmp('tab_rbf_binv'); 
        var tabPanel = Ext.getCmp('tabpanel_principal');
        var tab = tabPanel.getComponent(idtab);
        
        if (!tab) {

            tab = Ext.widget('rbfbinvvista');
            tab.closable = true;
            tabPanel.add(tab);
            tabPanel.doLayout();
            tabPanel.setActiveTab(tab);
          
        
        }else {
            tabPanel.setActiveTab(tab);
        }
            
        },
        
        verRbfLms: function(){

        var idtab =  Ext.getCmp('tab_rbf_lms'); 
        var tabPanel = Ext.getCmp('tabpanel_principal');
        var tab = tabPanel.getComponent(idtab);
        
        if (!tab) {

            tab = Ext.widget('rbflmsvista');
            tab.closable = true;
            tabPanel.add(tab);
            tabPanel.doLayout();
            tabPanel.setActiveTab(tab);
          
        
        }else {
            tabPanel.setActiveTab(tab);
        }
        }


    });

