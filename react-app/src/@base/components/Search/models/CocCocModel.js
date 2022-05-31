import mongoose from 'mongoose'
import BaseModel from '@base/components/Search/models/BaseModel'

const Schema = mongoose.Schema

class CocCoc extends BaseModel {

}

const schema = new Schema({
  id: {
    type: String,
    unique: true,
  }
})


schema.loadClass(CocCoc);

export default mongoose.model('CocCoc', CocCoc)