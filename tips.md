---
layout: page
title: New York Cab Tip Analysis
---

As I came from a non-tipping country, I am very interested in analyzing tips of NYC so I can know how much tip is appropriate for a ride. Meanwhile, analyzing tips is also useful for city administrators and cab venodrs. It can provide them with economic information to adjust drivers' wages or cab fares in order to maximize revenue.

For this project, I will first do some general analysis about the relationship between tipping and other features, then try to construct a model to predict the tip of a trip.  

## 1. ETL

### 1.1. Features Selection

My Guess for factors affecting tipping are:
- **economic situation**: maybe after 2020, passengers will tip less due to the economic recession caused by covid, so time features like _year_, _month_, will be useful;
- **passenger's income**: can be reflected by the _pick-up/drop-off location_.If the trip ends at financial districts, we might assume the passenger are wealthy and tip more;
- **passenger's satisfaction to the trip**: a matter of course, but it seems we cannot find sufficient information from our dataset to demonstrate this;

### 1.2. Further ETL for Tips

- **payment type = 1**:<br>
    The dataset only records tips paid by credit card.
- **Tip Ratio/Percentage**:<br>
    Here we count the `100*tip_amount/(total_amount - tip_amount)` as the tip percent.
- **Tip Range**:<br>
    In addition tip percentage directly, I also determine the tip range to help visualize the massive data.
- **Pickup/Dropdown location**:<br>
    Locations can somehow reflect the income level of passengers.
- **Date, Year, Month**:<br>
    Necessary for analyzing tip changes over time.

## 2. General Analysis

### 2.1. How much do NYC passengers tip?

#### 2.1.1. General Overview
Below are a bar chart of the yellow and green cabs tip distribution from 2017 to 2021. According to [New York Official Guide](https://www.nycgo.com/plan-your-trip/basic-information/tipping-sales-tax#:~:text=Taxi%20drivers%3A%2015%E2%80%9320%20percent,check%20staff%2C%20are%20always%20appreciated.), the tipping to cab driver should be 15–20 percent of total fare, which is confirmed by our result.

<div id="bar-00" class="canvas-400" ></div>
<div id="bar-01" class="canvas-400" ></div>

> Please click the legend to hide/show the data

#### 2.1.2. Crazy Tippers
**Daily Max Tip From 2017 to 2021**
<div id="heatmap-01" class="canvas-400"></div>

### 2.2. Does the economic situation impact on tipping?
 We can see that for both cabs, although the number of trips dropped significantly in 2020 due to covid, the distribution of tipping seems remain, which is kind of overturn our assumption that passengers may tip less during economic recession.

Let's study this in more details. The heatmap below shows the daily mean tip percentage of NYC. The overal mean vary from 17 to 21%, not a significant differene. The mean tip decreased in 2019, and rebound in March 2020. So may be the economic recession only affects on the trip amount. The poor no longer call a taxi, while the rich keep their tipping behavior.

Also notice that there is a high-tip red area from March 2020 to June 2020, the covid lockdown period of NY. This kind of makes sense as passengers tip more when it is difficult to travel. 

<div id="heatmap-00" class="canvas-400"></div>

### 2.3. Does tipping vary by location?

From the previous bar charts, we can also observe that yellow cab passengers tip more than green cab passengers. Quite a few green cab passengers do not tip. In New York, yellow cabs run mainly in busy urban areas, while green cabs, introduced in 2011, run in areas not served by yellow cabs. This lead give us a new question, do tipping vary by pick-up/drop-off locations?

![Mean tip ratio of district]({{site.url}}/public/img/mean_tip_ny.png)

![0 tip]({{site.url}}/public/img/0_tip_ratio.png)

<div id="line-00" class="canvas-400" ></div>

### 2.4. Some interesting facts about NYC tipping

<div id="heatmap-01" class="canvas-400"></div>

We can also observe from the previous bar charts that yellow cab passengers tip more than green cab passengers. Quite a few green cab passengers do not tip. In New York, yellow cabs run mainly in busy urban areas, while green cabs, introduced in 2011, run in areas not served by yellow cabs. This lead to our next question, 

## 3. Predicting Tips
Now let's try to construct models and see if we can predict the tips.

### 3.1. Feature Engineering
Combining previous analysis results, we do a further ETL:
- tip/total ratio <= 0.4
- 

### 3.2. Regression Model

model | Evaluation Score | TOP 2 important features
-| - 
DecisionTree | r2 = 0.0427<br>rmse = 6.5653 | other_amount: 0.8204, fare_amount:0.17484
RandomForest | r2 = 0.0474<br> rmse = 6.5468 | dd
Gradient Boosted Tree | r2 = 0.0427<br>rmse = 6.5653 | other_amount: 0.8204, fare_amount:0.17484

Regerssion models all have poor performance predicting the tip percent. What about predicting the tip range instead of directly predicting the precise tip percent?

### 3.3. Classification Model
model | Evaluation Score | TOP 2 important features
-| - 
DecisionTree | accuracy=0.5977 | other_amount: ,0.58494, fare_amount: 0.3066
RandomForest | r2 = 0.5224|  other_amount: 0.66576, fare_amount: .3144

The performance of classification models are not ideal neither. It seems we do not have sufficient data to predict tip. 

<!-- Random forest
r2 = 0.04782778757031414
rmse = 6.544585289474854
Validation score for regressor:
r2 = 0.04743175106022257
rmse = 6.546860494398106
(9,[1,2,3,4,5,6,7,8],[0.0006658149418888706,0.07474482780909318,0.00664771461953278,0.022515968497505024,0.09028324010115958,2.327246793587595e-05,0.6338079501987203,0.1713112113641643])

gbt
r2 = 0.06206689408092958
rmse = 6.496376598132411
Validation score for regressor:
r2 = 0.06153409225445905
rmse = 6.495483559696155
(9,[1,2,3,4,5,6,7,8],[0.03621393061342227,0.11655310355735328,0.03633715135198239,0.14470491109085734,0.10808599829307362,5.624358247684168e-06,0.2284466106951007,0.32965267003996274]) 


Training score for classifier:
score = 0.5219599181448649
Validation score for classifier:
rmse = 0.5223667017162587
(8,[0,1,2,3,4,5,6,7],[0.0007166769226124161,0.04919912526950851,0.0013692810066321761,0.0019166280729605739,0.05518782918024433,1.6390878658603474e-05,0.5849471263943586,0.3066469422750248])

decision tree
Training score for classifier:
score = 0.5973141758824757
Validation score for classifier:
rmse = 0.5977106426827073
(8,[1,6,7],[0.01981997007694503,0.6657696773482605,0.3144103525747945])
-->

## 4. Some Interesting Facts about NY Cab Tipping

### Top Tip Given Every Year

|Year | Tip Amount | Picup location | Dropoff location|
|- | - | - | -|
|2017|1600|?|?|



### The Most Petty District From 2017 to 2021

## 5. Conclusion
New Yorkers typically tip cabs 15 to 20 percent cab drivers.

