const {Storage} = require('@google-cloud/storage');
const path = require('path');
const { parseEnv } = require('./config/index');

// Instantiate the GCP Storage instance
const storage = new Storage({ 
  projectId: 'anyclip-chat',
  keyFilename: path.join(__dirname, 'config','anyclip-chat-262e5b1ed58a.json')
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
    const bucket = await storage.bucket(parseEnv("BUCKET_NAME"));

    console.log(bucket);
/*
    bucket.acl.add({
        entity: 'allUsers',
        role: storage.acl.READER_ROLE
    }, function (err, aclObject) {
        console.error('err -> ', err);
    });
*/
    bucket.file(filename).save(imageBuffer, (err) => {
      if (!err) {
        console.log(`${filename} uploaded to ${bucket.id}.`);
        return filename;
      } else {
        throw new Error('Unable to upload the image.' + err);
      }
    });

}


module.exports = uploadFileFromBuffer;