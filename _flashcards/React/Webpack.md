# Webpack

IIFE pattern means you encapsulate each module in a function. The function
defines an inner object that contains everything that needs to be shared
(exports or getters and setters). The function scope completely encapsulates the
module. Anything defined within the module is not available to the outside.

Webpack transforms each module to an IIFE and assigns an ID. Then there is a
mapping table that maps import strings to theSe IDs. Then there is a mechanism
around to invoke the modules...
