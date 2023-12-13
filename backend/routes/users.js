var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth')


require('dotenv').config();
const secret = process.env.JWT_TOKEN;

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    try {
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro registering new user' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user)
            res.status(401).json({ error: 'Incorrect email or password' });
        else
            user.isCorrectPassword(password, function (err, same) {
                if (!same)
                    res.status(401).json({ error: 'Incorrect email or password' });
                else {
                    const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
                    res.json({ user: user, token: token });
                }
            })
    } catch (error) {
        res.status(500).json({ error: 'Internal error, please try again' });
    }
})

// adicionar um produto aos favoritos
router.put('/favorites/:productId', auth, async (req, res) => {
    console.log('Authorization header:', req.headers.authorization);
    console.log('Product ID:', req.params.productId);
    const { productId, isFavorite } = req.body;
    // obtenha o usuário a partir do token de autenticação
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    // adicione o productId aos favoritos do usuário, se ainda não estiver lá
    if (isFavorite) {
        await User.findByIdAndUpdate(req.user.id, { $push: { favorites: productId } });
        const updatedUser = await User.findById(req.user.id);
        console.log('Updated user:', updatedUser);
    } else {
        // remova o productId dos favoritos do usuário
        await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: productId } });
        const updatedUser = await User.findById(req.user.id);
        console.log('Updated user:', updatedUser);
    }

    res.json({ message: isFavorite ? 'Produto adicionado aos favoritos' : 'Produto removido dos favoritos' });
});

router.delete('/favorites/:productId', auth, async (req, res) => {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: productId } });
    const updatedUser = await User.findById(req.user.id);
    console.log('Updated user:', updatedUser);
    res.json({ message: 'Produto removido dos favoritos' });
});

router.get('/favorites/', auth, async (req, res) => {
    const user = await User.findById(req.user.id).populate('favorites');
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user.favorites);
});


module.exports = router;