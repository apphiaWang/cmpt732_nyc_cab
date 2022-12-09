---
layout: page
title: Transportation Analysis
---

**author: Axida**

# 1. ETL

* **Initial ETL**

This part of ETL is suitable for all four subjects analysis.

| Column       | Filter                                       | Remark                                                       |
| ------------ | -------------------------------------------- | ------------------------------------------------------------ |
| Time Span    | 2017-2021                                    | We only focus on the near 5 years of data.                   |
| Car type     | Yellow and Green Cab                         | Yellow cabs are allowed to pick up passengers anywhere in the city. Green cabs can only pickup passengers from Bronx, Staten Island, Brooklyn, Queens(excluding airports), and Northern Manhattan. |
| Payment type | Cash and Credit card                         | Only payments with credit card have record of tip amount.    |
| Total amount | Total payment amount greater or equal to 2.5 | The initial price of NYC taxi is 2.5 dollars.                |

* Geographic Information Data ETL

  * **Pick-up and Drop-off Zone**

    The Location ID offered by the original dataset has unknown zone of 264 and 265, I only preserve data with identified pick-up and drop-off locations.

  * **Relationship between Multipolygon Type and Point Type**
  
    The simplest method is **GeoSeries.contains()** provided by geopandas, and it can tell you if a point is in a multipolygon.
  
  * **Relationship between Multipolygon Type and another Multipolygon Type**
  
    The simplest method is **GeoSeries.intersects()** provided by geopandas, which can tell you if two polygons intersect.

# 2. Exploration of things affecting cab operation

An iconic New York City landmark, cabs ply the streets of New York day and night. We can't help but wonder what things influence the use of cabs in such a world capital.

## 2.1 Parking Lots Matter

* **Question**: Does the abundance of parking lots in an area affect people's willingness to use cabs?

* **Perspective**: If I were a cab driver, I would probably care about knowing where I have a higher probability of picking up passengers based on this study. If I were a city manager, I would probably adjust the number and distribution of parking lots based on the correlations revealed by this question.

* **Analysis**: I have divided all the parking lots in New York City according to the NYC Taxi Zones and calculated the number and total area. Then compare them with the total statistics of cab drop-off and pick-up locations from 2017-2021.  

  <div class="row">
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_parking_lot/parking_lot_nums.png" class="column"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_parking_lot/parking_lot_sizes.png" class="column"/>
    </div>

>Left: numbers of every zones' parking lots;  Right: sizes of every zones' parking lots 

  
  <div class="row">
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_total/DO_total.png" 
   class="column"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_total/PU_total.png" class="column"/>
    </div>  
> Left: total drop off records; Right: total pick up records
  

  
  In general, the number and size of parking lots in an area are negatively correlated with the number of cab orders that drop off and pick up in that area. This is especially true in Manhattan, and especially on the Upper East Side. After examining additional information, we know that the Upper East Side is a cultural, shopping div and home to some of the wealthiest residents of New York City. Based on this additional information, we can surmise that the lack of parking spaces, combined with the general affluence of residents, results in much higher cab orders in this area than in other parts of New York. So we can conclude that areas with less parking do have a higher probability of cab use.

## 2.2 Will time change everything?

  * **Question**: Is there a clear trend of change in the pick-up and drop-off area of cab orders as time passes?

  * **Perspective**: If I were a municipal administrator, based on the first study above, if I wanted to plan the number and distribution of parking lots, I would have to make sure that the geographic distribution of cab orders was relatively stable over a defined period of time; after all, you can't remove or install parking lots too often. If I were a cab driver, I would also want my daily pickup routes to be as fixed as possible, so that my income would be more stable as well.

  * **Analysis**: I did the statistical work on the drop-off and pick-up locations of cab orders using the two dimensions of se asons and years as categories. Then they were compared according to their respective categories.

   <div class="row">
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/DO_2017.png" 
   class="column-5"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/DO_2018.png" 
   class="column-5"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/DO_2019.png" 
   class="column-5"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/DO_2020.png" 
      class="column-5"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/DO_2021.png" 
      class="column-5"/>
   </div>
   >Changes in drop-off locations over five years
    
    
   <div class="row">
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/PU_2017.png" 
   class="column-5"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/PU_2018.png" 
   class="column-5"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/PU_2019.png" 
   class="column-5"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/PU_2020.png" 
      class="column-5"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_year/PU_2021.png" 
      class="column-5"/>
   </div> 
   >Changes in pick-up locations over five years
    
    
   We can see from the two sets of results above: the distribution of the drop-off and pick-up areas have both remained almost unchanged over the past five years. However, a decline in the number of orders can still be seen after 2020, which may be the effect of the COVID-19 epidemic.
    
   <div class="row">
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_season/DO_season_1.png" class="column-4"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_season/DO_season_2.png" class="column-4"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_season/DO_season_3.png" class="column-4"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_season/DO_season_4.png" class="column-4"/>
   </div> 
   >Change of drop-off location in four seasons
   <div class="row">
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_season/PU_season_1.png" 
   class="column-4"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_season/PU_season_2.png" 
   class="column-4"/>
      <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_season/PU_season_3.png" 
   class="column-4"/>
   <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_season/PU_season_4.png" 
   class="column-4"/>
   </div> 
   >Change of pick-up location in four seasons
   

From the above two sets of results, we can see that season also has almost no effect on drop-off and pick-up areas distribution.

So we can conclude that the distribution of cab orders we get over geographic locations is a valid pattern over time.

## 2.3 Be yellow, or be green, that is the question

* **Question**: Is driving a yellow cab significantly better than driving a green cab?

* **Perspective**：If I were a city manager, I might be concerned about the disparity in the operation of the two types of vehicles and the possible need to financially subsidize green cab drivers if they have a significant disadvantage over yellow cabs. If I were a cab driver, I might be concerned about whether the two types of vehicles have equal opportunities to make money while operating to choose which cab to drive.

* **Analysis**：I did a statistical work on the pick-up and drop-off locations of cab orders using the color of the cab as the category. Comparisons were then made based on the respective categories.

    <div class="row">
        <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_color/DO_green.png" 
     class="column"/>
        <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_color/DO_yellow.png" class="column"/>
      
      </div>
    >Left: heat map of the number of green cab drop-offs;   Right: heat map of the number of yellow cab drop-offs 
    
    

<div class="row">
    <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_color/PU_green.png" 
 class="column"/>
    <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_color/PU_yellow.png" class="column"/>
  
  </div>
>Left: heat map of the number of green cab pick-ups;   Right: heat map of the number of yellow cab pick-ups

As we can see: yellow cabs mainly serve South Manhattan; while green cabs mainly serve Northern Manhattan, Bronx, Brooklyn and Queens. It can be seen that although the operating area of green cabs is restricted, yellow cabs and green cabs each operate well in the process of people's free choice. Therefore, for the city managers, there is no need to make adjustments according to the color of the vehicle; for cab drivers, the color of the cab doesn't matter at all.

## 2.4 Et vos, subway et bus?

* **Question**: Does taking the bus or subway affect people's willingness to choose a cab?
* **Perspective**： If I were a city manager, I would probably care a lot about the use of various public transportation in order to make adjustments to meet the actual needs of the citizens; if I were a cab driver, I would probably arrange my operating area according to the competition or cooperation of other public transportation and cabs.
* **Analysis**： I divided all the bus stops and subway stations in New York City according to New York City cab zones and computed the numbers. Then compare them with the total statistics of cab drop-off and pick-up locations from 2017-2021.  

<div class="row">
    <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_bus_stop/parking_bus_stop_nums.png" 
 class="column"/>
    <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_sub_stn/sub_stn_nums.png" class="column"/>
  </div>
  >Left: heatmap of numbers of every zones' bus stops;   Right: heatmap of sizes of every zones' subway stations


<div class="row">
    <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_total/DO_total.png" 
 class="column"/>
    <img src="{{ site.url }}{{ site.baseurl }}/public/img/transportation/output_total/PU_total.png" class="column"/>
  </div>  
  > Left: heatmap of total drop off records;   Right: heatmap of total pick up records

As we can see: in busy South Manhattan, using cabs and taking the subway are the two main modes of transportation, and buses are rare. This leads to a question: What is the reluctance of people in South Manhattan to choose buses as a means of transportation? After checking a large number of people's evaluation of the subway and bus, we can conclude that: the bus is little punctual and runs very slowly compared to the subway, in a fast-paced metropolis like New York, it is difficult for people to tolerate slow transportation, so the bus in South Manhattan is not the mainstream transportation. In other areas, particularly the Bronx and Brooklyn, public transportation effectively fills the gap for cab operations. 

After checking the relevant information, we can learn that only 20% of New York City's population lives in Manhattan, so for the remaining 80% of the population, other areas can continue to add new buses and subways to meet the needs of more people. Cabs, especially green cabs, can also operate in these areas for higher revenues.