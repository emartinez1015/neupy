#!/Python27/python
print "Content-Type:text/html"
print
from neurona import Neurona
import json
import cgi

form = cgi.FieldStorage()
prueba = form.getvalue('prueba')
otro = form.getvalue('otro')

n = json.loads(otro)

en = [0.1,0.5,0.3]
p = [0.5,0.2,0.1]
bias = 0.5
f = 'h'

n = Neurona(n['numeroentradas'],n['entradas'],n['pesos'],n['bias'],n['funcionsalida'])
print n.neurona_a_json()
