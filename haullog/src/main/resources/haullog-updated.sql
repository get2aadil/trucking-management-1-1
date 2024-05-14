-- This file only contains the commands used to run create the tables. 
-- Make sure to only run the code for the tables which are necessary as per the backend requirement
-- In case of any doubts, just use what woorks

CREATE TYPE TRUCK_ACTIVITY AS ENUM (
'Active',
'Inactive',
'Maintenance',
'Unfixable');

CREATE TABLE TRUCKS (
"truck_id" BIGINT PRIMARY KEY,
"truck_brand" VARCHAR(10) NOT NULL,
"truck_model" VARCHAR(10) NOT NULL,
"truck_load" INT NOT NULL,
"purchase_date" DATE,
"activity_status" TRUCK_ACTIVITY);

 CREATE TYPE STATUS_SHIPMENT AS ENUM (
'Delivered',
'In Transit',
'Pending',
'Incomplete',
'Payment Pending');


CREATE TABLE SHIPMENTS (
shipment_id BIGINT PRIMARY KEY,
customer_id BIGINT,
driver_id BIGINT,
truck_id BIGINT,
shipment_cost BIGINT,
shipment_status STATUS_SHIPMENT,
shipment_source VARCHAR(10),
shipment_destination VARCHAR(10),
creator_id BIGINT );


CREATE TABLE EXPENSES (
EXPENSE_ID BIGINT PRIMARY KEY,
REPORTER_ID BIGINT,
EMPLOYEE_ID BIGINT,
TRUCK_ID BIGINT);
