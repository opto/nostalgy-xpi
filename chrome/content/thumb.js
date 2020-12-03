var { MailUtils } = ChromeUtils.import("resource:///modules/MailUtils.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
var {NetUtil} =   ChromeUtils.import("resource://gre/modules/NetUtil.jsm");
var { MsgHdrToMimeMessage } = ChromeUtils.import("resource:///modules/gloda/MimeMessage.jsm");

  function getMime (mimeHdr, aMimeMsg)  {
    console.log (aMimeMsg);
    let test=aMimeMsg;
    debugger;
    return;
    };


    function onThumbKeyPress(ev) {
         if ( ev.key == "Esc") {
          NostalgyStopEvent(ev);
         window.close();
         }
         }
    


var imgIndex=0;
var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
.getService(Components.interfaces.nsIWindowMediator);
var win = wm.getMostRecentWindow("mail:3pane");

var attachList = win.document.getElementById('attachmentList');
 

    function loadThumb(window1, attachments) {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
		        .getService(Components.interfaces.nsIWindowMediator);
		var win = wm.getMostRecentWindow("mail:3pane");
   window = win;
    var thumbWin = win.openDialog("chrome://nostalgy/content/thumb.xhtml", "nostalgy", "chrome,centerscreen,dependent,alwaysRaised");
  
}

function StartThumb(window) {
  img = window.document.getElementById("preview1a");
  label =   window.document.getElementById("fname");

  imgIndex = window.arguments[0] - 1;
  if (imgIndex>=attachList.childNodes.length ) {
    label.value = "This attachment does not exist";
    setTimeout( () => {window.close();},700);
    return;
  }

  window.addEventListener("keypress", onThumbKeyPress, false);
//  window.title = "test";
    var img;
  //debugger;
    //label.value = "new";

    //debugger;
    var attachment = attachList.childNodes[imgIndex].attachment;
    console.log(attachment);
    console.log(attachment.contentType);
    let contentType = attachment.contentType;
    if (contentType == "image/jpeg"
    || contentType == "image/jpg"
    || contentType == "image/pjpeg"
    || contentType == "image/pjpg"
    || contentType == "image/gif"
    || contentType == "image/tif"
    || contentType == "image/png")
    {
   let src = attachment.url;  //=img.src
    img.src=src;
    let stpos = attachment.url.indexOf("filename");
    let imgname = attachment.url.substr(stpos+9);
    label.value = imgname;
    }
    else {
      label.value = "This attachment is no image";
      setTimeout( () => {window.close();},700);
    }        

  
}

function NextThumb(window) {
    var img;
  //debugger;
    img = window.document.getElementById("preview1a");
    label =   window.document.getElementById("fname");
//    label.value = "new";

    //debugger;
    if (imgIndex < (attachList.childNodes.length-1)) {
      imgIndex++;
    var attachment = attachList.childNodes[imgIndex].attachment;
 //   console.log(attachment);
    let src = attachment.url;  //=img.src
    img.src=src;
    let stpos = attachment.url.indexOf("filename");
    let imgname = attachment.url.substr(stpos+9);
    label.value = imgname;
}
    else {
//deactivate button
    }

  
}


function PrevThumb(window) {
  var img;
//debugger;
  img = window.document.getElementById("preview1a");
  label =   window.document.getElementById("fname");
  label.value = "new";

  //debugger;
  if (imgIndex >0) {
    imgIndex--;
  let attachment = attachList.childNodes[imgIndex].attachment;
//   console.log(attachment);
  let src = attachment.url;  //=img.src
  img.src=src;
  }
  else {
//deactivate button
  }


}

function StreamListener  (resolve, reject) {
  return {
    _data: "",
    _stream: null,

    QueryInterface: ChromeUtils.generateQI([
      Ci.nsIStreamListener,
      Ci.nsIRequestObserver,
    ]),

    onStartRequest(aRequest) {},
    onStopRequest(aRequest, aStatusCode) {
      try {
    //    resolve.src="data:image/jpeg;base64,"+ btoa( this._data);
 //       resolve.height="200px";
 //       resolve.width="200px";
     //  resolve(this._data);
        console.log(this._data);
      } catch (e) {
       // reject("Error inside stream listener:\n" + e + "\n");
      }
    },

    onDataAvailable(aRequest, aInputStream, aOffset, aCount) {
      if (this._stream == null) {
        this._stream = Cc["@mozilla.org/binaryinputstream;1"].createInstance(
          Ci.nsIBinaryInputStream
        );
        this._stream.setInputStream(aInputStream);
      }
      this._data += this._stream.readBytes(aCount);
    },
  };
}


var slideTeo = {

    start_full: false,

  getImageElement: function(win) {
    if (win == null)
      win = window;
    var el = win.document.getElementById('slide-image');
    if (!el)
      throw new Error("cant find image 'slide-image'");
    return el;
  },

  getImageElementByID: function(win, id) {
    if (win == null)
      win = window;
    var el = win.document.getElementById(id);
    if (!el)
      throw new Error("cant find image "+id);
    return el;
  },



  // Zooming
  doZoomTo: function(percent) {
  //  dump("ZOOMTO " + percent + "\n");
    var img = slideTeo.getImageElement(window);
    var newWidth =  percent * img.originalSize.width / 100;
    var newHeight =  percent * img.originalSize.height / 100;
    // fit the image
    img.style.width = newWidth + "px";
    img.style.height = newHeight + "px";
    //Fit the enclosing box
      if( window.attachments[img.index].angRot%180 == 0 ) {
      img.parentNode.style.minHeight = newHeight + "px";
      img.parentNode.style.minWidth = newWidth + "px";
      img.parentNode.style.width = newWidth + "px";
    }
    else {
      img.parentNode.style.minHeight = newWidth + "px";
      img.parentNode.style.minWidth = newHeight + "px";
      img.parentNode.style.width = newHeight + "px";
    }
    // Set the dragging cursor
    if (img.parentNode.parentNode.getBoundingClientRect().width < newWidth
      || img.parentNode.parentNode.getBoundingClientRect().height < newHeight)
      img.style.cursor = "move";
    else
      img.style.cursor = "auto";
    //Remember our variables
    img.zoomLevel = percent;
    img.bestFit = false;
  },

  // Fits image inside surrounding box
  doZoomBestFit: function() {
    var img = slideTeo.getImageElement(window);
    var box = img.parentNode.parentNode;
    var branch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    if( window.attachments[img.index].angRot%180 == 0 ) {
      var xscale = (box.getBoundingClientRect().width - 6) / img.originalSize.width;  // -15 to hide the potential scrollbars
      var yscale = (box.getBoundingClientRect().height - 6) / img.originalSize.height;
      }
    else {
      var xscale = (box.getBoundingClientRect().width - 6) / img.originalSize.height;  // -15 to hide the potential scrollbars
      var yscale = (box.getBoundingClientRect().height - 6) / img.originalSize.width;
    }
    var scale = xscale < yscale ? xscale : yscale;
    if ((scale > 1)&&(!branch.getBoolPref( "extensions.slideshowski@totic.org.allowzoomin" ))) // do not zoom in
      scale = 1;
    // scale & display the image
    slideTeo.doZoomTo(scale * 100);
    img.bestFit = true;
  },
  // Preset zoom percentages, used for zoomin/out
  zoomLevels : [1, 8, 10, 15, 20, 25, 50, 75, 100, 150, 200, 400, 800],
  doZoomIn: function() {
    var img = slideTeo.getImageElement(window);
    var currZoom = img.zoomLevel;
    var zoomTo = slideTeo.zoomLevels[slideTeo.zoomLevels.length-1];
    for (var i =1; i < slideTeo.zoomLevels.length; i++) {
      if (slideTeo.zoomLevels[i] > currZoom)
      {
        zoomTo = slideTeo.zoomLevels[i];
        break;
      }
    }
    slideTeo.doZoomTo(zoomTo);
  },

  doZoomOut: function() {
    var img = slideTeo.getImageElement(window);
    var currZoom = img.zoomLevel; //img.boxObject.width  * 100 / img.originalSize.width;
    var zoomTo = slideTeo.zoomLevels[0];
    for (var i = slideTeo.zoomLevels.length - 1; i >= 0; i--) {
      if (slideTeo.zoomLevels[i] < currZoom) {
        zoomTo = slideTeo.zoomLevels[i];
        break;
      }
    }
    slideTeo.doZoomTo(zoomTo);
  },

  onResize: function() {
    var img = slideTeo.getImageElement(window);
    if (img.bestFit)
      slideTeo.doZoomBestFit();
  },

  fullscreen: function() {
    window.fullScreen = !window.fullScreen
  },

  /* Filmstrip
  The filmStrip is currently not functional
  because of the large image disappearing bug with when drawing large images.

  loadNextFilmImage: function()
  {
    if (window.filmImageQ.length == 0)
      return;
    var attachment = (window.filmImageQ.splice(0,1))[0];
    // create the new element
    var filmContainer = document.getElementById("image-list");
    var imgEl = document.createElement("image");
    imgEl.setAttribute("style", "visibility:collapse;width:0px; height:10px; border:0px");
    imgEl.setAttribute("attachment", attachment);
    imgEl.addEventListener("load", slideTeo.loadNextFilmImage, false);
    filmContainer.appendChild(imgEl);
    imgEl.setAttribute("src", attachment.url);
  },
  createFilmStrip: function()
  {
    if (window.filmImageQ) // filmstrip already created
      return;
    Create the film strip
    We do not want to load all images at once
    so we put them in a queue, and load 1 by 1
    Each image load event starts a new load off the queue
    window.filmImageQ = new Array();
    for (i in attachments)
      window.filmImageQ[i] = attachments[i];
    slideTeo.loadNextFilmImage();
  },

   Image loading*/

  onArriveImage: function(img) {
    img.waitingForArrival = -1;
    // save the original size
    img.originalSize = { width: img.getBoundingClientRect().width, height: img.getBoundingClientRect().height };
    img.style.MozTransform="rotate("+window.attachments[img.index].angRot+"deg)";
    // shrink the enclosing box to the size of the image
    img.parentNode.style.minWidth = img.getBoundingClientRect().width + "px";
    img.parentNode.style.minHeight = img.getBoundingClientRect().height + "px";
    img.style.opacity = 1;
    if( slideTeo.start_full ) {
       slideTeo.start_full = false;
       slideTeo.fullscreen();
    }
    slideTeo.doZoomBestFit();
  },

  onLoadImage: function(event)
  {
    var img = slideTeo.getImageElement(window);
    if (img.waitingForArrival >= 0)
      slideTeo.onArriveImage(img);
//    if (!window.filmImageQ) // if there is no filmstrip
//      slideTeo.createFilmStrip();
  },

  resizeInterval: function () {
    var img = slideTeo.getImageElement();
    if (img.waitingForArrival >= 0) {
      if (img.getBoundingClientRect().width != img.waitingForArrival)
        slideTeo.onArriveImage(img);
    }
  },

  doSetImage: function(index) {
    var img = slideTeo.getImageElement(window);
   // if (img.index == index) return;
    // Reset the image box, and widens the enclosing box
    // Causes flicker, but I have no idea how to work around it
   // img.style.width = "auto";
   // img.style.height = "auto";
   // img.parentNode.style.minHeight = "5000px";
    // Load the image
   // img.waitingForArrival = img.getBoundingClientRect().width;
   // img.src = window.attachments[index].url;
   // img.attachment = window.attachments[index];
    img.index = index;
    if( !window.attachments[index].angRot ) window.attachments[index].angRot = 0;
    // set the title
    var bundleShow = document.getElementById("bundle_slideshow")
    document.title = bundleShow.getString("slideshowlabel") + " " + window.attachments[index].name + " (" + (index + 1) + " " + bundleShow.getString("slideshowof") + " " + window.attachments.length + ") ";
  },

 
  doSetImages: function(index1) {
    var img;
    let index=0;
    img = slideTeo.getImageElementByID(window, "slide-image1a");
//    if (img.index == index) return;
    // Reset the image box, and widens the enclosing box
    // Causes flicker, but I have no idea how to work around it
    //img.style.max-width = "200px";
   // img.style.height = "auto";
    //img.parentNode.style.minHeight = "500px";
    // Load the image
    //img.waitingForArrival = img.getBoundingClientRect().width;
    let img1uri= window.attachments[index].url;;
    let src = window.attachments[index].url;  //=img.src
    let uri = window.attachments[index].uri;  //= img.uri
    img.src=src;
    console.log(window.attachments[index]);
    //img.attachment = window.attachments[index];
    //img.index = index;
let gMessenger = Cc["@mozilla.org/messenger;1"].createInstance(Ci.nsIMessenger);

    var msgHdr = gMessenger
    .messageServiceFromURI(uri)
    .messageURIToMsgHdr(uri);
  if (msgHdr) {
//    MailUtils.openMessageInNewWindow(msgHdr);

//debugger;
//var aMimeMsg = {};
MsgHdrToMimeMessage(
  msgHdr,
  getMime,
  getMime,
  true,
  {
    partsOnDemand: false,
    examineEncryptedParts: true,
  }

  );











}
  let url = Services.io.newURI(src, null, null);
  console.log(url);
 
  debugger;
  const tmpChannel = NetUtil.newChannel({
    uri: url,
    loadUsingSystemPrincipal: true,
  });
  console.log( "contentType");
 console.log( tmpChannel.contentType);
 /* 
  tmpChannel.asyncOpen(
    new StreamListener(img),//resolve, reject),
    url
  );

 */

 
 
 
 
 
 /*
 
 
  // let channel = Services.io.newChannelFromURI(url);
  let chunks = [];
  let unicodeConverter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]
                         .createInstance(Ci.nsIScriptableUnicodeConverter);
  unicodeConverter.charset = "UTF-8";

  var msgWindow = Components.classes["@mozilla.org/messenger/msgwindow;1"]
  .createInstance(Components.interfaces.nsIMsgWindow);
  var MsgService = gMessenger.messageServiceFromURI(img.uri);
  var MsgStream =  Components.classes["@mozilla.org/network/sync-stream-listener;1"].createInstance();
  var consumer = MsgStream.QueryInterface(Components.interfaces.nsIInputStream);
  var ScriptInput = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance();
  var ScriptInputStream = ScriptInput.QueryInterface(Components.interfaces.nsIScriptableInputStream);
 ScriptInputStream.init(consumer);
  try {
  //  var MailBox =    Components.classes["@mozilla.org/messenger/imapservice;1"].createInstance(Components.interfaces.nsIMsgMessageFetchPartService);
    //let mms = MailBox.QueryInterface(Components.interfaces.nsIMsgMessageFetchPartService);
    // MsgService.streamMessage(img.uri, MsgStream, msgWindow, null, false, null);
  //  MailBox.fetchMimePart(url,img.uri,MsgStream,msgWindow,null);
  } catch (ex) {
	alert("error: "+ex)
  }
 alert("test"); 
var content = "";
  ScriptInputStream .available();
  while (ScriptInputStream .available()) {
	content = content + ScriptInputStream .read(512);
  }
  alert(content);
  */
  //MsgService
//  mms.fetchMimePart(url,img.uri,MsgStream,msgWindow,null);


/*
   ScriptInputStream .available();
  while (ScriptInputStream .available()) {
	content = content + ScriptInputStream .read(512);
  }
  alert(content
*/
/*
    index = 1;
    img = slideTeo.getImageElementByID(window, "slide-image2");
//    if (img.index == index) return;
    // Reset the image box, and widens the enclosing box
    // Causes flicker, but I have no idea how to work around it
    img.style.width = "auto";
    img.style.height = "auto";
   // img.parentNode.style.minHeight = "500px";
    // Load the image
    img.waitingForArrival = img.getBoundingClientRect().width;
    img.src = window.attachments[index].url;
    img.attachment = window.attachments[index];
    img.index = index;


    index = 2;
    img = slideTeo.getImageElementByID(window, "slide-image3");
//    if (img.index == index) return;
    // Reset the image box, and widens the enclosing box
    // Causes flicker, but I have no idea how to work around it
    img.style.width = "auto";
    img.style.height = "auto";
    //img.parentNode.style.minHeight = "500px";
    // Load the image
    img.waitingForArrival = img.getBoundingClientRect().width;
    img.src = window.attachments[index].url;
    img.attachment = window.attachments[index];
    img.index = index;
*/
 /*   if( !window.attachments[index].angRot ) window.attachments[index].angRot = 0;
    // set the title
    var bundleShow = document.getElementById("bundle_slideshow")
    document.title = bundleShow.getString("slideshowlabel") + " " + window.attachments[index].name + " (" + (index + 1) + " " + bundleShow.getString("slideshowof") + " " + window.attachments.length + ") ";
  */
 },



  // Navigation
  doGoBack: function() {
    var img = slideTeo.getImageElement(window);
    var nextImage = 0;
    var branch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    if ((img.index == 0)&&(branch.getBoolPref( "extensions.slideshowski@totic.org.loopend" )))
      nextImage = window.attachments.length - 1;
    else if((img.index == 0)&&( !branch.getBoolPref( "extensions.slideshowski@totic.org.loopend" )))
      nextImage = img.index;
    else
      nextImage = img.index-1;
    slideTeo.doSetImage(nextImage);
  },

  doGoForward: function () {
    var img = slideTeo.getImageElement(window);
    var nextImage = 0;
    var branch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    if ((img.index == window.attachments.length - 1)&&(branch.getBoolPref( "extensions.slideshowski@totic.org.loopend" )))
      nextImage = 0;
    else if((img.index == window.attachments.length - 1)&&( !branch.getBoolPref( "extensions.slideshowski@totic.org.loopend" )))
      nextImage = img.index;
    else
      nextImage = img.index+1;
    slideTeo.doSetImage(nextImage);
  },

  // rotate picture
  sl_rotate: function (dir_rot) {
    var img = slideTeo.getImageElement(window);
      if(dir_rot == 2) window.attachments[img.index].angRot = (window.attachments[img.index].angRot - 90)%360;
      else window.attachments[img.index].angRot = window.attachments[img.index].angRot + 90;
      DimTmp = img.style.width ;
      img.style.width = img.style.height;
      img.style.height = DimTmp;

      img.style.MozTransform="rotate("+window.attachments[img.index].angRot+"deg)";
      if (img.bestFit)
       slideTeo.doZoomBestFit();
  },

  // Hand scroll/dragging
  onMouseDown: function (event) {
    var img = slideTeo.getImageElement(window);
    img.lastX = event.screenX;
    img.lastY = event.screenY;
  },

  onMouseUp: function (event) {
    var img = slideTeo.getImageElement(window);
    delete img.lastX;
    delete img.lastY;
  },

  onMouseMove: function (event) {
    var img = slideTeo.getImageElement(window);
    if (img.lastX) {
      var deltaX = event.screenX - img.lastX;
      var deltaY = event.screenY - img.lastY;
      img.lastX = event.screenX;
      img.lastY = event.screenY;
 //     console.log("mousemove");
      var scrollBox = window.document.getElementById("scroll1");
      //debugger;
      scrollBox.scrollLeft =  scrollBox.scrollLeft + deltaX;
      scrollBox.scrollTop =  scrollBox.scrollTop + deltaY;
      /*
      var scrollbah = img;//img.parentNode.parentNode.boxObject.QueryInterface(Components.interfaces.nsIScrollBoxObject);
      if (scrollbah)
        scrollbah.scrollBy(-deltaX, -deltaY);
    */
    }
  },

  // Misc commands
  doSave: function() {
    var img = slideTeo.getImageElement(window);
    if (img.attachment)
      messenger.saveAttachment(img.attachment.contentType,
              img.attachment.url,
              encodeURIComponent(img.attachment.displayName),
              img.attachment.uri, img.attachment.isExternalAttachment);
  },

  doSaveAll: function () {
     var attachmentContentTypeArray = new Array();
     var attachmentUrlArray = new Array();
     var attachmentDisplayNameArray = new Array();
     var attachmentMessageUriArray = new Array();

    for (var i=0 ; i < window.attachments.length ; i++ )
    {
      // exclude all attachments already deleted
      var att = window.attachments[i];
      attachmentContentTypeArray[i] = att.contentType;
      attachmentUrlArray[i] = att.url;
      attachmentDisplayNameArray[i] = encodeURI(att.displayName);
      attachmentMessageUriArray[i] = att.uri;
    }
    messenger.saveAllAttachments(attachmentContentTypeArray.length,
        attachmentContentTypeArray, attachmentUrlArray,
        attachmentDisplayNameArray, attachmentMessageUriArray);
  }
}

var scaleTeo = {

  supportsCommand: function(command) {
    switch (command)
    {
      case "cmd_save":
      case "cmd_save_all":
      case "cmd_back":
      case "cmd_forward":
      case "cmd_zoom_in":
      case "cmd_zoom_out":
      case "cmd_copyImageContents":
      case "cmd_close":
      case "cmd_actual":
      case "cmd_bestfit":
      case "cmd_fullscr":
      case "cmd_rot_left":
      case "cmd_rot_right":
      return true;
    }
    return false;
  },

  isCommandEnabled: function(command) {
    switch(command)
    {
      case "cmd_back":
      case "cmd_forward":
        return window.attachments && window.attachments.length > 1;
      case "cmd_save":
        return slideTeo.getImageElement(window).attachment != null;
      default:
        return true;
    }
  },

  doCommand: function(command) {
    switch (command) {
      case "cmd_close":
        closeWindow(window);
        break;
      case "cmd_zoom_in":
        slideTeo.doZoomIn();
        break;
      case "cmd_zoom_out":
        slideTeo.doZoomOut();
        break;
      case "cmd_bestfit":
        slideTeo.doZoomBestFit();
        break;
      case "cmd_actual":
        slideTeo.doZoomTo(100);
        break;
      case "cmd_fullscr":
        slideTeo.fullscreen();
        break;
      case "cmd_save":
        slideTeo.doSave();
        break;
      case "cmd_save_all":
        slideTeo.doSaveAll(window.messenger);
        break;
      case "cmd_back":
        slideTeo.doGoBack();
        break;
      case "cmd_forward":
        slideTeo.doGoForward();
        break;
      case "cmd_copyImageContents":
        slideTeo.doCopyImageContents();
        break;
        case "cmd_rot_left":
        slideTeo.sl_rotate(1);
        break;
        case "cmd_rot_right":
        slideTeo.sl_rotate(2);
        break;
      default:
        alert("DoCommand called with " + command);
    }
    return true;
  }
}

//Observer to remove addon's preferences
var uninObservTeo = {

  _uninstall : false,
  _tabs : null,

  observe : function(subject, topic, data) {
      if (topic == "em-action-requested") {
          // Extension has been flagged to be uninstalled
          var item = subject.QueryInterface(Components.interfaces.nsIUpdateItem);
          if (item.id == "slideshowski@totic.org") {
              if (data == "item-uninstalled") {
                  this._uninstall = true;
              } else if (data == "item-cancel-action") {
                  this._uninstall = false;
              }
          }
      } else if (topic == "quit-application-granted") {
          // We're shutting down, so check to see if we were flagged for uninstall - if we were, then cleanup here
          if (this._uninstall) {
          // Do your cleanup stuff here such as deleting preferences, servicepane nodes, lists, libraries, etc.
              var branch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
              branch.deleteBranch("extensions.slideshowski@totic.org.");
              dump("Uninstalled!\n");
          }
          this.unregister();
      }
  },

  register : function() {
    var observerService = Components.classes["@mozilla.org/observer-service;1"]
        .getService(Components.interfaces.nsIObserverService);
      observerService.addObserver(this, "em-action-requested", false);
      observerService.addObserver(this, "quit-application-granted", false);
  },

  unregister : function() {
    var observerService = Components.classes["@mozilla.org/observer-service;1"]
        .getService(Components.interfaces.nsIObserverService);
    observerService.removeObserver(this, "em-action-requested");
    observerService.removeObserver(this, "quit-application-granted");
  }
}

var slideMiscTeo = {
  // Sets the command controlers
  initCommands : function() {
  top.controllers.insertControllerAt(0, scaleTeo);
  },

  newSlideshow : function(parentWin, attachments) {
    var slideWin = parentWin.openDialog("chrome://slideshow/content/scaling_new.xhtml", "slideshow", "chrome,resizable,centerscreen,dependent,alwaysRaised", attachments);
      uninObservTeo.register();
  },

  // Window initialization
  onLoadScaling : function()
  {
    var branch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    window.messenger = window.opener.messenger;
    //window.setInterval(function() {slideTeo.resizeInterval}, 100);
    slideTeo.start_full = branch.getBoolPref( "extensions.slideshowski@totic.org.startfullscreen" );
    if (window.arguments)
    {
      window.attachments = window.arguments[0];
      slideTeo.doSetImages(0);
    }
  },

  slOptions : function()
  {
    window.openDialog('chrome://slideshow/content/options.xhtml', 'Slideshow Options', 'chrome,titlebar,toolbar,centerscreen,resizable').focus()
    return true;
  }
}