import pandas as pd
from pandas.tseries.offsets import MonthEnd
import csv
import json


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


def main():
    arrests = pd.read_csv('month_year_co_counties.csv')
    lat_key = pd.read_csv('centroids.csv')
    new = clean_for_db(arrests, lat_key)

    new.to_csv('final_arrests.csv', index=False)

    csvfile = open('final_arrests.csv', 'r')
    jsonfile = open('final_arrests3.json', 'w')

    fieldnames = ("startTime", "endTime", "numArrests", "latitude", "longitude", "locationName")
    reader = csv.DictReader(csvfile, fieldnames)
    for row in reader:
        print(row)
        json.dump(row, jsonfile)
        jsonfile.write(',\n')



