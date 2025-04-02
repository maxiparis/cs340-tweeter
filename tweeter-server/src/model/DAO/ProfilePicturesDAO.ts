import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";

export interface IProfilePicturesDAO {
  // getProfilePicture(userId: string): Promise<string>; //returns url
  putImage(fileName: string, imageStringBase64Encoded: string): Promise<string>;
}

export class ProfilePicturesDAO implements IProfilePicturesDAO {
  private bucketName = "tweeter-pics-mp829";
  private region = "us-east-1";
  async putImage(
    fileName: string,
    imageStringBase64Encoded: string,
  ): Promise<string> {
    if (!fileName) {
      throw new Error(
        "Invalid parameter: 'fileName' must be a non-empty string.",
      );
    }

    if (!imageStringBase64Encoded) {
      throw new Error(
        "Invalid parameter: 'imageStringBase64Encoded' must be a valid Base64-encoded string.",
      );
    }

    let decodedImageBuffer: Buffer = Buffer.from(
      imageStringBase64Encoded,
      "base64",
    );

    const s3Params = {
      Bucket: this.bucketName,
      Key: "image/" + fileName,
      Body: decodedImageBuffer,
      ContentType: "image/png",
      ACL: ObjectCannedACL.public_read,
    };
    const c = new PutObjectCommand(s3Params);
    const client = new S3Client({ region: this.region });
    try {
      await client.send(c);
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/image/${fileName}`;
    } catch (error) {
      throw Error("s3 put image failed with: " + error);
    }
  }
}
