const adminMiddleWare = async (req, res, next) => {
    try {
        // console.log(req.user);
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            res.status(403).json({ message: "Access Denied. User is not an admin" })
        }
        // res.status(200).json({ message: req.user.isAdmin })

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = adminMiddleWare;