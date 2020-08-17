module.exports = {
    // file upload base 64
    uploadBase64: function (base64Data) {
        // Decoding base-64 image
        function decodeBase64Image(dataString) {
            const matches = dataString.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/);
            let response = {};
        
            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }
        
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
        
            return response;
        }
    
        const fs = require('fs');
        // Regular expression for image type: This regular image extracts the "jpeg" from "image/jpeg"
        const imageTypeRegularExpression = /\/(.*?)$/;      
        // Generate random string
        const crypto = require('crypto');
        const seed = crypto.randomBytes(20);
        const uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex');
        // console.log('decodeBase64Image',base64Data );
        const imageBuffer = decodeBase64Image(base64Data);
        const userUploadedFeedMessagesLocation = '/Dev/anyclip-chat/public/img/';
        const uniqueRandomImageName = 'image-' + uniqueSHA1String;
        // This variable is actually an array which has 5 values, The [1] value is the real image extension
        const imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);
        const uploadedFileName = uniqueRandomImageName + '.' + imageTypeDetected[1];
        const userUploadedImagePath = userUploadedFeedMessagesLocation + uploadedFileName;
        

        // Save decoded binary image to disk
        fs.writeFile(userUploadedImagePath, imageBuffer.data, function (err,data) {
            if (err) {
                return console.log('fs.writeFile error: ', err);
            }
            console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath, data);
        });

        return uploadedFileName;
    },

};
