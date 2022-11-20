# -*- coding: cp949 -*-


import datetime, urllib, json, time, re
from tqdm import tqdm
import numpy as np
import pandas as pd


def news_clustering(df):
    # 1. 임베딩
    from sklearn.feature_extraction.text import TfidfVectorizer
    tfidf = TfidfVectorizer(ngram_range=(1,5))
    ## [1] tfidf로 임베딩 시키기
    try : 
        tfidf_vectors = tfidf.fit_transform(df['description'])
    
    ## [2] 임베딩 실패하면, 빈 것 return 하기
    except ValueError as e:
        print('에러발생', text)
        tmp_df = pd.DataFrame({'title': [], 'link': [] , 'pub_date': [], 'description': [], 'from_kwd_name' : [], 'from_kwd_id': []})
        return tmp_df
    
    
    # 2. 군집화 모델 fitting
    from sklearn.cluster import KMeans
    k=3
    kmeans = KMeans(n_clusters=k, max_iter=10000, random_state=1115)
    kmeans_label = kmeans.fit_predict(tfidf_vectors)
    kmeans_centers = kmeans.cluster_centers_

    
    # 3. 결과에서 각 군집별로 1개씩만 뽑기 
    
    top_features_df = pd.DataFrame() # 결과 넣을 곳
    top_features_idx_list = []
    
    ## [1] cluster 별로, 각 cluster의 원소의 index를 가져오기
    clusterNum_indexList = dict()   # {cluster1 : [index1, index2, ...,]} : key : cluster num, value : cluster 원소의 index
    for clusterNum in set(kmeans_label):  # k = 3 이지만, 3개군집 중 데이터 없는 군집이 있을 수 있음
        clusterNum_indexList[clusterNum] = [idx for idx, value in enumerate(kmeans_label) if value == clusterNum]
    
    
    ## [2] 각 군집의 center와의 내적값이 가장 큰 원소를 대표값으로 설정
    from numpy.linalg import norm
    ## (1) description이 임베딩된 vector를 array로 바꾸기
    embedded_description_vectors = tfidf_vectors.toarray()
    
    ### (2) 각 cluster마다 순환하며, center와 가장 가까운 것 찾기
    for clusterNum, indexList in clusterNum_indexList.items():
        center = kmeans_centers[clusterNum]  # center
        center_norm = norm(center)
        max_cosine = float('-INF')       
        max_idx = -1
        #### 각 clusterNum의 indexList 모두를 순환하며, 내적값 가장 큰 것 찾기
        for idx in indexList:
            cur_cosine = np.dot(embedded_description_vectors[idx], center) / (norm(embedded_description_vectors[idx])*center_norm)
            if max_cosine < cur_cosine:
                max_cosine = cur_cosine
                max_idx = idx
                
        #### 가장 center와 가까운 것 선택하기
        top_features_df = pd.concat([top_features_df, df.loc[[max_idx]]], axis=0)
        top_features_idx_list.append(max_idx)
    
    return top_features_df, top_features_idx_list  # center 3개와 가장 가까운 것 return
        
    
#---------------------------------------------------------------------------------------------------------------------------
    
    

    
def news_by_kwd(keyword_lst, processor_idx, return_dict, client_id, client_secret):
    # 1. 결과물 넣을 곳
    title = []
    link = []
    pub_date = []
    description = []
    from_kwd_name = []
    from_kwd_id = []
    total_result_lst = [title, link, pub_date, description, from_kwd_name, from_kwd_id]
    
    # 2. 최근 1시간 것만 가져오기
    cur = datetime.datetime.now() + datetime.timedelta(hours=9)
    cur = cur.strftime('%a, %d %b %Y %H')
    one_hour_ago = today = datetime.datetime.now() + datetime.timedelta(hours=8)
    one_hour_ago = one_hour_ago.strftime('%a, %d %b %Y %H')
    target_times = {cur, one_hour_ago}
    
    
    
    # 3. 키워드 검색하기
    for keyword in tqdm(keyword_lst):

    #num_of_kwd = len(keyword_lst)
    #for i in range(num_of_kwd):
       # keyword = keyword_lst[i]
        #if i % 5 == 0:
            #print(f'{processor_idx} :  {i}/{num_of_kwd}개가 완료됨')
    
        ## [1] 키워드 별로 naver api로 검색
        encText = urllib.parse.quote(keyword)
        url = "https://openapi.naver.com/v1/search/news.json?start=1&display=100&sort=date&query=" + encText # json 결과

        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id",client_id)
        request.add_header("X-Naver-Client-Secret",client_secret)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()
        if(rescode==200):
            response_body = response.read()
            response_dict = json.loads(response_body.decode('utf-8'))
            items = response_dict['items']
            
            
            
            ## [2] 키워드 별로 불필요한 정보 삭제 - keyword 1개
            
            ### (1) 저장할 곳 생성
            cur_title = []
            cur_link = []
            cur_pub_date = []
            cur_description = []
            cur_from_kwd_name = []
            cur_from_kwd_id = []
            
            ### (2) 1시간 이내의 기사만 가져오기
            for item in items:
                # link가 없다면 생략
                if item['originallink'] == '':
                    continue
            
                pubDate = item['pubDate']         # Mon, 24 Oct 2022 09:44:00 +0900 꼴
                pubDate = pubDate.split(':')[0]   # Mon, 24 Oct 2022 09 꼴

                if pubDate in target_times:
                    #### 데이터 전처리하기   
                    remove_tag = re.compile(r"<.*?>")  # 불필요한 태그 및 문자
                    desc = re.sub(remove_tag, '', item['description'])
                    cur_description.append(desc.replace('\n\n', ' '))

                    
                    tmp_title = re.sub(remove_tag, '', item['title'])   # items[item_index]['title']값의 불필요한 태그를 ''으로 대체
                    tmp_title = re.sub(r"&quot;", '"', tmp_title) # &quot; : "
                    tmp_title = re.sub(r"&apos;", "'", tmp_title)  # &apos; : '
                    tmp_title = re.sub(r"&lt;", '<', tmp_title)    # &lt;   : <
                    tmp_title = re.sub(r"&gt;", '>', tmp_title)    # &gt;   : >
                    tmp_title = re.sub(r"&amp;", '&', tmp_title)   # &amp;  : &
                    
                    cur_title.append(tmp_title) 
                    
                    cur_link.append(item['originallink'])
                    pDate = datetime.datetime.strptime(item['pubDate'], '%a, %d %b %Y %H:%M:%S +0900')
                    pDate = pDate.strftime('%Y-%m-%d %H:%M:%S')
                    cur_pub_date.append(pDate)
                    cur_from_kwd_name.append(keyword)
                    cur_from_kwd_id.append(kwds_name_id_dict[keyword])


            
            
            ## [3] 키워드 별로 클러스터링 하기
            ### (1) 4개 이상의 기사가 존재하는 경우 클러스터링 진행
            if len(cur_title) > 3:
                #### 1개 keyword에 대한 응답 결과를 하나로 모으기
                cur_result_df = pd.DataFrame({'title': cur_title, 'link': cur_link, 'pub_date': cur_pub_date, 'description': cur_description, 'from_kwd_name' : cur_from_kwd_name, 'from_kwd_id': cur_from_kwd_id})
                cur_lst_lst = [cur_title, cur_link, cur_pub_date, cur_description, cur_from_kwd_name, cur_from_kwd_id]
                
                try:
                    #### 키워드1 개에 대한 기사를 3개의 군집으로 나누고, 군집의 center와 가장 유사한 기사를 1개씩 선택
                    top_features_df, top_features_idx_list = news_clustering(cur_result_df)
                    
                    #### 전체 결과에, 선택된 기사 넣기
                    for max_idx in top_features_idx_list:   
                        title.append(cur_title[max_idx])
                        link.append(cur_link[max_idx])
                        pub_date.append(cur_pub_date[max_idx])
                        description.append(cur_description[max_idx])
                        from_kwd_name.append(cur_from_kwd_name[max_idx])
                        from_kwd_id.append(cur_from_kwd_id[max_idx])
                        
                        
                except ValueError as e:
                    print(e)
                    
            
            ### (2) 클러스터링 할 개수 안되면, 기사가 존재하면, 전체 넣기
            else:
                #### 기사가 존재한다면, 전체 결과에 넣기
                if len(cur_title):
                    title.extend(cur_title)
                    link.extend(cur_link)
                    pub_date.extend(cur_pub_date)
                    description.extend(cur_description)
                    from_kwd_name.extend(cur_from_kwd_name)
                    from_kwd_id.extend(cur_from_kwd_id)
            

                    
                    
        ## [99] keyword 응답이 error난 경우            
        else:
            print("Error Code:" + rescode)
        
        
        ## [99] 동시에 너무 많은 api 요청을 방지하기 위해서, 잠시 쉬기
        time.sleep(1)
        
        

    
    # 4. 선택된 1시간 이내 뉴스들 DataFrame으로 만들기
    ## [1] df로 만들기
    result_df = pd.DataFrame({'title': title, 'link': link, 'pub_date': pub_date, 'description': description, 'from_kwd_name' : from_kwd_name, 'from_kwd_id': from_kwd_id})
    
    ## [2] return_dict에 넣기
    return_dict[processor_idx] = result_df

    return



#-------------------------------------------------------------------------------------------------------------------------

# url 이용해서, full description과 image를 얻기
from newspaper import Article
import numpy as np
import re
def url_to_article(url):
    ### url 입력 시 기사 본문 가져오기
    article = Article(url, language='ko')
    # article.download()
    try:
        article.download()
        article.parse()
    except:
        return np.nan, np.nan
    remove_tag = re.compile('<.*?>')
    description = re.sub(remove_tag, '', article.text)
    description = description.replace('\n\n', ' ')
    image = article.top_image
    if description == '':
        description = np.nan
    if image == '':
        image = np.nan
    return description, image


from tqdm import tqdm
def get_description_image(df, idx, return_dict):
    description_lst = []
    image_lst = []
    for link in tqdm(df['link']):
        description, image = url_to_article(link)
        description_lst.append(description)
        image_lst.append(image)
    
    df['description'] = description_lst
    df['img'] = image_lst
    return_dict[idx] = df
    return



# csv로 저장하기
def make_df_for_db(return_dict):
    # 1. 메타정보 가져오기
    meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
    max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
    article_try = str(article_try).zfill(2)  # 01과 같은 형식으로 만들어 주기 
    kwd_try = str(kwd_try).zfill(2)          # 01과 같은 형식으로 만들어 주기
    
     
    
    
    # 2. 결과물 DF 만들기
    result_df = pd.DataFrame()
    ## [1] 받아온 것 하나로 합치기
    for i in range(len(return_dict)):
        cur_df = return_dict.items()[i][1]
        result_df = pd.concat([result_df, cur_df], axis=0)

    ## [2] DB에 넣을 형식으로 맞춰주기    
    result_df.dropna(subset=['description'], inplace=True)
    result_df['img'].fillna('https://k7d102.p.ssafy.io/resource/default_article_img.png', inplace=True)
    # data2null 을 포함하는 것을 https://k7d102.p.ssafy.io/resource/default_article_img.png 로 바꾸기 
    
    
    ### (1) img가 안나오는  list
    no_img_list = ['data2null',
    'www.goal.com/assets/low-end/ltr/favicon-16x16.png',
    'img.joongang.co.krpubimg/share/ja-opengraph-img.png',
    'segye.com/static',    # 세계일보의 경우, 이미지가 없는 기사의 경우, 세계일보 자체의 logo를 가져오게 되는데, 보여지지 않음
    'segyebiz.com/static'  # 세계일보의 경우, 이미지가 없는 기사의 경우, 세계일보 자체의 logo를 가져오게 되는데, 보여지지 않음
    ]
    van = '|'.join(no_img_list)
    result_df.loc[result_df['img'].str.contains(van), 'img'] = 'https://k7d102.p.ssafy.io/resource/default_article_img.png'
    
    # https://www.goal.com/assets/low-end/ltr/favicon-16x16.png
    # https://img.joongang.co.krpubimg/share/ja-opengraph-img.png
    
    result_df['article_id'] = range(max_article_id+1, max_article_id+len(result_df)+1)
    result_df['category_id'] = -1
    result_df['hit'] = 0
    result_df['summary'] = '.'
    result_df = result_df[['article_id', 'category_id', 'title', 'link', 'pub_date', 'hit', 'summary', 'img', 'description' ,'from_kwd_name' , 'from_kwd_id']]
    
    
    ## [3] meta.csv 바꾸기 :  update article_filedate & article_try
    import datetime
    today = datetime.datetime.now() + datetime.timedelta(hours=9)
    today = today.strftime('%Y%m%d')
    if today == str(article_filedate):
        # article_try를 1개 추가하기
        article_try = int(article_try) + 1
        article_try = str(article_try).zfill(2)
    
    else:
        # article_filedate를 today로 바꾸기
        article_filedate = today
        article_try = str(1).zfill(2)
    
    ## [4] result_df를 csv로 저장하기
    result_df.to_csv(f'/home/ubuntu/data/article/{article_filedate}_{article_try}_article.csv', index=False, header=True)
    print(f'aritlce {len(result_df)}개가 csv로 잘 저장되었습니다.')
    
    ## [5] meta.csv 저장
    meta_df.loc[0,'max_article_id'] = max_article_id+len(result_df) # 넣어주세요
    meta_df.loc[0,'article_filedate'] = article_filedate
    meta_df.loc[0,'article_try'] = article_try
    meta_df.to_csv('/home/ubuntu/data/meta.csv', header=True, index=False)
    print('meta.csv 가 업데이트 되었습니다.')

    return


#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# 1. 메타정보 가져오기 
import pandas as pd
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
    
print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)

max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
article_try = str(article_try).zfill(2)  # 01과 같은 형식으로 만들어 주기 
kwd_try = str(kwd_try).zfill(2)          # 01과 같은 형식으로 만들어 주기

# 2. 키워드 가져오기
import pickle
with open(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd_name_id.pickle', 'rb') as f:
    kwds_name_id_dict = pickle.load(f)  # { kwd_name : kwd_id } 꼴로 예를들면 { 성장 : 2 }        

kwd_lst = list(kwds_name_id_dict)
#kwd_lst = kwd_lst[:20]
print('키워드 개수 : ',len(kwd_lst))


# 3. naver api
import pandas as pd

client_df = pd.read_csv('/home/ubuntu/data/naver_api.csv')

client_id_lst = client_df.client_id.tolist()
client_secret_lst = client_df.client_secret.tolist()


# 4. 키워드로 기사가져오기
import multiprocessing
n = 10*len(client_id_lst)
if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    return_dict = manager.dict()     # 결과물 저장
    for i in range(n):
        start = int((len(kwd_lst)//n)*i)
        end = int((len(kwd_lst)//n)*(i+1))
        client_id = client_id_lst[i//10]
        client_secret = client_secret_lst[i//10]
        p = multiprocessing.Process(target=news_by_kwd, args=(kwd_lst[start:end], i ,return_dict, client_id, client_secret)) ## 각 프로세스에 작업을 등록
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()

# print(return_dict)
print('키워드로기사를 잘 가져왔습니다.')
print('-'*100)
print('기사의 description과 img를 가져옵니다.')

        
# 5. 기사 description과 img 가져오기
import multiprocessing

## [1] 2개로 나눠서 하기
start1 = 0
end1 = n//2

start2 = n//2
end2 = n

### (1) first
if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    for i in range(start1, end1):
        p = multiprocessing.Process(target=get_description_image, args=(return_dict[i], i, return_dict )) ## 각 프로세스에 작업을 등록
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()
        
        
print('기사의 description과 img를 잘 가져왔습니다. 1/2')
print('-'*100)       


### (2) second
if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    for i in range(start2, end2):
        p = multiprocessing.Process(target=get_description_image, args=(return_dict[i], i, return_dict )) ## 각 프로세스에 작업을 등록
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()
        
        
print('기사의 description과 img를 잘 가져왔습니다. 2/2')
print('-'*100)       



# 6. csv로 저장하기
make_df_for_db(return_dict)
