import mongoose, {Schema} from 'mongoose'
import BaseModel from '@base/components/Search/models/BaseModel'
import { nanoid } from '@reduxjs/toolkit'

class OSM extends BaseModel {
  get latLng(){
    return [this.lat, this.lon]
  }
}

const schemaOption = {_id: false}

const schema = new Schema({
  id: {
    type: String,
    unique: true,
    default: nanoid()
  },
  display_name: {
    type: String,
    alias: 'main_text'
  },
  lat: Number,
  lon: Number,
}, schemaOption)


schema.loadClass(OSM, true);

export default mongoose.model('OSM', schema)