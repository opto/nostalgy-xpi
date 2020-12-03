/*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: MIT/X11
 * Code additions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */


function NostalgyEBI(s) { return document.getElementById(s); }

var nostalgy_old_awRecipientKeyPress = 0;

var prefs = PrefBranch();



function nostalgy_awRecipientKeyPress(event, element) {
/**/
  var id = element.id;
  if (id.match(/addressCol2#/)) {
  var select = NostalgyEBI(id.replace(/addressCol2#/,"addressCol1#"));
  var v = element.value;
  var u = v.replace(/ >> .*/, "");
  var i = element.selectionStart;
  var f = v.substr(0,i);
  if (event.key == " " && (f == "to" || f == "cc" || f == "bcc")) {  
    select.value = "addr_" + f;
    element.value = "";
    setTimeout(function(){
      element.value = u.substr(i,u.length - i);
      element.selectionStart = 0; element.selectionEnd = 0;
    }, 0);
    NostalgyStopEvent(event);
    return;
  }
  }
  nostalgy_old_awRecipientKeyPress(event, element);

}

var NostalgyEscapePressed = 0;

function NostalgyEscape() {
  NostalgyEscapePressed++;
  var i = NostalgyEscapePressed;
  setTimeout(
    function(){ if (NostalgyEscapePressed==i) NostalgyEscapePressed = 0; },
    300);
  if (NostalgyEscapePressed == 2) setTimeout(SetMsgBodyFrameFocus,0);
}

function NostalgyKeyPress(ev) {
  //console.log(ev.target.value);
  if (ev.keyCode == KeyEvent.DOM_VK_ESCAPE) { NostalgyEscape(); }
  else if (NostalgyEscapePressed >= 1) {
    if (ev.key =="a") { // A
      goDoCommand('cmd_attachFile');
      NostalgyStopEvent(ev);
    }
    if (ev.key =="b") { // B
      var label_bcc=window.document.getElementById("addr_bcc");
      window.showAddressRow(label_bcc, 'addressRowBcc');
          NostalgyStopEvent(ev);
    }
  }
  if (ev.key =="c") { // C
    var label_cc=window.document.getElementById("addr_cc");
    window.showAddressRow(label_cc, 'addressRowCc');
        NostalgyStopEvent(ev);
  }
}


var manage_emails = {};

var toInputString="";
function toInputUpdateValue(e) {
  console.log("key"+e.key);
 // console.log(e.target.value);
/**/
  const toInput = NostalgyEBI("toAddrInput");;
  toInputString+= e.key ;
 //console.log("Input"+toInput.value);
 console.log("Merker"+toInputString);
 if ((e.key=="Enter") | (e.key=="Control") ) 
 {
  toInputString="";

 }
   
  
  if (toInputString=="bcc ")  
 {
 
  var label_cc=window.document.getElementById("addr_bcc");
  window.showAddressRow(label_cc, 'addressRowBcc');
   toInput.value="";
   toInputString="";
   console.log("Merker leer"+toInputString);
 
   e.target.value="";
   console.log("bcc found");
 }
 if (toInputString=="cc ")  
 {
  var label_cc=window.document.getElementById("addr_cc");
  window.showAddressRow(label_cc, 'addressRowCc');
  toInput.value="";
   toInputString="";e.target.value="";
   console.log("cc found");
 }
 if (toInputString=="to ")  
 {
  var label_cc=window.document.getElementById("addr_to");
  window.showAddressRow(label_cc, 'addressRowTo');
   toInput.value="";
   toInputString="";e.target.value="";
   console.log("to found");
 }
  manage_emails.oldOnbeforehandlekeydown(e);

}

//var oldfktn={};
// create an observer instance
var target = window.document.getElementById("headers-box");
//console.log(target);
//console.log(target);
var done=0, ccdone=0, bccdone=0;
 observer = new (window.MutationObserver)(function (mutations) {
    //debugger;
    mutations.forEach(function (mutation) {
      //console.log(mutation.currentTarget );//console.log("Success");
        //$('#log').text('input text changed: "' + target.text() + '"');
        //console.log(mutation, mutation.type);
    });
    try 
{
    let showCC = prefs.getBoolPref("extensions.manage_emails.showCC");
    let showBCC = prefs.getBoolPref("extensions.manage_emails.showBCC");  

    if (showCC) {
      var label_cc=window.document.getElementById("addr_cc");
      window.showAddressRow(label_cc, 'addressRowCc');
  
    };

    if (showBCC) {
      var label_bcc=window.document.getElementById("addr_bcc");
      window.showAddressRow(label_bcc, 'addressRowBcc');
  
    };

    console.log("headers-box changed");
    //to
    var inp = window.document.getElementById("toAddrInput");
    if (!done) {
      manage_emails.oldOnbeforehandlekeydown = inp.onBeforeHandleKeyDown;
      done=1;
    }
    inp.onBeforeHandleKeyDown = toInputUpdateValue;
    //cc
    inp = window.document.getElementById("ccAddrInput");
    if (!ccdone) {
      manage_emails.oldOnbeforehandlekeydown = inp.onBeforeHandleKeyDown;
      done=1;
    }
    inp.onBeforeHandleKeyDown = toInputUpdateValue;
   //bcc
   inp = window.document.getElementById("bccAddrInput");
   if (!bccdone) {
     manage_emails.oldOnbeforehandlekeydown = inp.onBeforeHandleKeyDown;
     done=1;
   }
   inp.onBeforeHandleKeyDown = toInputUpdateValue;
 //debugger;

}
catch(e) {console.log("headers-box not changed");}; 
 /*   */   
});
observer.observe(target, { attributes: true, attributeFilter: ["style"], childList: true, characterData: true, subtree: true });
console.log("searchDialog-observer");

function onNostalgyLoadComp(){
  //nostalgy_old_awRecipientKeyPress = window.awRecipientKeyPress;
  //window.awRecipientKeyPress = nostalgy_awRecipientKeyPress;
  window.addEventListener("keypress", NostalgyKeyPress, false);

  const toInput = NostalgyEBI("toAddrInput");;
  //const log = document.getElementById('values');
  //manage_emails.oldOnbeforehandlekeydown = toInput.onBeforeHandleKeyDown;
  //toInput.onBeforeHandleKeyDown = toInputUpdateValue;
  
  //toInput.addEventListener('keydown', toInputUpdateValue);
  
 
}

//window.addEventListener("load", onNostalgyLoadComp, false);
