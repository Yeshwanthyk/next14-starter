import manageS3 from "./manageS3";

/**
 * Reads a file stored on the user's computer and formats the data as an array buffer.
 *
 * @param {object} file The file selected from the user's local storage
 * @return {ArrayBuffer} The contents of said file.
 *
 */
async function fileBuffer(file) {
  return new Promise((resolve) => {
    // Initializing file read actions
    const reader = new FileReader();

    // Creating file buffer
    reader.onload = () => {
      const buffer = reader.result;
      resolve(buffer);
    };

    reader.readAsArrayBuffer(file);
  });
}

const uploadToS3 = async (fileObject, folder, progressTracker) => {
  const file = fileObject;
  const fileName = folder + "/" + file.name;

  const bufferedFile = await fileBuffer(file);

  const payload = {
    name: fileName,
    file: bufferedFile,
    tracker: progressTracker || "",
  };

  const result = await manageS3("upload", payload);

  return result;
};

export default uploadToS3;
