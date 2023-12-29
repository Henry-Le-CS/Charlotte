import UserModel from "../models/User.js"

const Register = async (req, res) => {
    const user = new UserModel({
        id: req.body.id,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        // avatar: {req.files},
    })

    try {
        const results = await user.save()
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send({ message: `Registration fail ${error}` })
    }
}

export {
    Register
}
