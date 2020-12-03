/*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: MIT/X11
 * Code additions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */


var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

Services.scriptloader.loadSubScript("chrome://nostalgy/content/misc.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/composer.js", window, "UTF-8");

function onLoad(activatedWhileWindowOpen) {
     console.log("nostalgy Composer");
     window.onNostalgyLoadComp();
  //   var label_cc=window.document.getElementById("addr_cc");
//     window.showAddressRow(label_cc, 'addressRowCc');
    //window.QuickFolders.Util.logDebug('Adding Compose xul...');
}

function onUnload(isAddOnShutDown) {
}
