const {Storage} = require('@google-cloud/storage');
const path = require('path');
const config = require('./config.json');

// Instantiate the GCP Storage instance
const storage = new Storage({
    keyFilename: path.join(__dirname, './anyclip-chat-13cb51a9e843.json')
});
/*
const uploadFile = async(filename) => {
    await storage.bucket(config.bucketName).upload(filename, {
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000',
            },
    });

    console.log(`${filename} uploaded to ${config.bucketName}.`);
}
*/

const uploadFileFromBuffer = async(imageBuffer, filename) => {

    // Upload the image to the bucket
    const bucket = await storage.bucket(config.bucketName);

    bucket.acl.add({
        entity: 'allUsers',
        role: storage.acl.READER_ROLE
    }, function (err, aclObject) {
        console.error('err -> ', err);
    });

    bucket.file(filename).save(imageBuffer, (err) => {
      if (!err) {
        console.log(`${filename} uploaded to ${config.bucketName}.`);
        return filename;
      } else {
        throw new Error('Unable to upload the image.' + err);
      }
    });

}


module.exports = uploadFileFromBuffer;