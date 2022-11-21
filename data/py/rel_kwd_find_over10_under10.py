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
    

# 1. ������ �������� 

## [1] ��Ÿ���� �������� 
meta_df = pd.read_csv('/home/ubuntu/data/meta.csv')
print('-'*50)
print('meta data is ' )
print(meta_df)
print('-'*50)
    

max_article_id, article_filedate, article_try, kwd_filedate, kwd_try = meta_df.loc[0,['max_article_id','article_filedate', 'article_try', 'kwd_filedate', 'kwd_try']]
article_try = str(article_try).zfill(2)  # 01�� ���� �������� ����� �ֱ� 
kwd_try = str(kwd_try).zfill(2)          # 01�� ���� �������� ����� �ֱ�



## [2] keywords ��������
kwds = pd.read_csv(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd.csv')
kwd_lst = kwds['kwd_name'].tolist()
kwd_set = set(kwd_lst)
with open(f'/home/ubuntu/data/kwd/{kwd_filedate}_{kwd_try}_kwd_name_id.pickle', 'rb') as f:
    kwds_name_id = pickle.load(f)

    



import glob
import pandas as pd
## [3] article data ��������

### (1) ����, ����, ���� ��¥ ��������
two_days_ago = datetime.datetime.now() + datetime.timedelta(hours=9) - datetime.timedelta(days=2)
two_days_ago = two_days_ago.date().strftime('%Y%m%d')

one_days_ago = datetime.datetime.now() + datetime.timedelta(hours=9) - datetime.timedelta(days=1)
one_days_ago = one_days_ago.date().strftime('%Y%m%d')


today = datetime.datetime.now() + datetime.timedelta(hours=9)
today = today.date().strftime('%Y%m%d')


### (1) ��ü�� DB�� �Ѵ� ��������
article_filename_lst = glob.glob(f'/home/ubuntu/data/article/{two_days_ago}*.csv')
article_filename_lst += glob.glob(f'/home/ubuntu/data/article/{one_days_ago}*.csv')
article_filename_lst += glob.glob(f'/home/ubuntu/data/article/{today}*.csv')

article_filename_lst_subtract = glob.glob(f'/home/ubuntu/data/article/{two_days_ago}*db.csv')
article_filename_lst_subtract += glob.glob(f'/home/ubuntu/data/article/{one_days_ago}*db.csv')
article_filename_lst_subtract += glob.glob(f'/home/ubuntu/data/article/{today}*db.csv')


### (2) ��ü���� DB�� �������ֱ� (�ߺ��Ǳ� ����)
for subtract in article_filename_lst_subtract:
    article_filename_lst.remove(subtract)


### (3) ������ ������ �����
article_df = pd.DataFrame()
for path_filename in article_filename_lst:
    cur_df = pd.read_csv(path_filename)
    article_df = pd.concat([article_df, cur_df])

print('���� article_df�� �� ��ħ')

# 2. ������ �����ϱ�
## [1] 10�� �̻��� ��簡 �ִ�over_10_kwd_lst / ���� under_10_kwd_lst�� ����
which_over_10_kwd = ( article_df['from_kwd_name'].value_counts() >= 10 )
'''which_over_30_kwd �� �Ʒ��� ���� ��
�߼�          True
����          True
���� ��ȭ       True
IT���        True
�α���         True
           ...  
����         False
�ظ� ��Ÿ�Ͻ�    False
���̼�        False
������        False
������ ��ġ     False
'''

over_10_kwd_lst = list(which_over_10_kwd[which_over_10_kwd].index)  # 10�� �̻���  �͸� indexing
over_10_kwd_set = set(over_10_kwd_lst)
over_10_kwd_set = over_10_kwd_set.intersection(kwd_set) # ���ſ� �����ϴ� Ű���尡 �����Ǵ� ��츦 ����ؼ�, ���� ��ü Ű����� intersection ����
over_10_kwd_lst = list(over_10_kwd_set)

under_10_kwd_lst = list(which_over_10_kwd[~which_over_10_kwd].index) # 10�� �̸��� �͸�
under_10_kwd_set = set(under_10_kwd_lst)  
under_10_kwd_set = under_10_kwd_set.intersection(kwd_set)  # ���ſ� �����ϴ� Ű���尡 �����Ǵ� ��츦 ����ؼ�, ���� ��ü Ű����� intersection ����
under_10_kwd_lst = list(under_10_kwd_set)

print(f'10�� �̸��� �� ���� : {len(under_10_kwd_lst)}')

over_10_article_df = article_df[article_df['from_kwd_name'].isin(over_10_kwd_lst)]


## [2] �ֽż����� �����ؼ� ��� 10�� ��������
over_10_article_df = over_10_article_df.sort_values(by='pub_date', ascending=False).groupby('from_kwd_name', sort=False).head(10)  # DF�� GROUPBY�ص� ������ ������
print('over_10_article_df�� ���� ')
print(over_10_article_df.head())

## [3] ������ �����ϱ�
over_10_article_df.to_csv(f'/home/ubuntu/data/rel_kwd/{today}_over_10_article_df.csv', index=False, header=True)
under_10_kwd_df = pd.DataFrame({'under_10_kwd_lst':under_10_kwd_lst})
under_10_kwd_df.to_csv(f'/home/ubuntu/data/rel_kwd/{today}_under_10_kwd_df.csv', index=False, header=True)

print(f'10�� �̻��� ��簡 �����ϴ� Ű������� ��� dataframe ����� : {today}_over_10_article_df.csv ')
print(f'10�� �̻��� ��簡 �����ϴ� Ű���� ���� : {len(over_10_kwd_lst)}')
print(f'10�� �̸��� ��簡 �����ϴ� Ű������� dataframe�� ����� : {today}_under_10_kwd_df.csv ')
print(f'10�� �̸��� ��簡 �����ϴ� Ű���� ���� : {len(under_10_kwd_lst)}')
