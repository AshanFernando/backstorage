/* backstorage main */
var Backbone = root.Backbone;

// Base function.
var backstorage = function () {
    // Add functionality here.
    return true;
};

var registerMonitors = function (uri, repo, protocols) {
    return { uri: uri, repo: repo, protocols: protocols };
};

/* e.g. protocols = ['http', 'localstorage', indexeddb] 
   reference: backstorage.drivers
*/
backstorage.protocols = ['http'];

backstorage.repo = function (uri, options) {
    var repo, model, collection, protocols = options.protocols || backstorage.protocols;

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
    registerMonitors(uri, repo, protocols);
    /* register notifiers and watches */

    return repo;
};

backstorage.Drivers = [];

// Version.
backstorage.VERSION = '0.0.1';

// Export to the root, which is probably `window`.
root.bs = backstorage;
