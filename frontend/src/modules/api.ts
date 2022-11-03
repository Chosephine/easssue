import axios from 'axios';
import { method } from 'lodash';

export const BASE_URL = 'https://k7d102.p.ssafy.io/api';

//!user
/**
 * * getAccessToken
 * @params None
 * @method POST
 * @url /user/login
 */

export const login = async () => {
  const token = chrome.identity.getAuthToken(
    { interactive: true },
    async function (googleToken) {
      try {
        console.log('Token :', googleToken);
        const { data } = await axios({
          url: BASE_URL + '/user/login',
          method: 'POST',
          data: {
            googleToken: googleToken,
          },
        });
        console.log(data);
        return data;
      } catch (error) {
        console.error('loginError : ', error);
      }
    }
  );
};

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
    console.log(data);
  } catch (error) {
    console.error('subscribe keywords error : ', error);
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
    console.log(data);
  } catch (error) {
    console.error('recommend keywords error : ', error);
  }
};

/**
 * * add and edit subscribed keyword
 * @params keywordLists { kwdId : number,kwdName : string}[]
 * @method PUT
 * @url /keyword/subscribe
 */

export const putSubscribeKeywords = async (
  keywordLists: { kwdId: number; kwdName: string }[]
) => {
  try {
    const { data } = await axios({
      url: BASE_URL + '/keyword/subscribe',
      method: 'PUT',
      data: {
        kwdList: keywordLists,
      },
    });
    console.log(data);
  } catch (error) {
    console.error('subscribe keywords put error : ', error);
  }
};

/**
 * * modify ban keyword
 * @params KeywordList
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
        KwdList: keywordLists,
      },
    });
  } catch (error) {
    console.error('ban keywords put error : ', error);
  }
};

/**
 * * search keywords list infos
 * @params search input "value"
 * @method GET
 * @url /keyword/search/{value}
 */

export const searchKeyword = async (value: string) => {
  try {
    const { data } = await axios({
      url: BASE_URL + `keyword/${value}`,
      method: 'GET',
    });
    console.log(data);
  } catch (error) {
    console.error('search keywords error : ', error);
  }
};

//!news
/**
 * * get main news
 * @params page number
 * @method GET
 * @url /news/popular/{pageNumber}
 */

export const getNews = async (pageNumber: number) => {
  try {
    const data = await axios({
      url: BASE_URL + `/news/popular/page/${pageNumber}`,
    });
    console.log(data);
  } catch (error) {
    console.error('get news error: ' + error);
  }
};

/**
 * * get news by keyword
 * @params KeywordNumber, PagerNumber
 * @method GET
 * @url /keyword/{keywordNumber}/page/{pageNumber}
 */

export const getKeyWordNews = async (
  keywordNumber: number,
  pageNumber: number
) => {
  try {
    const { data } = await axios({
      url: BASE_URL + `/keyword/${keywordNumber}/page/${pageNumber}`,
      method: 'GET',
    });
    console.log(data);
  } catch (error) {
    console.error('keyword news error: ' + error);
  }
};

//! dash
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
    console.log(data);
  } catch (error) {
    console.error('dash board info api error: ' + error);
  }
};

/**
 * * GET newsHistory
 * @params date(YYYY-MM-DD)
 * @method GET
 * @url /dash/news/{date}
 */

//! API

/**
 * * GET nateTrend
 * @params none
 * @method GET
 * @url /dash/news/{date}
 */

export const trendAPI = async () => {
  try {
    const { data } = await axios({
      // url: 'https://www.nate.com/js/data/jsonLiveKeywordDataV1.js?v=202104300440',
      url: 'https://www.nate.com/main/srv/news/data/keywordList.today.json?v=202104300430',
      // responseType: 'json',
      method: 'GET',
      // charset: 'utf-8',
      // responseEncodig: 'utf8'
    });
    console.log(data.data);
  } catch (error) {
    console.error('nate trend api error: ' + error);
  }
};
