function checkAppObject(){
	if(window.MyApp && window.userpilot && window.MyApp.loginUserData)
		return true;
	return false;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function identifyUser(){
	while(!checkAppObject()){
		await timeout(500);
	}
	userpilot.identify(MyApp.loginUserData.Email,{email: MyApp.loginUserData.Email});
}

(async() => {
  await identifyUser();    
})();


window.addEventListener('hashchange', (event) => {    
    if(checkAppObject()){
	    userpilot.reload();
    /*userpilot.track("Page navigation", {
        url: event.newURL.replace(window.location.origin,'')        
      });            
    }*/
  }, false);
