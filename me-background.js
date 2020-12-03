/*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: MIT
 * Code addtions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */



/*
 * Documentation:
 * https://github.com/thundernest/addon-developer-support/wiki/Using-the-WindowListener-API-to-convert-a-Legacy-Overlay-WebExtension-into-a-MailExtension-for-Thunderbird-78
 */


messenger.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
 // if (temporary) return; // skip during development
  switch (reason) {
    case "install":
      {
        const url = messenger.runtime.getURL("popup/installed.html");
//        const url = messenger.runtime.getURL("popup/about_content.html");
        //await browser.tabs.create({ url });
        await messenger.windows.create({ url, type: "popup", height: 740, width: 900, });
      }
      break;
      case "update":
        {
          const url = messenger.runtime.getURL("popup/update.html");
          //await browser.tabs.create({ url });
          await messenger.windows.create({ url, type: "popup", height: 780, width: 990, });
        }
        break;
      // see below
  }
});



async function main() {
    messenger.WindowListener.registerDefaultPrefs("chrome/content/scripts/me-Defaults.js");
    

    messenger.WindowListener.registerChromeUrl([ 
        ["content", "nostalgy", "chrome/content/"],
        ["locale", "nostalgy", "en-US", "chrome/locale/en-US/"],
  //      ["locale", "quickfolders", "ca", "chrome/locale/ca/"],
        ["locale", "nostalgy", "de", "chrome/locale/de/"],
  /*      ["locale", "quickfolders", "es-MX", "chrome/locale/es-MX/"],
        ["locale", "quickfolders", "es", "chrome/locale/es/"],
        ["locale", "quickfolders", "fr", "chrome/locale/fr/"],
        ["locale", "quickfolders", "hu-HU", "chrome/locale/hu-HU/"],
        ["locale", "quickfolders", "it", "chrome/locale/it/"],
        ["locale", "quickfolders", "ja-JP", "chrome/locale/ja-JP/"],
        ["locale", "quickfolders", "nl", "chrome/locale/nl/"],
        ["locale", "quickfolders", "pl", "chrome/locale/pl/"],
        ["locale", "quickfolders", "pt-BR", "chrome/locale/pt-BR/"],
        ["locale", "quickfolders", "ru", "chrome/locale/ru/"],
        ["locale", "quickfolders", "sl-SI", "chrome/locale/sl-SI/"],
        ["locale", "quickfolders", "sr", "chrome/locale/sr/"],
        ["locale", "quickfolders", "sv-SE", "chrome/locale/sv-SE/"],
        ["locale", "quickfolders", "vi", "chrome/locale/vi/"],
        ["locale", "quickfolders", "zh-CN", "chrome/locale/zh-CN/"],
        ["locale", "quickfolders", "zh-CHS", "chrome/locale/zh-CN/"],
        ["locale", "quickfolders", "zh", "chrome/locale/zh/"],
        ["locale", "quickfolders", "zh-CHT", "chrome/locale/zh/"],
        ["locale", "quickfolders", "zh-TW", "chrome/locale/zh/"]
    */
       ]);

 
    messenger.WindowListener.registerOptionsPage("chrome://nostalgy/content/edit_prefs.xhtml"); 
    
 //attention: each target window (like messenger.xul) can appear only once
 // this is different from chrome.manifest
 // xhtml for Tb78
    // messenger.WindowListener.registerWindow("chrome://messenger/content/messenger.xhtml", "chrome/content/scripts/qf-messenger.js");

    messenger.WindowListener.registerWindow("chrome://messenger/content/messenger.xul", "chrome/content/scripts/me-messenger.js");
    messenger.WindowListener.registerWindow("chrome://messenger/content/messenger.xhtml", "chrome/content/scripts/me-messenger.js");

    //messenger.WindowListener.registerWindow("chrome://messenger/content/messengercompose.xul", "chrome/content/scripts/qf-composer.js");
    messenger.WindowListener.registerWindow("chrome://messenger/content/messengercompose/messengercompose.xhtml", "chrome/content/scripts/me-composer.js");
/*
    messenger.WindowListener.registerWindow("chrome://messenger/content/FilterListDialog.xul", "chrome/content/scripts/qf-filterlist.js");
    messenger.WindowListener.registerWindow("chrome://messenger/content/FilterListDialog.xhtml", "chrome/content/scripts/qf-filterlist.js");
 
    messenger.WindowListener.registerWindow("chrome://messenger/content/SearchDialog.xul", "chrome/content/scripts/qf-searchDialog.js");
    messenger.WindowListener.registerWindow("chrome://messenger/content/SearchDialog.xhtml", "chrome/content/scripts/qf-searchDialog.js");

    messenger.WindowListener.registerWindow("chrome://messenger/content/customizeToolbar.xul", "chrome/content/scripts/qf-customizetoolbar.js");
    messenger.WindowListener.registerWindow("chrome://messenger/content/customizeToolbar.xhtml", "chrome/content/scripts/qf-customizetoolbar.js");
*/
    messenger.WindowListener.registerWindow("chrome://messenger/content/messageWindow.xul", "chrome/content/scripts/me-messageWindow.js");
    messenger.WindowListener.registerWindow("chrome://messenger/content/messageWindow.xhtml", "chrome/content/scripts/me-messageWindow.js");
  //  messenger.WindowListener.registerWindow("chrome://messenger/content/messageWindow.xhtml", "chrome/content/scripts/me-messenger.js");

 /* 
  
    messenger.WindowListener.registerStartupScript("chrome/content/scripts/qf-startup.js");
    messenger.WindowListener.registerShutdownScript("chrome/content/scripts/qf-shutdown.js");
*/
 /*
  * Start listening for opened windows. Whenever a window is opened, the registered
  * JS file is loaded. To prevent namespace collisions, the files are loaded into
  * an object inside the global window. The name of that object can be specified via
  * the parameter of startListening(). This object also contains an extension member.
  */


    messenger.WindowListener.startListening();
}

main();
