import Contracts from "../../models/Contratos.js";

const getContracts = async (req, res) => {
    const contracts = await Contracts.findAll();

    res.render("contracts", {
        page: 'Prueba tecnica Podo | Inicio',
        contracts,
        username: req.user.username
    })
    
}

const getContractsByFilter = async (req, res) => {
    const { origen, estado, cupon } = req.query;
    const where = {};
    if (origen) where.origen = origen;
    if (estado) where.estado = estado;
    if (cupon) where.cupon = cupon;

    const contracts = await Contracts.findAll({ where });
    res.render("contracts/filter", {
        page: 'Prueba tecnica Podo | Filtro',
        contracts,
        username: req.user.username
    })
}


export {
    getContracts,
    getContractsByFilter,
}