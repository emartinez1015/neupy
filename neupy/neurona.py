#!/Python27/python
'''
Created on 23/06/2012

@author: Luis Pedraza
'''
import numpy as np
import json
class Neurona:
    '''
    classdocs
    '''
    numero_entradas = 0
    entradas = np.array([])
    pesos = np.array([])
    bias = 0
    funcion_salida = ""
    salida = 0

    def __init__(self,numero_entradas, entradas, pesos, bias, funcion_salida):
        '''
        Constructor
        '''
        self.numero_entradas = numero_entradas
        self.bias = bias
        self.funcion_salida = funcion_salida
        self.entradas = np.array(entradas)
        self.pesos = np.array(pesos)
        g = self.__establecer_salida(self.funcion_salida)
        self.salida =  g(self.entradas,self.pesos,self.bias)
        
        
        
    def get_numero_entradas(self):
        return self.numero_entradas
    
    def get_bias(self):
        return self.bias
    
    def get_pesos(self):
        return self.pesos
    
    def get_entradas(self):
        return self.entradas
    
    def get_salida(self):
        return self.salida
    
    def __establecer_salida(self,fsalida):
        if fsalida == 'h':
            return lambda entradas,pesos,bias: 1 if sum(pesos*entradas) - bias > 0 else 0
        elif fsalida == 's':
            return lambda entradas,pesos,bias: (1/(1+np.exp(sum(pesos*entradas))))
        elif fsalida == 'i':
            return lambda entradas,pesos,bias: sum(pesos*entradas)+bias
        elif fsalida == 't':
            return lambda entradas,pesos,bias: np.tanh(sum(pesos*entradas))+bias
        
    def neurona_a_json(self):
        #return ''+np.array_str(self.entradas)
        #return '{"numeroentradas": %s,"salida":%s,"pesos":%s}' %(self.numero_entradas,self.salida,np.array_str(self.pesos))
        #return json.dumps({'numeroentradas':self.numero_entradas,'salida':self.salida,'pesos':np.array2string(self.pesos,separator=',')})
		return json.dumps({'numeroentradas':self.numero_entradas,'salida':self.salida,'pesos':self.pesos.tolist()})
        
        
        
        
        
        
        
        
        
        
    