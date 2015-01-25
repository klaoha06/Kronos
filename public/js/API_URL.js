define(function () {
	//Just setting this globally so we don't have to require it.
	//Technically breaks what requireJS is trying to do but I think this is okay.
	window.API_URL = '/api/v0'
	return API_URL;
});