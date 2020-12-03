/*
 * License:  see License.txt
 * Code until Nostalgy 0.3.0/Nostalgy 1.1.15: MIT/X11
 * Code additions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */


var nostalgy_keys = [
  ["save","Save message","S",
   "JS:NostalgyCmd('Move messages to:', NostalgyMoveToFolder, true);"],
  ["save_suggest","Save as suggested","shift S",
   "JS:NostalgySuggested(NostalgyMoveToFolder);"],
  ["copy","Copy message","C",
   "JS:NostalgyCmd('Copy messages to:', NostalgyCopyToFolder, true);"],
  ["copy_suggest","Copy as suggested","shift C",
   "JS:NostalgySuggested(NostalgyCopyToFolder);"],
  ["go","Go to folder","G",
   "JS:NostalgyGoCommand();"],
  ["go_suggest","Go as suggested","shift G",
   "JS:NostalgyGoSuggestedCommand();"],
  ["save_go","Save message and go there","B",
   "JS:NostalgySaveAndGo();"],
  ["save_go_suggest","Save message as suggested and go there",
   "shift B",
   "JS:NostalgySaveAndGoSuggested();"],

  ["hide_folders","Hide folder pane","L",
   "JS:NostalgyCollapseFolderPane();"],
  ["search_sender","Show messages with same sender/same subject","Q",
   "JS:NostalgySearchSender();"],

   ["new_rule","Create new rule","N",
   "JS:manage_emails.convertToRule('new');"],
   ["convert_rule","Convert to new rule","E",
   "JS:manage_emails.convertToRule('convert');"],
  ];


