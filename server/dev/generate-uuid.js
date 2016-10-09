var uuid = require('uuid');
for (var i = 0; i < 10; i++) {
	console.log(uuid.v4());
}

var fixViewIds = function() {
	var fs = require('fs');
	var views = JSON.parse(fs.readFileSync('./data/views.json'));

	Object.keys(views).forEach(function(project) {
		views[project].forEach(function(view) {
			view.items.forEach(function(it) {
				it.id = uuid.v4();
			});
		});
	});

	fs.writeFile('./data/views.json', JSON.stringify(views, null, 2), function (err) {
	  if (err) return console.log(err);
	  console.log('done');
	});
} 