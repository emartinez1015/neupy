'''
Created on 22/07/2012

@author: Luis Pedraza
'''
import neurolab as nl
import numpy as np

class MLP():
    '''
    classdocs
    '''


    def __init__(self,numeroEntradas,neuronasCapaOculta):
        '''
        Constructor
        '''
        self.__numeroEntradas = numeroEntradas
        self.__neuronasCapaOculta = neuronasCapaOculta
        self.__net = None
        
    def entrenar(self,entradas,salidasDeseadas,numIteraciones,errorDeseado,tazaAprendizaje=0.07):
        inp = np.array(entradas)
        tar = np.array(salidasDeseadas)
        tar = tar.reshape(len(tar),1)
        listaEntradas = self.__crearListaMinMax(inp)
        self.__net = nl.net.newff(listaEntradas, [self.__numeroEntradas,self.__neuronasCapaOculta,1],
                                  [nl.trans.TanSig(),nl.trans.TanSig(),nl.trans.PureLin()])
        nl.train.train_rprop(self.__net,inp,tar,epochs=numIteraciones, show=1000000, goal=errorDeseado,lr=tazaAprendizaje)
        
    def __crearListaMinMax(self,entradas):
        mini = entradas.min()
        maxi = entradas.max()
        minmax = [mini,maxi]
        listaEntradas = []
        for i in range(0,self.__numeroEntradas):
            listaEntradas.append(minmax)
        return listaEntradas
    
    
    def sim(self,entradas):
        inp = np.array(entradas)
        output = self.__net.sim(inp)
        listaSalidas = []
        for i in output:
            listaSalidas.append(i[0])
        return listaSalidas