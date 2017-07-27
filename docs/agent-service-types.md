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

- service_type_name - fb_lclz_banners
- service_type_short_description - FaceBook localized ad campaing
- service_type_description - ad campaing runnning on FaceBook tuned for you biz service area

Utilization
-----------

During creation of CTI biz should choose Biz role. In the case Biz selects to be Agent the Biz should be able:

- specify list of Agent Service Types which Biz is willing to provide. This can be done by giving list of
multiple choices from list **agent_service_types**. E.g. certain CTI list can be youtube ads only - deselecting facebook item
in the list.
- each CTI should be handled independently
- further modification of agent_service_types should not affect already created CTIs.
