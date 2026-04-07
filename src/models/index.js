const Cliente = require("./Cliente");
const Usuario = require("./Usuario");
const FichaMedica = require("./FichaMedica");
const HistorialMedico = require("./HistorialMedico");
const Receta = require("./Receta");
const Dosis = require("./Dosis");
const Inventario = require("./Inventario");
const Maquina = require("./Maquina");

/* Relaciones */

Cliente.hasOne(FichaMedica, { foreignKey: "id_cliente" });
FichaMedica.belongsTo(Cliente);

Cliente.hasMany(HistorialMedico, { foreignKey: "id_cliente" });
HistorialMedico.belongsTo(Cliente);

Cliente.hasMany(Receta, { foreignKey: "id_cliente" });
Receta.belongsTo(Cliente);

Receta.hasMany(Dosis, { foreignKey: "id_receta" });
Dosis.belongsTo(Receta);

Maquina.hasMany(Inventario, { foreignKey: "id_maquina" });
Inventario.belongsTo(Maquina);

module.exports = {
  Cliente,
  Usuario,
  FichaMedica,
  HistorialMedico,
  Receta,
  Dosis,
  Inventario,
  Maquina,
};