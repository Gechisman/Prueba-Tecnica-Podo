import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Contracts = db.define('contratos', {
    id:{
        type: DataTypes.STRING(18),
        allowNull: false,
        primaryKey: true
    },
    origen: {
        type: DataTypes.STRING(18),
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(23),
        allowNull: true
    },
    cupon: {
        type: DataTypes.STRING(49),
        allowNull: true
    }
}, {
  tableName: 'contratos',
  timestamps: false
});

export default Contracts;
