import mongoose, {Schema} from 'mongoose'
import BaseModel from '@base/components/Search/models/BaseModel'
import { nanoid } from '@reduxjs/toolkit'

class MeeyMap extends BaseModel {
  get latLng(){
    const location = _.get(this.geometry, 'location')

    if(!location) return null

    return [location.lat, location.lng]
  }
}

const schemaOption = {_id: false}

const schema = new Schema({
  id: {
    type: String,
    unique: true,
    default: nanoid()
  },
  place_id: String,
  name: String,
  main_text: String,
  secondary_text: String,
  geometry: Object,
  formatted_address: { type: String, alias: 'address' },
}, schemaOption)


schema.loadClass(MeeyMap, true);

export default mongoose.model('MeeyMap', schema)