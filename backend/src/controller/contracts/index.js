import Contracts from "../../models/Contratos.js";

const getContracts = async (req, res) => {
    const contracts = await Contracts.findAll();

    res.render("contracts", {
        page: 'Prueba tecnica Podo | Inicio',
        contracts,
        currentPath: req.path
    })
    
}

const getContractByCupon = async (req, res) => {
    const contract_cupon = req.query.cupon
    console.log(contract_cupon);
    const contracts = await Contracts.findAll({ where: { cupon: contract_cupon } });
    
    res.render("contracts/cupon", {
        page: 'Prueba tecnica Podo | Cupon',
        contracts,
        currentPath: 'cupon'
    })
}


export {
    getContracts,
    getContractByCupon,
}