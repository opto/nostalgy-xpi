/*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: Zlib
 * Code additions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */


var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
/*
Services.scriptloader.loadSubScript("chrome://nostalgy/content/misc.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/nostalgy-autocomplete.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/folders.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/nostalgy_keys.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/sqlite.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/nfpredict.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/nostalgy.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/header_parser.js", window, "UTF-8");
*/


var { manage_emails } = ChromeUtils.import("chrome://nostalgy/content/manage_emails.jsm");

Services.scriptloader.loadSubScript("chrome://nostalgy/content/misc.js", window, "UTF-8");
//Services.scriptloader.loadSubScript("chrome://nostalgy/content/nostalgy-autocomplete.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/folders.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/nostalgy_keys.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/sqlite.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/nfpredict.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/nostalgy.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/header_parser.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://nostalgy/content/edit_prefs.js", window, "UTF-8");




function onLoad(activatedWhileWindowOpen) {
/*
    let layout = WL.injectCSS("chrome://quickfolders/content/quickfolders-palettes.css");
    layout.setAttribute("title", "QuickFolderPalettes");

 

*/
    WL.injectElements(`

    <commandset id="mailCommands">
    <command id="cmd_nostalgyconfig" label="Nostalgy++..."
      oncommand="openDialog('chrome://nostalgy/content/edit_prefs.xhtml', 'nostalgy', 'resizable');"/>
   </commandset>


   <menupopup id="taskPopup">
   <menuitem id="nostalgy"
      command="cmd_nostalgyconfig" insertafter="menu_preferences"/>
  </menupopup>
 
 


  <hbox insertbefore="statusbar-progresspanel"   class="statusbar">
<label  id="statusbar-nostalgy-label" class="statusbarpanel"
      value="&nostalgy.memo;"/>
<label  id="statusbar-nostalgy-label-newRule" class="statusbarpanel"
      value="rule: (n)ew / conv(e)rt"/>

      </hbox>

      <hbox id="nostalgy-statusbar"  style="display:inline-block; width:40em"
      insertbefore= "statusbar-nostalgy-label-newRule"  hidden="true">
      <label id="nostalgy-command-label"   for ="nostalgy-folderbox"/>
    
          <html:input is="autocomplete-input" id="nostalgy-folderbox"
       type="text"
    
       disableonsend="true"
       autocompletesearch="nostalgy-autocomplete"
       autocompletesearchparam="{}"
       timeout="300"
       maxrows="25"
       completedefaultindex="true"
       forcecomplete="true"
    
       minresultsforpopup="2"
       ignoreblurwhilesearching="true"
    
       ontextentered="NostalgyRunCommand();"
       ontextreverted="NostalgyHide(true);"
       completeselectedindex="true"
       highlightnonmatches="true"
       crop="center"
       recipienttype="addr_to"
       onkeyup="onNostalgyInputKeyPressed(event);"
       size="70"
    
       />
      
    
       </hbox> 
 


`, ["chrome://nostalgy/locale/nostalgy.dtd"]);

 
console.log("messageWindow-nostalgy");
window.onNostalgyLoad();


}

function onUnload(isAddOnShutDown) {
    console.log("unload messageWindow-nostalgy");
//    window.onNostalgyUnload();  //also unregisters factory??
}
