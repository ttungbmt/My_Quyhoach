import mongoose from 'mongoose'
import BaseModel from '@base/components/Search/models/BaseModel'

const Schema = mongoose.Schema

class Map4D extends BaseModel {

}

const schema = new Schema({
  id: {
    type: String,
    unique: true,
  }
})


schema.loadClass(Map4D);

export default mongoose.model('Map4D', Map4D)