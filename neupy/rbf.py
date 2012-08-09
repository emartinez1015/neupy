'''
Created on 20/07/2012

@author: Luis Pedraza
'''
import numpy as np
import vq as vq
#from scipy.cluster.vq import kmeans2
class RBF():
    '''
    classdocs
    '''


    def __init__(self,numeroEntradas,numeroCentros,entradas):
        '''
        Constructor
        '''
        self.__entradas = np.array(entradas)
        self.__centros = vq.kmeans2(self.__entradas,numeroCentros,2000)[0]
        self.__varianza = self.establecerVarianza()
        self.__matrizG = np.matrix(self.establecerMatrizG())
        self.__pesos = np.matrix(np.random.rand(numeroCentros+1))
        
    
    def establecerVarianza(self):
        maxv = 0.0
        for i in self.__centros:
            for j in self.__centros:
                var = np.linalg.norm(i-j)**2
                if var > maxv:
                    maxv = var
        return maxv
    
    def establecerMatrizG(self):
        g = []
        for i in self.__entradas:
            gaux = []
            for j in self.__centros:
                norma = (np.linalg.norm(i-j)**2.0)
                gaux.append(np.exp(-norma)/2.0*(self.__varianza**2.0))
            gaux.append(1.0)
            g.append(gaux)
        return g
    
    
    def calcularRbf(self,inp):
        gaux = []
        g = []
        for k in self.__centros:
            norma = (np.linalg.norm(inp-k)**2.0)
            gaux.append(np.exp(-norma)/2.0*(self.__varianza**2.0))
        gaux.append(1.0)
        g.append(gaux)
        return np.array(g)
    
           
    
    def entrenar(self,entradas,salidasDeseadas):
        salidas = np.matrix(salidasDeseadas)
        self.__entradas = np.array(entradas)
        self.__matrizG = np.matrix(self.establecerMatrizG())
        self.__pesos = np.linalg.pinv(self.__matrizG)*salidas.T
        
        
        
        
    def sim(self,entradas):
        salidas = []
        self.__entradas = np.array(entradas)
        self.__matrizG = self.establecerMatrizG()
        for i in self.__matrizG:
            salida = i*self.__pesos
            salidas.append(salida[0,0])
        return salidas
        
        
