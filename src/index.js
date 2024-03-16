import { removeBackground } from "@imgly/background-removal-node"
import sharp from "sharp"
import axios from "axios"
import fs from "fs"

const removeBg = async (imageSource) => {
  const result = await removeBackground(imageSource)
  const buffer = await result.arrayBuffer()
  return {
    blob: result,
    buffer: buffer,
  }
}



const removeBgFromUrl = async (url) => {
  const image = await axios.get(url, {
    responseType: "arraybuffer",
  })
  const pngImage = await sharp(image.data).toFormat("png").toBuffer()
  const blob = new Blob([pngImage], { type: "image/png" })
  const result = await removeBackground(blob, {
    model: 'medium',

  })
  const buffer = await result.arrayBuffer()
  return {
    blob: result,
    buffer: buffer,
  }
}


export { removeBg, removeBgFromUrl }