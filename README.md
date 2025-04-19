# 🗒️ Note Vault

A minimal, modern, and lightning-fast **note-taking web app** built with **React**, **TypeScript**, and **Vite** — containerized with Docker for easy deployment.

## 🚀 Features

- 📄 Create, update, and delete notes
- 🏷️ Add and manage tags
- 💾 Real-time local storage sync (no backend required)
- ⚡ Blazing fast with Vite and Zustand
- 📦 Dockerized and production-ready

---

## 🧱 Built With

- **React 19**
- **TypeScript**
- **Vite**
- **Zustand** for state management
- **TailwindCSS** for styling
- **Lucide Icons**
- **Docker** (multi-stage build)

---

## 🐳 Run with Docker

```bash
# Pull the image from Docker Hub
docker pull killercram/note-vault-app:1.0.0

# Run the app
docker run -d -p 10000:10000 killercram/note-vault-app:1.0.0




## REACT BUILD

Build the React Application
for production.

```bash
  npm run build
```
Now a /dict file will be created.





## Setup of S3 and CloudFront

### Steps for Implementation of the project:

#### Steps for the creation of S3 Bucket
_ _ _

**1.) Sign in to AWS management console.**

- First, sign in to the AWS console with your username and password and select the appropriate region like us-east-1.

**2.) Create and setup the S3 Bucket (Private) to store objects.**

- Let's search for S3 and open th S3 console.
- Create S3 bucket:

  - Give a globally unique name and region to your bucket.

  - Set the object ownership and keep ACL's disabled.

  - **Block all public access -** It provides an additional layer of security for your data, preventing unauthorized access and ensuring that your data is protected at all times.

  - **Enable the versioning -** With S3 versioning, every time an object is updated or deleted, a new version of the object is created, allowing users to access and restore previous versions of the object.

   - **Enable the encryption -** In Server-side encryption, Amazon S3 encrypts your objects before saving them on disks in AWS data centers and then decrypts the objects when you download them. All Amazon S3 buckets have encryption configured by default and all new objects uploaded to an S3 bucket are automatically encrypted at rest.

   - **Object lock -** It helps to prevent accidental deletion or modification of objects. With Object Lock, you can set a retention period for objects in a bucket, during which time the objects cannot be deleted or modified. For now we'll keep this default.

   - Finally click on the Create bucket

#### Uploading File

- Uplaod all the file inside the dict/ folder.

- Don't upload the dict/ folder upload the files inside it only.


**3.)Steps for CloudFront creation**
**Search for clodufront in AWS console search bar & open the cloudfront dashboard.**

- Select the Origin domain of your bucket from drop down & give the name of the cloudfront distribution.

- Set the origin access as Origin access control settings.

- We also need to create the access control setting for this cloudfrony distro like below:

- **Enable the Shield** as it helps to minimize your origin’s load, improve its availability, and reduce its operating costs.

- In **Default cache behaviour** settings set configurations as below, else keep it default.

- Let **Function associations -** optional be as default for now.

- In the **final section** i.e. settings, choose as per your usecase and requirements like below:

   - In this we need tochoose the **price class** and AWS WAF web ACL we want to associate it with.

   - If we want to add a **custom domain** to the clodfront distribution then we can add it here.

   - In **default root object**, the object you specify will return if user requests root URL.

- Once the **Cloudfront Distribution got created** then we need to add the given policy in the respective **S3 Bucket policy**. So copy the bucket policy from here.

Then go to **S3 bucket > Permissions > Edit bucket policy**.

Now we can test the cloudfront domain which is setup to deliver the object from private S3 bucket.

