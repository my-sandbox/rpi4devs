//http://msdn.microsoft.com/en-us/magazine/hh227261.aspx

function load (scripts_array, callback) {
	for (var i = scripts_array.length - 1; i >= 0; i--) {
		var script = document.createElement('script');
		var firstScript = document.getElementsByTagName('script')[0];
		script.src      = scripts_array[i];
		firstScript.parentNode.insertBefore( script, firstScript );
		//comment sait-on que le chargement est complet ???
	};
	if(callback) callback;

}