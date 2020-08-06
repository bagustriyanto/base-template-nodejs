-- public."parameter" definition

-- Drop table

-- DROP TABLE "parameter";

CREATE TABLE "parameter" (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	"name" varchar(100) NOT NULL,
	code varchar(5) NOT NULL,
	description varchar(100) NOT NULL,
	created_by varchar(50) NULL,
	created_on timestamp NULL,
	created_host varchar(20) NULL,
	modified_by varchar(50) NULL,
	modified_on timestamp NULL,
	modified_host varchar NULL,
	CONSTRAINT "PK_parameter" PRIMARY KEY (id)
);