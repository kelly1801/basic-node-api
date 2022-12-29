import { OAuth2Client } from 'google-auth-library'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

export async function googleVerify( token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  
  });

  const {name, picture, email} = ticket.getPayload()
  const payload = ticket.getPayload();
 
  return {
    name, 
    img: picture, 
    email
  }
}
