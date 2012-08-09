#!/Python27/python
print "Content-Type:text/html"
print
import numpy as np
import json
import cgi

form = cgi.FieldStorage()
respuestas= form.getvalue('respuestas')
salidas = form.getvalue('salidas')


salidaRed = json.loads(respuestas)
salidaDeseada = json.loads(salidas)
'''
estos son los vectores que recibe como parametro

salidaRed = [7.4322197478350489, 6.6447152759061971, 12.055537517980618, 12.601063680701692, 11.270634173379861, 9.9406819188443656, 7.5704332487525932, 9.4522192336754642, 12.650081696598964, 12.748500836026633, 12.757071132526413]
salidaDeseada = [6.4,7.4,11.9,11.8,13.1,9.7,7.6,8.9,13,12.3,12.8]
'''

npsalidaRed = np.array(salidaRed)
npsalidaDeseada = np.array(salidaDeseada)
e = npsalidaDeseada-npsalidaRed
e = np.absolute(e)
v = 0.5 * np.sum(np.square(e))

print json.dumps({'sse':v,'r_error':e.tolist(),'salidaRed':salidaRed,'salidaDeseada':salidaDeseada})