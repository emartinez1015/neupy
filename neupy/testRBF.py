#!/Python27/python
print "Content-Type:text/html"
print
from rbf import RBF
import json
import cgi

#captura de Datos 
form = cgi.FieldStorage()
datos = form.getvalue('datos')
entrenamiento = form.getvalue('entrenamiento')
test = form.getvalue('test')


#Decodificacion de datos
datosEntrenamiento = json.loads(entrenamiento)
datosTest = json.loads(test)
datosRed = json.loads(datos)
entradasEntrenamiento = datosEntrenamiento['entradas']
salidasEntrenamiento = datosEntrenamiento['salidas']
entradasTest = datosTest['entradas']

numNeuronasCapaOculta = int(datosRed['NumCapasOcultas'])
numEntradas = len(entradasEntrenamiento[0])


#creacion del RBF
rbf = RBF(numEntradas, numNeuronasCapaOculta, entradasEntrenamiento)

#Entrenamiento
rbf.entrenar(entradasEntrenamiento, salidasEntrenamiento)

#Respuesta Entrenamiento
respuestaEntrenamiento = rbf.sim(entradasEntrenamiento)

#Respuesta Test
respuestaTest = rbf.sim(entradasTest)

#Codificacion de las Respuestas
print json.dumps({'respuestaentrenamiento': respuestaEntrenamiento,'respuestatest':respuestaTest})

