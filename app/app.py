'''
	Contoh Deloyment untuk Domain Data Science (DS)
	Orbit Future Academy - AI Mastery - KM Batch 3
	Tim Deployment
	2022
'''

# =[Modules dan Packages]========================

from flask import Flask,render_template,request,jsonify
import pandas as pd
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from joblib import load

# =[Variabel Global]=============================

app   = Flask(__name__, static_url_path='/static')
model = None

# =[Routing]=====================================

# [Routing untuk Halaman Utama atau Home]	
@app.route("/")
def beranda():
    return render_template('index.html')

# [Routing untuk API]	
@app.route("/api/deteksi",methods=['POST'])
def apiDeteksi():
	# Nilai default untuk variabel input atau features (X) ke model
	input_Temperature = 50
	input_Pressure  = 30.46
	input_Humidity = 58
	input_WindDirection  = 176.6
	input_Speed = 3.37
	
	if request.method=='POST':
		# Set nilai untuk variabel input atau features (X) berdasarkan input dari pengguna
		input_Temperature = float(request.form['Temperature'])
		input_Pressure  = float(request.form['Pressure'])
		input_Humidity = float(request.form['Humidity'])
		input_WindDirection  = float(request.form['WindDirection'])
		input_Speed  = float(request.form['Speed'])
		
		# Prediksi kelas atau spesies bunga iris berdasarkan data pengukuran yg diberikan pengguna
		data_test = pd.DataFrame(data={
			"Temperature" : [input_Temperature],
			"Pressure"  : [input_Pressure],
			"Humidity" : [input_Humidity],
			"WindDirection"  : [input_WindDirection],
			"Speed"  : [input_Speed]
		})

		hasil_prediksi = model.predict(data_test[0:1])[0]
		hasil_prediksi
		# Set Path untuk gambar hasil prediksi
#		if hasil_prediksi <= 300:
#			gambar_prediksi = '/static/images/rendah.jpg'
#		elif hasil_prediksi <= 1000:
#			gambar_prediksi = '/static/images/sedang.png'
#		else:
#			gambar_prediksi = '/static/images/atas.png'
		
		# Return hasil prediksi dengan format JSON
		return jsonify({
			"prediksi": hasil_prediksi
#			"gambar_prediksi" : gambar_prediksi
		})

# =[Main]========================================

if __name__ == '__main__':
	
	# Load model yang telah ditraining
	model = load('model1.model')

	# Run Flask di localhost 
	app.run(host="localhost", port=5000, debug=True)
	
	


