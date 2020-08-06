-- public.menu definition

-- Drop table

-- DROP TABLE menu;

CREATE TABLE menu (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	title varchar(50) NULL,
	url varchar(100) NULL,
	parent int8 NULL,
	status bool NULL,
	icon varchar(20) NULL,
	CONSTRAINT "PK_menu" PRIMARY KEY (id),
	CONSTRAINT fk_parent FOREIGN KEY (parent) REFERENCES menu(id) ON DELETE RESTRICT
);
CREATE INDEX "IX_menu_parent" ON public.menu USING btree (parent);