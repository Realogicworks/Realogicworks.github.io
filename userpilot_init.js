function generateReport(){
	window.location.href = "http://localhost:4200/report/"+window.location.hash.split(';')[1];
}
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
	userpilot.identify(MyApp.loginUserData.Email,{
		email: MyApp.loginUserData.Email,
		userRoles: MyApp.loginUserData.UserJobRoles.map(c => c.JobRoleNavID),
		job: MyApp.loginUserData.Resource.Job,
		jobTitle: MyApp.loginUserData.Resource.JobTitle.
		fullName: MyApp.loginUserData.Name
	});
}

(async() => {
  await identifyUser();    
})();

function addCustomEventListener(selector, event, handler) {
        let rootElement = document.querySelector('body');
        //since the root element is set to be body for our current dealings
        rootElement.addEventListener(event, function (evt) {
                var targetElement = evt.target;
                while (targetElement != null) {
                    if (targetElement.matches(selector)) {
                        handler(evt);
                        return;
                    }
                    targetElement = targetElement.parentElement;
                }
            },
            true
        );
    }
window.addEventListener("load", (event) => {
addCustomEventListener('[role="tab"]','click', (ev)=>{	
    let a = ev.target;
    let url = window.location.hash.split('?')[0];
	history.replaceState(undefined, undefined, url+'?'+a.innerText);	
	userpilot.reload();
});
  
});

window.addEventListener('hashchange', (event) => {    
    if(checkAppObject()){
	    userpilot.reload();
    /*userpilot.track("Page navigation", {
        url: event.newURL.replace(window.location.origin,'')        
      });  */          
    }
  }, false);
