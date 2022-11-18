import axios from 'axios';
import { method } from 'lodash';

export const BASE_URL = 'https://www.easssue.com/api';

//!user
/**
 * * login
 * @param {string} email
 * @param {string} pwd
 * @method POST
 * @url /user/login
 */

export const login = async (email: string, pwd: string) => {
  try {
    const { data } = await axios({
      url: BASE_URL + '/user/login',
      method: 'POST',
      data: {
        email,
        pwd,
      },
    });
    return data;
  } catch (error) {
    console.error('loginError : ', error);
  }
};

/**
 * * signup with email, password
 * @param {string} email - user email
 * @param {string} pwd - password
 * @method POST
 * @url /user/signup
 */

export const signUp = async (email: string, pwd: string) => {
  try {
    const { data } = await axios({
      url: BASE_URL + '/user/signup',
      method: 'POST',
      data: {
        email,
        pwd,
      },
    });
    if (data) {
      return login(email, pwd);
    }
  } catch (error) {
    console.error('signup failed : ', error);
  }
};

/**
 * * email duplication check at signup
 * @param {string} email
 * @method GET
 * @url /user/check/{email}
 */

export const checkDuplicateEmail = async (email: string) => {
  try {
    const { data } = await axios({
      url: BASE_URL + `/user/check/${email}`,
      method: 'GET',
    });
    return data
  } catch (error) {
    
  }
}

/**
 * * jwt token and user login status check when create new tab
 * @param none
 * @method GET
 * @url /user/jwt
 */
export const jwtCheck = async ()=>{
  try {
    const { data } = await axios({
      url : BASE_URL + '/user/jwt',
      method : 'GET'
    });
    
    return data;
  } catch (error) {
    console.error("jwt check error :", error);
  }
}



//!keyword
/**
 * * get subscribed keywords
 * @method GET
 * @url /keyword/subscribe
 */

export const getSubscribeKeywords = async () => {
  try {
    const { data } = await axios({
      url: BASE_URL + '/keyword/subscribe',
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('subscribe keywords error : ', error);
  }
};
/**
 * * get ban keywords list
 * @method GET
 * @url /keyword/ban
 */

export const getBanKeywords = async () => {
  try {
    const { data } = await axios({
      url: BASE_URL + '/keyword/ban',
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('get ban keywords error : ', error);
  }
};
/**
 * * get recommend keywords
 * @method GET
 * @url /keyword/recommend
 */
export const getRecommendKeywords = async () => {
  //TODO : is login?
  try {
    const { data } = await axios({
      url: BASE_URL + '/keyword/recommend',
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('recommend keywords error : ', error);
  }
};

/**
 * * modify sub, ban keywords onetime
 * @param subScribeKwdList
 * @param banKeywordList
 * @method PUT
 * @url /keyword
 */

export const putAllKeywordList = async (
  subScribeKwdList: { kwdId: number; kwdName: string }[],
  banKeywordList: { kwdId: number; kwdName: string }[]
) => {
  try {
    const { data } = await axios({
      url: BASE_URL + '/keyword',
      method: 'PUT',
      data : {
        subscKwdList : subScribeKwdList,
        banKwdList : banKeywordList
      }
    });
  } catch (error) {
    console.error('put all keyword list error:', error);
  }
};

/**
 * * add and edit subscribed keyword
 * @param { kwdId: number,kwdName : string} keywordLists
 * @method PUT
 * @url /keyword/subscribe
 */

export const putSubscribeKeywords = async (
  keywordLists: { kwdId: number; kwdName: string }[], subKeyLength :number
) => {
  if(subKeyLength <= 15) {
    try {
      const { data } = await axios({
        url: BASE_URL + '/keyword/subscribe',
        method: 'PUT',
        data: {
          kwdList: keywordLists,
        },
      });
      if(!data.error){
        return 'success';
      }
    } catch (error) {
      console.error('subscribe keywords put error : ', error);
    }
  }else{
    alert('15개 이상의 키워드를 넣어 오류가 났습니다.');
    return 'key length error'
  }
};

/**
 * * modify ban keyword
 * @type {{kwdId: number; kwdName: string ;}[]}
 * @param {list} keywordLists
 * @method PUT
 * @url /keyword/ban
 */

export const putBanKeywords = async (
  keywordLists: { kwdId: number; kwdName: string }[]
) => {

  try {
    const { data } = await axios({
      url: BASE_URL + '/keyword/ban',
      method: 'PUT',
      data: {
        kwdList: keywordLists,
      },
    });
  } catch (error) {
    console.error('ban keywords put error : ', error);
  }
};

/**
 * * search keywords list infos
 * @param {string} value
 * @method GET
 * @url /keyword/search/{value}
 */

export const searchKeyword = async (value: string) => {

  // const keyDecode = encodeURI(value);
  const deUrl = encodeURI(BASE_URL + `/keyword/search/${value}`);

  try {
    const { data } = await axios({
      url: deUrl,
      method: 'GET',
      headers: {
        charset: 'utf-8',
        'Content-type': 'application/json',
      },
    });
    return data.kwdList;
  } catch (error) {
    console.error('search keywords error : ', error);
  }
};

//!news
/**
 * * get main news
 * @param {number} pageNumber
 * @method GET
 * @url /news/popular/{pageNumber}
 */

export const getNews = async (pageNumber: number) => {
  try {
    const { data }= await axios({
      url: BASE_URL + `/news/popular/v2/page/${pageNumber}`,
    });
    return data;
  } catch (error) {
    console.error('get news error: ' + error);
  }
};

/**
 * * get news by keyword
 * @param {number} keywordNumber - keyword number
 * @param {number} pageNumber - page number
 * @method GET
 * @url /news/subscribe/{keywordNumber}/page/{pageNumber}
 */

export const getKeyWordNews = async (
  keywordNumber: number,
  pageNumber: number
) => {
  try {
    const { data } = await axios({
      url: BASE_URL + `/news/subscribe/${keywordNumber}/page/${pageNumber}`,
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('keyword news error: ' + error);
  }
};

/**
 * * get news by keyword
 * @param {number} keywordNumber - keyword number
 * @param {number} pageNumber - page number
 * @method GET
 * @url /news/recommend/{keywordNumber}/page/{pageNumber}
 */

export const getRecommendNews = async (
  keywordNumber: number,
  pageNumber: number
) => {
  try {
    const { data } = await axios({
      url: BASE_URL + `/news/recommend/${keywordNumber}/page/${pageNumber}`,
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('keyword news error: ' + error);
  }
};

/**
 * * news log api
 * @param newsId
 * @method POST
 * @url /news/log/{newsId}
 * TODO : login required
 */
export const newsLogApi = async (newsId: number) => {
  try {
    const { data } = await axios({
      url: BASE_URL + `/news/log/${newsId}`,
      method: 'POST',
    });
  } catch (error) {}
};

//!dash
// TODO : login required
/**
 * * GET dash board information
 * @method GET
 * @url /dash/info
 */

export const getDashBoardInfo = async () => {
  try {
    const { data } = await axios({
      url: BASE_URL + '/dash/info',
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('dash board info api error: ' + error);
  }
};

/**
 * * GET newsHistory
 * @param {date} fullDate - YYYY-MM-DD
 * @method GET
 * @url /dash/news/{date}
 */

export const getNewsHistory = async (fullDate: string) => {
  try {
    const { data } = await axios({
      url: BASE_URL + `/dash/news/${fullDate}`,
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('get News history failed : ', error);
  }
};

//!popup

/**
 * * get word cloud img and 3line summery at current page
 * @param newsUrl : string
 * @method POST
 * @url /popup
 */

export const popupApi = async (newsUrl: string) => {
  try {
    const { data } = await axios({
      url: BASE_URL + `/popup`,
      method: 'POST',
      data: {
        url: newsUrl,
      },
    });
    if(data.error){
      console.error('popup data api err : ', data.error);
    }
    return data;
  } catch (error) {
    console.error('popup data api err : ', error);
  }
};

//!API

/**
 * * GET nateTrend
 * @param none
 * @method GET
 * @url /dash/news/{date}
 */

export const trendAPI = async () => {
  try {
    const { data } = await axios({
      url: BASE_URL + `/trend/v2`,
      // responseType: 'json',
      method: 'GET',
      // charset: 'utf-8',
      // responseEncodig: 'utf8'
    });
    // console.log(data.data);
    return data;
  } catch (error) {
    console.error('nate trend api error: ' + error);
  }
};
