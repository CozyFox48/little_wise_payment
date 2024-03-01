import dbConnect from "../../../server/dbConnect";
import User from "../../../server/model/user";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            console.log(req.body);

            const user = await User.findOne({
                email: req.body.email,
            });

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            // if (user.allowed == false) {
            //     return res.status(404).send({ message: "You are not allowed." });
            // }

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 86400, // 24 hours
            });

            res.status(200).send({
                ...user,
                token:token
            });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
}
