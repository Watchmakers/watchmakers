from flask import Flask, request, jsonify
from flask_restful import reqparse, abort, Api, Resource
import datetime as dt
import numpy as np
import pandas as pd
import time
from flask_cors import CORS, cross_origin
import pandas as pd
import unicodedata
import csv

app = Flask(__name__)
CORS(app)

data = pd.read_csv("dataTimeUse.csv", sep = ",", index_col = 0)

@app.route('/Countries', methods = ['GET', 'POST'])
def getCountries():
	countries =  list(data['COUNTRY'].unique())
	countries = [x for x in countries if str(x) != 'nan']
	answer = {
				'Countries' : countries
		}

	return jsonify(answer)

@app.route('/Activities', methods = ['GET', 'POST'])
def getActivities():
	categories =  list(data['CATEGORY'].unique())

	answer = {
				'Categories' : categories
		}

	return jsonify(answer)
	

@app.route('/PersonalData', methods = ['GET'])
def getDataHomePage():

	# Argument part for API calls
	
	country = request.args['country']
	daysweek = request.args['daysweek']
	sex = request.args['sex']
	categories = request.args['categories'].split(", ")

	# TEST PART 
	# country = 'France'
	# daysweek = 'All days of the week'
	# sex = 'Males'
	# categories = ['Eating', 'Household and family care', "Leisure and social and associative life"]
	# print(categories)

	results2000 = data[(data['YEAR'] == 2000) & (data['COUNTRY'] == country) & (data['DAYSWEEK'] == daysweek) & (data['SEX'] == sex) & (data['CATEGORY'].isin(categories))]
	results2010 = data[(data['YEAR'] == 2010) & (data['COUNTRY'] == country) & (data['DAYSWEEK'] == daysweek) & (data['SEX'] == sex) & (data['CATEGORY'].isin(categories))]

	print(results2000)

	# 2000 Part

	timeSpent2000 = list(results2000['SUM Time spent (hh:mm)'])

	for i in range(len(timeSpent2000)):
		h, m = timeSpent2000[i].split(":")
		partTime = int(h) + int(m) / 60
		timeSpent2000[i] = round(partTime, 1)

	participationTime2000 = list(results2000['SUM Participation time (hh:mm)'])

	for i in range(len(participationTime2000)):
		h, m = participationTime2000[i].split(":")
		partTime = int(h) + int(m) / 60
		participationTime2000[i] = round(partTime, 1)

	participationRate2000 = list(round(results2000['MEAN Participation rate (%)'], 1))

	#  2010 Part

	timeSpent2010 = list(results2010['SUM Time spent (hh:mm)'])

	for i in range(len(timeSpent2010)):
		h, m = timeSpent2010[i].split(":")
		partTime = int(h) + int(m) / 60
		timeSpent2010[i] = round(partTime, 1)

	participationTime2010 = list(results2010['SUM Participation time (hh:mm)'])

	for i in range(len(participationTime2010)):
		h, m = participationTime2010[i].split(":")
		partTime = int(h) + int(m) / 60
		participationTime2010[i] = round(partTime, 1)

	participationRate2010 = list(round(results2010['MEAN Participation rate (%)'], 1))

	try:
		answer = {
					'Year2000' : 
						{
							'Country' : country,
							'Daysweek' : daysweek,
							'Sex' : sex,
							'Categories' : categories,
							'Time spent' : timeSpent2000,
							'Participation time' : participationTime2000,
							'Participation rate' : participationRate2000,
						},
					'Year2010' : 
						{
							'Country' : country,
							'Daysweek' : daysweek,
							'Sex' : sex,
							'Categories' : categories,
							'Time spent' : timeSpent2010,
							'Participation time' : participationTime2010,
							'Participation rate' : participationRate2010,
						}
				}

	except:
		answer = {
					'Error' : 'No Data'
				}

	return jsonify(answer)


if __name__ == '__main__':
	app.run(debug = True)

	