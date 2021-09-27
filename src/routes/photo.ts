import { PhotoController } from "../controller/PhotoController";

const photoRoute = [{
  method: "get",
  route: "/photos",
  controller: PhotoController,
  action: "all"
}, {
  method: "get",
  route: "/photo/:id",
  controller: PhotoController,
  action: "one"
}, {
  method: "post",
  route: "/photos",
  controller: PhotoController,
  action: "save"
}, {
  method: "delete",
  route: "/photo/:id",
  controller: PhotoController,
  action: "remove"
}, {
  method: "post",
  route: "/photos/metadata",
  controller: PhotoController,
  action: "addMetadata"
}, {
  method: "get",
  route: "/photos/metadata",
  controller: PhotoController,
  action: "allWithMetadata"
}, {
  method: "get",
  route: "/photos/metadata/query-builder",
  controller: PhotoController,
  action: "allWithMetadataQueryBuilder"
}, {
  method: "get",
  route: "/photos/raw-query",
  controller: PhotoController,
  action: "rawQuery"
}];

export default photoRoute;
