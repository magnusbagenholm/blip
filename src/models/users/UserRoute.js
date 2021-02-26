const express = require("express");
const router = express.Router();


// User model
const User = require("./UserModel");

// @route   POST api/register
// @desc    Register new  user
// @access  Public
router.post("/register", (req, res, next) => {
	const { name, code, email, password } = req.body;
	// simple validation
	if (!code || !name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for exisiting user
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ msg: "User already exisits" });

		const newUser = new User({
            name,
            code,
			email,
			password,
        });
        
        newUser.save().then(user =>{
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                mbti: user.mbti,
            });
        })

		
		});
	
});

// @route   POST api/login
// @desc    Login user
// @access  Public
router.post("/login", (req, res, next) => {
	const { email, password } = req.body;
	// simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for exisiting user
	User.findOne({ email }).then((user) => {

		if (!user) return res.status(400).json({ msg: "Oops! Wrong username or password!" });

		if(user.password == password){
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                mbti: user.mbti,
            });
        }else {
            res.status(400).json({ msg: "Oops! Wrong username or password!" })
        }
		
		});
	
});

// @route   PUT api/user
// @desc    Update a user
// @access  Private
router.post("/update", (req, res, next) => {
    console.log(req.body);
	User.findOneAndUpdate({ "email": req.body.email }, req.body, {
		new: true,
	})
		.select("-password") // dont want do send password
        .then((user) =>{
            console.log(user)
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                mbti: user.mbti,
            })
        } 
        
        )
		.catch(next);
});

// @route   GET api/users
// @desc    Get all Users
// @access  Public
router.get("/profiles", (req, res, next) => {
    User.find({ "mbti": {"$exists" : true, "$ne" : ""} })
        .select("-password") // dont want do send password
		.sort({ name: 1 })
		.then((users) => res.json(users))
		.catch(next);
});


module.exports = router;
