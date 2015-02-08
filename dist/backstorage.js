(function(root, $, _, Backbone) {
  "use strict";

// base function.
var backstorage = backstorage || {};

backstorage.protocols = ['http'];

// version.
backstorage.VERSION = '0.0.1';

// export to the root, which is probably `window`.
root.bs = backstorage;

backstorage.repo = function (uri, options) {
    var repo, model, collection;

    options.model = options.model || {};
    options.model.relations = model.relations || options.relations;
    /* e.g. relations: [{ type: 'HasMany', key: 'employees', relatedModel: 'Job', collectionType: 'Jobs', reverseRelation: { key: 'company'}}] 
       reference: http://backbonerelational.org/
    */

    options.collection = options.collection || {};
    model = Backbone.RelationalModel.extend(options.model);
    options.collection.model = model;
    collection = Backbone.Collection.extend(options.collection);

    repo = { model: model, collection: collection };

    return repo;
};


}(this, this.jQuery, this._, this.Backbone));
