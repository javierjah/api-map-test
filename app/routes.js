var express = require('express');
var router = express.Router();
var Maps = require('./models/maps');

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.get('/', (req, res) => {
	res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/maps')
	.post((req, res) => {

		var maps = new Maps();
		maps.name = req.body.name;
		maps.cords = req.body.cords;

		maps.save((err) => {
			if (err)
				res.send(err);

			res.json({ message: 'Map created!' });
		});


	})
	.get((req, res) => {
		Maps.find((err, bears) => {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

router.route('/maps/:map_id')
	.get((req, res) => {
		Maps.findById(req.params.map_id, (err, map) => {
			if (err)
				res.send(err);
			res.json(map);
		});
	})
	.put((req, res) => {
		Maps.findById(req.params.map_id, (err, maps) => {

			if (err)
				res.send(err);

			maps.name = req.body.name;
			maps.save((err) => {
				if (err)
					res.send(err);

				res.json({ message: 'Map updated!' });
			});

		});
	})
	.delete((req, res) => {
		Maps.remove({
			_id: req.params.map_id
		}, (err, maps) => {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

	exports = module.exports = router;