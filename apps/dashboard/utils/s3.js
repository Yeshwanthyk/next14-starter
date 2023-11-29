import { s3 } from "@/config/aws"

export const manageBucket = (action, payload) => {
  switch (action) {
    case "upload":
      if (payload.tracker) {
        return s3
          .upload({
            Key: payload.name,
            Body: payload.file,
            ACL: "public-read",
          })
          .on("httpUploadProgress", payload.tracker)
          .promise()
      } else {
        return s3
          .upload({
            Key: payload.name,
            Body: payload.file,
            ACL: "public-read",
          })
          .promise()
      }
    case "delete":
      return s3.deleteObject({ Key: payload.name }).promise()
    case "list":
      return s3.listObjectsV2({ Prefix: payload.prefix }).promise()
    case "listAll":
      return s3.listObjectsV2().promise()
  }
}

async function fileBuffer(file) {
  return new Promise((resolve) => {
    // Initializing file read actions
    const reader = new FileReader()

    // Creating file buffer
    reader.onload = () => {
      const buffer = reader.result
      resolve(buffer)
    }

    reader.readAsArrayBuffer(file)
  })
}

export const uploadToS3 = async (fileObject, folder, optName = "") => {
  const file = fileObject
  const fileName = folder + "/" + (optName || file.name)

  const bufferedFile = await fileBuffer(file)

  const payload = {
    name: fileName,
    file: bufferedFile,
  }

  const result = await manageBucket("upload", payload)

  return result
}
