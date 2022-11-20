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
import pandas as pd
import urllib
import time



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



## [2] keywords 가져오기
kwds = pd.read_csv(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd.csv')
kwd_lst = kwds['kwd_name'].tolist()
kwd_set = set(kwd_lst)
with open(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd_name_id.pickle', 'rb') as f:
    kwds_name_id = pickle.load(f)

    



import glob
import pandas as pd
## [3] article data 가져오기

### (1) 그제, 어제, 오늘 날짜 가져오기
two_days_ago = datetime.datetime.now() + datetime.timedelta(hours=9) - datetime.timedelta(days=2)
two_days_ago = two_days_ago.date().strftime('%Y%m%d')

one_days_ago = datetime.datetime.now() + datetime.timedelta(hours=9) - datetime.timedelta(days=1)
one_days_ago = one_days_ago.date().strftime('%Y%m%d')


today = datetime.datetime.now() + datetime.timedelta(hours=9)
today = today.date().strftime('%Y%m%d')


### (1) 전체와 DB용 둘다 가져오기
article_filename_lst = glob.glob(f'/home/ubuntu/data/article/{two_days_ago}*.csv')
article_filename_lst += glob.glob(f'/home/ubuntu/data/article/{one_days_ago}*.csv')
article_filename_lst += glob.glob(f'/home/ubuntu/data/article/{today}*.csv')

article_filename_lst_subtract = glob.glob(f'/home/ubuntu/data/article/{two_days_ago}*db.csv')
article_filename_lst_subtract += glob.glob(f'/home/ubuntu/data/article/{one_days_ago}*db.csv')
article_filename_lst_subtract += glob.glob(f'/home/ubuntu/data/article/{today}*db.csv')


### (2) 전체에서 DB용 제외해주기 (중복되기 때문)
for subtract in article_filename_lst_subtract:
    article_filename_lst.remove(subtract)


### (3) 데이터 프레임 만들기
article_df = pd.DataFrame()
for path_filename in article_filename_lst:
    cur_df = pd.read_csv(path_filename)
    article_df = pd.concat([article_df, cur_df])

print('기존 article_df를 잘 합침')

# 2. 데이터 선별하기
## [1] 10개 이상의 기사가 있는over_10_kwd_lst / 없는 under_10_kwd_lst에 저장
which_over_10_kwd = ( article_df['from_kwd_name'].value_counts() >= 10 )
'''which_over_30_kwd 는 아래와 같은 꼴
추석          True
폭우          True
기후 변화       True
IT기업        True
로그인         True
           ...  
난시         False
해리 스타일스    False
파이선        False
기하학        False
갤럭시 워치     False
'''

over_10_kwd_lst = list(which_over_10_kwd[which_over_10_kwd].index)  # 10개 이상인  것만 indexing
over_10_kwd_set = set(over_10_kwd_lst)
over_10_kwd_set = over_10_kwd_set.intersection(kwd_set) # 과거에 존재하던 키워드가 삭제되는 경우를 대비해서, 현재 전체 키워드와 intersection 해줌
over_10_kwd_lst = list(over_10_kwd_set)

under_10_kwd_lst = list(which_over_10_kwd[~which_over_10_kwd].index) # 10개 미만인 것만
under_10_kwd_set = set(under_10_kwd_lst)  
under_10_kwd_set = under_10_kwd_set.intersection(kwd_set)  # 과거에 존재하던 키워드가 삭제되는 경우를 대비해서, 현재 전체 키워드와 intersection 해줌
under_10_kwd_lst = list(under_10_kwd_set)

print(f'10개 미만인 것 개수 : {len(under_10_kwd_lst)}')

over_10_article_df = article_df[article_df['from_kwd_name'].isin(over_10_kwd_lst)]


## [2] 최신순으로 정렬해서 기사 10개 가져오기
over_10_article_df = over_10_article_df.sort_values(by='pub_date', ascending=False).groupby('from_kwd_name', sort=False).head(10)  # DF의 GROUPBY해도 순서는 유지됨
print('over_10_article_df의 형태 ')
print(over_10_article_df.head())

## [3] 생성물 저장하기
over_10_article_df.to_csv(f'/home/ubuntu/data/rel_kwd/{today}_over_10_article_df.csv', index=False, header=True)
under_10_kwd_df = pd.DataFrame({'under_10_kwd_lst':under_10_kwd_lst})
under_10_kwd_df.to_csv(f'/home/ubuntu/data/rel_kwd/{today}_under_10_kwd_df.csv', index=False, header=True)

print(f'10개 이상의 기사가 존재하는 키워드들의 기사 dataframe 저장됨 : {today}_over_10_article_df.csv ')
print(f'10개 이상의 기사가 존재하는 키워드 개수 : {len(over_10_kwd_lst)}')
print(f'10개 미만의 기사가 존재하는 키워드들의 dataframe이 저장됨 : {today}_under_10_kwd_df.csv ')
print(f'10개 미만의 기사가 존재하는 키워드 개수 : {len(under_10_kwd_lst)}')
