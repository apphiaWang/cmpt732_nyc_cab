---
layout: page
title: Introduction
---

> This group project is for course CMPT732 Professional Master's Program Lab, at Simon Fraser University.

# Project Background

With the development of technology and social progress, more and more people are involved in urbanization. Therefore, in order to make people's lives easier, the study of cities is imperative. For this reason, we chose to study the world's most prosperous metropolis, New York. Furthermore, to keep the study from being vague, we chose to analyze things related to taxis in New York.

Our main goal is to explore the NYC taxi data and to find out the pattern told by it. Each group member had different subjects from the perspectives of passengers, taxi drivers, and city taxi regulators. Our questions are listed below, corresponding to four subjects:


# Problem Definition:
Based on the interest of the group members, we analyze the data toward the following aspects:

## [Transportation]({{site.url}}{{ site.baseurl }}/transportation)
- The relationship between the distribution of parking lots and people's willingness to take a taxi
- The relationship between taking other transportation and taking a cab
- The equality of opportunity between yellow taxis and green taxis when operating
## [Time]({{site.url}}{{ site.baseurl }}/time)
- The relationship between the number of taxi orders and the month, the day of the week, and the hour of the day
- The relationship between the average number of passengers per order and weekday
## [Speed]({{site.url}}{{ site.baseurl }}/speed)
- The relationship between average taxi speed, pick-up times, and districts
- How to predict average taxi trip speed given location, time, and other information
## [Tips]({{site.url}}{{ site.baseurl }}/tips)
- What is the tipping convention of New York cab rides
- The relationship between tips and travel period, travel districts, date, covid-19, and other possible factors 


# Data Collection

## Main Dataset
Our main dataset is [New York TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page). We select yellow and green cab data for the period between 2017-2021. 

## Initial ETL

| Column       | filter                                       | Remark                                                       |
| ------------ | -------------------------------------------- | ------------------------------------------------------------ |
| Time span    | 2017-2021                                    | We only focus on the near 5 years of data.                   |
| Car type     | Yellow and Green Cab                         | Yellow cabs are allowed to pick up passengers anywhere in the city. Green cabs can only pickup passengers from Bronx, Staten Island, Brooklyn, Queens(excluding airports), and Northern Manhattan. |
| Payment type | Cash and Credit card                         | Trips with other payment types (no charge, dispute, etc.) will be viewed as invalid.   |
| Total amount | Total payment amount greater or equal to 2.5 | The initial price of NYC taxi is 2.5 dollars.                |


## Additional Dataset
- The weather data we need for the project is [New York City Weather Data 2019](https://www.kaggle.com/datasets/alejopaullier/new-york-city-weather-data-2019).
- The parking lot data we need for the project is [New York City Parking Lot](https://data.cityofnewyork.us/City-Government/Parking-Lot/h7zy-iq3d).
- The subway station data we need for the project is [New York City Subway Stations](https://data.cityofnewyork.us/Transportation/Subway-Stations/arq3-7z49).
- The subway station data we need for the project is [New York City Bus Stops](https://data.cityofnewyork.us/Transportation/Bus-Stop-Shelters/qafz-7myz).

# Used Techniques

Category|Tools
-|-
Data Analysis | Pyspark DataFrame, Pyspark SQL, Pandas
Data Visualization | Matplotlib, Geopandas, Seaborn, Echarts
Cloud Resources | AWS S3, EMR
UI | Jekyll

# Analysis Catalogue:
The final analyses of our problems are as follow:
- [Transportation]({{site.url}}{{ site.baseurl }}/transportation)
- [Time]({{site.url}}{{ site.baseurl }}/time)
- [Speed]({{site.url}}{{ site.baseurl }}/speed)
- [Tipping]({{site.url}}{{ site.baseurl }}/tips)

> You may also select the analysis report in the left sidebar.

# Code Repository
- [the analyis scripts](https://github.com/apphiaWang/CMPT732_NY_CAB)
- [this UI](https://github.com/apphiaWang/cmpt732_nyc_cab)