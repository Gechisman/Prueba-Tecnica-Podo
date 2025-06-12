import Contracts from "../../models/Contratos.js";

const getContracts = async (req, res) => {
    const contracts = await Contracts.findAll();
    console.log(contracts);

    res.render("contracts", {
        page: 'Prueba tecnica Podo | Inicio',
        contracts
    })
    
}

const getContractByCupon = async (req, res) => {
    const contract_cupon = req.params.cupon
    const contracts = await Contracts.findOne({ where: { cupon: contract_cupon } });
    console.log(contracts.dataValues);

    res.render("cupon", {
        page: 'Prueba tecnica Podo | Cupon',
        id: contracts.dataValues.id,
        origen: contracts.dataValues.origen,
        estado: contracts.dataValues.estado,
        cupon: contracts.dataValues.cupon
    })
}


export {
    getContracts,
    getContractByCupon,
}