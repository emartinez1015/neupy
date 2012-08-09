Ext.Loader.setConfig({
			enabled : true,
			/*paths : {
			    Neupy : Core.BASE_PATH + 'js/neupy'
			}*/
		});
		
//Ext.require(['Neupy.ux.ProgressBarPager', 'Neupy.clases.Grilla']);
Ext.application({
			name : 'Neupy',
			appFolder :  'js/neupy',
			controllers : ['NeupyController', 'MLPController', 'RBFBINVController', 'RBFLMSController'],
			

			launch : function() {
				//Ext.get('loading').remove();

				Ext.create('Ext.container.Viewport', {
							layout : 'fit',
							items : {
								xtype : 'neupyvista'
                                                                
							}

						}

				);

			}

		});