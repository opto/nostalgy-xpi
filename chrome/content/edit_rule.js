/*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: MIT/X11
 * Code additions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */


gFolderSelect = null;
var gContainsSelect = null;
var gUnderSelect = null;

function onNostalgyEditRuleLoad() {
 document.addEventListener("dialogaccept", (event) => { onNostalgyAcceptChanges(); });
 var rule = window.arguments[0];
 if (!rule) { alert("rule=null!"); }

 NostalgyFolderSelectionBoxes();

 gContainsSelect = NostalgyEBI("contains");
 gFolderSelect = NostalgyEBI("folderselect");
 gUnderSelect = NostalgyEBI("underselect");

 
 gContainsSelect.focus();

 gFolderSelect.value = rule.folder;
 gUnderSelect.value = rule.under;
 gContainsSelect.value = rule.contains;
 NostalgyEBI("sender").checked = rule.sender;
 NostalgyEBI("recipients").checked = rule.recipients;
 NostalgyEBI("subject").checked = rule.subject;
}




function onNostalgyAcceptChanges() {


 var folder = NostalgyFindFolderExact(gFolderSelect.value);
 if (!folder) {
   alert("Please choose an existing folder");
   gFolderSelect.focus();
   return false;
 }
 if (gContainsSelect.value == "") {
   alert("Please provide a non-empty string for 'contains'");
   return false;
 }
 var rule = { 
    sender: NostalgyEBI("sender").checked,
    recipients: NostalgyEBI("recipients").checked,
    subject: NostalgyEBI("subject").checked,
    contains: gContainsSelect.value,
    folder: NostalgyFolderName(folder),
    under: gUnderSelect.value
 };
 
 let action=null;
 if (window.arguments[1] == null)  action = "NostalgyCreateItem"  ; else action = window.arguments[1];
 //(window.arguments[1])(rule);
 (action)(rule);

 return true;
}

function NostalgyChooseFolder() {
  if (gFolderSelect.value != "") {
    var folder = NostalgyResolveFolder(gFolderSelect.value);
    if (folder) { gFolderSelect.value = NostalgyFolderName(folder); }
  }
}

function NostalgyChooseUnder() {
  if (gUnderSelect.value != "") {
    var under = NostalgyResolveFolder(gUnderSelect.value);
    if (under) { gUnderSelect.value = NostalgyFolderName(under); }
    setTimeout(function(){gFolderSelect.focus();},30);
  }
}

function onNostalgyKeyPressTxt(ev) {
  if (ev.keyCode==KeyEvent.DOM_VK_RETURN) {
   setTimeout(function(){gUnderSelect.focus();},30);
   NostalgyStopEvent(ev);
  }
}

window.addEventListener("load", onNostalgyEditRuleLoad, false);


