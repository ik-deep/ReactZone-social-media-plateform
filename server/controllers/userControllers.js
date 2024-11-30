const { findUserById } = require("../models/userModel");


const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userDb = await findUserById({ id });
        res.send({
            status: 200,
            message: "User found!",
            data: userDb
        })
    } catch (error) {
        res.send({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }

}
const getUserFriends = async (req, res) => {
    const { id } = req.params;
    try {
        const userDb = await findUserById({ id });
        const friends = await Promise.all(
            userDb.friends.map((id) => findUserById({ id }))
        );

        const formattedFriends = friends.map(({ _id, firstName, lastName, email, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, email, occupation, location, picturePath };
        })
        res.send({
            status: 200,
            message: "friends list found!",
            data: formattedFriends
        })
    } catch (error) {
        res.send({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}
const addRemoveFriends = async (req, res) => {
    const { id, friendId } = req.params;
    try {
        const userDb = await findUserById({ id });
        const friend = await findUserById({ id: friendId });

        if (userDb.friends.includes(friendId)) {
            userDb.friends = userDb.friends.filter((id) => id != friendId);
            friend.friends = friend.friends.filter((idf) => idf != id)
        } else {
            userDb.friends.push(friendId);
            friend.friends.push(id);
        }

        await userDb.save();
        await friend.save();

        const friends = await Promise.all(
            userDb.friends.map((id) => findUserById({ id }))
        );

        const formattedFriends = friends.map(({ _id, firstName, lastName, email, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, email, occupation, location, picturePath };
        })
        res.send({
            status: 200,
            message: "friends list found!",
            data: formattedFriends
        })


    } catch (error) {
        res.send({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { getUser, getUserFriends, addRemoveFriends }