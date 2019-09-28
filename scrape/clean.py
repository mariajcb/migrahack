import pandas as pd
from pandas.tseries.offsets import MonthEnd
import csv
import json

arrests = pd.read_csv('data/month_year_co_counties.csv')
detains = pd.read_csv('data/month_year_co_counties_detain.csv')
lat_key = pd.read_csv('data/centroids.csv')


def clean_for_db(df, lat_key):
    df = df.loc[df.County != "All"]
    df = df.loc[df.MonthYear != "All"]
    df = df.assign(
        startTime=df.MonthYear.apply(lambda x: pd.to_datetime(x).isoformat()),
        endTime=(df.MonthYear.apply(lambda z: pd.to_datetime(z) + MonthEnd()))
    )
    df = pd.merge(df, lat_key, on="County")
    df = df.assign(
        endTime=df.endTime.apply(lambda y: y.isoformat()),
        numArrests=df.Arrests.astype(float),
        locationName=df.County
    )
    df = df.loc[:, ["startTime", "endTime", "numArrests", "latitude", "longitude", "locationName"]]
    return df


# for thing, name in zip((arrests, detains), ("arrests", "detain")):
new = clean_for_db(arrests, lat_key)
new.to_csv(f"final_arrests.csv")
new.to_json("finalpip _arrests.json")

# Open the CSV
f = open(f"final_arrests.csv", 'rU')
# Change each fieldname to the appropriate field name. I know, so difficult.
reader = csv.DictReader(f, fieldnames=("startTime", "endTime", "numArrests", "latitude", "longitude", "locationName"))
out = json.dumps([row for row in reader])
f = open(f"final_arrests_json.json", 'w')
f.write(out)

# each dict is an observation
a = pd.read_csv("data/final_arrests.csv", index_col=0)

# Open the CSV
f = open(f"data/final_arrests.csv", 'rU')
# Change each fieldname to the appropriate field name. I know, so difficult.
reader = csv.DictReader(f, fieldnames=("startTime", "endTime", "numArrests", "latitude", "longitude", "locationName"))
out = json.dumps([row for row in reader])
f = open(f"data/final_arrests_json.json", 'w')
f.write(out)

# another way to do this.

csvfile = open('data/final_arrests.csv', 'r')
jsonfile = open('data/final_arrests2.json', 'w')

fieldnames = ("startTime", "endTime", "numArrests", "latitude", "longitude", "locationName")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    print(row)
    json.dump(row, jsonfile)
    jsonfile.write(',\n')



# sql query

import json
with open('data/final_arrests2.json') as json_data:
    d = json.load(json_data)
    print(d)


