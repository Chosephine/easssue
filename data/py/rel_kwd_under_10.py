# -*- coding: cp949 -*-
import os, sys, urllib.request, json, re
import pandas as pd
import numpy as np
import datetime
from tqdm import tqdm
from konlpy.tag import Mecab
from newspaper import Article
from collections import Counter
import pickle
import mysql.connector

from sqlalchemy import create_engine
import pymysql
import pandas as pd
import urllib
import time


# 1. keyword로 news 검색해서, 기사 10개의 full_description (keyword 길이 >1 용도 )과, full_nouns (keyword 길이 == 1 용도 ) 얻기
## [1] 키워드로 검색하기
def news_kwds_by_kwd(keywords, processor_idx, return_dict, client_id, client_secret):
    ### 키워드로 뉴스 10개 검색하여 연관키워드 추출 함수
    # 저장용 데이터 프레임
    from_kwd_name_lst = []
    full_description_lst = []
    nouns_lst = []
    
    
    for keyword in tqdm(keywords):
        encText = urllib.parse.quote(keyword)
        url = "https://openapi.naver.com/v1/search/news.json?start=1&display=10&sort=sim&query=" + encText # json 결과: 10개씩만 기사 가져오기

        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id",client_id)
        request.add_header("X-Naver-Client-Secret",client_secret)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()
        
        # 응답이 있다면, description 1개로 합치기
        if(rescode==200):
            response_body = response.read()
            response_dict = json.loads(response_body.decode('utf-8'))
            items = response_dict['items']

            mecab = Mecab()
            # 크롤링한 기사 본문 내의 명사 단어 뽑기
            full_desc = ''
            nouns = []
            for item in tqdm(items):
                # 예외: 링크가 없는 경우 있음
                if item['originallink'] == '':
                    continue
                desc = url_to_article(item['originallink'])
                # 예외: 크롤링이 안 돼서 null로 받았을 수 있음
                if pd.isna(desc):
                    continue
                ## 기사 본문 내의 명사 중 불용어 아닌 명사들 리스트
                nouns += [noun for noun in mecab.nouns(desc) if noun not in stopwords_set]
                full_desc += ' ' + desc
            
            
            # 해당 키워드의 기사 10개 전체 description 저장하기
            from_kwd_name_lst.append(keyword)
            full_description_lst.append(full_desc) # len > 1 keyword 용 
            nouns_lst.append(nouns) # len == 1 keyword 용
            
            
        else:
            print("Error Code:" + rescode)
            
        time.sleep(1) # api 호출 겹치지 않게 하기 위해서, 1초 쉬기
    

    # return_dict에 넣기
    return_dict[processor_idx] = [from_kwd_name_lst, full_description_lst, nouns_lst]

    return   


            

## [2] url로 description 가져오
def url_to_article(url):
    ### url 입력 시 기사 본문 가져오기
    article = Article(url, language='ko')
    try:
        article.download()
        article.parse()
    except:
        return np.nan
    remove_tag = re.compile('<.*?>|&quot|&apos')
    description = re.sub(remove_tag, '', article.text)
    description = description.replace('\n\n', ' ')
    if description == '':
        description = np.nan
    return description







# 2. from_kwd_id, to_kwd_id, to_kwd_count 로 이루어진 DB에 넣을 DF 만들기
def get_count(under_10_from_kwd_name_lst, under_10_full_description_lst, under_10_nouns_lst, processor_idx, return_dict):
    num_of_kwd = len(under_10_from_kwd_name_lst)
    result_df = pd.DataFrame()
    for j in tqdm(range(num_of_kwd)):
        from_kwd_name = under_10_from_kwd_name_lst[j]
        full_desc = under_10_full_description_lst[j]
        nouns = under_10_nouns_lst[j]
        
        
            
        ## 키워드의 개수 카운트 딕셔너리
        nouns_counter = dict(Counter(nouns))

        # 키워드, 연관 키워드, 연관 키워드 개수 데이터 프레임 만들기
        from_kwd_id = []
        to_kwd_id = []
        to_kwd_count = []
        for kwd in kwd_lst:   # kwd_lst는 전체 kwd list가 들어가야 함 
            # 검색 키워드는 제외
            if kwd == from_kwd_name:
                continue
            # 검색 키워드가 1글자인 경우(mecab nouns 사용)
            elif len(kwd) == 1:
                if kwd in nouns_counter:
                    from_kwd_id.append(kwds_name_id[from_kwd_name])
                    to_kwd_id.append(kwds_name_id[kwd])
                    to_kwd_count.append(nouns_counter[kwd])
            # 키워드 글자가 2글자 이상인 경우
            elif kwd in full_desc:
                from_kwd_id.append(kwds_name_id[from_kwd_name])
                to_kwd_id.append(kwds_name_id[kwd])
                to_kwd_count.append(full_desc.count(kwd))
                
        result = pd.DataFrame({'from_kwd_id': from_kwd_id, 'to_kwd_id': to_kwd_id, 'to_kwd_count': to_kwd_count})
        # 연관 키워드 개수로 정렬 후 상위 5개
        result.sort_values(by=['to_kwd_count'], ascending=False, ignore_index=True, inplace=True)
        result = result.head(5)
        
        # 저장용 데이터 프레임에 합치기
        result_df = pd.concat([result_df, result], ignore_index=True)
    
    # return_dict에 저장하기
    return_dict[processor_idx] = result_df
    
    return

#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    

# 1. 데이터 가져오기 


## [1] 메타정보 가져오기 
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)
    

max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
article_try = str(article_try).zfill(2)  # 01과 같은 형식으로 만들어 주기 
kwd_try = str(kwd_try).zfill(2)          # 01과 같은 형식으로 만들어 주기

## [2] stopword
with open('/home/ubuntu/data/stopwords.txt', 'r') as f:
    stopwords_lst = f.readlines()    # line 1개 짜리로 이루어져 있음
    stopwords_str = stopwords_lst[0]
    stopwords_str = stopwords_str.split()
    stopwords_set = set(stopwords_str)

## [3] keywords 가져오기
kwds = pd.read_csv(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd.csv')
kwd_lst = kwds['kwd_name']
with open(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd_name_id.pickle', 'rb') as f:
    kwds_name_id = pickle.load(f)

    
## [4] 10개 미만의 기사가 존재하는 키워드 가져오기
### (1) 오늘날짜 가져오기
today = datetime.datetime.now() + datetime.timedelta(hours=9)
today = today.date().strftime('%Y%m%d')

### (2) 데이터 가져오기
under_10_kwd_df = pd.read_csv(f'/home/ubuntu/data/rel_kwd/{today}_under_10_kwd_df.csv')


### (3) under_10_kwd_lst 생성
under_10_kwd_lst = under_10_kwd_df.under_10_kwd_lst.to_list()




# 2. 10개 미만의 키워드에 대헤서, search하기 ------------------------------------------------------------------
print('10개 미만의 키워드에 대헤서, search하기: start ! ')
print(f'새로 search 하는 keyword의 개수는 {len(under_10_kwd_lst)}')
# print(f'목록 : {under_10_kwd_lst}')



## [1] 네이버 뉴스 api용 id, pwd 리스트
import pandas as pd
client_df = pd.read_csv('/home/ubuntu/data/naver_api.csv')
client_id_lst = client_df.client_id.tolist()
client_secret_lst = client_df.client_secret.tolist()



## [2] description 수집 멀티 프로세싱
### (1) 멀티프로세싱 진행 
import multiprocessing
k = 10 # num of jobs of each client
n = k*len(client_id_lst)  

if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    
    return_dict_under_10 = manager.dict()     # 결과물 저장
    for i in tqdm(range(n)):
        start = int((len(under_10_kwd_lst)//n)*i)
        end = int((len(under_10_kwd_lst)//n)*(i+1))
        client_id = client_id_lst[i//k]
        client_secret = client_secret_lst[i//k]
        p = multiprocessing.Process(target=news_kwds_by_kwd, args=(under_10_kwd_lst[start:end], i, return_dict_under_10, client_id, client_secret)) ## 각 프로세스에 작업을 등록 ## 인자로 db에 없는 kwd만 넣으면 됨 
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()

print('10개 미만의 키워드에 대헤서, search하기: done!')



### (2) 멀티프로세싱 결과  합치기
print('search한 키워드들 list 결과 합치기: start!')
under_10_from_kwd_name_lst = []
under_10_full_description_lst = []
under_10_nouns_lst = []

for i in tqdm(range(n)):
    
    from_kwd_name_lst, full_description_lst, nouns_lst = return_dict_under_10[i]
    under_10_from_kwd_name_lst.extend(from_kwd_name_lst)
    under_10_full_description_lst.extend(full_description_lst)
    under_10_nouns_lst.extend(nouns_lst)
print('search한 키워드들 list 결과 합치기 : done!')


## [3] keyword count 멀티프로세싱 돌리기
print('10개 미만의 키워드에 대헤서,멀티프로세싱 결과 DF만들기  : start!')
import multiprocessing
n = len(under_10_nouns_lst)//20

if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    
    return_dict_under_10 = manager.dict()     # 결과물 저장
    print('multiprocessing 할당 : ')
    for i in tqdm(range(n)):
        start = int((len(under_10_kwd_lst)//n)*i)
        end = int((len(under_10_kwd_lst)//n)*(i+1))
        p = multiprocessing.Process(target=get_count, args=(under_10_from_kwd_name_lst[start:end], under_10_full_description_lst[start:end], under_10_nouns_lst[start:end], i, return_dict_under_10) )
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()

print('10개 미만의 키워드에 대헤서,멀티프로세싱 결과 DF만들기  : done!')



    

# 3. 결과물 DF 만들어서 Local에 저장하고, DB에 넣기
print('멀티프로세싱 결과 df 합치기 시작')
rel_kwd_df_under_10 = pd.DataFrame()

## [1] return_dict_under_10 가져와서 1개 DF로 합치기
for i in tqdm(range(len(return_dict_under_10))):
    cur_df = return_dict_under_10.items()[i][1]
    rel_kwd_df_under_10 = pd.concat([rel_kwd_df_under_10, cur_df], ignore_index=True)

print('10개 미만의 키워드에 대헤서, 멀티프로세싱 결과 합쳐서, 결과 DF 만들기 : done!')
print(rel_kwd_df_under_10.head())



## [2] over10 가져오기
import pandas as pd
rel_kwd_df_over_10 = pd.read_csv(f'/home/ubuntu/data/rel_kwd/{today}_rel_kwd_over_10.csv')
print('10개 이상 기사 가진 키워드의 결과물 가져오기 완료')

## [3] under10, over10 합치기
rel_kwd_df = pd.concat([rel_kwd_df_under_10, rel_kwd_df_over_10])


print('저장하기 1/2 : over_10 & under_10 합치기 성공')
print('rel_kwd_df의 columns : ',rel_kwd_df.columns)    
    

## [4] DB에 넣을 형식으로 맞춰주기    
rel_kwd_df.dropna(subset=['to_kwd_count'], inplace=True)
rel_kwd_df['reg_date'] = today
rel_kwd_df = rel_kwd_df[['from_kwd_id' , 'to_kwd_id', 'reg_date']]


## [5] 로컬에 저장하기
rel_kwd_df.to_csv(f'/home/ubuntu/data/rel_kwd/{today}_rel_kwd.csv', index=False, header=True)

print('저장하기 2/2 : Local에 저장 성공')



