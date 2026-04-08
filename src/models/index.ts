import Cliente from "./Cliente";
import Usuario from "./Usuario";
import FichaMedica from "./FichaMedica";
import HistorialMedico from "./HistorialMedico";
import Receta from "./Receta";
import Dosis from "./Dosis";
import Inventario from "./Inventario";
import Maquina from "./Maquina";

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

export {
  Cliente,
  Usuario,
  FichaMedica,
  HistorialMedico,
  Receta,
  Dosis,
  Inventario,
  Maquina,
};
