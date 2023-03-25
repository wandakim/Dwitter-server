import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

/*  
리퀘 헤더에 Authorization 있으면 value를 가져오고, 토큰의 유효성을 검사한다. 

*login 과 signup 으로 받아온 토큰을 가지고 서버에 요청을 할 때는 헤더에 Authorization를 명시해 
주어야 한다. value로는 type(option)과 credential(token)을 함께 명시해 주어야 한다. 
https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication 
 */
export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  //Todo: Make it secure!

  jwt.verify(
    token,
    'F2dN7x8Halksdlfkasijdflkwjealksjdfiwez', // 일단 시크릿키. 바꿔주기.
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
        // jwt자체로 유효성을 판단하는 장점을 극대화 하기 위해controller에서만 해주어도 무방하다.
      }
      req.userId = user.id; // req.customData 리퀘 자체에 userid를 추가해 주어서
      // 다른 콜백에서도 계속 사용할 수 있도록 해주었다.
      next();
    }
  );
};
