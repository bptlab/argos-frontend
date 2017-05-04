Convention for choosing id's

Entity:
    Entities of rootlevel: 10, 20, 30 and so on
    Children of rootlevel entities: 101, 102, 103, 201, 202, ...
    Continue this schema: Children of 101 get 1011, 1012, 1013, ...

EventTypes:
    99*id of entity*99*counter for ET of this entity*
    id's for root entities would be 9910991, 9910992, 9920991, ...

EventTypeAttributes:
    *id of event type*99*counter of attribute of this entity*
    First attribute of event type 9910991 would be: 9910991991



