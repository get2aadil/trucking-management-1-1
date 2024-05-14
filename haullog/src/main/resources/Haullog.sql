-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    first_name text COLLATE pg_catalog."default",
    last_name text COLLATE pg_catalog."default",
    company_name text COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (email)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

INSERT INTO users VALUES('admin@email.com', 'admin123');

-- Table: public.shipments

-- DROP TABLE public.shipments;

CREATE TABLE IF NOT EXISTS public.shipments
(
    shipment_id bigint NOT NULL,
    customer_id bigint,
    truck_id bigint,
    shipment_date date DEFAULT CURRENT_DATE,
    creator_id bigint DEFAULT 1,
    driver_id bigint,
    shipment_cost bigint,
    shipment_source character varying(30) COLLATE pg_catalog."default",
    shipment_destination character varying(30) COLLATE pg_catalog."default",
    shipment_status status_shipment,
    CONSTRAINT shipments_pkey PRIMARY KEY (shipment_id)
)

TABLESPACE pg_default;

ALTER TABLE public.shipments
    OWNER to postgres;

INSERT INTO SHIPMENTS (shipment_id, customer_id, driver_id, truck_id, shipment_cost, shipment_status, shipment_source, shipment_destination, creator_id, shipment_date)
VALUES 
(1, 101, 201, 301, 500, 'Pending', 'A', 'B', 1, '2023-12-15'),
(2, 102, 202, 302, 600, 'Delivered', 'B', 'C', 1, '2024-01-20'),
(3, 103, 203, 303, 700, 'In Transit', 'C', 'D', 1, '2024-02-10'),
(4, 104, 204, 304, 800, 'Pending', 'D', 'E', 1, '2024-04-15'),
(5, 105, 205, 305, 900, 'Pending', 'E', 'F', 1, '2024-05-20');

CREATE TYPE "Truck_Activity" AS ENUM (
  'Active',
  'Inactive',
  'Maintenance',
  'Unfixable'
);

CREATE TYPE "Status_Shipment" AS ENUM (
  'Delivered',
  'In Transit',
  'Pending',
  'Incomplete',
  'Payment Pending'
);

CREATE TABLE TRUCKS (
"truck_id" BIGINT PRIMARY KEY,
"truck_brand" VARCHAR(10) NOT NULL,
"truck_model" VARCHAR(10) NOT NULL,
"truck_load" INT NOT NULL,
"purchase_date" DATE,
"activity_status" TRUCK_ACTIVITY);

CREATE TABLE EXPENSES (
EXPENSE_ID BIGINT PRIMARY KEY,
REPORTER_ID BIGINT,
EMPLOYEE_ID BIGINT,
TRUCK_ID BIGINT);