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
