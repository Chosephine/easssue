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




# 분석에 적용할 함수 : over_10_rel_kwd_search 개에 대한 multiporcessing
def over_10_rel_kwd_search(partial_over_10_kwd_lst, processor_idx, return_dict):  # over_10_article_df, kwd_lst 이 만들어져 있어야 함 
    # 1. 저장용 데이터 프레임만들 list
    result_from_kwd_id = []
    result_to_kwd_id = []
    result_to_kwd_count = []
    
    mecab = Mecab()
        
    # 2. arg로 받은 keyword들에 대한 기사를 탐색
    from tqdm import tqdm
    for from_kwd_name in tqdm(partial_over_10_kwd_lst):
    
        ## [1] keyword에 해당하는 기사들 모두 가져오기
        
        from_kwd_name_full_description = over_10_article_df[over_10_article_df['from_kwd_name']==from_kwd_name]['description']
        ''' from_kwd_name_full_description 는 아래 
        125    삼성전자와 LG전자의 6G(6세대 이동통신) 국제표준특허 주도권 경쟁이 치열하다. ...
        126    [사진=전북대학교] 김진수 전북대 교수팀, 비접촉식 고성능 이미지센서 핵심기술 개발...
        127    소프트웨어(SW) 코딩교육 전문 브랜드 어썸아이티(AsomeIT)의 SW코딩 교육 ...
        131    용인시 0 용인시 심꼴벌로고 경기 용인시가 반도체 산업 전담기구인 신성장전략국을 신설...
        Name: description, dtype: object
        '''
        from_kwd_name_full_description = ' '.join(from_kwd_name_full_description)  # 모두 합치기
        
        from_kwd_id = []
        to_kwd_id = []
        to_kwd_count = []
        
        nouns = [noun for noun in mecab.nouns(from_kwd_name_full_description) if noun not in stopwords_set]
        nouns_counter = dict(Counter(nouns))
        
        ## [2] 각 keyword 의 기사에 대해서, 전체 k 
        for kwd in kwd_lst:   # kwd_lst는 전체 kwd list가 들어가야 함 
            # 검색 키워드는 제외
            if kwd == from_kwd_name:
                continue
            # 한글자 키워드인 경우(mecab 사용)
            
            elif len(kwd) == 1:
                if kwd in nouns_counter:
                    from_kwd_id.append(kwds_name_id[from_kwd_name])
                    to_kwd_id.append(kwds_name_id[kwd])
                    to_kwd_count.append(nouns_counter[kwd])
                
            elif kwd in from_kwd_name_full_description:
                from_kwd_id.append(kwds_name_id[from_kwd_name])
                to_kwd_id.append(kwds_name_id[kwd])
                to_kwd_count.append(from_kwd_name_full_description.count(kwd))
        
        
        ## [3] to_kwd_count 가 많이 나온 순서대로 정렬
        to_kwd_id = [to_kwd_id[idx] for idx in np.argsort(to_kwd_count)[-5:][::-1]]  # 상위 5개 이용
        to_kwd_count = sorted(to_kwd_count, reverse=True)[:5]
        from_kwd_id = from_kwd_id[:len(to_kwd_count)]  # 5개 보다 적을 수도 있으므로!
        
        ## [4]  result list에 넣기
        result_from_kwd_id.extend(from_kwd_id)
        result_to_kwd_id.extend(to_kwd_id)
        result_to_kwd_count.extend(to_kwd_count)
        
        
        
    # 3. 저장용 데이터 프레임 만들기
    result_df = pd.DataFrame({'from_kwd_id': result_from_kwd_id, 'to_kwd_id': result_to_kwd_id, 'to_kwd_count': result_to_kwd_count})

    # 4.return_dict에 넣기
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

    
## [4] 10개 이상의 기사가 존재하는 키워드와 기사 가져오기
### (1) 오늘날짜 가져오기
today = datetime.datetime.now() + datetime.timedelta(hours=9)
today = today.date().strftime('%Y%m%d')

### (2) 데이터 가져오기
over_10_article_df = pd.read_csv(f'/home/ubuntu/data/rel_kwd/{today}_over_10_article_df.csv')


### (3) over_10_kwd_lst 생성
over_10_kwd_lst = list(over_10_article_df.from_kwd_name.unique())


'''
# 2. DB 연결하기
host="k7d102.p.ssafy.io:3306"
user="ssafy"
password="j^8t21e-3fuh"
password = urllib.parse.quote_plus(password)  # 특수문자 때문에, parse 해줘야 함
database="easssue_data"

db_connection_str = f'mysql+pymysql://{user}:{password}@{host}/{database}'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()
'''


# 3. 연관 키워드 추출하기
## [1] 멀티 프로세싱
import multiprocessing
n = 100

if __name__ == '__main__':
    processes = []
    manager = multiprocessing.Manager()
    return_dict_over_10 = manager.dict()     # 결과물 저장
    for i in range(n):
        start = int((len(over_10_kwd_lst)//n)*i)
        end = int((len(over_10_kwd_lst)//n)*(i+1))

        p = multiprocessing.Process(target=over_10_rel_kwd_search, args=(over_10_kwd_lst[start:end], i, return_dict_over_10)) ## 각 프로세스에 작업을 등록 ## 인자로 db에 없는 kwd만 넣으면 됨 
        p.start()
        processes.append(p)
 
    for process in processes:
        process.join()



print('연관키워드 분석 멀티프로세싱 완료!')

    

    
# 4. Local에 저장하기

## [1] 결과물 DF 만들기
rel_kwd_df = pd.DataFrame()

## [2] 받아온 것 하나로 합치기
for i in range(len(return_dict_over_10)):
    cur_df = return_dict_over_10.items()[i][1]
    rel_kwd_df = pd.concat([rel_kwd_df, cur_df], ignore_index=True)



print('rel_kwd_df의 columns : ',rel_kwd_df.columns)    
    


## [3] 확인용
rel_kwd_df.to_csv(f'/home/ubuntu/data/rel_kwd/{today}_rel_kwd_over_10.csv', index=False, header=True)
print(f'10개 이상의 기사가 존재하는 키워드들의 연관키워드를 Local에 저장 성공 : {today}_rel_kwd_over_10.csv')


