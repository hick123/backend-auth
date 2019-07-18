const jwt = require('jsonwebtoken');
const middleware = {};
 
middleware.checkAuth = (req, res, next) => {
	// console.log('token', req.body);
	// try {
	// 			const token = req.headers.authorization.split(" ")[1];
	// 			console.log(token);
	// 			const decoded = jwt.verify(token, 'secret');
	// 			req.userData = decoded;
	// 			next();
	// 	} catch (error) {
	// 			return res.status(401).json({
	// 					message: 'Auth failed'
	// 			});
	// 	}


	jwt.verify(req.headers.authorization, 'shhhh', function(err, data) {
			console.log(req.headers.authorization)

    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        description: 'Protected information. Congrats!'
      });
    }
  });
}
// var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJtZW1iZXJfaWQiOiJmYzhhMTQ5MC02M2ViLTRiMmQtYWIzNS0xZDdkNDJjMGJiNTgiLCJ1c2VybmFtZSI6ImhpY2tzIiwiZmlyc3RfbmFtZSI6ImtvcmlyIiwib3RoZXJfbmFtZXMiOiJpc2EiLCJwYXNzd29yZCI6IiQyYiQxMCRwR3ptc0V0RHdveHkwbS43aFFpZXZ1dGxiWUFIRmpSZFZvZnViU21iYWwxVHg4OEpIbkVsUyIsImVtYWlsIjoiZWVlQGhrLmNvbSIsInBob25lIjozMzAwMywiZ2VuZGVyIjoibWFsZSIsIm9jY3VwYXRpb24iOiJkZXYiLCJsb2NhdGlvbiI6Im5haSIsIm1hcml0YWxfc3RhdHVzIjoic2luZ2xlIiwiYWdlIjowLCJtZW1iZXJfbnVtYmVyIjpudWxsLCJpbWFnZV91cmwiOm51bGwsImFjdGl2ZSI6bnVsbCwiY3JlYXRlZF9kYXRlIjoiMjAxOS0wNS0yOVQxNTozMzo1Mi4wMDBaIiwiZGVhY3RpdmF0ZWRfZGF0ZSI6IjAwMDAtMDAtMDAgMDA6MDA6MDAiLCJyZWFzb25fZm9yX2RlYWN0aXZhdGlvbiI6bnVsbCwiY3JlYXRlZF9ieSI6IiIsImFjdGl2YXRlZF9ieSI6bnVsbCwiZGVhY3RpdmF0ZWRfYnkiOm51bGx9XSwidXNlcm5hbWUiOiJoaWNrcyIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE1NTk0NTQ3OTEsImV4cCI6MTU1OTQ1ODM5MX0.9A9PL7e-jBdgU0us_7CN4Hf9lCMp6Wu4x7hfjUvgvMc';
// 		var token = req.headers["authorization"];
// 	// var token = req.headers.authorization;

// 	// console.log(req.headers.authorization)

// 	console.log(token);
// 	// console.log(req);
// 	if (!token)
// 		return res.status(403).send({ auth: false, message: 'Please login to continue' });

// 	jwt.verify(token, 'secret', (err, decoded) => {
// 		if (err){
// 			return res.status(500).send({ auth: false, message: 'Failed to authenticate user.' });
// 		}else {
//       res.json({
//         description: 'Protected information. Congrats!'
// 			});
// 		}

//     // req.user = {
// 		// 	login: decoded.login,
// 		// 	id: decoded.id
// 		// };
//     next();
// 	});
// }
// var token = req.headers['token'];

// // decode token
// if (token) {

// 	// verifies secret and checks if the token is expired
// 	jwt.verify(token, app.get('secret'), (err, decoded) =>{      
// 		if (err) {
// 			return res.json({ message: 'invalid token' });    
// 		} else {
// 			// if everything is good, save to request for use in other routes
// 			req.decoded = decoded;    
// 			next();
// 		}
// 	});

// } else {

// 	// if there is no token  

// 	res.send({ 

// 			message: 'No token provided.' 
// 	});

// }
// }
	// }

module.exports = middleware;

