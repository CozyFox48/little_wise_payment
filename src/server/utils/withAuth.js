import jwt from 'jsonwebtoken';

const withAuth = (handler) => {
    return (req, res) => {
        if (!req.headers.authorization) {
            return res.status(400).json({ error: 'No credentials sent!' });
        }
        const token = req.headers.authorization;
        jwt.verify(token.slice(7), process.env.JWT_SECRET, async (err, decoded) => {

            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            req.user = decoded.id;


            return handler(req, res);
        });
    };
};

export default withAuth;