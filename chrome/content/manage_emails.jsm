/*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: MIT/X11
 * Code additions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */






/*

TODO
* custom keys
* all ESC related keys
* even first folder completion needs arrow key
* export rules should go into clipboard
* TAB in input box not working
* wrong defaultl ocation is shown or rules not saved



*/
var EXPORTED_SYMBOLS = ["manage_emails"];

var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

//var { Nostalgy } = ChromeUtils.import("chrome://nostalgy/content/nostalgy.js");


var manage_emails = {

  lastContains:"",
  lastUnder:"",
  lastFolder:"",
  lastRule:"",
  WL: {},

  //propose rule from last copy/move
  convertToRule: function (mode) {
    this.lastRule = { sender:true, recipients:true, subject:false,
      contains: "", folder: "", under: ""};
//      contains: this.lastContains, folder: NostalgyFolderName(this.lastFolder), under: NostalgyFolderName(this.lastUnder)};
      //NostalgyEditRule(this.lastRule, NostalgyCreateItem);
      

      let mainWindow=Services.wm.getMostRecentWindow("mail:3pane");

      mainWindow.openDialog("chrome://nostalgy/content/edit_prefs.xhtml",
      "_blank",
"dialog,chrome,modal,titlebar,resizable=yes",
mode, this,null);
  },

  applyRule: function applyRule(rule) {
     console.log("applyrule");// see edit.prefs.js

  },
  getCurrentFolder: function getCurrentFolder() {
    let mainWindow=Services.wm.getMostRecentWindow("mail:3pane");
    return mainWindow.gDBView.msgFolder.URI;

  },
  showFolder: function showFolder (folder) {
    let mainWindow=Services.wm.getMostRecentWindow("mail:3pane");
     try {
      if (mainWindow.gFolderTreeView) {
 //       console.log(folder);
      var saved_mode = mainWindow.gFolderTreeView.mode;
//      console.log(this.NostalgyFindFolderExact(folder));
      mainWindow.gFolderTreeView.selectFolder(this.NostalgyFindFolderExact(folder), true);
      mainWindow.gFolderTreeView.mode = saved_mode;
     }
     } catch (ex) { console.log("Ex: " + ex); }

 //     try {
  /*
          while (totry > 0)  {
              mainWindow.gFolderTreeView.selectFolder(folder);
    
              if (window.gFolderTreeView.getIndexOfFolder(folder))
                  totry = 0;
              else {
                  totry--;
                  window.gFolderTreeView.cycleMode(true);
              }
          }
 */
 //     } catch (ex) { NostalgyDebug("Ex: " + ex); }
//      mainWindow.gFolderTreeView.mode = saved_mode;

  },

  getMainWindowElement: function getMainWindowElement (id) {
    let mainWindow=Services.wm.getMostRecentWindow("mail:3pane");
    return mainWindow.document.getElementById(id);

  },

  setQuickFilter: function setQuickFilter(rule) {
    let mainWindow=Services.wm.getMostRecentWindow("mail:3pane");
         let filterer;
         filterer = mainWindow.QuickFilterBarMuxer.activeFilterer;
         filterer.clear();
         filterer.visible = true;
           filterer.filterValues.text = {
              states: {
                recipients: rule.recipients || false,
                sender: rule.sender || false,
                subject: rule.subject   || false,
                body:  false,
              },
              text: rule.contains,
            };
            mainWindow.QuickFilterBarMuxer.deferredUpdateSearch();
            mainWindow.QuickFilterBarMuxer.reflectFiltererState(
              filterer,
              mainWindow.gFolderDisplay
            );
           // let filterValues= mainWindow.QuickFilterBarMuxer.activeFilterer.filterValues.entries();
           // let noSelected= filterValues["results"];//mainWindow.QuickFilterBarMuxer.activeFilterer.filterValues[results];
           // console.log(noSelected);
            console.log(mainWindow.gFolderDisplay.view.dbView.rowCount);
            console.log(mainWindow.QuickFilterBarMuxer.activeFilterer);
           
           function selectMove()
           {
             let noSelected= mainWindow.QuickFilterBarMuxer.activeFilterer.filterValues.results;
             let iC=0;
             //for (iC=0;iC<noSelected;iC++)  mainWindow.gFolderDisplay.selectViewIndex(iC);//mainWindow.gFolderDisplay.tree.view.selection.select(iC); ;
  //let mainWindow1=Services.wm.getMostRecentWindow("mail:3pane");
   console.log(mainWindow.QuickFilterBarMuxer.activeFilterer.filterValues.results);
   mainWindow.gFolderDisplay.treeSelection.clearSelection();
   mainWindow.gFolderDisplay.treeSelection.rangedSelect(0, noSelected-1, true);
  // mainWindow.gFolderDisplay.treeSelection.rangedSelect(1, 1, true);
      mainWindow.gFolderDisplay.view.dbView.doCommandWithFolder(Components.interfaces.nsMsgViewCommandType.moveMessages,
                    this.NostalgyFindFolderExact(rule.folder));
           

            };
            //a listener would be better
            mainWindow.setTimeout( selectMove, 200);//, [parameter1, parameter2, ...]);console.log(mainWindow.QuickFilterBarMuxer.activeFilterer.filterValues.results);
            
            //mainWindow.gFolderDisplay.selectViewIndex(3);
            //mainWindow.gFolderDisplay.tree.view.selection.select(3);
      
  }


};

/*
        async setQuickFilter(tabId, state) {
          let tab = getTabOrActive(tabId);
          let nativeTab = tab.nativeTab;
          let window = Cu.getGlobalForObject(nativeTab);

          let filterer;
          if (tab.active) {
            filterer = window.QuickFilterBarMuxer.activeFilterer;
          } else {
            filterer = nativeTab._ext.quickFilter;
          }
          filterer.clear();

          // Map of QuickFilter state names to possible WebExtensions state names.
          let stateMap = {
            unread: "unread",
            starred: "flagged",
            addrBook: "contact",
            attachment: "attachment",
          };

          filterer.visible = state.show !== false;
          for (let [key, name] of Object.entries(stateMap)) {
            let value = null;
            if (state[name] !== null) {
              value = state[name];
            }
            if (value === null) {
              delete filterer.filterValues[key];
            } else {
              filterer.filterValues[key] = value;
            }
          }

          if (state.tags) {
            filterer.filterValues.tags = {
              mode: "OR",
              tags: {},
            };
            for (let tag of MailServices.tags.getAllTags()) {
              filterer.filterValues.tags[tag.key] = null;
            }
            if (typeof state.tags == "object") {
              filterer.filterValues.tags.mode =
                state.tags.mode == "any" ? "OR" : "AND";
              for (let [key, value] of Object.entries(state.tags.tags)) {
                filterer.filterValues.tags.tags[key] = value;
              }
            }
          }
          if (state.text) {
            filterer.filterValues.text = {
              states: {
                recipients: state.text.recipients || false,
                sender: state.text.author || false,
                subject: state.text.subject || false,
                body: state.text.body || false,
              },
              text: state.text.text,
            };
          }

          if (tab.active) {
            window.QuickFilterBarMuxer.deferredUpdateSearch();
            window.QuickFilterBarMuxer.reflectFiltererState(
              filterer,
              window.gFolderDisplay
            );
          }
          // Inactive tabs are updated when they become active, except the search doesn't. :(
        },

*/
