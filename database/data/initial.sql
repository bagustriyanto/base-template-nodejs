INSERT INTO credentials (id,email,status,"password",username,salt,created_by,created_on,created_host,modified_by,modified_on,modified_host,verification_code,public_user) VALUES 
(1,'adminnodejs@mail.com',true,'OukZ0UVbfBaFUniHcoChfAKZO+SQMBrtPQB2CE47Nw4=','admin_nodejs','xrffLmpoWzjCmFEjwH2sqw==','admin_nodejs',NULL,'::1',NULL,NULL,NULL,NULL,NULL)
;

INSERT INTO "user" (id,credential_id,first_name,last_name,phone,created_by,created_on,created_host,modified_by,modified_on,modified_host) VALUES 
(1,1,'bagus','nodejs',NULL,'admin_nodejs',NULL,'::1',NULL,NULL,NULL)
;

INSERT INTO menu (id,title,url,parent,status,icon) VALUES 
(1,'Master Data','#',NULL,true,NULL)
,(2,'User','/master/user',1,true,NULL)
,(3,'Menu','/master/menu',1,true,NULL)
,(4,'Role','/master/role',1,true,NULL)
,(5,'User Role Map','/master/user-role-map',1,true,NULL)
,(6,'Menu Role Map','/master/menu-role-map',1,true,NULL)
;

INSERT INTO "role" (id,"name",status) VALUES 
(1,'System Admin',true)
;

INSERT INTO role_map (id,role_id,credential_id) VALUES 
(1,1,1)
;

INSERT INTO menu_role_map (id,menu_id,role_id) VALUES 
(1,1,1)
,(2,2,1)
,(3,3,1)
,(4,4,1)
,(5,5,1)
,(6,6,1)
;
