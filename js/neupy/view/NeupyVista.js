Ext.define('Neupy.view.NeupyVista', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.neupyvista',
    autoShow: true,
    height: 534,
    width: 876,
    layout: {
        type: 'border'
    },
    title: 'Neupy',

    initComponent: function() {
        var me = this;
        me.dockedItems = [
            {
                xtype: 'toolbar',
                height: 508,
                region: 'north',
                dock: 'left',
                items: [
                    {
                        xtype: 'button',
                        height: 74,
                        width: 76,
                        action: 'ver_mlp',
                        text: '<font size="0.01">MLP</font>',
                        iconAlign: 'top',
                        scale: 'large',
                        icon: 'resources/images/neuron.png'
                    },
                    {
                        xtype: 'button',
                        height: 74,
                        width: 76,
                        action: 'ver_rbf_pinv',
                        text: '<font size="0.01">RBF PINV</font>',
                        iconAlign: 'top',
                        scale: 'large',
                        icon: 'resources/images/rbf_lms.png'
                    }/*,
                    {
                        xtype: 'button',
                        height: 74,
                        width: 76,
                        action: 'ver_rbf_lms',
                        text: '<font size="0.01">RBF LMS</font>',
                        iconAlign: 'top',
                        scale: 'large',
                        icon: 'resources/images/rbf_lms.png'
                    }*/
                ]
            }
        ];
        me.items = [
            {
                xtype: 'tabpanel',
                frame: true,
                id: 'tabpanel_principal',
                activeTab: 0,
                region: 'center',
                items: [
                    {
                        xtype: 'panel',
                        frame: true,
                        title: 'Home'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});