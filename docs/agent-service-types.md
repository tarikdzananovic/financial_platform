Agent service types
===================

Configuration of agent_service_types
------------------------------------

We need to have configurable list of agent service types as list of:

- service type name
- service type short description
- service type description
- service type doc URL

It can be JSON file loadable on server startup. For starters lets define:

- service_type_name - youtube_b_lclz
- service_type_short_description - YouTube localized banners
- service_type_description - ad campaing using YouTube video banners locallized for you biz service area

and:

- service_type_name - fb_lclz_banners
- service_type_short_description - FaceBook localized ad campaing
- service_type_description - ad campaing runnning on FaceBook tuned for you biz service area

Utilization
-----------

During creation of CTI biz should choose Biz role.

In the case Biz selects to be Agent the Biz should be able:

- specify list of Agent Service Types which Biz is willing to provide. The list is saved in CTI and named as **CTI's agent service types**. User interface should give the list of multiple choices from **agent_service_types**. E.g. certain CTI list can be youtube ads only - user will deselect facebook item in the list.

In the case Biz selects to be Company the Biz should be able:

- specify list of Agent Service Types which Biz is willing to consider in contract talk. Similar logic of multiple choice from
**agent_service types** is applicable here. I.e. **CTI's agent service types** list should be created and saved in CTI object in DB.


During Contract Talk either side can choose only one agent service type from **CTI agent service types** list.

Also:

- each CTI should be handled independently
- further modification of agent_service_types should not affect already created CTIs.
- during Contract Talk neither Agent nor Company can change list **CTI's agent service types**

