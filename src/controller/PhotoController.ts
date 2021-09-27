import { getManager, getRepository } from "typeorm";
import { Photo } from "../entity/Photo";
import { NextFunction, Request, Response } from "express";
import { PhotoMetadata } from "../entity/PhotoMetadata";

export class PhotoController {

  private photoRepository = getRepository(Photo);
  private photoMetadataRepository = getRepository(PhotoMetadata);
  private manager = getManager();

  async all() {
    return await this.photoRepository.find();
  }

  async allWithMetadata() {
    return await this.photoRepository.find({ relations: ["metadata"] });
  }

  async allWithMetadataQueryBuilder() {
    return await this.photoRepository.createQueryBuilder("photo").innerJoinAndSelect("photo.metadata", "metadata").getMany();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.photoRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.photoRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.photoRepository.findOne(request.params.id);
    await this.photoRepository.remove(userToRemove);
  }

  async addMetadata(request: Request, response: Response, next: NextFunction) {
    const storedPhoto = await this.photoRepository.findOne(request.body.id_photo || 0);
    if (!storedPhoto) {
      response.status(500);
      return { "message": "Not exist" };
    }
    request.body.photo = storedPhoto;
    delete request.body.id_photo;
    return await this.photoMetadataRepository.save(request.body);
  }

  async rawQuery(request: Request, response: Response, next: NextFunction) {
    return await this.manager.query(`SELECT *
                                     FROM public.photo p
                                              left join author a on p."authorId" = a.id
                                              left join photo_metadata pm on pm."photoId" = p.id`);
  }
}
