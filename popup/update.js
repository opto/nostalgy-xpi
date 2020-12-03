/*
 * License:  see License.txt
 * Code addtions for TB 78 or later: Creative Commons (CC BY-ND 4.0):
 *      Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) 
 
 * Contributors:  see Changes.txt
 */



addEventListener("click", async (event) => {
	if (event.target.id.startsWith("donate")) {

	  messenger.Utilities.openLinkExternally("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2AKE2G2B9J3ZS");
	}
});  

addEventListener("load", async (event) => {
	//debugger;
	let text = document.body.innerHTML;
  htmltext = text.replace(/{addon}/g, await browser.runtime.getManifest().name );
  htmltext2 = htmltext.replace(/{version}/g, await browser.runtime.getManifest().version);
  let browserInfo = await browser.runtime.getBrowserInfo()
  htmltext = htmltext2.replace(/{appver}/g, browserInfo.version);
  document.body.innerHTML=htmltext;
});
  

