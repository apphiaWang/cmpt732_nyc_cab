---
layout: page
title: Transportation Analysis
---

#### author: Axida

# 1. ETL

* **Initial ETL**

   Please check [home page]({{ site.url }}{{ site.baseurl }}/introduction) for the intial ETL

* **Geographic Information Data ETL**

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
  

  
In general, the number and size of parking lots in an area are negatively correlated with the number of cab orders that drop off and pick up in that area. This is especially true in Manhattan, and especially on the Upper East Side. After examining additional information, we know that the Upper East Side is a cultural, shopping center and home to some of the wealthiest residents of New York City. Based on this additional information, we can surmise that the lack of parking spaces, combined with the general affluence of residents, results in much higher cab orders in this area than in other parts of New York. 



To further prove this theory, we should also analyze the causes of some counterexamples. So we designed a sampling cross-validation method. 

First, we divided (pick-up data, drop-off data) and (number of parking lots in each zone, total area of parking lots in each zone) into four groups using the Cartesian product operation; then, for each group of data, we added a column of characteristic values named "sign", which is given by the following formula.
![formula]({{ site.url }}{{ site.baseurl }}/public/img/transportation/formula.png)

Then we iterate over each group of data frame. When the zone_id corresponding to two iterated variables are equal, we will perform an XOR operation on their corresponding sign values. If the result is equal to 1(this means that it contradicts our assumption that "taxi use is higher in places with fewer parking lots"), the zone_id will be added to the staging queue.

Thanks to the fact that each set of our data is sorted in descending order, our algorithm is designed to concentrate the results with larger outliers at the beginning and end of the staging list. So we put the beginning 5 results and the last 5 results into the total result set as the final result of this group. After performing the same operation for all four groups and de-duplicating the total result set, we obtain the most representative counterexample that contradicts our original conjecture. Visualizing these counterexamples gives us the results shown in the following figure.

![counter_example]({{ site.url }}{{ site.baseurl }}/public/img/transportation/counter_example.png){:width="60%"}
We can find that these areas that defy our inference have their own unique causes: 

* **LaGuardia Airport**

  New York City's airports are busy enough to cause taxi orders at the airports to be large enough to handle the large amount of passenger traffic. So even though the airport has a relatively large parking lot, there will still be a lot of taxi orders.

* **John F. Kennedy Airport**

  The reason for John F. Kennedy Airport is just like the reason for LaGuardia Airport mentioned above.

* **Hudson Yards**

  Hudson Yards is an area under construction and is expected to be completed in 2027, so even though it has small parking spaces, taxi orders are rare because of the low density of humans in the area.

* **Jamaica Bay**

  Jamaica Bay is full of small, fragmented islands with few taxi orders, even if parking is scarce.

* **Staten Island**

  Staten Island has long been in a natural state of low development and extremely low population density, so there are few taxi orders even though parking is scarce.

* **East Harlem**

  East Harlem has a poor security environment and a high crime rate, so there are fewer corresponding cab orders because people are reluctant to venture into similar areas, even though there is also less parking in this area.

* **Central Harlem North**

  The reason for Central Harlem North is just like the reason for East Harlem mentioned above.

So after the positive and negative analysis mentioned above, we can conclude that areas with fewer parking spaces do have a higher probability of taxi use.

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

As we can see: yellow taxis mainly serve South Manhattan; while green taxis mainly serve Northern Manhattan, Bronx, Brooklyn and Queens. 

On the surface, it appears that green cabs have a more favorable operating area than yellow cabs. However, in reality, as shown by our previous visualization, total cab orders are almost always concentrated in the South Manhattan Peninsula, which means that green cabs face the problem of not being able to pick up orders in the areas where taxis do the best business and having sparse orders in their own operable areas.

To make things even worse, green taxis are subject to certain regulations that yellow taxis are not, such as requirements for vehicle age and fuel efficiency. These regulations can increase the operating costs for green taxi drivers, which can make it more difficult for them to earn a profit.

Another factor we cannot overlook is the rise of ride-hailing services, such as Uber and Lyft, which have disrupted the traditional taxi industry in many cities. These services offer passengers an alternative to taxis, which can reduce the demand for taxi rides and make it harder for drivers to find fares. This is likely to affect both green and yellow taxi drivers, but it may be more difficult for green taxi drivers to compete with ride-hailing services due to their smaller market and limited operating areas.

In fact, there is an overall decline in the number of taxi rides in New York City. According to data from the New York City Taxi and Limousine Commission, the number of taxi rides in the city has fallen by more than 50% since 2015. This decline is likely due to a combination of factors, such as the rise of ride-hailing services, the impact of the COVID-19 pandemic, and changes in consumer preferences. As a result, it may be harder for all taxi drivers in the city to find fares and earn a living.

Overall, there are many factors that contribute to the difficulties faced by green taxi drivers in New York City, including a smaller market, limited operating areas, additional regulations, competition from ride-hailing services, and a decline in the overall demand for taxi rides.

Therefore, for the city managers, they need to seriously study whether they should launch some preferential policies for green cabs; for cab drivers, choosing to drive yellow cabs should be a better choice for now.

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