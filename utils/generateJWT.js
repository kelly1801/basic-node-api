import jwt from "jsonwebtoken";
// dont save sensitive info in jwt is not safe
export const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const key = process.env.SCKEY;

    jwt.sign(
      payload,
      key,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("could not generate the token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
