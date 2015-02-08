(function(root, $, _, Backbone) {
  "use strict";

var repo = function (uri, options) {
    var model, collection;

    options.model = options.model || {};
    options.model.relations = model.relations || options.relations;
    /* e.g. relations: [{ type: 'HasMany', key: 'employees', relatedModel: 'Job', collectionType: 'Jobs', reverseRelation: { key: 'company'}}] 
       reference: http://backbonerelational.org/
    */

    options.collection = options.collection || {};
    model = Backbone.RelationalModel.extend(options.model);
    options.collection.model = model;
    collection = Backbone.Collection.extend(options.collection);

    return  { model: model, collection: collection };
};


// base function.
var backstorage = backstorage || {};

// version.
backstorage.VERSION = '0.0.1';

backstorage.repo = repo;
// initialize repo

// export to the root, which is probably `window`.
root.bs = backstorage;

}(this, this.jQuery, this._, this.Backbone));
