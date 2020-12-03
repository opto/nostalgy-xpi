/*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: MIT/X11
 * Code additions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */


function NostalgyEBI(id) { return document.getElementById(id); }

function PrefService() {
  return Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefService);
}

function PrefBranch() {
  return Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefBranch);
}

function NostalgyDebug(aText)
{
  var csClass = Components.classes['@mozilla.org/consoleservice;1'];
  var cs = csClass.getService(Components.interfaces.nsIConsoleService);
  cs.logStringMessage(aText);
}

function NostalgyStopEvent(ev) {
  ev.preventDefault();
  //ev.stopPropagation();
  ev.stopImmediatePropagation();

}

function NostalgyJSONEval(s) {
  if (/^("(\\.|[^"\\\n\r"])*?"|[a-z]+:|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)) {
    try {
      return eval('(' + s + ')');
    } catch (e) {
      NostalgyDebug("parseJSON 1: " + s);
      return null;
    }
  } else {
    NostalgyDebug("parseJSON 2:" + s);
    return null;
  }
}

