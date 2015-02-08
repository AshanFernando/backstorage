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
