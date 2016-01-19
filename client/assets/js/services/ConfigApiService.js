angular.module('fusionSeedApp.services').service('ConfigApiService', function($log){
  var configData = appConfig;

  var defaultConfig = {
    host: 'http://' + window.location.hostname,
    port:'8764',
    authorizationHeader: {headers: {'Authorization': 'Basic ' + btoa('admin:password123')}},
    AllowAnonymousAccess: true,
    user: 'admin',
    password: 'password123',
    collection: 'POI',
    queryPipelineIdList: ['POI-default','POI-signals'],
    queryProfilesIdList: ['default'],
    requestHandlerList: 'select,autofilter',
    addl_params: '', //We might not need this
    searchAppTitle: "Fusion Search Seed App",
    head_field: 'name',
    head_url_field: '',
    thumbnail_field: '',
    thumbnail_enabled: true,
    image_field: '',
    image_enabled: true,
    labels: {
    }
  };

  var appConfig;

  init();

  /**
   * Extend config with the defaults
   */
  function init(){
    appConfig = angular.copy(window.appConfig);
    for(var key in defaultConfig){
      if(defaultConfig.hasOwnProperty(key) && !appConfig.hasOwnProperty(key)){
        appConfig[key] = angular.copy(defaultConfig[key]);
      }
    }
  }

  /**
   * returns Fusion URL
   */
  var getFusionUrl = function(){
    return appConfig.host + ':' + appConfig.port;
  };

  var getQueryPipeline = function(){
    return appConfig.queryPipelineIdList[0];
  };

  var getQueryProfile = function(){
    return appConfig.queryProfileIdList[0];
  };

  var getLoginCredentials = function(){
    return {
      username: appConfig.username,
      passowrd: appConfig.password
    };
  };

  var getLabels = function(){ //TODO: Decide whether defined labels will be the only ones shown
    return appConfig.labels;
  };

  var getAllFields = function(){
    var fieldsMap = {};
    _.filter(_.keys(appConfig), function(item){
      console.log(item);
      return item.match(/\_field$/);
    }).filter(function(item){
      var key = item.split('_')[0]+'_enabled';
      return _.has(appConfig, key)?appConfig[key]:true;
    }).filter(function(item){
      return _.trim(appConfig[item])!=='';
    }).forEach(function(keyName){
      fieldsMap[keyName] = appConfig[keyName];
    });
    return fieldsMap;
  };

  var getSpecificField = function(fieldType){
    var allFields = getAllFields();
    return allFields[fieldType]?allFields[fieldType]:null;
  };

  return {
    getFusionUrl: getFusionUrl,
    getQueryProfile: getQueryProfile,
    getQueryPipeline: getQueryPipeline,
    getLoginCredentials: getLoginCredentials,
    getFields: {
      all: getAllFields,
      get: getSpecificField
    }
  };
});
