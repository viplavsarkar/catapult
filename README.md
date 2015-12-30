# catapult
This is the Root of the Catapult Project. 

Components are

1) Infrastucture
2) CompositeServices
3) MicroServices -- to be added in due course of time


Infrastucture contains the core stucture to run any CompositeService or MicroService
It Constist of :-

1) Config Server :- 
This contain all the application config for every project, Only boot level properties should be there in application's
bootstrap.yml. We are using .yml files not the properties files just for consistencey please dont use .properties file

2) Discovery Server:-
We are using Eureka as our discovery service and all the serivces should register themself in euraka, Please make that
different service should have different spring.appliction.name in there bootstrap.yml file so that we don't get any conflict
while registring. 

3) Edge Server :-
We are using Zuul as our EdgeServer/GateKeeper. And are usring Eureka/Ribbon for loadbalancing. Zuul will have end point only
for the compositeservice and not for the microservice, microservices will never be called from the outside world.

4) Hystric-DashBoard :-
Also to mention that we are using hystrix as curcuit breaker. Hysitrix dashboard just provide us with the overview of what's
going-on with services, how many are down or having errors. We might eventually remove the HystrixDashBoard and use
Spring-Cloud-DashBoard to monitor every thing

5) Turbine :- 
We are using Spring-Tubine-Strean project for steaming data from the application to the hystrix.
Turbine uses rabbitmq underline to make pub-sub model, where publishers are applications and subscriber is hystrix

6)Spring-CloudDashBoard :-  This is used to monitor and manage the application registered with Eureka, and to see the moniter
application of open circuits. 



 

