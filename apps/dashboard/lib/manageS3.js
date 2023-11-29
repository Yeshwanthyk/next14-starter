import AWS from "aws-sdk"

// Passing credentials to authenticate
// TODO: Move to environment variables
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
})

// Constructing S3 instance to execute API operations
const s3 = new AWS.S3({
  params: { Bucket: "" },
})

/**
 * Allows the uploading, deletion, and listing of items for the AWS s3 bucket.
 *
 * @param {string} action The s3 method to utilize.
 * @param {object} payload An object to be used during the specified s3 action.
 * @return {object} A promise containing the response from AWS.
 *
 * Supported actions:
 * In all cases the response from AWS is a promise that resolves to an object.
 * "upload" - Will upload the provided payload object to s3 bucket using a "name", "file", and optional 'tracker' property. **See note below.**
 * "delete" - Deletes an existing file in the s3 bucket by referencing the "name" property of a provided payload object.
 * "list" - Lists the objects in the bucket that start with the specified prefix (i.e. retrieving folder contents)
 * "listAll" - Lists all objects in the bucket.
 *
 *
 * Upload:
 * The s3 upload method accepts files with the following "Body" formats:
 *    Buffer,
 *    Typed Array,
 *    Blob,
 *    String,
 *    ReadableStream
 *
 * For an upload action, the promise resolves to a "ManagedUpload" object, which will be of the following format:
 * {Bucket: 'string', ETag: 'string', Key: 'string', Location: 'string'}
 *
 * Location is the URL of the item uploaded to s3.
 *
 * If a tracker function is provided during an upload request, AWS will return the progress of that upload in the form of bytes/bytes.
 *
 * For a delete action, the promise resolves to an object containing an HTTP 204 response.
 */
const manageS3 = (action, payload) => {
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

export default manageS3
