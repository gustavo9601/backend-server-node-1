var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hospitalSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'hospitales' });  //Con collection le definimos como queremos que se cree la collecion



module.exports = mongoose.model('Hospital', hospitalSchema);