 /*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: Zlib
 * Code additions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */

var { manage_emails } = ChromeUtils.import("chrome://nostalgy/content/manage_emails.jsm");



Components.manager.QueryInterface(Ci.nsIComponentRegistrar);


var {XPCOMUtils} = ChromeUtils.import('resource://gre/modules/XPCOMUtils.jsm');
var {Services} = ChromeUtils.import("resource://gre/modules/Services.jsm");


var CLASS_ID = Components.ID('0368fb30-62f8-11e3-949a-0800200c9a66');
var CLASS_NAME = "Nostalgy Folder Autocomplete";
var CONTRACT_ID = '@mozilla.org/autocomplete/search;1?name=nostalgy-autocomplete';


// nsIAutoCompleteResult implementation

function NostalgyDebug(aText)
{
  var csClass = Components.classes['@mozilla.org/consoleservice;1'];
  var cs = csClass.getService(Components.interfaces.nsIConsoleService);
  cs.logStringMessage(aText);
}

function NostalgyAutoCompleteResult(searchString, results) {
  const ACR = Ci.nsIAutoCompleteResult;
  this._searchResult = results.length > 0 ? ACR.RESULT_SUCCESS : ACR.NOMATCH;
  this._searchString = searchString;
  this._results = results;
}

NostalgyAutoCompleteResult.prototype = {
  _searchString: "",
  _searchResult: 0,
  _results: [],

  get searchString() { return this._searchString; },
  get searchResult() { return this._searchResult; },
  get defaultIndex() { return 0; },
  get errorDescription() { return ""; },
  get matchCount() { return this._results.length; },
  getValueAt: function(index) { return this._results[index]; },
  getCommentAt: function(index) { return ""; },
  getStyleAt: function(index) { return null; },
  getImageAt : function (index) { return ""; },
  removeValueAt: function(index, removeFromDb) { this._results.splice(index, 1); },
  getLabelAt: function(index) { return this._results[index]; },
  QueryInterface: ChromeUtils.generateQI([ Ci.nsIAutoCompleteResult ]),
};


// nsIAutoCompleteSearch implementation

function NostalgyAutoCompleteSearch() {
  this.wrappedJSObject = this;
}

NostalgyAutoCompleteSearch.prototype = {
  classID: CLASS_ID,
  classDescription : CLASS_NAME,
  contractID : CONTRACT_ID,
  _f: {},
  _id: 0,

  attachGetValuesFunction: function(f) { this._id++; this._f[this._id] = f; return this._id; },

  startSearch: function(searchString, searchParam, previousResult, listener) {
    var searchResults = this._f[searchParam](searchString);
    var result = new NostalgyAutoCompleteResult(searchString, searchResults);
    listener.onSearchResult(this, result);
  },

  stopSearch: function() {},

  QueryInterface: ChromeUtils.generateQI([ Ci.nsIAutoCompleteSearch ]) ,
};


// XPCOM component creation

//const NSGetFactory = XPCOMUtils.generateNSGetFactory([ NostalgyAutoCompleteSearch ]);


function Factory(component) {
  this.createInstance = function(outer, iid) {
    if (outer) {
      throw Cr.NS_ERROR_NO_AGGREGATION;
    }
    return new component();
  };
  this.register = function() {
    if (! manage_emails.factory_registered) {
                      Components.manager.registerFactory(component.prototype.classID,
                       component.prototype.classDescription,
                       component.prototype.contractID,
                       this);
    this.registered++;
    manage_emails.factory_registered=true;
                      }
                      };
  this.unregister = function() {
    if ( manage_emails.factory_registered) {
         Components.manager.unregisterFactory(component.prototype.classID, this);
    this.registered--;
    manage_emails.factory_registered=false;
    }
  }
  Object.freeze(this);
  if (!this.registered || (!manage_emails.factory_registered)) {
    this.register();
   }
}

Factory.prototype = {
registered:0
}
var factory = new Factory(NostalgyAutoCompleteSearch);
