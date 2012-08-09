#!/Python27/python
print "Content-Type:text/html"
print
from mlp import MLP
import json
import cgi
import numpy as np

form = cgi.FieldStorage()

datos = form.getvalue('datos')
entrenamiento = form.getvalue('entrenamiento')
test = form.getvalue('test')
errorDeseado = float(form.getvalue('error'))

'''
entradas = [[5.4, 5.5, 9.7, 8.1], 
                     [4.8, 5, 8.1, 6.4], 
                     [6.1, 9, 6.4, 7.4], 
                     [6.8, 9.9, 7.4, 11.9], 
                     [6, 9.7, 11.9, 11.8],
                     [6.1,8.1,11.8,13.1],
                     [5.5,6.4,13.1,9.7],
                     [5,7.4,9.7,7.6],
                     [9,11.9,7.6,8.9],
                     [9.9,11.8,8.9,13],
                     [9.7,13.1,13,12.3]]

'''
datosEntrenamiento = json.loads(entrenamiento)
datosTest = json.loads(test)
datosRed = json.loads(datos)
entradasEntrenamiento = datosEntrenamiento['entradas']
salidasEntrenamiento = datosEntrenamiento['salidas']
entradasTest = datosTest['entradas']

#salidasDeseadas = [6.4,7.4,11.9,11.8,13.1,9.7,7.6,8.9,13,12.3,12.8]
numIteraciones = 1*datosRed['Epocas']


numNeuronasCapaOculta = int(datosRed['NumCapasOcultas'])
numEntradas = len(entradasEntrenamiento[0])

tazaAprendizaje= float(datosRed['TasaAprendizaje'])



mlp = MLP(numEntradas, numNeuronasCapaOculta)

mlp.entrenar(entradasEntrenamiento, salidasEntrenamiento, numIteraciones, errorDeseado,tazaAprendizaje)
respuestaEntrenamiento = mlp.sim(entradasEntrenamiento)
respuestaTest = mlp.sim(entradasTest)


#decod = json.loads(datos)


print json.dumps({'respuestaentrenamiento': respuestaEntrenamiento,'respuestatest':respuestaTest})