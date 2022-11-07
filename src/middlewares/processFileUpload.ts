import multer, { FileFilterCallback } from 'multer';
import { HttpError } from '../helpers/HttpError';
const storage = multer.memoryStorage();


const imageMimeTypes = new RegExp(/image\/(jpeg|jpg|png|svg|webp)$/);

const upload = multer({
  storage,
  limits: { fileSize: 4_000_000 }, // 4megaBytes max.
  fileFilter:
    /**
     * 
     * @description fileFilter Function than prevents to send a not allowed file
     * format to the server.
     */
    (req, file, filter: FileFilterCallback) => {
      if (imageMimeTypes.test((file?.mimetype as string))) {
        filter(null, true);
      } else {
        filter(new HttpError(403, 'file format not accepted'));
      }
    }
});

export default upload.single('image');
