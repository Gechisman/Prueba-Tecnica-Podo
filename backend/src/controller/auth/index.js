const login = async (req, res) => {
    res.render('auth/login')
    
}

const register = async (req, res) => {
    res.render('auth/register')
}

export {
    login,
    register
}