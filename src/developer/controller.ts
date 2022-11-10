import { RequestHandler } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { fbStorage } from '../services/firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Student } from './entity';
import { AppDataSource } from '../data-source';
import { HttpError } from '../helpers/HttpError';


const StudentRepo = AppDataSource.getRepository(Student);
const fbFolder = 'student-images';

/**
 * 
 * @description gets All students entities in the "student" postgreSQL table.
 */
export const getAll: RequestHandler = async (req, res, next) => {
  try {
    // 1. finds all students in student table
    const students = await StudentRepo.find({ order: { id: 'ASC' } });

    if (!students) {
      return next(new HttpError(404, 'no developers found'));
    }
    res.status(200).json({
      students
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @description uploads an avatar image to firebase/storage for the first time.
 */
export const uploadImage: RequestHandler = async (req, res, next) => {
  try {
    let student = await StudentRepo.findOneBy({ id: +req.params.id });

    if (!student) {
      return next(new HttpError(404, 'student not found'));
    }

    // 1. uploads an image to firebase/storage
    const imageId: string = uuidV4();
    const imageBuffer = req.file?.buffer as Buffer;
    const fileRef = ref(fbStorage, `${fbFolder}/${imageId}`);
    const snapShot = await uploadBytes(fileRef, imageBuffer, { contentType: req.file?.mimetype });
    const uploadedImageUrl: string = await getDownloadURL(snapShot.ref);

    // 2. saves the image url & id into the database
    student.image = {
      url: uploadedImageUrl,
      id: imageId
    };
    student = await StudentRepo.save(student);

    res.status(201).json({
      message: 'student successfully registerd',
      student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @description deletes an existing avatar image and stores a new one for a given 
 * student entity in firebase/storage.
 */
export const updateImage: RequestHandler = async (req, res, next) => {
  try {
    let student = await StudentRepo.findOneBy({ id: +req.params.id });

    if (!student) {
      return next(new HttpError(404, 'student not found'));
    }

    // 1. deletes the current image in firebase/storage
    const imageToDeleteRef = ref(fbStorage, `${fbFolder}/${student.image.id}`);
    await deleteObject(imageToDeleteRef);

    // 2. uploads an new image to firebase/storage
    const newImageId: string = uuidV4();
    const imageBuffer = req.file?.buffer as Buffer;
    const newImageRef = ref(fbStorage, `${fbFolder}/${newImageId}`);
    const snapShot = await uploadBytes(newImageRef, imageBuffer, { contentType: req.file?.mimetype });
    const newUploadedImageUrl: string = await getDownloadURL(snapShot.ref);

    // 3. saves the new image url & id into the database
    student.image = {
      url: newUploadedImageUrl,
      id: newImageId
    };
    student = await StudentRepo.save(student);

    res.status(200).json({
      message: 'student successfully updated',
      student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @description deletes the avatar image for a given student in firebase/storage 
 * before deleting the student entity from the database table.
 */
export const deleteImage: RequestHandler = async (req, res, next) => {
  try {
    let student = await StudentRepo.findOneBy({ id: +req.params.id });

    if (!student) {
      return next(new HttpError(404, 'student not found'));
    }

    // 1. deletes the current image in firebase/storage
    const imageToDeleteRef = ref(fbStorage, `${fbFolder}/${student.image.id}`);
    await deleteObject(imageToDeleteRef);

    // 2. deletes student entity from database table ?
    student.image = {
      url: '',
      id: ''
    };
    student = await StudentRepo.save(student);

    res.status(200).json({
      message: 'student successfully updated',
      student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Register students entities in the "student" postgreSQL table.
 */

 export const registerDevelopers: RequestHandler = async(req, res, next)=> {
  try {
    const studentDeveloper = await AppDataSource.getRepository(Student).findOne({
      where: {
        email: req.body.email
      }
    });
    
    if (studentDeveloper) {
      return next(new HttpError (409, 'already registered user'));
    }

    await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Student)
      .values({
        ...req.body
      })
      .execute();
    
    res.status(201).json({
      message: 'New Developer user created successfully!',
      Name: req.body.name,
      lasname: req.body.lastName,
      email: req.body.email, 
      active: req.body.active 
    });
  } catch (error) {
    next(error);
  }
};
