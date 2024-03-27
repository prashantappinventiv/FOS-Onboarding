// /**
//  * @file user.middleware
//  * @description defines user authentication middleware functions
//  * @author Fos Social Dev Team
//  */

// import { Types } from 'mongoose';
// import { Response, Request, NextFunction } from 'express';

// import { Auth } from '../services';
// import { UserV1 } from '@entity';
// import { ENUM } from '../common/enum.common';
// import { CONSTANT } from '../common/constant.common';

// /** verify user session */
// export const VerifyUserSession = async function (req: Request, res: Response, next: NextFunction) {
//     if (req.headers.authorization) {
//         const authMethod = req.headers.authorization.split(' ')[0],
//             authToken = req.headers.authorization.split(' ')[1];
//         if (authMethod === 'Bearer' && authToken) {
//             const decrypted = Auth.verifyToken(authToken);
//             if (decrypted.success) {
//                 const sessionData = await UserSessionModel.findOne({ _id: new Types.ObjectId(decrypted.data.sessionId) }).exec();
//                 if (sessionData && sessionData.isActive) {
//                     const userData: any = await UserV1.findOne({ _id: sessionData.userId });
//                     if (!userData)
//                         res.status(404).send({
//                             success: false,
//                             statusCode: 404,
//                             message: `Can't find the account.\nTry another phone number/email or sign up to create Fos account.`,
//                         });
//                     else if (userData.status == ENUM.USER.STATUS.ACTIVE) {
//                         res.locals.userSessionId = sessionData._id;
//                         res.locals.userId = sessionData.userId;
//                         res.locals.userData = userData;
//                         next();
//                     } else {
//                         UserSessionModel.updateMany({ _id: new Types.ObjectId(decrypted.data.sessionId) }, { $set: { isActive: false } });
//                         res.status(403).send({ success: false, statusCode: 403, message: 'User is blocked by admin' });
//                     }
//                 } else {
//                     if (sessionData && !sessionData.isActive)
//                         res.status(440).send({ success: false, statusCode: 440, message: 'Session expired' });
//                     else res.status(498).send({ success: false, statusCode: 498, message: 'Invalid Session' });
//                 }
//             } else res.status(401).send('Invalid authorization token');
//         } else res.status(400).send('Invalid authorization method');
//     } else res.status(401).send('Authorization header missing');
// };

// export const VerifyBasicSession = function (req: Request, res: Response, next: NextFunction) {
//     if (req.headers['basicauth'] || req.headers.authorization) {
//         let accessToken: any = <string>req.headers['basicauth'] || req.headers.authorization;
//         accessToken = accessToken.split(' ')[1];
//         const credentials = Buffer.from(accessToken, 'base64').toString('ascii');
//         const [username, password] = credentials.split(':');
//         if (username !== CONSTANT.BASIC_USERNAME || password !== CONSTANT.BASIC_PASSWORD)
//             return res.status(401).send('Invalid Authorization');
//         return next();
//     } else return res.status(401).send('Authorization header missing');
// };
